import { Injectable } from '@angular/core';
import { ExcelConverter } from 'pdfmake-to-excel';
@Injectable({
  providedIn: 'root'
})
export class ExcelServiceService {

  constructor() { }
  public downloadExcelFile(doc: any, excelName: string) {
    const exporter = new ExcelConverter(
      excelName,
      doc,
      {
        protection: '',
        defaultOptions: { defaultColWidth: 30 }
      }
    );
    exporter.downloadExcel();
    return exporter;
  }
}
