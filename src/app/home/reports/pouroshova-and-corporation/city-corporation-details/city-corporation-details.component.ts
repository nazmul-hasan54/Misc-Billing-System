import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CityCorporAndPouroDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/city-corpor-and-pouro-details.service';
import { CityCorporationDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/city-corporation-details.service';
import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { PourAndCityCorporBanglaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/pour-and-city-corpor-bangla.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-city-corporation-details',
  templateUrl: './city-corporation-details.component.html',
  styleUrls: ['./city-corporation-details.component.scss']
})
export class CityCorporationDetailsComponent implements OnInit {

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

  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ]
  reportType: any[] = [
    // {"key":'1', "value":'Summary'},
    {"key": '2', "value": 'Details'}
  ];
  cityCorporationDataList: any;
 

  constructor(
    private _service: PourAndCityCorporService,
    private fb: FormBuilder,
    private _pdfService: PourAndCityCorporBanglaService,
   // private _cityZoneWisePouroDetails: CityCorporationDetailsService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService,
    private _datePipe: DatePipe,
    private _ministryService: MinistryService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDataList();
    this.getAllCityCorporationDataList();
  }
  private createForm(){
    this.form = this.fb.group({
      currentDate: ['',[Validators.required]],
      reportType: ['2'],
      zoneCode: ['0', [Validators.required]],
      locationCode: ['0', []]
    })
  }
  private getAllZoneDataList(){
    this._service.getAllZoneDataList().subscribe(res=>{
      this.zoneDataList = res.data;
    })
  }
  private getAllCityCorporationDataList(){
    this._service.getAllCityCorporationDatList().subscribe(res=>{
      this.cityCorporationDataList = res.data;
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

private getLocationDDByZone(zoneCode: string){
  this._ministryService.getLocationDDByZoneCode(zoneCode).subscribe(res => {
    this.form.patchValue({
      locationCode: 0
    })
    this.locationDataDd = res.data;
  });
}


  get formCon(){
    return this.form.controls;
  }

  public onSearchAgain(){
    this.isTrue=false;
  }


  onChangeExportType(event:any){
      if(event==1){
        let date=new Date();
        let fileName='City Corporation Details Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'City Corporation Details Report ');
      }
  }

  // public onReport(){
  //   this.isProgress=true;
  //   this.submitted=true;
  //   if(this.form.invalid) { this.isProgress = false;return};

  //   let reportObj = {
  //     billMonth: this._datePipe.transform(this.formCon.currentDate.value, "dd-MM-yyyy")
  //   }
  //   // 2 is details
  //   if (this.formCon.reportType.value == '2'){ 
  //     this._service.getPouroshovaAndCityCorporationDetails(dateFormatForReport(this.formCon.currentDate.value).toString(), this.formCon.reportType.value, this.formCon.zoneCode.value, this.formCon.locationCode.value).subscribe(res=>{
  //       this.pouroshovaAndCityCorporDetails = res as any[];
  //       if(this.pouroshovaAndCityCorporDetails.length> 0 ){
  //         this.docData=this._cityZoneWisePouroDetails.generatePdf(this.pouroshovaAndCityCorporDetails, reportObj,''); 
  //         this.docData.getBase64((base64Data) => {
  //           this.report = base64Data;
  //           this.documentTitle = this.docData.docDefinition.info.title;
  //         this.isTrue = true;
  //         this.isProgress=false;
  //         });
  //       }
  //       else{
  //         this.isTrue = false;
  //         this._toasterService.danger("No Data Found");
  //         this.isProgress=false;
  //       }
  //     }, err=>{
  //       this.isProgress=false;
  //     });
  //   }
  // }
}
