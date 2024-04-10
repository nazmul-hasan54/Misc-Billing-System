import { setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setPouroshovaAndCityStyle, setSubHeading } from '../config/pdfMakeConfig';

import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';

@Injectable({
  providedIn: 'root'
})
export class IllegalConsumerPenaltyService {
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
        title: 'Illegal Consumer Penalty Received Info',
        author: 'BPDB',
        subject: 'Illegal Consumer Penalty Received Info',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',    
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
      content: [this.getHeading(data,reportObject), this.illegalCustomerPenalty(data)],
      // pageMargins: [30, 20, 30, 30],
      // defaultStyle: {
      //   font: 'bangla',
      //   alignment: 'center',
      //   fontSize: 4.4,
      //   color: '#111',
      // },
      // styles: setPouroshovaAndCityStyle,
      // styles: setAllCustomerArrearStyle,
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


  private translateNumbers(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 0 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  private getHeading(validDate: any, reportObject:any) {
    let billMonth= reportObject;
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
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 5,
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 4,
              colSpan: 2,
              alignment: 'right',
              margin: [-100, -6, 0, 0],
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
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              margin: [-20, -2, 0, 0],
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
              text: `অবৈধ গ্রাহকের জরিমানা আদায়ের তথ্য ${month} - ২৩ ইং`,
              style: [setSubHeading],
              margin: [0, -2, 0, 0],
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
              style: [],
              margin: [-20, -2, 0, 0],
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
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }
  // private getHeading(data: any, reportObject: any){
  //   let billMonth= reportObject;
  //   let year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
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

  //   const phase = {
  //     margin: [0, 10, 0, 0],
  //     table: {
  //       dontBreakRows: true,
  //       widths: ['*', '*', 'auto', '*', 'auto', 'auto', 'auto', 'auto'],
  //       body: [
  //         [
  //           {
  //             image: `logo.png`,
  //             width: 60,
  //             height: 55,
  //            rowSpan: 2,
  //             colSpan: 3,
  //             alignment: 'right',
              
  //            // margin: [0, 0, 0, 0],
  //            // border: [false, false, false, false],
  //           },
  //           {},
  //           {},
  //           {},
  //           {},
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
  //           {},
  //         ],

  //         [
  //           {},
  //           {},
  //           {},
  //           {
  //             text: `অবৈধ গ্রাহকের জরিমানা আদায়ের তথ্য ${month} - ২৩ ইং`,
  //             style: [setHeading],
  //             colSpan: 3,
  //           },
  //           {},
  //           {},
  //           {},
  //         ],
  //       ],
  //     },
  //     layout: 'noBorders', 
  //   };
  //   return phase;
  // }

  

  private illegalCustomerPenalty(data: any){
    const phases = {
      margin: [0, -30, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [20, '*', 40, 40, 40, 40, 40, 40, 40, 40, 40],
        body: [
          [
            {
              text: `ক্রঃ নং`,
              border: [true, true, true, true],
              style: [],
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
              text: `রিপোর্টিং মাসের পূর্বের মাস পর্যন্ত`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 3,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `রিপোর্টিং মাস:`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 3,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `ক্রমপুঞ্জিভূত`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 3,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
          ],
          [
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `অবৈধ গ্রাহক সংখ্যা`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `জরিমানার পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `আদায়ের পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `অবৈধ গ্রাহক সংখ্যা`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `জরিমানার পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `আদায়ের পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `অবৈধ গ্রাহক সংখ্যা`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `জরিমানার পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `আদায়ের পরিমান (টাকা)`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
          ],
          [
            {
              text: `১`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `২`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৩`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৪`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৫`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৬`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৭`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৮`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `৯=৩+৬`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `১০=৪+৭`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
            {
              text: `১১=৫+৮`,
              border: [true, true, true, true],
              style: ['setBold', 'setBlack'],
              colSpan: 1,
              rowSpan:1
            },
          ],
        ]
      }
    };
    let sl=0;
    let totalPrevCust=0;
    let totalPrevAmt=0;
    let totalPrevRecptAmt = 0;
    let totalCurrCust = 0;
    let totalCurrAmt = 0;
    let totalCurrRecptAmt = 0;
     let  totalCust=0;
     let totalAmt=0;
     let totalRecptAmt=0;

    data.forEach((d)=> {
      let { locationCode, prevAmount, prevConsumer, prevReceiptAmount, currAmount, currConsumer, currReceiptAmount, 
        totalConsumer, totalPenaltyAmount, totalReceiptAmount}=d;
      sl++;
      phases.table.body.push(
        [
          {
            // text: `${sl}`,
            text: `${this.translateNumbers(sl)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${locationCode}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumbers(prevConsumer)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(prevAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(prevReceiptAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumbers(currConsumer)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(currAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(currReceiptAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumbers(totalConsumer)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(totalPenaltyAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: `${this.translateNumber(totalReceiptAmount)}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
            rowSpan: 1
          },
        ],
      );
      totalPrevCust += prevConsumer
      totalPrevAmt += prevAmount
      totalPrevRecptAmt += prevReceiptAmount
      totalCurrCust += currConsumer
      totalCurrAmt += currAmount
      totalCurrRecptAmt += currReceiptAmount
      totalCust += totalConsumer
      totalAmt += totalPenaltyAmount
      totalRecptAmt += totalReceiptAmount
    });
    
    phases.table.body.push(
      [
        {
          text: `মোট কুমিল্লা জোন = `,
          border: [true, true, true, true],
          style: ['setBold', 'setBlack'],
          colSpan: 2,
          rowSpan:1
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumbers(totalPrevCust)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalPrevAmt)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalPrevRecptAmt) }`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumbers(totalCurrCust)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalCurrAmt)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalCurrRecptAmt)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumbers(totalCust)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalAmt)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
        {
          text: `${this.translateNumber(totalRecptAmt)}`,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
          rowSpan:1
        },
      ],
    );
    return phases;
  }
}
