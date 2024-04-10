import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { MatCardModule } from '@angular/material/card';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SharedModule } from '../../../shared/shared.module';
import { MapsComponent } from './maps/maps.component';
import { CaseDetailsComponent } from './maps/case-details/case-details.component';
import { ZoneDialogComponent } from './maps/zone-dialog/zone-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NbMenuModule } from '@nebular/theme';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { ThemeModule } from '../../../@theme/theme.module';


@NgModule({
  declarations: [
    MapsComponent,
    CaseDetailsComponent,
    ZoneDialogComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatCardModule,
    FlexLayoutModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatInputModule,
    MatSidenavModule,
    SharedModule,
    ThemeModule,
    NbMenuModule,
    
    MatPaginatorModule,
    
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    
    MatCheckboxModule,
    MatTabsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    IconModule
    
  ],
})
export class DashboardModule {}

