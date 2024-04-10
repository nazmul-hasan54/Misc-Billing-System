import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MisReportRoutingModule } from './mis-report-routing.module';
import { AllCustomerArrearDetailsComponent } from './all-customer-arrear-details/all-customer-arrear-details.component';
import { AllCustomerArrearSummaryComponent } from './all-customer-arrear-summary/all-customer-arrear-summary.component';
import { RegularCustomerArrearDetailsComponent } from './regular-customer-arrear-details/regular-customer-arrear-details.component';

import { MisReportComponent } from './mis-report-component';

import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { ThemeModule } from '../../../@theme/theme.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
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
import { MatTooltipModule } from '@angular/material/tooltip';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportingModule } from '../reporting.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { MisUntraceConsumerComponent } from './mis-untrace-consumer/mis-untrace-consumer.component';
import { ArrearPrepaidCustBasedonOffsetComponent } from './arrear-prepaid-cust-basedon-offset/arrear-prepaid-cust-basedon-offset.component';
import { RegularCustomerArrearSummaryComponent } from './regular-customer-arrear-summary/regular-customer-arrear-summary.component';
import { UntracebleCustReportComponent } from './untraceble-cust-report/untraceble-cust-report.component';
@NgModule({
  declarations: [
    AllCustomerArrearDetailsComponent,
    AllCustomerArrearSummaryComponent,
    RegularCustomerArrearDetailsComponent,
    MisReportComponent,
    MisUntraceConsumerComponent,
    ArrearPrepaidCustBasedonOffsetComponent,
    RegularCustomerArrearSummaryComponent,
    UntracebleCustReportComponent
  ],
  imports: [
    CommonModule,
    MisReportRoutingModule,
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
    NbDatepickerModule.forRoot(),
    NgxExtendedPdfViewerModule,
    BsDatepickerModule.forRoot()
  ],
  exports: [ CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ThemeModule,MisReportComponent
   ],
})
export class MisReportModule { }
