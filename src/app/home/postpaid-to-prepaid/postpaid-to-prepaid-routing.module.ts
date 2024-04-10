import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BulkTransferCustomerComponent } from './bulk-transfer-customer/bulk-transfer-customer.component';
import { PosttopreGenComponent } from './posttopre-gen/posttopre-gen.component';
import { UpdatePostpaidToPrepaidComponent } from './update-postpaid-to-prepaid/update-postpaid-to-prepaid.component';
import { ViewPostToPreListComponent } from './view-post-to-pre-list/view-post-to-pre-list.component';
import { PrepaidCustomerByTransidComponent } from './prepaid-customer-by-transid/prepaid-customer-by-transid.component';
import { ModPrepaidComponent } from '../mod/mod-prepaid/mod-prepaid.component';
import { ModPrepaidCustomerComponent } from './mod-prepaid-customer/mod-prepaid-customer.component';
import { LocationWiseCustomerComponent } from './location-wise-customer/location-wise-customer.component';

const routes: Routes = [
  {path:"posttopre-generate",component:PosttopreGenComponent},
  {path:"posttopre-view",component:ViewPostToPreListComponent},
  {path:'update-postpaidtoprepaid',component:UpdatePostpaidToPrepaidComponent},
  {path:'bulk-transfer-customer',component:BulkTransferCustomerComponent},
  {path:'prepaid-customer-by-transid',component:PrepaidCustomerByTransidComponent},
  {path:'mod-prepaid-customer',component:ModPrepaidCustomerComponent},
  {path:'location-wise-customer',component:LocationWiseCustomerComponent},
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PostpaidToPrepaidRoutingModule { }
