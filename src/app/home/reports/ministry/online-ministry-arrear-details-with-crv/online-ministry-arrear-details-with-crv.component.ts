import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerViewMode, BsDatepickerConfig } from 'ngx-bootstrap/datepicker';
import { MinistryService } from '../../../../services/ministry.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { OnlineMinistryArrearSummaryWithCrvService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear-summary-with-crv.service';
import { OnlineMinistryArrearDetailsWithCrvService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear-details-with-crv.service';
import { OnlineMinistryNegativeArrearCrvService } from '../../../../services/pdfGenerate/ministry/online-ministry-negative-arrear-crv.service';

@Component({
  selector: 'ngx-online-ministry-arrear-details-with-crv',
  templateUrl: './online-ministry-arrear-details-with-crv.component.html',
  styleUrls: ['./online-ministry-arrear-details-with-crv.component.scss']
})
export class OnlineMinistryArrearDetailsWithCrvComponent implements OnInit {

  ministryArrearForm: FormGroup;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  docData: any;
  documentTitle = "";
  onlinePouroshovaAndCityData: any;
  isProgress: boolean = false;
  isTrue: boolean = false;
  report: any;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  reportType: any[] = [
    {"key":'1', "value":'Summary'},
    {"key":'2', "value":'Details'},
    {"key":'3', "value":'Negative Arrear'},
  ];
  allMinistry = {code: '0', name: 'All'};
  zoneDataList: any;
  ministryDataList: any [];
  ministryArrerList: any;
  //submitted: boolean = false;
  zoneList: any[];
  locationDataDd: any[];
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  locationList: any = localStorage.getItem("locationCodeList");
  locationCodes = this.locationList.split(',');
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  isLoading: boolean=false;
  locationCodeListSession: any[];
  ministryData: any;
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe,
    private _ministryService: MinistryService,
    private _crvSummarySvc: OnlineMinistryArrearSummaryWithCrvService,
    private _crvDetailsSvc: OnlineMinistryArrearDetailsWithCrvService,
    private _negativeCrvDetailsSvc: OnlineMinistryNegativeArrearCrvService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMinistry();
    this.getAllZoneList();
    this.getZoneByUser();
  }

  getAllMinistry(){
    this._ministryService.getAllMinistry().subscribe(res =>{
        this.ministryDataList=res.data as any[];
    });
  }

  private getAllZoneList(){
    if(this.roleName=='Admin'){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDDByZone(zoneCode);
      this.ministryArrearForm.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.ministryArrearForm.controls['locationCode'].disable();
      this.f.locationCode.setValue('0');
      // this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
  }
  private getLocationDDByZone(event:any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }

  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(res => {
      this.ministryArrearForm.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.ministryArrearForm.patchValue({
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
          this.ministryArrearForm.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName;

      if(this.ministryArrearForm.value.reportType=='1'){
        fileName = 'Online Ministry Arrear Summary With CRV' ;
      }else if(this.ministryArrearForm.value.reportType=='2'){
        fileName = 'Online Ministry Arrear Details With CRV' ;
      }else{
        fileName = 'Online Ministry Negative Arrear Details With CRV' ;
      }
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    
    else if(event==2 || event==3){
      let fileName;

      if(this.ministryArrearForm.value.reportType=='1'){
        fileName = 'Online Ministry Arrear Summary With CRV' ;
      }else if(this.ministryArrearForm.value.reportType=='2'){
        fileName = 'Online Ministry Arrear Details With CRV' ;
      }else {
        fileName = 'Online Ministry Negative Arrear Details With CRV' ;
      }
      let excelObj = {data: this.docData.docDefinition.content[0].table.body}
      this._excelService.downloadExcelFile(excelObj,fileName);
    }
  }

  public onSearchAgain() {
    this.isTrue = false;
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  onReport(){

    this.isProgress = true;
    if (this.ministryArrearForm.invalid) {
      this.isProgress = false;
      return;
    }
    let reportObj ={
      billMonth: this.datePipe.transform(this.f.billMonth.value, 'yMM'),
      ministry: this.f.ministryCode.value,
      location:this.f.locationCode.value,
      locationName:this.f.zoneCode.value!=0 ? this.locationDataDd.filter(x=>x.code==this.f.locationCode.value):'',
    }
    if(this.ministryArrearForm.value.reportType=='1'){
      this._ministryService.getOnlineMinistryArrearDetailsWithCRV(reportObj.billMonth, this.f.ministryCode.value, this.f.zoneCode.value, this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.ministryData = res;
        if (this.ministryData.length > 0) {
          this.docData = this._crvSummarySvc.generatePdf(this.ministryData, reportObj);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress = false;
          });
        }
        else {
          this.isTrue = false;
          this._toasterService.danger("Data Not Found");
          this.isProgress = false;
        }
      }, err => {
        this.isProgress = false;
      });
    }
    else if (this.ministryArrearForm.value.reportType == '2') {
      this._ministryService.getOnlineMinistryArrearDetailsWithCRV(reportObj.billMonth, this.f.ministryCode.value, this.f.zoneCode.value, this.f.locationCode.value,this.f.reportType.value).subscribe((res) => {
        this.ministryArrerList = res as any[];
        if(this.ministryArrerList.length > 0){
          this.docData=this._crvDetailsSvc.generatePdf(this.ministryArrerList, reportObj); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
          });
        } else {
          this.isTrue = false;
          this._toasterService.danger("Data Not Found");
          this.isProgress = false;
        }
      });
    }
    else if (this.ministryArrearForm.value.reportType == '3'){
      this._ministryService.getOnlineMinistryArrearDetailsWithCRV(reportObj.billMonth, this.f.ministryCode.value, this.f.zoneCode.value, this.f.locationCode.value,this.f.reportType.value).subscribe((res) => {
        this.ministryArrerList = res as any[];
        if(this.ministryArrerList.length > 0){
          this.docData=this._negativeCrvDetailsSvc.generatePdf(this.ministryArrerList, reportObj); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
          });
        } else {
          this.isTrue = false;
          this._toasterService.danger("Data Not Found");
          this.isProgress = false;
        }
      });
    }
  }

  createForm() {
    this.ministryArrearForm = this._fb.group({
      billMonth: ["", [Validators.required]],
      ministryCode: ['0', [Validators.required]],
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      reportType:['1',[]]
    });
  }
  get f(){
    return this.ministryArrearForm.controls;
  }

}
