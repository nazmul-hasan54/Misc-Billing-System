import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { misArrearSummaryCenterWise, misArrearSummaryLocationWise, misDefaultStyle, setArrearSummaryStyle, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class CenterWiseRegularCustomerArrearService {

  defaultColor = '#000000';
  constructor() { }

  generatePdf(data: any, centerCode: any, obj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(
      data,
      centerCode,
      obj
    );
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, centerCode: any, obj: any) {
    let reportByCenterHeading = () => {
      return this.getCenterHeading(data, obj);
    };
    let reportByCenterInfo = () => {
      return this.getCenterSummaryInfo(data);
    };
    let reportByLocationHeading = () => {
      return this.getLocationHeading(data, centerCode, obj);
    };
    let reportByLocationInfo = () => {
      return this.getLocationSummaryInfo(data);
    };

    return {
      info: {
        title: 'Regular Customer Arrear Summary',
        author: 'BPDB',
        subject: 'Regular Customer Arrear Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'legal',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            dontBreakRows: true,
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `Page ${currentPage.toString()} of ${pageCount}`,
                  style: ['setFooterLeft'],
                  margin: [30, 0, 30, 0],
                },
                {
                  text: dayjs(new Date()).format('DD/MM/YYYY'),
                  style: ['setFooterRight'],
                  margin: [30, 0, 30, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },

      header:
      centerCode == "0" ? reportByCenterHeading() : reportByLocationHeading(), // Calling header on the report type based on center

      content: [centerCode == "0" ? reportByCenterInfo() : reportByLocationInfo()], // Calling summary info on the report type based on center

      pageMargins: [30, 90, 30, 20],
      defaultStyle: misDefaultStyle,

      styles: setArrearSummaryStyle,
    };
  }

  private getCenterHeading(data: any, obj: any) {
    //const { MONTH } = data[0];
    let {month}=data[0];
    const phase = {
      margin: misArrearSummaryCenterWise,
      table: {
        dontBreakRows: true,
        widths: [40, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 5,
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 65,
              height: 55,
              color: 'gray',
              rowSpan: 4,
              colSpan: 2,
              alignment: 'right',
              margin: [-290, 0, 0, 0],
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
              text: ` Center Wise Arrear Summary`,
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
          // row 4
          [
            {},
            {},
            {
              text: `Bill Month: ${month}`,
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

          // row 5
          [
            {
              text: `Total Center:\t${data.length}`,
              style: [setSubSetHeading],
              margin: [0, -18, 10, 0],
              colSpan: 10,
              bold: false,
              alignment: 'right',
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

  private getLocationHeading(data: any, centerCode: string, obj: string) {
    //const { MONTH } = data[0];
    let {month, }= data[0];
    const phase = {
      margin: misArrearSummaryLocationWise,
      table: {
        dontBreakRows: true,
        widths: [40, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 5,
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 65,
              height: 55,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-290, 0, 0, 0],
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
              text: ` ${centerCode} Computer Center\n`,
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
          [
            {},
            {},
            {
              text: { text: `Location Wise Arrear Summary\n` },
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
          // row 4
          [
            {},
            {},
            {
              text: `Bill Month: ${month}`,
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

          // row 5
          [
            {
              text: `Total Location:\t${data.length}`,
              style: [setSubSetHeading],
              margin: [0, -18, 10, 0],
              colSpan: 10,
              bold: false,
              alignment: 'right',
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
  // private getLocationHeading(data: any, dbName: string) {
  //   const { MONTH } = data[0];
  //   const phase = {
  //     margin: misDefaultHeaderMargin,
  //     table: {
  //       widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
  //       //  headerRows: 5,
  //       margin: [0, 0, 0, 0],
  //       body: [
  //         // row 1
  //         [
  //           {
  //             image: `logo.png`,
  //             width: 70,
  //             height: 60,
  //             color: 'gray',
  //             rowSpan: 4,
  //             colSpan: 2,
  //             alignment: 'right',
  //             margin: [-200, 0, 0, 0],
  //           },
  //           {},
  //           { text: '', colSpan: 8, border: [false, false, false, false] },
  //           {},
  //           {},
  //           {},
  //           {},
  //           {},
  //           {},
  //           {},
  //         ],
  //         // // row 2
  //         [
  //           {},
  //           {},
  //           {
  //             text: 'BANGLADESH POWER DEVELOPMENT BOARD',
  //             style: ['setHeading'],

  //             colSpan: 5,
  //           },
  //           {},
  //           {},
  //           {},
  //           {},
  //           {
  //             text: '',

  //             colSpan: 3,
  //           },
  //           {},
  //           {},
  //         ],
  //         // // row 3
  //         [
  //           {},
  //           {},
  //           {
  //             text: [
  //               dbName + ` Computer Center\n`,
  //               { text: `Location Wise Arrear Summary\n` },
  //               { text: `Bill Month: ${MONTH}` },
  //             ],
  //             style: ['setSubHeading'],

  //             colSpan: 5,
  //           },
  //           {},
  //           {},
  //           {},
  //           {},
  //           { text: '', colSpan: 3 },
  //           {},
  //           {},
  //         ],
  //         // row 4
  //         [
  //           { text: '', colSpan: 2 },
  //           {},
  //           {
  //             text: '',
  //             style: ['setBold', 'setBig'],

  //             colSpan: 5,
  //           },
  //           {},
  //           {},
  //           {},
  //           {},
  //           {
  //             text: `Total Location:\t${data.length}`,
  //             style: ['setBig', 'setLeft'],
  //             margin: [0, 0, 50, 0],
  //             colSpan: 3,
  //           },
  //           {},
  //           {},
  //         ],
  //       ],
  //     },
  //     layout: 'noBorders',
  //   };
  //   return phase;
  // }

  private getCenterSummaryInfo(data: any) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [
          '*',
          90,
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          110,
        ],
        body: [
          [
            {
              text: 'Center Name',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'No. Of Consumer',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Billed Unit (kWh)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Current PRIN (Tk)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Current Vat (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Current LPS (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear VAT (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear LPS (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Total Bill (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
          ],
        ],
      },
      layout: this.setTableStyles()
    };
    data.forEach(item => {
      
      phases.table.body.push([
        {
          text: `${item.center}`,
          style: ['setBlack', 'setLeft'],
          border: [true, true, false, true],
        },
        {
          text: item.noc ? Number(item.noc).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.bldUnit ? Number(item.bldUnit).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.curPrin ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.curVat ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.currentLps ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrPrin ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrVat ?? 0.0).toFixed(2),
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

    let sumNoc = 0;
    let sumBldUnit = 0;
    let sumCurrPrin = 0;
    let sumCurrVat = 0;
    let sumCurrLps = 0;
    let sumArrPrin = 0;
    let sumArrVat = 0;
    let sumArrLps = 0;
    let sumTotalBill = 0;

    data.forEach(e => {
      sumNoc += e.noc;
      sumBldUnit += e.bldUnit;
      sumCurrPrin += e.curPrin;
      sumCurrVat += e.curVat;
      sumCurrLps += e.currentLps;
      sumArrPrin += e.arrPrin;
      sumArrVat += e.arrVat;
      sumArrLps += e.arrLps;
      sumTotalBill += e.totalBill;
    });

    phases.table.body.push([
      {
        text: 'Grand Total:',
        style: ['setBlack', 'setLeft', 'boldText'],
        border: [true, true, false, true],
      },
      {
        text: sumNoc ? Number(sumNoc).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: sumBldUnit ? Number(sumBldUnit).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrPrin ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrVat ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrLps ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrPrin ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrVat ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrLps ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumTotalBill ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, true, true],
      },
    ]);

    return phases;
  }

  private getLocationSummaryInfo(data: any) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: ['*', '*', '*', '*', '*', '*', '*', '*', '*', '*', '*'],
        body: [
          [
            {
              text: 'Location Code',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Div/ ESU Name',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'No. Of Consumer',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Billed Unit (kWh)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Current PRIN (Tk)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Current Vat (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Current LPS (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear VAT (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Arrear LPS (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'Total Bill (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
          ],
        ],
      },
    };
    data.forEach(item => {

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
          text: item.noc ? Number(item.noc).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.bldUnit ? Number(item.bldUnit).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.curPrin ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.curVat ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.currentLps ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrPrin ?? 0.0).toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.arrVat ?? 0.0).toFixed(2),
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

    let sumNoc = 0;
    let sumBldUnit = 0;
    let sumCurrPrin = 0;
    let sumCurrVat = 0;
    let sumCurrLps = 0;
    let sumArrPrin = 0;
    let sumArrVat = 0;
    let sumArrLps = 0;
    let sumTotalBill = 0;

    data.forEach(e => {
      sumNoc += e.noc;
      sumBldUnit += e.bldUnit;
      sumCurrPrin += e.curPrin;
      sumCurrVat += e.curVat;
      sumCurrLps += e.currentLps;
      sumArrPrin += e.arrPrin;
      sumArrVat += e.arrVat;
      sumArrLps += e.arrLps;
      sumTotalBill += e.totalBill;
    });

    phases.table.body.push([
      {
        text: 'Grand Total:',
        style: ['setBlack', 'setLeft', 'boldText'],
        border: [true, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'setLeft', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: sumNoc ? Number(sumNoc).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: sumBldUnit ? Number(sumBldUnit).toLocaleString(undefined, { minimumFractionDigits: 0 }) : '',
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrPrin ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrVat ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumCurrLps ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrPrin ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrVat ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumArrLps ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, false, true],
      },
      {
        text: Number(sumTotalBill ?? 0.0).toFixed(2),
        style: ['setBlack', 'setRight', 'boldText'],
        border: [false, true, true, true],
      },
    ]);

    return phases;
  }
  private setTableStyles() {
    return {
      // paddingLeft: function (i, node) { return 4; },
      // paddingRight: function (i, node) { return 4; },
      paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) { return 5; },
    }
  }
}
