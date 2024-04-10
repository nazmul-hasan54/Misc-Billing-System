import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

@Component({
  selector: 'ngx-failed-page',
  templateUrl: './failed-page.component.html',
  styleUrls: ['./failed-page.component.scss']
})
export class FailedPageComponent implements OnInit {

  constructor(   private _router: Router,) { }

  ngOnInit(): void {
    setTimeout(() => {
      let redirectUrl= localStorage.getItem("redirectUrl");
      this._router.navigate([redirectUrl]);
    }, 5000);
  }

}
