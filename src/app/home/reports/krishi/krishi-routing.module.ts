import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgricultureAndPoultryCustomerListComponent } from './agriculture-and-poultry-customer-list/agriculture-and-poultry-customer-list.component';
import { AgricultureWiseCustomerListComponent } from './agriculture-wise-customer-list/agriculture-wise-customer-list.component';
import { KrishiComponent } from './krishi.componenet';
import { OnlineMinistryAgriPoultryCustomerComponent } from './online-ministry-agri-poultry-customer-list/online-ministry-agri-poultry-customer.component';
import { PoultryWiseCustomerListComponent } from './poultry-wise-customer-list/poultry-wise-customer-list.component';
import { OnlineAgriPoultryLedgerComponent } from './online-agri-poultry-ledger/online-agri-poultry-ledger.component';

const routes: Routes = [
  {
    path: '',
    component: KrishiComponent,
    children: [
      { path: 'agriculture-poultry', component: AgricultureAndPoultryCustomerListComponent},
      { path: 'agricultureWise', component: AgricultureWiseCustomerListComponent },
      { path: 'poultryWise', component: PoultryWiseCustomerListComponent },
      { path: 'online-agriculture-poultry', component: OnlineMinistryAgriPoultryCustomerComponent},
      { path: 'Online-agriculture-poultry-ledger', component: OnlineAgriPoultryLedgerComponent}
    ]
 }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class KrishiRoutingModule { }
