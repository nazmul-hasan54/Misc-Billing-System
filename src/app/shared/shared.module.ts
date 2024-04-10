import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CustomTableComponent } from './components/custom-table/custom-table.component';
import { CustomTablePaginationComponent } from './components/custom-table-pagination/custom-table-pagination.component';
import { NbButtonModule, NbCardModule, NbDatepickerModule, NbIconModule, NbInputModule, NbThemeModule } from '@nebular/theme';
import { GenericHeaderComponent } from './components/generic-header/generic-header.component';
import { DialogComponent } from './components/dialog/dialog.component';
import { DialogService } from './components/dialog/dialog.service';
import { ConfirmDialogComponent } from './components/confirm-dialog/confirm-dialog.component';
import { FlexModule } from '@angular/flex-layout';
import { TableLoaderComponent } from './components/table-loader/table-loader.component';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { IconModule } from '../@core/mock/icon/icon.module';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { ModalComponent } from './modal/modal.component';
import { ExtendDateBoxComponent } from './components/extend-date-box/extend-date-box.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PaymnetForPrepaidComponent } from './components/paymnet-for-prepaid/paymnet-for-prepaid.component';

@NgModule({
  declarations: [
    CustomTableComponent,
    CustomTablePaginationComponent,
    GenericHeaderComponent,
    DialogComponent,
    ConfirmDialogComponent,
    TableLoaderComponent,
    DialogBoxComponent, 
    ModalComponent,
    ExtendDateBoxComponent,
    PaymnetForPrepaidComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    FlexModule,
    MatProgressBarModule,
    IconModule,
    NbEvaIconsModule,
    NbIconModule,
    NbButtonModule ,
    NbDatepickerModule,
    NbInputModule,
    FormsModule,
    NbThemeModule,
    ReactiveFormsModule
  ],
  providers:[
    DialogService
  ],
  entryComponents: [
    DialogComponent
  ],
  exports: [
    CustomTableComponent,
    CustomTablePaginationComponent,
    GenericHeaderComponent,
    TableLoaderComponent,
    ModalComponent
  ]
})
export class SharedModule { }
