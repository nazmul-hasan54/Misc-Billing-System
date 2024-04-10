import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDialogModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { AccessMapingComponent } from './access-maping/access-maping.component';
import { AccessMappingComponent } from './access-mapping/access-mapping.component';
import { AuthModule } from './../../Authentication/auth.module';
import { CommonModule } from '@angular/common';
import { CreateNewUserCenterLocSettingComponent } from './new-user-center-loc-setting/create-new-user-center-loc-setting/create-new-user-center-loc-setting.component';
import { DataTablesModule } from 'angular-datatables';
import { EditNewUserCenterLocSettingComponent } from './new-user-center-loc-setting/edit-new-user-center-loc-setting/edit-new-user-center-loc-setting.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MenuSettingComponent } from './menu-setting/menu-setting.component';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NbThemeModule } from '@nebular/theme';
import { NewUserCenterLocSettingComponent } from './new-user-center-loc-setting/new-user-center-loc-setting.component';
import { NgModule } from '@angular/core';
import { NumbertoYesNo } from '../../@theme/pipes/numberto-yes-no.pipe';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from './../../@theme/theme.module';
import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagemnetComponent } from './user-managemnet.component';
import { UserMenuSettingComponent } from './access-mapping/user-menu-setting/user-menu-setting.component';
import { UserRoleComponent } from './user-role/user-role.component';
import { UserRoleCreateComponent } from './user-role/user-role-create/user-role-create.component';
import { UserRoleEditComponent } from './user-role/user-role-edit/user-role-edit.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserSettingCreateComponent } from './user-setting/uesr-setting-create/uesr-setting-create.component';
import { UserSettingEditComponent } from './user-setting/uesr-setting-edit/uesr-setting-edit.component';

@NgModule({
  declarations: [
    AccessMappingComponent,
    MenuSettingComponent,
    UserRoleCreateComponent,
    UserRoleEditComponent,
    UserManagemnetComponent,
    UserRoleComponent,
    UserSettingComponent,
    UserSettingCreateComponent,
    UserSettingEditComponent,
    NewUserCenterLocSettingComponent,
    CreateNewUserCenterLocSettingComponent,
    EditNewUserCenterLocSettingComponent,
    UserMenuSettingComponent,
    AccessMapingComponent
   
  ],
  imports: [
    CommonModule,
    UserManagementRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    IconModule,
    MatPaginatorModule,
    AuthModule,
    LayoutModule,
    ThemeModule,
    MiscellaneousModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbMenuModule,
    NbSelectModule,
    DataTablesModule,
    NbThemeModule,
    NbCheckboxModule,
    NbDialogModule.forChild(),
  ],
  providers: [NumbertoYesNo,{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
  
})

export class UserManagementModule { }
