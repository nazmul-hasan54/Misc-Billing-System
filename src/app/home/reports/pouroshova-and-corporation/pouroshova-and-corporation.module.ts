import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../../../@theme/theme.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NbActionsModule, NbButtonModule, NbCardModule, NbCheckboxModule, NbDatepicker, NbDatepickerModule, NbIconModule, NbInputModule, NbMenuModule, NbRadioModule, NbSelectModule, NbUserModule } from '@nebular/theme';
import { IconModule } from '../../../@core/mock/icon/icon.module';
import { SharedModule } from '../../../shared/shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ReportingModule } from '../reporting.module';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { PourAndCorporRoutingModule } from './pour-and-corpor-routing.module';
import { PouroshovaAndCorporationComponent } from './pouroshova-and-corporation.component';
import { PourAndCorporBnComponent } from './pour-and-corpor-bn/pour-and-corpor-bn.component';
import { PourCorporUniArrearYearlyComponent } from './pour-corpor-uni-arrear-yearly/pour-corpor-uni-arrear-yearly.component';
import { CitycorpoPouroUnionComponent } from './citycorpo-pouro-union/citycorpo-pouro-union.component';
import { CitycorpoPouroUnionHalnagadComponent } from './citycorpo-pouro-union-halnagad/citycorpo-pouro-union-halnagad.component';
import { ZoneLocationWiseCityPouroUnionComponent } from './zone-location-wise-city-pouro-union/zone-location-wise-city-pouro-union.component';
import { ZonewiseUnionporishodComponent } from './zonewise-unionporishod/zonewise-unionporishod.component';
import { OnlineCitycorpoAndPouroshovaBillComponent } from './online-citycorpo-and-pouroshova-bill/online-citycorpo-and-pouroshova-bill.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { OnlineCityCorporationDetailsComponent } from './online-city-corporation-details/online-city-corporation-details.component';
import { OnlinePouroshovaDetailsComponent } from './online-pouroshova-details/online-pouroshova-details.component';
import { CityCorporationDetailsComponent } from './city-corporation-details/city-corporation-details.component';
import { PouroshovaDetailsComponent } from './pouroshova-details/pouroshova-details.component';
import { OnlineZoneWiseUnionporishodComponent } from './online-zone-wise-unionporishod/online-zone-wise-unionporishod.component';
import { OnlineCitycorpoAndPouroshovaDetailsComponent } from './online-citycorpo-and-pouroshova-details/online-citycorpo-and-pouroshova-details.component';
import { OnlineCityAndPouroWiseSummaryComponent } from './online-city-and-pouro-wise-summary/online-city-and-pouro-wise-summary.component';
import { OnlineCityAndPouroWiseDetailsComponent } from './online-city-and-pouro-wise-details/online-city-and-pouro-wise-details.component';
import { OnlineCrpPaymentComponent } from './online-crp-payment/online-crp-payment.component';
import { OnlineCityPouroDetailsWithCrvComponent } from './online-city-pouro-details-with-crv/online-city-pouro-details-with-crv.component';




@NgModule({
  declarations: [
    PouroshovaAndCorporationComponent, 
    PourAndCorporBnComponent, PourCorporUniArrearYearlyComponent, CitycorpoPouroUnionComponent, CitycorpoPouroUnionHalnagadComponent, CitycorpoPouroUnionHalnagadComponent, ZoneLocationWiseCityPouroUnionComponent, ZonewiseUnionporishodComponent, OnlineCitycorpoAndPouroshovaBillComponent, OnlineCityCorporationDetailsComponent, OnlinePouroshovaDetailsComponent, CityCorporationDetailsComponent, PouroshovaDetailsComponent, OnlineZoneWiseUnionporishodComponent, OnlineCitycorpoAndPouroshovaDetailsComponent, OnlineCityAndPouroWiseSummaryComponent, OnlineCityAndPouroWiseDetailsComponent, OnlineCrpPaymentComponent, OnlineCityPouroDetailsWithCrvComponent
  ],
  imports: [
    PourAndCorporRoutingModule,
    ThemeModule,
    CommonModule,
    NbMenuModule,
    MatCardModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    MatDialogModule,
    SharedModule,
    MatTabsModule,
    MatDividerModule,
    MatAutocompleteModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    IconModule,
    MatToolbarModule,
    ReportingModule,
    NgxExtendedPdfViewerModule,
    HttpClientModule,
    RouterModule,
    NbInputModule,
    NbCardModule,
    NbButtonModule,
    NbActionsModule,
    NbUserModule,
    NbCheckboxModule,
    NbRadioModule,
    NbDatepickerModule,
    NbSelectModule,
    NbIconModule,
    NbInputModule,
    NbButtonModule,
    NbDatepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    
  ],
  exports:[
    PouroshovaAndCorporationComponent,
     PourAndCorporBnComponent,
     CommonModule,
    SharedModule,
    HttpClientModule,
    RouterModule,
    ThemeModule,
  ],
  providers: [
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
  ]
})
export class PouroshovaAndCorporationModule { }
