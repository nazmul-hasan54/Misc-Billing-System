import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ZoneWisePoliceArrearSummaryReportService {

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
        title: 'Police Arrear Summary',
        author: 'EBCWEB',
        subject: 'Police Arrear Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'Legal',
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
      header: this.getPoliceHeading(data, reportObj),
      content: [
        this.getPoliceInfo(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getPoliceHeading(data: any, reportObj: any){
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
              margin: [-230, 5, 0, 0],
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
              text: `Zone Wise Police Summary Arrear`,
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
              text: `Accounts Receivable As On ${reportObj.date ?? ''}`,
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
          // row 5
          [
            {
              text: `Total Location :\t${totalCount}`,
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

  private getPoliceInfo(data: any, reportObj: any, utilityObj: any){
    let grandPrevArrearAmt = 0;
     let grandCurrMonthBill = 0;
     let grandTotalCollection = 0;
     let grandTotalArrearAmt = 0;
    //  let uniqueZones = [...new Set(data.map(item => item.zoneName
    //   ))];
    const phase = {
      margin: [5, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, '*', 130, 120, 80, 80, 80],
        body: [
          // [
          //   {
          //     text: `Zone - ${uniqueZones}`,
          //     style: ['setBold','setLeft', 'setBig'],
          //     colSpan: 7,
          //     border: [true, true, true, true]
          //   },
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          // ],
          // [
          //   {
          //     text: `SI`,
          //     style: ['setBold', 'setBig'],
          //     colSpan: 1,
          //     border: [true, true, true, true]
          //   },
          //   {
          //     text: `Sales and Distribution`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          //   {
          //     text: `Location Code`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          //   {
          //     text: `Principal`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          //   {
          //     text: `Lps`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          //   {
          //     text: `Vat`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          //   {
          //     text: `Total`,
          //     style: ['setBold', 'setBig'],
          //     border: [true, true, true, true],
          //     colSpan: 1
          //   },
          // ]
          [
            {
              text: '',
              style: ['setLeft'],
              border: [false, false, false, false],
              colSpan: 7
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        ]
      },
      layout: this.setTableStyles()
    };

    let uniqueZones = [...new Set(data.map(item => item.zoneName))];
    uniqueZones?.forEach(item => {
      debugger;
      console.log("u9igsauygs",item);

      let testlist=data.filter(p=>p.zoneName==item);
      let uniqueLocatons = [...new Set(testlist.map(item => item.locationCode || item.zoneName))];

      console.log(uniqueLocatons);

        if(item){
        phase.table.body.push(
          [
            {
              text: `Zone - ${item}`,
              style: ['setBold','setLeft', 'setBig'],
              colSpan: 7,
              border: [true, true, true, true]
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ]
        );

        phase.table.body.push(
          [
            {
              text: `SI`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text: `Sales and Distribution`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Location Code`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Arrear Amount(Upto-Previous Month)',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Current Month Bill',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Total Collection`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Total Arrear(Current Month)',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
          ]
        );

        let serial = 0;

        let totalPrevArrearAmt= 0;
        let totalCurrMonthBill = 0;
        let totalTotalCollection = 0;
        let totalTotalArrearAmt = 0;
        testlist.forEach(value => {
          //let locationLenght = data.filter(x=> x.locationCode == location);
          //locationLenght.forEach(value => {
            serial++;
            totalPrevArrearAmt += value.prevArrearAmt;
            totalCurrMonthBill += value.currMonthBill;
            totalTotalCollection += value.totalCollection;
            totalTotalArrearAmt += value.totalArrearAmt;
          phase.table.body.push(
            [
              {
                text: `${serial}`,
                style: ['setBig'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.locationName}`,
                style: ['setBig',],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.locationCode}`,
                style: ['setBig'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.prevArrearAmt ? Number(value.prevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                style: ['setBig','setRight'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.currMonthBill ? Number(value.currMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                style: ['setBig','setRight'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.totalCollection ? Number(value.totalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                style: ['setBig','setRight'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: `${value.totalArrearAmt ? Number(value.totalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                style: ['setBig','setRight'],
                border: [true, true, true, true],
                colSpan: 1,
              },
            ]
          );
          });

          grandPrevArrearAmt += totalPrevArrearAmt;
          grandCurrMonthBill += totalCurrMonthBill;
          grandTotalCollection += totalTotalCollection;
          grandTotalArrearAmt += totalTotalArrearAmt;

      // Zone Total
        phase.table.body.push(
          [
            {
              text: ` Total of ${item} Zone`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
              colSpan: 3,
            },
            {},
            {},
            {
              text: `${totalPrevArrearAmt ? Number(totalPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
            },
            {
              text: `${totalCurrMonthBill ? Number(totalCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
            },
            {
              text: `${totalTotalCollection ? Number(totalTotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
            },
            {
              text: `${totalTotalArrearAmt ? Number(totalTotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
            },
          ]
        );
      }
    });

    // Grand Total
    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          border: [true, true, true, true],
          style: [ 'setBig', 'setBold'],
          colSpan: 3,
        },
        {},
        {},
        {
          text: `${grandPrevArrearAmt ? Number(grandPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandCurrMonthBill ? Number(grandCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandTotalCollection ? Number(grandTotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandTotalArrearAmt ? Number(grandTotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
      ]
    );

    return phase;
  }
}
