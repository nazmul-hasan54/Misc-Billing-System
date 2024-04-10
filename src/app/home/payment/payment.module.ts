import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FailedPageComponent } from './failed-page/failed-page.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { PaymentRoutingModule } from './payment-routing.module';
import { ReportingModule } from '../reports/reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { SuccessPageComponent } from './success-page/success-page.component';
import { ThemeModule } from '../../@theme/theme.module';
import { BillDetailsComponent } from './bill-details/bill-details.component';

@NgModule({
  declarations: [
    SuccessPageComponent,
    FailedPageComponent,
    PaymentGatewayComponent,
    PaymentDetailsComponent,BillDetailsComponent
  ],
  exports:[
    PaymentDetailsComponent
  ],
  imports: [
    CommonModule,
    PaymentRoutingModule,
    NbCardModule,
    NbIconModule,
    ThemeModule,
    NbMenuModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    IconModule,
    ReportingModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    RouterModule,
    NbInputModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    NgxExtendedPdfViewerModule,
    DataTablesModule
          
  ]
})
export class PaymentModule { }
