import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport, dateFormatISO } from '../../../../@core/utils/utiliy';
import { CommonService } from '../../../../services/common.service';
import { PoultryListService } from '../../../../services/pdfGenerate/agriculture/poultry-list.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-poultry-wise-customer-list',
  templateUrl: './poultry-wise-customer-list.component.html',
  styleUrls: ['./poultry-wise-customer-list.component.scss']
})
export class PoultryWiseCustomerListComponent implements OnInit {
  Poultryform: FormGroup;
  isTrue: boolean = false;
  isProgress:boolean=false;
  submitted:boolean=false;
  report: any;
  documentTitle = "";
  docData: any;
  poultryCustomerList: any[] = [];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _poultryService: PoultryListService,
    private _toasterService: NbToastrService,
    private _datePipe: DatePipe,
    private _excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public updateVisitor(): void {
    const objParam = { ID: 1, TOTALVISITOR: 0 };
    this._commonService.updateTotalVisitorCount(objParam).subscribe(() => {

    }, () => {
      this._toasterService.danger("Something is Wrong !!!!")
    });
  }
  onSearchAgain() {
    this.isTrue = false;
  }
  onReport() {
    let reportObj={
      billMonth:this._datePipe.transform(this.f.billMonth.value,"yMM")
    }
    this.isProgress=true;
    this.submitted=true;
    if (this.Poultryform.invalid) { this.isProgress = false;return};
    // this.updateVisitor();
    this._poultryService.getPoultryCustomers(reportObj.billMonth).subscribe(res => {
      this.poultryCustomerList = res.data;
      if (this.poultryCustomerList.length > 0) {
        this.docData = this._poultryService.generatePdf(this.poultryCustomerList, reportObj.billMonth);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
        });
      }

      else {
        this.isTrue = false;
        this._toasterService.danger("No Data Found");
        this.isProgress=false;
      }
    }, err=>{
      this.isProgress=false;
    });
  }
  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'poultry' + dateFormatForReport(date);
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
      this._excelService.downloadExcelFile(excelObj, 'Poultry Customer List');

    }
  }
  createForm() {
    this.Poultryform = this._fb.group({
      billMonth: ['', [Validators.required]],
      exportType: [1, []],
      report: [, []],
      documentTitle: [, []]

    })
  }

  get formVal() {
    return this.Poultryform.value;
  }

  get f() {
    return this.Poultryform.controls;
  }

}
