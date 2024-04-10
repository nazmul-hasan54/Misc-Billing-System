import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';

import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, misMinistryArrearStyle, setHeading} from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';


@Injectable({
  providedIn: 'root'
})
export class PourAndCityCorporBanglaService {

  defaultColor = '#000000';
  constructor() { }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
  generatePdf(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
     //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(
      data,
      reportObj, zoneData, cityCorporationData
    );
     //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
    return {
      info: {
        title: 'City Corporation Report',
        author: 'BPDB',
        subject: 'City Corporation Report',
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
            //   canvas: [
            //     // { type: 'line', x1: 5, y1: 5, x2: 590, y2: 5, lineWidth: 1 }, //Up line
            //     // { type: 'line', x1: 5, y1: 5, x2: 5, y2: 835, lineWidth: 1 }, //Left line
            //     { type: 'line', x1: 5, y1: 807.5, x2: 500, y2: 807.5, lineWidth: 1 }, //Bottom line
            //     // { type: 'line', x1: 590, y1: 5, x2: 590, y2: 835, lineWidth: 1 }, //Rigth line
            //   ],
            // svg: `<svg height="820" width="445">
            //   <line x1="-80" y1="795.8" x2="138.2" y2="795.8" style="stroke:#111;stroke-width:1" />
            // </svg>`

          }
        ]
      },
      content: [
        this.getMunicipalZoneSummaryReport(data, reportObj, zoneData, cityCorporationData)

      ],
      pageMargins: [30, 80, 30, 30],
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
    
  //let decreateDate = dayjs(reportObj.billMonth).add(0, 'month').format('YYYYMM');
  let year = this.translateNumber(dayjs(reportObj.billMonth).format("YYYY"), 2);
  let month = this.getBanglaMonth(reportObj.billMonth);

    const phase = {
      margin: [0, 10, 0, 0],
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
              margin: [-140, 0, 0, 0],
            },
            {},
            { 
              text: '', 
              colSpan: 8, 
              border: [false, false, false, false] 
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
              text: [` সিটি কর্পোরেশন ও পৌরসভা বকেয়া বিবরনী`],
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


  private getMunicipalZoneSummaryReport(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
    console.log('ferferf',data)
    let zoneSort3RdZone: any;
    let zoneSort4RdZone: any;
    zoneSort3RdZone = zoneData.pop();

    zoneSort4RdZone = zoneData.pop();
    zoneData.push(zoneSort3RdZone);
    zoneData.push(zoneSort4RdZone)
    //console.log(zoneData);
    
  let decreateDate = dayjs(reportObj.billMonth).add(-1, 'month').format('YYYYMM');
  let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
  let month = this.getBanglaMonth(decreateDate);
    
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 2,
        widths: [25, 60, '*', 35, 50, 45,50,50],
        body: [
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, false],
              
            },
            {
              text: 'সংস্থা বা কোম্পানি',
              style: ['setBlack'],
              border: [true, true, true, false],
              
              colSpan: 1
            },
            {
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ',
              style: ['setBlack'],
              border: [true, true, true, false],
              
            },
            {
              text: 'গ্রাহক সংখ্যা',
              style: ['setBlack'],
              border: [true, true, true, false],
              
            },
            {
              text: 'পূর্বের বকেয়ার পরিমান (কোটি টাকায়)',
              style: ['setBlack'],
              border: [true, true, true, false],
              
            },
            {
              text: `${month}'${year} মাসের বিল`,
              style: ['setBlack'],
              border: [true, true, true, true],
             
              colSpan: 1
            },
            {
              text: 'মোট আদায় (কোটি টাকায়)',
              style: ['setBlack'],
              border: [true, true, true, true],
              
            },
            {
              text: 'বর্তমান বকেয়ার পরিমান (কোটি টাকায়)',
              style: ['setBlack'],
              border: [true, true, true, false],
              
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
              text: '৮(৫+৬)',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };

    //Grand Total=(Total City Corporation+PouroShova Total)
    
    let grandPrevArrAmount = 0;
    let grandCurrMonthBillAmount = 0;
    let grandCurrTotalReceiptAmount = 0;
    let grandCurrTotalArrAmount = 0;
    let grandNumberOfCustomer = 0;

    //Total City Corporation
    let cityPrevArrearAmtTotal = 0;
    let cityCurrMonthBillTotalAmt=0;
    let cityCurrTotalArrAmount=0;
    let cityTotalReceiptAmount = 0;
    let cityCurrTotalnoOfConsumer = 0;

    
    let cityLength = cityCorporationData.length
    let cityInsert = Math.ceil(Number(cityLength / 2));
    let cityNumebr = 0;
    let no = 0;
    cityCorporationData.forEach(city => {
      
      data.forEach(item => {
        if(city.code == item.cityCode){
          let { cityNamebn, prevMonth, currBill,receiptVat,receiptPrn, prevArrAmount, currMonthBillAmount, currTotalArrAmount, currReceiptAmount,arrearReceiptAmount,totalReceiptAmount,noOfConsumer} = item;
          no += 1;
          
          //City Corporation Total
          cityPrevArrearAmtTotal += prevArrAmount;
          cityCurrMonthBillTotalAmt += currMonthBillAmount;
          cityTotalReceiptAmount += totalReceiptAmount;
          cityCurrTotalArrAmount += currTotalArrAmount;
          cityCurrTotalnoOfConsumer += Number(noOfConsumer);

          cityNumebr += 1;
          phases.table.body.push(
            [
              { 
                text: `${this.translateNumber(no, 2)}`, 
                style: [], 
                border: [true, true, true, true] 
              },

              {
                text: cityNumebr == cityInsert ? "বাবিউবো" : "",
                style: ['setBlack'],
                border: [false, false, false, false],
                rowSpan: 1,
                // no == ZoneInsert ? (Number(dataGroupLength) - ZoneInsert) :
                colSpan: 1
              },
              {
                text: cityNamebn ?? '',
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: `${this.translateNumber(noOfConsumer).includes('.') ? this.translateNumber(noOfConsumer).substring(0, this.translateNumber(noOfConsumer).length - 3) : this.translateNumber(noOfConsumer)}`,
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(prevArrAmount/ 10000000 >0 ? prevArrAmount/ 10000000 :0 ).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(currMonthBillAmount / 10000000>0 ? currMonthBillAmount/ 10000000 :0 ).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(totalReceiptAmount  / 10000000>0 ? totalReceiptAmount/ 10000000 :0).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(currTotalArrAmount/ 10000000 >0 ? currTotalArrAmount/ 10000000 :0 ).toFixed(3))}`,
                // text: `${this.translateNumber(Number(currTotalArrAmount).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
            ]
          )
        }
      });
    });

      //Total City Corporation
    if(cityCurrTotalnoOfConsumer>0){
      phases.table.body.push(
        [
          {
            text: ``, 
            style: [], 
            border: [true, true, true, true]
          },
          {
            text: "মোট",
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
            text: `${this.translateNumber(cityCurrTotalnoOfConsumer).includes('.') ? this.translateNumber(cityCurrTotalnoOfConsumer).substring(0, this.translateNumber(cityCurrTotalnoOfConsumer).length - 3) : this.translateNumber(cityCurrTotalnoOfConsumer)}`,
            style: ['setBlack', 'setCenter'],
            border: [true, true, true, true],
          },
          {
            text: this.translateNumber(Number(cityPrevArrearAmtTotal / 10000000 >0 ? cityPrevArrearAmtTotal/ 10000000 :0).toFixed(3)),
            style: ['setBlack', 'setRight', 'setBold'],
            border: [false, true, true, true],
          },
          {
            text: this.translateNumber(Number(cityCurrMonthBillTotalAmt / 10000000 >0 ? cityCurrMonthBillTotalAmt/ 10000000 :0).toFixed(3)),
            style: ['setBlack', 'setRight', 'setBold'],
            border: [false, true, true, true],
          },
          {
            text: this.translateNumber(Number(cityTotalReceiptAmount / 10000000 >0 ? cityTotalReceiptAmount/ 10000000 :0).toFixed(3)),
            style: ['setBlack', 'setRight', 'setBold'],
            border: [false, true, true, true],
          },
          {
            text: this.translateNumber(Number( cityCurrTotalArrAmount/ 10000000 >0 ? cityCurrTotalArrAmount/ 10000000 :0).toFixed(3)),
            style: ['setBlack', 'setRight', 'setBold'],
            border: [false, true, true, true],
          },
        ]
      )
    }

          //Pouroshova Start

        let grandTotalPouroPrevArrAmount = 0;
        let grandTotalPouroCurrMonthBillAmount = 0;
        let grandTotalPouroReceiptAmount = 0;
        let grandTotalCurrTotalArrAmount = 0;
        let grandPouroshovaNoOfCustomer = 0;
    zoneData.forEach(item => {
      let dataGroupByZone = data.filter(x => x.zoneCode == item.code && x.cityCode == " ");
      let dataGroupLength = dataGroupByZone.length;
      if (dataGroupLength > 0) {
        //let duesTotal = 0;
        let pourReceiptAmountTotal = 0;


        let ZoneInsert = Math.floor(Number(dataGroupLength / 2));
        let zoneNumebr = 0;
        //PouroShova Total

        let totalPouroPrevArrAmount = 0;
        let totalPouroCurrMonthBillAmount = 0;
        let totalPouroReceiptAmount = 0;
        let totalCurrTotalArrAmount = 0;
        let totalPouroshovaNoOfConsumer = 0;

        dataGroupByZone.forEach(item => {
          let { DUESTOTAL, noOfConsumer,LOCATION_CODE, pourNamebn, zoneNamebn, prevMonth, prevArrAmount, currMonthBillAmount, currTotalArrAmount, currBill,receiptPrn,receiptVat, arrearAmt,currReceiptAmount,arrearReceiptAmount,totalReceiptAmount} = item;
          let arrearAmount =  arrearAmt;
          let receivableAmount=(receiptPrn+receiptVat );
          zoneNamebn = `বাবিউবো, ${zoneNamebn}`

          pourReceiptAmountTotal +=totalReceiptAmount;

          //PouroShova Total
          totalPouroPrevArrAmount += prevArrAmount;
          totalPouroCurrMonthBillAmount += currMonthBillAmount;
          totalPouroReceiptAmount += totalReceiptAmount;
          totalCurrTotalArrAmount += currTotalArrAmount;
          totalPouroshovaNoOfConsumer += Number(noOfConsumer);
         

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
                text: zoneNumebr == ZoneInsert ? zoneNamebn : "",
                style: ['setBlack'],
                border: [false, false, false, false],
                rowSpan: 1,
                colSpan: 1
              },
              {
                text: pourNamebn ?? '',
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: `${this.translateNumber(noOfConsumer).includes('.') ? this.translateNumber(noOfConsumer).substring(0, this.translateNumber(noOfConsumer).length - 3) : this.translateNumber(noOfConsumer)}`,
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(prevArrAmount / 10000000 >0 ? prevArrAmount / 10000000:0).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(currMonthBillAmount / 10000000>0? currMonthBillAmount / 10000000:0).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(totalReceiptAmount / 10000000>0? totalReceiptAmount / 10000000:0).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(currTotalArrAmount / 10000000>0? currTotalArrAmount / 10000000:0).toFixed(3))}`,
                // text: `${this.translateNumber(Number(currTotalArrAmount ).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
            ]
          )
        });

        //Total Pouroshova
        if(totalPouroshovaNoOfConsumer>0){
          phases.table.body.push(
            [
              { 
                text: ``, 
                style: [], 
                border: [true, true, true, true] 
              },
              {
                text: "মোট",
                style: ['setBlack', 'setCenter', 'setBold'],
                border: [true, true, true, true],
                rowSpan: 1,
                colSpan: 2
              },
              {
                text: '',
                style: ['setBlack', 'setLeft', 'setBold'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(totalPouroshovaNoOfConsumer).includes('.') ? this.translateNumber(totalPouroshovaNoOfConsumer).substring(0, this.translateNumber(totalPouroshovaNoOfConsumer).length - 3) : this.translateNumber(totalPouroshovaNoOfConsumer)}`,
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: this.translateNumber(Number(totalPouroPrevArrAmount/ 10000000>0 ? totalPouroPrevArrAmount / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight', 'setBold'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(totalPouroCurrMonthBillAmount/ 10000000>0 ? totalPouroCurrMonthBillAmount / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight', 'setBold'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(totalPouroReceiptAmount/ 10000000>0 ? totalPouroReceiptAmount / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight', 'setBold'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number((totalCurrTotalArrAmount)/ 10000000>0 ? totalCurrTotalArrAmount / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight', 'setBold'],
                border: [false, true, true, true],
              },
            ]
          );
        }

        
         //Zone Wise All PouroShova Total
         grandTotalPouroPrevArrAmount+=totalPouroPrevArrAmount;
         grandTotalPouroCurrMonthBillAmount+=totalPouroCurrMonthBillAmount;
         grandTotalPouroReceiptAmount+=totalPouroReceiptAmount;
         grandTotalCurrTotalArrAmount+=totalCurrTotalArrAmount;
         grandPouroshovaNoOfCustomer+=totalPouroshovaNoOfConsumer;
         
      }
      
      grandPrevArrAmount = cityPrevArrearAmtTotal + grandTotalPouroPrevArrAmount;
      grandCurrMonthBillAmount = cityCurrMonthBillTotalAmt + grandTotalPouroCurrMonthBillAmount;
      grandCurrTotalReceiptAmount = cityTotalReceiptAmount + grandTotalPouroReceiptAmount;
      grandCurrTotalArrAmount = cityCurrTotalArrAmount + grandTotalCurrTotalArrAmount;
      grandNumberOfCustomer = cityCurrTotalnoOfConsumer + grandPouroshovaNoOfCustomer;
    });

    //Grand Total
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
          style: ['setBlack', 'setLeft', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: `${this.translateNumber(grandNumberOfCustomer).includes('.') ? this.translateNumber(grandNumberOfCustomer).substring(0, this.translateNumber(grandNumberOfCustomer).length - 3) : this.translateNumber(grandNumberOfCustomer)}`,
          style: ['setBlack', 'setCenter'],
          border: [true, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandPrevArrAmount/ 10000000>0 ? grandPrevArrAmount / 10000000:0).toFixed(3)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandCurrMonthBillAmount/ 10000000>0 ? grandCurrMonthBillAmount / 10000000:0).toFixed(3)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(grandCurrTotalReceiptAmount/ 10000000>0 ? grandCurrTotalReceiptAmount / 10000000:0).toFixed(3)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number((grandCurrTotalArrAmount)/ 10000000>0 ? grandCurrTotalArrAmount / 10000000:0).toFixed(3)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
      ]
    )

    return phases;
  }

  private toFixedNumber(num, digits, base){
    var pow = Math.pow(base||10, digits);
    return Math.round(num*pow) / pow;
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
