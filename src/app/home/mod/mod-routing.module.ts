import { RouterModule, Routes } from '@angular/router';

import { MiscellaneousCalculateComponent } from './mod-bill/miscellaneous-calculate/miscellaneous-calculate.component';
import { ModGenerateComponent } from './mod-generate/mod-generate.component';
import { ModPrepaidComponent } from './mod-prepaid/mod-prepaid.component';
import { NgModule } from '@angular/core';
import { UniversalPrepaidModComponent } from './universal-prepaid-mod/universal-prepaid-mod.component';

const routes: Routes = [
  {path:"mod-generate",component:ModGenerateComponent},
  { path: 'misc-calculate', component: MiscellaneousCalculateComponent},
  { path: 'mod-prepaid', component: ModPrepaidComponent },
  { path: 'universal-prepaid-mod', component: UniversalPrepaidModComponent },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModRoutingModule { }
// universal 