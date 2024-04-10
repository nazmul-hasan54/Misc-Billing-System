import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle , misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle } from "../config/pdfMakeConfig";
import { MiscUntracedCustModel, UntracedCustModel } from "../../../model/get-untraced-cust.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class UntraceableCustomerReportService {
  defaultColur = "#0c0d0d"
  
  constructor() {}

  generatePdf(data: any, reportObject: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, reportObject);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, reportObject: any) {
    return {
      info: {
        title: "Untraceable Customer",
        author: "BPDB",
        subject: "Untraceable Customer",
        keywords: "keywords for document",
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',    
      footer: (currentPage, PageCount)=> {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(PageCount, 2)}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }, 
                { text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      content: [this.getHeading(data,reportObject), this.UntraceableCustomerInfo(data)],
      pageMargins: [30, 0, 30, 30],
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



  private getHeading(data: any, reportObj: any){
    const totalCount = data.length;
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
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
              margin: [-25, -2, 0, 0],
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
              text: `Untraceable Customer List`,
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
              text: `Report Processing Month`,
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
              text: `Total Customer :\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -60, -10, 0],
              colSpan: 10,
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

  private UntraceableCustomerInfo(data: MiscUntracedCustModel[]) {
    let sl = 0;
    const phase = {
      margin: [0, -40, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        // heights: [10, 10.1, 10],
        widths: [15, "*", 130, 60, 70, "auto", 70],
        body: [
          [
            {
              text: `SL No`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Consumer Name`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Consumer Address`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Consumer No.`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Account Number`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Total Bill (Tk)`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
            {
              text: `Status / Date`,
              style: ["setBold",],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };
      data.forEach(item => {
        sl++;
        phase.table.body.push([
          {
            text: `${sl}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.name}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.addr}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.conNo}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.accountNo}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.tatalArrear}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
          {
            text: `${item.ucType} \n ${item.disDate}`,
            style: ["setBold",],
            border: [true, true, true, true],
          },
        ]);
      });
    
    return phase;
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
