import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SetupPagesRoutingModule } from "./setup-pages-routing.module";
import { ThemeModule } from "../../@theme/theme.module";
import { SharedModule } from "../../shared/shared.module";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { FlexLayoutModule } from "@angular/flex-layout";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatDividerModule } from "@angular/material/divider";
import { MatTableModule } from "@angular/material/table";
import { SetupPagesComponent } from "./setup-pages.component";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from "@angular/material/core";
import { BuildingComponent } from "./building/building.component";
import { BuildingEditComponent } from "./building/building-edit/building-edit.component";
import { BuildingCreateComponent } from "./building/building-create/building-create.component";


@NgModule({
  declarations: [
    SetupPagesComponent,
    BuildingComponent,
    BuildingEditComponent,
    BuildingCreateComponent,

  ],
  imports: [
    CommonModule,
    SetupPagesRoutingModule,
    ThemeModule,
    SharedModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    FormsModule,
    FlexLayoutModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatDividerModule,
    MatTableModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ],

})
export class SetupPagesModule { }
