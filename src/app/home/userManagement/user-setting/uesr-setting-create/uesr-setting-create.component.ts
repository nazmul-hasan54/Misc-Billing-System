import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { DropDownResult } from '../../../../shared/models/drop-down-result.model';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { UserManagementService } from '../../../../services/user-management.service';

@Component({
  selector: 'ngx-uesr-setting-create',
  templateUrl: './uesr-setting-create.component.html',
  styleUrls: ['./uesr-setting-create.component.scss']
})
export class UserSettingCreateComponent implements OnInit {

  form = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl(""),
    userName: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email]),
    roleId: new FormControl("", Validators.required),
  });

  showRetrieving = false;
  showExistUserName = false;
  showNotExistUserName = false;
  showRefreshIcon = true;
  message: any;

  roles: DropDownResult[] = [];
  isLoading = false;
  constructor(
    public dialogRef: MatDialogRef<UserSettingCreateComponent>,
    private userServiceManagement: UserManagementService,
    private toastr: NbToastrService
  ) { }

  ngOnInit(): void {
    this.onUserNameControlChanges();
    this.getAllRoleDD();
  }

  onSave() {
    console.log(this.form.value);
    if (!this.form.valid) return;
    this.isLoading = true;
    this.userServiceManagement.saveNewUser(this.form.value).subscribe(
      (res) => {
        this.close();
        this.toastr.success(res.message, "Success");
        this.isLoading = false;
        this.showExistUserName = false;
        this.showNotExistUserName = false;
        this.showRefreshIcon = true;
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  getAllRoleDD() {
    this.userServiceManagement
      .getAllRoleDD()
      .subscribe((res: any) => {
        this.roles = res.data;
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

  checkUserNameExists() {
    let userName = this.form.get("userName")?.value;
    this.showRetrieving = true;
    this.showRefreshIcon = false;

    this.userServiceManagement.checkByUserNameExists(userName).subscribe(
      (res: any) => {
        this.message = res;
        this.showRetrieving = false;

        if (this.message.message === "User name already exists.") {
          this.showExistUserName = true;
          this.showNotExistUserName = false;
          this.showRefreshIcon = false;
        } else {
          this.showExistUserName = false;
          this.showNotExistUserName = true;
          this.showRefreshIcon = false;
        }
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        this.showRetrieving = false;
        console.log(err);
      }
    );
  }

  onUserNameControlChanges() {
    this.form.get("userName").valueChanges.subscribe((selectedValue) => {
      this.showExistUserName = false;
      this.showNotExistUserName = false;
      this.showRefreshIcon = true;
    });
  }

}
