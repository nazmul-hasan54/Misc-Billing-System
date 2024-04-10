import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { OnlineAgricultureService } from '../../../../services/online-agriculture.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryService } from '../../../../services/ministry.service';
import { OnlineAgriculturePoultryLedgerService } from '../../../../services/pdfGenerate/agriculture/online-agriculture-poultry-ledger.service';

@Component({
  selector: 'ngx-online-agri-poultry-ledger',
  templateUrl: './online-agri-poultry-ledger.component.html',
  styleUrls: ['./online-agri-poultry-ledger.component.scss']
})
export class OnlineAgriPoultryLedgerComponent implements OnInit {

  agriculturePoultryform:FormGroup;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  docData: any;
  documentTitle = "";
  isProgress: boolean = false;
  isTrue: boolean = false;
  report: any;
  zoneList: any;
  agricultureList: any;
  locationDataDd: any;
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  locationList: any = localStorage.getItem("locationCodeList");
  locationCodes = this.locationList.split(',');
  userNames=this.userName.split(",");
  constructor(
    private _fb:FormBuilder,
    private _onlineAgriculture: OnlineAgricultureService,
    private _onlineAgricultureLedger: OnlineAgriculturePoultryLedgerService,
    private _datePipe: DatePipe,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _ministryService: MinistryService,
  ) { }

  ngOnInit(): void {
    this.getAllZoneList();
    this.createForm();
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
      this.getLocationList(event);
  }

  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(res => {
      this.agriculturePoultryform.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }

  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDDByZone(zoneCode);
      this.agriculturePoultryform.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.agriculturePoultryform.controls['locationCode'].disable();
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
  }

  zoneByUserList:any[];
  locationByUserZoneList:any[];
  isAll:boolean;
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.agriculturePoultryform.patchValue({
          zoneCode:this.zoneByUserList[0].code
        });
        this.getLocationByUserNameZoneCodes(this.zoneByUserList[0].code);
      });
    }
  }

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
          this.agriculturePoultryform.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }


  onSearchAgain(){
    this.isTrue=false;
  }

  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Online Agriculture and Poultry Ledger';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Online Agriculture and Poultry Ledger');
    
    }
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  onReport(){
    let reportObj = {
      startMonth: this._datePipe.transform(this.f.startMonth.value, 'yMM'),
      endMonth: this._datePipe.transform(this.f.endMonth.value, 'yMM')
    }
    this.isProgress = true;
      this._onlineAgriculture.getOnlineAgriPoultryLedgerData(reportObj.startMonth,reportObj.endMonth,this.f.zoneCode.value,this.f.locationCode.value).subscribe(res => {
        this.agricultureList = res;
        if(this.agricultureList.length > 0){
          this.docData = this._onlineAgricultureLedger.generatePdf(this.agricultureList, reportObj);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress = false;
          });
        } else {
          this.isTrue = false;
          this._toasterService.danger('No data found');
          this.isProgress = false;
        }
      }, 
      err=>{
        this.isProgress=false;
      });
  }

  get formVal(){
    return this.agriculturePoultryform.value;
  }

  get f(){
    return this.agriculturePoultryform.controls;
  }

  createForm(){
    this.agriculturePoultryform=this._fb.group({
      startMonth:['', [Validators.required]],
      endMonth: ['', [Validators.required]],
      zoneCode: ['0', [Validators.required]],
      locationCode: ['0'],
    })
  }

}
