import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { LocationWiseReligiousReportComponent } from './location-wise-religious-report/location-wise-religious-report.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MosqueAndWorshipDetailsComponent } from './mosque-and-worship-details/mosque-and-worship-details.component';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ReligiousComponent } from './religious.component';
import { ReligiousReceiptComponent } from './religious-receipt/religious-receipt.component';
import { ReligiousRoutingModule } from './religious-routing.module';
import { ReligiousSetupGenerateComponent } from './religious-setup/religious-setup-generate.component';
import { ReligiousSummeryComponent } from './religious-summery/religious-summery.component';
import { ReportingModule } from '../reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { ThemeModule } from "../../../@theme/theme.module";
import { MonthWiseReligiousComponent } from './month-wise-religious/month-wise-religious.component';

@NgModule({
    declarations: [
        ReligiousSummeryComponent,
        ReligiousComponent,
        MosqueAndWorshipDetailsComponent,
        ReligiousSetupGenerateComponent,
        LocationWiseReligiousReportComponent,
        ReligiousReceiptComponent,
        MonthWiseReligiousComponent,
    ],
    imports: [
        CommonModule,
        ReligiousRoutingModule,
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
        MatInputModule,
        MatDialogModule,
        SharedModule,
        MatTableModule,
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
         DataTablesModule
    ]
})
export class ReligiousModule { }
