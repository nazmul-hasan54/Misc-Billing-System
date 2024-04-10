import { RouterModule, Routes } from '@angular/router';

import { DcRcGenarateComponent } from './dc-rc-genarate/dc-rc-genarate.component';
import { NgModule } from '@angular/core';
import { ViewDcRcBillComponent } from './view-dc-rc-bill/view-dc-rc-bill.component';
import { data } from 'jquery';

const routes: Routes = [
  {path:'dc-rc-bill',component:DcRcGenarateComponent},
  {path:'dc-rc-bill-view',component:ViewDcRcBillComponent,data:{pageId:229}},
  {path:'dc-rc-bill/:billNumber/:customerNumber',component:DcRcGenarateComponent},
  {path:'dc-rc-bill-view/:tran_id/:totalPrice/:storeId',component:ViewDcRcBillComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DcRcBillRoutingModule { }
