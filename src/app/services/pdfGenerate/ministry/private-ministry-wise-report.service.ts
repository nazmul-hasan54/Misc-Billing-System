import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, setBillStyles, setHeading, setPdfMakeFonts, setSubHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PrivateMinistryWiseReportService {

  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data: any,utilityObj:any) {
    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any,utilityObj:any) {
    return {
      info: {
        title: 'Prepaid Customer Info',
        author: 'BPDB',
        subject: 'Prepaid Customer Info',
        keywords: 'keywords for document',
      },
      pageSize: 'legal',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [-280, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [400, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data,utilityObj),
      content: [this.getMinistryWiseCustomerDetails(data),this.getPrivateWiseCustomerDetails(data)],
      // pageMargins: ministryDetailsPageMargin,
      // defaultStyle: ministryDetailsDefaultStyle,
      // styles: ministryDetailsStyle,

      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 9,
        color: this.setColor,
      },
      styles: setBillStyles,
      pageMargins:  [30, 100, 30, 30],
    }
  }

  private getHeading(data: any,utilityObj:any) {
    const totalCount = data.length;

    let startDate= (utilityObj.fromDate);
    let day = dayjs(startDate).format("DD"); 
    let month: string;
    let year = dayjs(startDate).format("YYYY");

    let endDate= (utilityObj.toDate);
    let endDay = dayjs(endDate).format("DD"); 
    let endMonth: string;
    let endYear = dayjs(endDate).format("YYYY");

    switch (dayjs(startDate).format("MM")) {
      case "01": {
        month = "January"
        break
      }
      case "02": {
        month = "February"
        break
      }
      case "03": {
        month = "March"
        break
      }
      case "04": {
        month = "April"
        break
      }
      case "05": {
        month = "May"
        break
      }
      case "06": {
        month = "June"
        break
      }
      case "07": {
        month = "July"
        break
      }
      case "08": {
        month = "August"
        break
      }
      case "09": {
        month = "September"
        break
      }
      case "10": {
        month = "October"
        break
      }
      case "11": {
        month = "November "
        break
      }
      case "12":
      default:
        {
          month = "December"
          break
        }
    };

    switch (dayjs(endDate).format("MM")) {
      case "01": {
        endMonth = "January"
        break
      }
      case "02": {
        endMonth = "February"
        break
      }
      case "03": {
        endMonth = "March"
        break
      }
      case "04": {
        endMonth = "April"
        break
      }
      case "05": {
        endMonth = "May"
        break
      }
      case "06": {
        endMonth = "June"
        break
      }
      case "07": {
        endMonth = "July"
        break
      }
      case "08": {
        endMonth = "August"
        break
      }
      case "09": {
        endMonth = "September"
        break
      }
      case "10": {
        endMonth = "October"
        break
      }
      case "11": {
        endMonth = "November "
        break
      }
      case "12":
      default:
        {
          endMonth = "December"
          break
        }
    };
   
    const phase={
        margin: [0, 20, 0, 0],
        table: {
          // headerRows: 1,
          dontBreakRows: true,
          widths: [50, 50, '*', '*', 60, 40],
          body: [
            [
              {
                image: `logo.png`,
                width: 70,
                height: 60,
                rowSpan: 2,
                colSpan: 2,
                alignment: 'right',
                margin: [-275, -10, 0, 0],
                border: [false,false,false,false],
              },
              {},
              {
                text: `BANGLADESH POWER DEVELOPMENT BOARD`,
                style: ['setTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
              {},
            ],
            [
              {},
              {},
              {
                text: `Ministry And Private Wise Customer Details`,
                style: ['setSubTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
              {},
            ],
            [
              {},
              {},
              {
                // text: `From ${day}-${month}-${year} To ${endDay}-${endMonth}-${endYear}`,
                // // text: `${month}-${year}`,
                // style: ['setSubTitleBold'],
                // colSpan: 2,
                // margin: [0, -18, 0, 0],
              },
              {},
              {},
              {}
  
            ],
            [
              {},
              {},
              // {
              //   text: `Ministry Customer`,
              //   style: ['setLeft', 'setBold'],
              //   colSpan: 2,
              //   margin: [-25, 0, 0, 0],
              // },
              {},
              {
                // text: `Total Customer: ${totalCount}`,
                // style: ['setRight','setBold'],
                // colSpan: 2,
                // margin: [0, 0, 0, 0],
              },
              {},
              {},
            ],
            [
              {},
              {},
              {},
              {},
              {},
              {},
            ],
          ]
        },
        layout: 'noBorders'
      }
      return phase;

    
  }

  private getMinistryWiseCustomerDetails(data: any) {
    const phase = {
      margin: [0, 8, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [35,100,100,100,50,100,50,80,80,80,100],
        body: [
          [
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
       
            },
            {
              text: `Ministry Customer`,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },

            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },


          ],
          
          [
            {
              text: `SN`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
       
            },
            {
              text: `Customer Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: `Address`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: `Customer Num`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },

            {
              text: `Location Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Location Desc`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `NOM`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Principal`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Lps`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Vat`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Total`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },


          ]
        ],
      }
    }



    let serial = 0;
    let totalAmount = 0;
    let totalLps = 0;
    let totalVat = 0;
    let totalprincipal = 0;
    
    data.ministryCustomer.forEach(value => {
      
      totalAmount +=value.total;
      totalLps +=value.lps;
      totalVat +=value.vat;
      totalprincipal +=value.prn;
      let {id,name}=value
      serial++;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.customeR_NAME}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.address}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.consumeR_NO}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
   
          {
            text: `${value.locatioN_CODE}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.locatioN_DESC}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.nom}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.prn}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.lps}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.vat}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.total}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
     
   
        ]
      );
    });
    phase.table.body.push(
      [
        {
          text: ``,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
         
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
         
        },
        {
          text: `Total`,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: `${totalprincipal.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: `${totalLps.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        {
          text: `${totalVat.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        {
          text: `${totalAmount.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        
        
        

     
      ]
    );
    return phase;
  }

  private getPrivateWiseCustomerDetails(data: any) {
    const phase = {
      margin: [0, 8, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [35,100,100,100,50,100,50,80,80,80,100],
        body: [
          [
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
       
            },
            {
              text: `Private Customer`,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },

            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: ``,
              style: ['setColumnBold'],
              border: [false, false, false, false],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },


          ],
          
          [
        
            
            {
              text: `SN`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
       
            },
            {
              text: `Customer Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: `Address`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
              
            },
            {
              text: `Customer Num`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },

            {
              text: `Location Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Location Desc`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `NOM`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Principal`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Lps`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Vat`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },
            {
              text: `Total`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              margin: [0, 0, 0, 0],
            },


          ]
        ],
      }
    }



    let serial = 0;
    let totalAmount = 0;
    let totalLps = 0;
    let totalVat = 0;
    let totalprincipal = 0;

    
    data.privateCustomer.forEach(value => {
      totalAmount +=value.total;
      totalLps +=value.lps;
      totalVat +=value.vat;
      totalprincipal +=value.prn;
      let {id,name}=value
      serial++;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.customeR_NAME}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.address}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.consumeR_NO}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
   
          {
            text: `${value.locatioN_CODE}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.locatioN_DESC}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.nom}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.prn}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.lps}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.vat}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
          {
            text: `${value.total}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
          },
     
   
        ]
      );
    });
    phase.table.body.push(
      [
        {
          text: ``,
            style: [],
            border: [true, true, true, true],
            lineHeight: 1,
            margin: [0, 8, 0, 0],
         
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
         
        },
        {
          text: `Total`,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, false, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: ``,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: `${totalprincipal.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        {
          text: `${totalLps.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        {
          text: `${totalVat.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        {
          text: `${totalAmount.toFixed(3)}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 1,
          margin: [0, 8, 0, 0],
        },
        
        
        
        

     
      ]
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
