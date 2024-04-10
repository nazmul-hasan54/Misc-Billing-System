import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { AuthModule } from '../../Authentication/auth.module';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { LayoutModule } from '@angular/cdk/layout';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MinistryCustomerGenerateComponent } from './ministry-customer-generate/ministry-customer-generate.component';
import { MinistryCustomerRoutingModule } from './ministry-customer-routing.module';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { NgModule } from '@angular/core';
import { ThemeModule } from '../../@theme/theme.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { MinistryCustomerViewComponent } from './ministry-customer-view/ministry-customer-view.component';
import { DataTablesModule } from 'angular-datatables';
import { ReportingModule } from '../reports/reporting.module';
import { MinistryCustomerCountComponent } from './ministry-customer-count/ministry-customer-count.component';
@NgModule({
  declarations: [
    MinistryCustomerGenerateComponent,
    MinistryCustomerViewComponent,
    MinistryCustomerCountComponent
  ],
  imports: [
    CommonModule,
    MinistryCustomerRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    MatCheckboxModule,
    IconModule,
    AuthModule,
    LayoutModule,
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
    NbSelectModule,DataTablesModule,
    ReportingModule,
    NgxExtendedPdfViewerModule,
    NbCheckboxModule

  ]
})
export class MinistryCustomerModule { }
