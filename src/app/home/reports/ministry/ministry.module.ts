import { BsDatepickerConfig, BsDatepickerModule, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NbActionsModule, NbButtonModule, NbCalendarKitModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { AdjustPaymentComponent } from './adjust-payment/adjust-payment.component';
import { BpdbComponent } from './bpdb/bpdb.component';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { LocationWiseMinistryArrearComponent } from './location-wise-ministry-arrear/location-wise-ministry-arrear.component';
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
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MinistryArrearCustomerComponent } from './ministry-arrear-customer/ministry-arrear-customer.component';
import { MinistryArrearUptoDateInfoComponent } from './ministry-arrear-upto-date-info/ministry-arrear-upto-date-info.component';
import { MinistryComponent } from './ministry.component';
import { MinistryDetailsComponent } from './ministry-details/ministry-details.component';
import { MinistryLedgerComponent } from './ministry-ledger/ministry-ledger.component';
import { MinistryRoutingModule } from './ministry-routing.module';
import { MinistrySummaryReportComponent } from './ministry-summary-report/ministry-summary-report.component';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OldMinistryDetailsComponent } from './old-ministry-details/old-ministry-details.component';
import { OnlineMinistryArrearComponent } from './online-ministry-arrear/online-ministry-arrear.component';
import { OnlineMinistryArrearDetailsByCodeComponent } from './online-ministry-arrear-details-by-code/online-ministry-arrear-details-by-code.component';
import { OnlineMinistryArrearDetailsComponent } from './online-ministry-arrear-details/online-ministry-arrear-details.component';
import { OnlineMinistryDetailsComponent } from './online-ministry-details/online-ministry-details.component';
import { PoliceArrearSummaryComponent } from './police-arrear-summary/police-arrear-summary.component';
import { PouroshovaGenarateComponent } from './pouroshova-genarate/pouroshova-genarate.component';
import { PreModDataComponent } from './pre-mod-data/pre-mod-data.component';
import { RailwayComponent } from './railway/railway.component';
import { ReligiousArrearDescComponent } from './religious-arrear-desc/religious-arrear-desc.component';
import { ReportingModule } from '../reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { TotalLocWiseMinstryArrearComponent } from './total-loc-wise-minstry-arrear/total-loc-wise-minstry-arrear.component';
import { TotalMinistryComponent } from './total-ministry/total-ministry.component';
import { UnionporishodGenarateComponent } from './unionporishod-genarate/unionporishod-genarate.component';
import { ViewMinistryListComponent } from './view-ministry-list/view-ministry-list.component';
import { OnlineMinistryArrearDetailsWithCrvComponent } from './online-ministry-arrear-details-with-crv/online-ministry-arrear-details-with-crv.component';
import { OnlineMinistryArrearWithCrvComponent } from './online-ministry-arrear-with-crv/online-ministry-arrear-with-crv.component';
import { PrivateMinistryWiseCustomerReportComponent } from './private-ministry-wise-customer-report/private-ministry-wise-customer-report.component';

@NgModule({
  declarations: [
    MinistryComponent,
    MinistryArrearCustomerComponent,
    MinistryDetailsComponent,
    MinistrySummaryReportComponent,
    OldMinistryDetailsComponent,
    ViewMinistryListComponent,
    RailwayComponent,
    OnlineMinistryDetailsComponent,
    PoliceArrearSummaryComponent,
    MinistryLedgerComponent,
    BpdbComponent,
    ReligiousArrearDescComponent,
    PouroshovaGenarateComponent,
    UnionporishodGenarateComponent,
    LocationWiseMinistryArrearComponent,
    TotalLocWiseMinstryArrearComponent,
    TotalMinistryComponent,
    PreModDataComponent,
    OnlineMinistryArrearComponent,
    MinistryArrearUptoDateInfoComponent,
    OnlineMinistryArrearDetailsComponent,
    OnlineMinistryArrearDetailsByCodeComponent,
    AdjustPaymentComponent,
    OnlineMinistryArrearDetailsWithCrvComponent,
    OnlineMinistryArrearWithCrvComponent,
    PrivateMinistryWiseCustomerReportComponent
  ],
  imports: [
    MinistryRoutingModule,
    CommonModule,
    ThemeModule,
    NbMenuModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
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
    MatToolbarModule,
    ReportingModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    RouterModule,
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
    NbButtonModule,
    NbCalendarModule,
    NbCalendarKitModule,
    NbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DataTablesModule
  ],
  exports: [ CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ThemeModule,
   ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class MinistryModule { }
