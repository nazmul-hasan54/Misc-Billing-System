import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApaRoutingModule } from './apa-routing.module';
import { ApaGenerateComponent } from './apa-generate/apa-generate.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../../shared/shared.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { IconModule } from '../../@core/mock/icon/icon.module';
import { AuthModule } from '../../Authentication/auth.module';
import { LayoutModule } from '@angular/cdk/layout';
import { ThemeModule } from '../../@theme/theme.module';
import { NbButtonModule, NbCalendarKitModule, NbCalendarModule, NbCardModule, NbDatepickerModule, NbFormFieldModule, NbIconModule, NbInputModule, NbLayoutModule, NbMenuModule, NbSelectModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { DataTablesModule } from 'angular-datatables';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { ApaStrategicGenarateComponent } from './apa-strategic-genarate/apa-strategic-genarate.component';
import { ApaProgramGenarateComponent } from './apa-program-genarate/apa-program-genarate.component';
import { ApaPerformanceGenarateComponent } from './apa-performance-genarate/apa-performance-genarate.component';
import { ApaUnitIndexGenerateComponent } from './apa-unit-index-generate/apa-unit-index-generate.component';
import { ApaTargetGenarateComponent } from './apa-target-genarate/apa-target-genarate.component';


@NgModule({
  declarations: [
    ApaGenerateComponent,
    ApaStrategicGenarateComponent,
    ApaProgramGenarateComponent,
    ApaPerformanceGenarateComponent,
    ApaUnitIndexGenerateComponent,
    ApaTargetGenarateComponent
  ],
  imports: [
    CommonModule,
    ApaRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    FlexLayoutModule,
    SharedModule,
    MatCheckboxModule,
    IconModule,
    AuthModule,
    LayoutModule,
    ThemeModule,
    NbCardModule,
    NbInputModule,
    NbLayoutModule,
    NbFormFieldModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule,
    NbMenuModule,
    NbDatepickerModule,
    NbSelectModule,
    DataTablesModule,
    NbCalendarModule,
    NbCalendarKitModule,
    NbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
  ]
})
export class ApaModule { }
