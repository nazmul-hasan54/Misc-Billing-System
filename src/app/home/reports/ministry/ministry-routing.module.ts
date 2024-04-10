import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdjustPaymentComponent } from './adjust-payment/adjust-payment.component';
import { BpdbComponent } from './bpdb/bpdb.component';
import { LocationWiseMinistryArrearComponent } from './location-wise-ministry-arrear/location-wise-ministry-arrear.component';
import { MinistryArrearCustomerComponent } from './ministry-arrear-customer/ministry-arrear-customer.component';
import { MinistryArrearUptoDateInfoComponent } from './ministry-arrear-upto-date-info/ministry-arrear-upto-date-info.component';
import { MinistryComponent } from './ministry.component';
import { MinistryDetailsComponent } from './ministry-details/ministry-details.component';
import { MinistryLedgerComponent } from './ministry-ledger/ministry-ledger.component';
import { MinistrySummaryReportComponent } from './ministry-summary-report/ministry-summary-report.component';
import { OldMinistryDetailsComponent } from './old-ministry-details/old-ministry-details.component';
import { OnlineMinistryArrearComponent } from './online-ministry-arrear/online-ministry-arrear.component';
import { OnlineMinistryArrearDetailsByCodeComponent } from './online-ministry-arrear-details-by-code/online-ministry-arrear-details-by-code.component';
import { OnlineMinistryArrearDetailsComponent } from './online-ministry-arrear-details/online-ministry-arrear-details.component';
import { OnlineMinistryDetailsComponent } from './online-ministry-details/online-ministry-details.component';
import { PoliceArrearSummaryComponent } from './police-arrear-summary/police-arrear-summary.component';
import { PouroshovaGenarateComponent } from './pouroshova-genarate/pouroshova-genarate.component';
import { PreModDataComponent } from './pre-mod-data/pre-mod-data.component';
import { RailwayComponent } from './railway/railway.component';
import { ReligiousArrearDescComponent } from './religious-arrear-desc/religious-arrear-desc.component';
import { TotalLocWiseMinstryArrearComponent } from './total-loc-wise-minstry-arrear/total-loc-wise-minstry-arrear.component';
import { TotalMinistryComponent } from './total-ministry/total-ministry.component';
import { UnionporishodGenarateComponent } from './unionporishod-genarate/unionporishod-genarate.component';
import { ViewMinistryListComponent } from './view-ministry-list/view-ministry-list.component';
import { OnlineMinistryArrearDetailsWithCrvComponent } from './online-ministry-arrear-details-with-crv/online-ministry-arrear-details-with-crv.component';
import { OnlineMinistryArrearWithCrvComponent } from './online-ministry-arrear-with-crv/online-ministry-arrear-with-crv.component';
import { PrivateMinistryWiseCustomerReportComponent } from './private-ministry-wise-customer-report/private-ministry-wise-customer-report.component';

const routes: Routes = [
  {
    path: "",
    component: MinistryComponent,
    children: [
      { path: "ministry-arrear", component: MinistryArrearCustomerComponent },
      { path: "ministry-details", component: MinistryDetailsComponent },
      { path: "ministry-summary-report", component: MinistrySummaryReportComponent },
      { path: 'old-ministry', component: OldMinistryDetailsComponent },
      { path: 'update-ministry', component: ViewMinistryListComponent },
      { path: "railway",component:RailwayComponent},
      { path: "online-ministry-details",component:OnlineMinistryDetailsComponent},
      { path: 'zone-wise-police-arrear', component: PoliceArrearSummaryComponent},
      { path: 'ministry-ledger', component: MinistryLedgerComponent },
      { path: 'ministry-report', component: BpdbComponent },
      { path: 'religious-arrear', component: ReligiousArrearDescComponent },
      { path: 'pouroshova-genarate', component: PouroshovaGenarateComponent },
      { path: 'unionporishod-genarate', component: UnionporishodGenarateComponent },
      { path: 'location-wise-ministry-arrear', component: LocationWiseMinistryArrearComponent},
      { path: 'total-loc-wise-minstry-arrear', component: TotalLocWiseMinstryArrearComponent},
      { path: 'total-minstry', component: TotalMinistryComponent },
      { path: 'pre-mod-data', component: PreModDataComponent},
      { path: 'online-ministry-arrear', component:OnlineMinistryArrearComponent},
      { path: 'ministry-arrear-upto-date', component: MinistryArrearUptoDateInfoComponent},
      { path: 'online-ministry-arrear-details', component: OnlineMinistryArrearDetailsComponent},
      { path: 'online-ministry-arrear-details-by-code', component: OnlineMinistryArrearDetailsByCodeComponent},
      { path: 'online-ministry-arrear-with-crv',component: OnlineMinistryArrearDetailsWithCrvComponent},
      { path: 'online-ministry-arrear-summary-with-crv', component:OnlineMinistryArrearWithCrvComponent},
      { path: 'private-ministry-wise-customer-reports', component:PrivateMinistryWiseCustomerReportComponent},
   
      { path: 'advance-payment', component: AdjustPaymentComponent }
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MinistryRoutingModule { }
