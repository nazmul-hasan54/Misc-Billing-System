import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PoliceRoutingModule } from './police-routing.module';
import { OnlinePoliceComponent } from './online-police/online-police.component';
import { NbInputModule, NbCardModule, NbButtonModule, NbActionsModule, NbUserModule, NbCheckboxModule, NbRadioModule, NbDatepickerModule, NbSelectModule, NbIconModule, NbCalendarModule, NbCalendarKitModule, NbMenuModule } from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { HttpClientModule } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
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
import { RouterModule } from '@angular/router';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { ThemeModule } from '../../../@theme/theme.module';
import { SharedModule } from '../../../shared/shared.module';
import { ReportingModule } from '../reporting.module';



@NgModule({
  declarations: [
    OnlinePoliceComponent
  ],
  imports: [
    CommonModule,
    PoliceRoutingModule,
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
  ]
})
export class PoliceModule { }
