import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonBengaliBiharyBillArrearDocComponent } from './non-bengali-bihary-bill-arrear-doc/non-bengali-bihary-bill-arrear-doc.component';
import { NonBengaliBiharyBillArrearComponent } from './non-bengali-bihary-bill-arrear.component';
import { OnlineNonBengaliBillArrearComponent } from './online-non-bengali-bill-arrear/online-non-bengali-bill-arrear.component';

const routes: Routes = [
  {
    path: "",
    component: NonBengaliBiharyBillArrearComponent,
    children: [
      { path: 'nonbengali-bihary-arrearbill', component: NonBengaliBiharyBillArrearDocComponent },
      { path: 'online-nonbengali-bihary-arrearbill', component: OnlineNonBengaliBillArrearComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NonBengaliBiharyBillArrearRoutingModule { }
