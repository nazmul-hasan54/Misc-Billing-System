import { RouterModule, Routes } from '@angular/router';

import { InstallmentPlanComponent } from './installment-plan/installment-plan.component';
import { NgModule } from '@angular/core';
import { NonConsumerGenarateComponent } from './non-consumer-genarate/non-consumer-genarate.component';
import { PenaltyExistingConGenerateComponent } from './penalty-existing-con-generate/penalty-existing-con-generate.component';
import { PendingBillGenerateComponent } from './pending-bill-generate/pending-bill-generate.component';
import { ViewPenaltyBillListComponent } from './view-penalty-bill-list/view-penalty-bill-list.component';
import { ViewPenaltyInstallmentComponent } from './view-penalty-installment/view-penalty-installment.component';
import { data } from 'jquery';
import { PenaltyBillForPrepaidComponent } from './penalty-bill-for-prepaid/penalty-bill-for-prepaid.component';
import { PenaltyBillForPrepaidViewComponent } from './penalty-bill-for-prepaid-view/penalty-bill-for-prepaid-view.component';

const routes: Routes = [
  {path:'penalty-bill',component:PendingBillGenerateComponent},
  {path:'penalty-bill/:billNumber/:customerNumber',component:PendingBillGenerateComponent},
  {path:'penaltybill-installment',component:InstallmentPlanComponent},
  {path:'penaltybill-installment/:id',component:InstallmentPlanComponent},
  { path: 'penaltybill-view', component: ViewPenaltyBillListComponent, data: { pageId: 8 } },
  {path:'penaltyinstallment-view/:id',component:ViewPenaltyInstallmentComponent},
  {path:'penalty-nonconsumer', component: NonConsumerGenarateComponent  },
  {path:'penalty-nonconsumer/:billNumber/:customerNumber', component: NonConsumerGenarateComponent  },
  {path:'penalty-existing-con-generate', component: PenaltyExistingConGenerateComponent},
  {path:'penalty-bill-prepaid', component: PenaltyBillForPrepaidComponent},
  {path:'penalty-bill-prepaid-view', component: PenaltyBillForPrepaidViewComponent},
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PenaltyBillRoutingModule { }
