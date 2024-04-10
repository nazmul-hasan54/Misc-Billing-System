// import { Injectable } from '@angular/core';

// @Injectable({
//   providedIn: 'root'
// })
// export class CencusBillService {

//   constructor() { }
// }

import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../../assets/vfs_fonts.js';
import { setBillStyles, setPdfMakeFonts } from '../../config/pdfMakeConfig';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CencusBillService {

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
    const USAGE_TYPE  = 'LT'
    this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

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
        //creationDate: Date.now(),
      },
      pageSize: 'A4',
      content: [
        this.getHeading(data),
        this.getUserMeterInformation(data),
        this.getMeterUnit(data),
        this.getBillPerMonth(data),
        this.getDuesInformation(data),
        this.getNexPage(data),
        { text: "BILLPAY MARKED SHOP OR BANK & OFFICE COPY", style: ['setRight', 'setBold'], margin: [0, 5, 20, 0] },
        this.getOfficeCopySection(data),
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

  private getHeading(data: any) {
    let { locationName, TOTAL_BILL, TOTAL_BALANCE, totalBillAmount, USAGE_TYPE } = data;
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
                { text: `LT CONSUMER (Single Register)`, style: "setBold" },
              ], colSpan: 2
            },
            {},
            {
              style: ['setColumnBold'], text: `CONSUMER'S COPY`
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
              text: `ELECTRICITY BILL`,
              style: ['setTitleBold'],
              colSpan: 2, margin: [0, -15, 0, 0]
            },
            {},
            {}
          ],
          [
            { style: ['setBlack', "setLeft"], text: locationName ?? "", bold: true, margin: [0, -15, 0, 0], colSpan: 2 }, {},
            {
              style: ['setBlack', 'setRight', 'setColumnBold'], bold: true,
              text: `Balance: ${data.totalBillAmount}, PRN: ${data.totalPrincipleAmount}, Vat: ${data.totalVatAmount}`,
              margin: [0, -15, 100, 0],
              colSpan: 2,
              fontSize: 7
            },
            {},

          ]
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
            { border: [false, false, false, false], style: ['footer'], text: 'সদা আপনার সেবায় নিয়োজিত ', margin: [0, 0, 0, 0] },
            { border: [false, false, false, false], style: ['setRight', 'footer'], text: 'অপর পৃষ্ঠায় বর্ণিত নির্দেশনাবলী দেখুন', margin: [0, 0, 0, 0] }
          ],
        ]
      }
    }
  }
  private getUserMeterInformation(data: any) {
    const { customerName, customerAddress, ADDR_DESCR2, ADDR_DESCR3, CITY, PIN_CODE, billMonth, billNumber, billNumberCheckDigit, billIssueDate,
      locationCode, billGroup, area, walkOrder,
      prevAcNo, customerNumber, dueDate,
      tarrif, busCode, CUST_STATUS, SPECIAL_CODE, SPECIAL_VALUE, RULE, meterNumber, meterType, meterCondition, OMF_KWH, SANC_LOAD } = data;
    return {
      table: {
        widths: ['auto', 'auto', 'auto', 'auto', 'auto', '*', '*', 'auto', 'auto', 'auto'],
        headerRows: 1,
        body: [
          // row-1
          [
            { border: [true, true, true, false], style: ['setBlack', 'setLeft'], text: customerName ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
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
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: customerAddress ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: billMonth ? `${dayjs(billMonth).format("MMM-YY")}` : "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: billNumber ?? "", colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: billNumberCheckDigit ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: billIssueDate ? `${dayjs(billIssueDate).format("DD/MM/YY")}` : "" },
          ],
          // row-3
          [
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: ADDR_DESCR2 ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
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
            { border: [true, false, true, false], style: ['setBlack', 'setLeft'], text: ADDR_DESCR3 ?? "", colSpan: 4, margin: [5, 0, 0, 0] },
            {},
            {},
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: locationCode ?? "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: billGroup ?? "", colSpan: 2 }, {},
            { border: [false, true, false, true], style: ['setBlack'], text: area ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: walkOrder ?? "" },
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
            { border: [true, false, false, false], style: ['setBlack', 'setLeft'], text: CITY, colSpan: 2, margin: [5, 0, 0, 0] },
            {},
            { border: [false, false, true, false], style: ['setBlack'], text: (PIN_CODE ? `- ${PIN_CODE}` : ""), colSpan: 2 },
            {},
            { border: [true, true, false, true], style: ['setBlack'], text: prevAcNo ?? "", colSpan: 2 },
            {},
            { border: [false, true, false, true], style: ['setBlack'], text: customerNumber ?? "", colSpan: 3 }, {},
            {},
            { border: [false, true, true, true], style: ['setBlack'], text: dueDate ?? "" },
          ],
          // row-7
          [
            { text: "TARIFF" },
            { text: "BS.TYPE" },
            { text: "STATUS" },
            { text: "SP.CODE" },
            { text: 'SP.VALUE & RULE' },
            { text: 'Meter No' },
            { text: 'Type' },
            { text: 'COND' },
            { text: 'OMF' },
            { text: 'S LOAD(KW)' },
          ],
          // row-8
          //  CUST_STATUS, SPECIAL_CODE, SPECIAL_VALUE, RULE, METER_NUM_KWH, METER_TYPE_KWH, METER_COND_KWH, OMF_KWH, SANC_LOAD
          [
            { border: [true, true, false, true], style: ['setBlack'], text: tarrif ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: busCode ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: CUST_STATUS ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: SPECIAL_CODE ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: RULE ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: meterNumber ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: meterType ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: meterCondition ?? "" },
            { border: [false, true, false, true], style: ['setBlack'], text: OMF_KWH?.toFixed(2) ?? "" },
            { border: [false, true, true, true], style: ['setBlack'], text: SANC_LOAD?.toFixed(2) ?? "" },
          ],
        ],

      },
      layout: this.setTableBorderColor()
    }
  }

  private getMeterUnit(data: any) {
 
    return {
      margin: this.marginTop, tyle: 'margin_Top',
      table: {
        widths: ['*', 70, '*', 70, '*', 70],
        body: [
          [
            { border: [true, true, true, false], text: "PRESENT DATE" },
            {
              border: [true, true, true, false], margin: [10, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: data.presentDate?? ''
            },
            { border: [true, true, true, false], text: "PRESENT RDG" },
            {
              border: [true, true, true, false],
              style: ['setBlack', 'setRight'], text: data.presentRdg?? '0'
            },
            { border: [true, true, true, false], text: "ARR.FROM" },
            { text: "", rowSpan: 3 },
          ],
          [
            { border: [true, false, true, false], text: "PREVIOUS DATE" },
            {
              border: [true, false, true, false], margin: [10, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text:  ""
            },
            { border: [true, false, true, false], text: "PREVIOUS RDG" },
            {
              border: [true, false, true, false], style: ['setBlack', 'setRight'],
              text: data.previousRdg?? '0'
            },
            { border: [true, false, true, false], text: "ARR.UPTO" },
            { text: "" },
          ],
          [
            { border: [true, false, true, true], text: "OLD METER UNIT" },
            {
              border: [true, false, true, true], margin: [10, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text:  ""
            },
            { border: [true, false, true, true], text: "CONSUMED UNIT" },
            {
              border: [true, false, true, true], style: ['setBlack', 'setRight'],
              text: ''
            },
            { border: [true, false, true, true], text: "" },
            { text: "" },
          ]
        ]
      },
      layout: this.setTableBorderColor()
    }
  }

  private getBillPerMonth(data: any) {
    let { energyAmountSr, demandCharge, MINIMUM_CHRG, SERVICE_CHRG, currentVat, vatPercent,
      ADJUSTED_PRN, ADJUSTED_LPS, ADJUSTED_VAT, arrPrinciple, arrLps, arrVat,
      totalBillAmount } = data;
      energyAmountSr = energyAmountSr ? energyAmountSr : 0;
    demandCharge = demandCharge ? demandCharge : 0;
    MINIMUM_CHRG = MINIMUM_CHRG ? MINIMUM_CHRG : 0;
    SERVICE_CHRG = SERVICE_CHRG ? SERVICE_CHRG : 0;
    currentVat = currentVat ? currentVat : 0;

    currentVat = currentVat ? currentVat : 0;
    ADJUSTED_PRN = ADJUSTED_PRN ? ADJUSTED_PRN : 0;
    ADJUSTED_LPS = ADJUSTED_LPS ? ADJUSTED_LPS : 0;
    ADJUSTED_VAT = ADJUSTED_VAT ? ADJUSTED_VAT : 0;
    arrPrinciple = arrPrinciple ? arrPrinciple : 0;
    arrLps = arrLps ? arrLps : 0;
    arrVat = arrVat ? arrVat : 0;

    totalBillAmount = totalBillAmount ? totalBillAmount : 0;

    const principle_Amount = Number(energyAmountSr) + Number(demandCharge) + Number(MINIMUM_CHRG) + Number(SERVICE_CHRG);
    const bill_Month_Total = Number(principle_Amount) + Number(currentVat);
    const totalVatAmount = Number((ADJUSTED_VAT + arrVat + currentVat)).toFixed(2);

    return {
      margin: this.marginTop, tyle: 'margin_Top',
      table: {
        widths: ['*', '*', '*', '*', 40],
        body: [
          //row-1
          [
            { text: "Current Charges", style: ['setRight'], },
            { text: "Taka" },
            { style: ['setRight'], text: "Adjustment/Arrear" },
            { text: "Taka" },
            { text: "" },
          ],
          // row-2
          [
            { border: [true, true, true, false], style: ['setRight'], text: "Electricity Charges" },
            {
              border: [true, true, true, false], style: ['setRight', 'setBlack'],
              text: energyAmountSr.toFixed(2) ?? 0.00
            },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. Principle" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ADJUSTED_PRN.toFixed(2) ?? 0.00
            },
            { svg: '<svg height="100" width="60"><text x="100" y="20" fill="#458BD1" style="font-size:8px;font-weight:800;"  transform="rotate(-90,100,100)">Paisa element will be</text><text x="100" y="32" fill="#458BD1" style="font-size:8px;font-weight:800;" transform="rotate(-90,100,100)">carried to the next bill</text></svg>', rowSpan: 8 },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "Demand Charges" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: Number(demandCharge).toFixed(2) ?? 0.00
            },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. L.P.S" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: ADJUSTED_LPS.toFixed(2) ?? 0.00
            },
            { text: "" },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "MINIMUM CHARGES" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: Number(MINIMUM_CHRG).toFixed(2) ?? 0.00
            },
            { border: [true, false, true, false], style: ['setRight'], text: "ADJ. VAT" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: Number(ADJUSTED_VAT).toFixed(2) ?? 0.00
            },
            { text: "" },
          ],
          [
            { border: [true, false, true, false], style: ['setRight'], text: "SERVICE CHARGES" },
            {
              border: [true, false, true, false],
              style: ['setRight', 'setBlack'],
              text: Number(SERVICE_CHRG).toFixed(2) ?? 0.00
            },
            { border: [true, true, true, false], style: ['setRight'], text: "ADV/ARR. PRINCIPLE" },
            {
              border: [true, true, true, false], style: ['setRight', 'setBlack'],
              text: Number(arrPrinciple).toFixed(2) ?? 0.00
            },
            { text: "" },
          ],
          [
            { border: [true, true, true, false], style: ['setRight', 'setBold'], text: "PRINCIPLE AMOUNT", rowSpan: 2 },
            {
              border: [true, true, true, false], style: ['setRight', 'setBlack'],
              text: principle_Amount.toFixed(2) ?? 0.00,
              rowSpan: 2
            },
            { border: [true, false, true, false], style: ['setRight'], text: "CURR.&ARR L.P.S" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: Number(arrLps).toFixed(2) ?? 0.00
            },
            { text: "" },
          ],
          [
            { text: "" },
            { text: "" },
            { border: [true, false, true, false], style: ['setRight'], text: "ADV./ARR. VAT" },
            {
              border: [true, false, true, true], style: ['setRight', 'setBlack'],
              text: Number(arrVat).toFixed(2) ?? 0.00
            },
            { text: "" },
          ],
          [
            {
              border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                { text: `(${Number(vatPercent)?.toFixed(3)}) `, style: ['setBlack', 'setleft'] },
                { text: "VAT" }
              ]
            },
            {
              border: [true, false, true, true], style: ['setRight', 'setBlack'],
              text: Number(currentVat).toFixed(2) ?? 0.00
            },
            { border: [true, false, true, false], style: ['setRight', 'setColumnBold'], text: "VAT TOTAL" },
            {
              border: [true, false, true, false], style: ['setRight', 'setBlack'],
              text: Number(totalVatAmount) > 0 ? Number(totalVatAmount) : 0
            },
            { text: "" },
          ],
          [
            { text: "BILL MONTH TOTAL", style: ['setRight', 'setColumnBold'], },
            {
              style: ['setRight', 'setBlack'],
              text: bill_Month_Total.toFixed(2)
            },
            { style: ['setRight', 'setColumnBold'], text: "AMOUNT TO BE PAID" },
            { border: [true, false, true, true], style: ['setRight', 'setBlack'], text: totalBillAmount.toFixed(2) },
            { text: "" },
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }
  }
  private getDuesInformation(data: any) {
    const {
      RCPT_PRN_1, RCPT_VAT_1, RCPT_DATE_1,
      MONTH1, ARR_PRN_N_SRCHG1, ARR_VAT_1, MONTH2, ARR_PRN_N_SRCHG2, ARR_VAT_2,
      MONTH3, ARR_PRN_N_SRCHG3, ARR_VAT_3, MONTH4, ARR_PRN_N_SRCHG4, ARR_VAT_4,
      ARR_PRN_N_SRCHG5, ARR_PRN_N_SRCHG6, ARR_PRN_N_SRCHG7, ARR_PRN_N_SRCHG8,
      ARR_PRN_N_SRCHG9, ARR_PRN_N_SRCHG10, ARR_PRN_N_SRCHG11, ARR_PRN_N_SRCHG12, ARR_VAT_5, ARR_VAT_6, ARR_VAT_7, ARR_VAT_8,
      ARR_VAT_9, ARR_VAT_10, ARR_VAT_11, ARR_VAT_12,
      BANK_NAME, BANK_NAME2, BRANCH_NAME, BRANCH_NAME2 } = data
    const bank_Name1 = BANK_NAME ?? "";
    const branch_Name1 = BRANCH_NAME ?? "";
    const bank_Name2 = BANK_NAME2 ?? "";
    const branch_Name2 = BRANCH_NAME2 ?? "";
    let uptoTotal = ARR_PRN_N_SRCHG4 + ARR_VAT_4 + ARR_PRN_N_SRCHG5 + ARR_PRN_N_SRCHG6 + ARR_PRN_N_SRCHG7 + ARR_PRN_N_SRCHG8 +
      ARR_PRN_N_SRCHG9 + ARR_PRN_N_SRCHG10 + ARR_PRN_N_SRCHG11 + ARR_PRN_N_SRCHG12 + ARR_VAT_5 + ARR_VAT_6 + ARR_VAT_7 + ARR_VAT_8 +
      ARR_VAT_9 + ARR_VAT_10 + ARR_VAT_11 + ARR_VAT_12;
    /* month */
    let month1Total = ARR_PRN_N_SRCHG1 + ARR_VAT_1;
    let month1 = month1Total >= 1 ? dayjs(MONTH1).format("MMM-YY") : "";
    let month2Total = ARR_PRN_N_SRCHG2 + ARR_VAT_2;
    let month2 = month2Total >= 1 ? dayjs(MONTH2).format("MMM-YY") : "";
    let month3Total = ARR_PRN_N_SRCHG3 + ARR_VAT_3;
    let month3 = month3Total >= 1 ? dayjs(MONTH3).format("MMM-YY") : "";
    let month4Total = ARR_PRN_N_SRCHG4 + ARR_VAT_4;
    let month4 = month4Total >= 1 ? dayjs(MONTH4).format("MMM-YY") : "";
    let totalPayment = (RCPT_PRN_1 + RCPT_VAT_1);
    totalPayment = totalPayment > 0 ? totalPayment : 0;

    if (uptoTotal == 0) {
      return {
        margin: this.marginTop, tyle: 'margin_Top',
        table: {
          widths: [80, '*'],
          body: [
            [
              { border: [true, true, false, false], text: "PAYMENT DETAILS", },
              {
                border: [false, true, true, false], style: ['setBlack', 'setLeft'],
                text: totalPayment != 0 ? `${RCPT_DATE_1 ? dayjs(RCPT_DATE_1).format("DD/MM/YY") : ""}\t\t\t ${totalPayment.toFixed(2)}` : "",
                // text: "",
                margin: [48, 0, 0, 0]
              },
            ],

            [
              { border: [true, false, false, false], text: "ARREAR DETAILS", },
              {
                border: [false, false, true, false], style: ['setBlack', 'setLeft'],
                margin: [45, 0, 0, 0],
                text: [
                  {
                    text: month1 != "" ? `${month1}\t\t ${month1Total.toFixed(2)}\t\t\t` : ""
                  },
                  { text: month3 != "" ? `${month3}\t\t ${month3Total.toFixed(2)}` : "" },
                  {
                    text: month2 != "" ? `\n${month2}\t\t ${month2Total.toFixed(2)}\t\t\t` : ""
                  },
                  { text: "" }
                ]
              },
            ],
            // dues information
            [
              {
                border: [true, true, true, false], style: ['dueStyle'],
                text: "বকেয়ার জন্যে সংযোগ বিচ্ছিন্নকরণ নোটিশ",
                font: 'bangla', colSpan: 2
              }, {}
            ],
            [
              {
                border: [true, false, true, true], style: ['setLeft'], font: 'bangla', fontSize: 7.5,
                text: "সম্মানিত গ্রাহক,\nআপনার হিসাব নম্বরের বিপরীতে উপরোক্ত বকেয়া পাওনা আছে।যদি উক্ত বকেয়ার সম্পূর্ণ কিংবা আংশিক ইতিমধ্যে পরিশোধ করে থাকেন তবে সংযোগ বিচ্ছিন্নকরণ এড়াতে বিল পরিশোধের সর্বশেষ তারিখ (LAST PMNT DATE) এর পূর্বে অত্র দপ্তরে পরিশোধিত বিলের কপি সহ যোগাযোগ করে লেজার হালনাগাদ করার জন্যে অনুরোধ করা যাচ্ছে। উক্ত তারিখের মধ্যে বিল পরিশোধে ব্যর্থ হলে বিদ্যুৎ আইন অনুযায়ী পরবর্তী ১০ (দশ) দিন পর থেকে আপনার বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে। কেবলমাত্র বকেয়া পরিশোধ ও পুনঃসংযোগ ফি জমা সাপেক্ষে নিয়ম অনুযায়ী পুনঃসংযোগ দেয়া যেতে পারে যা সময় সাপেক্ষ ও ঝামেলাপূর্ণ। এ ঝামেলা এড়াতে আপনার সুবিধার্থে বকেয়া পরিশোধ কাম্য।", colSpan: 2
              },
              {}
            ],
            [
              { style: ['setColumnBold'], text: "PAY AT\n" },
              {
                border: [true, false, true, true], style: ['setBlack'],
                text: `\t ${bank_Name1} - ${branch_Name1}\n\t${bank_Name2} - ${branch_Name2} `
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
              { border: [true, false, false, false], text: "ARREAR DETAILS", },
              {
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
                text: `${month1}`,
              },

              {
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
                text: `${month1Total > 0 ? month1Total.toFixed(2) : ""}`,

              },
              {
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
                text: `${month3}`,
              },

              {
                border: [false, false, true, false], style: ['setBlack', 'setLeft'],
                text: `${month3Total > 0 ? month3Total.toFixed(2) : ""}`,

              },

            ],
            [
              { border: [true, false, false, false], text: "", },
              {
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
                text: `${month2}`,
              },

              {
                text: `${month2Total > 0 ? month2Total.toFixed(2) : ""}`,
                border: [false, false, false, false], style: ['setBlack', 'setLeft'],
              },
              {
                text: `Up to  ${month4}`,
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
                border: [true, false, true, true], style: ['setLeft'], font: 'bangla', fontSize: 6.5,
                text: "সম্মানিত গ্রাহক,\nআপনার হিসাব নম্বরের বিপরীতে উপরোক্ত বকেয়া পাওনা আছে।যদি উক্ত বকেয়ার সম্পূর্ণ কিংবা আংশিক ইতিমধ্যে পরিশোধ করে থাকেন তবে সংযোগ বিচ্ছিন্নকরণ এড়াতে বিল পরিশোধের সর্বশেষ তারিখ (LAST PMNT DATE) এর পূর্বে অত্র দপ্তরে পরিশোধিত বিলের কপি সহ যোগাযোগ করে লেজার হালনাগাদ করার জন্যে অনুরোধ করা যাচ্ছে। উক্ত তারিখের মধ্যে বিল পরিশোধে ব্যর্থ হলে বিদ্যুৎ আইন অনুযায়ী পরবর্তী ১০ (দশ) দিন পর থেকে আপনার বিদ্যুৎ সংযোগ বিচ্ছিন্ন করা হবে। কেবলমাত্র বকেয়া পরিশোধ ও পুনঃসংযোগ ফি জমা সাপেক্ষে নিয়ম অনুযায়ী পুনঃসংযোগ দেয়া যেতে পারে যা সময় সাপেক্ষ ও ঝামেলাপূর্ণ। এ ঝামেলা এড়াতে আপনার সুবিধার্থে বকেয়া পরিশোধ কাম্য।",
                colSpan: 5
              },
              {}, {}, {}, {}
            ],
            [
              { style: ['setColumnBold'], text: "PAY AT\n" },
              {
                border: [true, false, true, true], style: ['setBlack'],
                text: `\t ${bank_Name1} - ${branch_Name1}\n\t${bank_Name2} - ${branch_Name2} `,
                colSpan: 4
              }, {}, {}, {}
            ],


          ]
        },
        layout: this.setTableBorderColor()
      }
    }
  }

  private getNexPage(data: any) {
    const { DESCR } = data;
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
            { border: [true, false, false, true], text: 'অপর পৃষ্ঠায় বর্ণিত নির্দেশনাবলী দেখুন', font: 'bangla' },
            { border: [false, false, false, true], text: "Phone:" },
            { border: [false, false, true, true], style: 'setBlack', text: DESCR },
          ],

        ]
      },
      layout: this.setTableBorderColor()
    }
  }
  private getOfficeCopySection(data: any) {
    let { locationCode, billGroup, area, walkOrder, BANK_CODE, BRANCH_CODE,
      locationName, tarrif,
      customerName, customerAddress, ADDR_DESCR2, CITY, PIN_CODE, customerNumber, prevAcNo, billIssueDate, dueDate,
      billNumber, billNumberCheckDigit, TOTAL_BILL, ADJUSTED_VAT, ARR_ADV_ADJ_VAT, CURRENT_VAT,
      BILL_TYPE_CODE, BILL_MONTH_PRESENT, ARR_ADV_ADJ_LPS1,totalVatAmount,totalBillAmount } = data


    const currentVat = totalVatAmount;
    const oldConsumerNumber = prevAcNo ? `${customerNumber}\t Old:${prevAcNo}` : customerNumber
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
            { border: [true, true, false, false], style: ['setBlack'], text: locationCode ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: billGroup ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: area ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: walkOrder ?? "" },
            { border: [false, true, false, false], style: ['setBlack'], text: BANK_CODE ?? "" },
            { border: [false, true, true, false], style: ['setBlack'], text: BRANCH_CODE ?? "" },
          ],
          [
            { border: [true, false, true, false], text: "DATE" },
            { border: [true, false, true, false], text: "" },
            {
              border: [false, false, false, true], style: ['setBlack', 'setLeft'],
              margin: [10, 0, 0, 0],
              text: locationName ?? "", colSpan: 2
            },
            {},
            { border: [false, false, true, true], style: ['setBlack'], text: "", colSpan: 4 },
            {},
            {},
            {},
          ],
          [
            { border: [true, false, true, true], text: "TARIFF" },
            { border: [true, false, true, true], style: ['setBlack'], text: tarrif ?? "" },
            { text: "CONSUMER NO", colSpan: 2, margin: [0, 0, 24, 0] },
            {},
            { text: "ISSUE DATE", colSpan: 2 },
            {},
            { text: "LAST PMNT DATE", colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: customerName ?? "", colSpan: 2 },
            {},
            {
              border: [true, true, false, true], style: ['setBlack'],
              text: customerNumber, colSpan: 1
            },
            {
              border: [false, true, false, true], style: ['setBlack', 'setRight'],
              text: prevAcNo ? `Old ${prevAcNo}` : ""
            },
            { border: [false, true, false, true], style: ['setBlack'], text: dayjs(billIssueDate).format("DD/MM/YY"), colSpan: 2 },
            {},
            { border: [false, true, true, true], style: ['setBlack'], text: dueDate, colSpan: 2 },
            {},
          ],
          [
            { border: [true, false, true, false], style: ['setLeft', 'setBlack'], text: customerAddress ?? "", colSpan: 2 },
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
            { border: [true, true, false, true], style: 'setBlack', text: billNumber },
            { border: [false, true, false, true], style: 'setBlack', text: billNumberCheckDigit },
            { border: [false, true, false, true], style: 'setBlack', text: currentVat > 0 ? currentVat.toFixed(2) : 0.00, colSpan: 1 },
            { border: [false, true, true, true], style: 'setBlack', text: totalBillAmount?.toFixed(2), colSpan: 3 },
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
            { border: [true, true, true, true], style: 'setBlack', text: customerNumber ?? "" },
            { border: [false, true, false, true], text: BILL_TYPE_CODE ?? "", style: 'setBlack' },
            {
              border: [false, true, false, true],
              text: dayjs(BILL_MONTH_PRESENT).format("MMM-YY") ?? "", style: 'setBlack'
            },
            {
              border: [false, true, false, true],
              text: `${Number(ARR_ADV_ADJ_LPS1).toFixed(2)}`, style: 'setBlack', colSpan: 1
            },
            { border: [false, true, false, true], text: billNumber, style: 'setBlack', colSpan: 2 },
            {},
            { border: [false, true, true, true], text: billNumberCheckDigit ?? "", style: 'setBlack' }
          ],
        ]
      },
      layout: this.setTableBorderColor()
    }
  }
}