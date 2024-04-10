import { Injectable } from '@angular/core';
import { color } from 'd3-color';
import * as dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../../assets/vfs_fonts.js';
import { setBillStyles, setPdfMakeFonts } from '../../config/pdfMakeConfig';


(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ModBillPrintService {
  setColor: string = "";
  marginTop = [0, 3, 0, 0];
  constructor() { }

  generatePdf(data: any, utilityObj: any) {
    
    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, utilityObj: any) {
    return {
      info: {
        title: 'Bill Generation for LT Consumer',
        author: 'ebcweb',
        subject: 'Bill of Consumer',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      content: [
        this.getHeading(data, utilityObj),
        this.getMiscBillInfo(data),
        this.getFooter()
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 10,
        color: this.setColor,
      },
      styles: setBillStyles,
    }
  }

  private getHeading(data: any, utilityObj: any){
    let {centerName}= data[0];
    return {
      margin: [0, 10, 0, 0],
      table: {
        widths: [100, '*', '*', 100],

        body: [
          // logo section
          [
            {},
            {
              text: `BANGLADESH POWER DEVELOPMENT BOARD`,
              style: ['setTitleBold'],
              colSpan: 2, 
              margin: [0, 0, 0, 0],
            },
            {},
            {},
          ],
          // logo section
          [
            {},
            {
              text: `${centerName} `,
              style: ['setSubTitleBold'],
              colSpan: 2, 
              margin: [0, -2, 0, 0],
            },
            {},
            {}
          ],
          [
            {
              
            },
            {
              text: `MOD Manual Input Information Form`,
              style: ['setSubTitleBold'],
              colSpan: 2, 
              margin: [0, -2, 0, 0],
            },

            {},

            {

            },

          ],
          [
            {
              text: `Location Code: ${utilityObj.locationCode}`,
              style: ['setSubTitleBold', 'setLeft'],
              colSpan: 2,
              margin: [0, 3, 0, 0],
            },
            {},
            {
              text: `Bill Cycle Code: ${utilityObj.billMonth}`,
              style: ['setSubTitleBold', 'setRight'],
              colSpan: 2,
              margin: [0, 3, 0, 0],
            },
            {},
          ],
          [
            {
              text: `Miscellaneous Collected Amount `,
              style: ['setSubTitleBold', 'setLeft'],
              colSpan: 3,
              margin: [0, 10, 0, 0],
            },
            {},
            {},
            {},
          ],
        ]
      },
      // layout: this.setTableBorderColor()
      layout: 'noBorders'
    }
  }

  private getFooter(){
    return {
      margin: [0, 100, 0, 0],
      table: {
        widths: ['*', '*', '*', '*'],
        body: [
          [
            {
              text: ``,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: ``,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: ``,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: ``,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
          ],
          [
            {
              text: `Meter Reader`,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: `SAE`,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: `AE`,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
            {
              text: `RE/XEN`,
              style: ['setSubTitleBold'],
              margin: [0, 30, 0, 0],
            },
          ]
        ]
      },
      layout: 'noBorders'
    }
  }

  private getMiscBillInfo(data: any){
    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        widths: [30, '*', 150],
        body: [
          [
            {
              text: `SI No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 2,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Type Of Consumer`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 2,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Collected Amount Taka`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 2,
              margin: [0, 8, 0, 0],
            },
          ]
        ]
      }
    };

    let grandColumnValue = 0;
    data.forEach(value => {
      let {sl, columnName, columnValue} = value;
      grandColumnValue += columnValue;
      phase.table.body.push(
        [
          {
            text: `${sl}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 2,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${columnName}`,
            style: ['setLeft'],
            border: [true, true, true, true],
            lineHeight: 2,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${columnValue != 0 ? columnValue.toFixed(2) : '-'}`,
            style: ['setRight'],
            border: [true, true, true, true],
            lineHeight: 2,
            margin: [0, 8, 0, 0],
          }
        ]
      );
    })

    phase.table.body.push(
      [
        {
          text: ``,
          style: ['setColumnBold', 'setLeft'],
          border: [true, true, true, true],
          lineHeight: 2,
          margin: [0, 8, 0, 0],
        },
        {
          text: `Total Amount (Taka)`,
          style: ['setColumnBold', 'setLeft'],
          border: [true, true, true, true],
          lineHeight: 2,
          margin: [0, 8, 0, 0],
        },
        {
          text: `${grandColumnValue.toFixed(2)}`,
          style: ['setColumnBold', 'setRight'],
          border: [true, true, true, true],
          lineHeight: 2,
          margin: [0, 8, 0, 0],
        },
      ]
    );
    return phase;
  }
}
