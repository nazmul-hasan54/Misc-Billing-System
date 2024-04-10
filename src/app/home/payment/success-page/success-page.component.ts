import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-success-page',
  templateUrl: './success-page.component.html',
  styleUrls: ['./success-page.component.scss']
})
export class SuccessPageComponent implements OnInit {

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
