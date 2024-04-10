import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ActivatedRoute, Route, Router } from '@angular/router';
import { CommonService } from '../../../../../services/common.service';
import { ExcelServiceService } from '../../../../../services/pdfGenerate/excel-service.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../../../services/penalty-bill-gen.service';
import { PenaltyBillPrintModel } from '../../../../../model/penaltyBillPrint.model';
import { ReportBillDrService } from '../../../../../services/pdfGenerate/bill-print-view/penalty-bill/Penalty_dr.service';

@Component({
  selector: 'ngx-penalty-bill-dr',
  templateUrl: './penalty-bill-dr.component.html',
  styleUrls: ['./penalty-bill-dr.component.scss']
})
export class PenaltyBillDrComponent implements OnInit {
  penaltydrList: any[] = [];
  penaltydrForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  documentTitle = "";
  docData: any;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    //{ "id": 2, "name": ".xls" },
  ]
  penaltyBillPrintData: Object;
  constructor(
    private _fb: FormBuilder,
    private _penaltydrservice: ReportBillDrService,
    private _penaltyService: PenaltyBillGenService,
    private _activateRoute: ActivatedRoute,
    private _excelService: ExcelServiceService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    if (this._activateRoute.snapshot.paramMap.get('billNumber') !== null && this._activateRoute.snapshot.paramMap.get('customerNumber') !== null) {
      let billNumber = this._activateRoute.snapshot.paramMap.get('billNumber');
      let customerNumber = this._activateRoute.snapshot.paramMap.get('customerNumber');
      this.onReport(billNumber, customerNumber);

    }
    this.createForm();
  }

  onSearchAgain(){
    this.isTrue=false;
    this._router.navigate(["bill/penaltybill-view"]);
  }

  onChangeExportType(event:any){
    if(event==1){
      //let date=new Date();
      let fileName='Pelanty Bill Dr';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if(event==2 || event==3){
      // let excelObj = {
      //   data: this.docData.docDefinition.content[1].table.body,
      // }
      // this._excelService.downloadExcelFile(excelObj, 'Penalty Bill Dr');
    
    }
  }

  onReport(billNumber, customerNumber) {

    this._penaltyService.getPenaltyBillSrPrint(billNumber, customerNumber).subscribe(res => {
      this.penaltyBillPrintData = res as PenaltyBillPrintModel[];

      this.docData = this._penaltydrservice.generatePdf(this.penaltyBillPrintData);
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
