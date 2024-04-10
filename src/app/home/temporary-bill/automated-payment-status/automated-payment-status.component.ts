import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerService } from '../../../services/customer.service';
import { NbToastrService } from '@nebular/theme';
import { ReconcilationStatusModel } from '../../../model/reconciliation.model';
import { ReconciliationService } from '../../../services/reconciliation.service';

@Component({
  selector: 'ngx-automated-payment-status',
  templateUrl: './automated-payment-status.component.html',
  styleUrls: ['./automated-payment-status.component.scss']
})
export class AutomatedPaymentStatusComponent implements OnInit {
  user = localStorage.getItem('userName');
  Reconciliationlist: ReconcilationStatusModel[] = []
 automatedPayment:FormGroup
 endDateList:any[]=[];
  constructor(
    private _fb: FormBuilder,
    private _reconciliationService: ReconciliationService,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  getMiscReconciliation(startDate: string, endDate: string) {
    this._reconciliationService.getMiscReconciliation(startDate, endDate,this.user).subscribe(res => {
      this.Reconciliationlist = res as ReconcilationStatusModel[];
    })
  }
  saveMiscReconciliation(payDate) {
     const param={
       payDate: payDate,
       user: this.user
    }
    this._reconciliationService.saveMiscReconciliation(param).subscribe(res => {
      if (res==true) {
        this._toasterService.success("Bill Saved Successfully", "Success");

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.Reconciliationlist = [];
      }
    })
  }

  createForm(){
    this.automatedPayment=this._fb.group({
      startDate:[,[]],
      endDate:[[]]
    })
  }

  get f() {
    return this.automatedPayment.controls
  }
  get formval() {
    return this.automatedPayment.value
  }

}
