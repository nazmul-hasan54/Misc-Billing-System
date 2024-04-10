import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { MinistrySummaryModel } from '../../../model/ministry.summary.model';
import { ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setBold, setFourthHeading, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ZoneWiseMinistrySummaryService {

  constructor() { }
  defaultColor = "";
  generatePdf(data: any, reportObj: any, utilityObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data, reportObj, utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any, utilityObj: any) {
    return {
      info: {
        title: 'All Ministry Zone wise Summary',
        author: 'EBCWEB',
        subject: 'All Ministry Zone wise Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'Legal',
      pageOrientation: 'landscape',


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
        this.getMinistry(data, reportObj, utilityObj)
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

  private getHeading(data: any, reportObj: any, utilityObj) {    

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
    const { runBillCycle, locDesc } = data[0];
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
              margin: [-250, -2, 0, 0],
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
              // text: `Zone Wise Ministry Summery Report`,
              text: `জোন অনুসারে মন্ত্রনালয়ের বকেয়া বিবরণী`,
              style: [setHeading],
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
              text: `${dateBn},${month}-${year} তারিখের অনাদায়ী পাওনা `,
              // text: `${dateBn} তারিখের অনাদায়ী পাওনা `,
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
          // row- 4
          [
            {},
            {},
            {
              // text: '(Govt., Semi Govt., Autonomous & Corporation)',
              text: 'বিভিন্ন সরকারি/আধা-সরকারি/স্বায়তশাসিত প্রতিষ্ঠান/কর্পোরেশন ',
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
          // row 5
          [
            {
              text: `মন্ত্রনালয়ের সংখ্যা: ${this.translateNumber(totalCount, 2)}`, 
              style: ['setRight', setSubSetHeading],
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
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
  private getMinistry(data: MinistrySummaryModel[], reportObj: any, utilityObj: any) {
    console.log(data);
    const phase = {
      margin: [5, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [30, '*', 30, 80, 30, 80, 30, 80, 30, 80, 30, 80],
        headerRows: 2,
        body: [
          [
            {
              text: "ক্রঃ নং",
              style: [setSubHeading], 
              rowSpan: 2,
              colSpan: 1

            },
            {
              text: "মন্ত্রণালয়",
              style: [setSubHeading], 
              rowSpan: 2
            },
            {
              text: "চট্টগ্রাম",
              style: [setSubHeading], 
              colSpan: 2
            },
            {},
            {
              text: "কুমিল্লা",
              style: [setSubHeading], 
              colSpan: 2
            },
            {},
            {
              text: "ময়মনসিংহ",
              style: [setSubHeading], 
              colSpan: 2
            },
            {},
            {
              text: "সিলেট ",
              style: [setSubHeading], 
              colSpan: 2
            },
            {},
            {
              text: "মোট",
              style: [setSubHeading], 
              colSpan: 2
            },
            {},
          ],
          [
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],
              colSpan: 1
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],
            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
            {
              text: "গ্রাহক সংখ্যা",
              style: ['setBold'],

            },
            {
              text: "মোট বকেয়ার পরিমাণ",
              style: ['setBold'],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };
    let dbctggNocTotal = 0;
    let dbctggArrPrnTotal = 0;
    let dbcomNOCTotal = 0;
    let dbcomArrPrnTotal = 0;
    let dbmymenNocTotal = 0;
    let dbmymenArrPrnTotal = 0;
    let dbsylNocTotal = 0;
    let dbsylArrPrnTotal = 0;
    let dbtangNocTotal = 0;
    let DbtangArrPrnTotal = 0;
    let dbjamNocTotal = 0;
    let dbjamArrPrnTotal = 0;
    let dbkishorNocTotal = 0;
    let dbkishorArrPrnTotal = 0;
    let dbmoulviNocTotal = 0;
    let dbmoulviArrPrnTotal = 0;
    let grandTotalNoc = 0;

    let grandBilTotal = 0;
    let totalBillTotal = 0;
    data.forEach((item, index) => {

   
      dbctggNocTotal += (item.chittagongCount ?? 0);
      dbctggArrPrnTotal += (item.chittagongTotalArrearAmt ?? 0);

      dbcomNOCTotal += (item.comillaCount ?? 0);
      dbcomArrPrnTotal += (item.comillaTotalArrearAmt ?? 0);

      dbmymenNocTotal += (item.mymensinghCount ?? 0);
      dbmymenArrPrnTotal += (item.mymensinghTotalArrearAmt ?? 0);

      dbsylNocTotal += (item.sylhetCount ?? 0);
      dbsylArrPrnTotal += (item.sylhetTotalArrearAmt ?? 0);

      dbtangNocTotal += (item.tangailCount ?? 0);
      DbtangArrPrnTotal += (item.tangailPrn ?? 0);

      dbjamNocTotal += (item.jamalpurCount ?? 0);
      dbjamArrPrnTotal += (item.jamalpurPrn ?? 0);

      dbkishorNocTotal += (item.kishoreganjCount ?? 0);
      dbkishorArrPrnTotal += (item.kishoreganjPrn ?? 0);

      dbmoulviNocTotal += (item.moulvibazarCount ?? 0);
      dbmoulviArrPrnTotal += (item.moulvibazarPrn ?? 0);
      // Grand_Total_Noc += (item. ?? 0);
      //TOTAL_BILL_Total += (TOTAL_BILL ?? 0);
      let totalNoc = item.chittagongCount+ item.jamalpurCount +item.kishoreganjCount + item.tangailCount + item.moulvibazarCount+ item.sylhetCount
      +item.comillaCount + item.mymensinghCount;

      let totalBill = item.chittagongTotalArrearAmt +item.comillaTotalArrearAmt + item.jamalpurPrn + item.mymensinghTotalArrearAmt + item.kishoreganjPrn
      +item.tangailPrn+ item.sylhetTotalArrearAmt + item.moulvibazarPrn;
      grandTotalNoc += totalNoc;
      grandBilTotal += totalBill;
      phase.table.body.push(
        [
          {
            text: `${this.translateNumber((index + 1), 2)}`, 
            style: [],
          },
          {
            text: item.ministryName ?? "",
            style: ['setLeft', 'setBold'],
          },
          {
            // text:item.chittagongCount.toString() ?? " ", // Chittagonj db code is 1
            text: `${this.translateNumber(item.chittagongCount, 2)}`, 
            style: [],
          },
          {
            // text: item.chittagongPrn ? item.chittagongPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            text: `${this.translateNumber(Number(item.chittagongTotalArrearAmt >0 ? item.chittagongTotalArrearAmt :"" ).toFixed(2))}`,
            style: ['setRight'],
          },
          {
            // text: item.comillaCount.toString() ?? "",
            text: `${this.translateNumber(item.comillaCount, 2)}`, 
            style: [],

          },
          {
            // text: item.comillaPrn ? item.comillaPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            text: `${this.translateNumber(Number(item.comillaTotalArrearAmt >0 ? item.comillaTotalArrearAmt :"" ).toFixed(2))}`,
            style: ['setRight'],
          },
          {
            // text: item.mymensinghCount.toString() ?? "",
            text: `${this.translateNumber(item.mymensinghCount, 2)}`, 
            style: [],

          },
          {
            // text: item.mymensinghPrn ? item.mymensinghPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            text: `${this.translateNumber(Number(item.mymensinghTotalArrearAmt >0 ? item.mymensinghTotalArrearAmt :"" ).toFixed(2))}`,
            style: ['setRight'],
          },
          {
            // text: item.sylhetCount.toString() ?? "",
            text: `${this.translateNumber(item.sylhetCount, 2)}`, 
            style: [],

          },
          {
            // text: item.sylhetPrn ? item.sylhetPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            text: `${this.translateNumber(Number(item.sylhetTotalArrearAmt >0 ? item.sylhetTotalArrearAmt :"" ).toFixed(2))}`,
            style: ['setRight'],
          },
          
          {
            // text: totalNoc.toString() ?? "",
            text: `${this.translateNumber(totalNoc, 2)}`, 
            style: [],

          },
          {
            // text: totalBill? totalBill.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            text: `${this.translateNumber(Number(totalBill >0 ? totalBill :"" ).toFixed(2))}`,
            style: ['setRight'],
          },
        ],
      )
    });
    phase.table.body.push(
      [
        {
          text: "সর্বমোট",
          style: ['setRight', 'setBold'],
          colSpan: 2

        },
        {
          text: "",
          style: [],
        },
        {
          // text: `${dbctggNocTotal}`,
          text: `${this.translateNumber(dbctggNocTotal, 2)}`, 
          style: [],

        },
        {
          // text: `${dbctggArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(dbctggArrPrnTotal >0 ? dbctggArrPrnTotal :"" ).toFixed(2))}`,
          style: ['setRight'],
        },
        {
          // text: `${dbcomNOCTotal}`,
          text: `${this.translateNumber(dbcomNOCTotal, 2)}`, 
          style: [],

        },
        {
          // text: `${dbcomArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(dbcomArrPrnTotal >0 ? dbcomArrPrnTotal :"" ).toFixed(2))}`,
          style: ['setRight'],
        },
        {
          // text: `${dbmymenNocTotal}`,
          text: `${this.translateNumber(dbmymenNocTotal, 2)}`, 
          style: [],

        },
        {
          // text: `${dbmymenArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(dbmymenArrPrnTotal >0 ? dbmymenArrPrnTotal :"" ).toFixed(2))}`,
          style: ['setRight'],
        },
        {
          // text: `${dbsylNocTotal}`,
          text: `${this.translateNumber(dbsylNocTotal, 2)}`, 
          style: [],

        },
        {
          // text: `${dbsylArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(dbsylArrPrnTotal >0 ? dbsylArrPrnTotal :"" ).toFixed(2))}`,
          style: ['setRight'],
        },
        
        {
          // text: `${grandTotalNoc}`,
          text: `${this.translateNumber(grandTotalNoc, 2)}`, 
          style: [],

        },
        {
          // text: `${grandBilTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(grandBilTotal >0 ? grandBilTotal :"" ).toFixed(2))}`,
          style: ['setRight'],
        },
      ],
    )
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
