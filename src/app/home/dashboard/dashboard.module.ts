import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NbCardModule, NbInputModule, NbLayoutModule } from '@nebular/theme';


@NgModule({
  declarations: [
    AdminDashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconModule,
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
     
  ]
})
export class DashboardModule { }
