import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PenaltyBillPrintModel } from '../../../../model/penaltyBillPrint.model';
import { ReportBillService } from '../../../../services/pdfGenerate/bill/report-bill.service';
import { PenaltyBillGenService } from '../../../../services/penalty-bill-gen.service';

@Component({
  selector: 'ngx-penalty-bill-sr',
  templateUrl: './penalty-bill-sr.component.html',
  styleUrls: ['./penalty-bill-sr.component.scss']
})
export class PenaltyBillSrComponent implements OnInit {
  penaltysrList: any[] = [];
  penaltysrForm: FormGroup;
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
    private _penaltysrservice: ReportBillService,
    private _penaltyService: PenaltyBillGenService,
    private _activateRoute: ActivatedRoute,
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

  onReport(billNumber, customerNumber) {
    this._penaltyService.getPenaltyBillSrPrint(billNumber, customerNumber).subscribe(res => {
      this.penaltyBillPrintData = res as PenaltyBillPrintModel[];
      this.docData = this._penaltysrservice.generatePdf(this.penaltyBillPrintData);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
      });
    });

  }
  createForm() {
    this.penaltysrForm = this._fb.group({
      billMonth: ['', []],
      exportType: [1, []],
      report: [[]],
      documentTitle: [[]]
    })
  }

  onSearchAgain(){
    this.isTrue=false;
    this._router.navigate(["bill/penaltybill-view"]);
  }

  onChangeExportType(event:any){
    if(event==1){
      //let date=new Date();
      let fileName='Pelanty Bill Sr';
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
  
  get formVal() {
    return this.penaltysrForm.value;
  }

  get f() {
    return this.penaltysrForm.controls;
  }
}
