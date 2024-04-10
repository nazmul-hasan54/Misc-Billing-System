import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import moment from 'moment';
import { UserManagementService } from '../../../../services/user-management.service';
import { DropDownResult } from '../../../../shared/models/drop-down-result.model';
@Component({
  selector: 'ngx-user-role-edit',
  templateUrl: './user-role-edit.component.html',
  styleUrls: ['./user-role-edit.component.scss']
})
export class UserRoleEditComponent implements OnInit {

  form = new FormGroup({
    id: new FormControl(this.data.id, [Validators.required, Validators.min(1)]),
    roleName: new FormControl(this.data.roleName, Validators.required),
    menuFkId: new FormControl(
      { key: this.data.menuFkId, value: this.data.menuName },
      Validators.required
    ),
    isActive: new FormControl(1),
    timeStamp: new FormControl(moment(Date.now()).format("YYYY-MM-DD")),
  });

  dashboardMenuDDList: DropDownResult[] = [];

  constructor(
    public dialogRef: MatDialogRef<UserRoleEditComponent>,
    private userServiceManagement: UserManagementService,
    private toastr: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
    if (!this.form.valid) return;

    this.form.value.menuFkId = this.form.value.menuFkId?.key;

    this.userServiceManagement.editUserRole(this.form.value).subscribe(
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
