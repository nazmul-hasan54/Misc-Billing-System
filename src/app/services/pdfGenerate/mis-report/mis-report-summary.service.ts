import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle , misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setFooterRight, setArrearSummaryStyle } from "../config/pdfMakeConfig";
import { UntracedCustModel } from "../../../model/get-untraced-cust.model";
import { PrepaidCustDataModel } from "../../../model/mis-report/prepaid-cust-data.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MisReportSummaryService {
  defaultColur = "#0c0d0d"
  constructor() { }

  generatePdf(data:PrepaidCustDataModel[], dbName: any) {
    console.log(dbName);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, dbName);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data:PrepaidCustDataModel[], dbName: string) {
    return {
      info: {
        title: "MIS Arrear Prepaid Customer Based on Offset",
        author: "BPDB",
        subject: "MIS Arrear Prepaid Customer Based on Offset",
        keywords: "keywords for document",
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
      header:[this.getHeading(data,dbName)],
      content: [this.ArrearPrepaidCustumer(data)],
      pageMargins: [30, 100, 30, 30],
      // pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle

    };
  }
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }


  private getHeading(data:PrepaidCustDataModel[], dbName: string){
    
    const totalCount = data.length;
    // let year = dayjs(utilityObj.billMonth).format("YYYY");
    // let month: string;
    // switch (dayjs(utilityObj.billMonth).format("M")) {
    //   case "1": {
    //     month = "January"
    //     break
    //   }
    //   case "2": {
    //     month = "February"
    //     break
    //   }
    //   case "3": {
    //     month = "March"
    //     break
    //   }
    //   case "4": {
    //     month = "April"
    //     break
    //   }
    //   case "5": {
    //     month = "May"
    //     break
    //   }
    //   case "6": {
    //     month = "June"
    //     break
    //   }
    //   case "7": {
    //     month = "July"
    //     break
    //   }
    //   case "8": {
    //     month = "August"
    //     break
    //   }
    //   case "9": {
    //     month = "September"
    //     break
    //   }
    //   case "10": {
    //     month = "October"
    //     break
    //   }
    //   case "11": {
    //     month = "November "
    //     break
    //   }
    //   case "12":
    //   default:
    //     {
    //       month = "December"
    //       break
    //     }
    // }

    const phase = {
      margin: [0, 30, 0, 0],
      table: {
        // dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-220, -2, 0, 0],
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
          [
            {},
            {},
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setNewConnectionStyle.setTitleBold],
              colSpan: 5,
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
            {},
            {},
            {
              text: `${dbName} Computer Center`,
              style: [setSubSetHeading],
              colSpan: 5,
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
            {},
            {},
            {
              text: `Location Wise All Customer Arrear Summary              `,
              style: [setSubSetHeading],
              colSpan: 5,
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
            {},
            {},
            {
              text: ``,
              style: [setSubSetHeading],
              colSpan: 5,
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
            {},
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
          [
            {
              text: `Total Location :\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [-40,-27,0, 0],
              colSpan: 9,
              bold: true
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
  private ArrearPrepaidCustumer(data:PrepaidCustDataModel[]) {
    
    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        // headerRows: 1,
        widths: [80, '*', 90, 90, 90, 90, 90],
        body: [
          [
            {
              text: `Location Code`,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Div/ ESU Name`,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
            {
              text: `No. Of Consumer`,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
            {
              text: `Arrear PRN (Tk)`,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
            {
              text: `Arrear VAT (Tk) `,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
            {
              text: `Arrear LPS (Tk) `,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
            {
              text: `Total Bill (Tk)`,
              style: ["setBold",setArrearSummaryStyle.setBig],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };
    
    let sumNoOfConsumer = 0;
    let sumOfArrearPrn = 0;
    let sumOfArrearLps = 0;
    let sumOfArrearVat = 0;
    let sumOfTotalArrear = 0;

    data.forEach((item: PrepaidCustDataModel) => {
      sumNoOfConsumer += item.noOfConsumer;
      sumOfArrearPrn += item.principalArrear;
      sumOfArrearLps += item.lpsArrear;
      sumOfArrearVat += item.vatArrear;
      sumOfTotalArrear += item.totalArrear;
      phase.table.body.push([
        {
          text:item.locationCode ?? '',
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:item.office ?? '',
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:item.noOfConsumer.toString(),
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${item.principalArrear  ? Number(item.principalArrear ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${item.vatArrear  ? Number(item.vatArrear ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${item.lpsArrear  ? Number(item.lpsArrear ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${item.totalArrear  ? Number(item.totalArrear ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        // {
        //   text: Number(PRINCIPAL_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        //   style: ['setBlack', 'setRight'],
        //   border: [false, true, false, true],
        // },
      ]);
    });
phase.table.body.push([
        {
          text:'Grand Total',
          style: ['setBlack', 'setRight','setBold'],
          border: [true, true, true, true],
          colSpan: 2
        },
        {
          text:'',
          style: ['setBlack', 'setLeft'],
          border: [true, true, true, true],
        },
        {
          text: sumNoOfConsumer.toString(),
          style: ['setBlack', 'setLeft','setBold',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${sumOfArrearPrn  ? Number(sumOfArrearPrn ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft','setBold',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${sumOfArrearVat  ? Number(sumOfArrearVat ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft','setBold',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${sumOfArrearLps  ? Number(sumOfArrearLps ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft','setBold',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        {
          text:`${sumOfTotalArrear  ? Number(sumOfTotalArrear ).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
          style: ['setBlack', 'setLeft','setBold',setArrearSummaryStyle.setText],
          border: [true, true, true, true],
        },
        // {
        //   text: Number(PRINCIPAL_ARREAR ?? 0.0).toLocaleString(undefined, { minimumFractionDigits: 2 }),
        //   style: ['setBlack', 'setRight'],
        //   border: [false, true, false, true],
        // },
      ]);

    return phase;
  }
}
