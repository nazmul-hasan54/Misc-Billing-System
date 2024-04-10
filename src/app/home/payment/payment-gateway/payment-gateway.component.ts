import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'ngx-payment-gateway',
  templateUrl: './payment-gateway.component.html',
  styleUrls: ['./payment-gateway.component.scss']
})
export class PaymentGatewayComponent implements OnInit {
  paymnetForm:FormGroup;
  

  constructor(
    private _activatedRoute:ActivatedRoute,
    private _router:Router,
    private _fb:FormBuilder
  ) { }

  ngOnInit(): void {
    this.createForm();
      let billNumber = this._activatedRoute.snapshot.paramMap.get('billNumber');
      let customerNumber = this._activatedRoute.snapshot.paramMap.get('customerNumber');
      this.paymnetForm.patchValue({
        billNumber: billNumber,
        customerNumber: customerNumber
        
      })

    
  }

  paymentType(event){
  }

  nextPage(){
    this._router.navigate(["payment/success-page"]);
  }

  BackPage(){
    this._router.navigate(["dc-rc/dc-rc-bill-view"])
  }
  
  
  createForm(){
    this.paymnetForm=this._fb.group({
                      billNumber: [, []],
                      customerNumber:[,[]]
                  })
               }
  

}
