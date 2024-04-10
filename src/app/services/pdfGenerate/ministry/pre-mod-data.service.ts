import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts.js';
import { setBillStyles, setPdfMakeFonts } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PreModDataService {

  setColor: string = "";
  marginTop = [0, 3, 0, 0];
  constructor() { }

  generatePdf( data: any, billMonth: any) {

    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition( data, billMonth);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition( data: any, billMonth: any) {
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
        this.getHeading(data, billMonth),
        this.getMiscBillInfo(data),
        this.getFooter()
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 8,
        color: this.setColor,
      },
      styles: setBillStyles,
    }
  }

  private getHeading(data:any, billMonth: any) {
    let monthName = billMonth;
    let year = dayjs(monthName).format("YY");
    let month= dayjs(monthName).format("MMM");
    
    return {
      margin: [0, 0, 0, 0],
      table: {
        widths: [100, '*', '*', 100],
        body: [
          [
            {
              image: `logo.png`,
              width: 60,
              height: 50,
              //rowSpan: 5,
              colSpan: 2,
              alignment: 'left',
              margin: [80, -2, 0, 0],
            },
            {},
            {
              text: `BANGLADESH POWER DEVELOPMENT BOARD`,
              style: ['setTitleBold'],
              colSpan: 2,
              margin: [-260, 0, 0, 0],
            },
            {},
          ],
          // logo section
          [
            {},
            {
              text: `Pre-Payment Customer Statistics`,
              style: ['setSubTitleBold'],
              colSpan: 2,
              margin: [0, -32, 0, 0],
            },
            {},
            {}
          ],
          [
            {},
            {
              text: ` Prepaid MOD `,
              style: ['setSubTitleBold'],
              colSpan: 2,
              margin: [0, -18, 0, 0],
              decoration: 'underline',
              decorationColor:'black'
            },
            {},
            {},

          ],
          [
            {
              text: `Location Code: ${data[0].locationCode}`,
              style: ['setBold', 'setLeft'],
              colSpan: 2,
              margin: [0, 3, 0, 0],
            },
            {},
            {
              text: `Month: ${month}' ${year}`,
              style: ['setBold', 'setRight'],
              colSpan: 2,
              margin: [0, 3, 0, 0],
            },
            {},
          ],
          [
            {
              text: `Location Name: ${data[0].locationName}`,
              style: ['setBold', 'setLeft'],
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

  private getMiscBillInfo(data) {
    const phase = {
      margin: [0, 0, 0, 0],
      headerRows: 1,
      table: {
        widths: [20, '*', 40, 50, 55, 55, 55, 55, 50 ],
        body: [
          [
            {
              text: `SI No`,
              style: ['setColumnBold'],
              
              border: [true, true, true, true],
              lineHeight: 1,
              colSpan: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Tarrif`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `No. of Consumer`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Sold Unit (KWH)`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Sold Amount
                     BPDB(Tk.)`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },

            {
              text: `Sold Amount
                     VAT(Tk.)`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },

            {
              text: `Collection Amount BPDB(Tk.)`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },

            {
              text: `Collection Amount
                     VAT(Tk.)`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },

            {
              text: `Remarks`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
          ]
        ]
      }
    };
        let  sl=1;
        let totalConsumer=0;
        let totalSoldUnit=0;
        let soldAmountBPDP=0;
        let soldAmountVAT=0;
        let collectionAmountBPDP=0;
        let collectionAmountVAT=0;
        //let Tarrif ='LT-A';
        data.forEach(element => {
          totalConsumer +=element.consumerNo;
          totalSoldUnit +=element.soldUnit;
          soldAmountBPDP +=element.totalAmount
          soldAmountVAT +=element.vatAmount
          collectionAmountBPDP +=element.totalAmount
          collectionAmountVAT +=element.vatAmount
          phase.table.body.push(
            [
              {
                text: `${sl++}`,
                style: [],
                border: [true, true, true, true],
                lineHeight: 1,
                colSpan: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${element.tariffName}`,
                style: ['setLeft'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${element.consumerNo}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${element.soldUnit}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${Number(element.totalAmount).toFixed(2)}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${Number(element.vatAmount).toFixed(2)}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${Number(element.totalAmount).toFixed(2)}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `${Number(element.vatAmount).toFixed(2)}`,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: ``,
                style: ['setRight'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              }
    
            ]
          );
        });
   //Grand Total
   phase.table.body.push(
    [
      {
        text: `Total`,
        style: ['setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        colSpan:2,
        margin: [0, 0, 0, 0],
      },
      {
        text: ``,
        style: ['setLeft'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${totalConsumer}`,
        style: ['setRight'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${totalSoldUnit.toFixed(2)}`,
        style: ['setRight','setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${(soldAmountBPDP).toFixed(2)}`,
        style: ['setRight','setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${soldAmountVAT.toFixed(2)}`,
        style: ['setRight','setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${(collectionAmountBPDP).toFixed(2)}`,
        style: ['setRight','setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: `${collectionAmountVAT.toFixed(2)}`,
        style: ['setRight','setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      },
      {
        text: ``,
        style: ['setBold'],
        border: [true, true, true, true],
        lineHeight: 1,
        margin: [0, 0, 0, 0],
      }

    ]
  );
    return phase;
  }

  private getFooter() {
    return {
      margin: [0, 20, 0, 0],
      table: {
        widths: [40, '*', 80, '*', '*', '*', '*', '*', '*'],
        body: [
          [
            {
              text: `Officer :`,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
              colSpan:1,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
              colSpan: 4,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
            },
            {
              text: `Executive/Resident Engineer :`,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
              
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
            },
          ],
          [
            {
              text: `Seal :`,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 1,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 4,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: `S&D/ESU :`,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],

            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
          ],
          [
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 1,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 4,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
            {
              text: `Seal :`,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],

            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
              colSpan: 2,
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 0, 0, 0],
            },
          ],
          [
            {
              text: ``,
              style: ['setSubTitleBold'],
              margin: [0, 50, 0, 0],
              colSpan:4
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
            },

            {
              text: `Counter Sign By :`,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
              colSpan: 1
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
              colSpan: 4
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
             
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 50, 0, 0],
            },
          ],
          [
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },

            {
              text: `Seal :`,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
              colSpan: 1
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
              colSpan: 4
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 20, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },
            {
              text: ``,
              style: ['setFooterLefts'],
              margin: [0, 10, 0, 0],
            },
          ],
        ]
      },
      layout: 'noBorders'
    }
  }

}
