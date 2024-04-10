import { RouterModule, Routes } from '@angular/router';

import { MiscChargeGenarateComponent } from './misc-charge-genarate/misc-charge-genarate.component';
import { NgModule } from '@angular/core';
import { ViewMischargeBillComponent } from './view-misccharge-bill/view-misccharge-bill.component';

const routes: Routes = [
  { path: 'misc-genarate', component: MiscChargeGenarateComponent },
  { path: 'misc-charge-view', component: ViewMischargeBillComponent },
  { path: 'misc-genarate/:billNumber/:customerNumber', component: MiscChargeGenarateComponent },
  { path: 'misc-charge-view/:tran_id/:totalPrice/:storeId', component: ViewMischargeBillComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MiscchargeBillRoutingModule { }
