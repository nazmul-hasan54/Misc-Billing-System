import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute } from '@angular/router';
import { BillCycleModel } from '../../../../model/temporary/billCycle.model';
import { BillCycleService } from '../../../../services/bill-cycle.service';
import { DatePipe } from '@angular/common';
import { ModBill } from '../../../../model/mod-bill.model';
import { ModBillPrintService } from '../../../../services/pdfGenerate/bill-print-view/mod-bill/mod-bill-print.service';
import { ModBillService } from '../../../../services/mod-bill.service';

@Component({
  selector: 'ngx-miscellaneous-calculate',
  templateUrl: './miscellaneous-calculate.component.html',
  styleUrls: ['./miscellaneous-calculate.component.scss'],
  providers: [DatePipe]
})
export class MiscellaneousCalculateComponent implements OnInit {

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  miscellaneousForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  modBillList: any[];
  documentTitle = "";
  docData: any;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    //{ "id": 2, "name": ".xls" },
  ];
  billMonthList: any[] = [];
  locationCodes = localStorage.getItem('locationCodeList');

  constructor(
    private _fb : FormBuilder,
    private modService: ModBillService,
    private _pdfService: ModBillPrintService,
    private _billcycleService: BillCycleService,
    private datePipe : DatePipe,
    private _activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.createForm();
    this.getBillCylceCode();
  }

  getBillCylceCode() {
    this._billcycleService.getAllBillCycle().subscribe(res => {
      this.billMonthList = res as BillCycleModel[];
    })
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  createForm(){
    this.miscellaneousForm = this._fb.group({
      billMonth: ['', [Validators.required]],
      locationCode: [this.locationCodes,[]]
    })
  }

  get formCon(){
    return this.miscellaneousForm.controls;
  }

  onChangeExportType(event: any){
    if(event==1){
      //let date=new Date();
      let fileName='MOD Manual Input Information';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if(event==2 || event==3){
    
    }
  }

  onSearchAgain(){
    this.isTrue=false;
  }

  onReport(){
    let utilityObj = {
      billMonth: this.datePipe.transform(this.formCon.billMonth.value, 'MMM-yy'),
      //billMonth: 
      locationCode: this.locationCodes
    };
    this.modService.getAllModBillByLocAndMonth(this.formCon.locationCode.value ,utilityObj.billMonth).subscribe(res => {
      this.modBillList = res as ModBill[];
      this.docData = this._pdfService.generatePdf(this.modBillList, utilityObj);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
      });
    });
  }

}
