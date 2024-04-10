import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryLedgerService } from '../../../../services/pdfGenerate/ministry/ministry-ledger.service';
import { MinistryReportService } from '../../../../services/pdfGenerate/ministry/apa-report.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ApaService } from '../../../../services/apa.service';
import { DatePipe } from '@angular/common';
import { FinancialYearModel } from '../../../../model/apa/financialyear.model';
import { TargetserviceService } from '../../../../services/targetservice.service';

@Component({
  selector: 'ngx-bpdb',
  templateUrl: './bpdb.component.html',
  styleUrls: ['./bpdb.component.scss']
})
export class BpdbComponent implements OnInit {
 apaForm: FormGroup;

 fiscalYearlist: FinancialYearModel[]=[];
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  isProgress: boolean = false;
  submitted: boolean = false;
  isTrue: boolean = false;
  report: any;
  isLoading: boolean = false;
  isLocAndReportHideShow: boolean = false;
  ministryData: any[] = []
  docData: any;
  documentTitle = "";
  selectedValue: any[];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _pdfService: MinistryReportService,
    private _service:ApaService,
    private datePipe: DatePipe,
    private _targetService: TargetserviceService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.getFiscalYearList();
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  createForm() {
    this.apaForm = this._fb.group({
      //fromBillMonth:['',[Validators.required]],
      //toBillMonth:['',[Validators.required]],
      fiscalYearCode: [, [Validators.required]],
    })
  }

  get f() {
    return this.apaForm.controls;
  }

  get formval() {
    return this.apaForm.value
  }

  getFiscalYearList(){
      this._targetService.getFiscalYear().subscribe((res) => {
        this.fiscalYearlist = res as FinancialYearModel[];
    });

  }

  apaData:any;
  public onReport() {
    this.isProgress = true;
    this.submitted = true;
    if (this.apaForm.invalid) { this.isProgress = false; return }
    let financialValue = this.fiscalYearlist.find(x=>x.code == this.apaForm.value.fiscalYearCode);

    let utilityObj = {
      fromBillMonth: financialValue.startMonth,
      toBillMonth: financialValue.endMonth,

    };
    let reportObj={
      year:financialValue.financialName,
    }

    this._service.getAPADetails(utilityObj.fromBillMonth,utilityObj.toBillMonth).subscribe((res:any) => {
      this.apaData = res;

      if (this.apaData.length > 0) {
        this.docData = this._pdfService.generatePdf(this.apaData,utilityObj,reportObj);
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

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'APA Report';
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
      this._excelService.downloadExcelFile(excelObj, 'APA Report');
    
    }
  }

  onSearchAgain() {
    this.isTrue = false;
  }

}
