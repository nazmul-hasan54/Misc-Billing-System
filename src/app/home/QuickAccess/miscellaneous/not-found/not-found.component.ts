import { Component } from '@angular/core';
import { NbMenuService } from '@nebular/theme';
import { Router } from '@angular/router';
import { UserManagementService } from '../../../../services/user-management.service';


@Component({
  selector: 'ngx-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent {

  constructor(private router: Router,
    private userManagementService: UserManagementService) {
  }

  goToHome() {
    let path = localStorage.getItem('dashBoardUrl');
    this.router.navigate([path]);
    this.userManagementService.onMenuMapping.emit(false);
  }
}
