import { RouterModule, Routes } from '@angular/router';

import { ConsumerReconciliationComponent } from './consumer-reconciliation/consumer-reconciliation.component';
import { MiscReconciliationComponent } from './misc-reconciliation/misc-reconciliation.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  { path: 'consumer-reconciliation', component: ConsumerReconciliationComponent  },
  { path: 'misc-reconciliation', component: MiscReconciliationComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReconciliationRoutingModule { }
