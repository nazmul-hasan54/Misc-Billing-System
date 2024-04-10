import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setBillStyles } from "../config/pdfMakeConfig";
import { UntracedCustModel } from "../../../model/get-untraced-cust.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class UntracedConsumerViewReportService {


  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data: any) {

    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any,) {
    return {
      info: {
        title: 'Untraced Customer Info',
        author: 'ebcweb',
        subject: 'Bill of Consumer',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'legal',
      pageOrientation: 'landscape',
      content: [
        this.getHeading(data),
        this.getUntracedCustomerInfo(data),
        this.getFooter()
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 9,
        color: this.setColor,
      },
      styles: setBillStyles,
    }
  }

  private getHeading(data: any) {
    const totalCount = data.length;
    return {
      margin: [0, 5, 0, 0],
      table: {
        //headerRows: 1,
        widths: [100, '*', '*', 90],

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
              text: `Untraced Consumer List`,
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
              // text: `MOD Manual Input Information Form`,
              text: ``,
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

            },
            {},
            {},
            {
              text: `Total Customer: ${totalCount}`,
              style: [],
              colSpan: 1,
            },
          ],
        ]
      },
      // layout: this.setTableBorderColor()
      layout: 'noBorders'
    }
  }

  private getFooter() {

  }

  private getUntracedCustomerInfo(data: any) {
    const phase = {
      margin: [30, 7, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, 80, 235, 220, 70, 100, 70],
        body: [
          [
            {
              text: `SN`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Customer No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Customer Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Location`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
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
              text: `Meter Type`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Status`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
          ],
        ],
      }
    }

    let serial = 0;
    data.forEach(value => {
      serial++;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.customerNumber}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.customerName}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.locationName}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.tariffDesc}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.meterTypeDesc}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.status}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
        ]
      );
    });
    return phase;
  }
}
