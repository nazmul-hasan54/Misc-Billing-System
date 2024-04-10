import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface PeriodicElement {
  caseId: string;
  alarmSetDate: string;
  contractor: string;
  acknowledgeDate: string;
  alarmDescription: string;
  contractNbr: string;
  alarmClearDate: string;
}

let date1 = new Date(2021, 10, 4, 22, 26);
let date1Date = `${date1.getDay()}/${
  date1.getMonth() + 1
}/${date1.getFullYear()}`;
let date1Time = `${date1.getHours()}:${date1.getMinutes()}`;

let date2 = new Date(2021, 10, 4, 22, 28);
let date2Date = `${date2.getDay()}/${
  date2.getMonth() + 1
}/${date2.getFullYear()}`;
let date2Time = `${date2.getHours()}:${date2.getMinutes()}`;

const ELEMENT_DATA: PeriodicElement[] = [
  {
    caseId: ' A212771038-995605',
    alarmSetDate: date1Date + ' ' + date1Time,
    contractor: 'Kane',
    acknowledgeDate: date2Date + ' ' + date2Time,
    alarmDescription: '[E 102] Incoming power supply ON/OFF status',
    contractNbr: ' RP225A',
    alarmClearDate: ' ',
  },
];

@Component({
  selector: 'ngx-case-details',
  templateUrl: './case-details.component.html',
  styleUrls: ['./case-details.component.scss']
})
export class CaseDetailsComponent implements OnInit {

  displayedColumns1: string[] = [
    "caseId",
    "alarmSetDate",
    "contractor",
    "acknowledgeDate",
  ];
  displayedColumns2: string[] = [
    "alarmDescription",
    "contractNbr",
    "alarmClearDate",
  ];

  dataSource = ELEMENT_DATA;

  constructor(
    public dialogRef: MatDialogRef<CaseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  close() {
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.remove("animate__slideInRight");
    document
      .getElementsByClassName("animate__animated")[0]
      .classList.add("animate__slideOutRight");

      setTimeout(() => {
        this.dialogRef.close();
      }, 1000);
    
  }

}
