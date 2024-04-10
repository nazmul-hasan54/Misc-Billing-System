import { Component, OnInit } from '@angular/core';
import { NbDialogService, NbToastrService } from '@nebular/theme';

import { FormBuilder } from '@angular/forms';
import { PaymentDetailsModel } from '../../../model/paymentdetails.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { paymentDetailsService } from '../../../services/paymnet/paymentdetails.service';

@Component({
  selector: 'ngx-payment-details',
  templateUrl: './payment-details.component.html',
  styleUrls: ['./payment-details.component.scss']
})
export class PaymentDetailsComponent implements OnInit {
  paymentDetailsList: PaymentDetailsModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  closeResult = '';

  constructor(private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _paymentDetailsservice: paymentDetailsService
    ) { }

  ngOnInit(): void {
    this.paymentDetails();
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };
  
  }

  paymentDetails() {
    this._paymentDetailsservice.penaltyPaymentDetails().subscribe((res) => {
      this.paymentDetailsList = res as PaymentDetailsModel[];
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


}
