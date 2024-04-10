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
export class OnlinePouroshovaDetailsService {
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
        title: 'Online Pouroshova Details',
        author: 'BPDB',
        subject: 'Online Pouroshova Details',
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
        this.getOnlinePouroshovaDetails(data, reportObj, utilityObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle,
    }
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }


  private getHeading(data: any, utilityObj: any, reportObj: any){
   let t=  data.filter(c=>c.pouroshovaCode !=" ") as any[];
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
            {},
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

  
  private getOnlinePouroshovaDetails(data: any, reportObj: any, utilityObj: any){
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

    let uniquePouroshova = [...new Set(data.map(item => item.pouroshovaCode))];
    let removeNulluniquePouroshovaData = uniquePouroshova.filter(el => {
      return el != null && el != '' && el != ' ';
    });
    removeNulluniquePouroshovaData?.forEach((pouroshova) => {
      let middleInsertProviderNo = 5;
      let pouroshovaDetailsData = data.filter(x=>x.pouroshovaCode == pouroshova);
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
      let pouroshovaName='';

      let totalPrincipal=0;
      let totalLPS=0;
      let totalVAT=0;
      let totalarrearamount=0;
      pouroshovaDetailsData.forEach(value => {
        
        totalPrincipal=(value.currPrincipal + value.arrearPrincipal);
        totalLPS=(value.currLps + value.arrearLps);
        totalVAT=(value.currVat + value.arrearVat);
        totalarrearamount=(totalPrincipal+totalLPS+totalVAT);
        
        pouroshovaName =value.pouroName;
        serial++;
        providerNo += 1;
        if(value.pouroshovaCode != null){
          pouroPrnTotal += totalPrincipal;
          pouroLpsTotal += totalLPS;
          pouroVatTotal += totalVAT;
          pouroTotalArrearTotal += value.totalArrearAmount;
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
                text: `${pouroshovaDetailsDataLength < 11 ? providerNo == providerInsert ?   pouroName  : "" : providerNo == middleInsertProviderNo ?  value.pouroName : ""}`,
                border: providerInsert==1 ||providerNo==pouroshovaDetailsDataLength? [true, false, true, true]:[true, false, true, false],
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


      // Pouroshova Total Section //

      grandPouroPrnTotal += pouroPrnTotal;
      grandPouroLpsTotal += pouroLpsTotal;
      grandPourVatTotal += pouroVatTotal;
      grandPouroTotalArrearAmount += pouroTotalArrearTotal;
      phase.table.body.push(
        [
          {
            text: ` Total of ${pouroshovaName} Pouroshova`,
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
            text: `${pouroPrnTotal ? Number(pouroPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${pouroLpsTotal ? Number(pouroLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${pouroVatTotal ? Number(pouroVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${pouroTotalArrearTotal ? Number(pouroTotalArrearTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
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
            text: `${grandPouroPrnTotal ? Number(grandPouroPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPouroLpsTotal ? Number(grandPouroLpsTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPourVatTotal ? Number(grandPourVatTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setBig', 'setBold'],
          },
          {
            text: `${grandPouroTotalArrearAmount ? Number(grandPouroTotalArrearAmount).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
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
