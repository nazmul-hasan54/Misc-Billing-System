import { Component, OnDestroy, OnInit } from "@angular/core";
import { NbMediaBreakpointsService, NbMenuService, NbSidebarService, NbThemeService } from "@nebular/theme";
import { UserData } from "../../../@core/data/users";
import { map, takeUntil } from "rxjs/operators";
import { Subject, Observable } from "rxjs";
import { AuthService } from "../../../Authentication/services/auth.service";
import { ComponentDestroy } from "../../../@core/utils/componenet.destroy";
import { LayoutService } from "../../../@core/utils";

@Component({
  selector: "ngx-header",
  styleUrls: ["./header.component.scss"],
  templateUrl: "./header.component.html",
})
export class HeaderComponent
  extends ComponentDestroy
  implements OnInit, OnDestroy
{
  private destroy$: Subject<void> = new Subject<void>();
  public readonly materialTheme$: Observable<boolean>;
  userPictureOnly: boolean = false;
  roleName: string = "";
  user: any;
  userMenu = [{ title: "Change Password" }, { title: "Log out" }];
  themes = [
    {
      value: 'default',
      name: 'Light',
    },
    {
      value: 'dark',
      name: 'Dark',
    },
    {
      value: 'cosmic',
      name: 'Cosmic',
    },
    {
      value: 'corporate',
      name: 'Corporate',
    },
  ];
  currentTheme = 'default';
  menuNotificationItems: NotificationMenuListItem[];
  calenderMenuItems: CalendarMenuListItem[];
  public constructor(
    private themeService: NbThemeService,
    private layoutService: LayoutService,
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private userService: UserData,
    private breakpointService: NbMediaBreakpointsService,
    public authService: AuthService
  ) {
    super();

    this.materialTheme$ = this.themeService.onThemeChange().pipe(
      map((theme) => {
        const themeName: string = theme?.name || "";
        return themeName.startsWith("material");
      })
    );
  }

  ngOnInit() {
    this.authService.currentUser$
      .pipe(takeUntil(this.componentDestroy))
      .subscribe((res) => {
        if (res) {
          this.roleName = res.roleName;
        }
      });

    this.userService
      .getUsers()
      .pipe(takeUntil(this.destroy$))
      .subscribe((users: any) => (this.user = users.nick));

    let firstName = localStorage.getItem("firstName");
    let lastName = localStorage.getItem("lastName");
    if(firstName !== '' && lastName !==''){
      this.user.name = firstName + ' '+  lastName;
    }else{
      let userName = localStorage.getItem("userName");
      if (userName) this.user.name = userName ;
    }
    
    const { xl } = this.breakpointService.getBreakpointsMap();
    this.themeService
      .onMediaQueryChange()
      .pipe(
        map(([, currentBreakpoint]) => currentBreakpoint.width < xl),
        takeUntil(this.destroy$)
      )
      .subscribe(
        (isLessThanXl: boolean) => (this.userPictureOnly = isLessThanXl)
      );

      this.menuNotificationItems = [
        {
          contractorCompany: 'Kone',
          caseId: 'A172441244-109818',
          time: '1 hour ago'
        },
        {
          contractorCompany: 'Kone',
          caseId: 'A172441244-109818',
          time: '1 hour ago'
        },
        {
          contractorCompany: 'Kone',
          caseId: 'A172441244-109818',
          time: '1 hour ago'
        },
        {
          contractorCompany: 'Kone',
          caseId: 'A172441244-109818',
          time: '1 hour ago'
        },
      ]

      this.calenderMenuItems = [
        {
          site: 'S001 Lor 2 Toa Payoh/Toa Payoh MRT',
          equipmentNo: 'CCTV',
          scheduleType: 'Preventive Maintenance',
          date: '01/05/2022 - 31/05/2022'
        },
        {
          site: 'S001 Lor 2 Toa Payoh/Toa Payoh MRT',
          equipmentNo: 'CCTV',
          scheduleType: 'Preventive Maintenance',
          date: '01/05/2022 - 31/05/2022'
        },
        {
          site: 'S001 Lor 2 Toa Payoh/Toa Payoh MRT',
          equipmentNo: 'CCTV',
          scheduleType: 'Preventive Maintenance',
          date: '01/05/2022 - 31/05/2022'
        },
        {
          site: 'S001 Lor 2 Toa Payoh/Toa Payoh MRT',
          equipmentNo: 'CCTV',
          scheduleType: 'Preventive Maintenance',
          date: '01/05/2022 - 31/05/2022'
        },
      ]

        this.themeService.changeTheme(this.currentTheme);
      
  }




  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  navigateHome() {
    this.menuService.navigateHome();
    return false;
  }
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
  changeTheme(themeName: string) {
    console.log("them,e name",themeName);
    this.themeService.changeTheme(themeName);
  }
}


export class NotificationMenuListItem{
  contractorCompany: string;
  caseId: string;
  time: string;
}

export class CalendarMenuListItem{
  site: string;
  equipmentNo: string;
  scheduleType: string;
  date: string;
}
