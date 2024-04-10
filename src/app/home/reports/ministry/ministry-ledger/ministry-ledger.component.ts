import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryLedgerService } from '../../../../services/pdfGenerate/ministry/ministry-ledger.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { UnionporishodService } from '../../../../services/pdfGenerate/zonewise-unionporishod/unionporishod.service';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-ministry-ledger',
  templateUrl: './ministry-ledger.component.html',
  styleUrls: ['./ministry-ledger.component.scss']
})
export class MinistryLedgerComponent implements OnInit {
 ministryLedgerForm:FormGroup;

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;

  ministryLedgerList: any[];
  isProgress: boolean = false;
  submitted: boolean = false;
  public isTrue: boolean = false;
  public report: any;
  isLoading: boolean = false;
  isLocAndReportHideShow: boolean = false;
  ministryData:any[]=[]
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
    private _pdfService: MinistryLedgerService,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };


  public onReport() {
    this.isProgress = true;
    this.submitted = true;
    let reportObj = {
      //billMonth: this._datePipe.transform(this.f.billMonth.value, 'dd-MMM-yy'),
      billMonth: this._datePipe.transform(this.f.billMonth.value, 'yMM'),
    }
    if (this.ministryLedgerForm.invalid) { this.isProgress = false; return }
    this._ministryService.getMinistryWiseMinistryLedgerList(reportObj.billMonth).subscribe(res => {
      this.ministryLedgerList = res as any[];
      if (this.ministryLedgerList.length > 0) {
        this.docData = this._pdfService.generatePdf(this.ministryLedgerList,reportObj);
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
      let fileName = 'Ministry Ledger' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    
    else if(event==2 || event==3){
      let date=new Date();
      this.isLoading = true;
      let excelObj = {data: this.docData.docDefinition.content.table.body}
      this._excelService.downloadExcelFile(excelObj, 'Ministry Ledger '+dateFormatForReport(date));
    }
  }

  onSearchAgain() {
    this.isTrue = false;
  }
  createForm(){
    this.ministryLedgerForm=this._fb.group({
      billMonth:['',[Validators.required]]
    })
  }

 get f(){
  return this.ministryLedgerForm.controls;
 }
 
 get formval(){
  return this.ministryLedgerForm.value
 }

}
