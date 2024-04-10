import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misMinistrySummaryHeaderMargin, misMinistrySummaryPageMargin, misMinistrySummaryStyle, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setPouroshovaAndCityStyle } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class UntraceConsumerArrearInfonService {
  defaultColur = "#0c0d0d"

  constructor() { }

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
        title: 'Poultry',
        author: 'BPDB',
        subject: 'Poultry',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',    
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
      pageMargins: [30, 20, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setAllCustomerArrearStyle,

    };
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  // private getHeading(billMonth: any) {
  //   let dateBn = this.translateNumber(dayjs(billMonth).format('DD-MM-YY'), 2);
  //   let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
  //   let month: string;
  //   switch (dayjs(billMonth).format("M")) {
  //     case "1": {
  //       month = "জানুয়ারি"
  //       break
  //     }
  //     case "2": {
  //       month = "ফেব্রুয়ারী"
  //       break
  //     }
  //     case "3": {
  //       month = "মার্চ"
  //       break
  //     }
  //     case "4": {
  //       month = "এপ্রিল"
  //       break
  //     }
  //     case "5": {
  //       month = "মে"
  //       break
  //     }
  //     case "6": {
  //       month = "জুন"
  //       break
  //     }
  //     case "7": {
  //       month = "জুলাই"
  //       break
  //     }
  //     case "8": {
  //       month = "আগষ্ট"
  //       break
  //     }
  //     case "9": {
  //       month = "সেপ্টেম্বর"
  //       break
  //     }
  //     case "10": {
  //       month = "অক্টোবর"
  //       break
  //     }
  //     case "11": {
  //       month = "নভেম্বর"
  //       break
  //     }
  //     case "12":
  //     default:
  //       {
  //         month = "ডিসেম্বর"
  //         break
  //       }
  //   }
  //   return {
  //     table: {
  //       margin: [0, 0, 0, 0],
  //       widths: [50, 50, '*', '*', 60, 40],
  //       body: [

  //         [
  //           { border: [false, false, false, false], text: '' },
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //           {
  //             border: [false, false, false, false],
  //             text: 'অর্থ মন্ত্রণালয় কতৃক প্রদত্ত পোল্ট্রিশিল্পে ২০% রিবেট গ্রাহক তালিকা ।',
  //             colSpan: 2,
  //             bold: true,
  //             style: [setPoultryStyles.setHeading,setPoultryStyles.setBold],
  //             margin: [0, -5, 0, 0],
  //           },
  //           {},
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //         ],
  //         [
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //           { border: [false, false, false, false], text: '' },
  //           {
  //             border: [false, false, false, false],
  //             text: `${month}'${year} ইং পর্যন্ত ।`,
  //             bold: true,
  //             colSpan: 2,
  //             style: [setPoultryStyles.setHeading,],
  //             margin: [0, -3, 0, 0],
  //           },
  //           {},
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             colSpan: 2,
  //             style: ['setBig', 'setBlack', 'setLeft'],
  //           },
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //         ],
  //         [
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //           { border: [false, false, false, false], text: '' },
  //           {
  //             border: [false, false, false, false],
  //             text: `${dateBn}`,
  //             bold: true,
  //             colSpan: 2,
  //             style: [setPoultryStyles.setHeading,],
  //             margin: [0, -3, 0, 0],
  //           },
  //           {},
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             colSpan: 2,
  //             style: ['setBig', 'setBlack', 'setLeft'],
  //           },
  //           {
  //             text: '',
  //             border: [false, false, false, false],
  //             style: ['setBig'],
  //           },
  //         ],
  //       ],
  //     },
  //     layout: this.setTableBorder(),
  //   };
  // }

  // generatePdf(data: any, reportObject: any) {
  //   //@ts-ignore
  //   pdfMake.fonts = setPdfMakeFonts;
  //   //@ts-ignore
  //   const documentDefinition = this.getDocumentDefinition(data, reportObject);
  //   //@ts-ignore
  //   return pdfMake.createPdf(documentDefinition);
  // }

  // private getDocumentDefinition(data: any, reportObject: any) {
  //   return {
  //     info: {
  //       title: "Untraced Customer Arrear Info",
  //       author: "BPDB",
  //       subject: "Untraced Customer Arrear Info",
  //       keywords: "keywords for document",
  //     },
  //     pageSize: 'A4',
  //     // pageOrientation: 'landscape',    
  //     footer: (currentPage, PageCount)=> {
  //       return {
  //         table: {
  //           widths: ['*', '*'],
  //           body: [
  //             [
  //               { text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(PageCount, 2)}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }, 
  //               { text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
  //             ],
  //           ]
  //         },
  //         layout: 'noBorders'
  //       }
  //     },
  //     header: this.getHeading(data,reportObject),
  //     content: [this.UntraceableCustomerInfo(data)],
  //     pageMargins: [30, 150, 30, 30],
  //     defaultStyle: {
  //       font: 'bangla',
  //       alignment: 'center',
  //       fontSize: 7.4,
  //       color: '#111',
  //     },
  //     styles: setAllCustomerArrearStyle,

  //   };
  // }

  // private translateNumber(num, option = 1) {
  //   let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  //   if (option == 1) {
  //     num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
  //   }
  //   return num.toString().replace(/\d/g, x => banglaDigits[x]);
  // }

  private getHeading(data: any, reportObject: any){
    let { billMonth } = reportObject;
    let year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
    let month: string;
    switch (dayjs(billMonth).format("M")) {
      case "1": {
        month = "জানুয়ারি"
        break
      }
      case "2": {
        month = "ফেব্রুয়ারী"
        break
      }
      case "3": {
        month = "মার্চ"
        break
      }
      case "4": {
        month = "এপ্রিল"
        break
      }
      case "5": {
        month = "মে"
        break
      }
      case "6": {
        month = "জুন"
        break
      }
      case "7": {
        month = "জুলাই"
        break
      }
      case "8": {
        month = "আগষ্ট"
        break
      }
      case "9": {
        month = "সেপ্টেম্বর"
        break
      }
      case "10": {
        month = "অক্টোবর"
        break
      }
      case "11": {
        month = "নভেম্বর"
        break
      }
      case "12":
      default:
        {
          month = "ডিসেম্বর"
          break
        }
    }

    const phase = {
      //margin: [0, 20, 0, 0],
      table: {
        dontBreakRows: true,
        widths: ['*', 'auto', '*', 'auto'],
        //  headerRows: 5,
        // margin: [0, 20, 0, 0],
        body: [
          [
            {
              text: `নিখোঁজ গ্রাহকের বকেয়া আদায়ের তথ্য মে - ২৩`,
              style: [setHeading],
              colSpan: 3,
            },
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

  private UntraceableCustomerInfo(data: any){
    const phases = {
      margin: [0, 10, 0, 0],
      table: {
          // dontBreakRows: true,
          headerRows: 3,
          widths: [20, 70, 40, 50, 40, 50, 50, 40, 50, 50, 35, 45, 45, 30, 45],
          body: [
            [
              {
                text: `ক্রঃ নং`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:2
              },
              {
                text: `দপ্তরের নাম`,
                border: [true, true, true, true],
                style: ['setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:2
              },
              {
                text: `মোট নিখোঁজ গ্রাহকের সংখ্যা`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:2
              },
              {
                text: `নিখোঁজ গ্রাহকের বকেয়ার পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:2
              },
              {
                text: `রিপোর্টিং মাসের পূর্বের মাস পর্যন্ত`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 3,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `রিপোর্টিং মাস:`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 3,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `রিপোর্টিং মাস পর্যন্ত`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 3,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `অবশিষ্ট`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 2,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
            ],
            [
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: ``,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `সনাক্তকৃত গ্রাহক সংখ্যা`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `বকেয়ার পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `আদায়ের পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `সনাক্তকৃত গ্রাহক সংখ্যা`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `বকেয়ার পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `আদায়ের পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `সনাক্তকৃত গ্রাহক সংখ্যা`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `বকেয়ার পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `আদায়ের পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `নিখোঁজ গ্রাহকের সংখ্যা`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `বকেয়ার পরিমান (টাকা)`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
            ],
            [
              {
                text: `১`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `২`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৩`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৪`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৫`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৬`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৭`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৮`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `৯`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১০`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১১=৫+৮`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১২=৬+৯`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১৩=৭+১০`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১৪=৩-১১`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
              {
                text: `১৫=৪-১২`,
                border: [true, true, true, true],
                style: ['setBig2','setBold', 'setBlack'],
                colSpan: 1,
                rowSpan:1
              },
            ],
          ],
      }
    };

    phases.table.body.push(
      [
        {
          text: `মোট কুমিল্লা জোন`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 2,
          rowSpan: 1
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          style: ['setBig2','setBold', 'setBlack'],
          colSpan: 1,
          rowSpan: 1
        },
      ],
    );
    return phases;
  }

}
