import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { OldMinistryService } from '../../../../services/pdfGenerate/ministry/old-ministry.service';
import { OnlineZoneWiseSummaryService } from '../../../../services/pdfGenerate/ministry/online-zone-wise-summary.service';
import { Router } from '@angular/router';
import { ZoneWiseSummaryService } from '../../../../services/pdfGenerate/ministry/zone-wise-summary.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { event } from 'jquery';

@Component({
  selector: 'ngx-online-ministry-details',
  templateUrl: './online-ministry-details.component.html',
  styleUrls: ['./online-ministry-details.component.scss']
})
export class OnlineMinistryDetailsComponent implements OnInit {
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  public form: FormGroup;
  public isTrue: boolean = false;
  public report: any;
  public ministryData = [];
  public ministryDataDropDown: any = [];
  isProgress: boolean = false;
  isLoading: boolean = false;
  isLocAndReportHideShow: boolean = false;

  docData: any;
  documentTitle = "";
  selectedValue: any[];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];
  zoneList: any[];
  public selectedItem = '0';
  setMinistryValue: any;
  allMinistry = { code: '0', name: 'All' };
  allDbConfigData = {dbCode: '0', name: 'All'};
  dbConfigData: any[];
  locationDataDd: any[];
  locationCodeValue: string;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;

  constructor(
    private fb: FormBuilder,
    private _service: MinistryService,
    private _pdfService: OldMinistryService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMinistry();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });

    this.getAllZoneList();
    this.getZoneByUser();
  }

  private getAllMinistry() {
    return this._service.getAllMinistry().subscribe(res => {
      this.ministryDataDropDown = res.data;
      this.form.controls['code'].setValue(this.allMinistry);
    });
  }

  private getAllDatabaseDD() {
    this._service.getAllDbConfigDDList().subscribe(response => {
      this.dbConfigData = response.data;
    });
  }

  private getAllZoneList(){
    if(this.roleName=='Admin')
    this._service.getAllZone().subscribe(res => {
      this.zoneList = res.data;
    });
  }

  private getLocationByZoneDD(event:any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }

  private getLocationList(event:any){
    this._service.getLocationDDByZoneCode(event).subscribe(res => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }

  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationByZoneDD(zoneCode);
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
      this._service.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
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
      this._service.getLocationByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
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

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  public onSearchAgain() {
    this.isTrue = false;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Ministry Details (online) ' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      this.isLoading = true;
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }

      setTimeout(()=> {
        let exporter = this._excelService.downloadExcelFile(excelObj, 'Ministry Details(online)');
        //@ts-ignore
        if(exporter.payload.data.length > 0){
          this.isLoading = false;
        }
      }, 800);

      setTimeout(()=> {
        this.isLoading = false;
      }, 3000)
    }
  }

  public onReport() {
    this.setMinistryValue = this.form.value.code;
    let code = this.form.value.code.code;

    if (this.form.invalid) {
      this.isProgress = false;
      return;
    }
    let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneList : this.zoneByUserList;
    this.isProgress = true;
    let utilityObj = {
      billMonth: this.datePipe.transform(this.formCon.billMonth.value, 'yMM'),
      ministry: this.form.value.code,
      reportType:this.form.value.reportType,
    };
      this._service.getOnlineMinistryDataByZoneCode(this.form.value, code, utilityObj.billMonth, this.formCon.zoneCode.value, this.form.value.zoneCode !="0" ? this.form.value.locationCode : "0", this.form.value.isRebate).subscribe(res => {
        this.ministryData = res.data;
        console.log("data",this.ministryData)
        if (this.ministryData.length > 0) {
          this.docData = this._pdfService.generatePdf(this.ministryData, utilityObj, zoneResultDataList);
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

  private createForm() {
    this.form = this.fb.group({
      billMonth: ['', []],
      code: [this.allMinistry, [Validators.required]],
      arrearFrom: [''],
      arrearTo: ['',],
      noOfMonth: ['',],
      isAll: [true,],
      isPrn: [true,],
      isLps: [true,],
      isVat: [true,],
      zoneCode: ['0', [Validators.required]],
      locationCode: ['0'],
      isRebate:[false,[]],
    })
  }

  get formVal(){
    return this.form.value;
  }
  get formCon() {
    return this.form.controls;
  }
}
