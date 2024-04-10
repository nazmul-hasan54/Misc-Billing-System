import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NonBengaliBiharyBillArrearRoutingModule } from './non-bengali-bihary-bill-arrear-routing.module';
import { NonBengaliBiharyBillArrearComponent } from './non-bengali-bihary-bill-arrear.component';
import { NonBengaliBiharyBillArrearDocComponent } from './non-bengali-bihary-bill-arrear-doc/non-bengali-bihary-bill-arrear-doc.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { SharedModule } from '../../../shared/shared.module';
import { MatTabsModule } from '@angular/material/tabs';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportingModule } from '../reporting.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { OnlineNonBengaliBillArrearComponent } from './online-non-bengali-bill-arrear/online-non-bengali-bill-arrear.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';


@NgModule({
  declarations: [
    NonBengaliBiharyBillArrearComponent,
    NonBengaliBiharyBillArrearDocComponent,
    OnlineNonBengaliBillArrearComponent,
  ],
  imports: [
    CommonModule,
    NonBengaliBiharyBillArrearRoutingModule,
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
  ],
  exports: [
    NonBengaliBiharyBillArrearComponent,
    ThemeModule,
    CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class NonBengaliBiharyBillArrearModule { }
