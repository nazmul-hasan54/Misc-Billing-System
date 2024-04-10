import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReligiousService } from '../../../../services/religious.service';
import { ReligiousLocationReportService } from '../../../../services/pdfGenerate/religious/religious-location-report.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';
import { MonthWiseReligiousReportService } from '../../../../services/pdfGenerate/religious/month-wise-religious-report.service';

@Component({
  selector: 'ngx-month-wise-religious',
  templateUrl: './month-wise-religious.component.html',
  styleUrls: ['./month-wise-religious.component.scss']
})
export class MonthWiseReligiousComponent implements OnInit {

  religiousForm: FormGroup;
  isTrue: boolean = false;
  isLocAndReportHideShow: boolean = false;
  report: any;
  docData: any;
  isProgress: boolean = false;
  documentTitle: "";
  zoneDataList: any[];
  circleDataList: any[];
  financialYearList: any[];
  locationDataList: any[];
  locationCodeValue: any;
  religiousDataList: any[];
  reportType: any[]=[
    {"key":'1', "value":"Summary "},
    {"key":'2', "value":"Details"},
  ];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  
  constructor(
    private _fb: FormBuilder,
    private _religiousService: ReligiousService,
    private _pdfService: MonthWiseReligiousReportService,
    private _excelService: ExcelServiceService,
    private _service: MinistryService,
    private _toasterService: NbToastrService,
    private datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.getAllZoneList();
    this.getZoneByUser();
    this.createForm();
  }

  getAllZoneList(){
    if(this.roleName=='Admin'){
      this._religiousService.getAllZone().subscribe(res => {
        this.zoneDataList = res.data as any[];
      });
    }
  }
  getAllLocationByZoneCode(event: any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  private getLocationList(event:any){
    this._religiousService.getLocationDDByZoneCode(event).subscribe(res => {
      this.religiousForm.patchValue({
        locationCode:0
      })
      this.locationDataList = res.data as any[];
      this.f.locationCode.setValue('0');
    });
  }
  onChangeSelectedZone(zoneCode){
      this.getAllLocationByZoneCode(zoneCode);
      //this.formCon.zoneCode.setValue('0');
  }
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._service.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.religiousForm.patchValue({
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
        this.isAll=this.locationByUserZoneList.length==this.locationDataList.length?true:false;

        if(this.isAll){
          this.locationByUserZoneList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.religiousForm.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  space(e:any){
    if(e.charCode===32){
      e.preventDefault();
    }
  }

  religiousData:any;

  onChangeExportType(event: any){
    if (event == 1) {
      let fileName = 'Month Wise Mosque & Other Worship';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {data: this.docData.docDefinition.content[1].table.body,}
      this._excelService.downloadExcelFile(excelObj, 'Month Wise Mosque & Other Worship');
    }
  }

  onReport(){
    this.isProgress = true;
    if (this.religiousForm.invalid) {
      this.isProgress = false;
      return;
    }
    let reportObj ={
      billMonth: this.datePipe.transform(this.f.billMonth.value, 'yMM'),
    }
      this._religiousService.getReligiousByMonths(reportObj.billMonth,this.formVal.zoneCode,this.formVal.locationCode).subscribe(res => {
        this.religiousData = res;
        if (this.religiousData.length > 0) {
          this.docData = this._pdfService.generatePdf(this.religiousData, reportObj);
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
  
  onSearchAgain(){
    this.isTrue = false;
  }

  createForm(){
    this.religiousForm = this._fb.group({
      zoneCode: ['0',[]],
      locationCode: ['0', []],
      billMonth: [, [Validators.required]],
    });
  }
  get f(){
    return this.religiousForm.controls;
  }
  get formVal(){
    return this.religiousForm.value
  }
}
