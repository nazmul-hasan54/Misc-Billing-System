import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';
import { ExcelServiceService } from '../../../../../services/pdfGenerate/excel-service.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../../../services/penalty-bill-gen.service';
import { PenaltyBillPrintModel } from '../../../../../model/penaltyBillPrint.model';
import { SupplementaryBillGenService } from '../../../../../services/supplementary-bill-gen.service';
import { SupplementaryBillService } from '../../../../../services/pdfGenerate/bill-print-view/supplementary-bill/supplementary-bill.service';

@Component({
  selector: 'ngx-supplementary-bill-genarate',
  templateUrl: './supplementary-bill-genarate.component.html',
  styleUrls: ['./supplementary-bill-genarate.component.scss']
})
export class SupplementaryBillGenarateComponent implements OnInit {
  supplementaryList: any[] = [];
  supplementaryForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  documentTitle = "";
  docData: any;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  penaltyBillPrintData: Object;
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _supplementaryservice: SupplementaryBillService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _penaltyService: SupplementaryBillGenService,
    private _activateRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    if (this._activateRoute.snapshot.paramMap.get('billNumber') !== null && this._activateRoute.snapshot.paramMap.get('customerNumber') !== null) {
      let billNumber = this._activateRoute.snapshot.paramMap.get('billNumber');
      let customerNumber = this._activateRoute.snapshot.paramMap.get('customerNumber');
      this.onReport(billNumber, customerNumber);

    }
    this.createForm();
  }

  onReport(billNumber, customerNumber) {

    this._penaltyService.supplementaryBillSrPrint(billNumber, customerNumber).subscribe(res => {
      this.penaltyBillPrintData = res as PenaltyBillPrintModel[];
      this.docData = this._supplementaryservice.generatePdf(this.penaltyBillPrintData);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
      });
    });

  }

  createForm() {
    this.supplementaryForm = this._fb.group({
      billMonth: ['', []],
      exportType: [1, []],
      report: [[]],
      documentTitle: [[]]
    })
  }

  get formVal() {
    return this.supplementaryForm.value;
  }

  get f() {
    return this.supplementaryForm.controls;
  }

}
