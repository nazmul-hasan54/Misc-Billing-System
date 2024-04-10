import { RouterModule, Routes } from '@angular/router';

import { LocationWiseReligiousReportComponent } from './location-wise-religious-report/location-wise-religious-report.component';
import { MosqueAndWorshipDetailsComponent } from './mosque-and-worship-details/mosque-and-worship-details.component';
import { NgModule } from '@angular/core';
import { Path } from 'leaflet';
import { ReligiousComponent } from './religious.component';
import { ReligiousReceiptComponent } from './religious-receipt/religious-receipt.component';
import { ReligiousSetupGenerateComponent } from './religious-setup/religious-setup-generate.component';
import { ReligiousSummeryComponent } from './religious-summery/religious-summery.component';
import { MonthWiseReligiousComponent } from './month-wise-religious/month-wise-religious.component';

const routes: Routes = [
  {
    path: "",
    component: ReligiousComponent,
    children: [
      {path: "religious-view", component: ReligiousSummeryComponent},
      {path: 'mosque-and-worship', component: MosqueAndWorshipDetailsComponent},
      {path: 'religious-setup-gen', component: ReligiousSetupGenerateComponent},
      {path: 'location-wise-religious', component: LocationWiseReligiousReportComponent},
      {path: 'location-wise-religious', component: LocationWiseReligiousReportComponent },
      {path: 'religious-receipt', component: ReligiousReceiptComponent },
      {path: 'month-wise-religious',component:MonthWiseReligiousComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReligiousRoutingModule { }
