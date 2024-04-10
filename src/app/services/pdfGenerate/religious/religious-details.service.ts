import { Injectable } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailLogo,ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReligiousDetailsService {

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
        title: 'Mosque & other Places of Worship Details',
        author: 'BPDB',
        subject: 'Mosque & other Places of Worship Details',
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
      header: this.getHeading(data,utilityObj),background: function (currentPage, pageSize) {
        return [
          {
            // svg: `<svg height="1060" width="945">
            //   <line x1="3.5" y1="535" x2="222.4" y2="535" style="stroke:#111;stroke-width:1" />
            // </svg>` 
          }
        ]
      },
      content: [
        this.getReligiousDetails(data, reportObj, utilityObj)
      ],
      // pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      pageMargins: [30, 100, 30, 30],
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  
  private getHeading(data: any, utilityObj: any){
    let decreateDate = dayjs(utilityObj.reportDate).add(-1, 'month').format('YYYYMM');
     let year = dayjs(decreateDate).format("YYYY");
     let month = this.getMonth(decreateDate);


    const totalCount = data.length;
  //   let {reportDate} = utilityObj;
  //   let year = (dayjs(reportDate).format("YYYY"));
  //   let month: string;
  //   switch (dayjs(reportDate).format("M")) {
  //    case "1": {
  //      month = "January"
  //      break
  //    }
  //    case "2": {
  //      month = "February"
  //      break
  //    }
  //    case "3": {
  //      month = "March"
  //      break
  //    }
  //    case "4": {
  //      month = "April"
  //      break
  //    }
  //    case "5": {
  //      month = "May"
  //      break
  //    }
  //    case "6": {
  //      month = "June"
  //      break
  //    }
  //    case "7": {
  //      month = "July"
  //      break
  //    }
  //    case "8": {
  //      month = "August"
  //      break
  //    }
  //    case "9": {
  //      month = "September"
  //      break
  //    }
  //    case "10": {
  //      month = "October"
  //      break
  //    }
  //    case "11": {
  //      month = "November"
  //      break
  //    }
  //    case "12":
  //    default:
  //      {
  //        month = "December"
  //        break
  //      }
  //  }

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
              margin: [-160, 5, 0, 0],
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
              text: `Religious Details`,
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
              text: `Accounts Receivable As On ${month} -${year}`,
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
              // text: ``,
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

  private getReligiousDetails(data: any, reportObj: any, utilityObj: any){
    let grandZonePrnTotal = 0;
    let grandZoneLpsTotal = 0;
    let grandZoneVatTotal = 0;
    let grandArrearTotal = 0;

    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30,60, '*', 'auto', 120, 130, 'auto', 'auto', 'auto', 'auto'],
        body: [          
          [
            {
              text: `SI`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text: `Zone`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text: `Sales and Distribution`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Customer No`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Name`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Address`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Principal`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Lps`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Vat`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Total`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
          ]
        ]
      },
      layout: this.setTableStyles()
    };

    let allZone=data;
    let allLocation=data;
    let uniqueZone = [...new Set(allZone.map(item => item.zoneName ))];

    uniqueZone.forEach((zone)=>{
      let locationGroupByZone=allLocation.filter(x=>x.zoneName==zone);
      let locationGroupByZoneLength=locationGroupByZone.length;
      let providerInsert=Math.ceil(Number(locationGroupByZoneLength/1.5));

      let middleInsertProviderNo = 5;
      let locationname='';
      let serial=1;

      
        let zonePrnTotal= 0;
        let zoneLpsTotal = 0;
        let zoneVatTotal = 0;
        let zoneTotal = 0;
        let ZoneName='';
      if(locationGroupByZoneLength>0){
        let providerNo=0;
        locationGroupByZone.forEach((locationData)=>{
          let{zoneName,locationName,locationCode,customerNo,customerName,address,prn,lps,vat,totalArrear}=locationData;
          let locationNameWithCode=`${locationName} (${locationCode})`;
          serial +1;
          providerNo +=1;
          ZoneName=zoneName;
          
          if(middleInsertProviderNo < locationGroupByZoneLength){
            middleInsertProviderNo = providerNo%10==0 ? (middleInsertProviderNo +10) : (middleInsertProviderNo +0) 
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
                text: `${providerNo == middleInsertProviderNo ? zoneName : ""}`,
                border: providerInsert==1 ||providerNo==locationGroupByZoneLength? [true, false, true, true]:[true, false, true, false],
                style: ['setBig'],
                colSpan: 1,
              },
              {
                text: `${locationNameWithCode !=locationname ? locationNameWithCode:""}`,
                border: locationNameWithCode!= locationname ?  [true, true, true, false]: [true, false, true, false],
                style: [ 'setBig','topCenter'],
                colSpan: 1, 
              },
              {
                text: `${customerNo}`,
                border: [true, true, true, true],
                style: ['setRight', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${customerName==null ? "":customerName}`,
                border: [true, true, true, true],
                style: ['setLeft', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${address==null ? "":address}`,
                border: [true, true, true, true],
                style: ['setLeft', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${prn? Number(prn).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${lps? Number(lps).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight','setBig'],
                colSpan: 1,
              },
              {
                text: `${vat? Number(vat).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${totalArrear? Number(totalArrear).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight', 'setBig'],
                colSpan: 1,
              },
            ]
          );
          zonePrnTotal += prn;
          zoneLpsTotal += lps;
          zoneVatTotal += vat;
          zoneTotal += totalArrear;
          locationname=locationNameWithCode;
        })
      }
      //Zone Total
      phase.table.body.push(
        [
          {
            text: `Total of ${ZoneName} Zone`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
            colSpan: 6,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [ ],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [ ],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [ ],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [ ],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [ ],
            colSpan: 1,
          },
          {
            text: `${zonePrnTotal ? Number(zonePrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${zoneLpsTotal ? Number(zoneLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${zoneVatTotal ? Number(zoneVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${zoneTotal ? Number(zoneTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
        ]
      );
      // Empty Row    
      if(zone != uniqueZone[uniqueZone.length-1]){
        phase.table.body.push(
          [
            {
              text: ``,
              border: [false, true, false, true],
              style: [],
              colSpan: 10,
            },
            {
              text: ``,
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
            {
              text: ``,
              border: [false, false, false, false],
              style: [],
              colSpan: 1,
            },
          ]
        );
      }
      
    grandZonePrnTotal += zonePrnTotal;
    grandZoneLpsTotal += zoneLpsTotal;
    grandZoneVatTotal += zoneVatTotal;
    grandArrearTotal += zoneTotal;  
    })
    //Grand Total
    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          border: [true, true, true, true],
          style: [ 'setBig', 'setBold'],
          colSpan: 6,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [ ],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [ ],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [ ],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [ ],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [ ],
          colSpan: 1,
        },
        {
          text: `${grandZonePrnTotal? Number(grandZonePrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandZoneLpsTotal? Number(grandZoneLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandZoneVatTotal? Number(grandZoneVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandArrearTotal? Number(grandArrearTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
      ]
    );
    return phase;
  }
  private getMonth(billMonth: string): string{
    let month='';
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
    return month;
  }
}
