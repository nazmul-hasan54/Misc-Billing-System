import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { Ministry } from '../../../../model/ministry.model';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { MinistryService } from '../../../../services/ministry.service';
import { MinistryWiseMinistryDetailsService } from '../../../../services/pdfGenerate/ministry/ministry-wise-ministry-details.service';
import { NbToastrService } from '@nebular/theme';
import { ReligiousService } from '../../../../services/religious.service';
import { Router } from '@angular/router';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ZoneWiseSummaryService } from '../../../../services/pdfGenerate/ministry/zone-wise-summary.service';

@Component({
  selector: 'ngx-ministry-details',
  templateUrl: './ministry-details.component.html',
  styleUrls: ['./ministry-details.component.scss'],
  providers: [DatePipe]
})
export class MinistryDetailsComponent implements OnInit {

  public form: FormGroup;
  public isTrue:boolean=false;
  public report: any;
  ministryData: any[];
  isProgress:boolean=false;
  isLoading: boolean = false;
  submitted:boolean=false;
  
  docData: any;
  documentTitle = "";
  selectedValue: any[];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  reportType: any[] = [
    {"key":'1', "value":'Details'},
    {"key": '2', "value": 'Summary'}
  ];
  zoneList: any[];
  public selectedItem ='0';
  allMinistry = {code: '0', name: 'All'};
  allDbConfig = {dbCode: '0', name: 'All'}
  ministryDropDownData: any;
  dbConfigData: any[];
  locationDataDd: any[];
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;
  circleList: any[];
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: boolean;
  isAll: boolean;
  constructor(
    private fb: FormBuilder,
    private _service: MinistryService,
    private _pdfService: MinistryWiseMinistryDetailsService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe,
    private _pdfzoneWiseMinistrySummaryService:ZoneWiseSummaryService,
    private _ministryCustomer: MinistryCustomeService,
    private _religiosService: ReligiousService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMinistry();
    this.getAllDatabaseDD();
    this.getAllZoneList();
    this.getZoneByUser();
  }

  private getAllMinistry(){
    return this._service.getAllMinistry().subscribe(res =>{
        this.ministryDropDownData=res.data;
        this.form.controls['code'].setValue(this.allMinistry);
    });
  }

  private getAllZoneList(){
    if(this.roleName=="Admin"){
      this._service.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  getZoneWiseCircle(event: any) {
    if(this.roleName=='Admin'){
      this.getCircleList(event);
    }
  }
  private getCircleList(event: any){
    this._ministryCustomer.getAllZoneWiseCircle(event).subscribe((res => {
      this.circleList = res.data as any[];
      this.formCon.circleCode.setValue('0');
      this.formCon.locationCode.setValue('0');
    }))
  }
  getLocationDDByCircle(event: any) {
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }

  private getLocationList(event:any){
    this._religiosService.getAllLocationByCircle(event).subscribe(res => {
      this.locationDataDd = res as any[];
      this.formCon.locationCode.setValue('0');
    });
  }
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._service.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
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
        this._service.getCircleByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
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
      this._service.getLocationByUserNameCircleCode(this.userNames[0],event).subscribe((res:any)=>{
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

   private getAllDatabaseDD() {
    this._service.getAllDbConfigDDList().subscribe(response => {
      this.dbConfigData = response.data;
    });
  }

  // public onChangeSelectedDb(dbCode){
  //   if(dbCode != '0'){
  //     this.getLocationDD(dbCode);
  //     this.form.controls['locationCode'].enable();
  //     this.isLocAndReportHideShow = true;
  //   }
  //   else {
  //     this.form.controls['locationCode'].disable();
  //     this.locationCodeValue = "0";
  //     this.isLocAndReportHideShow = false;
  //   }
  // }

  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDDByZone(zoneCode);
      this.form.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.form.controls['locationCode'].disable();
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
  }

  // private getLocationDD(dbCode: string){
  //   this._service.getLocationDDList(dbCode).subscribe(res => {
  //     this.form.patchValue({
  //       locationCode: 0
  //     })
  //     this.locationDataDd = res.data;
  //   });
  // }
  private getLocationDDByZone(zoneCode: string){
    this._service.getLocationDDByZoneCode(zoneCode).subscribe(res => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }


  public onSearchAgain(){
    this.isTrue=false;
    //this.getAllMinistry();
  }

  onChangeExportType(event:any){
    //this.isLoading = true;
    if(event==1){
      let date=new Date();
      let fileName='Ministry Wise Ministry Details'+dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
      //setTimeout(() => this.isLoading = false, 20000);
    }
    else if(event==2 || event==3){
      this.isLoading = true;
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }
     
      setTimeout(() => {
        let exporter =  this._excelService.downloadExcelFile(excelObj, 'Ministry Wise Ministry Details');
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

  public onReport(){
    this.isProgress=true;
    this.submitted=true;
    let ministryCode  =this.form.value.code.code;
    
    if(this.form.invalid) { this.isProgress = false;return};

    let utilityObj = {
      //billMonth:this.datePipe.transform(this.formCon.currentDate.value, 'dd-MMM-yy'),
      billMonth:this.datePipe.transform(this.formCon.currentDate.value, 'yMM'),
      ministry: this.form.value.code,
      ministryName:this.ministryDropDownData,
      reportType:this.form.value.reportType,
    };

    if(this.formCon.reportType.value=='1'){
      this._service.getAllMinistryByMinistryAndCode(utilityObj.billMonth, ministryCode,this.form.value.isRebate,
        this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.circleCode.value,this.formCon.reportType.value).subscribe(res=>{
        this.ministryData=res.data;
        if(this.ministryData.length>0){
          this.docData=this._pdfService.generatePdf(this.ministryData,utilityObj, this.zoneList); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
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
    else{
      this._service.getAllMinistryByMinistryAndCode(utilityObj.billMonth, ministryCode,this.form.value.isRebate,
        this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.circleCode.value,this.formCon.reportType.value).subscribe(res=>{
        this.ministryData=res.data;
        if(this.ministryData.length>0){
          this.docData=this._pdfzoneWiseMinistrySummaryService.generatePdf(this.ministryData,utilityObj); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
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
  }

  private createForm(){
    this.form = this.fb.group({
      currentDate: ['',[Validators.required]],
      code: [this.allMinistry, [Validators.required]],
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0',[]],
      circleCode:['0',[]],
      userName:[this.userName,[]],
      isRebate:[false,[]],
      reportType:['1',[]]
    })
  }
  get formVal(){
    return this.form.value;
  }
  get formCon(){
    return this.form.controls;
  }
}
