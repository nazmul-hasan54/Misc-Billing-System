import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineCityPouroshovaWisePaymentDetailsService {

  defaultColor = '#111';
  constructor() { }

  generatePdf(data: any, reportObj: any) {
    //@ts-ignore
   pdfMake.fonts = setPdfMakeFonts;

   const documentDefinition = this.getDocumentDefinition(data,reportObj);
    //@ts-ignore
   return pdfMake.createPdf(documentDefinition);
 }

 private getDocumentDefinition(data: any, reportObj: any) {
  return {
    info: {
      title: 'Online Pouroshova and City Corporation Payment Details',
      author: 'BPDB',
      subject: 'Online Pouroshova and City Corporation Payment Details',
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
    header: this.getOnlineCitycorporationAndPouroshovaPaymentDetailsHeading(data,reportObj),
    content: [
      this.getOnlineCitycorporationAndPouroshovaPaymentDetailsReport(data, reportObj)
    ],
    pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
    defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
    styles: misMinistrySummaryStyle,
  }
}

private getOnlineCitycorporationAndPouroshovaPaymentDetailsHeading(data:any,reportObj: any){

  let cityCorporation=data.filter(p=>p.cityCorporationCode!=' ')
  let cityCorporationData=cityCorporation.filter(p=>(p.currReceiptPrincipal + p.currReceiptVat)>0)
  let pouroshova=data.filter(p=>p.pouroshovaCode!=' ')
  let pouroshovaDataList=pouroshova.filter(p=>(p.currReceiptPrincipal + p.currReceiptVat)>0)
  let totalCustomer = cityCorporationData.length+pouroshovaDataList.length;
   let billMonth = reportObj;
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
              margin: [-160, 0, 0, 0],
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
              text: `City Corporation and Pouroshova Receipt Payment Details`,
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
              // text: `Accounts Receivable As On ${billMonth}`,
              text: `${month}-${year}`,
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
              // text: '(Govt., Semi Govt., Autonomous & Corporation)',
              // style: [setSubSetHeading],
              // colSpan: 5,
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
              text: `Total Customer ${totalCustomer}`,
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

  private getOnlineCitycorporationAndPouroshovaPaymentDetailsReport(data: any, reportObj: any) {
    console.log('ggdfgv',data);
    let billMonth = reportObj;
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
    
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [25,'*',30, 60,80, 80, 70, 60,60,50,80],
        body: [
          [
            {
              text: 'SL No',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: 'City Corporation / Pouroshova',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1,
              rowSpan: 1
            },
            {
              text: 'Location Code',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1,
              rowSpan: 1
            },
            {
              text: 'Consumer No',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1,
              rowSpan: 1
            },
            {
              text: 'Customer Name',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1,
              rowSpan: 1
            },
            {
              text: 'Address',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1,
              rowSpan: 1
            },
            {
              text: 'Arrear Amount(Upto-Previous Month)',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: 'Current Month Bill',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
              colSpan: 1
            },
            {
              text: `Total Receipt(${month}-${year})`,
              // text: 'Total Receipt',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
            },
            {
              text: 'Pay Bill Month',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: 'Total Arrear(Current)',
              style: ['setBlack','setBold'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
          ],
        ],
      },
    };
    //City+Pouro
    let grandPouroAndCityPreviousReceiptArrear=0;
    let grandPouroAndCityCurrentMonthBill=0;
    let grandPouroAndCityTotalReceipt=0;
    let grandPouroAndCityCurrentReceiptArrear=0;

    //City
    let grandCityTotalPreviousReceiptArrear=0;
    let grandCityTotalCurrentMonthBill=0;
    let grandCityTotalReceipt=0;
    let grandCityTotalcurrentReceiptArrear=0;

    //Pouro
    let grandPouroTotalPreviousReceiptArrear=0;
    let grandPouroTotalCurrentMonthBill=0;
    let grandPouroTotalReceipt=0;
    let grandPouroTotalcurrentReceiptArrear=0;


    let cityCorpoData=data;
    let serial = 0;
    let cityCorpoName="";
    let cityCorporation=data.filter(p=>p.cityCorporationCode!=' ')
    let cityCorporationData=cityCorporation.filter(p=>(p.currReceiptPrincipal + p.currReceiptVat)>0)
    if(cityCorporationData.length>0)
    {
      let uniqueCityCorporation=[...new Set(cityCorporationData.map(item=>item.cityCorporationCode))];
      uniqueCityCorporation.forEach((cityDate)=>{
        let customerGroupByCityCorporation=cityCorporationData.filter(x=>x.cityCorporationCode==cityDate)
        let customerGroupByCityCorporationLength=customerGroupByCityCorporation.length;
        let providerInsert = Math.ceil(Number(customerGroupByCityCorporationLength / 2));

        let cityTotalPreviousReceiptArrear=0;
        let cityTotalCurrentMonthBill=0;
        let cityTotalReceipt=0;
        let cityTotalcurrentReceiptArrear=0;

        // if (customerGroupByCityCorporationLength > 0) {
          let providerNo = 0;
          let previousReceiptArrear=0;
          let currentMonthBill=0;
          let totalReceipt=0;
          let currentReceiptArrear=0;
          // serial++;
          customerGroupByCityCorporation.forEach(element => {
            let{consumerNo,address,totalAmount,cityCorporationCode,pouroshovaCode,cityCorporationName,pouroName,name,customerName,
            locationCode,zoneCode,zoneName,receiptAmt,arrearReceiptAmount,currReceiptVat,currReceiptAmt,totalArrearAmount,totalReceiptAmount,total_ReceiptAmount,
            currReceiptPrincipal,currPrincipal,arrearLps,arrearPrincipal,arrearVat,currPrin,currLps,currVat,pouroNameBn,
            cityCorporationNameBn,totalReceiptPrincipal,totalReceiptVat,receiptBillMonth,prvReceiptPrincipal,prvReceiptVat,prvReceiptAmt,totalReceiptArrear}=element;
            cityCorpoName=cityCorporationName;
            providerNo += 1;
            serial++;
            
            previousReceiptArrear=arrearLps+arrearPrincipal+arrearVat-totalReceiptArrear;
            currentMonthBill=currPrin+currLps+currVat;
            totalReceipt=currReceiptPrincipal + currReceiptVat;
            currentReceiptArrear=previousReceiptArrear+currentMonthBill-totalReceipt;
            
            cityTotalPreviousReceiptArrear+=previousReceiptArrear;
            cityTotalCurrentMonthBill+=currentMonthBill;
            cityTotalReceipt+=totalReceipt;
            cityTotalcurrentReceiptArrear+=currentReceiptArrear;
            let year='';
            let month:string='';
              if(receiptBillMonth!='0'){
                let billMonth = receiptBillMonth;
                year = (dayjs(billMonth).format("YYYY"));
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
                  case "12": {
                      month = "November"
                      break
                    }
                  default:
                    {
                      month = ""
                      break
                    }
                }
              }else{
                year ='';
                month='';
              }
            phases.table.body.push(
              [
                {
                  text: `${serial}`,
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  style: [],
                  colSpan: 1,
                },
                {
                  text: `${providerNo == providerInsert ? cityCorporationName : ""}`,
                  border: providerInsert == 1 || providerNo == customerGroupByCityCorporationLength ? [true, false, true, true] : [true, false, true, false],
                  style: ['setBlack','setBold'],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${locationCode}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${consumerNo}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${customerName}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${address}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${previousReceiptArrear.toFixed(3)}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${currentMonthBill.toFixed(3)}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${totalReceipt.toFixed(3)}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${month} ${year}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
                {
                  text: `${currentReceiptArrear.toFixed(3)}`,
                  style: ['setBlack'],
                  border: [true, true, true, true],
                  margin: [0, 0, 0, 0],
                  colSpan: 1
                },
              ]
            )
          });
        // }
  
      //Total Citycorporation
      phases.table.body.push(
        [
          {
            text: `Total of ${cityCorpoName} `,
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 2
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: `${(cityTotalPreviousReceiptArrear).toFixed(3)}`,
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: `${(cityTotalCurrentMonthBill).toFixed(3)}`,
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: `${(cityTotalReceipt).toFixed(3)}`,
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: `${(cityTotalcurrentReceiptArrear).toFixed(2)}`,
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
        ]
      )
      grandCityTotalPreviousReceiptArrear+=cityTotalPreviousReceiptArrear;
      grandCityTotalCurrentMonthBill+=cityTotalCurrentMonthBill;
      grandCityTotalReceipt+=cityTotalReceipt;
      grandCityTotalcurrentReceiptArrear+=cityTotalcurrentReceiptArrear;
      });
    }
    

    let pouroshovaData=data;
    let pouroshovaName="";
    
    let pouroshova=data.filter(p=>p.pouroshovaCode!=' ')
    let pouroshovaDataList=pouroshova.filter(p=>(p.currReceiptPrincipal + p.currReceiptVat)>0)
    
    if(pouroshovaDataList.length>0){
      let uniquePouroshova=[...new Set(pouroshovaDataList.map(item=>item.pouroshovaCode))];
      

        uniquePouroshova.forEach((cityDate)=>{
          let customerGroupByPouroshova=pouroshovaDataList.filter(x=>x.pouroshovaCode==cityDate)
          let customerGroupByPouroshovaLength=customerGroupByPouroshova.length;
          let providerInsert = Math.ceil(Number(customerGroupByPouroshovaLength / 1.5));
  
          let pouroTotalPrevArrAmount = 0;
          let pouroTotalCurrMonthBillTotal = 0;
          let pouroAbsoluteTotalReceiptAmt = 0;
          let pouroTotalCurrArrAmount = 0;
          // if (customerGroupByPouroshovaLength > 0) {
            let providerNo = 0;
              let pouroPrevArrAmount = 0;
              let pouroCurrMonthBill = 0;
              let pouroTotalReceiptAmt = 0;
              let pouroCurrArrAmount = 0;
  
            customerGroupByPouroshova.forEach(element => {
              let{consumerNo,address,totalAmount,cityCorporationCode,pouroshovaCode,cityCorporationName,pouroName,name,customerName,
              locationCode,zoneCode,zoneName,receiptAmt,arrearReceiptAmount,currReceiptVat,currReceiptAmt,totalArrearAmount,totalReceiptAmount,total_ReceiptAmount,
              currReceiptPrincipal,currPrincipal,arrearLps,arrearPrincipal,arrearVat,currPrin,currLps,currVat,pouroNameBn,
              cityCorporationNameBn,totalReceiptPrincipal,totalReceiptVat,receiptBillMonth,prvReceiptPrincipal,prvReceiptVat,prvReceiptAmt,totalReceiptArrear}=element;
              pouroshovaName=pouroName;
              providerNo += 1;
              serial+=1;

              pouroPrevArrAmount=arrearLps+arrearPrincipal+arrearVat-totalReceiptArrear;
              pouroCurrMonthBill=currPrin+currLps+currVat;
              pouroTotalReceiptAmt=currReceiptPrincipal + currReceiptVat;
              pouroCurrArrAmount=pouroPrevArrAmount+pouroCurrMonthBill-pouroTotalReceiptAmt;

              pouroTotalPrevArrAmount+=pouroPrevArrAmount;
              pouroTotalCurrMonthBillTotal+=pouroCurrMonthBill;
              pouroAbsoluteTotalReceiptAmt+=pouroTotalReceiptAmt;
              pouroTotalCurrArrAmount+=pouroCurrArrAmount;
    
              let year='';
              let month:string='';
                if(receiptBillMonth!='0'){
                  let billMonth = receiptBillMonth;
                  year = (dayjs(billMonth).format("YYYY"));
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
                    case "12": {
                        month = "November"
                        break
                      }
                    default:
                      {
                        month = ""
                        break
                      }
                  }
                }else{
                  year ='';
                  month='';
                }
              phases.table.body.push(
                [
                  {
                    text: `${serial}`,
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    style: [],
                    colSpan: 1,
                  },
                  {
                    text: `${providerNo == providerInsert ? pouroName: ""} `,
                    border: providerInsert == 1 || providerNo == customerGroupByPouroshovaLength ? [true, false, true, true] : [true, false, true, false],
                    style: ['setBlack','setBold'],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${locationCode}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${consumerNo}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${customerName}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${address}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${pouroPrevArrAmount.toFixed(3)}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${pouroCurrMonthBill.toFixed(3)}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${pouroTotalReceiptAmt.toFixed(3)}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${month} ${year}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${pouroCurrArrAmount.toFixed(3)}`,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                ]
              )
            });
  
              //Pouroshova Total
              phases.table.body.push(
                [
                  {
                    text: `Total of ${pouroshovaName} Pouroshova`,
                    style: ['setBlack','setBold'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 2
                  },
                  {
                    text: ``,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: ``,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: ``,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: ``,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: '',
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${(pouroTotalPrevArrAmount).toFixed(3)}`,
                    style: ['setBlack','setBold'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${(pouroTotalCurrMonthBillTotal).toFixed(3)}`,
                    style: ['setBlack','setBold'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${(pouroAbsoluteTotalReceiptAmt).toFixed(3)}`,
                    style: ['setBlack','setBold'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: ``,
                    style: ['setBlack'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                  {
                    text: `${(pouroTotalCurrArrAmount).toFixed(3)}`,
                    style: ['setBlack','setBold'],
                    border: [true, true, true, true],
                    margin: [0, 0, 0, 0],
                    colSpan: 1
                  },
                ]
              )
            // }
            grandPouroTotalPreviousReceiptArrear+=pouroTotalPrevArrAmount;
            grandPouroTotalCurrentMonthBill+=pouroTotalCurrMonthBillTotal;
            grandPouroTotalReceipt+=pouroAbsoluteTotalReceiptAmt;
            grandPouroTotalcurrentReceiptArrear+=pouroTotalCurrArrAmount;
        });
  
    }
    
    grandPouroAndCityPreviousReceiptArrear=grandCityTotalPreviousReceiptArrear+grandPouroTotalPreviousReceiptArrear;
    grandPouroAndCityCurrentMonthBill=grandCityTotalCurrentMonthBill+grandPouroTotalCurrentMonthBill;
    grandPouroAndCityTotalReceipt=grandCityTotalReceipt+grandPouroTotalReceipt;
    grandPouroAndCityCurrentReceiptArrear=grandCityTotalcurrentReceiptArrear+grandPouroTotalcurrentReceiptArrear;
    //Grand Total All(Citycorporation+Pouroshova)
    phases.table.body.push(
      [
        {
          text: `Grand Total`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 2
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(grandPouroAndCityPreviousReceiptArrear).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(grandPouroAndCityCurrentMonthBill).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(grandPouroAndCityTotalReceipt).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(grandPouroAndCityCurrentReceiptArrear).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
      ]
    )
    return phases;
  }

}
