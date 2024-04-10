import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { misMinistrySummaryHeaderMargin, misMinistrySummaryPageMargin, misMinistrySummaryStyle, setMosqueAndOtherPlacesStyles, setPdfMakeFonts, ZoneCircleWiseAllReligiousPageMarginStyle } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class LocationWiseReligiousReportService {

  defaultColur = "#0c0d0d";

  constructor() { }

  generatePdf(data: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any){
    return {
      info: {
        title: 'Religious Location Wise Report',
        author: 'BPDB',
        subject: 'Religious Location Wise Report',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      //pageOrientation: 'portrait',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data),
      content: this.getReligiousReport(data),
      pageMargins: misMinistrySummaryPageMargin,
      defaultStyle: ZoneCircleWiseAllReligiousPageMarginStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any){
    //let { billMonth } = reportObj;
    // let month: string;
    // let year = dayjs(billMonth).format("YYYY");
    // let previousYear:any = dayjs(billMonth).format("YYYY");
    const noWorshipTotal= data.reduce((acc, o) => acc + parseInt(o.noWorship), 0);
    // switch (dayjs(billMonth).format("M")) {
    //   case "1": {
    //     month = "জানুয়ারি"
    //     break
    //   }
    //   case "2": {
    //     month = "ফেব্রুয়ারী"
    //     break
    //   }
    //   case "3": {
    //     month = "মার্চ"
    //     break
    //   }
    //   case "4": {
    //     month = "এপ্রিল"
    //     break
    //   }
    //   case "5": {
    //     month = "মে"
    //     break
    //   }
    //   case "6": {
    //     month = "জুন"
    //     break
    //   }
    //   case "7": {
    //     month = "জুলাই"
    //     break
    //   }
    //   case "8": {
    //     month = "আগষ্ট"
    //     break
    //   }
    //   case "9": {
    //     month = "সেপ্টেম্বর"
    //     break
    //   }
    //   case "10": {
    //     month = "অক্টোবর"
    //     break
    //   }
    //   case "11": {
    //     month = "নভেম্বর"
    //     break
    //   }
    //   case "12":
    //   default:
    //     {
    //       month = "ডিসেম্বর"
    //       break
    //     }
    // }
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [20, '*', 33, 70, 70, 70,70],
        margin: [0, 0, 0, 0],
        body: [
          
          [
            {
              border: [true, true, true, true],
              text: `For The Year 2020-2021`,
              style: [setMosqueAndOtherPlacesStyles.setBold,setMosqueAndOtherPlacesStyles.fontSize],
              alignment: 'center',
              colSpan: 7,
              
            },
            {},
            {},
            {},
            {},
            {},
            {}
          ]
        ],
      },
    };
    return phase;
  }

  private getReligiousReport(data: any){
    const phase ={
      margin:[0,0,0,0],
      table: {
        widths: [20, '*', 33, 70, 70, 70,70],
        //Heading
        body:[
          [
            {
              text: 'Sl No',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              text: 'Name of Zone/Circle/Esu',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 15, 0, 0],
              alignment: 'center'
            },
            {
              text: 'No. of Worship',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              alignment: 'center'
            },
            {
              text: 'Principal',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              text: 'LPS',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              text:'VAT(5%)',
              border: [true, true, true, true],
              margin: [0, 12, 0, 0],
              style: [],
            },
            {
              text:'Total',
              border: [true, true, true, true],
              margin: [0, 12, 0, 0],
              style: [],
            }
          ],
        ]
      },
      layout: this.setTableBorder(),
    };
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
