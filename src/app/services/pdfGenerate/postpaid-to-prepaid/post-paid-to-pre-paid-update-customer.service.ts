import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setBillStyles, ministryDetailsPageMargin, ministryDetailsDefaultStyle, ministryDetailsStyle, ministryDetailsHeaderMargin } from "../config/pdfMakeConfig";
import { UntracedCustModel } from "../../../model/get-untraced-cust.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PostPaidToPrePaidUpdateCustomerService {
  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data: any,utilityObj:any,locationName:any) {
    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,utilityObj,locationName);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any,utilityObj:any,locationName:any) {
    return {
      info: {
        title: 'Postpaid To Prepaid Update Customer Info',
        author: 'BPDB',
        subject: 'Postpaid To Prepaid Update Customer Info',
        keywords: 'keywords for document',
      },
      pageSize: 'legal',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [-280, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [400, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data,utilityObj,locationName),
      content: [this.getPostToPrepaidUpdateCustomerInfo(data)],
      // pageMargins: ministryDetailsPageMargin,
      // defaultStyle: ministryDetailsDefaultStyle,
      // styles: ministryDetailsStyle,

      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 9,
        color: this.setColor,
      },
      styles: setBillStyles,
      pageMargins:  [30, 130, 30, 30],
    }
  }

  private getHeading(data: any,utilityObj:any,locationName:any) {
    const totalCount = data.length;
    let startDate= (utilityObj.startDate);
    let day = dayjs(startDate).format("DD"); 
    let month: string;
    let year = dayjs(startDate).format("YYYY");

    let endDate= (utilityObj.endDate);
    let endDay = dayjs(endDate).format("DD"); 
    let endMonth: string;
    let endYear = dayjs(endDate).format("YYYY");

    switch (dayjs(startDate).format("MM")) {
      case "01": {
        month = "January"
        break
      }
      case "02": {
        month = "February"
        break
      }
      case "03": {
        month = "March"
        break
      }
      case "04": {
        month = "April"
        break
      }
      case "05": {
        month = "May"
        break
      }
      case "06": {
        month = "June"
        break
      }
      case "07": {
        month = "July"
        break
      }
      case "08": {
        month = "August"
        break
      }
      case "09": {
        month = "September"
        break
      }
      case "10": {
        month = "October"
        break
      }
      case "11": {
        month = "November "
        break
      }
      case "12":
      default:
        {
          month = "December"
          break
        }
    };

    switch (dayjs(startDate).format("MM")) {
      case "01": {
        endMonth = "January"
        break
      }
      case "02": {
        endMonth = "February"
        break
      }
      case "03": {
        endMonth = "March"
        break
      }
      case "04": {
        endMonth = "April"
        break
      }
      case "05": {
        endMonth = "May"
        break
      }
      case "06": {
        endMonth = "June"
        break
      }
      case "07": {
        endMonth = "July"
        break
      }
      case "08": {
        endMonth = "August"
        break
      }
      case "09": {
        endMonth = "September"
        break
      }
      case "10": {
        endMonth = "October"
        break
      }
      case "11": {
        endMonth = "November "
        break
      }
      case "12":
      default:
        {
          endMonth = "December"
          break
        }
    };
    // if(roleName=='Admin'){
      const phase={
        margin: [0, 50, 0, 0],
        table: {
          // headerRows: 1,
          dontBreakRows: true,
          widths: [50, 50, '*', '*', 60, 40],
          body: [
            [
              {
                image: `logo.png`,
                width: 70,
                height: 60,
                rowSpan: 2,
                colSpan: 2,
                alignment: 'right',
                margin: [-275, -10, 0, 0],
                border: [false,false,false,false],
              },
              {},
              {
                text: `BANGLADESH POWER DEVELOPMENT BOARD`,
                style: ['setTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
              {},
            ],
            [
              {},
              {},
              {
                text: `Postpaid Consumer List From Prepaid`,
                style: ['setSubTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
              {},
            ],
            [
              {},
              {},
              {
                text: `From ${day}-${month}-${year} To ${endDay}-${endMonth}-${endYear}`,
                style: ['setSubTitleBold'],
                colSpan: 2,
                margin: [0, -18, 0, 0],
              },
              {},
              {},
              {}
  
            ],
            [
              {},
              {
                text: `Location: ${locationName}`,
                style: ['setLeft', 'setBold'],
                colSpan: 2,
                margin: [-25, 0, 0, 0],
              },
              {},
              {
                text: `Total Customer: ${totalCount}`,
                style: ['setRight','setBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
            ],
            [
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ]
        },
        layout: 'noBorders'
      }
      return phase;

    // else{
    //   const phase={
    //     margin: [0, 50, 0, 0],
    //     table: {
    //       // headerRows: 1,
    //       dontBreakRows: true,
    //       widths: [50, 50, '*', '*', 60, 40],
    //       body: [
    //         [
    //           {
    //             image: `logo.png`,
    //             width: 70,
    //             height: 60,
    //             rowSpan: 2,
    //             colSpan: 2,
    //             alignment: 'right',
    //             margin: [-275, -10, 0, 0],
    //             border: [false,false,false,false],
    //           },
    //           {},
    //           {
    //             text: `BANGLADESH POWER DEVELOPMENT BOARD`,
    //             style: ['setTitleBold'],
    //             colSpan: 2,
    //             margin: [0, 0, 0, 0],
    //           },
    //           {},
    //           {},
    //           {},
    //         ],
    //         [
    //           {},
    //           {},
    //           {
    //             text: `Postpaid Consumer List From Prepaid`,
    //             style: ['setSubTitleBold'],
    //             colSpan: 2,
    //             margin: [0, 0, 0, 0],
    //           },
    //           {},
    //           {},
    //           {},
    //         ],
    //         [
    //           {},
    //           {},
    //           {
    //             text: `From ${day}-${month}-${year} To ${endDay}-${endMonth}-${endYear}`,
    //             style: ['setSubTitleBold'],
    //             colSpan: 2,
    //             margin: [0, -18, 0, 0],
    //           },
    //           {},
    //           {},
    //           {}
  
    //         ],
    //         [
    //           {},
    //           {
    //             text: `Location: ${utilityObj.location}- ${utilityObj.locationName}`,
    //             style: ['setLeft', 'setBold'],
    //             colSpan: 2,
    //             margin: [-25, 0, 0, 0],
    //           },
    //           {},
    //           {
    //             text: `Total Customer: ${totalCount}`,
    //             style: ['setRight','setBold'],
    //             colSpan: 2,
    //             margin: [0, 0, 0, 0],
    //           },
    //           {},
    //           {},
    //         ],
    //         [
    //           {},
    //           {},
    //           {},
    //           {},
    //           {},
    //           {},
    //         ],
    //       ]
    //     },
    //     layout: 'noBorders'
    //   }
    //   return phase;
    // }
  }

  private getPostToPrepaidUpdateCustomerInfo(data: any) {
    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [20, 100, 100,'*', 100, 70, 70, 40, 100,80],
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
              text: `Customer Number`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Prepaid Customer Number`,
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
              text: `NID Number`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Mobile Number`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Power Utility`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Max Power`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Old Meter No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 8, 0, 0],
            },
            {
              text: `Customer Created Date`,
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
            text: `${value.prepaidCustomerNumber}`,
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
            text: `${value.nidNumber}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.mobileNo}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.powerUtility}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.maxPower}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.oldMeterNo}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.customerCreatedDate}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          }
        ]
      );
    });
    return phase;
  }
  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
}
