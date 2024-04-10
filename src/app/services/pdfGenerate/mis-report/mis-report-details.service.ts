import { Injectable } from '@angular/core';
import { CommonService } from '../../common.service';
import * as dayjs from 'dayjs';


import {
  setPdfMakeFonts,
  misDefaultStyle,
  misArrearPrepaidPageMargin,
  misArrearPrepaidImageMargin,
  setAllCustomerArrearStyle,
  misArrearPrepaidHeaderMargin,
  setHeading,
  setSubHeading,
  setSubSetHeading,
} from '../config/pdfMakeConfig';
import pdfMake from 'pdfmake/build/pdfmake';
import { PrepaidCustDataModel } from '../../../model/mis-report/prepaid-cust-data.model';

@Injectable({
  providedIn: 'root'
})
export class MisReportDetailsService {
  defaultColour = '';
  totalArrearSum: number;
  constructor(private commonService: CommonService) {}
  // calling location wise
  generateLocationWiseArrearPrepaidCustomerPdf(data: PrepaidCustDataModel[]) {

    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data);
 //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: PrepaidCustDataModel[]) {
    return {
      info: {
        title: 'Arrear Prepaid Customer',
        author: 'BILLONWEB',
        subject: 'Arrear Prepaid Customer',
        keywords: 'InfonetAssociates.com',
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
                  style: ['setLeft'],
                  margin: [35, 5, 30, 0],
                },
                {
                  text: dayjs(new Date()).format('DD/MM/YYYY'),
                  style: ['setRight'],
                  margin: [30, 5, 35, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },
     
      content: [
        // this.getHeading(data),
        this.getArrearPrepaidCustomerInfo(data),
      ],
      header: this.getHeading(data),
      //pageMargins: misArrearPrepaidPageMargin,
      pageMargins: [30,110,25,30],
      defaultStyle: misDefaultStyle,
      styles: setAllCustomerArrearStyle,
    };
  }

  private getHeading(data: PrepaidCustDataModel[]) {
    const totalCount = data.length;
    let uniqueLocation = [...new Set(data.map(item => item.locationCode))];
    const phase = {
      margin: misArrearPrepaidHeaderMargin,
      
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 40, 50, 'auto'],
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
              margin: misArrearPrepaidImageMargin,
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
              text: `Prepaid & Stop Consumers Arrear-Based On Offset`,
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
            {
              
            },
            {},
            {
              text: `Location Code : ${uniqueLocation.toString()}`, 
              style: [setSubSetHeading],
              colSpan: 6,
              alignment: "center"
            },
            {},
            {},
            {},
            {},
            { },
            {},
            {},
          ],

          //row 5

          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '',
              style: ['setBold', 'setBig'],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: `Total Customer:\t${totalCount}`,
              style: [setSubSetHeading],
              margin: [0, -17, 10, 0],
              colSpan: 3,
              bold: false,
            },
            {},
            {},
          ],
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '',
              style: ['setBold', 'setBig'],

              colSpan: 5,
            },
            {},
            {},
            {},
            {
            },
            {
              text: `Total :\t${Number(Math.abs(this.totalArrearSum) ?? 0.0).toFixed(2)}`,
              style: [setSubSetHeading],
              margin: [-19, -5, 0, 0],
              colSpan: 3,
              alignment: 'center',
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

  private getArrearPrepaidCustomerInfo(data: any[]) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [
          'auto',
          'auto',
          'auto',
          70,
          110,
          120,
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto'
        ],
        body: [
          //row-4
          [
            {
              text: 'Bill Grp',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 1,
              bold: false,
            },
            {
              text: 'Book',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 1,
              bold: false,
            },

            {
              text: 'Wlk Ord',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Consumer No.',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Consumer Name',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Consumer Address',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Tariff',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Last Bill Month',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Arrear Principal(Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
              bold: false,
            },
            {
              text: 'Arrear VAT (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
              bold: false,
            },
            {
              text: 'Arrear LPS (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
              bold: false,
            },
            {
              text: 'Total Arrear (Tk)',
              style: ['setBlack'],
              border: [false, true, true, true],
              bold: false,
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    let sum_PRINCIPAL_ARREAR = 0;
    let sum_VAT_ARREAR = 0;
    let sum_LPS_ARREAR = 0;
    let sum_TOTAL_ARREAR = 0;

    data.forEach((item) => {
      sum_PRINCIPAL_ARREAR +=  item.principalArrear;
      sum_VAT_ARREAR += item.vatArrear;
      sum_LPS_ARREAR += item.lpsArrear;
      sum_TOTAL_ARREAR += item.totalArrear;
      phases.table.body.push([
        {
          text: item.billGroup ?? '',
          style: ['setBlack', 'setRight'],
          border: [true, true, false, true],
          colSpan: 1,
          bold: false,
        },
        {
          text: item.book ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
          colSpan: 1,
          bold: false,
        },
        {
          text: item.wlkOr ?? 0.0.toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.consumerNo ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.name ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: item.addr ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: item.tariff ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: item.lastBillMonth ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.principalArrear ?? 0.0.toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
          bold: false,
        },
        {
          text: item.vatArrear ?? 0.0.toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
          bold: false,
        },
        {
          text: item.lpsArrear ?? 0.0.toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
          bold: false,
        },
        {
          text: item.totalArrear ?? 0.0.toFixed(2),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
          bold: false,
        },
      ]);
    });
    this.totalArrearSum = Number(sum_TOTAL_ARREAR); 
 phases.table.body.push([
   {
     text: 'Grand Total',
     style: ['setBlack', 'setRight'],
     border: [true, true, false, true],
     colSpan: 2,
     bold: true,
   },
   {
     text: '',
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
   },
   {
     text: '',
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
   },
   {
     text: '',
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
   },
   {
     text: '',
     style: ['setBlack', 'setLeft'],
     border: [false, true, false, true],
   },
   {
     text: '',
     style: ['setBlack', 'setLeft'],
     border: [false, true, false, true],
   },
   {
     text: '',
     style: ['setBlack', 'setLeft'],
     border: [false, true, false, true],
   },
   {
    text: '',
    style: ['setBlack', 'setLeft'],
    border: [false, true, false, true],
  },
   {
     text: Number(sum_PRINCIPAL_ARREAR ?? 0.0).toFixed(2),
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
     bold: true,
   },
   {
     text: Number(sum_VAT_ARREAR ?? 0.0).toFixed(2),
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
     bold: true,
   },
   {
     text: Number(sum_LPS_ARREAR ?? 0.0).toFixed(2),
     style: ['setBlack', 'setRight'],
     border: [false, true, false, true],
     bold: true,
   },
   {
     text: Number(sum_TOTAL_ARREAR ?? 0.0).toFixed(2),
     style: ['setBlack', 'setRight'],
     border: [false, true, true, true],
     bold: true,
   },
 ]);
    return phases;
  }

  private setTableBorder() {
    const d = this.defaultColour;
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
      // hLineStyle: function (i, node) {
      //   // if (i === 0 || i === node.table.body.length) {
      //   //   return null;
      //   // }
      //   return { dash: { length: 10, space: 4 } };
      // },
      // vLineStyle: function (i, node) {
      //   // if (i === 0 || i === node.table.widths.length) {
      //   //   return {dash: {length: 4}};
      //   // }
      //   return { dash: { length: 4 } };
      // },
      //paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
}
