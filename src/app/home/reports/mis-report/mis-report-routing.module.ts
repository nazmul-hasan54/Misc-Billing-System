import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllCustomerArrearDetailsComponent } from './all-customer-arrear-details/all-customer-arrear-details.component';
import { AllCustomerArrearSummaryComponent } from './all-customer-arrear-summary/all-customer-arrear-summary.component';
import { RegularCustomerArrearDetailsComponent } from './regular-customer-arrear-details/regular-customer-arrear-details.component';
import { MisReportComponent } from './mis-report-component';
import { MisUntraceConsumerComponent } from './mis-untrace-consumer/mis-untrace-consumer.component';
import { ArrearPrepaidCustBasedonOffsetComponent } from './arrear-prepaid-cust-basedon-offset/arrear-prepaid-cust-basedon-offset.component';
import { RegularCustomerArrearSummaryComponent } from './regular-customer-arrear-summary/regular-customer-arrear-summary.component';
import { UntracebleCustReportComponent } from './untraceble-cust-report/untraceble-cust-report.component';

const routes: Routes = [
  {
    path: "",
    component: MisReportComponent,
    children: [
    {path: 'all-customer-arrear-details', component: AllCustomerArrearDetailsComponent},
    {path: 'all-customer-arrear-summary', component: AllCustomerArrearSummaryComponent},
    {path: 'regular-customer-arrear-details', component: RegularCustomerArrearDetailsComponent},
    {path: 'mis-untraceable-consumer',component:MisUntraceConsumerComponent},
    {path: 'arrear-prepaid-cust-based-offset',component:ArrearPrepaidCustBasedonOffsetComponent},
    {path: 'regular-customer-arrear-summary',component:RegularCustomerArrearSummaryComponent},
    {path: 'untraceble-cust-report',component:UntracebleCustReportComponent},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MisReportRoutingModule { }
