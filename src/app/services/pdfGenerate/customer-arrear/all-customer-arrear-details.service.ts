import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;
import { customerArrearDefaultStyle, customerArrearHeaderMargin, customerArrearPageMargin, customerArrearStyle, setHeading, setSubSetHeading,setPdfMakeFonts, setAllCustomerArrearStyle, setSubHeading, misAllCustomerArrearDetailsHeadingMargin } from '../config/pdfMakeConfig';
import { formatDate } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class AllCustomerArrearDetailsService {

  constructor() { }   
  defaultColur = '';
  totalArrearSum: number;

  generatePdf(data: any, reportObj: any){
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(data, reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, bilMonth: any) {
    return {
      info: {
        title: 'All Customer Arrear for details',
        author: 'MISCBILL',
        subject: 'All Customer Arrear for details',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
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
    
      header: this.getDetailsHeading(data, bilMonth),
      content: [this.getAllCustomerArrearDetailsInfo(data)],
      pageMargins: [30,100,30,30],
      //pageMargins: [20,70,20,20],
      // defaultStyle: misDefaultStyle,
      styles: setAllCustomerArrearStyle,
    };
  }

  private getDetailsHeading(data: any, billMonth: string) {
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
          // // row 4
          // [
          //   { text: '' },
          //   {
          //     text: '',
          //   },
          //   {
          //     text: `Report Processing Month: ${dayjs(billMonth).format(
          //       'MMMM - YYYY'
          //     )}`,
          //     style: [setSubSetHeading],
          //   },
          //   {
          //     text: 'Total Customer:',
          //     alignment: 'right',
          //   },
          //   {
          //     text: `${totalCount}`,
          //     alignment: 'left',
          //   },
          // ],
          // [
          //   { text: '' },
          //   {
          //     text: '',
          //   },
          //   {
          //     text: ``,
          //     style: [setSubSetHeading],
          //   },
          //   {
          //     text: `Total:       `,
          //     alignment: 'right',
              
          //   },
          //   {
          //     text: `${Number(Math.abs(this.totalArrearSum) ?? 0.0).toFixed(2)}`,
          //     alignment: 'left',
          //   },
          // ],
        ],
        // body: [
        //   // row 1
        //   [
        //     {

        //       image: `logo.png`,
        //       width: 70, height: 60, color: 'gray', rowSpan: 4, colSpan: 2,
        //       alignment: 'right',
        //       margin: [-150,0,0,0]
        //     },
        //     {},
        //     { text: "", colSpan: 8, border: [false, false, false, false] }, {}, {}, {}, {}, {}, {}, {}
        //   ],
        //   // // row 2
        //   [
        //     {}, {},
        //     {
        //       text: "BANGLADESH POWER DEVELOPMENT BOARD",
        //       style: ['setHeading'],

        //       colSpan: 5
        //     },
        //     {}, {}, {}, {},
        //     {
        //       text: "",

        //       colSpan: 3
        //     }, {}, {}
        //   ],
        //   // // row 3
        //   [
        //     {}, {},
        //     {
        //       text: [`All Customer Arrear List\n`, { text: `Report Processing Month: ${dayjs(billMonth).format("MMMM - YYYY")}` }],
        //       style: ['setSubHeading'],

        //       colSpan: 5
        //     },
        //     {}, {}, {}, {},
        //     { text: "", colSpan: 3 }, {}, {}
        //   ],
        //   // row 4
        //   [
        //     { text: "", colSpan: 2 }, {},
        //     {
        //       text: "",
        //       style: ['setBold', 'setBig'],

        //       colSpan: 5
        //     },
        //     {}, {}, {}, {},
        //     {
        //       text: `Total Customer:\t${totalCount}`, style: ['setBig', 'setLeft'],
        //       margin: [0, 0, 30, 0],
        //       colSpan: 3
        //     },
        //     {}, {}
        //   ],
        // ]
      },
      layout: 'noBorders',
    };
    return phase;
  }
  private getAllCustomerArrearDetailsInfo(data: any) {
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
      let e = item;
      Sum_PRN += e.PRINCIPAL_ARREAR;
      Sum_VAT += e.VAT_ARREAR;
      Sum_LPS += e.LPS_ARREAR;
      Sum_total += e.TOTAL_ARREAR;

      const {
        LOC,
        OFFICE,
        BG,
        B_K,
        CON_NO,
        WLK_OR,
        PV_AC,
        NAME,
        ADDR,
        NOM,
        TARIFF,
        PRINCIPAL_ARREAR,
        VAT_ARREAR,
        LPS_ARREAR,
        TOTAL_ARREAR,
        BILL_CYCLE_CODE,
        STATUS,
        DISC_DATE,
      } = item;
      let disData;
      if (DISC_DATE == undefined || DISC_DATE == null) {
        disData = '';
      }

      if (DISC_DATE != null) {
        disData = formatDate(DISC_DATE, 'dd/MM/yyyy', 'en');
      }

      phases.table.body.push([
        {
          text: LOC ?? '',
          style: ['setBlack', 'setLeft'],
          border: [true, true, false, true],
          colSpan: 1,
        },
        {
          text: OFFICE ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: BG ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: B_K ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: CON_NO ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: this.nullCheck(WLK_OR) + ' ' + this.nullCheck(PV_AC),
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: NAME ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: ADDR ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: NOM ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },

        {
          text: TARIFF ?? '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, false, true],
        },
        {
          text: Number(PRINCIPAL_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(VAT_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(LPS_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: Number(TOTAL_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },

        {
          text: BILL_CYCLE_CODE ?? '',
          style: ['setBlack', 'setRight'],
          border: [false, true, false, true],
        },
        {
          text: this.nullCheck(STATUS) + '\n' + disData,
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
  private nullCheck(value: any) {
    if (value === null || value === undefined || value === '') { return ''; }
    return value;
  }
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
}
