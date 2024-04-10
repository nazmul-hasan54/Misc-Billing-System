import { Component, OnInit } from '@angular/core';
import { MinistryService } from '../../../../services/ministry.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { NbToastrService } from '@nebular/theme';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OnlineCitycorpoAndPouroshovaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-and-pouroshova.service';
import { OnlineCitycorpoAndPouroshovaDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-and-pouroshova-details.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { OnlineCitycorpoPouroshovaDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-pouroshova-details.service';
import { OnlineCitycorpoPouroshovaPaymentDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-pouroshova-payment-details.service';

@Component({
  selector: 'ngx-online-citycorpo-and-pouroshova-details',
  templateUrl: './online-citycorpo-and-pouroshova-details.component.html',
  styleUrls: ['./online-citycorpo-and-pouroshova-details.component.scss']
})
export class OnlineCitycorpoAndPouroshovaDetailsComponent implements OnInit {
  form: FormGroup;

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
  reportType: any[]=[
    {"key":'1', "value":"Details "},
    {"key":'2', "value":"Payment Details"},
  ];

  zoneDataList: any;
  cityCorporationDataList: any;
  submitted: boolean = false;
  zoneList: any[];
  locationDataDd: any[];
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  isLoading: boolean=false;
  fileName:any;
  exporter:any;
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe,
    private _pdfService: OnlineCitycorpoPouroshovaDetailsService,
    private _pdfPaymentService: OnlineCitycorpoPouroshovaPaymentDetailsService,
    private _pdfDetailsService:OnlineCitycorpoAndPouroshovaDetailsService,
    private _service: PourAndCityCorporService,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    this.getAllZoneDataList();
    this.getAllCityCorporationDataList();
    this.getAllZoneList();
    this.getZoneByUser();
  }

  private getAllZoneDataList() {
    this._service.getAllZoneDataList().subscribe((res) => {
      this.zoneDataList = res.data;
    });
  }
  private getAllCityCorporationDataList() {
    this._service.getAllCityCorporationDatList().subscribe((res) => {
      this.cityCorporationDataList = res.data;
    });
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

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      if(this.fCon.reportType.value == '1'){
        this.fileName ="Online Pouroshova and City Corporation Details " +dateFormatForReport(date);
      }else {
        this.fileName ="Online Pouroshova and City Corporation Payment Details " +dateFormatForReport(date);
      }
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${this.fileName}.pdf`;
      link.click();
    } 
    else if (event == 2 || event == 3) {
      this.isLoading = true;
      let excelObj = { data: this.docData.docDefinition.content[0].table.body};


      
      setTimeout(() => {
        if(this.fCon.reportType.value == '1'){
          this.exporter =  this._excelService.downloadExcelFile( excelObj,"Online Pouroshova and City Corporation Details");
        }else{
          this.exporter =  this._excelService.downloadExcelFile( excelObj,"Online Pouroshova and City Corporation Payment Details");
        }
          //@ts-ignore
        if(this.exporter.payload.data.length > 0 ){
          this.isLoading = false;
        }
      }, 800);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }

  public onSearchAgain() {
    this.isTrue = false;
  }

  onReport() {
    this.isProgress = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isProgress = false;
      return;
    }      
      let utilityObj = {
        billMonth: this.datePipe.transform(this.fCon.billMonth.value, "yMM"),
        ministry: this.form.value.code,
      };

      this._service.getOnlinePouroshovaAndCityCorporationBnDetails(utilityObj.billMonth,this.fCon.zoneCode.value,this.fCon.locationCode.value).subscribe((res:any) => {
      this.onlinePouroshovaAndCityData = res ;
            if(this.fCon.reportType.value == '1'){
              if (this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList.length>0) {
                this.docData = this._pdfService.generatePdf(this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList,this.fCon.billMonth.value);
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
            }
            else{
              if (this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList.length>0) {
                this.docData = this._pdfPaymentService.generatePdf(this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList,this.fCon.billMonth.value);
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
            }
        },
        (err) => {
          this.isProgress = false;
        });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }
  createForm() {
    this.form = this._fb.group({
      billMonth: ["", [Validators.required]],
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      reportType: ['1'],
    });
  }

  get fCon() {
    return this.form.controls;
  }
  get fVal() {
    return this.form.value;
  }
}
