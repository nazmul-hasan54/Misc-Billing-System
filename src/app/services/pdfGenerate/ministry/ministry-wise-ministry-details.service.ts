import { Injectable } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailLogo,ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, setHeading, setPdfMakeFonts, setSubHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistryWiseMinistryDetailsService {

  defaultColor = '#111';
  constructor() { }

  private translateNumber(num, option=1){
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if(option==1){
      num = Number(num).toLocaleString(undefined, {minimumFractionDigits: 2})
    }
    return num.toString().replace(/\d/g, x=> banglaDigits[x]);
  }

  generatePdf(data: any, reportObj: any, uniqueZone: any){
    //@ts-ignore
    pdfMake.fonts=setPdfMakeFonts;

    const documentDefinition=this.getDocumentDefinition(data, reportObj, uniqueZone);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, reportObj: any, uniqueZone: any ){
    return {
      info: {
        title: 'Ministry Details By Ministry',
        author: 'BillonWeb',
        subject: 'Ministry Details By Ministry',
        keywords: 'keywords for document',
       //creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }
                , { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data, reportObj),
      content: [
        this.getMinistry(data, reportObj, uniqueZone),
      ],
      pageMargins: ministryDetailsPageMargin,
      defaultStyle: ministryDetailsDefaultStyle,
      styles: ministryDetailsStyle
    }
  }

  private getMinistry(data: any, reportObj: any, uniqueZone: any) {
    let grandPrevArrearAmt = 0;
    let grandCurrMonthBill = 0;
    let grandCollectionAmt = 0;
    let grandtotalArrearAmt = 0;
    const phase = {
      margin: [0, -50, 0, 0],
      table: {
        dontBreakRows: true,
       widths: [25, 120, 100, 'auto', '*', 'auto', 'auto', 'auto', 'auto', 'auto'],
       
        //headerRows: 6,
        body: [
          [
            {
              text: '',
              style: ['setLeft'],
              border: [false, false, false, false],
              colSpan: 10
            }, {},
            {
              text: "",
              style: ['setLeft', 'setBold'],
              border: [false, false, false, false],
            }, {}, {}, {}, {}, {}, {}, {}
          ],
          // row 7
          [
            {
              text: "",
              style: ['setLeft'],
              colSpan: 10,
              border: [false, false, false, false]
            }, {},
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };

    let uniqueZones = [...new Set(data.map(item => item.zoneName
      ))];
      uniqueZones?.forEach(item =>{
      let lCurrentBillTotal = 0;
      let totalPrevArrearAmt = 0;
      let totalCurrMonthBill = 0;
      let totalCollectionAmt = 0;
      let ttotalArrearAmt = 0;
      let sl =1;
      let zoneName = data.filter(x=> x.zoneName == item);
      //zoneName.forEach(value => {})
      if(item){
      phase.table.body.push(
          [
            {
              text: `Zone - ${item}`,
              style: ['setLeft', 'setLocationBold2'],
              border: [true, true, false, true],
              colSpan: 2,
            },
            {
              text: '',
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            }, {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, true, true],
            }
      ]
      )
    
      phase.table.body.push([
              {
                text: "Sl",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
               {
                text: "Customer Name",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: "Address",
                style: ['setBold']
              },
              {
                text: "Customer Num",
                style: ['setBold']
              },
              {
                text: "Location",
                style: ['setBold'],
              },
              {
                text: "Location Desc",
                style: ['setBold'],
              },
              {
                text: "Arrear Amount(Upto-Previous Month)"
                , style: ['setBold'],
              },
              {
                text: "Current Month Bil"
                , style: ['setBold'],
              },
              {
                text: "Total Collection"
                , style: ['setBold'],
              },
              {
                text: "Total Arrear(Current Month)",
                style: ['setBold']
              },
            ])
          
      zoneName.forEach(value => {
        // prevArrearAmt: 101838
        // currReceiptAmt: 1229
        // collectionAmt: 0
        // totalArrearAmt: 103067

        const {  customerName,address,customerNo,locationCode,locationDsc,ministryName,ministryCode,zoneName,
          prevArrearAmt,currMonthBill,collectionAmt,totalArrearAmt} = value;
        //const {  customerName,address,customerNo,locationCode,locationDsc,ministryName,ministryCode,zoneName,prn,lps,vat,total} = item;
        if(value.zoneName){
        if (value.zoneName?.toUpperCase() == item?.toString().toUpperCase()){
          //if ('Chittagong'.toUpperCase() == item.name.toUpperCase()){
            totalPrevArrearAmt += prevArrearAmt;
            totalCurrMonthBill += currMonthBill;
            totalCollectionAmt += collectionAmt;
            ttotalArrearAmt += totalArrearAmt;
          phase.table.body.push([
            {
              text: (sl++).toString() ?? "",
              style: ['setRight'],
              colSpan: 1,
              border: [true, true, true, true]
            }, 
            {
              text:  `${customerName ?customerName:''}`,
              style: ['setLeft'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text:  `${address ? address:''}`,
              style: ['setLeft'],
            },
            {
              text: `${customerNo ?customerNo:''}`,
            },
            {
              text: `${locationCode ? locationCode:''}`,
            },
            {
              text: `${locationDsc ? locationDsc:''}`,
              style: ['setLeft'],
            },
            {
              text: `${prevArrearAmt ? Number(prevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 } ) : 0.00}`,
              style: ['setRight']
            },
            {
              text: `${currMonthBill ? Number(currMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00 }`,
              style: ['setRight']
            },
            {
              text: `${collectionAmt ? Number(collectionAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
            {
              text: `${totalArrearAmt ? Number(totalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
          ])
        }
      }
      })
      phase.table.body.push([
            {
              text: "Zone Total",
              style: ['setRight', 'setBold', 'setBig'],
              colSpan: 6,
              border: [true, true, true, true]
            }, {}, {}, {}, {}, {},
            {
              text: `${totalPrevArrearAmt ? Number(totalPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${totalCurrMonthBill ? Number(totalCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${totalCollectionAmt ? Number(totalCollectionAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${ttotalArrearAmt ? Number(ttotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
          ]);
        }
        grandPrevArrearAmt += totalPrevArrearAmt;
        grandCurrMonthBill += totalCurrMonthBill;
        grandCollectionAmt+= totalCollectionAmt;
        grandtotalArrearAmt += ttotalArrearAmt;
    });
    
    phase.table.body.push([
      {
        text: "Grand Total",
        style: ['setRight', 'setBold', 'setBig'],
        colSpan: 6,
        border: [true, true, true, true]
      }, {}, {}, {}, {}, {},
      {
        text: `${grandPrevArrearAmt ? Number(grandPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandCurrMonthBill ? Number(grandCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandCollectionAmt ? Number(grandCollectionAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandtotalArrearAmt ? Number(grandtotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
    ])
    return phase;
  }

  private getHeading(data: any, reportObj: any) {
    const totalCount = data.length;
    const phase = {
      margin: ministryDetailsHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 50],
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
              margin: [-165, 5, 0, 0]
            },
            {},
            { text: '', colSpan: 8, border: [false, false, false, false] },
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
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
        
          // row 4
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${reportObj.billMonth}`,
              style: [setSubHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          // row 5
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '(Govt., Semi Govt., Autonomous & Corporation)',
              style: [setSubHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // // row 3
          [
            {},
            {},
            {},
            {
              text: `${reportObj.ministry.code == '0' ? 'All Ministry' : reportObj.ministry.name} \n`,
              //text: `${ 'All Ministry' } \n`,
              style: ['setSubHeading'],
              colSpan: 4,
            },
            {},
            {},
            {},
            {
              text: `Total Customer: ${totalCount}`,
              style: [setSubHeading],
              colSpan: 3,
              bold: false
            },
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
      // paddingLeft: function (i, node) { return 4; },
      // paddingRight: function (i, node) { return 4; },
      paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) { return 5; },
    }
  }
}
