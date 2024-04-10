import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { MustMatch } from '../../../@core/helpers/must-match.validator';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { ConfirmDialogModel } from '../../../shared/models/confirm-dialog.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'ngx-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {

  resetPasswordForm: FormGroup;
  
  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private toastr:NbToastrService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      currentPassword: ['', Validators.required],
      newPassword: ['', [Validators.required,this.matchValues('currentPassword')]],
      confirmPassword: ['', Validators.required],
    }, 
    {
      validator: MustMatch('newPassword', 'confirmPassword')
    }
    );

  }
  matchValues(matchTO: string): ValidatorFn {
    return (control: AbstractControl) => {
      return control?.value !== control?.parent?.controls[matchTO].value
        ? null
        : { isMatching: true };
    };
  }

  ResetPassword(){
    this.authService.ResetPassword(this.resetPasswordForm.value).subscribe(res=>{
    this.toastr.success("Password reset successfully","Success");
    if(res.Succeeded)
    {
      this.confirmDialog();
    }

    },err => {console.log(err);
      //this.toastr.danger(err.error.message,"danger");
    });
  }

  confirmDialog(): void {
    const message = `Are you sure to logout?`;

    const dialogData = new ConfirmDialogModel("Logout Confirmation!", message);

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      height: '32%',
      width: '40%',
      disableClose: true,
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogResult => {
      if(dialogResult){
        this.authService.logout();
      }else{
        this.resetPasswordForm.reset();
      }
    });
  }

}
