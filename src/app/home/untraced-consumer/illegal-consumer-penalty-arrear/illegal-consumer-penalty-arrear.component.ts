import { Component, OnInit } from '@angular/core';
import { Console, log } from 'console';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { dateFormatForDDMMYY, dateFormatForReport } from '../../../@core/utils/utiliy';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { IllegalConsumerPenaltyService } from '../../../services/pdfGenerate/untraceable-customer/illegal-consumer-penalty.service';
import { MinistryService } from '../../../services/ministry.service';
import { MisReportService } from '../../../services/mis-report.service';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForDDMMYYYY } from './../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-illegal-consumer-penalty-arrear',
  templateUrl: './illegal-consumer-penalty-arrear.component.html',
  styleUrls: ['./illegal-consumer-penalty-arrear.component.scss']
})
export class IllegalConsumerPenaltyArrearComponent implements OnInit {

  illegalConsumerForm: FormGroup;
  customerList: any[];
  docData: any;
  documentTitle = "";
  isTrue: boolean = false;
  isLoading: boolean = false;
  report: any;
  isProgress: boolean = false;
  maxDate: Date = new Date();
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _pdfService: IllegalConsumerPenaltyService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _misreport: MisReportService,
    private _datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(){
    this.illegalConsumerForm = this._fb.group({
      reportDate: ['', [Validators.required]]
    });
  }

  onChangeExportType(event: any){
    if (event == 1) {
      //let date = new Date();
      let fileName = 'Illegal Consumer Penalty Received';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Illegal Consumer Penalty Received');

    }
  }

  onSearchAgain(){
    this.isTrue = false;
  }

  onReport(){
    this.isProgress = true;
    if(this.illegalConsumerForm.invalid) {
      this.isProgress=false; 
      return}

    let utilityObj = {
      reportDate: this._datePipe.transform(this.f.reportDate.value, 'YYYYMM'),
    };

    this._misreport.getIllegalConsumer(utilityObj.reportDate).subscribe(res => {
      this.customerList = res as any[];
      console.log("REPORT DATE", this.f.reportDate.value)
      if(this.customerList.length > 0){
        this.docData = this._pdfService.generatePdf(this.customerList, utilityObj.reportDate);
        
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        })
      } else{
        // this.isTrue = true;
        this._toasterService.danger("No Data Found");
        this.isProgress = false;
      }
    })
  }

  get f() {
    return this.illegalConsumerForm.controls;
  }

  get formval() {
    return this.illegalConsumerForm.value;
  }

}
