import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { AuthModule } from '../../Authentication/auth.module';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { InstallmentPlanComponent } from './installment-plan/installment-plan.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NonConsumerGenarateComponent } from './non-consumer-genarate/non-consumer-genarate.component';
import { PaymentModule } from './../payment/payment.module';
import { PenaltyBillComponent } from './penalty-bill.component';
import { PenaltyBillRoutingModule } from './penalty-bill-routing.module';
import { PendingBillGenerateComponent } from './pending-bill-generate/pending-bill-generate.component';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { ViewPenaltyBillListComponent } from './view-penalty-bill-list/view-penalty-bill-list.component';
import { ViewPenaltyInstallmentComponent } from './view-penalty-installment/view-penalty-installment.component';
import { PenaltyExistingConGenerateComponent } from './penalty-existing-con-generate/penalty-existing-con-generate.component';
import { PenaltyBillForPrepaidComponent } from './penalty-bill-for-prepaid/penalty-bill-for-prepaid.component';
import { PenaltyBillForPrepaidViewComponent } from './penalty-bill-for-prepaid-view/penalty-bill-for-prepaid-view.component';

@NgModule({
  declarations: [
    PendingBillGenerateComponent,
    PenaltyBillComponent,
    InstallmentPlanComponent,
    ViewPenaltyBillListComponent,
    ViewPenaltyInstallmentComponent,
    NonConsumerGenarateComponent,
    PenaltyExistingConGenerateComponent,
    PenaltyBillForPrepaidComponent,
    PenaltyBillForPrepaidViewComponent,
    
  ],
  imports: [
    CommonModule,
    PenaltyBillRoutingModule,
    NbMenuModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    IconModule,
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
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class PenaltyBillModule { }
