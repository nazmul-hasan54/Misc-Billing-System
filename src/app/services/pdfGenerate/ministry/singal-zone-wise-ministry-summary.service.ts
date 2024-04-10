import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { MinistrySummaryModel } from '../../../model/ministry.summary.model';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
import { setFourthHeading } from '../../../@core/pdfMakeConfig/pdf-make-config';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class SingalZoneWiseMinistrySummaryService {

  constructor() { }
  defaultColor = "";
  generatePdf(data: any, reportObj: any, utilityObj: any){
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data, reportObj, utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, reportObj: any, utilityObj: any){
    return {
      info: {
        title: 'All Ministry Individual Zone Wise Summary',
        author: 'EBCWEB',
        subject: 'All Ministry Individual Zone Wise Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      footer: (currentPage, pageCount) => {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(pageCount, 2)}`,
                  style: ['setFooterLeft'],
                  margin: [30, 5, 30, 0],
                },
                {
                  text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2),
                  style: ['setFooterRight'],
                  margin: [30, 5, 30, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },
      header: this.getHeading(data, reportObj, utilityObj),

      content: [
        this.getSingalZoneWiseMinistry(data, reportObj, utilityObj)
      ],
      pageMargins: [30, 120, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any){
    let dateBn = this.translateNumber(dayjs(reportObj).format('DD'),2);
    let year = this.translateNumber(dayjs(reportObj).format("YY"), 2);
    let month: string;
    switch (dayjs(reportObj).format("M")) {
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
    const totalCount = data.length;
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-90, 3, 0, 0],
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
          // // row 2
          [
            {},
            {},
            {
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              colSpan: 5,
              margin: [10, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // // row 2
          [
            {},
            {},
            {
              text: `${utilityObj.zone} জোন`,
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

          // row 3
          [
            {},
            {},
            {
              // text: `Accounts Receivable As On ${utilityObj.billMonth ?? ''}`,
              text: `${dateBn},${month}-${year} তারিখের অনাদায়ী পাওনা `,
              style: [setFourthHeading],
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
          // row- 4
          [
            {},
            {},
            {
              // text: '(Govt., Semi Govt., Autonomous & Corporation)',
              text: 'বিভিন্ন সরকারি/আধা-সরকারি/স্বায়তশাসিত প্রতিষ্ঠান/কর্পোরেশন ',
              style: [setFourthHeading],
              colSpan: 5,
              margin: [10, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // row 5
          [
            {
              text: `মন্ত্রনালয়ের সংখ্যা: ${this.translateNumber(totalCount, 2)}`, 
              // text: `Total Ministry:\t${totalCount}`,
              style: ['setRight', setFourthHeading],
              margin: [0, 0, 0, 0],
              colSpan: 10,
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

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 7; },
      paddingBottom: function (i, node) { return 7; },
    }
  }

  private getSingalZoneWiseMinistry(data: MinistrySummaryModel[], reportObj: any, utilityObj: any){
    const phase = {
      margin: [10, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [20, '*', 50,65,65,65,65],
        //headerRows: 2,
        body: [
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBold', 'setBig'],
              colSpan: 1
            },
            {
              text: "মন্ত্রণালয়",
              style: ['setBold', 'setBig'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold', 'setBig'],
            }, 
            {
              text: "পূর্বের বকেয়ার পরিমাণ",
              style: ['setBold', 'setBig'],
            },
            {
              text: "মাসের বিল",
              style: ['setBold', 'setBig'],
            },
            {
              text: "মোট আদায়",
              style: ['setBold', 'setBig'],
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold', 'setBig'],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };

    let serial = 0;
    let nocValue = 0;
    let prnValue = 0;

    let prevArrearAmt=0;
    let currMonthBill=0;
    let collectionAmt=0;
    let totalArrearAmt=0;

    let grandTotalNoc = 0;
    let grandprevArrearAmt = 0;
    let grandcurrMonthBill = 0;
    let grandcollectionAmt = 0;
    let grandtotalArrearAmt = 0;
    data.forEach(item => {
      serial++;
      nocValue = item.chittagongCount != 0 ? item.chittagongCount : 0 || item.comillaCount != 0 ? item.comillaCount : 0 || item.sylhetCount != 0 
      ? item.sylhetCount : 0 || item.mymensinghCount != 0 ? item.mymensinghCount : 0;

      prnValue = item.chittagongPrn != 0 ? item.chittagongPrn : 0 || item.comillaPrn != 0 ? item.comillaPrn : 0 || item.sylhetPrn != 0 
      ? item.sylhetPrn : 0 || item.mymensinghPrn != 0 ? item.mymensinghPrn : 0;
      // mymensingPrevArrearAmt: number;
      // mmensingCurrMonthBill: number;
      // mymensingCollectionAmt: number;
      // mymensingTotalArrearAmt: number;
      prevArrearAmt=item.chittagongPrevArrearAmt !=0 ?item.chittagongPrevArrearAmt:0||item.comillaPrevArrearAmt!=0?item.comillaPrevArrearAmt:0||item.sylhetPrevArrearAmt!=0?item.sylhetPrevArrearAmt:0||item.mymensinghPrevArrearAmt!=0?item.mymensinghPrevArrearAmt:0;
      currMonthBill=item.chittagongCurrMonthBill !=0 ?item.chittagongCurrMonthBill:0||item.comillaCurrMonthBill!=0?item.comillaCurrMonthBill:0||item.sylhetCurrMonthBill!=0?item.sylhetCurrMonthBill:0||item.mymensinghCurrMonthBill!=0?item.mymensinghCurrMonthBill:0;
      collectionAmt=item.chittagongCollectionAmt !=0 ?item.chittagongCollectionAmt:0||item.comillaCollectionAmt!=0?item.comillaCollectionAmt:0||item.sylhetCollectionAmt!=0?item.sylhetCollectionAmt:0||item.mymensinghCollectionAmt!=0?item.mymensinghCollectionAmt:0;
      totalArrearAmt=item.chittagongTotalArrearAmt !=0 ?item.chittagongTotalArrearAmt:0||item.comillaTotalArrearAmt!=0?item.comillaTotalArrearAmt:0||item.sylhetTotalArrearAmt!=0?item.sylhetTotalArrearAmt:0||item.mymensinghTotalArrearAmt!=0?item.mymensinghTotalArrearAmt:0;
      grandTotalNoc += nocValue;
      grandprevArrearAmt += prevArrearAmt;
      grandcurrMonthBill += currMonthBill;
      grandcollectionAmt += collectionAmt;
      grandtotalArrearAmt += totalArrearAmt;
      phase.table.body.push(
        [
          {
            text: `${this.translateNumber(serial, 2)}`, 
            style: ['setCenter'],
          },
          {
            text: `${item.ministryName}`,
            style: ['setLeft'],
          },
          {
            text: `${this.translateNumber(nocValue, 2)}`, 
            style: ['setRight'],
          },
          // {
          //   text: `${this.translateNumber(Number(prnValue >0 ? prnValue :0 ).toFixed(2))}`,
          //   style: ['setRight'],
          // },
          {
            text: `${this.translateNumber(Number(prevArrearAmt> 0 ? prevArrearAmt :0 ).toFixed(2))}`,
            // text: ``,
            style: ['setRight'],
          },
          {
            text: `${this.translateNumber(Number(currMonthBill >0 ? currMonthBill :0 ).toFixed(2))}`,
            // text: ``,
            style: ['setRight'],
          },
          {
            text: `${this.translateNumber(Number(collectionAmt >0 ? collectionAmt :0 ).toFixed(2))}`,
            // text: ``,
            style: ['setRight'],
          },
          {
            text: `${this.translateNumber(Number(totalArrearAmt >0 ? totalArrearAmt :0 ).toFixed(2))}`,
            // text: ``,
            style: ['setRight'],
          }
        ]
      );
    })

    phase.table.body.push(
      [
        {
          text: ``,
          style: [],
        },
        {
          text: `সর্বমোট`,
          style: ['setBold', 'setBig'],
        },
        {
          text: `${this.translateNumber(grandTotalNoc, 2)}`, 
          style: ['setBold', 'setRight', 'setBig'],
        },
        // {
        //   text: `${this.translateNumber(Number(granTotalPrincipal >0 ? granTotalPrincipal :0 ).toFixed(2))}`,
        //   style: ['setBold', 'setRight', 'setBig'],
        // },
        {
          text: `${this.translateNumber(Number(grandprevArrearAmt >0 ? grandprevArrearAmt :0 ).toFixed(2))}`,
          // text: ``,
          style: ['setRight'],
        },
        {
          text: `${this.translateNumber(Number(grandcurrMonthBill >0 ? grandcurrMonthBill :0 ).toFixed(2))}`,
          // text: ``,
          style: ['setRight'],
        },
        {
          text: `${this.translateNumber(Number(grandcollectionAmt >0 ? grandcollectionAmt :0 ).toFixed(2))}`,
          // text: ``,
          style: ['setRight'],
        },
        {
          text: `${this.translateNumber(Number(grandtotalArrearAmt >0 ? grandtotalArrearAmt :0 ).toFixed(2))}`,
          // text: ``,
          style: ['setRight'],
        },
      ]
    );
    return phase;
  }
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
}
