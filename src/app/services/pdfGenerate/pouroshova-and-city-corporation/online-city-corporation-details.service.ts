import { Injectable } from '@angular/core';
import { fadeInItems } from '@angular/material/menu';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailLogo,ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, miscDefaultStyle, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})

export class OnlineCityCorporationDetailsService {

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
        title: 'Online City Corporation Details',
        author: 'BPDB',
        subject: 'Online City Corporation Details',
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
        this.getOnlineCityCorporationDetails(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle,
    }
  }

  private getHeading(data: any, utilityObj: any, reportObj: any){
    let t=  data.filter(c=>c.cityCorporationCode !=" ") as any[];
    const totalCount=t.length;
    
   let {billMonth} = utilityObj;
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
            { },
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${billMonth}`,
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

private getOnlineCityCorporationDetails(data: any, reportObj: any, utilityObj: any){
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
    
  let uniqueCityCorporationAndLocation = [...new Set(data.map(item => item.cityCorporationCode ))];
  let uniqueCityCorporation = [...new Set(data.map(item => item.cityCorporationCode ))]
  console.log(uniqueCityCorporation);
  let cityCorporationList = uniqueCityCorporation.filter(el => {
    return el != null && el != '' && el != ' ';
  });
  console.log(cityCorporationList);
  let uniquePouroshova = [...new Set(data.map(item => item.pouroshovaCode))];
  let removeNulluniquePouroshovaData = uniquePouroshova.filter(el => {
    return el != null && el != '' && el != ' ';
  });

   // Unique City Corporaton Loop //
   cityCorporationList?.forEach((cityCorporaton) => {
    let cityPrnTotal = 0;
    let cityLpsTotal = 0;
    let cityVatTotal = 0;
    let cityTotalArrearTotal = 0;
      let middleInsertProviderNo = 5;
      let cityCorporationData = data.filter(x=> x.cityCorporationCode == cityCorporaton);
      let cityCorporationDataLength = cityCorporationData.length;
      let providerInsert=Math.ceil(Number(cityCorporationDataLength/2));
      let providerNo =0;
      let cityCorpoName='';
      let totalPrincipal=0;
      let totalLPS=0;
      let totalVAT=0;
      let totalarrearamount=0;
      cityCorporationData.forEach(value => {
      let {cityCorporationName}=value; 
      totalPrincipal=(value.currPrincipal + value.arrearPrincipal);
      totalLPS=(value.currLps + value.arrearLps);
      totalVAT=(value.currVat + value.arrearVat);
      cityCorpoName=cityCorporationName;
        serial++;
        providerNo += 1;
        if(middleInsertProviderNo < cityCorporationDataLength){
          middleInsertProviderNo = providerNo%12 == 0 ? (middleInsertProviderNo +12) : (middleInsertProviderNo +0)
          console.log(middleInsertProviderNo); 
        }
       
        if(value.cityCorporationCode != null){
          cityPrnTotal += totalPrincipal;
          cityLpsTotal += totalLPS;
          cityVatTotal += totalVAT;
          cityTotalArrearTotal += value.totalArrearAmount;
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
                text: `${value.consumerNo}`,
                border: [true, true, true, true],
                style: ['setBig'],
              },
              {
                text: `${value.customerName != null ? value.customerName : ''}`,
                border: [true, true, true, true],
                style: ['setBig'],
              },
              {
                text: `${totalPrincipal ? Number(totalPrincipal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setBig'],
              },
              {
                text: `${totalLPS ? Number(totalLPS).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setBig'],
              },
              {
                text: `${totalVAT ? Number(totalVAT).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
                border: [true, true, true, true],
                style: ['setBig'],
              },
              {
                text: `${value.totalArrearAmount ? Number(value.totalArrearAmount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
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

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
}
