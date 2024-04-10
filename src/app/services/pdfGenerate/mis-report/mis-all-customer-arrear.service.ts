import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { formatDate } from '@angular/common';


import {
  setPdfMakeFonts,
  misDefaultStyle,
  misDefaultPageMargin,
  misDefaultHeaderMargin,
  misDefaultImageMargin,
  allCustomerArrearLocationWiseStyle,
  setAllCustomerArrearStyle,
  misAllCustomerArrearDetailsHeadingMargin,
  misAllCustomerArrearBillCycleHeadingMargin,
  setHeading,
  setSubHeading,
  setSubSetHeading,
} from '../config/pdfMakeConfig';
import { AllCustomerArrearModel } from '../../../model/mis-report/all-cust-arrear.model';


@Injectable({
  providedIn: 'root'
})
export class MisAllCustomerArrearService {

  defaultColur = '';
  totalArrearSum: number;
  constructor() { }
  //#region Details
  generateAllCustomerArrearDetailsPdf(data: AllCustomerArrearModel[], bilMonth: any) {

    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(data, bilMonth);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: AllCustomerArrearModel[], bilMonth: any) {
    return {
      info: {
        title: 'All Customer Arrear for details',
        author: 'BILLONWEB',
        subject: 'All Customer Arrear for details',
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
    
      content: [this.getAllCustomerArrearDetailsInfo(data)],
      header: this.getDetailsHeading(data, bilMonth),
      pageMargins: [30,100,30,30],
      //pageMargins: [20,70,20,20],
      defaultStyle: misDefaultStyle,
      styles: setAllCustomerArrearStyle,
    };
  }

  private getDetailsHeading(data: AllCustomerArrearModel[], billMonth: any) {
    const totalCount = data.length;
    const phase = {
      margin: misAllCustomerArrearDetailsHeadingMargin,
      table: {
        dontBreakRows: true,
        //widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 5,
        widths: [100, 125, 'auto', '*', 90],

        margin: [0, 0, 0, 0],
        body: [
          //row - 1
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 4,
              colSpan: 2,
              alignment: 'right',
              margin: [0, 0, 0, 0],
            },
            {},
            {
              text: '',
              colSpan: 3,
            },
            {
              text: '',
            },
            {
              text: '',
            },
          ],
          // row 2
          [
            { text: '' },
            {
              text: '',
            },
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],
              fontSize: 14,
              margin: [0, 5, 0, 0],
            },
            {
              text: '',
            },
            {
              text: '',
            },
          ],
          //row 3
          [
            { text: '' },
            {
              text: '',
            },
            {
              text: 'All Customer Arrear List',
              style: [setSubHeading],
              margin: [1, 0, 0, 0],
            },
            {
              text: '',
            },
            {
              text: '',
            },
          ],
         // row 4
          [
            { text: '' },
            {
              text: '',
            },
            {
              text: `Report Processing Month: ${dayjs(billMonth).format(
                'MMMM - YYYY'
              )}`,
              style: ['setBig'],
            },
            {
              text: `Total Customer: ${totalCount}`,
              alignment: 'left',
              margin: [90, 0, 0, 0],
              style: ['setBig'],
            },
            {
              
            },
          ],
          [
            {},
            {},
            {},
            {
              text: `Total :\t${Number(Math.abs(this.totalArrearSum) ?? 0.0).toFixed(2)}`,
              style: ['setBig',],
              margin: [90, -4, 0, 0],
              alignment: 'left',
            },
            {},
           
          ],
        ]
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private getAllCustomerArrearDetailsInfo(data: AllCustomerArrearModel[]) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          100,
          100,
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
        ],
        body: [
          //row-4
          [
            {
              text: 'Loc Code',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 1,
            },
            {
              text: 'Div/ ESU Name',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Bill Grp',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Book',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Consumer No.',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'WLK_Or/PV_Acc.',
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
              text: 'NOM',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Tariff',
              style: ['setBlack'],
              border: [true, true, true, true],
            },

            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack'],
              border: [true, true, true, true],
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
            {
              text: 'BillCycle',
              style: ['setBlack'],
              border: [true, true, true, true],
            },

            {
              text: 'Status /Date',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };
    let Sum_PRN = 0;
    let Sum_VAT = 0;
    let Sum_LPS = 0;
    let Sum_total = 0;
    data.forEach((item) => {
      
      Sum_PRN += item.principalArrear;
      Sum_VAT += item.vatArrear;
      Sum_LPS += item.lpsArrear;
      Sum_total += item.totalArrear;

      
      let disData;
      if (item.discDate == undefined || item.discDate == null) {
        disData = '';
      }

      if (item.discDate != null) {
        disData = formatDate(item.discDate, 'dd/MM/yyyy', 'en');
      }

      phases.table.body.push([
        {
          text: item.loc ?? '',
          style: ['setBlack', 'setLeft'],
          border: [true, true, false, true],
          colSpan: 1,
        },
        {
          text: item.office ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: item.bg ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.bk ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: item.conNo ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: this.nullCheck(item.wlkOr) + ' ' + this.nullCheck(item.pvAc),
          style: ['setBlack', 'setLeft'],
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
          text: (item.nom).toString() ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },

        {
          text: item.tarrif ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.principalArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.vatArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(item.lpsArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number( item.totalArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },

        {
          text: item.billCycleCode ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: this.nullCheck(item.status) + '\n' + disData,
          style: ['setBlack', 'setLeft'],
          border: [false, true, true, true],
        },
      ]);
    });
    this.totalArrearSum = Number(Sum_total);
    phases.table.body.push([
      {
        text: 'Grand Total',
        style: ['setBlack', 'boldText', 'setLeft'],
        colSpan: 2,

        border: [true, true, false, true],
      },
      {
        text: '',

        style: ['setBlack', 'boldText', 'setLeft'],
        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: data.length ? Number(data.length).toLocaleString() : '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },

      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: Number(Sum_PRN ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_VAT ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_LPS ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_total ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, true, true],
      },
    ]);
    return phases;
  }
  //#endregion

  //#region BillCycle Wise

  generateAllCustomerArrearBillCycleWisePdf(data: AllCustomerArrearModel[], billMonth: any) {
    pdfMake.fonts = setPdfMakeFonts;
    
    const documentDefinition = this.getAllCustomerArrearBillCycleWiseDocumentDefinition(data, billMonth);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getAllCustomerArrearBillCycleWiseDocumentDefinition(
    data: AllCustomerArrearModel[],
    bilMonth: any
  ) {
    return {
      info: {
        title: 'All Customer Arrear Location Wise',
        author: 'BPDB',
        subject: 'All Customer Arrear Location Wise',
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
   
      background: function (currentPage, pageSize) {
        return [
          {
            svg: `<svg viewBox="0 0 800 800" xmlns="http://www.w3.org/2000/svg">
            <line x1="9" y1="565" x2="790" y2="565" stroke="black" />

            <!-- If you do not specify the stroke
                 color the line will not be visible -->
          </svg>`

          }
        ]
      },
      content: [this.getAllCustomerArrearBillCycleWiseInfo(data)],
      header: this.getBillCycleWiseHeading(data, bilMonth),
      pageMargins: [30,95,30,30],
      // pageMargins: [30, 100, 30, 30],
      defaultStyle: misDefaultStyle,
      styles: allCustomerArrearLocationWiseStyle,
    };
  }

  private getBillCycleWiseHeading(data: AllCustomerArrearModel[], billMonth: string) {
    const totalCount = data.length;
    const phase = {
      margin: [-20, 10, 30, 0],
      table: {
        dontBreakRows: true,
        widths: [65, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
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
              margin: [-200, 0, 0, 0],
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
              text: [
                `All Customer Arrear List`,
                // {
                //   text: `Report Processing Month: ${dayjs(billMonth).format(
                //     'MMMM - YYYY'
                //   )}`,
                // },
              ],
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
            { text: '', colSpan: 2 },
            {},
            {
              text: `Report Processing Month: ${dayjs(billMonth).format(
                'MMMM - YYYY'
              )}`,
              style: [setSubSetHeading],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              // style: ['setBig', 'setLeft'],
              // margin: [0, 0, 30, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          // row -5
          [
            {
              text: `Total Customer:\t ${data.length}`,
              style: ['setBig', 'setLeft'],
              margin: [0, -17, 0, 0],
              colSpan: 10,
              alignment: 'right',
            },
            {},
            {
              text: ``,
              style: [],

              colSpan: 3,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              text: `Total :\t${Number(Math.abs(this.totalArrearSum) ?? 0.0).toFixed(2)}`,
              style: ['setBig', 'setLeft'],
              margin: [-30, -4, 0, 0],
              colSpan: 10,
              alignment: 'right',
            },
            {},
            {
              text: ``,
              style: [],

              colSpan: 3,
            },
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
  private getAllCustomerArrearBillCycleWiseInfo(data: AllCustomerArrearModel[]) {
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          55,
          90,
          100,
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
        ],
        body: [
          //row-4
          [
            {
              text: 'Loc Code',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 1,
            },
            {
              text: 'Div/ ESU Name',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Bill Grp',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Book',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Consumer No.',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'WLK_Or/PV_Acc.',
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
              text: 'NOM',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'Tariff',
              style: ['setBlack'],
              border: [true, true, true, true],
            },

            {
              text: 'Arrear PRN (Tk)',
              style: ['setBlack'],
              border: [true, true, true, true],
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
      layout: this.setTableBorder(),
    };

    let getAllBillCycle = [
      ...new Set(data.map((item) => item.billCycleCode)),
    ];
    getAllBillCycle.forEach((billCycle) => {
      let dataGroupByBillCycle = data.filter(
        (x) => x.billCycleCode === billCycle
      );
      if (dataGroupByBillCycle.length > 0) {
        phases.table.body.push([
          {
            text: 'BillCycle Code:\t' + billCycle ?? '',

            style: ['setBillCycle', 'setLeft'],
            border: [true, true, false, true],
            colSpan: 5,
          },
          {
            text: '',
            style: ['setBlack', 'setLeft'],
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
            style: ['setBlack', 'setRight'],
            border: [false, true, true, true],
          },
        ]);
      }
      dataGroupByBillCycle.forEach((item) => {

        phases.table.body.push([
          {
            text: item.loc ?? '',
            style: ['setBlack', 'setLeft'],
            border: [true, false, false, false],
          },
          {
            text: item.office ?? '',
            style: ['setBlack', 'setLeft'],
            border: [false, false, false, false],
          },
          {
            text: item.bg ?? '',
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: item.bk ?? '',
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: item.conNo ?? '',
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: this.nullCheck(item.wlkOr) + '' + this.nullCheck(item.pvAc),
            style: ['setBlack', 'setLeft'],
            border: [false, false, false, false],
          },
          {
            text: item.name ?? '',
            style: ['setBlack', 'setLeft'],
            border: [false, false, false, false],
          },
          {
            text: item.addr ?? '',
            style: ['setBlack', 'setLeft'],
            border: [false, false, false, false],
          },
          {
            text: item.nom.toString() ?? '',
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },

          {
            text: item.tarrif ?? '',
            style: ['setBlack', 'setLeft'],
            border: [false, false, false, false],
          },
          {
            text: Number(item.principalArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: Number(item.vatArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: Number(item.lpsArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            style: ['setBlack', 'setRight'],
            border: [false, false, false, false],
          },
          {
            text: Number(item.totalArrear ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
            style: ['setBlack', 'setRight'],
            border: [false, false, true, false],
          },
        ]);
      });
    });
    

    let Sum_PRN = 0;
    let Sum_VAT = 0;
    let Sum_LPS = 0;
    let Sum_total = 0;

    data.forEach((element) => {
      let e = element;
      Sum_PRN += e.principalArrear;
      Sum_VAT += e.vatArrear;
      Sum_LPS += e.lpsArrear;
      Sum_total += e.totalArrear;
    });
    this.totalArrearSum = Number(Sum_total); 
    phases.table.body.push([
      {
        text: 'Grand Total',
        style: ['setBlack', 'boldText', 'setLeft', 'cols'],
        colSpan: 2,
        border: [true, true, false, true],
      },
      {
        text: '',

        style: ['setBlack', 'boldText', 'setLeft'],
        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: data.length ? Number(data.length).toLocaleString() : '',
        style: ['setBlack', 'boldText', 'setRight'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },

      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: '',
        style: ['setBlack', 'boldText'],

        border: [false, true, false, true],
      },
      {
        text: Number(Sum_PRN ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_VAT ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_LPS ?? 0.0).toFixed(2) ?? '',
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, false, true],
      },
      {
        text: Number(Sum_total ?? 0.0).toFixed(2),
        style: ['setBlack', 'boldText', 'setRight'],
        border: [false, true, true, true],
      },
    ]);
    return phases;
  }
  //#endregion

  private setTableBorder() {
    const d = this.defaultColur;
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

  private nullCheck(value: any) {
    if (value === null || value === undefined || value === '') { return ''; }
    return value;
  }
}
