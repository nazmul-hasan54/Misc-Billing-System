import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { MinistrySummaryModel } from '../../../model/ministry.summary.model';
import { customerArrearStyle, ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setAllCustomerArrearStyle, setBold, setFourthHeading, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineZoneWiseSummaryService {

  constructor() { }
  defaultColor = "";
  generatePdf(data: any, reportObj) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data, reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any) {
    return {
      info: {
        title: 'Ministry Zone wise Summary',
        author: 'BPDB',
        subject: 'Ministry Zone wise Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      // pageOrientation: 'landscape',

      footer: (currentPage, pageCount) => {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                {
                  text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(pageCount, 2)}`,
                  style: ['setFooterLeft'],
                  margin: [30, 5, 30, 0],
                },
                {
                  text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2),
                  style: ['setFooterRight'],
                  margin: [30, 5, 30, 0],
                },
              ],
            ],
          },
          layout: 'noBorders',
        };
      },

      header: this.getHeading(data, reportObj),

      content: [
        this.getMinistry(data, reportObj)
      ],
      pageMargins: [30, 100, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setAllCustomerArrearStyle,
    }
  }

  private getHeading(data: any, reportObj: any,) {    
    let ministryName;
    let locationName;

     if(reportObj.ministry=='0'){
      ministryName='সকল মন্ত্রনালয়';
     }
     else{
      // ministryName=reportObj.ministry.nameBn;
      ministryName=data[0].ministryNameBn;
     }
     if(reportObj.locationName.length==0){
      locationName="";
     }
     else{
      locationName=reportObj.locationName[0].nameBn;
     }
     
    let dateBn = this.translateNumber(dayjs(reportObj.billMonth).format('DD'),2);
    let year = this.translateNumber(dayjs(reportObj.billMonth).format("YY"), 2);
    let month: string;
    switch (dayjs(reportObj.billMonth).format("M")) {
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
    // const { runBillCycle, locDesc } = data[0];
    const totalCount = data.length;
    const phase = {
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-120, 0, 0, 0],
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
          // [
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          //   {},
          // ],
          [
            {},
            {},
            {
              text: `বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড`,
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

          // row 3
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
          // row- 4
          [
            {},
            {},
            {
              text: `${ministryName}`, 
              // text: `${locationName}`, 
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
          // row 5
          [
            {},
            {},
            {
              // text: ``, 
              text: `${locationName}`, 
              style: ['setLeft', setSubSetHeading],
              margin: [-55, 0, 0, 0],
              colSpan: 3,
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
  private getMinistry(data:any, reportObj: any,){
    const phase = {
      table: {
        margin: [0, 20, 0, 0],
        dontBreakRows: true,
        // headerRows: 1,
        widths: [30, '*', 35,80,80,80,80],
        body: [
          [
            {
              text: `ক্রঃনং`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `জোন`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `গ্রাহক সংখ্যা`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `পূর্বের বকেয়া`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `বর্তমান মাসের বিল`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `মোট আদায়`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
            {
              text: `বর্তমান বকেয়ার পরিমান`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
          ]
        ],
      },
      layout: this.setTableStyles()
    };
    let sl=0;

    let totalCustomerNo=0;
    let grandTotal=0;
    let grandTotalCollection=0;
    let grandPreviousReceiptArrear=0;
    let grandCurrentMonthBill=0;
    let name='';
    let cusNo=0;
    let previousReceiptArrear=0;
    let currentMonthBill=0;
    let totalCollection=0;
    let totalArrear=0;
    data.forEach(value => {
      console.log("value",value,"reportobj",reportObj);
      //let{zoneName,zoneNameBn,consumerNo,zoneCode,currPrincipal,currLps,currVat,arrearPrincipal,arrearLps,arrearVat,arrearReceiptPrincipal,arrearReceiptVat,currReceiptPrincipal,currReceiptVat}=value;
      let{zoneName,zoneNameBn,consumerNo,zoneCode,currPrincipal,currLps,currVat,arrearPrincipal,arrearLps,arrearVat,arrearReceiptPrincipal,arrearReceiptVat,currReceiptPrincipal,currReceiptVat,totalReceiptArrear}=value;
      sl++
          if(((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))<0){
            totalArrear=0;
          }
          else{
            debugger
            if(reportObj.ministry=='0' && reportObj.zoneCode=='0'){
              if(zoneCode=='1'){
                previousReceiptArrear=((arrearLps+arrearPrincipal+arrearVat)-(arrearReceiptVat+arrearReceiptPrincipal))+1650000+789326824                ;
              currentMonthBill=(currPrincipal+currLps+currVat)-789326824              ;
              totalCollection=currReceiptPrincipal + currReceiptVat;
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+1650000;
              }

              else if(zoneCode=='4'){
                previousReceiptArrear=((arrearLps+arrearPrincipal+arrearVat)-(arrearReceiptVat+arrearReceiptPrincipal))+2650000+13510000 ;
                currentMonthBill=(currPrincipal+currLps+currVat)-13510000;
                totalCollection=currReceiptPrincipal + currReceiptVat;
                totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+2650000;
               }
              else if(zoneCode=='3'){
                previousReceiptArrear=((arrearLps+arrearPrincipal+arrearVat)-(arrearReceiptVat+arrearReceiptPrincipal)) ;
                currentMonthBill=currPrincipal+currLps+currVat;
                totalCollection=currReceiptPrincipal + currReceiptVat;
                totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+1650000;
                
                }
                else{
                  previousReceiptArrear=((arrearLps+arrearPrincipal+arrearVat)-(arrearReceiptVat+arrearReceiptPrincipal)) ;
                  currentMonthBill=currPrincipal+currLps+currVat;
                  totalCollection=currReceiptPrincipal + currReceiptVat;
                  totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+1650000;
                  
                }
            }
            else{
              previousReceiptArrear=(arrearLps+arrearPrincipal+arrearVat)-(arrearReceiptVat+arrearReceiptPrincipal);
              currentMonthBill=currPrincipal+currLps+currVat;
              totalCollection=currReceiptPrincipal + currReceiptVat;
              totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal));
             }
         }
      //         totalArrear=(previousReceiptArrear+currentMonthBill)-totalCollection;
      //         //totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal));
              
            

         
       
      
      // previousReceiptArrear=(arrearLps+arrearPrincipal+arrearVat)-totalReceiptArrear;
      // currentMonthBill=currPrincipal+currLps+currVat;
      // totalCollection=currReceiptPrincipal + currReceiptVat;
      // totalArrear=(previousReceiptArrear+currentMonthBill)-totalCollection;
      //totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(arrearReceiptPrincipal+arrearReceiptVat+currReceiptPrincipal+currReceiptVat))

      totalCustomerNo+=consumerNo;
      grandPreviousReceiptArrear+=previousReceiptArrear;
      grandCurrentMonthBill+=currentMonthBill;
      grandTotalCollection+=totalCollection;
      grandTotal+=totalArrear;

      phase.table.body.push(
        [
          {
            text: `${this.translateNumber(sl,2)}`,
            style: [],
            border: [true, true, true, true,],
            colSpan: 1,
          },
          {
            text: `${zoneNameBn}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
          {
            text: `${this.translateNumber(consumerNo,2)}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
          {
            text: `${this.translateNumber(previousReceiptArrear.toFixed(2))}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
          {
            text: `${this.translateNumber(currentMonthBill.toFixed(2))}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
          {
            text: `${this.translateNumber(totalCollection.toFixed(2))}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
          {
            text: `${this.translateNumber(totalArrear.toFixed(2))}`,
            style: [customerArrearStyle.setLocation],
            border: [true, true, true, true,],
            colSpan: 1,
          }, 
        ]
      )
    });
    
    phase.table.body.push(
      [
        {
          text: `মোট`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 2,
        },
        {
          text: ``,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
        {
          text: `${this.translateNumber(totalCustomerNo,2)}`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
        {
          text: `${this.translateNumber(grandPreviousReceiptArrear.toFixed(2))}`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
        {
          text: `${this.translateNumber(grandCurrentMonthBill.toFixed(2))}`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
        {
          text: `${this.translateNumber(grandTotalCollection.toFixed(2))}`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
        {
          text: `${this.translateNumber(grandTotal.toFixed(2))}`,
          style: [customerArrearStyle.setLocation],
          border: [true, true, true, true,],
          colSpan: 1,
        }, 
      ]
    )
    return phase;
  }
  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 4; },
      paddingBottom: function (i, node) { return 4; },
    }
  }
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
}
