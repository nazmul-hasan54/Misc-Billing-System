import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewSerilogEventComponent } from './view-serilog-event/view-serilog-event.component';

const routes: Routes = [
  {path:'view-serilog-event',component:ViewSerilogEventComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SerilogEventRoutingModule { }
