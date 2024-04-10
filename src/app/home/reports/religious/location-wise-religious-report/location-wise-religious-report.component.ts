import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { LocationWiseReligiousReportService } from '../../../../services/pdfGenerate/religious/location-wise-religious-report.service';
import { ReligiousLocationReportService } from '../../../../services/pdfGenerate/religious/religious-location-report.service';
import { ReligiousService } from '../../../../services/religious.service';
import { MinistryService } from '../../../../services/ministry.service';

@Component({
  selector: 'ngx-location-wise-religious-report',
  templateUrl: './location-wise-religious-report.component.html',
  styleUrls: ['./location-wise-religious-report.component.scss']
})
export class LocationWiseReligiousReportComponent implements OnInit {

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

  constructor(
    private _fb: FormBuilder,
    private _religiousService: ReligiousService,
    private _pdfService: ReligiousLocationReportService,
    private _excelService: ExcelServiceService,
    private _service: MinistryService,
    private _toasterService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getAllZoneList();
    this.getFinancialYear();
    this.createForm();
    this.getZoneByUser();
  }

  getAllZoneList(){
    if(this.roleName=='Admin'){
      this._religiousService.getAllZone().subscribe(res => {
        this.zoneDataList = res.data as any[];
      });
    }
  }

  // getAllCircleByZoneCode(zoneCode: any){
  //   this._religiousService.getAllCircleByZoneCode(zoneCode).subscribe(res => {
  //     this.religiousForm.patchValue({
  //       locationCode: 0
  //     });
  //     this.locationDataList = res.data;
  //   })
  // }

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
      this.formCon.locationCode.setValue('0');
    });
  }
  onChangeSelectedZone(zoneCode){
      this.getAllLocationByZoneCode(zoneCode);
      //this.formCon.zoneCode.setValue('0');
  }

  onChangeSelectedYear(event){
    this.religiousForm.patchValue({
      startMonth:event.startMonth,
      endMonth:event.endMonth
    })
  }

  getAllCircleList(){
    this._religiousService.getAllCircle().subscribe(res => {
      this.circleDataList = res.data;
    });
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

  getFinancialYear(){
    this._religiousService.getFiscalYear().subscribe(res =>{
      this.financialYearList = res as any[];
    });
  }


  onReport(){
    this.isProgress = true;
    if(this.religiousForm.invalid) {this.isProgress = false; return}
    let financialValue = this.financialYearList.find(x=> x.code == this.formVal.financialYear.code);
    
    let utilityObj = {
      startMonth: financialValue.startMonth,
      endMonth: financialValue.endMonth
    };

      let finscalYearName= financialValue.financialName
    this._religiousService.getLocationWiseReligiousRpt(utilityObj.startMonth, utilityObj.endMonth,this.formVal.zoneCode,this.formVal.locationCode).subscribe(res =>{
      this.religiousDataList = res as any[];
        if(this.religiousDataList.length > 0){
          this.docData=this._pdfService.generatePdf(this.religiousDataList, utilityObj, finscalYearName); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
          });
        }
        else{
          this.isTrue = false;
          this._toasterService.danger('No data found');
          this.isProgress = false;
        }
      })
   }

  onSubmit(){
    this.onReport();
  }

  onSearchAgain(){
    this.isTrue = false;
  }

  onChangeExportType(event: any){
    if (event == 1) {
      let fileName = 'Location Wise Mosque & Other Worship';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {data: this.docData.docDefinition.content[1].table.body,}
      this._excelService.downloadExcelFile(excelObj, 'Location Wise Mosque & Other Worship');
    }
  }

  createForm(){
    this.religiousForm = this._fb.group({
      zoneCode: ['0',[]],
      locationCode: ['0', []],
      financialYear: [, [Validators.required]],
      startMonth: [,[]],
      endMonth: [, []]
    });
  }
  get formCon(){
    return this.religiousForm.controls;
  }
  get formVal(){
    return this.religiousForm.value
  }

}
