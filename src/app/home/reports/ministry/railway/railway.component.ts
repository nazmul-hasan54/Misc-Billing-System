import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { MinistryService } from '../../../../services/ministry.service';
import { MinistryWiseMinistryDetailsService } from '../../../../services/pdfGenerate/ministry/ministry-wise-ministry-details.service';
import { NbToastrService } from '@nebular/theme';
import { RailwayArrearModel } from '../../../../model/railway-arrear.model';
import { RailwayArrearSummary } from '../../../../model/railway-arrear-summary.model';
import { RailwaydetailsService } from '../../../../services/pdfGenerate/ministry/railway-details.service';
import { ReligiousService } from '../../../../services/religious.service';
import { Router } from '@angular/router';
import { ZoneWiseRailwayArrearSummaryService } from '../../../../services/pdfGenerate/ministry/zone-wise-railway-arrear-summary.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-railway',
  templateUrl: './railway.component.html',
  styleUrls: ['./railway.component.scss']
})
export class RailwayComponent implements OnInit {

  form: FormGroup;
  zoneList: any[];
  locationDdList: any[];
  submitted: boolean = false;
  isLocAndReportHideShow: boolean = false;
  docData : any;
  railwayData: RailwayArrearModel[];
  railwaySummaryData: RailwayArrearSummary[];
  report: any;
  documentTitle = "";
  isTrue:boolean=false;
  isProgress:boolean=false;
  isLoading: boolean = false;
  circleList: any[];
  locationDataDd: any[];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];

  reportType: any[] = [
    {"key":'1', "value":'Details'},
    {"key": '2', "value": 'Summary'}
  ];
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: boolean;
  isAll: boolean;
  constructor(
    private _fb: FormBuilder,
    private _ministryService : MinistryService,
    private _zonLocWiseRailwayService: RailwaydetailsService,
    private _zoneWiseRailwaySummarySvc: ZoneWiseRailwayArrearSummaryService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private datePipe: DatePipe,
    private _ministryCustomer: MinistryCustomeService,
    private _religiosService: ReligiousService,
    private _serviceMinistry: MinistryService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneList();
    this.getZoneByUser();
  }

  private getAllZoneList(){
    if(this.roleName=="Admin"){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }
  getZoneWiseCircle(event: any) {
    if(this.roleName=="Admin"){
      this.getCircleList(event);
    }
  }

  private getCircleList(event: any){
    this._ministryCustomer.getAllZoneWiseCircle(event).subscribe((res => {
      this.circleList = res.data as any[];
       this.formCon.circleCode.setValue('0');
       this.formCon.locationCode.setValue('0');
     }));
  }

  getLocationDDByCircle(event: any) {
    if(this.roleName=="Admin"){
      this.getLocationList(event);
    }
  }
  private getLocationList(event:any){
    this._religiosService.getAllLocationByCircle(event).subscribe(res => {
      this.locationDataDd = res as any[];
      this.formCon.locationCode.setValue('0');
    });
  }

  public onChangeSelectDb(event){
    this._ministryCustomer.getAllZoneWiseCircle(event).subscribe((res => {
      this.circleList = res.data as any[];
      this.formCon.circleCode.setValue('0');
      this.formCon.locationCode.setValue('0');
    }))
  }
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._serviceMinistry.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.form.patchValue({
          zoneCode:this.zoneByUserList[0].code
        });
        this.getCircleByUserNameZoneCode(this.zoneByUserList[0].code);
      });
    }
  }
  getCircleByUserNameZoneCode(event:any){
    this.getCircleList(event);
    setTimeout(()=>{
      if(this.roleName!='Admin'){
        this._serviceMinistry.getCircleByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
          this.circleByUserZoneList=res as any[];
         this.isAllAdded =  this.circleByUserZoneList.length == this.circleList.length ? true : false;
        
         if(this.isAllAdded){
          this.circleByUserZoneList.unshift({id: 1,name: "All",nameBn:null, nulltemp_C: "all",code: "0",zoneCode: "0"})
         }
          setTimeout(()=>{
            this.form.patchValue({
              circleCode:this.circleByUserZoneList[0].code
            });
          },300) ;
          this.getLocationByUserNameCircleCodes(this.circleByUserZoneList[0].code);
        });
      }
    },250);
  }
  getLocationByUserNameCircleCodes(event:any){
    this.getLocationList(event);
    setTimeout(()=>{if(this.roleName!='Admin'){
      this._serviceMinistry.getLocationByUserNameCircleCode(this.userNames[0],event).subscribe((res:any)=>{
        this.locationByUserCircleList=res as any[];
        this.isAll=this.locationByUserCircleList.length==this.locationDataDd.length?true:false;

        if(this.isAll){
          this.locationByUserCircleList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.form.patchValue({
            locationCode:this.locationByUserCircleList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  private getLocationDd(zoneCode : string){
    this._ministryService.getLocationDDByZoneCode(zoneCode).subscribe(res => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDdList = res.data;
    });
  }

  onChangeExportType(event:any){
    //this.isLoading = true;
    if(this.formCon.reportType.value=='1'){
      if(event==1){
        let date=new Date();
        let fileName='Railway Arrear Details Report '+dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
        let date=new Date();
        this.isLoading = true;
        let excelObj = {
          data: this.docData.docDefinition.content[0].table.body,
        }
       
        setTimeout(() => {
          let exporter =  this._excelService.downloadExcelFile(excelObj, 'Railway Arrear Details Report '+dateFormatForReport(date));
            //@ts-ignore
          if(exporter.payload.data.length > 0 ){
            this.isLoading = false;
          }
        }, 800);
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    }
    else{
      if(event==1){
        let date=new Date();
        let fileName='Railway Arrear Summary Report '+dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
        let date=new Date();
        this.isLoading = true;
        let excelObj = {
          data: this.docData.docDefinition.content[0].table.body,
        }
       
        setTimeout(() => {
          let exporter =  this._excelService.downloadExcelFile(excelObj, 'Railway Arrear Summary Report '+dateFormatForReport(date));
            //@ts-ignore
          if(exporter.payload.data.length > 0 ){
            this.isLoading = false;
          }
        }, 800);
        setTimeout(() => {
          this.isLoading = false;
        }, 3000);
      }
    }
  }

  onSearchAgain(){
    this.isTrue=false;
  }

  onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) { this.isProgress = false;return};

    let reportObj = {
      billMonth:this.datePipe.transform(this.formCon.reportDate.value, 'dd-MM-yy')
    };
    //Details
    if(this.formCon.reportType.value == '1'){
      this._ministryService.getZoneAndLocationWiseRailwayArrear(this.formCon.zoneCode.value, dateFormatForReport(this.formCon.reportDate.value).toString(), this.formCon.locationCode.value, this.formCon.reportType.value, this.formCon.circleCode.value).subscribe(res => {
        this.railwayData = res as RailwayArrearModel[];
        if(this.railwayData.length > 0){
            this.docData = this._zonLocWiseRailwayService.generatePdf(this.railwayData, this.formCon.reportDate.value,reportObj);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
            })
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
    //Summary
    else if(this.formCon.reportType.value == '2'){
      this._ministryService.getZoneWiseRailwayArrearSummary(this.formCon.zoneCode.value, dateFormatForReport(this.formCon.reportDate.value).toString(), this.formCon.locationCode.value, this.formCon.reportType.value, this.formCon.circleCode.value).subscribe(res => {
        this.railwaySummaryData = res as RailwayArrearSummary[];
        if(this.railwaySummaryData.length > 0){
            this.docData = this._zoneWiseRailwaySummarySvc.generatePdf(this.railwaySummaryData, this.formCon.reportDate.value,reportObj);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
            })
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
  }
  
  createForm(){
    this.form = this._fb.group({
      zoneCode: ['0',[]],
      circleCode: ['0',[]],
      locationCode: ['0',[]],
      reportDate: ['', [Validators.required]],
      reportType: ['1',[]]
    })
  }

  get formCon(){
    return this.form.controls;
  }
  get formVal(){
    return this.form.value;
  }

}

