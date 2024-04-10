import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-table-loader',
  templateUrl: './table-loader.component.html',
  styleUrls: ['./table-loader.component.scss']
})
export class TableLoaderComponent implements OnInit {
  @Input() isCompleted: boolean;
  constructor() { }

  ngOnInit(): void {
  }

}
