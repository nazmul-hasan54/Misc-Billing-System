import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  siteId: string;
  siteName: string;
}

const ELEMENT_DATAN: PeriodicElement[] = [
  { siteId: 'S015', siteName: 'Scotts Road /C.K. Tng'}
];

const ELEMENT_DATAW: PeriodicElement[] = [
  { siteId: 'S004', siteName: 'AYE / Upp Jurong Road (Towards PIE) (Towards Tuas)'},
];

const ELEMENT_DATAC: PeriodicElement[] = [
  { siteId: 'S015', siteName: 'Scotts Road /C.K. Tng'},
  { siteId: 'S002', siteName: 'Bukit Timah Road / Botanic Gardens'}
];

const ELEMENT_DATAE: PeriodicElement[] = [
  { siteId: 'S148', siteName: 'Hougang Ave 2 /near 8k 700/ Parkwood Collection'},
  { siteId: 'S152', siteName: 'Simeis Ave/near Changi Hospital'}
];


@Component({
  selector: 'ngx-zone-dialog',
  templateUrl: './zone-dialog.component.html',
  styleUrls: ['./zone-dialog.component.scss']
})
export class ZoneDialogComponent implements OnInit {
  displayedColumns: string[] = ['siteId', 'siteName'];
  dataSource:any;
  style = {};
  constructor(@Inject(MAT_DIALOG_DATA) public data:any) {
    switch (data.zone) {
      case 'north':
        this.dataSource = ELEMENT_DATAN;
        this.style = {"background-color":"#5E2D86E5","color":"white"}
        break;

      case 'west':
        this.dataSource = ELEMENT_DATAW;
        this.style = { 'background-color': '#6F00C9', "color": 'white' };
        break;

      case 'central':
        this.dataSource = ELEMENT_DATAC;
        this.style = { 'background-color': '#00AB11', "color": 'white' };
        break;

      case 'east':
        this.dataSource = ELEMENT_DATAE;
        this.style = { 'background-color': '#0065C2', "color": 'white' };
        break;
      default:
        console.log('data is not found');
        break;
    }
   }

  ngOnInit(): void {
  }

}
