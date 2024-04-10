import { Injectable } from '@angular/core';
import { PenaltyBillPrintModel } from '../../../../model/penaltyBillPrint.model';
import dayjs from 'dayjs';
import { setBillStyles } from '../../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class SupplementarySrService {

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
  generatePdf(data: any) {debugger
    debugger
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
    debugger
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
        this.getHeading(),
        this.getUserMeterInformation(data[0]),
        this.getMeterUnit(data[0]),
        this.getBillPerMonth(data),
        this.getDuesInformation(data),
        this.getNexPage(),
        //   { text: "BILLPAY MARKED SHOP OR BANK & OFFICE COPY", style: ['setRight', 'setBold'], margin: [0, 5, 20, 0] },
        // this.getOfficeCopySection(),
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

  private getHeading() {
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
              style: ['setBlack', "setLeft"], text: DESCR ?? "", bold: true, margin: [20, -10, 0, 0],
              colSpan: 2
            },
            {

            },

            {
              style: ['setTitleBold', 'setLeft'], text: 'PENALTY BILL', bold: true, margin: [-57, -20, 0, 0],
              color: 'red',
              colSpan: 2
            },

            {

            },




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
            { border: [true, true, true, false], text: "CUSTOMER MOBILE", style: ['', 'setRight'] },
            {
              border: [true, true, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setLeft'],
              text: ''
              ///text: (CURR_READING_DATE ? dayjs(CURR_READING_DATE).format("DD/MM/YY") : "")
            },
            { border: [true, true, true, false], text: "SUPPLEMENTARY UNIT", style: ['', 'setRight'] },
            {
              border: [true, true, true, false],
              style: ['setBlack', 'setRight'], text: data.penaltyUnit ?? ""
            },
            { border: [true, true, true, false], text: "NO OF INSTALLMENT", style: ['setRight'] },
            { text: data.installmentNo ?? '', rowSpan: 4 },
          ],
          [
            { border: [true, false, true, false], text: "NID NUMBER", style: ['', 'setRight'] },
            {
              border: [true, false, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setRight'],
              text: ''
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
            { border: [true, false, true, false], text: "IMPOSED BY", style: ['', 'setRight'] },
            {
              border: [true, false, true, false], margin: [0, 0, 0, 0], style: ['setBlack', 'setCenter'],
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
            { border: [true, false, true, true], text: "REASON", style: ['', 'setRight'] },
            {
              border: [true, false, true, true], margin: [0, 0, 0, 0], style: ['setBlack', 'setCenter'],
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
    if (data[0].installmentNo >= 10) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "7th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "8th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "9th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "10th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[9].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[9].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "11th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[10].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[10].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 9) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "7th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "8th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "9th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "10th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[9].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[9].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 8) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "7th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "8th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "9th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[8].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 7) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "7th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "8th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[7].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 6) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "7th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[6].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 5) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "6th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[5].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `(  %5  )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 4) {

      return {
        margin: this.marginTop, style: 'margin_Top',
        table: {
          widths: ['*', '*', '*', '*', 70],
          body: [
            //row-1
            [
              { text: "CURRENT CHARGES", style: ['setCenter'], },
              { text: "TAKA" },
              { style: ['setCenter'], text: "INSTALLMENT PLAN" },
              { style: ['setCenter'], text: "TAKA" },
              { text: "INSTALLMENT DUE DATE", style: ['setCenter'], },
            ],
            // row-2
            [
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE", rowSpan: 4 },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? '',
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "5th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[4].installmentDueDate ?? ''
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
                text: '', rowSpan: 3
              },
              { text: "", border: [true, false, true, false] },
            ],
            [
              { text: "", border: [true, false, true, false] },
              { text: "", border: [true, false, true, false] },
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `( %5 )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 3) {

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
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, false, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "4th INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[3].installmentDueDate ?? ''
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
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `( %5 )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }

    if (data[0].installmentNo == 2) {
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
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "3rd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[2].installmentDueDate ?? ''
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
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: ` ( ( %5 ) )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 1) {


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
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "1ST INSTALLMENT WITHOUT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
              },
            ],
            [
              { border: [true, true, true, false], style: ['setRight'], text: "" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: ''
              },
              { border: [true, false, true, false], style: ['setRight'], text: "2nd INSTALLMENT WITH LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[1].installmentDueDate ?? ''
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
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: `( %5 )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }
    if (data[0].installmentNo == 0) {
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
              { border: [true, false, true, false], style: ['setRight'], text: "ELECTRICITY CHARGE" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].principleAmount
              },
              { border: [true, false, true, false], style: ['setRight'], text: "NO INSTALLMENT LPS" },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].totalInstallmentTaka ?? 0
              },
              {
                border: [true, false, true, false], style: ['setRight', 'setBlack'],
                text: data[0].installmentDueDate ?? ''
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
                border: [true, false, true, true], style: ['setRight', 'setBlack'],
                text: ''
              },
              { text: "" },
            ],
            [
              {
                border: [true, false, true, true], style: ['setRight', 'setColumnBold'], text: [
                  { text: ` ( ( %5 ) )`, style: ['setBlack', 'setleft'] },
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
          ]
        },
        layout: this.setTableBorderColor()
      }
    }

  }
  private getDuesInformation(data: any) {
    let locationPath=window.location.href;
    const { customerName, fatherName, locationName,
      customerAddress, monthName, billNumber, billCheckDigit, issueDate, locationCode, walkOrd,
      billGroup, bookNo, prvAcc, customerNumber, lastPaymentDate, tariff, bsCode, meterNumber,
      meterType, meterCondition, mobileNumber, nidNumber, imposedBy, billReason, penaltyUnit,
      installmentNo, principleAmount, vatAmount, totalAmount, totalInstallmentTaka,
      installmentDueDate } = data;
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

  private getNexPage() {
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
            { border: [false, false, true, true], style: 'setBlack', text: DESCR },
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
