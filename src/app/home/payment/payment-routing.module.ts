import { RouterModule, Routes } from '@angular/router';

import { FailedPageComponent } from './failed-page/failed-page.component';
import { NgModule } from '@angular/core';
import { PaymentDetailsComponent } from './payment-details/payment-details.component';
import { PaymentGatewayComponent } from './payment-gateway/payment-gateway.component';
import { SuccessPageComponent } from './success-page/success-page.component';
import { BillDetailsComponent } from './bill-details/bill-details.component';

const routes: Routes = [
  {path:'payment-gateway/:customerNumber/:billNumber', component:PaymentGatewayComponent},
  {path:'success-page', component:SuccessPageComponent},
  {path:'success-page/:tran_id/:totalPrice/:storeId',component:SuccessPageComponent},
  {path:'failed-page', component:FailedPageComponent},
  { path:'payment-details', component: PaymentDetailsComponent },
  {path:"bill-details",component:BillDetailsComponent}
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PaymentRoutingModule { }
