import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { NbToastrService } from '@nebular/theme';
import { PourAndCityCorporBanglaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/pour-and-city-corpor-bangla.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { UnionporishodService } from '../../../../services/pdfGenerate/zonewise-unionporishod/unionporishod.service';
import { ZonewiseUnionService } from '../../../../services/zonewise-union.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { getTestBed } from '@angular/core/testing';
import { UnionporishodDetailsService } from '../../../../services/pdfGenerate/zonewise-unionporishod/unionporishod-details.service';
import { MinistryService } from '../../../../services/ministry.service';
import { DatePipe } from '@angular/common';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { ReligiousService } from '../../../../services/religious.service';

@Component({
  selector: 'ngx-zonewise-unionporishod',
  templateUrl: './zonewise-unionporishod.component.html',
  styleUrls: ['./zonewise-unionporishod.component.scss']
})
export class ZonewiseUnionporishodComponent implements OnInit {
  public form: FormGroup;
  public isTrue: boolean = false;
  public report: any;
  pouroshovaAndCityData: any;
  zoneDataList: any[];
  docData: any;
  documentTitle = "";
  isProgress: boolean = false;
  submitted: boolean = false;
  reportType: any[]=[
    {"key":'1', "value":"Summary"},
    {"key":'2', "value":"Details"},
  ];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  cityCorporationDataList: any;
  zoneList: any[];
  locationDataDd: any[];
  isLocAndReportHideShow:boolean=false;
  locationCodeValue: string;
  circleList:any;
  locationData:any;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: boolean;
  isAll: boolean;
  constructor(
    private _service: PourAndCityCorporService,
    private fb: FormBuilder,
    private _pdfService: UnionporishodService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _unionServie: ZonewiseUnionService,
    private _ministryService: MinistryService,
    private _pdfUnionDetails:UnionporishodDetailsService,
    private _ministryCustomer: MinistryCustomeService,
    private _datePipe: DatePipe,
    private _religiosService: ReligiousService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDataList();
    this.getZoneByUser();
    // this.getAllZoneList();
  }

  
  getAllZoneDataList() {
    if(this.roleName=="Admin"){
      this._service.getAllZoneDataList().subscribe(res => {
        this.zoneDataList = res.data;
      });
    }
  }

  getZoneWiseCircle(event: any) {
    if(this.roleName=="Admin"){
      this.getCircleList(event);
    }
  }
  private getCircleList(event: any){
    this._ministryCustomer.getAllZoneWiseCircle(event).subscribe(res => {
      this.form.patchValue({
        circleCode: '0'
      })
        this.circleList = res.data as any[];
    });
  }
  public onChangeSelectDb(circleCode){
    if(circleCode != '0'){
      this.getLocationDDByCircle(circleCode);
      this.form.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    } else{
      this.form.controls['locationCode'].disable();
      this.isLocAndReportHideShow = false;
    }
    
  }
  getLocationDDByCircle(event: any){
    if(this.roleName=="Admin"){
      this.getLocationList(event);
    }
  }

  private getLocationList(event:any){
    this._religiosService.getAllLocationByCircle(event).subscribe(res => {
      this.form.patchValue({
        locationCode: '0'
      })
    this.locationData = res as any[];
    });
  }

  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
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
        this._ministryService.getCircleByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
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
      this._ministryService.getLocationByUserNameCircleCode(this.userNames[0],event).subscribe((res:any)=>{
        this.locationByUserCircleList=res as any[];
        this.isAll=this.locationByUserCircleList.length==this.locationData.length?true:false;

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

  public onSearchAgain() {
    this.isTrue = false;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Zone Wise UnionParishod Arrear ' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'জোন অনুসারে ইউনিয়ন পরিষদ বকেয়া বিবরনী');
    }
  }

  public onReport() {
    this.isProgress = true;
    this.submitted = true;
    if (this.form.invalid) { this.isProgress = false; return }   
    
    let reportObj = {
      billMonth: this._datePipe.transform(this.formCon.billMonth.value, "yMM")
      // currentDate: this._datePipe.transform(this.formCon.currentDate.value, "MM'yyyy")
      // billMonth:this.formCon.currentDate.value,
    }
    if(this.form.value.circleCode == '0'){
      debugger;
      this.form.patchValue({
        locationCode:'0',
      })
    }
    // Zone Wise UnionParishod Arrear Summary 
      if(this.formCon.reportType.value == '1'){
      this._unionServie.getZoneWsieUnionData(this.formCon.zoneCode.value,this.formCon.circleCode.value,this.formCon.locationCode.value,reportObj.billMonth,this.formCon.reportType.value).subscribe(res => {
        this.pouroshovaAndCityData = res;
       let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneDataList : this.zoneByUserList;
        if (this.pouroshovaAndCityData.length > 0) {
          this.docData = this._pdfService.generatePdf(this.pouroshovaAndCityData,reportObj, zoneResultDataList);
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
    else if(this.formCon.reportType.value == '2'){
      // Zone Wise UnionParishod Arrear Details 
      this._unionServie.getZoneWsieUnionData(this.formCon.zoneCode.value,this.formCon.circleCode.value,this.formCon.locationCode.value,reportObj.billMonth,this.formCon.reportType.value).subscribe(res => {
        this.pouroshovaAndCityData = res;
        let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneDataList : this.zoneByUserList;
        if (this.pouroshovaAndCityData.length > 0) {
          this.docData = this._pdfUnionDetails.generatePdf(this.pouroshovaAndCityData, reportObj, zoneResultDataList);
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
  }

  private createForm() {
    this.form = this.fb.group({
      zoneCode: ['0', [Validators.required]],
      circleCode:['0'],
      locationCode: ['0'],
      billMonth: ['', [Validators.required]],
      reportType: ['1'],
    })
  }
  get formCon() {
    return this.form.controls;
  }
}
