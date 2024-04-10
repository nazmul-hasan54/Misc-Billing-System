import { PathLocationStrategy } from '@angular/common';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { setSubHeading } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misMinistrySummaryHeaderMargin, misMinistrySummaryPageMargin, misMinistrySummaryStyle, setFourthHeading, setHeading, setPdfMakeFonts, setSubSetHeading, ZoneCircleWiseAllReligiousPageMarginStyle } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class ReligiousPdfServiceService {
  defaultColor: '';
  constructor() { }

  generatePdf(data: any, utilityObj: any , finscalYearName: any){
    
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, utilityObj, finscalYearName);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, utilityObj: any, finscalYearName: any){
    return {
      info: {
        title: 'All Center Ministry Summary',
        author: 'BPDB',
        subject: 'All Center Ministry Summary',
        keywords: 'keywords for document',
        //creationDate: Date.now(),
      },
      pageSize: 'A4',
      //pageOrientation: 'portrait',
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
      header: this.getHeading(data, utilityObj, finscalYearName),
      content: this.getReligiousByCircle(data),
      pageMargins: misMinistrySummaryPageMargin,
      defaultStyle: ZoneCircleWiseAllReligiousPageMarginStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading( data: any, utilityObj: any, finscalYearName,){
    let finscalYearNam = finscalYearName;
    let month: string;
    // let year = dayjs(billMonth).format("YYYY");
    // let previousYear:any = dayjs(billMonth).format("YYYY");
    const noWorshipTotal= data.reduce((acc, o) => acc + parseInt(o.consumerCount), 0);
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 60, 100, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-60, -2, 0, 0],
            },
            {},
            {
              text: 'Bangladesh Power Development Board',
              style: [setHeading],
              colSpan: 5,
              margin: [-15, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {},
            {
              text: 'Receivable Statement of Electricity',
              style: [setSubHeading],
              colSpan: 5,
              margin: [-70, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {
              text: `No of Worship ${noWorshipTotal} `,
              style: [setSubSetHeading],
              colSpan: 5,
              margin: [-15, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {},
            {
              text: `For the year of ${finscalYearNam}`,
              style: [setFourthHeading, 'setLeft'],
              colSpan: 6,
              margin: [-135, 8, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {}
          ],   
          [
            {},
            {
              text: ``,
              style: [setFourthHeading, 'setLeft'],
              colSpan: 6,
              margin: [-75, 5, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {
              text: '',
              colSpan: 3
            },
            {},
            {}
          ],
        ]
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 4; },
      paddingBottom: function (i, node) { return 4; },
    }
  }

  private getReligiousByCircle(data: any){
    const phase = {
      table: {
      dontBreakRows: true,
      widths: [20, '*', 70, 70, 70, 70, 70],
      headerRows: 1,
      //margin: [0, 0, 0, 30],
      body: [
        [
          {
            text: `SL No.`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `Name of Circle`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
          {
            text: `Number of Worship`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
          {
            text: `Principle`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
          {
            text: `Vat`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
          {
            text: `Total`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
          {
            text: `Unadjusted Month`,
            style: ['setBlack', 'setBold'],
            border: [true, true, true, true],
          },
        ],
        [
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [],
          }
        ],
      ]
    },
    layout: this.setTableStyles()
    };

    
    let serial = 0;
    let grandNumberOfWorship = 0;
    let grandPrn = 0;
    let grandLps = 0;
    let grandVat = 0;
    let grandTotalArrear = 0;
    let grandSetUpMonth = 0;
    data.forEach(item => {
      //let {circleCode, setupMonth, circleName, consumerCount, principal, vat, lps, total} = item;
      serial++;
      grandNumberOfWorship += item.consumerCount;
      grandPrn += item.principal;
      grandLps += item.lps;
      grandVat += item.vat;
      grandTotalArrear += item.total;
      grandSetUpMonth = item.setupMonth;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            style: ['setBlack'],
            border: [true, true, true, true,],
          },
          {
            text: `${item.circleName}`,
            style: ['setBlack', 'setLeft'],
            border: [true, true, true, true,],
          },
          {
            text: `${item.consumerCount}`,
            style: ['setBlack'],
            border: [true, true, true, true,],
          },
          {
            text: `${Number(item.principal).toFixed(2)}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${Number(item.vat).toFixed(2)}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${Number(item.total).toFixed(2)}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${item.setupMonth}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
        ],
        [
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
          },
        ],
      );
    });
    
 
    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          style: ['setBlack', 'setBold'],
          border: [true, true, true, true],
          colSpan: 2,
        },
        {
          text: ``,
          style: ['setBlack', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${grandNumberOfWorship}`,
          style: ['setBlack', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${Number(grandPrn).toFixed(2)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${Number(grandVat).toFixed(2)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${Number(grandTotalArrear).toFixed(2)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${grandSetUpMonth}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
      ]
    );
    return phase;
  }
}
