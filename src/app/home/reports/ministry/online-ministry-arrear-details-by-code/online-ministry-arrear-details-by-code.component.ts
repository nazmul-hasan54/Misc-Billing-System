import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { MinistryService } from '../../../../services/ministry.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { OnlineMinistryArrearDetailsByCodeService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear-details-by-code.service';
import { OnlineMinistryArrearDetailsService } from '../../../../services/pdfGenerate/ministry/online-ministry-arrear-details.service';
import { OnlineMinistryWiseSummaryService } from '../../../../services/pdfGenerate/ministry/online-ministry-wise-summary.service';
import { OnlineZoneWiseSummaryService } from '../../../../services/pdfGenerate/ministry/online-zone-wise-summary.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';

@Component({
  selector: 'ngx-online-ministry-arrear-details-by-code',
  templateUrl: './online-ministry-arrear-details-by-code.component.html',
  styleUrls: ['./online-ministry-arrear-details-by-code.component.scss']
})
export class OnlineMinistryArrearDetailsByCodeComponent implements OnInit {

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
    {"key": '1', "value": 'Summary'},
    {"key":'2', "value":'Details'}
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
    private _service: PourAndCityCorporService,
    private _ministryService: MinistryService,
    private _pdfSummaryService: OnlineMinistryWiseSummaryService,
    private _serviceMinistry: MinistryService,
    private _pdfService: OnlineMinistryArrearDetailsByCodeService
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

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Online Ministry Arrear Details' ;
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    
    else if(event==2 || event==3){
      let excelObj = {data: this.docData.docDefinition.content[0].table.body}
      this._excelService.downloadExcelFile(excelObj, 'Online Ministry Arrear Details');
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
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
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
    }
    if(this.ministryArrearForm.value.reportType=='1'){
      this._ministryService.getOnlineMinistryArrearDetailsByCode(reportObj.billMonth, this.f.ministryCode.value, this.f.zoneCode.value, this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.ministryData = res;
        if (this.ministryData.length > 0) {
          this.docData = this._pdfSummaryService.generatePdf(this.ministryData, reportObj);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress = false;
          });
        }
        else {
          this.isTrue = false;
          this._toasterService.danger("No Data Found");
          this.isProgress = false;
        }
      }, err => {
        this.isProgress = false;
      });
    }
    else{
      this._ministryService.getOnlineMinistryArrearDetailsByCode(reportObj.billMonth, this.f.ministryCode.value, this.f.zoneCode.value, this.f.locationCode.value,this.f.reportType.value).subscribe((res) => {
        this.ministryArrerList = res as any[];
        if(this.ministryArrerList.length > 0){
          this.docData=this._pdfService.generatePdf(this.ministryArrerList, reportObj); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
          });
        } else {
          this.isTrue = false;
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
