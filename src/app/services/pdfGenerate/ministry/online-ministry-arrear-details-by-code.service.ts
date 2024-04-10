import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineMinistryArrearDetailsByCodeService {

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
      title: 'Online Ministry Arrear Details',
      author: 'BPDB',
      subject: 'Online Ministry Arrear Details',
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
    header: this.getOnlineMinistryArrearDetailsHeading(data, reportObj),
    content: [
      this.getOnlineMinistryArrearDetailsReport(data, reportObj)
    ],
    pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
    defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
    styles: misMinistrySummaryStyle,
  }
}

private getOnlineMinistryArrearDetailsHeading(data:any, reportObj){
    
  let totalCustomer = data.length; 
  let ministryName=data[0].ministryName;
  
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
      widths: [70, 'auto',40, '*', 40, 45, 45, 'auto', 'auto', 40],
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
            text: `Ministry Arrear Receipt Details`,
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
            text: `${reportObj.ministry == "0" ? "All Ministry" : ministryName}`, 
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
          {
            // text: `Total Customer :\t${totalCount}`,
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

private getOnlineMinistryArrearDetailsReport(data: any, reportObj: any) {
  console.log("dataonline details",data);
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
  
  
  const phases = {
    table: {
      dontBreakRows: true,
      headerRows: 1,
      widths: [25,'*',40, 60,90, 75, 65,65,80],
      body: [
        [
          {
            text: 'SL No',
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
          },
          {
            text: 'Zone Name',
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
          // {
          //   text: 'Address',
          //   style: ['setBlack','setBold'],
          //   border: [true, true, true, true],
          //   margin: [0, 0, 0, 0],
          //   colSpan: 1,
          //   rowSpan: 1
          // },
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
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
          },
          {
            text: 'Total Arrear(Current Month)',
            style: ['setBlack','setBold'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
          },
        ],
      ],
    },
  };
  
  // Grand Total Variable
  let grandTotalPreviousReceiptArrear=0;
  let grandTotalCurrentMonthBill=0;
  let grandTotalReceipt=0;
  let grandTotalcurrentReceiptArrear=0;



  let cityCorpoData=data;
  let serial = 0;
  let cityCorpoName="";
  let zoneNameValue = "";
  let ministryData=data.filter(p=>p.zoneCode!=' ')
  //if(ministryData.length>0)
  //{
    let uniqueZoneCode=[...new Set(ministryData.map(item=>item.zoneName))];
    

    uniqueZoneCode.forEach((zoneData)=>{
      let middleInsertProviderNo = 8;
      let customerGroupByZone=ministryData.filter(x=>x.zoneName==zoneData)
      let customerGroupByZoneLength=customerGroupByZone.length;
      let providerInsert = Math.ceil(Number(customerGroupByZoneLength / 2));

      let zoneTotalPreviousReceiptArrear=0;
      let zoneTotalCurrentMonthBill=0;
      let zoneTotalReceipt=0;
      let zoneTotalcurrentReceiptArrear=0;
        if (customerGroupByZoneLength > 0) {
        let providerNo = 0;
        let previousReceiptArrear=0;
        let currentMonthBill=0;
        let totalReceipt=0;
        let currentReceiptArrear=0;
        // serial++;
        customerGroupByZone.forEach(element => {
          let{consumerNo,address,customerName,
          locationCode,zoneCode,zoneName,ministryCode, ministryName,currReceiptVat,currReceiptAmt,currReceiptPrincipal,currPrincipal,arrearLps,arrearPrincipal,arrearVat,currPrin,currLps,currVat,
          totalReceiptPrincipal,totalReceiptVat,receiptBillMonth,totalReceiptArrear}=element;
          providerNo += 1;
          zoneNameValue = zoneName;
          serial++;

          if(middleInsertProviderNo < customerGroupByZoneLength){
            middleInsertProviderNo = providerNo%18 ==0 ? (middleInsertProviderNo +18) : (middleInsertProviderNo + 0) 
          }

          
          previousReceiptArrear=(arrearLps+arrearPrincipal+arrearVat)-totalReceiptArrear;
          currentMonthBill=currPrincipal+currLps+currVat;
          totalReceipt=currReceiptPrincipal + currReceiptVat;
          currentReceiptArrear=(previousReceiptArrear+currentMonthBill)-totalReceipt;
          
          zoneTotalPreviousReceiptArrear+=previousReceiptArrear;
          zoneTotalCurrentMonthBill+=currentMonthBill;
          zoneTotalReceipt+=totalReceipt;
          zoneTotalcurrentReceiptArrear+=currentReceiptArrear;
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
                text: `${customerGroupByZoneLength < 15 ? providerNo == providerInsert ? zoneName : "" : providerNo == middleInsertProviderNo ? zoneName : ""}`,
                border: providerInsert == 1 || providerNo == customerGroupByZoneLength ? [true, false, true, true] : [true, false, true, false],
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
              // {
              //   text: `${address}`,
              //   style: ['setBlack'],
              //   border: [true, true, true, true],
              //   margin: [0, 0, 0, 0],
              //   colSpan: 1
              // },
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
                text: `${currentReceiptArrear.toFixed(3)}`,
                style: ['setBlack'],
                border: [true, true, true, true],
                margin: [0, 0, 0, 0],
                colSpan: 1
              },
            ]
          )
        });
      }

    // Zone Wise Total
    phases.table.body.push(
      [
        {
          text: `Total of ${zoneNameValue} `,
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
        // {
        //   text: ``,
        //   style: ['setBlack'],
        //   border: [true, true, true, true],
        //   margin: [0, 0, 0, 0],
        //   colSpan: 1
        // },
        {
          text: `${(zoneTotalPreviousReceiptArrear).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(zoneTotalCurrentMonthBill).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(zoneTotalReceipt).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: `${(zoneTotalcurrentReceiptArrear).toFixed(3)}`,
          style: ['setBlack','setBold'],
          border: [true, true, true, true],
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
      ]
    )
    grandTotalPreviousReceiptArrear+=zoneTotalPreviousReceiptArrear;
    grandTotalCurrentMonthBill+=zoneTotalCurrentMonthBill;
    grandTotalReceipt+=zoneTotalReceipt;
    grandTotalcurrentReceiptArrear+=zoneTotalcurrentReceiptArrear;
    });
  //}
  
  
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
      // {
      //   text: ``,
      //   style: ['setBlack'],
      //   border: [true, true, true, true],
      //   margin: [0, 0, 0, 0],
      //   colSpan: 1
      // },
      {
        text: `${(grandTotalPreviousReceiptArrear).toFixed(3)}`,
        style: ['setBlack','setBold'],
        border: [true, true, true, true],
        margin: [0, 0, 0, 0],
        colSpan: 1
      },
      {
        text: `${(grandTotalCurrentMonthBill).toFixed(3)}`,
        style: ['setBlack','setBold'],
        border: [true, true, true, true],
        margin: [0, 0, 0, 0],
        colSpan: 1
      },
      {
        text: `${(grandTotalReceipt).toFixed(3)}`,
        style: ['setBlack','setBold'],
        border: [true, true, true, true],
        margin: [0, 0, 0, 0],
        colSpan: 1
      },
      {
        text: `${(grandTotalcurrentReceiptArrear).toFixed(3)}`,
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
