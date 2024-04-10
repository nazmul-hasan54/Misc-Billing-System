import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PenaltyBillPrintModel } from '../../../../../model/penaltyBillPrint.model';
import { DcRcService } from '../../../../../services/pdfGenerate/bill-print-view/dc-rc-bill/dc-rc.service';
import { SuplimentartBillDrService } from '../../../../../services/pdfGenerate/bill-print-view/supplementary-bill/suplimentart-bill-dr.service';
import { PenaltyBillGenService } from '../../../../../services/penalty-bill-gen.service';

@Component({
  selector: 'ngx-dc-bill-print',
  templateUrl: './dc-bill-print.component.html',
  styleUrls: ['./dc-bill-print.component.scss']
})
export class DcBillPrintComponent implements OnInit {
  penaltydrList: any[] = [];
  penaltydrForm: FormGroup;
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
    private _dcRcBillService: DcRcService,
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

      this.docData = this._dcRcBillService.generatePdf(this.penaltyBillPrintData);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
      });
    });

  }
  createForm() {
    this.penaltydrForm = this._fb.group({
      billMonth: ['', []],
      exportType: [1, []],
      report: [[]],
      documentTitle: [[]]
    })
  }

  get formVal() {
    return this.penaltydrForm.value;
  }

  get f() {
    return this.penaltydrForm.controls;
  }


}