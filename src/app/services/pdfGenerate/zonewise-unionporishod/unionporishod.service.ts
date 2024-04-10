import { Unionparishad } from './../../../model/unionparishad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';

import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, misMinistryArrearStyle, setHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';


@Injectable({
  providedIn: 'root'
})
export class UnionporishodService {

  defaultColor = '#000000';
  constructor() { }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
  generatePdf(data: any, reportObj: any, zoneData: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data,reportObj, zoneData);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any, zoneData: any) {
    return {
      info: {
        title: 'Zone Wise UnionParishod Arrear',
        author: 'BPDB',
        subject: 'Zone Wise UnionParishod Arrear',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',

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

      header: this.getMunicipalZoneSummaryHeading(reportObj),
      background: function (currentPage, pageSize) {
        return [
          {
            
            svg: `<svg height="820" width="445">
              <line x1="-80" y1="802" x2="70" y2="802" style="stroke:#111;stroke-width:1" />
            </svg>`
           
          }
        ]
      },
      content: [
        this.getMunicipalZoneSummaryReport(data, reportObj, zoneData)

      ],
      pageMargins: [30, 100, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle,
    };
  }
  
  private getMunicipalZoneSummaryHeading(reportObj: any) {
    let decreateDate = dayjs(reportObj.billMonth).add(-1, 'month').format('YYYYMM');
    let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
    let month = this.getBanglaMonth(decreateDate);
    
    const phase = {
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        //  headerRows: 1,
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
              margin: [-135, 0, 0, 0],
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
              text: [`জোন অনুসারে ইউনিয়ন পরিষদ বকেয়া বিবরনী`],
              style: [setSubHeading],
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
              text:`${month}-${year} ইং পর্যন্ত`,
              style: [setSubSetHeading],
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


  private getMunicipalZoneSummaryReport(data: any, reportObj: any, zoneData: any) {
    let decreateDate = dayjs(reportObj.billMonth).add(-1, 'month').format('YYYYMM');
    let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
    let month = this.getBanglaMonth(decreateDate);
    
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 2,
        widths: [35, 60, '*',40, 50,50,50,50],
        body: [
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'সংস্থা বা কোম্পানি',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 0,
              colSpan: 1
            },
            {
              text: 'ইউনিয়ন পরিষদ',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'গ্রাহক সংখ্যা',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'পূর্বের বকেয়ার পরিমান (কোটি টাকায়)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text:`${month}'${year} মাসের বিল`,
              // text: 'মাসের বিল',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'মোট আদায় (কোটি টাকায়)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'বর্তমান বকেয়ার পরিমান (কোটি টাকায়)',
              style: ['setBlack'],
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
              text: '৬',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৭',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৮=৫+৬-৭',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };

    let no = 0;
    let grandPrevMonthArrearAmtTotal = 0;
    let grandCurrMonthArrearAmountTotal = 0;
    let grandReceiptAmtTotal = 0;
    let grandArrearAmtTotal = 0;
    let grandTotalCustomer = 0;
    
    zoneData.forEach(item => {
      let dataGroupByZone = data.filter(x => x.code == item.code);
      let dataGroupLength = dataGroupByZone.length;
      if (dataGroupLength > 0) {

        let prevMonthArrearAmtTotal = 0;
        let currMonthArrearAmountTotal = 0;
        let receiptAmtTotal = 0;
        let arrearAmtTotal = 0;
        let zoneTotalCustomer = 0;

        let ZoneInsert = Math.floor(Number(dataGroupLength / 2));
        let zoneNumebr = 0;
        dataGroupByZone.forEach(item => {
          let { zoneName, unionPorishodName, prevMonthArrearAmt,currMonthArrearAmount,totalReceiptAmt,totalArrearAmt,totalCustomer} = item;
          zoneName = `বাবিউবো, ${zoneName}`

          prevMonthArrearAmtTotal += prevMonthArrearAmt;
          currMonthArrearAmountTotal += currMonthArrearAmount;
          receiptAmtTotal += totalReceiptAmt;
          arrearAmtTotal += totalArrearAmt;
          zoneTotalCustomer += Number(totalCustomer);

          no += 1;
          zoneNumebr += 1;
          phases.table.body.push(
            [
              { 
                text: `${this.translateNumber(no, 2)}`, 
                style: [], 
                border: [true, true, true, true] 
              },
              {
                text: zoneNumebr == ZoneInsert ? zoneName : '',
                style: ['setBlack','setLeft'],
                border: [false, false, false, false],
                rowSpan: 1,
                // no == ZoneInsert ? (Number(dataGroupLength) - ZoneInsert) :
                colSpan: 1
              },
              {
                text: unionPorishodName ?? '',
                style: ['setBlack', 'setLeft'],
                border: [true, true, true, true],
              },
              {
                text: `${this.translateNumber(totalCustomer).includes('.') ? this.translateNumber(totalCustomer).substring(0, this.translateNumber(totalCustomer).length - 3) : this.translateNumber(totalCustomer)}`,
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                // text: `${arrearAmt}`,
                text: this.translateNumber(Number(prevMonthArrearAmt / 10000000 >0 ? prevMonthArrearAmt / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(currMonthArrearAmount / 10000000 >0 ? currMonthArrearAmount / 10000000 :0).toFixed(3)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(totalReceiptAmt / 10000000 >0 ? totalReceiptAmt / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(totalArrearAmt / 10000000 >0 ? totalArrearAmt / 10000000 :0).toFixed(2)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
            ]
          )
        });
        //Total UnionPorishod
        phases.table.body.push(
          [
            { 
              text: ``, 
              style: [], 
              border: [true, true, true, true] 
            },
            {
              text: "মোট",
              style: ['setBlack', 'setCenter'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 2
            },
            {
              text: '',
              style: ['setBlack', 'setLeft'],
              border: [false, true, true, true],
            },
            {
              text: `${this.translateNumber(zoneTotalCustomer).includes('.') ? this.translateNumber(zoneTotalCustomer).substring(0, this.translateNumber(zoneTotalCustomer).length - 3) : this.translateNumber(zoneTotalCustomer)}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(prevMonthArrearAmtTotal / 10000000 >0 ? prevMonthArrearAmtTotal / 10000000 :0).toFixed(3)),
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(currMonthArrearAmountTotal / 10000000 >0 ? currMonthArrearAmountTotal / 10000000 :0).toFixed(3)),
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(receiptAmtTotal / 10000000>0 ? receiptAmtTotal / 10000000 :0).toFixed(3)),
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(arrearAmtTotal / 10000000 >0 ? arrearAmtTotal / 10000000 :0).toFixed(2)),
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
          ]
        )

        grandPrevMonthArrearAmtTotal += prevMonthArrearAmtTotal;
        grandCurrMonthArrearAmountTotal +=currMonthArrearAmountTotal;
        grandReceiptAmtTotal +=receiptAmtTotal;
        grandArrearAmtTotal += arrearAmtTotal;
        grandTotalCustomer += zoneTotalCustomer;
      }

    });
    phases.table.body.push(
      [
        { text: ``, style: [], border: [true, true, true, true] },
        {
          text: "সর্বমোট",
          style: ['setBlack', 'setCenter', 'setBold'],
          border: [true, true, true, true],
          rowSpan: 1,
          colSpan: 2
        },
        {
          text: '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, true, true],
        },
        {
          text: `${this.translateNumber(grandTotalCustomer).includes('.') ? this.translateNumber(grandTotalCustomer).substring(0, this.translateNumber(grandTotalCustomer).length - 3) : this.translateNumber(grandTotalCustomer)}`,
          style: ['setBlack', 'setCenter'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandPrevMonthArrearAmtTotal / 10000000 >0 ? grandPrevMonthArrearAmtTotal / 10000000 :0).toFixed(3)),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandCurrMonthArrearAmountTotal / 10000000 >0 ? grandCurrMonthArrearAmountTotal / 10000000 :0).toFixed(3)),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandReceiptAmtTotal / 10000000 >0 ? grandReceiptAmtTotal / 10000000 :0).toFixed(3)),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandArrearAmtTotal / 10000000 >0 ? grandArrearAmtTotal / 10000000 :0).toFixed(2)),
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
      ]
    )
    return phases;
  }

  private toFixedNumber(num, digits, base) {
    var pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
  }
  
  private getBanglaMonth(billMonth: string): string{
    let month='';
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
    return month;
  }
}
