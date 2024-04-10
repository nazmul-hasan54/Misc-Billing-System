import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { environment } from '../../../../environments/environment';

import { misMinistrySummaryPageMargin, misMinistrySummaryImageMargin,misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistrySummaryPdfService {
  constructor() { }
  defaultColor = "";

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
        title: 'All Center Ministry Summary',
        author: 'BPDB',
        subject: 'All Center Ministry Summary',
        keywords: 'keywords for document',
        //creationDate: Date.now(),
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
      header: this.getHeading(data, reportObj, utilityObj),
      content: this.getMinistry(data, reportObj, utilityObj),
      pageMargins: misMinistrySummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj:any) {
    const { runBillCycle, locDesc, dbName } = data[0];
    const totalCount = data.length;
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
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
              margin: misMinistrySummaryImageMargin,
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
          // row 2
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
          // row 3
          [
            {},
            {},
            {
              text: `${dbName} Computer Center`,
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

          // row 4
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
          // row- 5
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
          // row 6
          [
            {
              text: `Total Ministry:\t${totalCount}`,
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
      paddingTop: function (i, node) { return 8; },
      paddingBottom: function (i, node) { return 8; },
    }
  }
  private getMinistry(data: any, reportObj: any, utilityObj: any) {
    const phase = {
      table: {
        dontBreakRows: true,
        widths: [25, 250, 40, '*', 'auto', '*', 120],
        headerRows: 2,
        body: [
          // row -1
          [
            {
              text: "SL No",
              style: ['setBold', 'setBig'], rowSpan: 2

            },
            {
              text: "Ministry",
              style: ['setBold', 'setBig'], rowSpan: 2
            },
            {
              text: "NOC",
              style: ['setBold', 'setBig'], rowSpan: 2
            },
            {
              text: `RECEIVABLE AS ON ${utilityObj.billMonth}`,
              style: ['setBold', 'setBig'],
              colSpan: 4
            },
            {},
            {},
            {},
          ],
          // row -2
          [
            {
              text: "",
              style: ['setBold'],
            },
            {
              text: "",
              style: ['setBold'],
            },
            {
              text: "",
              style: ['setBold']
            },
            {
              text: "Principle",
              style: ['setBold', 'setBig'],
            },
            {
              text: "Vat",
              style: ['setBold', 'setBig'],
            },
            {
              text: "Lps",
              style: ['setBold', 'setBig'],
            },
            {
              text: "Total",
              style: ['setBold', 'setBig'],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };

    var SL = 0;
    let sumNoc = 0;
    let sumCurrentPrin = 0;
    let sumCurrentVat = 0;
    let sumCurrentLps = 0;
    let sumTotalBill = 0;

    data.forEach(item => {const { dbName,ministryName, noc, lps, vat, prn, total } = item;
      SL++;
      sumNoc += noc;
      sumCurrentPrin += prn;
      sumCurrentVat += vat;
      sumCurrentLps += lps;
      sumTotalBill += total;

      phase.table.body.push(
        [
          {
            text: SL.toString() ?? "",
            style: ['setBlack', 'setRight', 'setBold'],
          },
          {
            text: `${ministryName ?? ""}`,
            style: ['setBlack', 'setLeft', 'setBig'],
          },
          {
            text: noc ?? "",
            style: ['setBlack', 'setRight', 'setBig'],
          },
          {
            text: prn ? total > 0 ? Number(prn).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00" : "0.00",
            style: ['setBlack', 'setRight', 'setBig'],
          },
          {
            text: vat ? total > 0 ? Number(vat).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00" : "0.00",
            style: ['setBlack', 'setRight', 'setBig'],
          },
          {
            //text: lps > 0 ? lps : 0,
            text: lps ? total > 0 ? Number(lps).toLocaleString(undefined, { minimumFractionDigits: 2 }) : "0.00" : "0.00",
            style: ['setBlack', 'setRight', 'setBig'],
          },
          {
          
            text: total > 0 ? Number(total).toLocaleString(undefined, { minimumFractionDigits: 2 }): "0.00",
            style: ['setBlack', 'setRight', 'setBig'],
          },
        ]
      );
    });
    phase.table.body.push([
      {
        text: "",
        style: ['setRight', 'setBold'],

      },
      {
        text: "Grand Total",
        style: ['setBold', 'setRight', 'setBig'],
      },
      {
        text: sumNoc.toString(),
        style: ['setRight', 'setBold', 'setBig'],
      },
      {
        text: Number(sumCurrentPrin).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        style: ['setRight', 'setBold', 'setBig'],
      },
      {
        text: Number(sumCurrentVat).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        style: ['setRight', 'setBold', 'setBig'],
      },

      {
        text: Number(sumCurrentLps).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        style: ['setRight', 'setBold', 'setBig']

      },
      {
        text: Number(sumTotalBill).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        style: ['setRight', 'setBold', 'setBig']
      },
    ])
    return phase;
  }
}
