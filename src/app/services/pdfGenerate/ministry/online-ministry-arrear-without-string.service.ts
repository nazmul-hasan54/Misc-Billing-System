import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, setBillStyles, setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineMinistryArrearWithoutStringService {
  defaultColor = '#111';
  constructor() { }

  generatePdf(data: any, reportObj: any,zoneCode:any) {
    //@ts-ignore
   pdfMake.fonts = setPdfMakeFonts;

   const documentDefinition = this.getDocumentDefinition(data,reportObj,zoneCode);
    //@ts-ignore
   return pdfMake.createPdf(documentDefinition);
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  private getDocumentDefinition(data: any, reportObj: any,zoneCode:any) {
    return {
      info: {
        title: 'Online Ministry Arrear',
        author: 'BPDB',
        subject: 'Online Ministry Arrear',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'],alignment:'left', margin: [30, 5, 30, 0] }, 
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'],alignment:'right', margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getOnlineMinistryArrearHeading(data,reportObj),
      content: [
        this.getOnlineMinistryArrearReport(data, reportObj,zoneCode),//this.getOnlineMinistryArrearReportWithoutString(data,reportObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
     // defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
     // styles: misMinistrySummaryStyle,
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 8,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle
    }
  }

  year: any;
  month: any;
  getOnlineMinistryArrearHeading(data:any,reportObj:any){      
    let billMonth = reportObj.billMonth;
    let year = this.translateNumber(dayjs(billMonth).format("YYYY"),2);
    let yearbn=this.translateNumber(year);
    let month: string;
  
    switch (dayjs(billMonth).format("M")) {
      case "1": {
        month = "জানুয়ারি"
        break
      }
      case "2": {
        month = "ফেব্রুয়ারী"
        break
      }
      case "3": {
        month = "মার্চ"
        break
      }
      case "4": {
        month = "এপ্রিল"
        break
      }
      case "5": {
        month = "মে"
        break
      }
      case "6": {
        month = "জুন"
        break
      }
      case "7": {
        month = "জুলাই"
        break
      }
      case "8": {
        month = "আগষ্ট"
        break
      }
      case "9": {
        month = "সেপ্টেম্বর"
        break
      }
      case "10": {
        month = "অক্টোবর"
        break
      }
      case "11": {
        month = "নভেম্বর"
        break
      }
      case "12":
      default:
        {
          month = "ডিসেম্বর"
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
              rowSpan: 7,
              colSpan: 2,
              alignment: 'left',
              margin: [70, 5, 0, 0],
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
             text:'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',            
             style: [setHeading],
             colSpan: 5,
             margin: [-30, 0, 0, 0],
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
              text:'সরকারি,আধা-সরকারি,স্বায়ত্তশাসিত এবং কর্পোরেশন',
              style: [setSubSetHeading],
              colSpan: 5,
              margin: [-40, 0, 0, 0],
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
              text: `মন্ত্রণালয়ের বকেয়াঃ ${month} ${year} ইং`,            
              style: [setSubSetHeading],
              colSpan: 5,
              margin: [-50, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {
              text: `(কোটি টাকায়)`,            
              style: [],
              colSpan: 2,
              margin: [0, 0, 0, 0],
            },
            {},
          ],
          [
            {},
            {},
            {},
            {
              // text: `${month} ${year}`,
              // style: [setSubSetHeading],
              // colSpan: 5,
              // margin: [-50, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          [
            {
              // // text: `Total Customer :\t${totalCount}`,
              // text: `Total Customer :\t${data.length}`,
              // text: `মোট গ্রাহক :\t${data.length}`,
              // //text: `মোট গ্রাহকঃ ${this.translateNumber(data.length, 2)}`,
              // style: ['setRight', setSubSetHeading],
              // margin: [0, -17, 30, 0],
              // colSpan: 10,
              // bold: false
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

  getOnlineMinistryArrearReport(data:any,reportObj:any,zoneCode:any){
    let billMonth = reportObj.billMonth;
    let year = (dayjs(billMonth).format("YYYY"));
    let month: string;
  
    switch (dayjs(billMonth).format("M")) {
      case "1": {
        month = "জানুয়ারি"        
        break
      }
      case "2": {
        month = "ফেব্রুয়ারী"        
        break
      }
      case "3": {
        month = "মার্চ"
        break
      }
      case "4": {
        month = "এপ্রিল"
        break
      }
      case "5": {
        month = "মে"
        break
      }
      case "6": {
        month = "জুন"
        break
      }
      case "7": {
        month = "জুলাই"
        break
      }
      case "8": {
        month = "আগষ্ট"
        break
      }
      case "9": {
        month = "সেপ্টেম্বর"
        break
      }
      case "10": {
        month = "অক্টোবর"
        break
      }
      case "11": {
        month = "নভেম্বর"
        break
      }
      case "12":
      default:
        {
          month = "ডিসেম্বর"
          break
        }
    }
    const phases = {
      table: {
        headerRows: 1,
        widths: [25, '*',35,35, 35,35, 40, 35,35,50],
        body: [
          [
            {
              border: [true, true, true, true],
              //text: 'SL No',
              text: 'ক্র. নং',
              style: [setBillStyles.setHeadingBold],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              //text: 'Name of the Ministry/Department',
              text: 'মন্ত্রণালয়/বিভাগ এর নাম',
              colSpan:1,
              margin: [0, 0, 0, 0],
              alginment:'center'

            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
             // text: 'BPDB',
              text: 'বিপিডিবি',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
             // text: 'BREB',
              text: 'বিআরইবি',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              // text: 'DPDC',
              text: 'ডিপিডিসি',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              // text:  'DESCO',
              text: 'ডেসেকো',
              margin: [0, 0, 0, 0],
              //alignment: 'center',
          
            },
            {
              // text: 'WZPDCL',
              text: 'ডব্লিউজেডপিডিসিএল',
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              alignment: "center",
              
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              // text: 'NESCO',
              text: 'নেসকো',
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              // text: 'Receipt Arrear',
              text: 'বকেয়া আদায়',              
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              style: [setBillStyles.setHeadingBold],
              text: 'মন্তব্য',
              alignment: "center",
              rowSpan: 1
            },
          ],
          [
            {
              border: [true, true, true, true],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan:1,
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [],
              text: ``,
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2)}`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2) }`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2) }`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2) }`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2) }`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              text: `${month} ${this.translateNumber(year,2) }`,
              border: [true, true, true, true],
              style: [],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [],
              text: ``,
              alignment: 'center',
            },
            {
              border: [true, true, true, true],
              style: [],
              text: '',
              //alignment: 'center',
             // rowSpan:2
            },
          ]
          
        ],
      },
      layout: this.setTableBorder(),
    };

    let Serial=0;
    let grandTotalArrear=0;
    let totalReceiptAmount=0;
    let totalArrear=0;
    data.forEach(ministryData => {
      Serial++;
      let { ministryName,ministryNameBn,ministryCode, currVat, currLps, currReceiptVat,currReceiptPrincipal, currPrincipal,arrearPrincipal,arrearLps,arrearVat,
        totalReceiptArrear,receiptBillMonth,arrearReceiptPrincipal,arrearReceiptVat}= ministryData;
        if(((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))<0){
          totalArrear=0;
        }
        else{
          if(zoneCode=='0' || zoneCode=='4'){
            if(ministryCode=='3' || ministryCode=='12'){
            totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+200000;
            }
            else if(ministryCode=='5'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+1200000;
            }
            else if(ministryCode=='7' || ministryCode=='34' || ministryCode=='41'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+500000;
            }
            else if(ministryCode=='18'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+900000;
            }
            else if(ministryCode=='19' || ministryCode=='25' || ministryCode=='28' || ministryCode=='30' || ministryCode=='31' || ministryCode=='44'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+100000;
            }
            else if(ministryCode=='27'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+600000;
            }
            else if(ministryCode=='33'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+700000;
            }
            else if(ministryCode=='42'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+300000;
            }
            else if(ministryCode=='45'){
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+400000;
            }
            else{
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal));
            }
            
          }
          else{
            totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal));
          }
        }


        
        let receiptAmount=currReceiptPrincipal+currReceiptVat;
        grandTotalArrear+=totalArrear;
        totalReceiptAmount+=receiptAmount;

      phases.table.body.push(
        [
          {
            border: [true, true, true, true],
            style: [],
            text: `${this.translateNumber(Serial,2)}`,
            alignment: 'center',
            margin: [0, 0, 0, 0],
          },
          {
            border: [true, true, true, true],
            style: [],
            text: `${ministryNameBn}`,

            margin: [0, 0, 0, 0],
            alignment: "left",
          },
          {
            text: `${Number(totalArrear/10000000).toFixed(2)}`,
            border: [true, true, true, true],
            style: [],
            alignment: 'left',
            margin: [0, 0, 0, 0],
          },
          {
            border: [true, true, true, true],
            style: [],
            text: ``,
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
          {
            border: [true, true, true, true],
            style: [],
            text: ``,
            alignment: 'right',
            margin: [0, 0, 0, 0],
          },
          {
            border: [true, true, true, true],
            style: [],
            text: ``,
            alignment: 'right',
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: [],
            alignment: 'right',

          },
          {
            border: [true, true, true, true],
            style: [],
            text: ``,
            alignment: 'right',
          },
          {
            border: [true, true, true, true],
            style: [],
            text: `${Number(receiptAmount/10000000).toFixed(2)}`,
            alignment: 'left',
          },
          {
            border: [true, true, true, true],
            style: [],
            text: ``,
          }
        ]
      )
    });
   
    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
          alignment: 'right',
        },
        {
          border: [true, true, true, true],
          style: [],
          text: `মোট`,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          border: [true, true, true, true],
          style: [],
          text: `${Number(grandTotalArrear/10000000).toFixed(2)}`,
          margin: [0, 0, 0, 0],
        },
        {

          border: [true, true, true, true],
          style: [],
          text: ``,
        },
        {
          border: [true, true, true, true],
          style: [],
          text: ``
        },
        {
          border: [true, true, true, true],
          style: [],
          text: ``,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          border: [true, true, true, true],
          style: [],
          text: ``,
          alignment: 'center',
          margin: [0, 0, 0, 0],
        },
        {
          border: [true, true, true, true],
          style: [],
          text: ``,
        },
        {
          border: [true, true, true, true],
          style: [],
          text: `${Number(totalReceiptAmount/10000000).toFixed(2)}`,
          alignment: 'left',
        },
        {
          border: [true, true, true, true],
          style: [],
          text: ``,
        }
      ]
    )
    return phases;
  }

  private setTableBorder() {
    const d = this.defaultColor;
    return {
      hLineWidth: function (i, node) {
        return i === 0 || i === node.table.body.length ? 1 : 1;
      },
      vLineWidth: function (i, node) {
        return i === 0 || i === node.table.widths.length ? 1 : 1;
      },
      hLineColor: function (i, node) {
        return i === 0 || i === node.table.body.length ? d : d;
      },
      vLineColor: function (i, node) {
        return i === 0 || i === node.table.widths.length ? d : d;
      },
     
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
}
