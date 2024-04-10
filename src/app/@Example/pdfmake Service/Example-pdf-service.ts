import { Injectable } from '@angular/core';
import * as pdfMake from "pdfmake/build/pdfmake";

import pdfFonts from '../../../assets/pdf-make/vfs_fonts.js';
// const pdfFontsX = require('pdfmake-unicode/dist/pdfmake-unicode.js');
// (<any>pdfMake).vfs = pdfFontsX.pdfMake.vfs;
import * as dayjs from 'dayjs'
import {setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading} from "../../@core/pdfMakeConfig/pdf-make-config";



(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class Examplepdfservice {

  constructor() { }

  defaultColor = '';
  generatePdf() {
    //@ts-ignore
    pdfMake.fonts= setPdfMakeFonts

    const documentDefinition = this.getDocumentDefinition();
    // @ts-ignore
    return pdfMake.createPdf(documentDefinition).download('pdfmake.pdf');
  }
  private getDocumentDefinition() {

    return {
      info: {
        title: 'Customer-List',
        author: 'billonweb',
        subject: 'Customer-List',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',// @ts-ignore
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `Page ${currentPage.toString()} of ${pageCount}`,
                  style: ['setFooterLeft'],
                  margin: [35, 5, 30, 0],
                },
                {
                  text: dayjs(new Date()).format('DD/MM/YYYY'),
                  style: ['setFooterRight'],
                  margin: [35, 5, 38, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },

      content: [this.getHeading()],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 9,
        color: this.defaultColor,
      },
      styles: {
        setBlack: {
          color: 'black',
        },
        setRight: {
          alignment: 'right',
        },
        setLeft: {
          alignment: 'left',
        },
        setBig: {
          fontSize: 8.5,
        },
        setBold: {
          bold: true,
        },
        setHeading: {
          bold: true,
          fontSize: 10,
        },
        setSubHeading: {
          bold: true,
          fontSize: 9,
        },
        setFooterLeft: {
          alignment: 'left',
          fontSize: 9,
        },
        setFooterRight: {
          alignment: 'right',
          fontSize: 9,
        },
      },
      pageMargins: [30, 20, 30, 30],
    };
  }
  private getHeading() {
    const locationName ='All' ;
    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [
          'auto',
          'auto',
          'auto',
          100,
          100,
          50,
          'auto',
          'auto',
          'auto',
          'auto',
          'auto',
          50,
        ],
        headerRows: 6,

        body: [
          // row 1
          [
            {
              border: [false, false, false, false],
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 3,
              alignment: 'right',
              margin: [-70, 5, 0, 0],
            },
            {},
            {},
            { text: '', colSpan: 9, border: [false, false, false, false] },
            {},
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
            {},
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],
              border: [false, false, false, false],
              colSpan: 6,
              margin: [0, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {
              text: '',
              border: [false, false, false, false],
              colSpan: 3,
            },
            {},
            {},
          ],
          // row 3
          [
            {},
            {},
            {},
            {
              text: ` Computer Center`,
              style: [setSubHeading],
              border: [false, false, false, false],
              colSpan: 6,
              margin: [0, -3, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            { text: '', border: [false, false, false, false], colSpan: 3 },
            {},
            {},
          ],
          // row 4
          [
            { text: '', border: [false, false, false, false], colSpan: 3 },
            {},
            {},
            {
              text: 'Customer List',
              style: [setSubHeading],
              border: [false, false, false, false],
              colSpan: 6,
              margin: [0, -3, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            { text: '', border: [false, false, false, false], colSpan: 3 },
            {},
            {},
          ],
          // row 5
          [
            { text: '', border: [false, false, false, false], colSpan: 3 },
            {},
            {},
            {
              text: `Bill Month: ${locationName}`,
              style: [setSubSetHeading],
              border: [false, false, false, false],
              colSpan: 6,
              margin: [0, -1, 0, 10],
            },
            {},
            {},
            {},
            {},
            {},
            {
              text: `Total Customer:`,
              style: [setSubSetHeading],
              border: [false, false, false, false],
              colSpan: 3,
              bold: false,
              margin: [0, -1, 0, 0],
            },
            {},
            {},
          ],

          // row 6
          [
            {
              text: 'Bill Group',
              border: [true, true, true, true],
              style: ['setBold'],
            },
            {
              text: 'Book',
              style: ['setBold'],
            },
            {
              text: 'Consumer Number',
              style: ['setBold'],
            },
            {
              text: 'Consumer Name',
              style: ['setBold'],
            },
            {
              text: 'Address',
              style: ['setBold'],
            },
            {
              text: 'Walking Sequence',
              style: ['setBold'],
            },
            {
              text: 'Registred A/C No.',
              style: ['setBold'],
            },
            {
              text: 'Tariff',
              style: ['setBold'],
            },
            {
              text: 'Sanc. Load',
              style: ['setBold'],
            },
            {
              text: 'Con. Load',
              style: ['setBold'],
            },
            {
              text: 'Meter Status',
              style: ['setBold'],
            },
            {
              text: 'Meter No.',
              style: ['setBold'],
            },
          ],
        ],
      },
    };

    return phase;
  }

  private nullChecker(value: any): any{
    if (value === null || value === '' || value === undefined) {
      return '';
    }
    return value;
  }
}
