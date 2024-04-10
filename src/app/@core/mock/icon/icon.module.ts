import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ]
})
export class IconModule {
  private path: string = "../../assets/images";
 constructor(
  private domSanitizer: DomSanitizer, 
  public matIconRegistry: MatIconRegistry ) {
  this.matIconRegistry
  .addSvgIcon("no_data", this.setPath(`${this.path}/no_data_icon.svg`))
  .addSvgIcon("excel", this.setPath(`${this.path}/excel_logo.svg`));
 }
 private setPath(url: string): SafeResourceUrl { 
  return this.domSanitizer.bypassSecurityTrustResourceUrl(url); 
 }
 }
