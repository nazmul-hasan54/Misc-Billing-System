import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ngx-krishi',
  template: `<ngx-one-column-layout></ngx-one-column-layout>`,
})
export class KrishiComponent implements OnInit {

  constructor(
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
  }

}
