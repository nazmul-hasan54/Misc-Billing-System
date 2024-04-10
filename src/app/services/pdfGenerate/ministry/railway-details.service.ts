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
export class RailwaydetailsService {

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
        title: 'Railway ',
        author: 'BPDB',
        subject: 'Railway',
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
      header: this.getHeading(data, reportObj,utilityObj),background: function (currentPage, pageSize) {
        return [
          {
            // svg: `<svg height="1060" width="945">
            //   <line x1="3.5" y1="535" x2="222.4" y2="535" style="stroke:#111;stroke-width:1" />
            // </svg>`
          }
        ]
      },
      content: [
        this.getRailwayInfo(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any){
    const totalCount = data.length;
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
            { text: '', colSpan: 8, border: [false, false, false, false] },
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
            {
              text: '',

              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: `Zone Wise Railway Arrear`,
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
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${utilityObj.billMonth ?? ''}`,
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

  private getRailwayInfo(data: any, reportObj: any, utilityObj: any){
    let grandZonePrnTotal = 0;
     let grandZoneLpsTotal = 0;
     let grandZoneVatTotal = 0;
     let grandZoneAbosluteTotal = 0;
    const phase = {
      margin: [5, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        // footerRows: 1,
				// heights: [10,10.10,10],
        widths: [20,60, '*', 130, 120, 60, 'auto', 'auto', 'auto', 'auto'],
        body: [
          [
            {
              text: `Sl No`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true],
            },
            {
              text: `Zone`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Sales and Distribution`,
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
              text: `Customer No`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Arrear Amount(Upto-Previous Month)',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Current Month Bill',
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Total Collection`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: 'Total Arrear(Current Month)',
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
    let uniqueZones = [...new Set(allZone.map(item => item.zoneName ))];
    uniqueZones.forEach((zone)=>{
        let totalprevArrearAmt= 0;
        let totalcurrMonthBill = 0;
        let ttotalCollection = 0;
        let ttotalArrearAmt = 0;

      let locationGroupByZone=allLocation.filter(x=>x.zoneName==zone);
      let locationGroupByZoneLength=locationGroupByZone.length;
      let providerInsert=Math.ceil(Number(locationGroupByZoneLength/1.5));

      let locationname='';
        let serial=0;
        let middleInsertProviderNo = 2;
        let zoneNam="";
      if(locationGroupByZoneLength>0){
        let providerNo=0;

        locationGroupByZone.forEach((locationData)=>{
          let{zoneName,locationDesc,locationCode,prevArrearAmt,currMonthBill,totalCollection,totalArrearAmt,customerNo,customerAddress,customerName}=locationData;
          let locationNameWithCode=`${locationDesc} (${locationCode})`;
          zoneNam=zoneName;
          serial ++;
          providerNo +=1;


          totalprevArrearAmt += prevArrearAmt;
          totalcurrMonthBill += currMonthBill;
          ttotalCollection += totalCollection;
          ttotalArrearAmt += totalArrearAmt;

          if(middleInsertProviderNo < locationGroupByZoneLength){
            middleInsertProviderNo = providerNo%10==0 ? (middleInsertProviderNo +10) : (middleInsertProviderNo +0)
          }
          phase.table.body.push(
            [
              {
                text: `${serial}`,
                border: [true, true, true, true],
                style: [],
                colSpan: 1,
              },
              {
                text: `${providerNo == middleInsertProviderNo ? zoneName : ""}`,
                border: providerInsert==1 || providerNo == locationGroupByZoneLength ? [true, false, true, true]:[true, false, true, false],
                style: ['setLeft','setBold', 'setBig'],
                colSpan: 1,
              },
              {
                text: `${locationNameWithCode !=locationname ? locationNameWithCode:""}`,
                border: locationNameWithCode!= locationname ?  [true, true, true, false]: [true, false, true, false],
                style: ['setLeft','setBold',],
                colSpan: 1,
              },
              {
                text: `${customerName}`,
                border: [true, true, true, true],
                style: ['setLeft'],
                colSpan: 1,
              },
              {
                text: `${customerAddress}`,
                border: [true, true, true, true],
                style: ['setLeft'],
                colSpan: 1,
              },
              {
                text: `${customerNo}`,
                border: [true, true, true, true],
                style: [''],
                colSpan: 1,
              },
              {
                text: `${prevArrearAmt ? Number(prevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight'],
                colSpan: 1,
              },
              {
                text: `${currMonthBill ? Number(currMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight'],
                colSpan: 1,
              },
              {
                text: `${totalCollection ? Number(totalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight'],
                colSpan: 1,
              },
              {
                text: `${totalArrearAmt ? Number(totalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setRight'],
                colSpan: 1,
              },
            ]
          );
          locationname=locationNameWithCode;
        })
      }
      //Zone Total
      phase.table.body.push(
        [
          {
            text: `Total of ${zoneNam} Zone`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 6,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: `${totalprevArrearAmt ? Number(totalprevArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${totalcurrMonthBill ? Number(totalcurrMonthBill).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${ttotalCollection ? Number(ttotalCollection).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
          {
            text: `${ttotalArrearAmt ? Number(ttotalArrearAmt).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight', 'setBig', 'setBold'],
            colSpan: 1,
          },
        ]
      );
      // Empty Row
      if(zone != uniqueZones[uniqueZones.length-1]){
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
      grandZonePrnTotal += totalprevArrearAmt;
      grandZoneLpsTotal += totalcurrMonthBill;
      grandZoneVatTotal += ttotalCollection;
      grandZoneAbosluteTotal += ttotalArrearAmt;
    });
    //Grand Total
    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 6,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [],
          colSpan: 1,
        },
        {
          text: `${grandZonePrnTotal ? Number(grandZonePrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandZoneLpsTotal ? Number(grandZoneLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandZoneVatTotal ? Number(grandZoneVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
        {
          text: `${grandZoneAbosluteTotal ? Number(grandZoneAbosluteTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig', 'setBold'],
          colSpan: 1,
        },
      ]
    );
    return phase;
  }
}
