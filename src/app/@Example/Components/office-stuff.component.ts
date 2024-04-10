import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IOfficeStuff } from '../Model/officeStuff.model';
import { Examplepdfservice } from '../pdfmake Service/Example-pdf-service';

import { ExampleService } from '../Service/example.service';
import { OfficeStuffCreateComponent } from './office-stuff-create/office-stuff-create.component';
import { OfficeStuffEditComponent } from './office-stuff-edit/office-stuff-edit.component';

@Component({
  selector: 'ngx-office-stuff',
  templateUrl: './office-stuff.component.html',
  styleUrls: ['./office-stuff.component.scss']
})
export class OfficeStuffComponent implements OnInit {

  total: number = 0;
  officeStuffList: IOfficeStuff[] = [];
  pageSize: number = 10;
  currrntPage: number = 0;
  searchBy: string = "";
  isLoading = false;

  displayedColumns: string[] = [
    "officeStuffId",
    "officeStuffName",
    "designation",
    "phone",
    "email",
    "isActive"
  ];
  dataSource = new MatTableDataSource<IOfficeStuff>(this.officeStuffList);
  @ViewChild(MatPaginator) paginator: any;
  constructor(private officeStuffService: ExampleService, private dialog: MatDialog,private pdfService: Examplepdfservice) { }

  ngOnInit(): void {
    this.getOfficeStuff();
  }

  onPageChange(e: PageEvent) {
    this.currrntPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getOfficeStuff();
  }
  getOfficeStuff() {
    this.isLoading = true;
    this.officeStuffService
      .getAllOfficeStuff(this.currrntPage, this.pageSize, this.searchBy)
      .subscribe((res: any) => {
        console.log(res);
        this.officeStuffList = res.data;
        this.total = res.data.totalCount;
        this.pageSize = res.data.pageSize;
        this.dataSource = new MatTableDataSource<IOfficeStuff>(this.officeStuffList);
      });
      this.pdfService.generatePdf();
    this.isLoading = false;
  }
  editMenu(officeStuffData: any) {
    const dialogRef = this.dialog.open(OfficeStuffEditComponent, {
      position: { top: "0", right: "0" },
      data: officeStuffData,
      height: "100%",
      width: "30%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    dialogRef.afterClosed().subscribe(() => this.getOfficeStuff());
  }

  addOfficeStuff() {
    const dialogRef = this.dialog.open(OfficeStuffCreateComponent, {
      position: { top: "0", right: "0" },
      height: "100%",
      width: "30%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    dialogRef.afterClosed().subscribe(() => this.getOfficeStuff());
  }
}
