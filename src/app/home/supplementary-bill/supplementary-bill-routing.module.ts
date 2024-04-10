import { RouterModule, Routes } from '@angular/router';

import { InstallmentPlanComponent } from '../penalty-bill/installment-plan/installment-plan.component';
import { InstallmentPlanSupComponent } from './installment-plan-sup/installment-plan-sup.component';
import { NgModule } from '@angular/core';
import { SupplementaryBillGenarateComponent } from './supplementary-bill-genarate/supplementary-bill-genarate.component';
import { SupplementaryExistingConsumerInsertComponent } from './supplementary-existing-consumer-insert/supplementary-existing-consumer-insert.component';
import { ViewSupInstallmentComponent } from './view-sup-installment/view-sup-installment.component';
import { ViewSupplementaryBillComponent } from './view-supplementary-bill/view-supplementary-bill.component';

const routes: Routes = [
  {path:'supplementary-bill',component:SupplementaryBillGenarateComponent},
  {path:'supplementary-bill/:billNumber/:customerNumber',component:SupplementaryBillGenarateComponent},
  { path: 'supplementarybill-view', component: ViewSupplementaryBillComponent, data: { pageId: 229 } },
  {path:'installment-view/:id',component:ViewSupInstallmentComponent},
  {path:'suplimentary-installment',component:InstallmentPlanSupComponent},
  {path:'suplimentary-installment/:id',component:InstallmentPlanSupComponent},
  { path: 'suplimentary-existing-consumer', component: SupplementaryExistingConsumerInsertComponent },
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SupplementaryBillRoutingModule { }
