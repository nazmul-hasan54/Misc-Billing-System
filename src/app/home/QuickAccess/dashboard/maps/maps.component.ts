import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { environment } from '../../../../../environments/environment';
import { CaseDetailsComponent } from './case-details/case-details.component';

export interface PeriodicElement {
  siteId: string;
  siteName: string;
}

const ELEMENT_DATAN: PeriodicElement[] = [
  { siteId: "S015", siteName: "Scotts Road /C.K. Tng" },
];

const ELEMENT_DATAW: PeriodicElement[] = [
  {
    siteId: "S004",
    siteName: "AYE / Upp Jurong Road (Towards PIE) (Towards Tuas)",
  },
];

const ELEMENT_DATAC: PeriodicElement[] = [
  { siteId: "S015", siteName: "Scotts Road /C.K. Tng" },
  { siteId: "S002", siteName: "Bukit Timah Road / Botanic Gardens" },
];

const ELEMENT_DATAE: PeriodicElement[] = [
  {
    siteId: "S148",
    siteName: "Hougang Ave 2 /near 8k 700/ Parkwood Collection",
  },
  { siteId: "S152", siteName: "Simeis Ave/near Changi Hospital" },
];

//end of with out mouse over mat dialog
@Component({
  selector: 'ngx-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.scss']
})
export class MapsComponent implements OnInit {

   //with out mouse over mat dialog
   displayedColumns: string[] = ["siteId", "siteName"];
   dataSourceN = ELEMENT_DATAN;
   dataSourceW = ELEMENT_DATAW;
   dataSourceC = ELEMENT_DATAC;
   dataSourceE = ELEMENT_DATAE;
 
   mapPath = environment.mapPath;
   //end of with out mouse over mat dialog
   mobile = false;
  constructor(private dialog: MatDialog, private http: HttpClient) { }

  ngOnInit(): void {
    if (window.screen.width <= 959) {
      this.mobile = true;
    }
  }

  //mouse over mat dialog ---------------------------------------
  // openDialog(zone: string) {
  //   let position = {};
  //   switch (zone) {
  //     case 'north':
  //       position = { top: '0.5%', left: '47.5%' };
  //       break;

  //     case 'west':
  //       position = { top: '19%', left: '12.5%' };
  //       break;

  //     case 'central':
  //       position = { top: '33%', left: '34.00%' };
  //       break;

  //     case 'east':
  //       position = { top: '21%', left: '55.25%' };
  //       break;

  //     default:
  //       break;
  //   }
  //   this.dialog.open(ZoneDialogComponent, {
  //     data: { zone },
  //     height: '100px',
  //     width: '500px',
  //     position: position,
  //     panelClass: 'custom-modalbox',
  //   });
  //}

  openCaseDetails(element: any) {
    this.dialog.open(CaseDetailsComponent, {
      position: { top: "0", right: "0" },
      height: "100%",
      width: "50%",
      data: { case: element },
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });
  }

}
