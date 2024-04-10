/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */

import {
  Component,
  OnInit,
} from "@angular/core";

import { AnalyticsService } from "./@core/utils/analytics.service";
import { AuthService } from "./Authentication/services/auth.service";
import { SeoService } from "./@core/utils/seo.service";
import { UserManagementService } from "./services/user-management.service";

@Component({
  selector: "ngx-app",
  template: "<router-outlet></router-outlet>",
})
export class AppComponent implements OnInit {
  material_icons: Record<string, any> = {
    // shopping_cart: MaterialDesignIcon.shopping_cart,
    // notification_active: MaterialDesignIcon.notification_active,
    // notifications_paused: MaterialDesignIcon.notification_paused,
    // notifications_off: MaterialDesignIcon.notification_off,
    // engineering: MaterialDesignIcon.engineering,
    // settings: MaterialDesignIcon.settings,
    // event: MaterialDesignIcon.event,
    // insert_chart_outlined: MaterialDesignIcon.insert_chart_outlined,
    // calendar_view_month: MaterialDesignIcon.calendar_view_month,
    // ...
  };

  constructor( 
    private analytics: AnalyticsService,
    private seoService: SeoService,
    private authService: AuthService,
    private userManagementService: UserManagementService,
    //private alarmService: AlarmActionsService
  ) {
    // this.iconLibraries.registerSvgPack("material", this.material_icons);
    // this.userManagementService.getAllSVGIcon().subscribe((res: any) => {
    //   res.data.forEach((element) => {
    //     this.material_icons[`${element.name}`] = element.value;
    //   });

    //   // this.iconLibraries.registerSvgPack("material", this.material_icons);
    // });
    window.addEventListener('beforeunload', function (event) {
      event.stopImmediatePropagation();
    });

    // localStorage.setItem("audioPermission", "false");
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
    this.seoService.trackCanonicalChanges();
    this.setCurrentUser();
  }

  setCurrentUser() {
    if (localStorage.getItem("accessToken") === null) {
      this.authService.setCurrentUser(null);
    } else {
      const accessToken = localStorage.getItem("accessToken");
      const userName = localStorage.getItem("userName");
      const roleName = localStorage.getItem("roleName");
      const expiration = localStorage.getItem("expiration");
      const refreshToken = localStorage.getItem("refreshToken");
      const loggedInUserEmail = localStorage.getItem("loggedInUserEmail");
      const refreshTokenExpiration = localStorage.getItem(
        "refreshTokenExpiration"
      );

      let authToken = {
        accessToken,
        userName,
        roleName,
        expiration,
        refreshToken,
        refreshTokenExpiration,
        loggedInUserEmail,
      };

      this.authService.setCurrentUser(authToken);
      // this.alarmService.createHubConnection().then(() => {
      //   this.alarmService.refreshAlarmCount();
      // });
    }
  }
}
