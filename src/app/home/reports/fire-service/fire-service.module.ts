import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { NbActionsModule, NbButtonModule, NbCalendarKitModule, NbCalendarModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbToastrModule, NbToastrService, NbUserModule } from '@nebular/theme';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FireServiceRoutingModule } from './fire-service-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../../@core/mock/icon/icon.module';
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
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { OnlineFireServiceComponent } from './online-fire-service/online-fire-service.component';
import { ReportingModule } from '../reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeModule } from '../../../@theme/theme.module';

@NgModule({
  declarations: [OnlineFireServiceComponent],
  imports: [
    CommonModule,
    FireServiceRoutingModule,
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
    NbToastrModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbCalendarModule,
    NbCalendarKitModule,
    NbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    DataTablesModule,
  ],
  exports: [CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ThemeModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class FireServiceModule { }
