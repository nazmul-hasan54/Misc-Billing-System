import { NbCardModule, NbDatepickerModule, NbIconModule, NbLayoutModule } from "@nebular/theme";

import { AuthRoutingModule } from "./auth-routing.module";
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DataTablesModule } from "angular-datatables";
import { FlexModule } from "@angular/flex-layout";
import { LoginComponent } from "./components/login/login.component";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatDividerModule } from "@angular/material/divider";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatToolbarModule } from "@angular/material/toolbar";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { SharedModule } from "../shared/shared.module";
import { ThemeModule } from "../@theme/theme.module";

@NgModule({
  declarations: [LoginComponent, ResetPasswordComponent],
  imports: [
    FlexModule,
    AuthRoutingModule,
    ThemeModule,
    MatDividerModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatInputModule,
    ReactiveFormsModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    SharedModule,
    DataTablesModule,
    NbCardModule,
    NbIconModule,
    NbLayoutModule,
    NbDatepickerModule,
    BsDatepickerModule,
  

    
  ]
})
export class AuthModule {}
