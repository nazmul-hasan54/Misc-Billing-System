import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.scss']
})
export class PaymentFailedComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      let redirectUrl= localStorage.getItem("redirectUrl");
      this._router.navigate([redirectUrl]);
    }, 5000);
  }

}
