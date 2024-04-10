import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';

import { BillPrintRoutingModule } from './bill-print-routing.module';
import { CencusBillPrintComponent } from './cencus-bill/cencus-bill-print/cencus-bill-print.component';
import { CommonModule } from '@angular/common';
import { DcBillPrintComponent } from './dc-rc-bill/dc-bill-print/dc-bill-print.component';
import { DcRcBillGenarateComponent } from './dc-rc-bill/dc-rc-bill-genarate/dc-rc-bill-genarate.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { MiscChargeBillGenarateComponent } from './misc-charge-bill/misc-charge-bill-genarate/misc-charge-bill-genarate.component';
import { MiscChargeBillPrintComponent } from './misc-charge-bill/misc-charge-bill-print/misc-charge-bill-print.component';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PenaltyBillDrComponent } from './penalty-bill/penalty-bill-dr/penalty-bill-dr.component';
import { PenaltyBillNonCustComponent } from './penalty-bill/penalty-bill-non-cust/penalty-bill-non-cust.component';
import { PenaltyBillSrComponent } from './penalty-bill/penalty-bill-sr/penalty-bill-sr.component';
import { ReportingModule } from '../reporting.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../../shared/shared.module';
import { SuplimnetaryBillDrComponent } from './suplimentary-bill/suplimnetary-bill-dr/suplimnetary-bill-dr.component';
import { SuplimnetaryBillSrComponent } from './suplimentary-bill/suplimnetary-bill-sr/suplimnetary-bill-sr.component';
import { SupplementaryBillGenarateComponent } from './suplimentary-bill/supplementary-bill-genarate/supplementary-bill-genarate.component';
import { ThemeModule } from '../../../@theme/theme.module';
import { BsDatepickerConfig, BsDatepickerModule, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { PostpaidToPrepaidComponent } from './postpaid-to-prepaid/postpaid-to-prepaid.component';
import { PenaltyBillPrepaidSrComponent } from './penalty-bill/penalty-bill-prepaid-sr/penalty-bill-prepaid-sr.component';

@NgModule({
    declarations: [
        PenaltyBillSrComponent,
        PenaltyBillDrComponent,
        SupplementaryBillGenarateComponent,
        DcRcBillGenarateComponent,
        SuplimnetaryBillSrComponent,
        SuplimnetaryBillDrComponent,
        DcBillPrintComponent,
        PenaltyBillNonCustComponent,
        CencusBillPrintComponent,
        MiscChargeBillGenarateComponent,
        MiscChargeBillPrintComponent,
        PostpaidToPrepaidComponent,
        PenaltyBillPrepaidSrComponent,
    ],
    imports: [
        CommonModule,
        BillPrintRoutingModule,
        CommonModule,
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
export class BillPrintModule { }
