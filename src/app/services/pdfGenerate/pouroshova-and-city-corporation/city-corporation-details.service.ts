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
export class CityCorporationDetailsService {

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
        title: 'City Corporation Details ',
        author: 'EBCWEB',
        subject: 'City Corporation Details',
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
        this.getCityCorporationDetails(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle,
    }
  }

  private getHeading(data: any, reportObj: any, utilityObj: any){
     let totalCount=  data.filter(c=>c.citycorporationcode != null).length;
     //const totalCount=t.length;

    //const totalCount = data.length;
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
              text: `City Corporation Details`,
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
              text: `Accounts Receivable As On ${reportObj.billMonth ?? ''}`,
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

  
  private getCityCorporationDetails(data: any, reportObj: any, utilityObj: any){
    let grandCityPrnTotal = 0;
    let grandCityLpsTotal = 0;
    let grandCityVatTotal = 0;
    let grandCityTotalArrearAmount = 0;
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
              text: `City Corporation`,
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
              text: `Principal`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Lps`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Vat`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `Total`,
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
    let cityCorporationList = uniqueCityCorporation.filter(n => n);

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
            cityPrnTotal += value.prn;
            cityLpsTotal += value.lps;
            cityVatTotal += value.vat;
            cityTotalArrearTotal += value.totalarrearamount;
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
                  text: `${value.prn ? Number(value.prn).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.lps ? Number(value.lps).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.vat ? Number(value.vat).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
                },
                {
                  text: `${value.totalarrearamount ? Number(value.totalarrearamount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                  border: [true, true, true, true],
                  style: ['setBig'],
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
              text: `${cityPrnTotal ? Number(cityPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${cityLpsTotal ? Number(cityLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${cityVatTotal ? Number(cityVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
            },
            {
              text: `${cityTotalArrearTotal ? Number(cityTotalArrearTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setBig', 'setBold'],
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
            text: `${grandCityPrnTotal ? Number(grandCityPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandCityLpsTotal ? Number(grandCityLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandCityVatTotal ? Number(grandCityVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandCityTotalArrearAmount ? Number(grandCityTotalArrearAmount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
        ],
      );
      return phase;
  }
}
