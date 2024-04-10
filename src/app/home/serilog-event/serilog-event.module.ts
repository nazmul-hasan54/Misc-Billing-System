import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SerilogEventRoutingModule } from './serilog-event-routing.module';
import { ViewSerilogEventComponent } from './view-serilog-event/view-serilog-event.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbDialogModule, NbInputModule, NbThemeModule } from '@nebular/theme';
import { DataTablesModule } from 'angular-datatables';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';


@NgModule({
  declarations: [
    ViewSerilogEventComponent
  ],
  imports: [
    CommonModule,
    SerilogEventRoutingModule,
    NbInputModule,
    NbCardModule,
    NbDatepickerModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,
    NbButtonModule,
    NbThemeModule,
    MatDialogModule,
    NbDialogModule.forChild(),
    
  ]
})
export class SerilogEventModule { }
