import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OnlinePoliceComponent } from './online-police/online-police.component';

const routes: Routes = [
  { path: "online-police", component: OnlinePoliceComponent},
    
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliceRoutingModule { }


