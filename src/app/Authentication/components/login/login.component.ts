import { ActivatedRoute, Router } from "@angular/router";
import { AfterViewInit, Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { first, takeUntil } from "rxjs/operators";

import { AudioPermissionComponent } from "../../../@core/components/audio-permission/audio-permission.component";
import { AuthService } from "../../services/auth.service";
import { ComponentDestroy } from "../../../@core/utils/componenet.destroy";
import { MatDialog } from "@angular/material/dialog";
import { MustMatch } from "../../../@core/helpers/must-match.validator";
import { NbToastrService } from "@nebular/theme";
import { VisitorDetailsService } from "../../../services/visitor-details.service";
import { DatePipe } from "@angular/common";

@Component({
  selector: "ngx-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
  
})
export class LoginComponent
  extends ComponentDestroy
  implements OnInit, AfterViewInit
{
  title: string = "USER LOGIN";
  loginFormvisibility: boolean = true;
  forgotFormvisibility: boolean = false;
  verifyFormvisibility: boolean = false;
  changePasswordFormvisibility: boolean = false;

  form: FormGroup;
  forgotForm: FormGroup;
  verifyForm: FormGroup;
  changePasswordForm: FormGroup;
  visitorForm: FormGroup;
  userName = localStorage.getItem("userName");
  ipAddress: any;
  visitorDetails: any;

  showRetrieving = false;

  displayOtpTimeLeft;
  interval;
  timeLeft = 1 * 60 + 59;
  otpTimeOut = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private toastr: NbToastrService,
    public dialog: MatDialog,
    private _visitorSvc: VisitorDetailsService,
    private _datePipe: DatePipe
  ) {
    super();
  }
  ngAfterViewInit(): void {
    // if (!localStorage.getItem("audioPermission")) {
    //   const msg = "CFEMS would like to play sounds";
    //   const dialogRef = this.dialog.open(AudioPermissionComponent, {
    //     position: { top: "1%", left: "1%" },
    //     height: "16%",
    //     width: "24%",
    //     data: msg,
    //   });

    //   dialogRef.afterClosed().subscribe((res) => {
    //     if (res) {
    //       localStorage.setItem("audioPermission", "true");
    //     } else {
    //       localStorage.setItem("audioPermission", "false");
    //     }
    //   });
    // }
  }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userName: [localStorage.getItem("name"), Validators.required],
      password: [localStorage.getItem("password"), Validators.required],
      rememberMe: [localStorage.getItem("rememberCurrentUser")],
      sessionId: [this.generate_key()],
    });

    this.forgotForm = this.formBuilder.group({
      email: ["", [Validators.required, Validators.email]],
    });

    this.verifyForm = this.formBuilder.group({
      code: ["", Validators.required],
    });

    this.changePasswordForm = this.formBuilder.group(
      {
        newPassword: ["", Validators.required],
        confirmPassword: ["", Validators.required],
      },
      {
        validator: MustMatch("newPassword", "confirmPassword"),
      }
    );
  }

  login() {
    if (this.form.invalid) {
      return;
    }
    this.authService
      .login(this.form.value)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        next: (res) => {
          const returnUrl =
            this.route.snapshot.queryParams["returnUrl"] ||
            res.data.dashBoardUrl;
          this.router.navigateByUrl(returnUrl);
        },
        error: (error) => {
          this.toastr.danger("An error occurred, Please try again", "Error");
          console.log(error);
        },
      });
  }

  showForgotPassForm(): void {
    if (!this.forgotFormvisibility) {
      this.loginFormvisibility = false;
      this.forgotFormvisibility = true;
      this.verifyFormvisibility = false;
      this.title = "FORGOT PASSWORD";
    }
  }

  backToLoginForm(): void {
    let forgotFormvisibilityOnCancel = true;
    if (this.forgotFormvisibility || forgotFormvisibilityOnCancel) {
      this.loginFormvisibility = true;
      this.forgotFormvisibility = false;
      this.verifyFormvisibility = false;
      this.title = "USER LOGIN";
    }
  }

  GetOtpViaEmail() {
    if (this.forgotForm.invalid) {
      return;
    }
    this.timeLeft = 0;
    this.showRetrieving = true;
    this.authService
      .GetOtpViaEmail(this.forgotForm.value)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        next: () => {
          this.title = "VERIFY OTP";
          this.verifyFormvisibility = true;
          this.loginFormvisibility = false;
          this.forgotFormvisibility = false;
          this.changePasswordFormvisibility = false;
          this.toastr.success("OTP has been sent Successfully");
          this.startTimer();
          this.showRetrieving = false;
        },
        error: (error) => {
          console.log(error);
          this.toastr.danger("OTP sending failed");
          this.showRetrieving = false;
        },
      });
  }

  ResendOtpViaEmail() {
    let email = localStorage.getItem("user_email");
    this.authService
      .ResendOtpViaEmail(email)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        next: () => {
          this.toastr.success("OTP has been sent Successfully");
          this.otpTimeOut = false;
          this.timeLeft = 1 * 60 + 59;
          this.startTimer();
        },
        error: (error) => {
          console.log(error);
          this.toastr.danger("OTP sending failed");
        },
      });
  }

  VerifyOtp() {
    if (this.verifyForm.invalid) {
      return;
    }

    this.authService
      .VerifyOtp(this.verifyForm.value)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        next: () => {
          this.title = "CHANGE PASSWORD";
          this.verifyFormvisibility = false;
          this.loginFormvisibility = false;
          this.forgotFormvisibility = false;
          this.changePasswordFormvisibility = true;
          this.forgotForm.reset();
          this.verifyForm.reset();
          this.changePasswordForm.reset();
          this.pauseTimer();
          this.timeLeft = 1 * 60 + 59;
          this.toastr.success("Your OTP is verified");
        },
        error: (error) => {
          console.log(error);
          this.toastr.danger("Your OTP is not verified");
        },
      });
  }

  ChangePassword() {
    if (this.changePasswordForm.invalid) {
      return;
    }

    this.authService
      .ChangePassword(this.changePasswordForm.value)
      .pipe(takeUntil(this.componentDestroy))
      .subscribe({
        next: () => {
          const returnUrl =
            this.route.snapshot.queryParams["returnUrl"] || "auth";
          this.router.navigateByUrl(returnUrl);

          this.title = "USER LOGIN";
          this.verifyFormvisibility = false;
          this.loginFormvisibility = true;
          this.forgotFormvisibility = false;
          this.changePasswordFormvisibility = false;

          localStorage.removeItem("name");
          localStorage.removeItem("password");
          localStorage.removeItem("rememberCurrentUser");
          localStorage.removeItem("user_email");
          localStorage.removeItem("dashBoardUrl");
          this.toastr.success("Password Changed successfully", "Success");
        },
        error: (error) => {
          this.toastr.danger("Password change failed");
        },
      });
  }

  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        this.otpTimeOut = false;
      } else {
        this.pauseTimer();
        this.otpTimeOut = true;
        //this.timeLeft = 1 * 60 + 59;
      }
      this.displayOtpTimeLeft = this.transform(this.timeLeft);
    }, 1000);
  }

  transform(value: number): string {
    const minutes: number = Math.floor(value / 60);
    return minutes + " minutes" + " " + (value - minutes * 60) + " seconds";
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  
  newGuid() {
    return 'xxxxxxxx-xxxx-yxxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0,
        v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  }
  generate_key () {
    return this.newGuid();
  };




  // ngOnDestroy(): void {
  //   this.pauseTimer();
  //   this.timeLeft = 0;
  // }
}
