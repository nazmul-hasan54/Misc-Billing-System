import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';

import { AuthModule } from '../../Authentication/auth.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { SupplementaryBillGenarateComponent } from './supplementary-bill-genarate/supplementary-bill-genarate.component';
import { SupplementaryBillRoutingModule } from './supplementary-bill-routing.module';
import { ThemeModule } from './../../@theme/theme.module';
import { ViewSupplementaryBillComponent } from './view-supplementary-bill/view-supplementary-bill.component';
import { InstallmentPlanSupComponent } from './installment-plan-sup/installment-plan-sup.component';
import { ViewSupInstallmentComponent } from './view-sup-installment/view-sup-installment.component';
import { DataTablesModule } from 'angular-datatables';
import { SupplementaryExistingConsumerInsertComponent } from './supplementary-existing-consumer-insert/supplementary-existing-consumer-insert.component';

@NgModule({
  declarations: [
    SupplementaryBillGenarateComponent,
    ViewSupplementaryBillComponent,
    InstallmentPlanSupComponent,
    ViewSupInstallmentComponent,
    SupplementaryExistingConsumerInsertComponent,
    
  ],
  imports: [
    CommonModule,
    SupplementaryBillRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
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
    DataTablesModule
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-GB' }],
})
export class SupplementaryBillModule { }
