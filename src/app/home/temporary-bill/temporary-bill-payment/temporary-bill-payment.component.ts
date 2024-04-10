import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from '../../../model/customer-details';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerService } from '../../../services/customer.service';
import { ImposedByModel } from '../../../model/imposedby.model';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';

@Component({
  selector: 'ngx-temporary-bill-payment',
  templateUrl: './temporary-bill-payment.component.html',
  styleUrls: ['./temporary-bill-payment.component.scss']
})
export class TemporaryBillPaymentComponent implements OnInit {
  billpaymentform:FormGroup;
  billNumberList: any[] = [];
  customerDetails: CustomerDetails;
  imposedByList: ImposedByModel[] = [];
  isEditable: boolean = false;
  billNumber: string;
  

  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _miscBillingService: MiscBillingService,
    private _penaltyBillGen: PenaltyBillGenService,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  getbillDetailsByBillNumbr() {
    this._penaltyBillGen.getPenaltyBillNonCustPrint(this.f.billNumber.value, this.f.consumerNumber.value).subscribe((res: any) => {


        this.customerDetails = res as CustomerDetailsDTO;
      this.billpaymentform.patchValue(this.customerDetails[0]);
    }, er => {
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }
  paymnetGateway(bill:PenaltyBillViewModel){
    this._router.navigate(['/payment/payment-gateway',this.f.consumerNumber.value,this.f.billNumber.value])
  
    //   let totalAmount=bill.billAmount
    //   let baseUrl=''
    //   let confirmUrl='http://localhost:4200/payment/success-page'
    //   let failedUrl='http://localhost:4200/payment/success-page'
    //   let cancelUrl='http://localhost:4200/payment/success-page'
    //   let customerNumber=bill.customerNumber
    //   let billNumber=bill.billNumber
      
    // // window.open("https://sandbox.sslcommerz.com/EasyCheckOut/testcded7cf114a26df9c2d9638bb26d9d24495", "_blank")
    // this._paymnetGatewayService.paymnetGateway(totalAmount,customerNumber,billNumber).subscribe((res:any)=>{
    //   window.open(res.url)
  
    // })
    
  }
  createForm(){
    this.billpaymentform=this._fb.group({
      customerName:[,[]],
      consumerNumber:[,[]],
      billNumber:[,[]],
      locationName:[,[]],
      locationCode:[,[]],
      areaCode:[[]],
      totalAmount:[[]],
      principleAmount:[[]],
      vatAmount:[[]]
    })
  }
  get f(){
    return this.billpaymentform.controls
  }
  get formval(){
    return this.billpaymentform.value
  }
}
