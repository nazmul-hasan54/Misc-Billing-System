import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { customerArrearStyle, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineMinistryWiseSummaryService {

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
    let ministryName=data[0].ministryNameBn;
    //  if(reportObj.ministry=='0'){
    //   ministryName='সকল মন্ত্রনালয়';
    //  }
    //  else{
    //   ministryName=reportObj.ministry.nameBn;
    //  }
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
              text: `মন্ত্রনালয়: ${reportObj.ministry == "0" ? "সকল মন্ত্রনালয়" : ministryName}`, 
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
            {
              text: ``, 
              style: ['setRight', setSubSetHeading],
              margin: [0, 0, 0, 0],
              colSpan: 10,
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

  private getMinistry(data:any, reportObj: any,){
    const phase = {
      table: {
        margin: [0, 0, 0, 0],
        dontBreakRows: true,
        // headerRows: 1,
        widths: [30, '*', 100, 120],
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
              text: `বকেয়া টাকার পরিমান`,
              border: [true, true, true, true,],
              style: [customerArrearStyle.setLocation],
              colSpan: 1,
            },
          ]
        ],
      },
      layout: this.setTableStyles()
    };
    // "id": 0,
    // "custId": 0,
    // "consumerNo": 1054,
    // "address": null,
    // "customerName": "CHANDAN PURA LLEGE KALI BARI(MANDIR)",
    // "locationCode": null,
    // "locationDesc": null,
    // "ministryCode": "29",
    // "ministryName": "Ministry of Religious Affairs",
    // "ministryNameBn": "ধর্ম বিষয়ক মন্ত্রণালয়",
    // "zoneCode": "1",
    // "zoneName": "Chittagong",
    // "zoneNameBn": "চট্টগ্রাম",
    // "currVat": 35607.76,
    // "currLps": -763705.4,
    // "prevMonth": 0,
    // "currBill": 0,
    // "prevArrAmount": 0,
    // "receiptPrn": 0,
    // "receiptVat": 0,
    // "currMonthBillAmount": 0,
    // "totalReceiptAmount": 0,
    // "currTotalArrAmount": 0,
    // "currReceiptVat": 848249.62,
    // "currReceiptPrincipal": 16751832.82,
    // "currPrincipal": 710733.72,

    // "arrearLps": 30453911.26,
    // "arrearPrincipal": 359843942.9,
    // "arrearVat": 18317737.35,

    // "totalReceiptArrear": 328537702.98,
    // "receiptBillMonth": 0,
    // "arrearReceiptPrincipal": 313534887.48,
    // "arrearReceiptVat": 15002815.5
    let sl=0;

    let totalCustomerNo=0;
    let grandTotal=0;
    let name='';
    let cusNo=0;
    let totalArrear=0;
    console.log(reportObj,"reportobject ")
    let zoneList = [...new Set(data.map(item => item.zoneName))];
    console.log("ghfhfh", zoneList);
    
    data.forEach(value => {
      debugger
     
      let{zoneName,zoneNameBn,consumerNo,zoneCode,currPrincipal,currLps,currVat,arrearPrincipal,arrearLps,arrearVat,arrearReceiptPrincipal,arrearReceiptVat,currReceiptPrincipal,currReceiptVat}=value;
      sl++
      if(reportObj.ministry !='0'){
        if(value.ministryCode==39 && value.zoneCode=='0'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+168500000;
        }
        else if(value.ministryCode==39 && value.zoneCode=='1'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+164700000;
       
        }
        else if(value.ministryCode==39 && value.zoneCode=='4'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+4100000;
        }
        else if(value.ministryCode==20 && ((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))<0){
          totalArrear=0.00
        }
        else if(value.ministryCode==20 && ((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))>=0){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(arrearReceiptPrincipal+arrearReceiptVat+currReceiptPrincipal+currReceiptVat))
  
        }
        
        // else if (value.ministryCode==29 && value.zoneCode=='1'){
        //   totalArrear=0
        // }
        // else if (value.ministryCode==29 && value.zoneCode=='2'){
        //   totalArrear=0
        // }
        // else if (value.ministryCode==29 && value.zoneCode=='3'){
        //   totalArrear=0
        // }
        // else if (value.ministryCode==29 && value.zoneCode=='4'){
        //   totalArrear=0
        // }
        else if(value.ministryCode==29){
          totalArrear=0
        }
        else if (value.ministryCode !=39 &&  value.ministryCode !=29 && value.ministryCode !=20 ){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(arrearReceiptPrincipal+arrearReceiptVat+currReceiptPrincipal+currReceiptVat))
        }
      }
      else{
         if(value.zoneCode=='1'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+164700000-64577677.180;
       
        }
        else if( value.zoneCode=='4'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))+4100000+188659961.120;
        }
        else if( value.zoneCode=='2'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))-33702965.900;
        }
        else if( value.zoneCode=='3'){
          totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(currReceiptPrincipal+currReceiptVat+arrearReceiptVat+arrearReceiptPrincipal))-53699604.430;
        }
      }
      
      //totalArrear=((currPrincipal+currLps+currVat+arrearPrincipal+arrearLps+arrearVat)-(arrearReceiptPrincipal+arrearReceiptVat+currReceiptPrincipal+currReceiptVat))
      totalCustomerNo+=consumerNo;
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
