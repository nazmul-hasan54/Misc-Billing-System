import { RouterModule, Routes } from '@angular/router';

import { CencusBillPrintComponent } from './cencus-bill/cencus-bill-print/cencus-bill-print.component';
import { DcBillPrintComponent } from './dc-rc-bill/dc-bill-print/dc-bill-print.component';
import { DcRcBillGenarateComponent } from './dc-rc-bill/dc-rc-bill-genarate/dc-rc-bill-genarate.component';
import { MiscChargeBillPrintComponent } from './misc-charge-bill/misc-charge-bill-print/misc-charge-bill-print.component';
import { NgModule } from '@angular/core';
import { PenaltyBillDrComponent } from './penalty-bill/penalty-bill-dr/penalty-bill-dr.component';
import { PenaltyBillNonCustComponent } from './penalty-bill/penalty-bill-non-cust/penalty-bill-non-cust.component';
import { PenaltyBillSrComponent } from './penalty-bill/penalty-bill-sr/penalty-bill-sr.component';
import { SuplimnetaryBillDrComponent } from './suplimentary-bill/suplimnetary-bill-dr/suplimnetary-bill-dr.component';
import { SuplimnetaryBillSrComponent } from './suplimentary-bill/suplimnetary-bill-sr/suplimnetary-bill-sr.component';
import { PostpaidToPrepaidComponent } from './postpaid-to-prepaid/postpaid-to-prepaid.component';
import { PenaltyBillPrepaidSrComponent } from './penalty-bill/penalty-bill-prepaid-sr/penalty-bill-prepaid-sr.component';

const routes: Routes = [
  { path: 'penalty-billsr/:billNumber/:customerNumber', component: PenaltyBillSrComponent },
  { path: 'penalty-billdr/:billNumber/:customerNumber', component: PenaltyBillDrComponent },
  { path: 'penalty-bill-prepaid-sr/:billNumber/:customerNumber', component: PenaltyBillPrepaidSrComponent },
  // { path: 'penalty-bill-prepaid-dr/:billNumber/:customerNumber', component: PenaltyBillDrComponent },
  { path: 'penalty-billnoncust/:billNumber/:customerNumber', component: PenaltyBillNonCustComponent },
  { path: 'suplimentary-sr/:billNumber/:customerNumber', component: SuplimnetaryBillSrComponent },
  { path: 'suplimentary-dr/:billNumber/:customerNumber', component: SuplimnetaryBillDrComponent },
  { path: 'dcrc-print/:billNumber/:customerNumber', component: DcBillPrintComponent },
  { path: 'cencus-bill-print/:locationCode/:customerNumber/:billNumber', component: CencusBillPrintComponent},
  { path: 'misc-charge-print/:billNumber/:customerNumber', component: MiscChargeBillPrintComponent },
  {path:"postpaid-to-prepaid/:customerNumber/:locationCode", component:PostpaidToPrepaidComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BillPrintRoutingModule { }
