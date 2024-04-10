import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllCustomerArrearCenterWisePageMargin, misAllCustomerArrearLoactionWisePageMargin, misAllCustomerArrearSummaryCenterWiseHeaderMargin, misAllCustomerArrearSummaryImageMargin, misAllCustomerArrearSummaryLocationHeaderMargin, misDefaultStyle, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
import { AllCustomerArrearSummary } from '../../all-customer-arrear-summary.service';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class AllCustArrearSummaryService {

  constructor() { }
  defaultColor = "";
  // calling location wise
  generateLocationWisePdf(data: AllCustomerArrearSummary[], billMonth: string, centerName: string) {
    // this.setColorForBill(USAGE_TYPE);
    // this.setColorForBill('HT');
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(
      data,
      billMonth,
      centerName
    );
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  //#region location wise PDF
  private getDocumentDefinition(data: AllCustomerArrearSummary[], billMonth: any, centerName: string) {
    return {
      info: {
        title: 'All Customer Arrear Summary',
        author: 'BPDB',
        subject: 'Customer-Ledger',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      // footer
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `Page ${currentPage.toString()} of ${pageCount}`,
                  style: ['setFooterLeft'],
                  margin: [30, 5, 30, 0],
                },
                {
                  text: dayjs(new Date()).format('DD/MM/YYYY'),
                  style: ['setFooterRight'],
                  margin: [30, 5, 30, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },
      header: this.getLocationWiseHeading(data, billMonth, centerName),
      content: [
        // this.getHeading(data, dbName, billMonth),
        this.getAllCustomerArrearSummaryLocationInfo(data),
      ],
      defaultStyle: misDefaultStyle,
      pageMargins: misAllCustomerArrearLoactionWisePageMargin,
      styles: setAllCustomerArrearStyle,
    };
  }

  private getLocationWiseHeading(data: AllCustomerArrearSummary[], billMonth: any, centerName: string) {
    const totalCount = data.length;

    const phase = {
      margin: misAllCustomerArrearSummaryLocationHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 5,
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: misAllCustomerArrearSummaryImageMargin,
            },
            {},
            { text: '', colSpan: 8, border: [false, false, false, false] },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // // row 2
          [
            {},
            {},
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: '',

              colSpan: 3,
            },
            {},
            {},
          ],
          // // row 3
          [
            {},
            {},
            {
              text: ` ${centerName} Computer Center`,
              style: [setSubHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          // row -4
          [
            {},
            {},
            {
              text: { text: `Location Wise All Customer Arrear Summary` },
              style: [setSubHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          // row 5
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: `Bill Month: ${billMonth}`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: `Total Location:\t${totalCount}`,
              style: [setSubSetHeading],
              margin: [0, 0, 50, 0],
              colSpan: 3,
              bold: false,
            },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }
  private getAllCustomerArrearSummaryLocationInfo(data: AllCustomerArrearSummary[]) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [100, 100, 100, '*', 100, 100, 100],
        body: [
          //row-4
          [
            {
              text: 'Location Code',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'Div/ ESU Name',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'No. Of Consumer',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'Arrear VAT (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear LPS (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
            {
              text: 'Total Bill (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };
    
      let grandNocTotal = 0;
      let grandPrinTotal = 0;
      let grandVatTotal = 0;
      let grandLpsTotal = 0;
      let grandSumTotalBill = 0;

    data.forEach((item) => {
      
      grandNocTotal += item.noc;
      grandPrinTotal += item.arrPrn;
      grandVatTotal += item.arrVat;
      grandLpsTotal += item.arrLps;
      grandSumTotalBill += item.totalBill;

      phases.table.body.push([
        {
          text: item.loc ?? '',
          style: ['setBlack', 'setLeft'],
          border: [true, true, false, true],
        },
        {
          text: item.office ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: item.noc ? Number(item.noc).toLocaleString() : '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.arrPrn.toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.arrVat.toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.arrLps.toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.totalBill ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
      ]);
    });

    
    phases.table.body.push([
      {
        text: 'Grand Total',
        style: ['setBlack', 'boldText', 'setLeft'],
        border: [true, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: grandNocTotal.toLocaleString(),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandPrinTotal ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandVatTotal ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandLpsTotal ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandSumTotalBill ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, true, true],
      },
    ]);
    return phases;
  }

  private setTableBorder() {
    const d = this.defaultColor;
    return {
      hLineWidth: function (i, node) {
        return i === 0 || i === node.table.body.length ? 1 : 1;
      },
      vLineWidth: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 1 : 1;
      },
      hLineColor: function (i, node) {
        return i === 0 || i === node.table.body.length ? d : d;
      },
      vLineColor: function (i, node) {
        return i === 0 || i === node.table.widths.length ? d : d;
      },
      
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }

  // Center wise Pdf

  generateCenterWisePdf(data: AllCustomerArrearSummary[], reportObj: any) {
    // this.setColorForBill(USAGE_TYPE);
    // this.setColorForBill('HT');
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinitionCenterWise(
      data,
      reportObj
    );
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinitionCenterWise(data: AllCustomerArrearSummary[], reportObj: any) {
    return {
      info: {
        title: 'All Customer Arrear Summary',
        author: 'All Customer Arrear Summary',
        subject: 'Arrear Summary',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `Page ${currentPage.toString()} of ${pageCount}`,
                  style: ['setFooterLeft'],
                  margin: [30, 5, 30, 0],
                },
                {
                  text: dayjs(new Date()).format('DD/MM/YYYY'),
                  style: ['setFooterRight'],
                  margin: [30, 5, 30, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },
      header: this.getCenterWiseHeading(data, reportObj),
      content: [this.getAllCustomerArrearSummaryCenterInfo(data)],
      defaultStyle: misDefaultStyle,
      pageMargins: misAllCustomerArrearCenterWisePageMargin,
      styles: setAllCustomerArrearStyle,
    };
  }

  private getCenterWiseHeading(data: AllCustomerArrearSummary[], reportObj: any) {
    return {
      margin: misAllCustomerArrearSummaryCenterWiseHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [50, 50, '*', '*', 60, 40],
        body: [
          [
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              border: [false, false, false, false],
              image: `logo.png`,
              width: 68,
              height: 58,
              color: 'gray',
              rowSpan: 3,
              margin: [0, -10, -170, 0],
            },
            {
              border: [false, false, false, false],
              text: 'Bangladesh Power Development Board',
              colSpan: 2,
              style: [setHeading],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
          ],
          [
            { border: [false, false, false, false], text: '' },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              border: [false, false, false, false],
              text: 'Center Wise All Customer Arrear Summary',
              colSpan: 2,
              style: [setSubHeading],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
          ],

          [
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            { border: [false, false, false, false], text: '' },

            {
              border: [false, false, false, false],
              text: 'BillMonth:',
              style: [setSubHeading],
              fontSize: 10,
              alignment: 'right',
            },
            {
              text: reportObj ?? '',
              border: [false, false, false, false],
              alignment: 'left',
              fontSize: 10,
              bold: true,
              style:[setSubHeading]
            },

            {
              text: 'Total Center: ' + data.length ?? '',
              border: [false, false, false, false],
              style: [setSubSetHeading],
              alignment: 'left',
              bold: false,
              colSpan: 2
            },
            {
              text: '',
              border: [false, false, false, false],
              style: [setSubSetHeading],
              alignment: 'left',
              bold: false,
            },
          ],
        ],
      },
      layout: this.setTableBorder()
    };
  }

  private getAllCustomerArrearSummaryCenterInfo(data: AllCustomerArrearSummary[]) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: ['*', 'auto', 100, '*', 130, 120],
        body: [
          //row-4
          [
            {
              text: 'Center Name',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'No. Of Consumer',
              style: ['setBlack', 'setRight', 'boldText'],
              border: [true, true, true, true],
            },
            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack', 'boldText'],
              border: [true, true, true, true],
            },
            //{ text: "", style: ['setBlack'], border: [true, true, true, true] },
            {
              text: 'Arrear VAT (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear LPS (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
            {
              text: 'Total Bill (Tk)',
              style: ['setBlack', 'boldText'],
              border: [false, true, true, true],
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };

      let grandNocTotal = 0;
      let grandPrinTotal = 0;
      let grandVatTotal = 0;
      let grandLpsTotal = 0;
      let grandSumTotalBill = 0;

    data.forEach((item) => {
      
      //let e = item;
      grandNocTotal += item.noc;
      grandPrinTotal += item.arrPrn;
      grandVatTotal += item.arrVat;
      grandLpsTotal += item.arrLps;
      grandSumTotalBill += item.totalBill;
      phases.table.body.push([
        {
          text: item.center ?? '',
          style: ['setBlack', 'setLeft'],
          border: [true, true, false, true],
        },
        {
          text: item.noc.toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.arrPrn.toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrVat ?? 0.00).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrLps ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],

        },
        {
          text: Number(item.totalBill ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
      ]);
    });

    phases.table.body.push([
      {
        text: 'Grand Total',
        style: ['setBlack', 'boldText', 'setLeft'],
        border: [true, true, false, true],
      },
      {
        text: grandNocTotal.toString() ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandPrinTotal ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandVatTotal ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandLpsTotal ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(grandSumTotalBill ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, true, true],
      },
    ]);

    return phases;
  }
}
