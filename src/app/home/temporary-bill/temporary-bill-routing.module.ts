import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AutomatedPaymentStatusComponent } from './automated-payment-status/automated-payment-status.component';
import { BillCycleListComponent } from './bill-cycle-list/bill-cycle-list.component';
import { BillCycleScheduleComponent } from './bill-cycle-schedule/bill-cycle-schedule.component';
import { TemporaryBilViewComponent } from './temporary-bil-view/temporary-bil-view.component';
import { TemporaryBillGenarateComponent } from './temporary-bill-genarate/temporary-bill-genarate.component';
import { TemporaryBillMrsgenarateComponent } from './temporary-bill-mrsgenarate/temporary-bill-mrsgenarate.component';
import { TemporaryBillPaymentComponent } from './temporary-bill-payment/temporary-bill-payment.component';
import { TemporaryBillPaymentHistoryComponent } from './temporary-bill-payment-history/temporary-bill-payment-history.component';
import { TemporaryCustomerCensuslistComponent } from './temporary-customer-censuslist/temporary-customer-censuslist.component';

const routes: Routes = [
  { path: 'bill-genarate', component: TemporaryBillGenarateComponent },
  { path: 'bill-mrsgenarate', component: TemporaryBillMrsgenarateComponent },
  { path: 'bill-cycle-schedule', component: BillCycleScheduleComponent},
  { path: 'bill-payment', component: TemporaryBillPaymentComponent },
  { path: 'bill-payment-history', component: TemporaryBillPaymentHistoryComponent },
  { path: 'autometed-payment', component: AutomatedPaymentStatusComponent },
  { path: 'customer-censuslist', component: TemporaryCustomerCensuslistComponent },
  { path: 'bill-cycle-list', component: BillCycleListComponent },
  { path: 'temporary-bill-view', component: TemporaryBilViewComponent }
];

@NgModule({ 
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TemporaryBillRoutingModule { }
