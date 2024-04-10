import { OfficeStuffEditComponent } from './Components/office-stuff-edit/office-stuff-edit.component';
import { OfficeStuffCreateComponent } from './Components/office-stuff-create/office-stuff-create.component';
import { ExampleComponent } from './example.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OfficeStuffComponent } from './Components/office-stuff.component';

const routes: Routes = [
  {
    path: "",
    component: ExampleComponent,
    children: [
      { path: "office-stuff-create", component: OfficeStuffCreateComponent },
      { path: "office-stuff-edit", component: OfficeStuffEditComponent },
      { path: "office-stuff", component: OfficeStuffComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExampleRoutingModule { }
