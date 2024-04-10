import { Component, OnInit, ViewChild } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { MinistryService } from '../../../../services/ministry.service';
import { OldMinistryService } from '../../../../services/pdfGenerate/ministry/old-ministry.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ngx-old-ministry-details',
  templateUrl: './old-ministry-details.component.html',
  styleUrls: ['./old-ministry-details.component.scss'],
  providers: [DatePipe,]
})
export class OldMinistryDetailsComponent implements OnInit {
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
    this.getAllDatabaseDD();
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
      dbCode: [0, [Validators.required]],
      locationCode: ['0']
    })
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

  private getLocationDD(dbCode: string){
    this._service.getLocationDDList(dbCode).subscribe(res => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }

  public onChangeSelectedDb(dbCode){
    if(dbCode != '0'){
      this.getLocationDD(dbCode);
      this.form.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.form.controls['locationCode'].disable();
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
  }

  get formCon() {
    return this.form.controls;
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
    this.isProgress = true;
    let utilityObj = {
      billMonth: this.datePipe.transform(this.formCon.billMonth.value, 'yMM'),
      ministry: this.form.value.code,
    };
    this._service.getAllOldMinistryCode(this.form.value, code, utilityObj.billMonth, this.formCon.dbCode.value, this.form.value.dbCode !="0" ? this.form.value.locationCode : "0").subscribe(res => {
      this.ministryData = res.data;
      if (this.ministryData.length > 0) {
        this.docData = this._pdfService.generatePdf(this.ministryData, utilityObj, this.zoneList);
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
