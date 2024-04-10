import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { LocationWiseMinistryArrearService } from '../../../../services/pdfGenerate/ministry/location-wise-ministry-arrear.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { TotalMinistryService } from '../../../../services/total-ministry.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { MiscLocationService } from '../../../../services/misc-location.service';
import { LocationModel } from '../../../../model/location';
import { LocationWiseZoneCircle } from '../../../../model/location/location';

@Component({
  selector: 'ngx-total-ministry',
  templateUrl: './total-ministry.component.html',
  styleUrls: ['./total-ministry.component.scss']
})
export class TotalMinistryComponent implements OnInit {

  ministryArrearForm: FormGroup;
  zoneList: any[];
  zoneWiseCircle: any[];
  circleWiseLocation: any[];
  locationWiseMinistryArrear: any[];
  locationWiseZoneCircle:LocationWiseZoneCircle[];
  iszoneAndCircleHideShow: boolean = false;
  circleCodeValue: string;
  submitted: boolean = false;
  docData: any;
  report: any;
  documentTitle: any;
  isProgress: boolean = false;
  isTrue: boolean = false;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" }
  ];

  roleName=localStorage.getItem("roleName");
  locationList=localStorage.getItem("locationCodeList");
  locationCodes = this.locationList.split(",");

  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: boolean;
  isAll: boolean;
  constructor(
    private _fb: FormBuilder,
    private _ministryService: TotalMinistryService,
    private _datePipe: DatePipe,
    private _pdfService: LocationWiseMinistryArrearService,
    private _excelService: ExcelServiceService,
    private _toastrService: NbToastrService,
    private _miscLocation:MiscLocationService,
    private _serviceMinistry: MinistryService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneList();
    this.getZoneByUser();
    // this.getZoneCircleByLocation();
  }

  getAllZoneList() {
    if(this.roleName=="Admin"){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data
      })
    }
  }

  private getAllCircleDdByZoneCode(event: any) {
    if(this.roleName=="Admin"){
      this.getCircleList(event);
    }
  }

  private getCircleList(event: any){
    this._ministryService.getAllCircleByZoneCode(event).subscribe((res: any) => {
      this.zoneWiseCircle = res.data;
    });
  }
  public onChangeSelectedCircle(zoneCode: string) {
    this.getAllCircleDdByZoneCode(zoneCode);
    this.f.circleCode.setValue('0')
    this.f.locationCode.setValue('0')
  }

  private getLocationByCircle(event:any) {
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  
  private getLocationList(event:any){
    this._ministryService.getAllLocationByCircle(event).subscribe((res: any) => {
      this.circleWiseLocation = res;
    });
  }

  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._serviceMinistry.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.ministryArrearForm.patchValue({
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
         this.isAllAdded =  this.circleByUserZoneList.length == this.zoneWiseCircle.length ? true : false;
        
         if(this.isAllAdded){
          this.circleByUserZoneList.unshift({id: 1,name: "All",nameBn:null, nulltemp_C: "all",code: "0",zoneCode: "0"})
         }
          setTimeout(()=>{
            this.ministryArrearForm.patchValue({
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
        this.isAll=this.locationByUserCircleList.length==this.circleWiseLocation.length?true:false;

        if(this.isAll){
          this.locationByUserCircleList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.ministryArrearForm.patchValue({
            locationCode:this.locationByUserCircleList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  // getZoneCircleByLocation(){
  //   if(this.roleName!='Admin'){
  //     this._ministryService.getZoneCircleByLocation(this.locationCodes[0]).subscribe((res: any) => {
  //       this.locationWiseZoneCircle = res as LocationWiseZoneCircle[];
  //       this.ministryArrearForm.patchValue({
  //         zoneCode:this.locationWiseZoneCircle[0].zoneCode,
  //         circleCode:this.locationWiseZoneCircle[0].circleCode,
  //         locationCode:this.locationWiseZoneCircle[0].locationCode,
  //       })
  //     });
  //   }
  // }

  public onChangeSelectedLocation(circleCode: string) {
    this.getLocationByCircle(circleCode);
    this.f.locationCode.setValue('0');
  }

  onSearchAgain() {
    this.isTrue = false;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Location Wise Ministry Arrear Summary';
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
      this._excelService.downloadExcelFile(excelObj, 'Location Wise Ministry Arrear Summary');
    }
  }

  onReport() {
    this.isProgress = true;
    if (this.ministryArrearForm.invalid) { this.isProgress = false; return };
    let reportObj = {
      billMonth: this._datePipe.transform(this.f.billMonth.value, 'yMM')
      //billMonth:this.f.reportDate.value,

    }
    this._ministryService.getTotalLocationWiseMinistryArrear(this.f.zoneCode.value, this.f.circleCode.value, this.f.locationCode.value, reportObj.billMonth).subscribe((res: any) => {
      this.locationWiseMinistryArrear = res;
      if (this.locationWiseMinistryArrear.length > 0) {
        this.docData = this._pdfService.generatePdf(this.locationWiseMinistryArrear, reportObj);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      } else {
        this.isTrue = false;
        this._toastrService.danger('No data found');
        this.isProgress = false;
      }
    })
  }


  createForm() {
    this.ministryArrearForm = this._fb.group({
      zoneCode: ['0', []],
      circleCode: ['0', []],
      locationCode: ['0', []],
      billMonth: [, [Validators.required]]
    })
  }
  get f() {
    return this.ministryArrearForm.controls;
  }

  get formVal() {
    return this.ministryArrearForm.value;
  }

}
