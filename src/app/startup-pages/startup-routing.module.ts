import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasicLayoutscComponent } from './basic-layouts/basic-layoutsc/basic-layoutsc.component';
import { ConsumerBillDetailsComponent } from './basic-layouts/consumer-bill-details/consumer-bill-details.component';
import { CustomerBillDetailsComponent } from './basic-layouts/customer-bill-details/customer-bill-details.component';
import { PaymentFailedComponent } from './basic-layouts/payment-failed/payment-failed.component';
import { PaymentSuccessComponent } from './basic-layouts/payment-success/payment-success.component';
import { ReplicationStatusGenerateViewComponent } from './replication-status-generate-view/replication-status-generate-view.component';
import { DcRcBillPrintComponent } from './bill-print/dc-rc-bill/dc-rc-bill-print.component';
import { PenaltyBillDrComponent } from './bill-print/penalty-bill-print/penalty-bill-dr/penalty-bill-dr.component';
import { PenaltyBillNonCustComponent } from './bill-print/penalty-bill-print/penalty-bill-non-cust/penalty-bill-non-cust.component';
import { PenaltyBillSrComponent } from './bill-print/penalty-bill-print/penalty-bill-sr/penalty-bill-sr.component';
import { SuplimentaryBillDrComponent } from './bill-print/suplimentary-bill-print/suplimentary-bill-dr/suplimentary-bill-dr.component';
import { SuplimentaryBillSrComponent } from './bill-print/suplimentary-bill-print/suplimentary-bill-sr/suplimentary-bill-sr.component';

const routes: Routes = [
  {
    path: '',
    component: BasicLayoutscComponent,
    // children:[
    //   { path:"reset-password",component:ResetPasswordComponent}
    // ]
  },
  {path:'customer-bill',component:CustomerBillDetailsComponent},
  {path:'consumer-bills',component:ConsumerBillDetailsComponent},
  {path:'replication-status',component:ReplicationStatusGenerateViewComponent},
  {path:'payment-success',component:PaymentSuccessComponent},
  {path:'payment-failed',component:PaymentFailedComponent},
  {path:'penalty-bill-sr/:billNumber/:customerNumber',component:PenaltyBillSrComponent},
  {path:'penalty-bill-dr/:billNumber/:customerNumber',component:PenaltyBillDrComponent},
  { path: 'penalty-bill-noncust/:billNumber/:customerNumber', component: PenaltyBillNonCustComponent},
  {path:'suplimentary-bill-sr/:billNumber/:customerNumber',component:SuplimentaryBillSrComponent},
  {path:'suplimentary-bill-dr/:billNumber/:customerNumber',component:SuplimentaryBillDrComponent},
  {path:'dc-rc-bill-print/:billNumber/:customerNumber',component:DcRcBillPrintComponent},
  {path:'misc-charge-bill/:billNumber/:customerNumber',component:DcRcBillPrintComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StartupRoutingModule { }
