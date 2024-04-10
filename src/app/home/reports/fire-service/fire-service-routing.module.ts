import { RouterModule, Routes } from '@angular/router';

import { NgModule } from '@angular/core';
import { OnlineFireServiceComponent } from './online-fire-service/online-fire-service.component';

const routes: Routes = [
  { path: 'online-fire-service', component: OnlineFireServiceComponent }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FireServiceRoutingModule { }
