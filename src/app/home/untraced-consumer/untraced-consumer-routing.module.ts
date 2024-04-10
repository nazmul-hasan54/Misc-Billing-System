import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UntracedConsumerGenerateComponent } from './untraced-consumer-generate/untraced-consumer-generate.component';
import { ViewUntracedConsumerComponent } from './view-untraced-consumer/view-untraced-consumer.component';
import { UntraceableConsumerComponent } from './untraceable-consumer/untraceable-consumer.component';
import { UntracedConArrearComponent } from './untraced-con-arrear/untraced-con-arrear.component';
import { IllegalConsumerPenaltyArrearComponent } from './illegal-consumer-penalty-arrear/illegal-consumer-penalty-arrear.component';
import { UntracePenaltySupplimentarySummaryComponent } from './untrace-penalty-supplimentary-summary/untrace-penalty-supplimentary-summary.component';
import { UntracedConArrearSumComponent } from './untraced-con-arrear-sum/untraced-con-arrear-sum.component';
import { UntracedCustArrearDetailsComponent } from './untraced-cust-arrear-details/untraced-cust-arrear-details.component';

const routes: Routes = [
  
  {path:'untraced-consumer-generate',component:UntracedConsumerGenerateComponent},
  {path:'untraced-consumer-view',component:ViewUntracedConsumerComponent},
  {path:'misc-untraced-cust-report',component:UntraceableConsumerComponent},
  {path:'misc-untraced-cust-arrear-report',component:UntracedConArrearComponent},
  {path:'illegal-consumer-penalty',component:IllegalConsumerPenaltyArrearComponent},
  {path:'misc-untraced-penalty-supplimentary-summary-report',component:UntracePenaltySupplimentarySummaryComponent},
  {path:'untraced-cust-arrear-summary-report',component:UntracedConArrearSumComponent},
  {path:'untraced-cust-arrear-details-report',component:UntracedCustArrearDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UntracedConsumerRoutingModule { }
