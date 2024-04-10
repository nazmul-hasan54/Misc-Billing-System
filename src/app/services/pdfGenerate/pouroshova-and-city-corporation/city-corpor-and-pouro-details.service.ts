import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import { __values } from 'tslib';
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CityCorporAndPouroDetailsService {

  defaultColor = '#000000';
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
        title: 'City Corporation And Pouroshova Details ',
        author: 'MISCBILL',
        subject: 'City Corporation And Pouroshova Details',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
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
      header: this.getHeading(data, reportObj,utilityObj),
      content: [
        this.getCityCorporationAndPouroshovaDetails(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle,
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any){
    const totalCount = data.length;
        
    let billMonth = reportObj.billMonth;
    let year = (dayjs(billMonth).format("YYYY"));
    let month: string;
 
    switch (dayjs(billMonth).format("M")) {
     case "1": {
       month = "January"
       break
     }
     case "2": {
       month = "February"
       break
     }
     case "3": {
       month = "March"
       break
     }
     case "4": {
       month = "April"
       break
     }
     case "5": {
       month = "May"
       break
     }
     case "6": {
       month = "June"
       break
     }
     case "7": {
       month = "July"
       break
     }
     case "8": {
       month = "August"
       break
     }
     case "9": {
       month = "September"
       break
     }
     case "10": {
       month = "October"
       break
     }
     case "11": {
       month = "November"
       break
     }
     case "12":
     default:
       {
         month = "December"
         break
       }
   }
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-165, 5, 0, 0],
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
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
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
          [
            {},
            {},
            {
              text: `City Corporation And Pouroshova Details`,
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
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${month }-${year}`,
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
          [
            {},
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
            {},
            {},
            {},
          ],
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

  private getCityCorporationAndPouroshovaDetails(data: any, reportObj: any, utilityObj: any){
    let grandCityPrnTotal = 0;
    let grandCityLpsTotal = 0;
    let grandCityVatTotal = 0;
    let grandCityTotalArrearAmount = 0;
    let grandPouroPrnTotal = 0;
    let grandPouroLpsTotal = 0;
    let grandPourVatTotal = 0;
    let grandPouroTotalArrearAmount = 0;
    let grandCityAndPouroPrnTotal = 0;
    let grandCityAndPouroLpsTotal = 0;
    let grandCityAndPouroVatTotal = 0;
    let grandCityAndPourTotalArrearTotal = 0;
    const phase = {
      table: {
        margin: [5, 0, 0, 0],
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, 150, 75, 140, 75, 75, 75, 75],
        body: [
          [
            {
              text: `SI`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
              colSpan: 1,
            },
            {
              text: `City Corporation / Pouroshova`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Customer No`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Customer Name`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Arrear Amount(Upto-Previous Month)`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Current Month Bil`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Total Collection`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Total Arrear(Current Month`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
          ]
        ],
      },
      layout: this.setTableStyles()
    }
    
    let serial = 0;
    
    let uniqueCityCorporationAndLocation = [...new Set(data.map(item => item.citycorporationcode || item.pouroshovacode))];
    let uniqueCityCorporation = [...new Set(data.map(item => item.citycorporationcode ))]
    console.log(uniqueCityCorporation);
    let cityCorporationList = uniqueCityCorporation.filter(n => n);
    console.log(cityCorporationList);
    let uniquePouroshova = [...new Set(data.map(item => item.pouroshovacode))];
    let removeNulluniquePouroshovaData = uniquePouroshova.filter(n => n);

     // Unique City Corporaton Loop //
     cityCorporationList?.forEach((cityCorporaton) => {
      let cityPrnTotal = 0;
      let cityLpsTotal = 0;
      let cityVatTotal = 0;
      let cityTotalArrearTotal = 0;
        let middleInsertProviderNo = 5;
        let cityCorporationData = data.filter(x=> x.citycorporationcode == cityCorporaton);
        let cityCorporationDataLength = cityCorporationData.length;

        let providerInsert=Math.ceil(Number(cityCorporationDataLength/2));
        let providerNo =0;
        let cityCorpoName='';
        cityCorporationData.forEach(value => {
        let {cityCorporationName}=value; 
        cityCorpoName=cityCorporationName;
          serial++;
          providerNo += 1;
          if(middleInsertProviderNo < cityCorporationDataLength){
            middleInsertProviderNo = providerNo%12 == 0 ? (middleInsertProviderNo +12) : (middleInsertProviderNo +0)
            console.log(middleInsertProviderNo); 
          }
         
          if(value.citycorporationcode != null){
            cityPrnTotal += value.previousReceiptArrear;
            cityLpsTotal += value.currentMonthBill;
            cityVatTotal += value.totalReceipt;
            cityTotalArrearTotal += value.currentReceiptArrear;
            phase.table.body.push(
              [
                {
                  text: `${providerNo}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                  colSpan: 1,
                },
                {
                  text: `${cityCorporationDataLength < 12 ? providerNo == providerInsert ?   value.cityCorporationName  : "" : providerNo == middleInsertProviderNo ?   value.cityCorporationName  : ""}`,
                  border: providerInsert==1 ||providerNo==cityCorporationDataLength? [true, false, true, true]:[true, false, true, false],
                  style: ['setBig'],
                },
                {
                  text: `${value.customerNo}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.customername != null ? value.customername : ''}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.previousReceiptArrear ? Number(value.previousReceiptArrear).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.currentMonthBill ? Number(value.currentMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.totalReceipt ? Number(value.totalReceipt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.currentReceiptArrear ? Number(value.currentReceiptArrear).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
              ]
            );
          }
          
        });

       
        // City Corporation Total Sectoin //

        grandCityPrnTotal += cityPrnTotal;
        grandCityLpsTotal += cityLpsTotal;
        grandCityVatTotal += cityVatTotal;
        grandCityTotalArrearAmount += cityTotalArrearTotal;
        phase.table.body.push(
          [
            {
              text: `Total of ${cityCorpoName}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold',],
              colSpan: 4,
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${(cityPrnTotal > 0 ? cityPrnTotal : 0).toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold','setRight'],
            },
            {
              text: `${(cityLpsTotal > 0 ? cityLpsTotal : 0).toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold','setRight'],
            },
            {
              text: `${(cityVatTotal > 0 ? cityVatTotal : 0).toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold','setRight'],
            },
            {
              text: `${(cityTotalArrearTotal > 0 ? cityTotalArrearTotal : 0).toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold','setRight'],
            },
          ],
        );
      });


      // Grand City Corporation Total Section //

      phase.table.body.push(
        [
          {
            text: `Grand City Corporation Total`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold',],
            colSpan: 4,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${(grandCityPrnTotal != null ? grandCityPrnTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold','setRight'],
          },
          {
            text: `${(grandCityLpsTotal != null ? grandCityLpsTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold','setRight'],
          },
          {
            text: `${(grandCityVatTotal != null ? grandCityVatTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold','setRight',],
          },
          {
            text: `${(grandCityTotalArrearAmount != null ? grandCityTotalArrearAmount : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold','setRight',],
          },
        ],
      );

      
      // Take some space after completing city corporation //

      phase.table.body.push(
        [
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [],
            style: ['setBig', 'setBold'],
          },

        ]
      );
      phase.table.body.push(
        [
          {
            text: `SI`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `City Corporation / Pouroshova`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Customer No`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Customer Name`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Arrear Amount(Upto-Previous Month)`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Current Month Bil`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Total Receipt`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `Total Arrear(Current Month`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
        ]
      );
        // Pouroshova Loop Start Here //

        removeNulluniquePouroshovaData?.forEach((pouroshova) => {
        let middleInsertProviderNo = 5;
        let pouroshovaDetailsData = data.filter(x=>x.pouroshovacode == pouroshova);
        let pouroshovaDetailsDataLength = pouroshovaDetailsData.length;
        let providerInsert=Math.ceil(Number(pouroshovaDetailsDataLength/2));
        let providerNo =0;
        if(pouroshovaDetailsDataLength == 2){
          providerInsert += 1;
        }
        

        let pouroName='';
        let pouroPrnTotal = 0;
        let pouroLpsTotal = 0;
        let pouroVatTotal = 0;
        let pouroTotalArrearTotal = 0;
        pouroshovaDetailsData.forEach(value => {
          let{pouroshovaname }=value;
          pouroName=pouroshovaname;
          serial++;
          providerNo += 1;
          if(value.pouroshovacode != null){
            pouroPrnTotal += value.previousReceiptArrear;
            pouroLpsTotal += value.currentMonthBill;
            pouroVatTotal += value.totalReceipt;
            pouroTotalArrearTotal += value.currentReceiptArrear;
            if(middleInsertProviderNo < pouroshovaDetailsDataLength){
              middleInsertProviderNo = providerNo%10 ==0 ? (middleInsertProviderNo +10) : (middleInsertProviderNo + 0) 
            }
            phase.table.body.push(
              [
                {
                  text: `${providerNo}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                  colSpan: 1,
                },
                {
                  text: `${pouroshovaDetailsDataLength < 11 ? providerNo == providerInsert ?   pouroshovaname  : "" : providerNo == middleInsertProviderNo ?  value.pouroshovaname : ""}`,
                  border: providerInsert==1 ||providerNo==pouroshovaDetailsDataLength? [true, false, true, true]:[true, false, true, false],
                  style: ['setBig'],
                },
                {
                  text: `${value.customerNo}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.customername ? value.customername:''}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.previousReceiptArrear ? Number(value.previousReceiptArrear).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.currentMonthBill ? Number(value.currentMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.totalReceipt ? Number(value.totalReceipt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
                {
                  text: `${value.currentReceiptArrear ? Number(value.currentReceiptArrear).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig','setRight'],
                },
              ]
            );
          }
        });


        // Pouroshova Total Section //

        grandPouroPrnTotal += pouroPrnTotal;
        grandPouroLpsTotal += pouroLpsTotal;
        grandPourVatTotal += pouroVatTotal;
        grandPouroTotalArrearAmount += pouroTotalArrearTotal;
        phase.table.body.push(
          [
            {
              text: ` Total of ${pouroName} Pouroshova`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold',],
              colSpan: 4,
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${pouroPrnTotal.toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${pouroLpsTotal.toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${pouroVatTotal.toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${pouroTotalArrearTotal.toFixed(2)}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            }
          ]
        );
        
        
      });


      // Grand Pouroshova Total Section //

      phase.table.body.push(
        [
          {
            text: `Grand Pouroshova Total`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold',],
            colSpan: 4,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPouroPrnTotal.toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPouroLpsTotal.toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPourVatTotal.toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPouroTotalArrearAmount.toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
        ],
      );


      // Grand City Coporatoin and Grand Pouroshova Section //

        grandCityAndPouroPrnTotal = grandCityPrnTotal + grandPouroPrnTotal;
        grandCityAndPouroLpsTotal = grandCityLpsTotal + grandPouroLpsTotal;
        grandCityAndPouroVatTotal = grandCityVatTotal + grandPourVatTotal;
        grandCityAndPourTotalArrearTotal = grandCityTotalArrearAmount + grandPouroTotalArrearAmount;
      phase.table.body.push(
        [
          {
            text: `Grand Total`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold',],
            colSpan: 4,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${(grandCityAndPouroPrnTotal > 0 ? grandCityAndPouroPrnTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${(grandCityAndPouroLpsTotal > 0 ? grandCityAndPouroLpsTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${(grandCityAndPouroVatTotal > 0 ? grandCityAndPouroVatTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${(grandCityAndPourTotalArrearTotal > 0 ? grandCityAndPourTotalArrearTotal : 0).toFixed(2)}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          }
        ]
      );
    return phase;
  }
}
