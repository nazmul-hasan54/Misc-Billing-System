import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import { data } from 'jquery';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { setSubHeading } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misMinistryLedgerPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryPageMargin, misMinistrySummaryStyle, setAllCustomerArrearStyle, setFourthHeading, setHeading, setMosqueAndOtherPlacesStyles, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubSetHeading, ZoneCircleWiseAllReligiousPageMarginStyle } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class MinistryLedgerService {
  efaultColor: '';
  constructor() { }

  generatePdf(data: any, reportObj: any) {

    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private translateNumber(num, option=1){
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if(option==1){
      num = Number(num).toLocaleString(undefined, {minimumFractionDigits: 2})
    }
    return num.toString().replace(/\d/g, x=> banglaDigits[x]);
  }

  private getDocumentDefinition(data: any, reportObj: any) {
    return {
      info: {
        title: 'All Center Ministry Summary',
        author: 'BPDB',
        subject: 'All Center Ministry Summary',
        keywords: 'keywords for document',
        //creationDate: Date.now(),
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
      header: this.getHeading(data, reportObj),
        content: this.getMinistryLeder(data, reportObj),
      pageMargins: misMinistryLedgerPageMargin,
      //defaultStyle: ZoneCircleWiseAllReligiousPageMarginStyle,
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 8,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle
    }
  }

  private getHeading(data: any, reportObj: any) {
    let totalMinistry = data.length;
    let { billMonth } = reportObj;
    let day = this.translateNumber(dayjs(billMonth).format("DD"), 2); 
    let month: string;
    let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
    
    let previousYear: any = dayjs(billMonth).format("YYYY");
    // const noWorshipTotal = data.reduce((acc, o) => acc + parseInt(o.noWorship), 0);
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
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 60, 100, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-85, -2, 0, 0],
            },
            {},
            {
              text: `বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড`,
              style: [setHeading],
              colSpan: 5,
              margin: [-15, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {},
            {
              text: 'মিনিস্ট্রি লেজার',
              style: [setSubHeading],
              colSpan: 5,
              margin: [-70, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {
              text: `বিল মাস : ${day}-${month}-${year}`,
              style: [setSubSetHeading],
              colSpan: 5,
              margin: [-10, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {},
            {},
            {
              text: ``,
              style: [setFourthHeading, 'setLeft'],
              colSpan: 6,
              margin: [-135, 5, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {}
          ],
          [
            {},
            {
              text: ``,
              style: [setFourthHeading, 'setLeft'],
              colSpan: 6,
              margin: [-75, 5, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {
              text: `মোট গ্রাহকঃ ${this.translateNumber(totalMinistry, 2)}`,
              colSpan: 3
            },
            {},
            {}
          ],
        ]
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 6; },
      paddingBottom: function (i, node) { return 6; },
    }
  }

  private getMinistryLeder(data: any, reportObj: any) {
    let { billMonth } = reportObj;
    let day = this.translateNumber(dayjs(billMonth).format("DD"), 2); 
    let month: string;
    let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
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
      table: {
        dontBreakRows: true,
        widths: [20, '*', 80, 80, 75, 80],
        headerRows: 2,
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              text: `ক্রঃ নং`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `মন্ত্রনালয়ের নাম`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
            },
            {
              text: `পূর্বের বকেয়া বিল`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
            },
            {
              //text: `Curr Month Bill`,
              text: `${month}'${year} মাসের বিল`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
            },
            {
              //text: `Curr Month Collection`,
              text: `মোট আদায়`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
            },
            {
              //text: `Receivable`,
              text: `মোট বকেয়ার পরিমান`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
            },
          ],
          [
            {
              text: '১',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '২',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 1
            },
            {
              text: '৩',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৪',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৫',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৬=৩+৪-৫',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };


    let serial = 0;
    let grandTotalArrear = 0;
    let grandTotalCurrAmount = 0;
    let grandTotalReceiptAmount = 0;
    let grandTotalCurrArrear = 0;
    let grandLps = 0;
    let grandVat = 0;
    let previousReceiptArrear=0;
    let currentMonthBill=0;
    let totalCollectionAmount=0;
    let currentArrear=0;
    data.forEach(item => {
      let { 
          ministryNameBn, 
          // totalArrear, 
          // totalCurrAmount, 
          // totalReceipt, 
          // totalReceiptArrear 
          prevArrearAmt,
          currMonthBill,
          totalCollection,
          totalArrearAmt
        } = item;
      serial++;

      // previousReceiptArrear=totalArrear-totalReceiptArrear;
      // currentMonthBill=totalCurrAmount;
      // totalReceiptAmount=totalReceipt;
      // currentReceiptArrear=previousReceiptArrear+currentMonthBill-totalReceiptAmount;
      previousReceiptArrear=prevArrearAmt;
      currentMonthBill=currMonthBill;
      totalCollectionAmount=totalCollection;
      currentArrear=totalArrearAmt;


      grandTotalArrear += previousReceiptArrear;
      grandTotalCurrAmount += currentMonthBill;
      grandTotalReceiptAmount += totalCollectionAmount;
      grandTotalCurrArrear += currentArrear;

      phase.table.body.push(
        [
          {
            text: `${this.translateNumber(serial, 2)}`,
            style: ['setBlack'],
            border: [true, true, true, true,],
          },
          {
            text: `${ministryNameBn}`,
            style: ['setBlack', 'setLeft'],
            border: [true, true, true, true,],
          },
          {
            text: `${this.translateNumber(previousReceiptArrear.toFixed(2))}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${this.translateNumber(currentMonthBill.toFixed(2))}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${this.translateNumber(totalCollectionAmount.toFixed(2))}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
          {
            text: `${this.translateNumber(currentArrear.toFixed(2))}`,
            style: ['setBlack', 'setRight'],
            border: [true, true, true, true,],
          },
        ],
      );
    });


    phase.table.body.push(
      [
      
        {
          text: `মোট`,
          style: ['setBlack', 'setBold'],
          border: [true, true, true, true],
          colSpan: 2,
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true,],
        },
        {
          text: `${this.translateNumber(grandTotalArrear.toFixed(2))}`,
          style: ['setBlack', 'setBold', 'setRight'],
          border: [true, true, true, true,],
        },
        {
          text: `${this.translateNumber(grandTotalCurrAmount.toFixed(2))}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${this.translateNumber(grandTotalReceiptAmount.toFixed(2))}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
        {
          text: `${this.translateNumber(grandTotalCurrArrear.toFixed(2))}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true,],
        },
      ]
    );
    return phase;
  }
}
