import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { AuthModule } from '../../Authentication/auth.module';
import { AutomatedPaymentStatusComponent } from './automated-payment-status/automated-payment-status.component';
import { BillCycleScheduleComponent } from './bill-cycle-schedule/bill-cycle-schedule.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { TemporaryBillGenarateComponent } from './temporary-bill-genarate/temporary-bill-genarate.component';
import { TemporaryBillMrsgenarateComponent } from './temporary-bill-mrsgenarate/temporary-bill-mrsgenarate.component';
import { TemporaryBillPaymentComponent } from './temporary-bill-payment/temporary-bill-payment.component';
import { TemporaryBillPaymentHistoryComponent } from './temporary-bill-payment-history/temporary-bill-payment-history.component';
import { TemporaryBillRoutingModule } from './temporary-bill-routing.module';
import { TemporaryCustomerCensuslistComponent } from './temporary-customer-censuslist/temporary-customer-censuslist.component';
import { ThemeModule } from '../../@theme/theme.module';
import { BillCycleListComponent } from './bill-cycle-list/bill-cycle-list.component';
import { TemporaryBilViewComponent } from './temporary-bil-view/temporary-bil-view.component';

@NgModule({
  declarations: [
    TemporaryBillGenarateComponent,
    BillCycleScheduleComponent,
    TemporaryBillPaymentHistoryComponent,
    TemporaryBillPaymentComponent,
    AutomatedPaymentStatusComponent,
    TemporaryCustomerCensuslistComponent,
    TemporaryBillMrsgenarateComponent,
    BillCycleListComponent,
    TemporaryBilViewComponent
  ],
  imports: [
    CommonModule,
    TemporaryBillRoutingModule,
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
export class TemporaryBillModule { }
