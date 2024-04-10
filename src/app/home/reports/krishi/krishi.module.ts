import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { KrishiRoutingModule } from './krishi-routing.module';
import { AgricultureAndPoultryCustomerListComponent } from './agriculture-and-poultry-customer-list/agriculture-and-poultry-customer-list.component';
import { AgricultureWiseCustomerListComponent } from './agriculture-wise-customer-list/agriculture-wise-customer-list.component';
import { PoultryWiseCustomerListComponent } from './poultry-wise-customer-list/poultry-wise-customer-list.component';
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
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { SharedModule } from '../../../shared/shared.module';
import { KrishiComponent } from './krishi.componenet';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportingModule } from '../reporting.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OnlineMinistryAgriPoultryCustomerComponent } from './online-ministry-agri-poultry-customer-list/online-ministry-agri-poultry-customer.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnlineAgriPoultryLedgerComponent } from './online-agri-poultry-ledger/online-agri-poultry-ledger.component';


@NgModule({
  declarations: [
    AgricultureAndPoultryCustomerListComponent,
    AgricultureWiseCustomerListComponent,
    PoultryWiseCustomerListComponent,
    KrishiComponent,
    OnlineMinistryAgriPoultryCustomerComponent,
    OnlineAgriPoultryLedgerComponent
  ],
  imports: [
    CommonModule,
    KrishiRoutingModule,
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
    NbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    NgxExtendedPdfViewerModule

  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class KrishiModule { }
