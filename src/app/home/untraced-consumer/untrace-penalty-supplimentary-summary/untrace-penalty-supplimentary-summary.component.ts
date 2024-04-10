import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { NbToastrService } from '@nebular/theme';
import { UntracePenaltySupplimentaryReportService } from '../../../services/pdfGenerate/untraceable-customer/untrace-penalty-supplimentary-report.service';
import { dateFormatForReport } from '../../../@core/utils/utiliy';
import { event } from 'jquery';

@Component({
  selector: 'ngx-untrace-penalty-supplimentary-summary',
  templateUrl: './untrace-penalty-supplimentary-summary.component.html',
  styleUrls: ['./untrace-penalty-supplimentary-summary.component.scss']
})
export class UntracePenaltySupplimentarySummaryComponent implements OnInit {
  isProgress: boolean=false;
  submitted: boolean=false;
  form: FormGroup;
  report: any;
  documentTitle = "";
  docData: any;
  isTrue: boolean=false;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _reportService:UntracePenaltySupplimentaryReportService,
    private _datePipe: DatePipe,
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  
  onReport() {
    let utilityObj = {
      reportDate: this._datePipe.transform(this.f.billMonth.value, 'YYYYMM'),
    };
    
    this.docData = this._reportService.generatePdf('','');
    this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;

      
    });
  }
  space(e:any){
    if(e.charCode===32){
      this.report.preventDefault();
    }
  }
  
  onSearchAgain() {
    this.isTrue = false;
  }
  
  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Untrace Penalty Supplimentary Summary' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if (event == 2 || event == 3) {
      let arr = [...this.docData.docDefinition.content[0].table.body,...this.docData.docDefinition.content[1].table.body,...this.docData.docDefinition.content[2].table.body]
      let excelObj = {
        data: arr,
      }
      this._excelService.downloadExcelFile(excelObj, 'Untrace Penalty Supplimentary Summary');
    }

    //   let excelObj = {
    //     data: this.docData.docDefinition.content[1].table.body,
    //   }
    //   this._excelService.downloadExcelFile(excelObj, 'Untrace Penalty Supplimentary Summary');
    // }
  }

  
  
  createForm() {
    this.form = this._fb.group({
      billMonth: ['', [Validators.required]],
      exportType: [1, []],
      report: [, []],
      documentTitle: [, []]
    })
  }

  get f() {
    return this.form.controls;
  }

  get formval() {
    return this.form.value;
  } 
}
