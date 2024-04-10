import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { PoliceArrear } from '../../../model/police-arrear.model';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ZoneWisePoliseArrearDetailsService {

  defaultColor = "";
  constructor() { }

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
        title: 'Police Arrear Details',
        author: 'EBCWEB',
        subject: 'Police Arrear Details',
        keywords: 'keywords for document',
      },
      pageSize: 'Legal',
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
      header: this.getPoliceHeading(data, reportObj),
      // background: function (currentPage, pageSize) {
      //   return [
      //     {
      //       //   canvas: [
      //       //     // { type: 'line', x1: 5, y1: 5, x2: 590, y2: 5, lineWidth: 1 }, //Up line
      //       //     // { type: 'line', x1: 5, y1: 5, x2: 5, y2: 835, lineWidth: 1 }, //Left line
      //       //     { type: 'line', x1: 5, y1: 807.5, x2: 500, y2: 807.5, lineWidth: 1 }, //Bottom line
      //       //     // { type: 'line', x1: 590, y1: 5, x2: 590, y2: 835, lineWidth: 1 }, //Rigth line
      //       //   ],
      //       svg: `<svg height="820" width="445">
      //         <line x1="-80" y1="795.8" x2="138.2" y2="795.8" style="stroke:#111;stroke-width:1" />
      //       </svg>`

      //     }
      //   ]
      // },
      content: [
        this.getPoliceInfo(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getPoliceHeading(data: any, reportObj: any){
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
              margin: [-230, 5, 0, 0],
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

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: '',

              colSpan: 3,
            },
            {},
            {},
          ],
          // // row 2
          [
            {},
            {},
            {
              text: `Zone Wise Police Arrear Details`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],

          // row 3
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${reportObj.date ?? ''
                }`,
              style: [setSubSetHeading],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          // row- 4
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '(Govt., Semi Govt., Autonomous & Corporation)',
              style: [setSubSetHeading],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              style: ['setLeft'],
              margin: [0, 0, 30, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          // row 5
          [
            {
              text: `Total Customer :\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -17, 30, 0],
              colSpan: 10,
              bold: false
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

  private getPoliceInfo(data: any, reportObj: any, utilityObj: any){
    function addNumbers(a: string,result: {value: string}): void {
      result.value = a;
  }
  let zoneName = {value: ''}
     let grandPrevArrearAmt = 0;
     let grandCurrMonthBill = 0;
     let grandTotalCollection = 0;
     let grandTotalArrearAmt= 0;
     let uniqueZoness = [...new Set(data.map(item => item.zoneName
      ))];
    
      var dd  = {
        content: uniqueZoness.map(function(item) {
            return { text: item, pageBreak: 'after'}
        })
    };
      
    //console.log(dd);
     
    const phase = {
      margin: [5, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, 60, '*', 125, 185, 70, 70, 70, 70, 70],
        heights: 10,
        body: [
          [
            {
              text: `SI`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true],
              //lineHeight: 1.21
            },
            {
              text: `Zone`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: `Sales and Distribution`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: `Name`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: `Address`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: `Customer No`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: 'Arrear Amount(Upto-Previous Month)',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: 'Current Month Bill',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: `Total Collection`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: 'Total Arrear(Current Month)',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
          ]
        ]
      },
      layout: this.setTableStyles()
    };

    let uniqueZones = [...new Set(data.map(item => item.zoneName
      ))];
     
      let policeProviderNo = 0;
    uniqueZones.forEach((item) => {
      let providerMiddleInsert = 8;
      let testlist=data.filter(p=>p.zoneName==item);
      let policeArrearGroupByZoneLength = testlist.length;
      console.log(policeArrearGroupByZoneLength);
      let policeProviderInsert = Math.ceil(policeArrearGroupByZoneLength / 2);
      

      let uniqueLocatons = [...new Set(testlist.map(item => item.locationCode || item.zoneName))];
     
        // if(item){
        // phase.table.body.push(
        //   [
        //     {
        //       text: `Zone - ${item}`,
        //       style: ['setBold','setLeft', 'setBig'],
        //       colSpan: 9,
        //       border: [true, true, true, true]
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: ``,
        //       style: [],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //   ]
        // );
      
        // phase.table.body.push(
        //   [
        //     {
        //       text: `SI`,
        //       style: ['setBold', 'setBig'],
        //       colSpan: 1,
        //       border: [true, true, true, true]
        //     },
        //     {
        //       text: `Sales and Distribution`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Name`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Address`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Customer No`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Principal`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Lps`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Vat`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //     {
        //       text: `Total`,
        //       style: ['setBold', 'setBig'],
        //       border: [true, true, true, true],
        //       colSpan: 1
        //     },
        //   ]
        // );
        let locationName = '';
        if(policeArrearGroupByZoneLength > 0){
          let providerNo = 0;
          let serial = 1;
          
        // uniqueLocatons.forEach((location)=> {
          
          // let policeArrearGroupByLocation=data.filter(x=>x.locationCode
          //   ==location);
          // let policeArrearGroupByLocationLength = policeArrearGroupByLocation.length;
          // let providerInsert=Math.ceil(Number(policeArrearGroupByLocationLength/2));
          // if(policeArrearGroupByLocationLength == 2){
          //   providerInsert += 1;
          // }
          // if(policeArrearGroupByLocationLength > 0){
            // let providerNo = 0;

            let zonePrevArrearAmt= 0;
            let zoneCurrMonthBill = 0;
            let zoneTotalCollection = 0;
            let zoneTotalArrearAmt = 0;

            let zoneName="";
            testlist.forEach(value => {
              
              let providerName=`${value.locationDesc} (${value.locationCode})`;
              zoneName=value.zoneName;
              providerNo+=1;

              zonePrevArrearAmt += value.prevArrearAmt;
              zoneCurrMonthBill += value.currMonthBill;
              zoneTotalCollection += value.totalCollection;
              zoneTotalArrearAmt += value.totalArrearAmt;
              // PrevArrearAmt
              // CurrMonthBill
              // TotalCollection
              // TotalArrearAmt
              // prevArrearAmt
              // currMonthBill
              // totalCollection
              // totalArrearAmt
              if(providerMiddleInsert < policeArrearGroupByZoneLength){
                providerMiddleInsert = providerNo%10 ==0 ? (providerMiddleInsert +10) : (providerMiddleInsert +0)
              }

              phase.table.body.push(
                [
                  {
                    text: `${serial++}`,
                    border: [true, true, true, true],
                    style: ['setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${providerNo == providerMiddleInsert ? value.zoneName : ""}`,
                    border: policeProviderInsert == 1 || providerNo == policeArrearGroupByZoneLength ? [true, false, true, true]: [true, false, true, false],
                    style: ['setLeft', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${providerName != locationName ? providerName : ""}`,
                    border: providerName != locationName ? [true, true, true, false]: [true, false, true, false],
                    style: ['setLeft', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.customerName}`,
                    border: [true, true, true, true],
                    style: ['setLeft', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.customerAddress}`,
                    border: [true, true, true, true],
                    style: ['setLeft', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.customerNo}`,
                    border: [true, true, true, true],
                    style: ['setRight', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.prevArrearAmt ? Number(value.prevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                    border: [true, true, true, true],
                    style: ['setRight', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.currMonthBill ? Number(value.currMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                    border: [true, true, true, true],
                    style: ['setRight','setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.totalCollection ? Number(value.totalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                    border: [true, true, true, true],
                    style: ['setRight', 'setBig'],
                    colSpan: 1,
                  },
                  {
                    text: `${value.totalArrearAmt ? Number(value.totalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                    border: [true, true, true, true],
                    style: ['setRight', 'setBig'],
                    colSpan: 1,
                  },
                ]
              );
              locationName = providerName;
            })
          // }
      // });
         
      grandPrevArrearAmt += zonePrevArrearAmt;
      grandCurrMonthBill += zoneCurrMonthBill;
      grandTotalCollection += zoneTotalCollection;
      grandTotalArrearAmt += zoneTotalArrearAmt;

      //Zone Total
        phase.table.body.push(
          [
            {
              text: `Total of ${zoneName} Zone`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
              colSpan: 6,
              ///lineHeight: 1.21
            },
            {
              text: ``,
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: ``,
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: ``,
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: ``,
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              text: ``,
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              // text: `${zonePrnTotal.toFixed(2)}`,
              text: `${zonePrevArrearAmt ? Number(zonePrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              // text: `${zoneLpsTotal.toFixed(2)}`,
              text: `${zoneCurrMonthBill ? Number(zoneCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              // text: `${zoneVatTotal.toFixed(2)}`,
              text: `${zoneTotalCollection ? Number(zoneTotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
              //lineHeight: 1.21
            },
            {
              // text: `${zoneAbsoluteTotal.toFixed(2)}`,
              text: `${zoneTotalArrearAmt ? Number(zoneTotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBig', 'setBold'],
              colSpan: 1,
              //lineHeight: 1.21
            },
          ]
        );
      }
    // }
    });
  

      // Grand Total
      phase.table.body.push(
        [
          {
            text: `Grand Total`,
            border: [true, true, true, true],
            style: [ 'setBig', 'setBold'],
            colSpan: 6,
            //lineHeight: 1.21
          },
          {
            text: ``,
            style: [],
            border: [true, true, true, true],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            text: ``,
            style: [],
            border: [true, true, true, true],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            text: ``,
            style: [],
            border: [true, true, true, true],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            text: ``,
            style: [],
            border: [true, true, true, true],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            text: ``,
            style: [],
            border: [true, true, true, true],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            // text: `${grandZonePrnTotal.toFixed(2)}`,
            text: `${grandPrevArrearAmt ? Number(grandPrevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            // text: `${grandZoneLpsTotal.toFixed(2)}`,
            text: `${grandCurrMonthBill ? Number(grandCurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            // text: `${grandZoneVatTotal.toFixed(2)}`,
            text: `${grandTotalCollection ? Number(grandTotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
            //lineHeight: 1.21
          },
          {
            // text: `${grandZoneAbosluteTotal.toFixed(2)}`,
            text: `${grandTotalArrearAmt ? Number(grandTotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
            //lineHeight: 1.21
          },
        ]
      );
  
    return phase;
  }
}
