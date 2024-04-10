import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { NbToastrService } from '@nebular/theme';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { OnlineCitycorpoAndPouroshovaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-and-pouroshova.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { MinistryService } from '../../../../services/ministry.service';
import { OnlineCityCorporationDetailsService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-city-corporation-details.service';

@Component({
  selector: 'ngx-online-city-corporation-details',
  templateUrl: './online-city-corporation-details.component.html',
  styleUrls: ['./online-city-corporation-details.component.scss']
})
export class OnlineCityCorporationDetailsComponent implements OnInit {
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
    // {"key":'1', "value":"Summary "},
    {"key":'2', "value":"Details"},
  ];

  
  zoneDataList: any;
  cityCorporationDataList: any;
  submitted: boolean = false;
  zoneList: any[];
  locationDataDd: any[];
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;
  
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe,
    private _pdfService: OnlineCitycorpoAndPouroshovaService,
    private _pdfDetailsService:OnlineCityCorporationDetailsService,
    private _service: PourAndCityCorporService,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe) { }

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
    this._ministryService.getAllZone().subscribe(res => {
      this.zoneList = res.data;
    });
  }

  private getLocationDDByZone(zoneCode: string){
    this._ministryService.getLocationDDByZoneCode(zoneCode).subscribe(res => {
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

  createForm() {
    this.form = this._fb.group({
      billMonth: ["", []],
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      reportType: ['2'],
    });
  }

  get fCon() {
    return this.form.controls;
  }
  get fVal() {
    return this.form.value;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName =
      "Online City Corporation Details Report" +
        dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      };
      this._excelService.downloadExcelFile(
        excelObj,
        "Online City Corporation Details Report"
      );
    }
  }

  public onSearchAgain() {
    this.isTrue = false;
  }
  
  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
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

    if(this.fCon.reportType.value == '2'){
          this._service.getOnlinePouroshovaAndCityCorporationDetails(utilityObj.billMonth,this.fCon.zoneCode.value,this.fCon.locationCode.value,this.fCon.reportType.value).subscribe((res:any) => {
          this.onlinePouroshovaAndCityData = res ;
          if (this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList.length > 0) {
            this.docData = this._pdfDetailsService.generatePdf(this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList,utilityObj,this.zoneDataList,);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
              this.isTrue = true;
              this.isProgress = false;
            });
          } else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found");
            this.isProgress = false;
          }
        },
        (err) => {
          this.isProgress = false;
        }
      );
    }
  }

}
