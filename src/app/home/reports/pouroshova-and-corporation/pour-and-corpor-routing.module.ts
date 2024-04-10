import { RouterModule, Routes } from '@angular/router';

import { CitycorpoPouroUnionComponent } from './citycorpo-pouro-union/citycorpo-pouro-union.component';
import { CitycorpoPouroUnionHalnagadComponent } from './citycorpo-pouro-union-halnagad/citycorpo-pouro-union-halnagad.component';
import { NgModule } from '@angular/core';
import { PourAndCorporBnComponent } from './pour-and-corpor-bn/pour-and-corpor-bn.component';
import { PourCorporUniArrearYearlyComponent } from './pour-corpor-uni-arrear-yearly/pour-corpor-uni-arrear-yearly.component';
import { PouroshovaAndCorporationComponent } from './pouroshova-and-corporation.component';
import { ZoneLocationWiseCityPouroUnionComponent } from './zone-location-wise-city-pouro-union/zone-location-wise-city-pouro-union.component';
import { ZonewiseUnionporishodComponent } from './zonewise-unionporishod/zonewise-unionporishod.component';
import { OnlineCitycorpoAndPouroshovaBillComponent } from './online-citycorpo-and-pouroshova-bill/online-citycorpo-and-pouroshova-bill.component';
import { OnlineCityCorporationDetailsComponent } from './online-city-corporation-details/online-city-corporation-details.component';
import { OnlinePouroshovaDetailsComponent } from './online-pouroshova-details/online-pouroshova-details.component';
import { CityCorporationDetailsComponent } from './city-corporation-details/city-corporation-details.component';
import { PouroshovaDetailsComponent } from './pouroshova-details/pouroshova-details.component';
import { OnlineZoneWiseUnionporishodComponent } from './online-zone-wise-unionporishod/online-zone-wise-unionporishod.component';
import { OnlineCitycorpoAndPouroshovaDetailsComponent } from './online-citycorpo-and-pouroshova-details/online-citycorpo-and-pouroshova-details.component';
import { OnlineCityAndPouroWiseSummaryComponent } from './online-city-and-pouro-wise-summary/online-city-and-pouro-wise-summary.component';
import { OnlineCityAndPouroWiseDetailsComponent } from './online-city-and-pouro-wise-details/online-city-and-pouro-wise-details.component';
import { OnlineCrpPaymentComponent } from './online-crp-payment/online-crp-payment.component';
import { OnlineCityPouroDetailsWithCrvComponent } from './online-city-pouro-details-with-crv/online-city-pouro-details-with-crv.component';

const routes: Routes = [
  {
    path: "",
    component: PouroshovaAndCorporationComponent,
    children: [
      { path: "pourshova-citycorpation", component: PourAndCorporBnComponent },
      { path: "citycorpopouro_union", component: CitycorpoPouroUnionComponent },
      { path: "puroshova-citycorporation-yearly", component: PourCorporUniArrearYearlyComponent},
      { path: "citycorpopouro_union_halnagad", component: CitycorpoPouroUnionHalnagadComponent },
      { path: "zone-location-wise-city-pouro-union", component: ZoneLocationWiseCityPouroUnionComponent },
      { path: "zonewise-unionporishod", component: ZonewiseUnionporishodComponent },
      { path: "online-citycorporation-pouroshova-bill",component:OnlineCitycorpoAndPouroshovaBillComponent},
      { path: "online-city-corporation-details",component:OnlineCityCorporationDetailsComponent},
      { path: "online-pouroshova-details",component:OnlinePouroshovaDetailsComponent},
      { path: "city-corporation-details",component:CityCorporationDetailsComponent},
      { path: "pouroshova-details",component:PouroshovaDetailsComponent},
      { path: "online-zone-wise-unionporishod",component:OnlineZoneWiseUnionporishodComponent},
      { path: "online-citycorpation-pourshova-details",component:OnlineCitycorpoAndPouroshovaDetailsComponent},
      { path: "online-city-pouro-wise-summary",component: OnlineCityAndPouroWiseSummaryComponent},
      { path: "online-city-pouro-wise-details",component: OnlineCityAndPouroWiseDetailsComponent},
      { path: "online-crp-payment",component: OnlineCrpPaymentComponent},
      { path: "online-city-pouro-crv-details",component: OnlineCityPouroDetailsWithCrvComponent}

    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PourAndCorporRoutingModule { }
