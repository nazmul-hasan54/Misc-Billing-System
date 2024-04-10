import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import moment from 'moment';
import { dateFormat } from '../../../@core/utils/utiliy';
import { Building } from '../../../model/building.model';
import { BuildingService } from '../../../services/building.service';
import { BuildingCreateComponent } from './building-create/building-create.component';
import { BuildingEditComponent } from './building-edit/building-edit.component';
@Component({
  selector: 'ngx-building',
  templateUrl: './building.component.html',
  styleUrls: ['./building.component.scss']
})
export class BuildingComponent implements OnInit {
  total: number = 0;
  buildingList: Building[] = [];
  pageSize: number = 10;
  currentPage: number = 0;
  searchBy: string = "";
  isLoading = false;

  columns = [
    { columnDef: "siteNbr", header: "Site Nbr" },
    { columnDef: "addressCode", header: "Address Code" },
    { columnDef: "buildingTitle", header: "Building Title" },
    { columnDef: "address", header: "Address" },
    { columnDef: "postalCode", header: "Postal Code" },
    { columnDef: "buildingType", header: "Building Type" },
    { columnDef: "issInstallDate", header: "ISS Install Date" }
  ];

  constructor(
    private dialog: MatDialog,
    private buildingService: BuildingService
  ) {}

  ngOnInit(): void {
    this.getAllBuilding();
  }

  getAllBuilding = function () {
    this.isLoading = true;
    this.buildingService
      .getAllBuilding(this.currentPage, this.pageSize, this.searchBy)
      .subscribe((res: any) => {
        res.data.data.forEach(function (value) {
          if(value.issInstallDate!=null){
            value.issInstallDate= dateFormat(value.issInstallDate);
          }
        }); 
        // res.data.data.issInstallDate=moment(res.data.data.issInstallDate).format('D MMM YYYY');
        this.buildingList = res.data.data;
        this.total = res.data.totalCount;
        this.pageSize = res.data.pageSize;
      });
    this.isLoading = false;
  };

  searchBuildingByBuildingTitle() {
    this.currentPage = 0;
    this.getAllBuilding();
  }

  onPageChange(e: PageEvent) {
    this.currentPage = e.pageIndex;
    this.pageSize = e.pageSize;
    this.getAllBuilding();
  }

  addBuilding() {
    const dialogRef = this.dialog.open(BuildingCreateComponent, {
      position: { top: "0", right: "0" },
      height: "100%",
      width: "40%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    dialogRef.afterClosed().subscribe(() => this.getAllBuilding());
  }

  editBuilding(buildingdata: any) {
    const dialogRef = this.dialog.open(BuildingEditComponent, {
      position: { top: "0", right: "0" },
      data: buildingdata,
      height: "100%",
      width: "40%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    dialogRef.afterClosed().subscribe(() => this.getAllBuilding());
  }
}
