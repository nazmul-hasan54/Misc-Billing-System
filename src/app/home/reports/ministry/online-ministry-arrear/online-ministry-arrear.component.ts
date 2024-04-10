import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { MinistryService } from '../../../../services/ministry.service';
import { OnlineMinistryArrearService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear.service';
import { NbToastrService } from '@nebular/theme';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { DatePipe } from '@angular/common';
import { OnlineMinistryArrearWithoutStringService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear-without-string.service';

@Component({
  selector: 'ngx-online-ministry-arrear',
  templateUrl: './online-ministry-arrear.component.html',
  styleUrls: ['./online-ministry-arrear.component.scss']
})
export class OnlineMinistryArrearComponent implements OnInit {
  onlineMinistryArrearForm:FormGroup;
  isTrue:boolean=false;
  report:any;
  reports:any;
  documentTitle:'';
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  docData: any;
  isProgress:Boolean=false;
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneList: any;
  locationDataDd: any;
  zoneByUserList: any[];
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  docDatas: any;
  constructor(
    private _fb:FormBuilder,
    private _service: MinistryService,
    private _pdfService: OnlineMinistryArrearService,
    private _pdfServiceStr: OnlineMinistryArrearWithoutStringService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService,
    private _ministryService: MinistryService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {    
    this.bsConfig = Object.assign({
      minMode: this.minMode,
    }
  );
  this.createForm();
  this.getAllZoneList();
  this.getZoneByUser();
  }


  private getAllZoneList(){
    if(this.roleName=='Admin'){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  private getLocationDDByZone(event:any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(res => {
      this.onlineMinistryArrearForm.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }

  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;
  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDDByZone(zoneCode);
      this.onlineMinistryArrearForm.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.onlineMinistryArrearForm.controls['locationCode'].disable();
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
  }


  
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.onlineMinistryArrearForm.patchValue({
          zoneCode:this.zoneByUserList[0].code
        });
        this.getLocationByUserNameZoneCodes(this.zoneByUserList[0].code);
      });
    }
  }
  
  locationByUserZoneList: any[];
  isAll: boolean;
  getLocationByUserNameZoneCodes(event:any){
    this.getLocationList(event);
    setTimeout(()=>{
      if(this.roleName!='Admin'){
      this._ministryService.getLocationByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
        this.locationByUserZoneList=res as any[];
        this.isAll=this.locationByUserZoneList.length==this.locationDataDd.length?true:false;
        if(this.isAll){
          this.locationByUserZoneList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.onlineMinistryArrearForm.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  space(e:any){
    if(e.charCode===32){
      e.preventDefault()
    }
  }
  ministryArrearData:any;
  onReport(){
    this.isProgress=true;
    // this.submitted=true;
    if(this.onlineMinistryArrearForm.invalid){ this.isProgress = false;return};
    let reportObj = {
      billMonth: this.datePipe.transform(this.formCon.billMonth.value, 'yMM'),
      zoneCodes:this.formCon.zoneCode.value,
      exportId: this.exportTypeList.filter(x => x.id),
    };

    this._service.getOnlineMinistryArrear(this.formCon.zoneCode.value,this.formCon.locationCode.value,reportObj.billMonth).subscribe(res=>{
      this.ministryArrearData=res;
      if(this.ministryArrearData.length>0){
        this.docData=this._pdfService.generatePdf(this.ministryArrearData, reportObj,this.formCon.zoneCode.value); 
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
        this.isProgress=false;
        });
        
        this.docDatas = this._pdfServiceStr.generatePdf(this.ministryArrearData, reportObj,this.formCon.zoneCode.value);
        this.docDatas.getBase64((base64Data) => {
          this.reports = base64Data;
          this.documentTitle = this.docDatas.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      }
      else{
        this.isTrue = false;
        this._toasterService.danger("No Data Found");
        this.isProgress=false;
      }
    }, err=>{
      this.isProgress=false;
    });
  }

  public onSearchAgain() {
    this.isTrue = false;
  }
  
  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Online Ministry Arrear Report '+dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docDatas.docDefinition.content[0].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Online Ministry Arrear Report ');
    }
}

  createForm(){
    this.onlineMinistryArrearForm=this._fb.group({
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      billMonth:[,[]]
    })
  }
  get formCon(){
    return this.onlineMinistryArrearForm.controls;
  }
}
