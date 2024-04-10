import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { BuildingComponent } from "./building/building.component";


import { SetupPagesComponent } from "./setup-pages.component";

const routes: Routes = [
  {
    path: "",
    component: SetupPagesComponent,
    children: [
      { path: "building", component: BuildingComponent },
      { path: "", component: BuildingComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetupPagesRoutingModule { }
