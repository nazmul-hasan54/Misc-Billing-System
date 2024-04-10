import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ddmmyytodate, dateFormatForDDMMYY } from '../../../@core/utils/utiliy';
import { ExtendDueDateService } from '../../../services/extend-due-date.service';
import { ExtendDateModel } from '../../models/extendDate.model';
import { ExtendDateBoxComponent } from '../extend-date-box/extend-date-box.component';
import { PaymentPrepaidModel } from '../../models/payment-prepaid.model';
import { PaymnetService } from '../../../services/paymnet/paymnet.service';

@Component({
  selector: 'ngx-paymnet-for-prepaid',
  templateUrl: './paymnet-for-prepaid.component.html',
  styleUrls: ['./paymnet-for-prepaid.component.scss']
})
export class PaymnetForPrepaidComponent implements OnInit {


  // paymentForm: FormGroup;
  title: string;
  billNumber: number;
  customerNumber: number;
  billAmount: number

  constructor(
    public dialogRef: MatDialogRef<PaymnetForPrepaidComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PaymentPrepaidModel,
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _extendDDateService: ExtendDueDateService,  
    private _paymnetGatewayService: PaymnetService,

  ) { 
    this.title = data.title;
    this.billAmount=data.billAmount,
    this.billNumber = data.billNumber;
    this.customerNumber = data.customerNumber;
 
  }

  ngOnInit(): void {
  }

  paymentGetwayNagad(){
    this._paymnetGatewayService.nagadGatewayPrepaid(this.billAmount, this.customerNumber, this.billNumber)
    .subscribe((res: any) => {
      window.open(res.url);
    });
  }
  paymentGetwayBkash(){

  }
  paymentGetwayUpay(){

  }


}

