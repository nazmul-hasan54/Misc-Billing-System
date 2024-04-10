import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CenterWiseSummeryReportService {

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
        title: 'All Ministry Center wise Summary',
        author: 'EBCWEB',
        subject: 'All Ministry Center wise Summary',
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
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }
                , { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },

      header: this.getHeading(data, reportObj, utilityObj),

      content: [
       this.getMinistry(data, reportObj, utilityObj )
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any) {
    const { runBillCycle, locDesc } = data[0];
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
              margin: [-170, -2, 0, 0],
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
          // // row 2
          [
            {},
            {},
            {
              text: `All Computer Center Report`,
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

          // row 3
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${utilityObj.billMonth}`,
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
          // row- 4
          [
            {},
            {},
            {
              text: `(Govt., Semi Govt., Autonomous & Corporation)`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              style: [setSubSetHeading],
              margin: [0, 0, 0, 0],
              colSpan: 3,
              bold: false,
            },
            {},
            {},
          ],
          // row 5
          [
            {
              text: `Total Center:\t${totalCount}`,
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


  private getMinistry(data: any, reportObj: any, utilityObj: any) {
    const phase = {
      margin: [10, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [25, 200, 40, '*', 'auto', '*', 120],
        body: [
          [
            {
              text: "SL No",
              style: ['setBold', 'setBig'],
              rowSpan: 2,

            },
            {
              text: "Center Name",
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              rowSpan: 2,
            },
            {
              text: "NOC",
              style: ['setBold', 'setBig'],
              rowSpan: 2,
            },
            {
              text: `Receivable as on ${utilityObj.billMonth}`,
              style: ['setBold', 'setBig'],
              colSpan: 4,
            },
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {},
            {
              text: `Principle`,
              style: ['setBold', 'setBig'],
            },
            {
              text: `Lps`,
              style: ['setBold', 'setBig'],
            },
            {
              text: `Vat`,
              style: ['setBold', 'setBig'],
            },
            {
              text: `Total`,
              style: ['setBold', 'setBig'],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };
    
    let nocTotal = 0;
    let currPrnTotal = 0;
    let currVatTotal = 0;
    let currLpsTotal = 0;
    let grandTotal = 0;
    data.forEach((item, index) => {

      const { dbName, noc, prn, vat,lps,total
      } = item;
      
      nocTotal += noc;
      currPrnTotal += (prn ?? 0);
      currVatTotal += (vat ?? 0);
      currLpsTotal += (lps ?? 0);
      grandTotal += (total ?? 0);
      phase.table.body.push(
        [
          {
            text: index + 1,
            style: ['setBig'],
          },
          {
            text: `${dbName} Computer Center`,
            style: ['setBig', 'setBlack', 'setLeft'],
          },
          {
            text: `${noc}`,
            style: ['setBig', 'setBlack', 'setRight'],
          },
          {
            text: `${prn}`,
            style: ['setBig', 'setBlack', 'setRight'],
          },
          {
            text: `${lps}`,
            style: ['setBig', 'setBlack', 'setRight'],
          },
          {
            text: `${vat}`,
            style: ['setBig', 'setBlack', 'setRight'],
          },
          {
            text: `${total}`,
            style: ['setBig', 'setBlack', 'setRight']
          },
        ],
      )
    });
    phase.table.body.push(
      [
        {},
        {
          text: 'Grand Total: ',
          style: ['setRight', 'setBold', 'setBig'],
        },
        {
          text: `${nocTotal}`,
          style: ['setBold', 'setBig', 'setRight'],
        },
        {
          text: `${currPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setBold', 'setBig', 'setRight'],
        },
        {
          text: `${currLpsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setBold', 'setBig', 'setRight'],
        },
        {
          text: `${currVatTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setBold', 'setBig', 'setRight'],
        },
        {
          text: `${grandTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setBold', 'setBig', 'setRight'],
        },
      ],
    )
    return phase;
  }

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
}
