import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbDateService, NbToastrService } from "@nebular/theme";
import { dateFormatForDDMMYY, dateFormatForDDMMYYYY } from '../../../@core/utils/utiliy';

import { CustomerService } from '../../../services/customer.service';
import { DatePipe } from '@angular/common';
import { ReconcilationStatusModel } from '../../../model/reconciliation.model';
import { ReconciliationService } from '../../../services/reconciliation.service';
import { User } from './../../../model/user.model';
import { log } from 'console';

@Component({
  selector: 'ngx-consumer-reconciliation',
  templateUrl: './consumer-reconciliation.component.html',
  styleUrls: ['./consumer-reconciliation.component.scss']
})
export class ConsumerReconciliationComponent implements OnInit {

  consumerReconciliation: FormGroup
  consumerReconciliationlist: ReconcilationStatusModel[]=[]
  user = localStorage.getItem('userName');
  endDateList: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _reconciliationService : ReconciliationService,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _dateService: NbDateService<Date>,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  getConsumerReconciliation(startDate:string,endDate:string){
    this._reconciliationService.getCustomerReconciliation(startDate,endDate,this.user).subscribe(res=>{
      this.consumerReconciliationlist = res as ReconcilationStatusModel[];
    })
  }

  
  saveconsumerReconciliation(payDate){
    const param={
      payDate: payDate,
      user:this.user
    }
    this._reconciliationService.saveConsumerReconciliation(param).subscribe(res=>{
      console.log("res",res);
      if (res==true) {
        this._toasterService.success("Bill Saved Successfully", "Success");
        this.createForm();
      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.consumerReconciliationlist = [];
      }
    })
  }

  startDates(event: Date) {
    let startDate = dateFormatForDDMMYYYY(event);
    this.consumerReconciliation.patchValue({
      startDate: startDate,  
    }) 
  }

  endDates(event: Date) {
    let endDate = dateFormatForDDMMYYYY(event);
    this.consumerReconciliation.patchValue({
      endDate: endDate,
    })
  }

  createForm() {
    this.consumerReconciliation = this._fb.group({
      startDate: [, []],
      startDatet:[,[Validators.required]],
      endDate: [,[]],
      endDatet: [,[Validators.required]],
    })
  }

  get f() {
    return this.consumerReconciliation.controls
  }
  get formval() {
    return this.consumerReconciliation.value
  }


}
