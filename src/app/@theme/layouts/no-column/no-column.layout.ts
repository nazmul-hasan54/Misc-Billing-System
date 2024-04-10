import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'ngx-no-column-layout',
  styleUrls: ['./no-column.layout.scss'],
  templateUrl: './no-column.layout.html'
})
export class NoColumnLayoutComponent implements OnInit {


  constructor(
    // private sidebarService: NbSidebarService,
    // private layoutService: LayoutService,
    // private menuService: NbMenuService,
  ) { }

  ngOnInit(): void { }

  // toggleSidebar(): boolean {
  //   this.sidebarService.toggle(true, 'menu-sidebar');
  //   this.layoutService.changeLayoutSize();

  //   return false;
  // }

  // navigateHome() {
  //   this.menuService.navigateHome();
  //   return false;
  // }
}
