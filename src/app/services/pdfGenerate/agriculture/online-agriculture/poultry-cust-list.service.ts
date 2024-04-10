import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../../assets/vfs_fonts';
import { setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading } from '../../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PoultryCustListService {

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
        title: 'Poultry Consumer List',
        author: 'BPDB',
        subject: 'Poultry Consumer List',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
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
      content: [this.getHeading(reportObject), this.getPoultryInfo(data)],
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

  private getHeading(reportObj: any) {
    let dateBn = this.translateNumber(dayjs(reportObj.billMonth).format('DD-MM-YY'), 2);
    let year = this.translateNumber(dayjs(reportObj.billMonth).format("YY"), 2);
    let month: string;
    switch (dayjs(reportObj.billMonth).format("M")) {
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
              margin: [-40, 0, 0, 0],
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
              margin: [-30, -2, 0, 0],
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
              text: 'অর্থ মন্ত্রণালয় কতৃক প্রদত্ত পোল্ট্রিশিল্পে ২০% রিবেট গ্রাহক তালিকা ।',
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

  private getPoultryInfo(data: any) {
    const { TotalDues } = data;
    const phases = {
      margin: [0, -40, 0, 0],
      table: {
        headerRows: 1,
        widths: [20, 100, 10, 90, 90, 30, 'auto', '*', 'auto'],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [
                setPoultryStyles.setCenter,
                setPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [true, true, true, true],
              style: [
                setPoultryStyles.setBlack,
                setPoultryStyles.setFontBangla,
              ],
              text: 'বিক্রয় ও বিতরণ বিভাগ/ বিদ্যুৎ সরবরাহের নাম',
              rowSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [setPoultryStyles.setRight],
              text: '',
            },
            {

              border: [true, true, true, true],
              style: [
                setPoultryStyles.setBlack,
                setPoultryStyles.setFontBangla,
              ],
              text: 'গ্রাহকের নাম',
            },
            {
              border: [true, true, true, true],
              style: [setPoultryStyles.setFontBangla],
              text: 'কৃষি সম্প্রসারণ অধিদপ্তর',
            },
            {
              border: [true, true, true, true],

              style: [setPoultryStyles.setFontBangla],
              text: 'শ্রেণীবিভাগ/হিসাব নং',
              //alignment: 'center',
              colSpan: 2
            },
            {
              text: '',
              border: [true, true, true, true],
              style: [
                setPoultryStyles.setBlack,
                setPoultryStyles.setFontBangla,
              ],

            },
            {
              border: [true, true, true, true],
              style: [setPoultryStyles.setBlack,
              setPoultryStyles.setFontBangla,],
              text: 'কনজুমার নাম্বার',
            },

            {
              border: [true, true, true, true],
              style: [setPoultryStyles.setBlack,
              setPoultryStyles.setFontBangla,],
              text: 'বকেয়ার পরিমাণ(টাকা)',
              //alignment: 'center',
            },
          ]
        ],
      },
      layout: this.setTableBorder(),
    };



    // KrishiCustomers
    // KrishiLocations
    let Locations = data;
    let PoultryCustomers = data;
    let totalDues = 0;
    let serial = 0;
    let custSerial = 0;
    let arrearAmt=0;
    let uniquePoultryLocations = [...new Set(Locations.map(item => item.locationCode))];
    uniquePoultryLocations.forEach((location) => {
      let customerGroupByLocation = PoultryCustomers.filter(x => x.locationCode == location);
      let customerGroupByLocationLength = customerGroupByLocation.length;
      let providerInsert = Math.ceil(Number(customerGroupByLocationLength / 1.5));
      if (customerGroupByLocationLength > 0) {
        let providerNo = 0;
        serial++;
        customerGroupByLocation.forEach(cust => {
          let { arrearLps,arrearPrincipal,arrearReceiptPrincipal,arrearReceiptVat,arrearVat,consumerNo,currLps,currPrincipal,currReceiptPrincipal,
            currReceiptVat,currTotalBill,currVat,custId,customerName, isPoultry,krishiDepartmentCode,krishiDeptNameBn,locationName,locationNameBn,
            ministryCode,totalArrear,totalReceiptArrear,zoneCode,KrishiCustomers, KrishiLocations,
            customerNo, customerNameBn, deptNameBn, locationCode, locationDescBn, isKrishi,conExtgNum, //arrearAmt
          }=cust;
          let providerName = `${locationNameBn} (${locationCode})`;
          arrearAmt = (currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-totalReceiptArrear;
          custSerial++;
          providerNo += 1;
          totalDues += arrearAmt;
          arrearAmt = arrearAmt ? this.translateNumber(arrearAmt) : this.translateNumber(0.00);
          phases.table.body.push(
            [
              {
                border: providerInsert == 1 || providerNo == customerGroupByLocationLength ? [true, false, true, true] : [true, false, true, false],
                text: `${providerNo == providerInsert ? this.translateNumber(serial, 2) : ""}`,
                style: [setPoultryStyles.setFontBangla,],
                colSpan: 1,
                rowSpan: 1
              },
              {
                border: providerInsert == 1 || providerNo == customerGroupByLocationLength ? [true, false, true, true] : [true, false, true, false],
                style: [
                  setPoultryStyles.setBlack,
                  setPoultryStyles.setFontBangla,
                ],
                text: `${providerNo == providerInsert ? providerName : ""}`,
                rowSpan: 1
              },
              {
                border: [true, true, true, true],
                style: [setPoultryStyles.setFontBangla],
                text: `${this.translateNumber(custSerial, 2)}`,
              },
              {
                border: [true, true, true, true],
                style: [
                  setPoultryStyles.setBlack,
                  setPoultryStyles.setFontBangla,
                ],
                text: `${customerName ? customerName : ""}`,
              },
              {
                border: [true, true, true, true],
                style: [setPoultryStyles.setFontBangla],
                text: `${krishiDeptNameBn}`,
              },
              {
                border: [true, true, true, true],

                style: [setPoultryStyles.setFontBangla],
                text: `${isPoultry == 1 ? 'পোল্ট্রি শিল্প' : ''}`,
                //alignment: 'center',
                colSpan: 1
              },
              {
                text: `${conExtgNum}`,
                border: [true, true, true, true],
                style: [
                  setPoultryStyles.setBlack,
                  setPoultryStyles.setFontBangla,
                ],

              },
              {
                border: [true, true, true, true],
                style: [setPoultryStyles.setBlack,
                setPoultryStyles.setFontBangla,],
                text: `${this.translateNumber(consumerNo,2)}`,
                // text: `${consumerNo}`,
                // text: `${this.translateNumber(customerNo).includes('.') ? this.translateNumber(customerNo).substring(0, this.translateNumber(customerNo).length - 3) : this.translateNumber(customerNo)}`,
              },

              {
                border: [true, true, true, true],
                style: [setPoultryStyles.setBlack,
                setPoultryStyles.setFontBangla,],
                // text: `${this.translateNumber(arrearAmt)}`,
                text: `${arrearAmt}`,
                //alignment: 'center',
              },
            ]
          )
        });
      }
    });
    /* Total section */
    phases.table.body.push(
      [
        {
          border: [true, true, false, true],
          text: '',
          style: [
            setPoultryStyles.setFontBangla
          ],
        },
        {
          border: [false, true, false, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [setPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [setPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [setPoultryStyles.setFontBangla],
          text: '',
          //alignment: 'center',
          colSpan: 1
        },
        {
          text: '',
          border: [false, true, false, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
        },
        {
          border: [false, true, true, true],
          style: [setPoultryStyles.setBlack,
          setPoultryStyles.setFontBangla,],
          text: 'সর্বমোট',

        },

        {
          border: [true, true, true, true],
          style: [setPoultryStyles.setBlack,
          setPoultryStyles.setFontBangla,],
          text: `${this.translateNumber(totalDues)}`,
          //alignment: 'center',
        },
      ],
      [
        {
          border: [false, false, false, false],
          text: `(${toBengaliWord(totalDues.toFixed(2))} টাকা মাত্র)`,
          style: [
            setPoultryStyles.setRight,
            setPoultryStyles.setFontBangla,
          ],
          colSpan: 9,
          rowSpan: 1
        },
        {
          border: [true, true, true, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setPoultryStyles.setFontBangla],
          text: '',
        },
        {

          border: [true, true, true, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [true, true, true, true],

          style: [setPoultryStyles.setFontBangla],
          text: '',
          //alignment: 'center',
          colSpan: 1
        },
        {
          text: '',
          border: [true, true, true, true],
          style: [
            setPoultryStyles.setBlack,
            setPoultryStyles.setFontBangla,
          ],
        },
        {
          border: [true, true, true, true],
          style: [setPoultryStyles.setBlack,
          setPoultryStyles.setFontBangla,],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setPoultryStyles.setBlack,
          setPoultryStyles.setFontBangla,],
          text: '',
          //alignment: 'center',
        },
      ],
    )
    return phases;
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
