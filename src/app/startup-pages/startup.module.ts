import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StartupRoutingModule } from './startup-routing.module';
import { AboutUsComponent } from './basic-layouts/about-us/about-us.component';
import { BasicLayoutscComponent } from './basic-layouts/basic-layoutsc/basic-layoutsc.component';
import { BasicTitleComponent } from './basic-layouts/basic-title/basic-title.component';
import { CustomerBillDetailsComponent } from './basic-layouts/customer-bill-details/customer-bill-details.component';
import { OurServicesComponent } from './basic-layouts/our-services/our-services.component';
import { PaymentFailedComponent } from './basic-layouts/payment-failed/payment-failed.component';
import { PaymentSuccessComponent } from './basic-layouts/payment-success/payment-success.component';
import { BasicTopNavbarComponent } from './basic-layouts/basic-top-navbar/basic-top-navbar.component';
import { FlexLayoutModule, FlexModule } from '@angular/flex-layout';
import { ThemeModule } from '../@theme/theme.module';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NbCardModule, NbIconModule, NbLayoutModule, NbDatepickerModule, NbMenuModule, NbActionsModule, NbButtonModule, NbCheckboxModule, NbInputModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { SharedModule } from '../shared/shared.module';
import { PenaltyBillSrComponent } from './bill-print/penalty-bill-print/penalty-bill-sr/penalty-bill-sr.component';
import { PenaltyBillDrComponent } from './bill-print/penalty-bill-print/penalty-bill-dr/penalty-bill-dr.component';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { IconModule } from '../@core/mock/icon/icon.module';
import { ReportingModule } from '../home/reports/reporting.module';
import { SuplimentaryBillSrComponent } from './bill-print/suplimentary-bill-print/suplimentary-bill-sr/suplimentary-bill-sr.component';
import { SuplimentaryBillDrComponent } from './bill-print/suplimentary-bill-print/suplimentary-bill-dr/suplimentary-bill-dr.component';
import { DcRcBillPrintComponent } from './bill-print/dc-rc-bill/dc-rc-bill-print.component';
import { MiscChargeBillComponent } from './bill-print/misc-charge-bill/misc-charge-bill.component';
import { PenaltyBillNonCustComponent } from './bill-print/penalty-bill-print/penalty-bill-non-cust/penalty-bill-non-cust.component';
import { ConsumerBillDetailsComponent } from './basic-layouts/consumer-bill-details/consumer-bill-details.component';
import { ReplicationStatusGenerateViewComponent } from './replication-status-generate-view/replication-status-generate-view.component';


@NgModule({
  declarations: [BasicLayoutscComponent,
    BasicTopNavbarComponent,
    AboutUsComponent,
    OurServicesComponent,
    BasicTitleComponent,
    CustomerBillDetailsComponent,
    PaymentSuccessComponent,
    PaymentFailedComponent,
    PenaltyBillSrComponent,
    PenaltyBillDrComponent,
    SuplimentaryBillSrComponent,
    SuplimentaryBillDrComponent,
    DcRcBillPrintComponent,
    MiscChargeBillComponent,
    PenaltyBillNonCustComponent,
    ConsumerBillDetailsComponent,
    ReplicationStatusGenerateViewComponent,
    ],
  imports: [
    CommonModule,
    StartupRoutingModule,
    FlexModule,
    ThemeModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SharedModule,
    DataTablesModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbDatepickerModule,
    BsDatepickerModule,
    NbMenuModule,
    FlexLayoutModule,
    FormsModule,
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
    NbSelectModule,
    NbInputModule,
    NbButtonModule,
    NgxExtendedPdfViewerModule
  ],
  exports:[
    BasicLayoutscComponent,
    AboutUsComponent,
    OurServicesComponent,
    BasicTitleComponent
  ],
})
export class StartupModule { }
