import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.scss']
})
export class GenericHeaderComponent implements OnInit {

  @Input() title: string = ''
  constructor() { }

  ngOnInit(): void {
  }

}
