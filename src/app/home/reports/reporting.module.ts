import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { PdfViewerComponent } from './pdf-viewer/pdf-viewer.component';
import { PouroshovaAndCorporationComponent } from './pouroshova-and-corporation/pouroshova-and-corporation.component';
import { ReportingRoutingModule } from './reporting-routing.module';

@NgModule({
  declarations: [
    PdfViewerComponent,
    
    
  ],
  imports: [
    CommonModule,
    ReportingRoutingModule,
    NgxExtendedPdfViewerModule
  ],
  exports:[
    PdfViewerComponent
  ]
})
export class ReportingModule { }
