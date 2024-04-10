import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'ngx-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.scss']
})
export class PaymentSuccessComponent implements OnInit {

  constructor(
    private _activatedRoute: ActivatedRoute,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      let redirectUrl= localStorage.getItem("redirectUrl");
      this._router.navigate([redirectUrl]);
    }, 5000);
  }

}
