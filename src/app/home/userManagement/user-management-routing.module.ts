import { RouterModule, Routes } from '@angular/router';

import { AccessMapingComponent } from './access-maping/access-maping.component';
import { AccessMappingComponent } from './access-mapping/access-mapping.component';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { NewUserCenterLocSettingComponent } from './new-user-center-loc-setting/new-user-center-loc-setting.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from '../../Authentication/components/reset-password/reset-password.component';
import { UserManagemnetComponent } from './user-managemnet.component';
import { UserMenuSettingComponent } from './access-mapping/user-menu-setting/user-menu-setting.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

const routes: Routes = [
  {
    path: "",
    component: UserManagemnetComponent,
    children: [
      { path: "user-setting", component: UserSettingComponent},
      { path: "user-role", component: UserRoleComponent },
      { path: "menu-setting", component: MenuSettingComponent },
      { path: "access-mapping", component: AccessMappingComponent },
      { path:"reset-password",component:ResetPasswordComponent},
      {path: "createUser-ByLocation", component: NewUserCenterLocSettingComponent},
      {path: "user-menu-setting", component: UserMenuSettingComponent},
      { path: "access-maping", component: AccessMapingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserManagementRoutingModule { }
