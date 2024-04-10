import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { AuthModule } from '../../Authentication/auth.module';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { DcRcBillRoutingModule } from './dc-rc-bill-routing.module';
import { DcRcGenarateComponent } from './dc-rc-genarate/dc-rc-genarate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ViewDcRcBillComponent } from './view-dc-rc-bill/view-dc-rc-bill.component';

@NgModule({
  declarations: [
    DcRcGenarateComponent,
    ViewDcRcBillComponent
  ],
  imports: [
    CommonModule,
    DcRcBillRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatCheckboxModule,
    IconModule,
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
    NbDatepickerModule,
    NbSelectModule,
    DataTablesModule,
    
  ]
})
export class DcRcBillModule { }
