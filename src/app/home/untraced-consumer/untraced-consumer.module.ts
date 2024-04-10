import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UntracedConsumerRoutingModule } from './untraced-consumer-routing.module';
import { UntracedConsumerGenerateComponent } from './untraced-consumer-generate/untraced-consumer-generate.component';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../shared/shared.module';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { AuthModule } from '../../Authentication/auth.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ThemeModule } from '../../@theme/theme.module';
import { MiscellaneousModule } from '../QuickAccess/miscellaneous/miscellaneous.module';
import { DataTablesModule } from 'angular-datatables';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ViewUntracedConsumerComponent } from './view-untraced-consumer/view-untraced-consumer.component';
import { UntraceableConsumerComponent } from './untraceable-consumer/untraceable-consumer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ReportingRoutingModule } from '../reports/reporting-routing.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ReportingModule } from '../reports/reporting.module';
import { UntracedConArrearComponent } from './untraced-con-arrear/untraced-con-arrear.component';
import { IllegalConsumerPenaltyArrearComponent } from './illegal-consumer-penalty-arrear/illegal-consumer-penalty-arrear.component';

import { UntracePenaltySupplimentarySummaryComponent } from './untrace-penalty-supplimentary-summary/untrace-penalty-supplimentary-summary.component';
import { UntracedConArrearSumComponent } from './untraced-con-arrear-sum/untraced-con-arrear-sum.component';
import { UntracedCustArrearDetailsComponent } from './untraced-cust-arrear-details/untraced-cust-arrear-details.component';

@NgModule({
  declarations: [
    UntracedConsumerGenerateComponent,
    ViewUntracedConsumerComponent,
    UntraceableConsumerComponent,
    UntracedConArrearComponent,
    IllegalConsumerPenaltyArrearComponent,
    UntracePenaltySupplimentarySummaryComponent,
    UntracedConArrearSumComponent,
    UntracedCustArrearDetailsComponent,
  ],
  imports: [
    CommonModule,
    UntracedConsumerRoutingModule,
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
    DataTablesModule,
    BsDatepickerModule.forRoot(),
    ReportingModule,
    NgxExtendedPdfViewerModule
  ]
})
export class UntracedConsumerModule { }
