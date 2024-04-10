import { RouterModule, Routes } from '@angular/router';

import { MinistryCustomerGenerateComponent } from './ministry-customer-generate/ministry-customer-generate.component';
import { NgModule } from '@angular/core';
import { MinistryCustomerViewComponent } from './ministry-customer-view/ministry-customer-view.component';
import { MinistryCustomerCountComponent } from './ministry-customer-count/ministry-customer-count.component';

const routes: Routes = [
  {path:'ministry-customer-generate', component: MinistryCustomerGenerateComponent},
  {path:'ministry-customer-view',component:MinistryCustomerViewComponent},
  {path:"ministry-customer/:customerNumber",component:MinistryCustomerGenerateComponent},
  {path:'ministry-customer-generate/:customerNumber/:locationCode',component:MinistryCustomerGenerateComponent},
  {path:'ministry-customer-view/:customerNumber/:locationCode',component:MinistryCustomerViewComponent},
  {path:'ministry-customer-count',component:MinistryCustomerCountComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistryCustomerRoutingModule { }
