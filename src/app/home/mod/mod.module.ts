import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { CommonModule } from '@angular/common';
import { DataTablesModule } from 'angular-datatables';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { MiscellaneousCalculateComponent } from './mod-bill/miscellaneous-calculate/miscellaneous-calculate.component';
import { ModGenerateComponent } from './mod-generate/mod-generate.component';
import { ModPrepaidComponent } from './mod-prepaid/mod-prepaid.component';
import { ModRoutingModule } from './mod-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ReportingModule } from '../reports/reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { ThemeModule } from '../../@theme/theme.module';
import { UniversalPrepaidModComponent } from './universal-prepaid-mod/universal-prepaid-mod.component';

@NgModule({
  declarations: [
    ModGenerateComponent,
    MiscellaneousCalculateComponent,
    ModPrepaidComponent,
    UniversalPrepaidModComponent,
  ],
  imports: [
    CommonModule,
    ModRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    IconModule,
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbMenuModule,
    NbDatepickerModule,
    NbSelectModule,
    DataTablesModule,
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
    BsDatepickerModule.forRoot(),
  ]
})
export class ModModule { }
