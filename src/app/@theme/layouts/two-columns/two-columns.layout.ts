import { ActivatedRoute, Router } from "@angular/router";
import { Component, NgZone } from "@angular/core";
import { NbMenuItem, NbMenuService, NbSidebarService } from "@nebular/theme";

import { AuthService } from "../../../Authentication/services/auth.service";
import { LayoutService } from "../../../@core/utils";
import { OneColumnLayoutComponent } from "../one-column/one-column.layout";
import { UserManagementService } from "../../../services/user-management.service";

//import { AlarmActionsService } from "../../../AlarmActions/services/alarm-actions.service";





@Component({
  selector: "ngx-two-columns-layout",
  styleUrls: ["./two-columns.layout.scss"],
  templateUrl: "./two-columns.layout.html",
})
export class TwoColumnsLayoutComponent extends OneColumnLayoutComponent {
  setupPageItems:NbMenuItem[] = [
    
    { title: "Building", link: "/setup-pages/building",selected:true},
    // { title: "Rtu", link: "/setup-pages/rtu" },
    // { title: "Equipment Group", link: "/setup-pages/equipment-group" },
    // { title: "Equipment", link: "/setup-pages/equipment" },
    // { title: "Alarm Code", link: "/setup-pages/alarm-code" },
    // { title: "Device Category", link: "/setup-pages/device-category" },
    // { title: "Diagnosis Rules", link: "/setup-pages/diagnosis-rules" },
  ];
  constructor(
    sidebarService: NbSidebarService,
    layoutService: LayoutService,
    userManagementService: UserManagementService,
    menuService: NbMenuService,
    activatedRoute: ActivatedRoute,
    router: Router,
    authService: AuthService,
    //alarmService: AlarmActionsService,
    _ngZone: NgZone
  ) {
    super(
      sidebarService,
      layoutService,
      userManagementService,
      menuService,
      activatedRoute,
      router,
      authService,
      //alarmService,
      _ngZone
    );
  }
}
