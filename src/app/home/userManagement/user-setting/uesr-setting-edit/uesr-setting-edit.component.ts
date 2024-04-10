import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { UserManagementService } from '../../../../services/user-management.service';
import { DropDownResult } from '../../../../shared/models/drop-down-result.model';
@Component({
  selector: 'ngx-uesr-setting-edit',
  templateUrl: './uesr-setting-edit.component.html',
  styleUrls: ['./uesr-setting-edit.component.scss']
})
export class UserSettingEditComponent implements OnInit {

  form: FormGroup;
  roles: DropDownResult[] = [];
  isLoading = false;

  showRetrieving = false;
  showExistUserName = false;
  showNotExistUserName = false;
  showRefreshIcon = true;
  message: any;

  constructor(
    public dialogRef: MatDialogRef<UserSettingEditComponent>,
    private userServiceManagement: UserManagementService,
    private toastr: NbToastrService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (this.data !== null || undefined) {
      this.form = new FormGroup({
        userId: new FormControl(this.data.user.userId, [
          Validators.required,
          Validators.min(1),
        ]),
        firstName: new FormControl(
          this.data.user.firstName,
          Validators.required
        ),
        lastName: new FormControl(this.data.user.lastName),
        userName: new FormControl(this.data.user.userName, Validators.required),
        email: new FormControl(this.data.user.email, [
          Validators.required,
          Validators.email,
        ]),
        roleId: new FormControl("", Validators.required),
      });
    }
  }

  ngOnInit(): void {
    if (this.data !== null || undefined) {
      this.getRoleByuserId();
      this.getAllRoleDD();
    }

    this.onUserNameControlChanges();
  }

  onSave() {
    console.log(this.form.value);
    if (!this.form.valid) return;
    alert('aaa');
    this.isLoading = true;
    this.userServiceManagement.editUser(this.form.value).subscribe(
      (res) => {
        this.close();
        this.toastr.success(res.message, "Success");
        this.isLoading = false;
      },
      (err) => {
        this.toastr.danger("An error occurred, Please try again", "Error");
        this.isLoading = false;
        console.log(err);
      }
    );
  }

  getRoleByuserId() {
    this.userServiceManagement
      .getRoleByuserId(this.data.user.userId)
      .subscribe((res: any) => {
        this.form.get("roleId").setValue(res.data.id);
      });
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
