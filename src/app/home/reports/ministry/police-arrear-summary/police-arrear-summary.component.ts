import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { PoliceArrearSummary } from '../../../../model/police-arrear-summary.model';
import { PoliceArrear } from '../../../../model/police-arrear.model';
import { MinistryService } from '../../../../services/ministry.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { ZoneWisePoliceArrearSummaryReportService } from '../../../../services/pdfGenerate/ministry/zone-wise-police-arrear-summary-report.service';
import { ZoneWisePoliseArrearDetailsService } from '../../../../services/pdfGenerate/ministry/zone-wise-polise-arrear-details.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-police-arrear-summary',
  templateUrl: './police-arrear-summary.component.html',
  styleUrls: ['./police-arrear-summary.component.scss']
})
export class PoliceArrearSummaryComponent implements OnInit {

  policeForm: FormGroup;
  zoneList: any[];
  locationDdList: any[];
  submitted: boolean = false;
  policeArrearSummaryData: any[];
  isLocAndReportHideShow: boolean = false;
  public isTrue:boolean=false;
  isProgress:boolean=false;
  docData : any;
  report: any;
  documentTitle = "";
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
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  constructor(
    private _fb: FormBuilder,
    private _ministryService : MinistryService,
    private _zonwisePoliceDetails: ZoneWisePoliseArrearDetailsService,
    private _zoneWisePoliceSummary: ZoneWisePoliceArrearSummaryReportService,
    private _excelService: ExcelServiceService,
    private _datePipe: DatePipe,
    private _toasterService: NbToastrService,
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

  public onChangeSelectDb(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDd(zoneCode);
      this.policeForm.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    } else{
      this.policeForm.controls['locationCode'].disable();
      this.isLocAndReportHideShow = false;
    }
  }

  private getLocationDd(event:any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }

  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(res => {      
      this.policeForm.patchValue({
      locationCode: 0
    })
      this.locationDdList = res.data;
    });
  }
  onChangeExportType(event: any){
    if(this.formCon.reportType.value=='1'){
      if(event==1){
        let date=new Date();
        let fileName='Police Arrear Details Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'Police Arrear Details Report ');
      }
    }
    else{
      if(event==1){
        let date=new Date();
        let fileName='Police Arrear Summary Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'Police Arrear Summary Report ');
      }
    }
  }

  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.policeForm.patchValue({
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
        this.isAll=this.locationByUserZoneList.length==this.locationDdList.length?true:false;

        if(this.isAll){
          this.locationByUserZoneList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.policeForm.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  onSearchAgain(){
    this.isTrue = false;
  }

  onReport(){
    this.isProgress = true;
    this.submitted=true;
    if(this.policeForm.invalid) {this.isProgress = false; return;}
    let reportObj = {
      date : this._datePipe.transform(this.formCon.reportDate.value, "dd-MM-yyyy")
    }
    //Details
    if(this.formCon.reportType.value == '1'){
    this._ministryService.getZoneAndLocatoinWisePoliceArrear(this.formCon.zoneCode.value,dateFormatForReport(this.formCon.reportDate.value).toString(),this.formCon.locationCode.value,this.formCon.reportType.value).subscribe(res => {
      this.policeArrearSummaryData = res as PoliceArrear[];
      if(this.policeArrearSummaryData.length > 0){
        this.docData = this._zonwisePoliceDetails.generatePdf(this.policeArrearSummaryData, reportObj, '');
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        })
      }
      else {
        this.isTrue = false;
        this.isProgress = false;
        this._toasterService.danger("Data Not Found");
      }
    }, err=>{
      this.isProgress=false;
    });
    }
    //Summary
    else if (this.formCon.reportType.value == '2'){
      this._ministryService.getZoneAndLocatoinWisePoliceArrearSummary(this.formCon.zoneCode.value,dateFormatForReport(this.formCon.reportDate.value).toString(),this.formCon.locationCode.value,this.formCon.reportType.value).subscribe(res => {
        this.policeArrearSummaryData = res as PoliceArrearSummary[];
        if(this.policeArrearSummaryData.length > 0){
          this.docData = this._zoneWisePoliceSummary.generatePdf(this.policeArrearSummaryData, reportObj, '');
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress = false;
          })
        }
        else {
          this.isTrue = false;
          this.isProgress = false;
          this._toasterService.danger("Data Not Found");
        }
      }, err=>{
        this.isProgress=false;
      });
    }
  }
  createForm(){
    this.policeForm = this._fb.group({
      zoneCode: ['0'],
      locationCode: ['0'],
      reportDate: ['', [Validators.required]],
      reportType: ['1']
    })
  }

  get formCon(){
    return this.policeForm.controls;
  }
}
