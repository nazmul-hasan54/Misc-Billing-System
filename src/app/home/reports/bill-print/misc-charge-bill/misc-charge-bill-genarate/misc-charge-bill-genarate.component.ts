import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';
import { DcRcService } from '../../../../../services/pdfGenerate/bill-print-view/dc-rc-bill/dc-rc.service';
import { ExcelServiceService } from '../../../../../services/pdfGenerate/excel-service.service';
import { MiscChargeBillPrintService } from '../../../../../services/pdfGenerate/bill-print-view/misc-charge-bill/misc-charge-bill.service';
import { MiscChargeBillService } from '../../../../../services/misc-charge-bill.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../../../services/penalty-bill-gen.service';
import { PenaltyBillPrintModel } from '../../../../../model/penaltyBillPrint.model';

@Component({
  selector: 'ngx-misc-charge-bill-genarate',
  templateUrl: './misc-charge-bill-genarate.component.html',
  styleUrls: ['./misc-charge-bill-genarate.component.scss']
})
export class MiscChargeBillGenarateComponent  {

  dcrcList: any[] = [];
  dcrcBillForm: FormGroup;
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
    //private _dcrcBillservice: DcRcService,
    private _miscChargePrintService: MiscChargeBillPrintService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _penaltyService: PenaltyBillGenService,
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

    this._penaltyService.getPenaltyBillSrPrint(billNumber, customerNumber).subscribe(res => {
      this.penaltyBillPrintData = res as PenaltyBillPrintModel[];
      this.docData = this._miscChargePrintService.generatePdf(this.penaltyBillPrintData);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
      });
    });

  }

  createForm() {
    this.dcrcBillForm = this._fb.group({
      billMonth: ['', []],
      exportType: [1, []],
      report: [[]],
      documentTitle: [[]]
    })
  }

  get formVal() {
    return this.dcrcBillForm.value;
  }

  get f() {
    return this.dcrcBillForm.controls;
  }


}
