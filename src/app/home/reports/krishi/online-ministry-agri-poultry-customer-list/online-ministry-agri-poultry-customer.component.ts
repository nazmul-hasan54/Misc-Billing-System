import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { MinistryService } from '../../../../services/ministry.service';
import { OnlineAgricultureService } from '../../../../services/online-agriculture.service';
import { AgriculureCustListService } from '../../../../services/pdfGenerate/agriculture/online-agriculture/agriculure-cust-list.service';
import { MinistryWiseCustListService } from '../../../../services/pdfGenerate/agriculture/online-agriculture/ministry-wise-cust-list.service';
import { OnlineAgriPoultryCustListService } from '../../../../services/pdfGenerate/agriculture/online-agriculture/online-agri-poultry-cust-list.service';
import { PoultryCustListService } from '../../../../services/pdfGenerate/agriculture/online-agriculture/poultry-cust-list.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-online-ministry-agri-poultry-customer',
  templateUrl: './online-ministry-agri-poultry-customer.component.html',
  styleUrls: ['./online-ministry-agri-poultry-customer.component.scss']
})
export class OnlineMinistryAgriPoultryCustomerComponent implements OnInit {

  agriculturePoultryform:FormGroup;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  reportTypeList:any[]=[
    {"id":1,"name":"Ministry Wise"},
    {"id":2,"name":"Agriculture And Poultry"},
    {"id":3,"name":"Agriculture"},
    {"id":4,"name":"Poultry"},
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
    private _ministryWiseKrishi: MinistryWiseCustListService,
    private _agricultureAndPoultry: OnlineAgriPoultryCustListService,
    private _agricultureService: AgriculureCustListService,
    private _poultryService: PoultryCustListService,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService
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

  onReport(){
    let reportObj = {
      billMonth: this._datePipe.transform(this.f.billMonth.value, 'yMM')
    }
    this.isProgress = true;
    if(this.f.reportType.value == '1'){
      this._onlineAgriculture.getOnlineAgriPoultryData(reportObj.billMonth,this.f.zoneCode.value,this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.agricultureList = res;
        
        console.log("customer1",this.agricultureList)
        if(this.agricultureList.length > 0){
          this.docData = this._ministryWiseKrishi.generatePdf(this.agricultureList, reportObj);
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
    else if(this.f.reportType.value == '2'){
      this._onlineAgriculture.getOnlineAgriPoultryData(reportObj.billMonth,this.f.zoneCode.value,this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.agricultureList = res;
        
        console.log("customer2",this.agricultureList)
        if(this.agricultureList.length > 0){
          this.docData = this._agricultureAndPoultry.generatePdf(this.agricultureList, reportObj);
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
    else if(this.f.reportType.value == '3'){
      this._onlineAgriculture.getOnlineAgriPoultryData(reportObj.billMonth,this.f.zoneCode.value,this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.agricultureList = res;
        
        console.log("customer3",this.agricultureList)
        console.log(this.agricultureList)
        if(this.agricultureList.length > 0){
          this.docData = this._agricultureService.generatePdf(this.agricultureList, reportObj);
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
    else {
      this._onlineAgriculture.getOnlineAgriPoultryData(reportObj.billMonth,this.f.zoneCode.value,this.f.locationCode.value,this.f.reportType.value).subscribe(res => {
        this.agricultureList = res;
        console.log("customer4",this.agricultureList)
        if(this.agricultureList.length > 0){
          this.docData = this._poultryService.generatePdf(this.agricultureList, reportObj);
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
  }

  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName;
      if(this.f.reportType.value=='1'){
        fileName='Agriculture Ministry Consumer List';
      }
      else if(this.f.reportType.value=='2'){
        fileName='Agriculture and Poultry Consumer List';
      }
      else if(this.f.reportType.value=='3'){
        fileName='Agriculture Consumer List';
      }
      else if(this.f.reportType.value=='4'){
        fileName='Poultry Consumer List';
      }
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
      let fileName;
      if(this.f.reportType.value=='1'){
        fileName='Agriculture Ministry Consumer List';
      }
      else if(this.f.reportType.value=='2'){
        fileName='Agriculture and Poultry Consumer List';
      }
      else if(this.f.reportType.value=='3'){
        fileName='Agriculture Consumer List';
      }
      else if(this.f.reportType.value=='4'){
        fileName='Poultry Consumer List';
      }
      this._excelService.downloadExcelFile(excelObj, fileName);
    }
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  get formVal(){
    return this.agriculturePoultryform.value;
  }

  get f(){
    return this.agriculturePoultryform.controls;
  }

  createForm(){
    this.agriculturePoultryform=this._fb.group({
      billMonth:['', [Validators.required]],
      zoneCode: ['0', [Validators.required]],
      locationCode: ['0'],
      reportType: [1]
    })
  }
}
