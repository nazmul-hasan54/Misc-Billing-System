import { Injectable } from '@angular/core';
import { color } from 'd3-color';
import * as dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../../assets/vfs_fonts.js';
import { PenaltyBillPrintModel } from '../../../../model/penaltyBillPrint.model.js';
import { setBillStyles, setPdfMakeFonts } from '../../config/pdfMakeConfig';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class MiscChargeBillPrintService {

  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() {
  }

  private setColorForBill(usageType) {
    switch (usageType) {
      case 'HT':
        this.setColor = '#F37895';
        break;
      case 'LT':
        this.setColor = '#458BD1';
        break;
      case 'LI':
        this.setColor = '#64CD99';
        break;
      default:
        this.setColor = "#458BD1";
        break;
    }
  }
  generatePdf(data: any) {
    const USAGE_TYPE = data[0]
    this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any) {
    return {
      info: {
        title: 'Bill Generation for LT Consumer',
        author: 'ebcweb',
        subject: 'Bill of Consumer',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      content: [
        this.getHeading(data[0]),
        this.getUserMeterInformation(data[0]),
        this.getMeterUnit(data[0]),
        this.getBillPerMonth(data),
        this.getDuesInformation(data),
        this.getNexPage(data[0]),
        this.getFooter()
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 8,
        color: this.setColor,
      },
      styles: setBillStyles,
    }
  }
  // table date information
  private setTableBorderColor() {
    const d = this.setColor;
    return {
      hLineWidth: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? 1 : 1;
      },
      vLineWidth: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? 1 : 1;
      },
      hLineColor: function (i, node) {
        return (i === 0 || i === node.table.body.length) ? d : d;
      },
      vLineColor: function (i, node) {
        return (i === 0 || i === node.table.widths.length) ? d : d;
      }
    }
  }

  private getHeading(data: PenaltyBillPrintModel) {
    let DESCR = 'S & D Jamalpur';
    let TOTAL_BILL = 0.00;
    let TOTAL_BALANCE = '';
    let FINALBALANCESTRINFO = 0.00;
    let USAGE_TYPE = 'LT';
    const balance = TOTAL_BILL ? TOTAL_BILL.toFixed(2) : 0.00;
    TOTAL_BALANCE = Number(TOTAL_BALANCE).toLocaleString(undefined, { minimumFractionDigits: 2 })
    return {
      margin: [0, -20, 0, 0],
      table: {
        widths: [100, '*', '*', 100],

        body: [
          [
            {
              image: `logo_green.png`, width: 60, height: 50, color: 'gray', rowSpan: 2,
              margin: [0, -10, 0, 0]
            },
            {
              text: [
                { text: ``, style: "setBold" },
              ], colSpan: 2
            },
            {},
            {
              style: ['setColumnBold'], text: ``
            }
          ],
          // logo section
          [
            {},
            {
              text: `BANGLADESH POWER DEVELOPMENT BOARD`,
              style: ['setTitleBold'],
              colSpan: 2, margin: [0, 0, 0, 0]
            },
            {},
            { image: `slogan2.png`, width: 60, height: 45, rowSpan: 2, margin: [0, -0, 0, 0] }
          ],
          // logo section
          [
            {},
            {
              text: `MISCELLANEOUS BILL`,
              style: ['setTitleBold'],
              colSpan: 2, margin: [0, -25, 0, 0]
            },
            {},
            {}
          ],
          [
            {

            },
            {

            },

            {
              style: ['setTitleBold', 'setLeft'], text: 'MISC CHARGE', bold: true, margin: [-40, -20, 0, 0],
              color: 'green',
              colSpan: 2
            },

            {

            },

          ],
          [
            {},
            {
              text: data.paid ?? "",
              style: ['setTitleBold',],
              bold: true,
              color: 'red',
              colSpan: 2,

              margin: [0, -10, 0, 10]
            },
            {},
            {},
          ],
          [
            {
              style: ['setBlack', "setLeft"], text: data.locationName ?? "", bold: true, margin: [20, -12, 0, 0],
              colSpan: 2
            },
            {},
            {
              //text: `Balance: ${data.totalAmount}, PRN: ${data.principleAmount}, Vat: ${data.vatAmount}`,
              text: data.paid == "PAID" ? "" : `Balance: ${data.totalAmount}, PRN: ${data.principleAmount}, Vat: ${data.vatAmount}`,
              style: ['setBlack', 'setLeft'],
              bold: true,
              margin: [5, -12, 0, 0],
              colSpan: 2,
            },
            {},
          ],
        ]
      },
      // layout: this.setTableBorderColor()
      layout: 'noBorders'
    }
  }

  private getFooter() {
    return {
      margin: [0, 7, 0, 0],
      table: {
        widths: ['*', '*', '*'],

        body: [
          [
            { border: [false, false, false, false], style: ['setLeft', 'footer'], text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড', margin: [0, 0, 0, 0] },
            { border: [false, false, false, false], style: ['footer'], text: ' ', margin: [0, 0, 0, 0] },
            { border: [false, false, false, false], style: ['setRight', 'footer'], text: 'সদা আপনার সেবায় নিয়োজিত', margin: [0, 0, 0, 0] }
          ],
        ]
      }
    }
  }

  private getUserMeterInformation(data: PenaltyBillPrintModel) {


    ;
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [
          // row-1
          [
            { border: [true, true, true, false], style: ['setBlack', 'setLeft'], text: data.customerName ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { text: 'MONTH', colSpan: 2 },
            {},
            { style: ['setColumnBold'], text: `BILL NO`, colSpan: 2 }, {},
            { text: 'CD' },
            { text: 'ISSUE DATE' },
          ],
          // end row-1
          // row-2
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: data.fatherName ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: data.monthName ?? " ", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.billNumber ?? "", colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.billCheckDigit ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: data.issueDate ? data.issueDate : "" },
          ],
          // row-3
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { text: 'LOCATION', colSpan: 2 },
            {},
            { text: 'BILL GROUP', colSpan: 2 }, {},
            { text: 'BOOK NO' },
            { text: 'WALK ORD' },
          ],
          // row-4
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: data.customerAddress ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: data.locationCode ?? "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.billGroup ?? "", colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.bookNo ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: data.walkOrd ?? "" },
          ],
          // row-5
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: '', colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { text: 'PRV A/C NO', colSpan: 2 },
            {},
            { text: 'CONSUMER NO', colSpan: 3 }, {},
            {},
            { style: ['setColumnBold'], text: 'LAST PMNT DATE' },
          ],
          // row-6
          [
            { border: [true, false, false, false], style: ['setBlack', 'setLeft'], text: '', colSpan: 2, margin: [5, 0, 0, 0] },
            {},
            { border: [false, false, true, false], style: ['setBlack'], text: '', colSpan: 2 },
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: data.prvAcc ?? "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.customerNumber ?? "", colSpan: 3 }, {},
            {},
            {
              border: [false, true, true, true], style: ['setBlack'], text: data.lastPaymentDate ? `${data.lastPaymentDate}` : ""
            },
          ],
          // row-7
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: '', colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},

            { text: "TARIFF", colSpan: 2 },
            {},
            { text: "BS.TYPE" },
            { text: 'METER NO', colSpan: 1 },
            { text: 'TYPE', colSpan: 1 },
            { text: 'COND', colSpan: 1 },
          ],
          [
            { border: [true, false, false, true], style: ['setBlack', 'setLeft'], text: data.locationAddress, colSpan: 2, margin: [5, 0, 0, 0] },
            {},
            { border: [false, false, true, true], style: ['setBlack'], text: "", colSpan: 2 },
            {},

            { border: [true, true, false, true], style: ['setBlack'], text: data.tariff ?? "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: data.bsCode ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: data.meterNumber ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: data.meterType ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: data.meterCondition ?? "" },
          ],
          // row -9


        ],

      },
      layout: this.setTableBorderColor()
    }
  }

  private getMeterUnit(data: PenaltyBillPrintModel) {

    return {
      margin: this.marginTop, tyle: 'margin_Top',
      table: {
        widths: [75, 60, '*', 50, 100, 30],
        body: [
          [
            { border: [true, true, true, false], text: "CUSTOMER MOBILE", style: ['', 'setLeft'] },
            {
              border: [true, true, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: data.mobileNumber ?? ''
              ///text: (CURR_READING_DATE ? dayjs(CURR_READING_DATE).format("DD/MM/YY") : "")
            },
            { border: [true, true, true, false], text: "DISCONNECTION TYPE", style: ['', 'setRight'] },
            {
              border: [true, true, true, false],
              style: ['setBlack', 'setRight'], text: data.dcTypeCode ?? ""
            },
            { border: [true, true, true, false], text: "", style: ['setRight'] },
            { text: '', rowSpan: 4 },
          ],
          [
            { border: [true, false, true, false], text: "NID NUMBER", style: ['', 'setLeft'] },
            {
              border: [true, false, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: data.nidNumber ?? ''
            },
            { border: [true, false, true, false], text: "", style: ['', 'setRight'] },
            {
              border: [true, false, true, false], style: ['setBlack', 'setRight'],
              text: ""
            },
            { border: [true, false, true, false], text: "" },
            { text: "" },
          ],
          [
            { border: [true, false, true, false], text: "IMPOSED BY", style: ['', 'setLeft'] },
            {
              border: [true, false, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: data.imposedBy ?? ""
            },
            { border: [true, false, true, false], text: "" },
            {
              border: [true, false, true, false], style: ['setBlack', 'setRight'],
              text: ""
            },
            { border: [true, false, true, false], text: "" },
            {
              border: [true, false, true, false], style: ['setBlack', 'setRight'],
              text: ""
            },
          ],

          [
            { border: [true, false, true, true], text: "REASON", style: ['', 'setLeft'] },
            {
              border: [true, false, true, true], margin: [0, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: data.billReason
            },
            { border: [true, false, true, true], text: "" },
            {
              border: [true, false, true, true], style: ['setBlack', 'setRight'],
              text: ""
            },
            { border: [true, false, true, true], text: "" },
            { text: "", border: [false, false, true, true] },
          ]
        ]
      },
      layout: this.setTableBorderColor()
    }
  }

  private getBillPerMonth(data: PenaltyBillPrintModel) {
    return {
      margin: this.marginTop, style: 'margin_Top',
      table: {
        widths: ['*', '*', '*', '*', 70],
        body: [
          //row-1
          [
            { text: "CURRENT CHARGES", style: ['setRight'], },
            { text: "TAKA" },
            { style: ['setRight'], text: "INSTALLMENT PLAN" },
            { text: "TAKA", style: ['setCenter'], },
            { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
          ],
          // row-2
          [
            { border: [true, false, true, false], style: ['setRight'], text: "DISCONNECTION / RECONNECTION" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: data[0].principleAmount
            },
            { border: [true, false, true, false], style: ['setRight'], text: "" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ''
            },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ''
            },
          ],


          [
            { border: [true, true, true, false], style: ['setRight', 'setBold'], text: "PRINCIPLE AMOUNT", rowSpan: 2 },
            {
              border: [true, true, false, false], style: ['setRight', 'setBlack'],
              text: data[0].principleAmount,
              rowSpan: 2
            },
            { border: [true, false, true, false], style: ['setRight'], text: "" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ''
            },
            { text: "", border: [true, false, true, false] },
          ],
          [
            { text: "", border: [true, false, true, false] },
            { text: "", border: [true, false, true, false] },
            { border: [true, false, true, false], style: ['setRight'], text: "" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ''
            },
            { border: [true, false, true, false], style: ['setRight', 'setBlack'], text: "" },
          ],
          [
            {
              border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                { text: ` (  %5 )`, style: ['setBlack', 'setleft'] },
                { text: "VAT" }
              ]
            },
            {
              border: [true, false, false, true], style: ['setRight', 'setBlack'],
              text: data[0].vatAmount
            },
            { border: [true, false, true, false], style: ['setRight', 'setColumnBold'], text: "" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ""
            },
            { text: "", border: [true, false, true, false] },
          ],
          [
            { text: " TOTAL BILL", style: ['setRight', 'setColumnBold'], },
            {
              style: ['setRight', 'setBlack'],
              text: data[0].totalAmount
            },
            { style: ['setRight', 'setColumnBold'], border: [true, false, false, true], text: "" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: "" },
            { text: "", border: [true, false, true, true] },
          ], 
          [
            { text: "TOTAL AMOUNT AFTER DUE", style: ['setRight', 'setColumnBold'], },
            {
              style: ['setRight', 'setBlack'],
              text: data[0].totalAmountAfterDue? data[0].totalAmountAfterDue:0,
            },
            { style: ['setRight', 'setColumnBold'], border: [true, false, false, true], text: "" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: "" },
            { text: "", border: [true, false, true, true] },
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }


  }
  private getDuesInformation(data: any) {
    //let locationPath = window.location.href;
    //let locationPath=`https://infonetlimited.com/portal/startup/misc-charge-bill/${data[0].billNumber}${data[0].billCheckDigit}/${data[0].customerNumber}`;
    let locationPath=`http://localhost:4200/startup/misc-charge-bill/${data[0].billNumber}${data[0].billCheckDigit}/${data[0].customerNumber}`;
    const { customerName, fatherName, locationName,
      customerAddress, monthName, billNumber, billCheckDigit, issueDate, locationCode, walkOrd,
      billGroup, bookNo, prvAcc, customerNumber, lastPaymentDate, tariff, bsCode, meterNumber,
      meterType, meterCondition, mobileNumber, nidNumber, imposedBy, billReason, penaltyUnit,
      installmentNo, principleAmount, vatAmount, totalAmount, totalInstallmentTaka,
      installmentDueDate,lpsAmountAfterDue,totalAmountAfterDue  } = data;
    let uptoTotal = 0;

    if (uptoTotal == 0) {
      return {
        margin: this.marginTop, tyle: 'margin_Top',
        table: {
          widths: [80, '*'],
          body: [
            [
              { border: [true, true, true, true], text: "PAYMENT DETAILS", colSpan: 2, margin: [-100, 2, 285, 20] },
              {
                border: [false, true, true, false], style: ['setBlack', 'setLeft'],
                text: '',
                // text: "",
                margin: [48, 0, 0, 0]
              },
            ],
            [
              {
                text: "PAY BILL",
                border: [true, true, true, true],
                //margin: [-100, 2, 285, 20]
              },
              {
                qr: locationPath,
                fit: '100',
                border: [true, true, true, true],
                margin: [0, 10, 0, 10],
              },
            ],
            [
              { style: ['setColumnBold'], text: "PAY AT\n", },
              {
                border: [true, false, true, true], style: ['setBlack'],
                text: `\t bank name `
              }
            ],
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    else {
      return {
        margin: this.marginTop, tyle: 'margin_Top',
        table: {
          widths: [140, 30, 60, 60, "*"],
          body: [
            [
              { border: [true, true, false, false], text: "PAYMENT DETAILS", },
              {
                border: [false, true, true, false], style: ['setBlack', 'setLeft'],
                text: ``,
                margin: [45, 0, 0, 0], colSpan: 4
              },
              {},
              {},
              {}
            ],

            [
              { border: [true, false, false, false], text: "", },
              {
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
                text: ``,
              },

              {
                text: "",
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
              },
              {
                text: ``,
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
              },

              {
                text: `${uptoTotal > 0 ? uptoTotal.toFixed(2) : ""}`,
                border: [false, false, true, false], style: ['setBlack', 'setLeft'],
              },
            ],
            // dues information
            [
              {
                border: [true, true, true, false], style: ['dueStyle'],
                text: "বকেয়ার জন্যে সংযোগ বিচ্ছিন্নকরণ নোটিশ",
                font: 'bangla', colSpan: 5
              }, {}, {}, {}, {}
            ],
            [
              {
                border: [true, false, true, true], style: ['setLeft'], font: 'bangla', fontSize: 7.5,
                text: "সম্মানিত গ্রাহক,\nআপনার হিসাব নম্বরের বিপরীতে উপরোক্ত বকেয়া পাওনা আছে।যদি উক্ত বকেয়ার সম্পূর্ণ কিংবা আংশিক ইতিমধ্যে পরিশোধ করে থাকেন তবে সংযোগ বিচ্ছিন্নকরণ এড়াতে বিল পরিশোধের সর্বশেষ তারিখ (LAST PMNT DATE) এর পূর্বে অত্র দপ্তরে পরিশোধিত বিলের কপি সহ যোগাযোগ করে লেজার হালনাগাদ করার জন্যে অনুরোধ করা যাচ্ছে। উক্ত তারিখের মধ্যে বিল পরিশোধে ব্যর্থ হলে বিদ্যুৎ আইন অনুযায়ী পরবর্তী ১০ (দশ) দিন পর থেকে আপনার বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে। কেবলমাত্র বকেয়া পরিশোধ ও পুনঃসংযোগ ফি জমা সাপেক্ষে নিয়ম অনুযায়ী পুনঃসংযোগ দেয়া যেতে পারে যা সময় সাপেক্ষ ও ঝামেলাপূর্ণ। এ ঝামেলা এড়াতে আপনার সুবিধার্থে বকেয়া পরিশোধ কাম্য।",
                colSpan: 5
              },
              {}, {}, {}, {}
            ],
            [
              { style: ['setColumnBold'], text: "PAY AT\n" },
              {
                border: [true, false, true, true], style: ['setBlack'],
                text: `\t`,
                colSpan: 4
              }, {}, {}, {}
            ],


          ]
        },
        layout: this.setTableBorderColor()
      }
    }

  }

  private getNexPage(data: PenaltyBillPrintModel) {
    const DESCR = 'S & D Jamalpur';
    return {
      margin: this.marginTop,
      table: {
        widths: ['*', 100, "*"],
        body: [
          [
            { border: [true, true, false, false], text: "" },
            { border: [false, true, false, false], text: "" },
            { border: [false, true, true, false], text: "EXECUTIVE / RESIDENT ENGINEER" }
          ],
          [
            { border: [true, false, false, true], text: '', font: 'bangla' },
            { border: [false, false, false, true], text: "Phone:" },
            { border: [false, false, true, true], style: 'setBlack', text: data.locationName },
          ],

        ]
      },
      layout: this.setTableBorderColor()
    }
  }
  private getOfficeCopySection() {
    let LOCATION_CODE = 'j6'
    let BILL_GROUP = '03'
    let BOOK_NO = 116
    let WALKING_SEQUENCE = 103
    let BANK_CODE = '04'
    let BRANCH_CODE = '0417'
    let DESCR = 'S & D Jamalpur'
    let TARIFF = 'A'
    let CUSTOMER_NAME = 'Md. Abdul Hamid'
    let ADDR_DESCR1 = 'Md.Shamsul Haque'
    let ADDR_DESCR2 = 'Naya Para'
    let CITY = 'JAMALPUR'
    let PIN_CODE = 2000
    let CONSUMER_NUM = 72722827
    let CONS_EXTG_NUM = '1a2826'
    let INVOICE_DATE = '01/08/14'
    let INVOICE_DUE_DATE = '02/17/14'
    let BILL_NO = 7212926
    let CD = 18
    let TOTAL_BILL = 790.00
    let ADJUSTED_VAT = 10
    let ARR_ADV_ADJ_VAT = 10
    let CURRENT_VAT = 15
    let BILL_TYPE_CODE = 99
    let BILL_MONTH_PRESENT = '01/14/14'
    let ARR_ADV_ADJ_LPS1 = 62.97


    const totalVAT = ADJUSTED_VAT + ARR_ADV_ADJ_VAT + CURRENT_VAT;
    const oldConsumerNumber = CONS_EXTG_NUM ? `${CONSUMER_NUM}\t Old:${CONS_EXTG_NUM}` : CONSUMER_NUM
    ARR_ADV_ADJ_LPS1 = ARR_ADV_ADJ_LPS1 ? Number(ARR_ADV_ADJ_LPS1) : 0
    return {
      table: {
        widths: ['*', 60, 110, "auto", 'auto', 'auto', "auto", "auto"],
        body: [
          // { border: [false, true, true, false], text: "EXECUTIVE / RESIDENT ENGINEER" }
          [
            { border: [true, true, true, false], text: "SERIAL NO" },
            { border: [true, true, true, false], text: "" },
            { text: "LOCATION" },
            { text: "BILLGR" },
            { text: "BOOK NO" },
            { text: "WORD ORD" },
            { text: "BANK" },
            { text: "BRANCH" },
          ],
          [
            { border: [true, false, true, false], text: "RCVD. TK." },
            { border: [true, false, true, false], text: "" },
            { border: [true, true, false, false], style: ['setBlack'], text: LOCATION_CODE ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: BILL_GROUP ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: BOOK_NO ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: WALKING_SEQUENCE ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: BANK_CODE ?? "" },
            { border: [false, true, true, false], style: ['setBlack'], text: BRANCH_CODE ?? "" },
          ],
          [
            { border: [true, false, true, false], text: "DATE" },
            { border: [true, false, true, false], text: "" },
            {
              border: [false, false, false, true], style: ['setBlack', 'setLeft'],
              margin: [10, 0, 0, 0],
              text: DESCR ?? "", colSpan: 2
            },
            {},
            { border: [false, false, true, true], style: ['setBlack'], text: "", colSpan: 4 },
            {},
            {},
            {},
          ],
          [
            { border: [true, false, true, true], text: "TARIFF" },
            { border: [true, false, true, true], style: ['setBlack'], text: TARIFF ?? "" },
            { text: "CONSUMER NO", colSpan: 2, margin: [0, 0, 24, 0] },
            {},
            { text: "ISSUE DATE", colSpan: 2 },
            {},
            { text: "LAST PMNT DATE", colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: CUSTOMER_NAME ?? "", colSpan: 2 },
            {},
            {
              border: [true, true, false, true], style: ['setBlack'],
              text: CONSUMER_NUM, colSpan: 1
            },
            {
              border: [false, true, false, true], style: ['setBlack', 'setRight'],
              text: CONS_EXTG_NUM ? `Old ${CONS_EXTG_NUM}` : ""
            },
            { border: [false, true, false, true], style: ['setBlack'], text: dayjs(INVOICE_DATE).format("DD/MM/YY"), colSpan: 2 },
            {},
            { border: [false, true, true, true], style: ['setBlack'], text: dayjs(INVOICE_DUE_DATE).format("DD/MM/YY"), colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: ADDR_DESCR1 ?? "", colSpan: 2 },
            {},
            { style: ['setColumnBold'], text: "Bill NO" },
            { style: ['setColumnBold'], text: "CD" },
            { style: ['setColumnBold'], text: "VAT", colSpan: 1 },
            { style: ['setColumnBold'], text: "TOTAL AMOUNT(TK) ", colSpan: 3 },
            {}, {}
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: ADDR_DESCR2 ?? "", colSpan: 2 },
            {},
            { border: [true, true, false, true], style: 'setBlack', text: BILL_NO },
            { border: [false, true, false, true], style: 'setBlack', text: CD },
            { border: [false, true, false, true], style: 'setBlack', text: totalVAT > 0 ? totalVAT.toFixed(2) : 0.00, colSpan: 1 },
            { border: [false, true, true, true], style: 'setBlack', text: TOTAL_BILL.toFixed(2), colSpan: 3 },
            {}, {}
          ],
          [
            { border: [true, false, false, false], style: ['setLeft', 'setBlack'], text: CITY ?? "" },
            { border: [false, false, true, true], style: ['setLeft', 'setBlack'], text: `- ${PIN_CODE ?? ""}` },
            { text: "BILL TYPE" },
            { text: "MMYY" },
            { text: "SURCHARGE", colSpan: 1 },
            { text: "Bill NO", colSpan: 2 },
            {},
            { text: "CD" }
          ],
          [
            { text: "CONS NO" },
            { border: [true, true, true, true], style: 'setBlack', text: CONSUMER_NUM ?? "" },
            { border: [false, true, false, true], text: BILL_TYPE_CODE ?? "", style: 'setBlack' },
            {
              border: [false, true, false, true],
              text: dayjs(BILL_MONTH_PRESENT).format("MMM-YY") ?? "", style: 'setBlack'
            },
            {
              border: [false, true, false, true],
              text: `${Number(ARR_ADV_ADJ_LPS1).toFixed(2)}`, style: 'setBlack', colSpan: 1
            },
            { border: [false, true, false, true], text: BILL_NO, style: 'setBlack', colSpan: 2 },
            {},
            { border: [false, true, true, true], text: CD ?? "", style: 'setBlack' }
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }
  }
}
