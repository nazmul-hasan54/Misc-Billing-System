import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PostpaidToPrepaidRoutingModule } from './postpaid-to-prepaid-routing.module';
import { PosttopreGenComponent } from './posttopre-gen/posttopre-gen.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { ViewPostToPreListComponent } from './view-post-to-pre-list/view-post-to-pre-list.component';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { ReportingModule } from '../reports/reporting.module';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { UpdatePostpaidToPrepaidComponent } from './update-postpaid-to-prepaid/update-postpaid-to-prepaid.component';
import { BulkTransferCustomerComponent } from './bulk-transfer-customer/bulk-transfer-customer.component';
import { PrepaidCustomerByTransidComponent } from './prepaid-customer-by-transid/prepaid-customer-by-transid.component';
import { ModPrepaidCustomerComponent } from './mod-prepaid-customer/mod-prepaid-customer.component';
import { LocationWiseCustomerComponent } from './location-wise-customer/location-wise-customer.component';


@NgModule({
  declarations: [
    PosttopreGenComponent,
    ViewPostToPreListComponent,
    UpdatePostpaidToPrepaidComponent,
    BulkTransferCustomerComponent,
    PrepaidCustomerByTransidComponent,
    ModPrepaidCustomerComponent,
    LocationWiseCustomerComponent,
  ],
  imports: [
    CommonModule,
    PostpaidToPrepaidRoutingModule,
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
    DataTablesModule,NgxExtendedPdfViewerModule,ReportingModule,
    BsDatepickerModule.forRoot(),
    NbCheckboxModule
  ]
})
export class PostpaidToPrepaidModule { }
