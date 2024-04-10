import { BehaviorSubject, Observable, ReplaySubject } from "rxjs";
import { Injectable, OnDestroy } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { User } from "../../@core/data/users";
import { UserManagementService } from "../../services/user-management.service";
import { environment } from "../../../environments/environment";
import { log } from "console";
import { map } from "rxjs/operators";

//import { AlarmActionsService } from "../../AlarmActions/services/alarm-actions.service";

@Injectable({
  providedIn: "root",
})
export class AuthService{
  private currentUserSource = new ReplaySubject<any>(1);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router,
    //private alarmService: AlarmActionsService,
    private userManagmentSevice: UserManagementService
  ) {}
  // var crypto = require('crypto');

  // var generate_key = function() {
  //     // 16 bytes is likely to be more than enough,
  //     // but you may tweak it to your needs
  //     return crypto.randomBytes(16).toString('base64');
  // };
  login(model: any) {
    if (model.rememberMe) {
      localStorage.setItem("name", model.userName);
      localStorage.setItem("password", model.password);
      localStorage.setItem("rememberCurrentUser", model.rememberMe);
      localStorage.setItem("sessionId",model.sessionId);
    } else {
      localStorage.removeItem("name");
      localStorage.removeItem("password");
      localStorage.removeItem("rememberCurrentUser");
      localStorage.setItem("sessionId",model.sessionId);
    }
    
    return this.http
      .post<any>(environment.apiUrl + "user-login", {
        ...model,
        refreshToken: "",
      })
      .pipe(
        map((result) => {
          if (result.data && result.data.token) {
            
            localStorage.setItem("accessToken", result.data.token);
            localStorage.setItem("firstName", result.data.firstName);
            localStorage.setItem("lastName", result.data.lastName);
            localStorage.setItem("userName", result.data.userName);
            localStorage.setItem("roleName", result.data.roleName);
            localStorage.setItem("expiration", result.data.expiration);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            localStorage.setItem("loggedInUserEmail", result.data.email);
            localStorage.setItem("dbCodeList", result.data.dbCodeList);
            localStorage.setItem("locationCodeList", result.data.locationCodeList);
            localStorage.setItem(
              "refreshTokenExpiration",
              result.data.refreshTokenExpiration
            );
            localStorage.setItem("dashBoardUrl", result.data.dashBoardUrl);
            this.currentUserSource.next(result.data);
              
            // this.alarmService.createHubConnection().then(() => {
            //   this.alarmService.refreshAlarmCount();
            // });
          }
          console.log("result.data",result.data);

          return result;
        })
      );
  }

  getNewRefreshToken(): any {
    let userName = localStorage.getItem("userName");
    let refreshToken = localStorage.getItem("refreshToken");
    let sessionId= localStorage.getItem("sessionId");
    
    return this.http
      .post<any>(environment.apiUrl + "user-login", {
        userName,
        refreshToken,
        password: "",
        sessionId
      })
      .pipe(
        map((result) => {
          if (result && result.data.token) {
            
            localStorage.setItem("accessToken", result.data.token);
            localStorage.setItem("firstName", result.data.firstName);
            localStorage.setItem("lastName", result.data.lastName);
            localStorage.setItem("userName", result.data.userName);
            localStorage.setItem("roleName", result.data.roleName);
            localStorage.setItem("expiration", result.data.expiration);
            localStorage.setItem("refreshToken", result.data.refreshToken);
            localStorage.setItem("loggedInUserEmail", result.data.email);
            localStorage.setItem(
              "refreshTokenExpiration",
              result.data.refreshTokenExpiration
            );
            this.currentUserSource.next(result.data);
          }
          return result;
        })
      );
  }

  // deleteCurrentUserToken(userName,sessionId):any{
  //   if(sessionId!=null || sessionId!=typeof(undefined)){
  //     this.http
  //     .post<any>(environment.apiUrl + "user-logout", {
  //       userName,
  //       refreshToken:"",
  //       password: "",
  //       sessionId:sessionId
  //     }).subscribe();
  //   }    
  // }

  logout(): any { 
    // let userName = localStorage.getItem("userName");
    // let sessionId= localStorage.getItem("sessionId");
    // this.deleteCurrentUserToken(userName,sessionId);  

    localStorage.removeItem("accessToken");
    localStorage.removeItem("firstName");
    localStorage.removeItem("lastName");
    localStorage.removeItem("userName");
    localStorage.removeItem("roleName");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("expiration");
    localStorage.removeItem("refreshTokenExpiration");
    localStorage.removeItem("user_email");
    localStorage.removeItem("loggedInUserEmail");
    localStorage.removeItem("sessionId"); 
    //localStorage.setItem("audioPermission", "false");
    this.currentUserSource.next(null);
    //this.alarmService.stopHubConnection();
    this.userManagmentSevice.menuCache.clear();
    // this.router.navigateByUrl("/auth/login");
    this.router.navigateByUrl("/");
  }

  GetOtpViaEmail(model: any) {
    localStorage.setItem("user_email", model.email);

    return this.http.post<any>(environment.apiUrl + "get-verification-code", {
      ...model,
    });
  }

  ResendOtpViaEmail(email: string) {
    return this.http.post<any>(environment.apiUrl + "get-verification-code", {
      email,
    });
  }

  VerifyOtp(model: any) {
    const userMail = localStorage.getItem("user_email");
    return this.http.post<any>(environment.apiUrl + "verify-otp", {
      code: model.code,
      forgotPasswordMail: userMail,
    });
  }

  ChangePassword(model: any) {
    const userMail = localStorage.getItem("user_email");

    return this.http.post<any>(environment.apiUrl + "change-password", {
      email: userMail,
      newPassword: model.newPassword,
      currentPassword: "",
    });
  }

  ResetPassword(model: any) {
    const loggedInUserName = localStorage.getItem("userName");

    return this.http.post<any>(environment.apiUrl + "change-password", {
      userName: loggedInUserName,
      newPassword: model.newPassword,
      currentPassword: model.currentPassword,
      
    });
  }

  setCurrentUser(result: any) {
    this.currentUserSource.next(result);
  }
}
