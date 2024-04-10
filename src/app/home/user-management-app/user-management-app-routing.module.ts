import { RouterModule, Routes } from '@angular/router';

import { AppMenuComponent } from './app-menu/app-menu.component';
import { NewAppUserComponent } from './new-app-user/new-app-user.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: "new-app-user", component: NewAppUserComponent },
  { path: "app-menu", component: AppMenuComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementAppRoutingModule { }
