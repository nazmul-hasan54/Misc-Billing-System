import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PenaltyBillNonCustService {

  setColor: string = "";
  marginTop = [0, 1, 0, 0];

  constructor() { }

  private setColorForBill(usageType) {
    switch (usageType) {
      case 'HT':
        this.setColor = '#F37895';
        break;
      case 'LT':
        this.setColor = '#458BD1';
        break;
      case 'LI':
        this.setColor = '#64CD99';
        break;
      default:
        this.setColor = "#458BD1";
        break;
    }
  }

  generatePdf(data: any) {
    const USAGE_TYPE = data[0]
    this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

}

