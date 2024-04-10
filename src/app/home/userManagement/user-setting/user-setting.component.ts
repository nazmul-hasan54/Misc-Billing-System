import { Component, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { UserManagementService } from '../../../services/user-management.service';
import { UserSettingCreateComponent } from './uesr-setting-create/uesr-setting-create.component';
import { UserSettingEditComponent } from './uesr-setting-edit/uesr-setting-edit.component';

@Component({
  selector: 'ngx-user-setting',
  templateUrl: './user-setting.component.html',
  styleUrls: ['./user-setting.component.scss']
})
export class UserSettingComponent implements OnInit {
  isLoading = false;
  total: number = 0;
  pageSize: number = 10;
  currentPage: number = 1;
  searchBy: string = "";
  constructor(
    private dialog: MatDialog,
    private userManagementService: UserManagementService
  ) { }

  columns = [
    // { columnDef: "firstName", header: "First Name" },
    // { columnDef: "lastName", header: "Last Name" },
    { columnDef: "userName", header: "User Name" },
    { columnDef: "email", header: "Email" },
    { columnDef: "roleName", header: "Role Name" },
  ];
  userSettingData: Array<any>;
  ngOnInit(): void {
    this.getAllUser();
  }

  getAllUser = function () {
    this.isLoading = true;
    this.userManagementService
      .getAllUser(this.currentPage, this.pageSize, this.searchBy)
      .subscribe((res: any) => {
        this.userSettingData = res.data.data;
        this.total = res.data.totalCount;
        this.pageSize = res.data.pageSize;
      });
    this.isLoading = false;
  };

  searchUserByUserName() {
    this.currentPage = 0;
    this.getAllUser();
  }

  pageChangeFromUserTable(page: PageEvent) {
    this.currentPage = page.pageIndex;
    this.pageSize = page.pageSize;
    this.getAllUser();
  }

  addUser() {
    const dialogRef = this.dialog.open(UserSettingCreateComponent, {
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

    dialogRef.afterClosed().subscribe(() => this.getAllUser());
  }

  editUser(userData) {
    const editDialogRef = this.dialog.open(UserSettingEditComponent, {
      position: { top: "0", right: "0" },
      data: { user: userData },
      height: "100%",
      width: "30%",
      autoFocus: false,
      panelClass: [
        "animate__animated",
        "animate__slideInRight",
        "dialog_width_change",
      ],
    });

    editDialogRef.afterClosed().subscribe(() => this.getAllUser());
  }

}
