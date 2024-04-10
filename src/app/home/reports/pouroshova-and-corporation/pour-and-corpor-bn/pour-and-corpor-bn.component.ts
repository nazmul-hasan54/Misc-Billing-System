import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { data, event } from 'jquery';

import { CircleModel } from '../../../../model/circle.model';
import { CityCorporAndPouroDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/city-corpor-and-pouro-details.service';
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { PourAndCityCorporBanglaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/pour-and-city-corpor-bangla.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { ReligiousService } from '../../../../services/religious.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ngx-pour-and-corpor-bn',
  templateUrl: './pour-and-corpor-bn.component.html',
  styleUrls: ['./pour-and-corpor-bn.component.scss']
})
export class PourAndCorporBnComponent implements OnInit {

  public form: FormGroup;
  public isTrue:boolean=false;
  public report: any;
  pouroshovaAndCityData: any;
  locationDataDd: any[];
  pouroshovaAndCityCorporDetails: any[];
  isLocAndReportHideShow: boolean = false;
  zoneDataList: any[];
  docData: any;
  documentTitle = "";
  isProgress:boolean=false;
  submitted:boolean=false;
  locationCodeValue: string;
  circleList: any[];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ]
  reportType: any[] = [
    {"key":'1', "value":'Summary'},
    {"key": '2', "value": 'Details'}
  ];
  cityCorporationDataList: any;
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: boolean;
  isAll: boolean;
 
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private _service: PourAndCityCorporService,
    private fb: FormBuilder,
    private _pdfService: PourAndCityCorporBanglaService,
    private _cityZoneWisePouroDetails: CityCorporAndPouroDetailsService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService,
    private _datePipe: DatePipe,
    private _ministryService: MinistryService,
    private _ministryCustomer: MinistryCustomeService,
    private _religiosService: ReligiousService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDataList();
    this.getAllCityCorporationDataList();
    this.getZoneByUser();    
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
  }

  private getAllZoneDataList(){
    if(this.roleName=="Admin"){
      this._service.getAllZoneDataList().subscribe(res=>{
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
    this._ministryCustomer.getAllZoneWiseCircle(event).subscribe((res => {
        this.circleList = res.data as any[];
       this.formCon.circleCode.setValue('0');
      this.formCon.locationCode.setValue('0');
    }))
  }
  getLocationDDByCircle(event: any){
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
          this.circleByUserZoneList.unshift({id: 1,name: "All",nameBn:null,code: "0",zoneCode: "0"})
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

  private getAllCityCorporationDataList(){
    this._service.getAllCityCorporationDatList().subscribe(res=>{
    this.cityCorporationDataList = res.data;
   });
  }

  public onSearchAgain(){
    this.isTrue=false;
  }

  space(event:any){
    if(event.charCode===32){
      event.preventDefault();
    }
  }

  onChangeExportType(event:any){
    if(this.formCon.reportType.value=='1'){
      if(event==1){
        let date=new Date();
        let fileName='Pouroshova and City Corporation Summary Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'Pouroshova and City Corporation Summary Report ');
      }
    }
    else{
      if(event==1){
        let date=new Date();
        let fileName='Pouroshova and City Corporation Details Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'Pouroshova and City Corporation Details Report ');
      }
    }
  }

  public onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) { this.isProgress = false;return};

        // Get the current date
    // var currentDate = this.formCon.currentDate.value;

    // Print the updated date
    let reportObj = {
      billMonth: this._datePipe.transform(this.formCon.billMonth.value, "yMM"),
      // month: this._datePipe.transform(this.formCon.billMonth.value, "MMyyyy")
      // billMonth:this.formCon.currentDate.value,
    }
    if(this.formCon.reportType.value == '1'){ // 1 is summary
      this._service.getPouroshovaAndCityCorporationDataSummary(reportObj.billMonth,this.formCon.reportType.value, this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.circleCode.value).subscribe(res=>{
        this.pouroshovaAndCityData=res.data;
       let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneDataList : this.zoneByUserList;
        if(this.pouroshovaAndCityData.length>0 && zoneResultDataList.length > 0){
          let citySort3RdZone: any;
          let citySort4RdZone: any;
          citySort3RdZone = this.cityCorporationDataList.pop();
      
          citySort4RdZone = this.cityCorporationDataList.pop();
          this.cityCorporationDataList.push(citySort3RdZone);
          this.cityCorporationDataList.push(citySort4RdZone)
          this.docData=this._pdfService.generatePdf(this.pouroshovaAndCityData, reportObj, zoneResultDataList, this.cityCorporationDataList); 
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
    else if (this.formCon.reportType.value == '2'){ // 2 is details
      this._service.getPouroshovaAndCityCorporationDetails(reportObj.billMonth, this.formCon.reportType.value, this.formCon.zoneCode.value,
        this.formCon.locationCode.value, this.formCon.circleCode.value).subscribe(res=>{
        this.pouroshovaAndCityCorporDetails = res as any[];
        if(this.pouroshovaAndCityCorporDetails.length> 0 ){
          this.docData=this._cityZoneWisePouroDetails.generatePdf(this.pouroshovaAndCityCorporDetails, reportObj,''); 
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
      // currentDate: ['',[Validators.required]],
      billMonth: ['',[Validators.required]],
      reportType: ['1'],
      zoneCode: ['0', [Validators.required]],
      locationCode: ['0', []],
      circleCode:['0',[]]
    })
  }
  get formCon(){
    return this.form.controls;
  }

}
