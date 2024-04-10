import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DropDownResult } from '../../../../shared/models/drop-down-result.model';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { UserManagementService } from '../../../../services/user-management.service';
import moment from 'moment';

@Component({
  selector: 'ngx-user-role-create',
  templateUrl: './user-role-create.component.html',
  styleUrls: ['./user-role-create.component.scss']
})
export class UserRoleCreateComponent implements OnInit {

  form = new FormGroup({
    roleName: new FormControl("", Validators.required),
    menuFkId: new FormControl("", Validators.required),
    isActive: new FormControl(1),
    timeStamp: new FormControl(moment(Date.now()).format("YYYY-MM-DD")),
  });

  dashboardMenuDDList: DropDownResult[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserRoleCreateComponent>,
    private userServiceManagement: UserManagementService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getAllDashboardMenuDD("");
    this.onDashboardMenuControlChanges();
  }

  onDashboardMenuControlChanges() {
    this.form.get("menuFkId").valueChanges.subscribe((value) => {
      this.getAllDashboardMenuDD(value);
    });
  }

  onSave() {
    console.log(this.form.value);
    if (!this.form.valid) return;

    this.form.value.menuFkId = this.form.value.menuFkId.key;
    console.log(this.form.value);
    this.userServiceManagement.saveUserRole(this.form.value).subscribe(
      (res) => {
        this.close();
        this.toastr.success(res.message, "Success");
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        console.log(err);
      }
    );
  }

  displayDashboard(option): string {
    return option.value;
  }

  getAllDashboardMenuDD(value) {
    this.userServiceManagement
      .getAllDashboardMenuDD()
      .subscribe((res: any) => {
        debugger;
        const filterValue = value.value || value;
        this.dashboardMenuDDList = res.data.filter((option) =>
          option.value.toLowerCase().includes(filterValue.toLowerCase())
        );
      });
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
