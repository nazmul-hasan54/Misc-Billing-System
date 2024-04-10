import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setBillStyles, ministryDetailsPageMargin, ministryDetailsDefaultStyle, ministryDetailsStyle, ministryDetailsHeaderMargin } from "../config/pdfMakeConfig";
import { UntracedCustModel } from "../../../model/get-untraced-cust.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class LocationWiseCustomerService {
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
        title: 'Prepaid Customer',
        author: 'BPDB',
        subject: 'Prepaid Customer',
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
      content: [this.getLocationWiseCustomer(data)],
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
    let ttotalArrearAmt=0
    const totalCount = data.length;
    const totalCust = data.totalCustomer;
    ttotalArrearAmt += totalCust;
    // const totalCustomer =data.totalCustomer.length

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
                text: `Prepaid Customer`,
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
                text: `From ${day}-${month}-${year} To ${endDay}-${endMonth}-${endYear}`,
                // text: `${month}-${year}`,
                style: ['setSubTitleBold'],
                colSpan: 2,
                margin: [0, -18, 0, 0],
              },
              {},
              {},
              {}
  
            ],
            [
              {},
              {},
              // {
              //   text: `Location: ${locationName}`,
              //   style: ['setLeft', 'setBold'],
              //   colSpan: 2,
              //   margin: [-25, 0, 0, 0],
              // },
              {},
              {
                // text: `Total Customer: ${ttotalArrearAmt}`,
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

  private getLocationWiseCustomers(data: any) {
    const phase = {
      margin: [0,8, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [15,'*','*','*','*'],
        body: [
          [
            {
              text: `SN`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 3,
              margin: [0, 0, 0, 0],
              colSpan: 1,
       
            },
            {
              text: `ZoneName`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 3,
              margin: [0, 0, 0, 0],
              colSpan: 1,

              
            },
            {
              text: `LocationCode`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 3,
              margin: [0, 0, 0, 0],
              colSpan: 1,
              
            },
            {
              text: `LocationName`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 3,
              margin: [0, 0, 0, 0],
              colSpan: 1,
            },
            {
              text: `Total Customer`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 3,
              margin: [0, 0, 0, 0],
              colSpan: 1,
            },
        
          ],

        ],
      }
    }

  //   let arry:any[]=[{'id':20, 'name':'tuhin'},
  //   {'id':21, 'name':'Ratul'}
  // ]

    let serial = 0;
    let customer=0;
    data.forEach(value => {
      let {id,name}=value
      serial++;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 3,
            margin: [0, 8, 0, 0],
            colSpan: 1,
          },
          {
            text: `${value.zoneName}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 3,
            margin: [0, 8, 0, 0],
            colSpan: 1,
            // colSpan:3
          },
          {
            text: `${value.locationCode}`,
            style: [],
            border: [true, true, true, true],
            lineHeight:3 ,
            margin: [0, 8, 0, 0],
            colSpan: 1,
            // colSpan:1
          },
          {
            text: `${value.locationName}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 3,
            margin: [0, 8, 0, 0],
            colSpan: 1,
            // colSpan:1
          },
          {
            text: `${value.totalCustomer}`,
            style: [],
            border: [true, true, true, true],
            lineHeight: 3,
            margin: [0, 8, 0, 0],
            colSpan: 1,
            // colSpan:1
          },
        ]
      );
      customer +=value.totalCustomer;
    });

    phase.table.body.push(
      [
        {
          text: ``,
          style: [],
          border: [true, true, true, true],
          lineHeight: 3,
          margin: [0, 8, 0, 0],
          colSpan: 1,
        },
        {
          text: ``,
          style: [],
          border: [true, true, true, true],
          lineHeight: 3,
          margin: [0, 8, 0, 0],
          colSpan: 1,
      
        },
        {
          text: ``,
          style: [],
          border: [true, true, true, true],
          lineHeight: 3,
          margin: [0, 8, 0, 0],
          colSpan: 1,
        },
        {
          text: `Total`,
          style: ['setColumnBold'],
          border: [true, true, true, true],
          lineHeight: 3,
          margin: [0, 8, 0, 0],
          colSpan: 1,
        },
        {
          text: `${customer}`,
          style: [],
          border: [true, true, true, true],
          lineHeight: 3,
          margin: [0, 8, 0, 0],
          colSpan: 1,
        },
    
     
 
      ]
    )
 
    return phase;
  }

  private getLocationWiseCustomer(data: any){   
    let totalCustomer=0;

    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30,70, '*', '*', '*',],
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
              text: `LocationCode`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `LocationName`,
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
        let ZoneName='';
      if(locationGroupByZoneLength >0){
        let providerNo=0;
        locationGroupByZone.forEach((locationData)=>{
          let{zoneName,locationName,locationCode}=locationData;
          let locationNameWithCode=`${locationName} (${locationCode})`;
          serial +1;
          providerNo +=1;
          ZoneName=zoneName;
          
          if(middleInsertProviderNo > locationGroupByZoneLength){

            middleInsertProviderNo = 1

          }else if(middleInsertProviderNo < locationGroupByZoneLength){
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
                text: `${locationData.locationCode}`,
                border: [true, true, true, true],
                style: [ 'setBig','topCenter'],
                colSpan: 1, 
              },
              {
                text: `${locationData.locationName}`,
                border: [true, true, true, true],
                style: ['topCenter', 'setBig'],
                colSpan: 1,
              },
             
              {
                text: `${locationData.totalCustomer}`,
                border: [true, true, true, true],
                style: ['setRight', 'setBig'],
                colSpan: 1,
              },
            ]
          );
          totalCustomer +=locationData.totalCustomer;
        })
      }
      //Zone Total

      // Empty Row    
      if(zone != uniqueZone[uniqueZone.length-1]){
        phase.table.body.push(
          [
            {
              text: ``,
              border: [false, true, false, true],
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

    })
    //Grand Total
    phase.table.body.push(
      [
        {
          text: ``,
          border: [true, true, true, true],
          style: [ 'setBig', 'setBold'],
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
          text: `Grand Total`,
          border: [true, true, true, true],
          style: [ 'setBold', 'setBig'],
          colSpan: 1,
        },
        {
          text: `${totalCustomer}`,
          border: [true, true, true, true],
          style: ['setRight', 'setBig' ],
          colSpan: 1,
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
