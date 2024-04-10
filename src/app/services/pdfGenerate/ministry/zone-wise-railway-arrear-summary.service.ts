import { Injectable } from '@angular/core';
import { table } from 'console';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { RailwayArrearSummary } from '../../../model/railway-arrear-summary.model';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ZoneWiseRailwayArrearSummaryService {

  defaultColor = "";
  constructor() { }

  generatePdf(data: any, reportObj: any, utilityObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data, reportObj, utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any, utilityObj: any) {
    return {
      info: {
        title: 'Railway Arrear Summary ',
        author: 'EBCWEB',
        subject: 'Railway',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data, reportObj,utilityObj),
      background: function (currentPage, pageSize) {
        return [
          {
            // svg: `<svg height="1060" width="945">
            //   <line x1="3.5" y1="535" x2="222.4" y2="535" style="stroke:#111;stroke-width:1" />
            // </svg>`
          }
        ]
      },
      content: [
        this.getRailwayArrearSummary(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any){
    const totalCount = data.length;
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-160, 5, 0, 0],
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
          [
            {},
            {},
            {
              text: `Zone Wise Railway Arrear Summary`,
              style: [setSubSetHeading],
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
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${utilityObj.billMonth ?? ''}`,
              style: [setSubSetHeading],
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
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '(Govt., Semi Govt., Autonomous & Corporation)',
              style: [setSubSetHeading],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              style: ['setLeft'],
              margin: [0, 0, 30, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {
              text: `Total Zone :\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -17, 30, 0],
              colSpan: 10,
              bold: false
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }

  private getRailwayArrearSummary(data: any, reportObj: any, utilityObj: any){
    const phase = {
      table: {
        margin: [5, 0, 0, 0],
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, '*', 100, 100, 100, 100],
        body: [
          [
            {
              text: `SI`,
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
              colSpan: 1,
            },
            {
              text: `Zone`,
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
            },
            {
              text: 'Arrear Amount(Upto-Previous Month)',
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
            },
            {
              text: 'Current Month Bill',
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
            },
            {
              text: `Total Collection`,
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
            },
            {
              text: 'Total Arrear(Current Month)',
              border: [true, true, true, true,],
              style: ['setBig', 'setBold2'],
            },
          ]
        ],
      },
      layout: this.setTableStyles()
    };

    let serial = 0;
    let grandTotalPrevArrearAmt = 0;
    let grandTotalCurrMonthBill = 0;
    let grandTotalCollection = 0;
    let grandTotalArrearAmt = 0;
    data.forEach(item => {

      // public decimal PrevArrearAmt { get; set; }
      // public decimal CurrMonthBill { get; set; }
      // public decimal TotalCollection { get; set; }
      // public decimal TotalArrearAmt { get; set; }
      serial++;
      grandTotalPrevArrearAmt += item.prevArrearAmt;
      grandTotalCurrMonthBill += item.currMonthBill;
      grandTotalCollection += item.totalCollection;
      grandTotalArrearAmt += item.totalArrearAmt;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            border: [true, true, true, true],
            style: ['setBig', 'setRight'],
            colSpan: 1,
          },
          {
            text: `${item.zoneName}`,
            border: [true, true, true, true],
            style: ['setBig', 'setLeft'],
          },
          {
            text: `${item.prevArrearAmt ? Number(item.prevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setRight'],
          },
          {
            text: `${item.currMonthBill ? Number(item.currMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setRight'],
          },
          {
            text: `${item.totalCollection ? Number(item.totalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setRight'],
          },
          {
            text: `${item.totalArrearAmt ? Number(item.totalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setRight'],
          },
        ]
      );
    });

    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2'],
          colSpan: 2,
        },
        {
          text: ``,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2'],
        },
        {
          text: `${grandTotalPrevArrearAmt ? Number(grandTotalPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2', 'setRight'],
        },
        {
          text: `${grandTotalCurrMonthBill ? Number(grandTotalCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2', 'setRight'],
        },
        {
          text: `${grandTotalCollection ? Number(grandTotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2', 'setRight'],
        },
        {
          text: `${grandTotalArrearAmt ? Number(grandTotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true,],
          style: ['setBig', 'setBold2', 'setRight'],
        },
      ]
    );
    return phase;
  }
}
