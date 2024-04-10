import { RouterModule, Routes } from '@angular/router';

import { ApaGenerateComponent } from './apa-generate/apa-generate.component';
import { ApaPerformanceGenarateComponent } from './apa-performance-genarate/apa-performance-genarate.component';
import { ApaProgramGenarateComponent } from './apa-program-genarate/apa-program-genarate.component';
import { ApaStrategicGenarateComponent } from './apa-strategic-genarate/apa-strategic-genarate.component';
import { ApaTargetGenarateComponent } from './apa-target-genarate/apa-target-genarate.component';
import { ApaUnitIndexGenerateComponent } from './apa-unit-index-generate/apa-unit-index-generate.component';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {path:'apa-generate',component:ApaGenerateComponent},
  { path: 'strategic-objective-genarate', component: ApaStrategicGenarateComponent },
  { path: 'program-genarate', component: ApaProgramGenarateComponent },
  { path: 'performance-genarate', component: ApaPerformanceGenarateComponent },
  { path: 'index-unit-genarate', component: ApaUnitIndexGenerateComponent },
  { path: 'target-genarate', component: ApaTargetGenarateComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApaRoutingModule { }
