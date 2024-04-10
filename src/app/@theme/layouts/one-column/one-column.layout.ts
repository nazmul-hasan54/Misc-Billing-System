import { ActivatedRoute, Router } from "@angular/router";
import { Component, NgZone, OnInit } from "@angular/core";
import {
  NbMenuItem,
  NbMenuService,
  NbSidebarService,
} from "@nebular/theme";

import { AuthService } from "../../../Authentication/services/auth.service";
import { LayoutService } from "../../../@core/utils";
import { UserManagementService } from "../../../services/user-management.service";
import { environment } from "../../../../environments/environment";
import { VisitorDetailsService } from "../../../services/visitor-details.service";

//import { AlarmActionsService } from "../../../AlarmActions/services/alarm-actions.service";




@Component({
  selector: "ngx-one-column-layout",
  styleUrls: ["./one-column.layout.scss"],
  templateUrl: "./one-column.layout.html",
})
export class OneColumnLayoutComponent implements OnInit {
  cfemsLogo = environment.cfemsLogo;
  ltaLogo = environment.ltaLogo;
  menu: NbMenuItem[] = [];
  menuFooter: NbMenuItem[] = [];
  visitorCount: any;

  constructor(
    private sidebarService: NbSidebarService,
    private layoutService: LayoutService,
    private userManagementService: UserManagementService,
    private menuService: NbMenuService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    //private alarmService: AlarmActionsService,
    private _ngZone: NgZone
  ) { }

  ngOnInit(): void {
    this.getMenuByRoleNUser();
    this.onMenuItemClick();
    this.userManagementService.onMenuMapping.subscribe((res) => {
      this.userManagementService.menuCache.delete(
        `menus-${localStorage.getItem("roleName")}-${localStorage.getItem(
          "userName"
        )}`
      );
      this.getMenuByRoleNUser();
    });
    this.toggleSidebar();
  }

  toggleSidebar() { 
    this.menuService.onItemClick().subscribe(() => {
      if (window.innerWidth < 1200 && window.innerWidth >= 576) {
        this.sidebarService.compact('menu-sidebar');
      } else if (window.innerWidth < 576) {
        this.sidebarService.collapse('menu-sidebar');
      }
    });
  }

  getMenuByRoleNUser() {
    this.userManagementService
      .getAllMenuByRoleIdNUser()
      .subscribe((response: any) => {
        
        let filteredGroupForFooter = response.data.filter(
          (x) => x.title == "Alarm Actions"
        )[0];
        let filteredResponse: NbMenuItem[] = response.data.filter(
          (x) =>
            x?.itemId !== filteredGroupForFooter?.itemId &&
            x?.groupId !== filteredGroupForFooter?.itemId
        );
        let filteredResponseForFooter: NbMenuItem[] = response.data.filter(
          (x) =>
            x?.itemId == filteredGroupForFooter?.itemId ||
            x?.groupId == filteredGroupForFooter?.itemId
        );
        if (filteredResponse) {
          this.menu = filteredResponse;
        }
        if (filteredResponseForFooter.length > 1) {
          this.menuFooter = filteredResponseForFooter;
          this.menuFooter.forEach((e) => {
            if (e.title === "New Alarm") {
              
            }
          });
        }
        this.resolveSelectionIssue();
      });
  }

  navigateHome() {
    let path = localStorage.getItem("dashBoardUrl");
    this.router.navigate([path]);
    this.userManagementService.onMenuMapping.emit(false);
  }

  onMenuItemClick() {
    this.menuService.onItemClick().subscribe((event) => {
      if (event.item.title === "Log out") {
        this.logOut();
        return;
      }
      if (event.item.title === "Change Password") {
        this.ResetPassword();
        return;
      }
      this.cleaningBeforeResolveSeletionIssue();
      event.item.selected = true;
      if (event.item?.parent) {
        event.item.parent.selected = true;
      }
    });
  }

  introduceChildMenu2Parent(response) {
    response.map((item: NbMenuItem) => {
      item.pathMatch = "full";
      if (item?.children?.length) {
        item.children.map((child: NbMenuItem) => {
          child.parent = item;
          child.pathMatch = "full";
        });
      }
    });
  }

  cleaningBeforeResolveSeletionIssue() {
    this.menu.map((item) => {
      item.selected = false;
      if (item?.children?.length) {
        item.children.map((child) => {
          child.selected = false;
        });
      }
    });
    if (this.menuFooter?.length) {
      this.menuFooter.map((item) => {
        item.selected = false;
      });
    }
  }

  resolveSelectionIssue(path?) {
    this.introduceChildMenu2Parent(this.menu);
    const url = path ? path : this.activatedRoute.snapshot["_routerState"].url;
    this.cleaningBeforeResolveSeletionIssue();
    this.menu.map((menu) => {
      if (menu.link === url) {
        menu.selected = true;
      }
      if (menu.children?.length) {
        menu.children.map((child) => {
          if (child.link === url) {
            menu.selected = true;
            menu.expanded = true;
            child.selected = true;
          }
        });
      }
    });
    if (this.menuFooter?.length) {
      this.menuFooter.map((menu) => {
        if (menu.link === url) {
          menu.selected = true;
        }
      });
    }
  }

  logOut() {
    this.authService.logout();
  }

  ResetPassword() {
    this.router.navigateByUrl("/user-management/reset-password");
  }

}
