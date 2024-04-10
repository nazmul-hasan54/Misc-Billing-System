import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { AuthModule } from '../../Authentication/auth.module';
import { CommonModule } from '@angular/common';
import { ConsumerReconciliationComponent } from './consumer-reconciliation/consumer-reconciliation.component';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { ReconciliationRoutingModule } from './reconciliation-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscReconciliationComponent } from './misc-reconciliation/misc-reconciliation.component';

@NgModule({
  declarations: [ConsumerReconciliationComponent, MiscReconciliationComponent ],
  imports: [
    CommonModule,
    ReconciliationRoutingModule,
    CommonModule,
    NbMenuModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    //IconModule,
    AuthModule,
    LayoutModule,
    ThemeModule,
    MiscellaneousModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
     NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbEvaIconsModule,
    NbIconModule,
    DataTablesModule
  ]
})
export class ReconciliationModule { }
