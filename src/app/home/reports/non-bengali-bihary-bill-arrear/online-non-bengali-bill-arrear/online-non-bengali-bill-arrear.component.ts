import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { OnlineNonbengaliBiharyBill } from '../../../../model/online-nonbengali-bihary-bill.model';
import { MinistryService } from '../../../../services/ministry.service';
import { NonBengaliService } from '../../../../services/non-bengali.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { NonBengaliBiharyBillArrearService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/non-bengali-bihary-bill-arrear.service';
import { NonBengaliDetailsService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/non-bengali-details.service';
import { OnlineNonBengaliBillArrearDetailsService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/online-non-bengali-bill-arrear-details.service';
import { OnlineNonBengaliBillArrearSummaryService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/online-non-bengali-bill-arrear-summary.service';

@Component({
  selector: 'ngx-online-non-bengali-bill-arrear',
  templateUrl: './online-non-bengali-bill-arrear.component.html',
  styleUrls: ['./online-non-bengali-bill-arrear.component.scss']
})
export class OnlineNonBengaliBillArrearComponent implements OnInit {

  public form: FormGroup;
  submitted:boolean=false;
  public isTrue:boolean=false;
  isProgress:boolean=false;
  nonBengali
  public report: any;
  pouroshovaAndCityData: any;
  isLocAndReportHideShow: boolean = false;
  nonbengliDetailsDynamicDataList: any;
  nonbengliDetailsStaticDataList: any;
  nonbengliDetailsDataList: any;
  docData: any;
  locationList: any[];
  nonBengaliData: any;
  nonBengaliSummaryData: any;
  zoneDataList: any[];
  documentTitle = "";
  reportType: any[]=[
    {"key":'1', "value":"Summary"},
    {"key":'2', "value":"Details"},
  ];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  zoneList: any[];
  locationDataDd: any[];
  locationCodeValue: string;
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  constructor(
    private _ministryService: MinistryService,
    private _excelService: ExcelServiceService,
    private fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _datePipe: DatePipe,
    private __nonBengaliService: NonBengaliService,
    private _pdfService: OnlineNonBengaliBillArrearSummaryService,
    private _pdfNonBengaliDetails:OnlineNonBengaliBillArrearDetailsService,
  ) { }

  ngOnInit(): void {
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
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }

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

  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.form.patchValue({
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
          this.form.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  public onSearchAgain(){
    this.isTrue=false;
  }

  onChangeExportType(event:any){
    if(this.formCon.reportType.value=='1'){
      if(event==1){
        let date=new Date();
        let fileName='Non-Bengali (Bihary Camp) Summary Report '+dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
        let arr = [...this.docData.docDefinition.content[0].table.body,...this.docData.docDefinition.content[1].table.body,...this.docData.docDefinition.content[2].table.body]
        let excelObj = {
          data: arr,
        }
        this._excelService.downloadExcelFile(excelObj, 'Non-Bengali (Bihary Camp) Summary Report ');
      }
    }
    else{
      if(event==1){
        let date=new Date();
        let fileName='Non-Bengali (Bihary Camp) Details Report '+dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
        let excelObj = {
          data: this.docData.docDefinition.content[0].table.body,
        }
        this._excelService.downloadExcelFile(excelObj, 'Non-Bengali (Bihary Camp) Details Report ');
      }
    }
  }

  public onReport(){
    debugger;
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) {this.isProgress=false;return;}
    let utilityObj = {
      billMonth:this._datePipe.transform(this.formCon.billMonth.value, 'yMM'),
     };
    //  let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneList : this.zoneByUserList;
    //  let locationTesultDataList=this.roleName.toLocaleLowerCase()=='admin'?this.locationDataDd:this.locationByUserZoneList;
     //Summary 
    if(this.formCon.reportType.value == '1'){
        this.__nonBengaliService.getOnlineNonBengaliSummaryDataByDate( this.formCon.zoneCode.value, this.formCon.locationCode.value, utilityObj.billMonth, this.formCon.reportType.value).subscribe((res:any)=>{
          this.nonBengaliSummaryData=res;
          console.log("summary",this.nonBengaliSummaryData)
          if(this.nonBengaliSummaryData.nonbengliDetailsStaticDataList !=null && this.nonBengaliSummaryData.nonbengliDetailsDynamicDataList != null){
            this.docData=this._pdfService.generatePdf(this.nonBengaliSummaryData, utilityObj.billMonth); 
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
      //Details
      this.__nonBengaliService.getOnlineNonBengaliSummaryDataByDate( this.formCon.zoneCode.value, this.formCon.locationCode.value,utilityObj.billMonth, this.formCon.reportType.value).subscribe((res:any)=>{
      this.nonBengaliData=res;
      console.log(this.nonBengaliData);
      
      if(this.nonBengaliData.nonbengliDetailsDataList != null){
        this.docData=this._pdfNonBengaliDetails.generatePdf(this.nonBengaliData, this.formCon.billMonth.value); 
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

  private createForm() {
    this.form = this.fb.group({
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      billMonth: ['', []],
      reportType: ['1'],
    })
  }
  get formCon(){
    return this.form.controls;
  }

}
