import { Injectable } from "@angular/core";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import {
  setAllCustomerArrearStyle,
  misMinistrySummaryHeaderMargin,
  setHeading,
  setPdfMakeFonts,
  setAgricultureAndPoultryStyles,
  ministryDetailsDefaultStyle,
  ministryDetailsStyle,
  setSubHeading,
  ministryDetailsImageMargin,
  ministryDetailsHeaderMargin,
  ministryDetailsPageMargin,
} from "../config/pdfMakeConfig";
import { UntracebleCustArrearReportModel } from "../../../model/untraced-consumer.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: "root",
})
export class UntracedCustArrearDetailsService {
  defaultColor = "#0c0d0d";
  private year: any;
  private month: any;

  constructor() {}

  generatePdf(data: UntracebleCustArrearReportModel[], dateMonth?: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, dateMonth);
    
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }


  private getDocumentDefinition(data: UntracebleCustArrearReportModel[],
    dateMonth: any) {

    return {
      info: {
        title: "Untraced Consumer Arrear Details",
        author: "BPDB",
        subject: "Untraced Consumer Arrear Details",
        keywords: "keywords for document",
        //creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }
                , { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data,dateMonth),
          content: [this.getUntracedArrearInfo(data, dateMonth)],
      pageMargins: ministryDetailsPageMargin,
      defaultStyle: ministryDetailsDefaultStyle,
      styles: ministryDetailsStyle
    }
  }

  private getHeading(data: any, utilityObj: any) {
    const totalCount = data.length;
    const phase = {
      margin: ministryDetailsHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 50],
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
              margin: ministryDetailsImageMargin,
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
          // // row 2
          [
            {},
            {},
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],

          // row 4
          [
            {},
            {},
            {
              text: `Untraced Customer Arrear Details As On ${utilityObj.bilL_CYCLE_CODE ?? data[0]?.bilL_CYCLE_CODE}`,
              style: [setSubHeading],
              colSpan: 6,
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
              // text: '(Govt., Semi Govt., Autonomous & Corporation)',
              // style: [setSubHeading],
              // colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // // row 3
          [
            {},
            {},
            {},
            {
              // text: `${utilityObj.ministry.code == '0' ? 'All Ministry' : utilityObj.ministry.name} \n`,
              // //text: `${ 'All Ministry' } \n`,
              // style: ['setSubHeading'],
              // colSpan: 4,
            },
            {},
            {},
            {},
            {
              // text: `Total Customer: ${totalCount}`,
              // style: [setSubHeading],
              // colSpan: 3,
              // bold: false
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

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
    return num.toString().replace(/\d/g, (x) => banglaDigits[x]);
  }

  private getChangesDate(data:any): string{
    let billMonth = data.toString();
    let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
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
    return `${month}'${year}`;
  }



  private getUntracedArrearInfo(data: UntracebleCustArrearReportModel[], dateMonth:any) {
    let previousBillMonth = this.getChangesDate(dateMonth-1);
    let currentBillMonth = this.getChangesDate(dateMonth);
    const phases = {
      table: {
        headerRows: 1,
        // widths: [25, 50, 40, 50, 35, 48, 50, 35, 48, 50, 35, 48, 50, 40, 50],
        widths: [50, 90,90, 90, 90, 90, 90,90],
        body: [

          [
            {
              border: [true, true, true, true],
              text: "Sl",
              style: [
                // setAgricultureAndPoultryStyles.setCenter,
                // setAgricultureAndPoultryStyles.setHead,
                'setBold'
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Location",
              style: ['setBold'],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Customer Name",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Customer Num",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },

            {
              border: [true, true, true, true],
              text: "Principal Amount",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Lps Amount",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Vat Amount",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "Total Amount",
              style: [
                'setBold'
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            // {
            //   border: [true, true, true, true],
            //   text: "বকেয়ার পরিমাণ (টাকা)",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "আদায়ের পরিমাণ (টাকা)",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "সনাক্তকৃত গ্রাহক সংখ্যা",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "বকেয়ার পরিমাণ (টাকা)",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "আদায়ের পরিমাণ (টাকা)",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "নিখোঁজ গ্রাহকের সংখ্যা",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
            // {
            //   border: [true, true, true, true],
            //   text: "বকেয়ার পরিমাণ (টাকা)",
            //   style: [
            //     setAgricultureAndPoultryStyles.setCenter,
            //     setAgricultureAndPoultryStyles.setFontBangla,
            //   ],
            //   colSpan: 1,
            //   rowSpan: 1,
            //   alignment: "center",
            // },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    /*GrandTotal*/
    let totalAmount=0;
    let totalprincipal=0;
    let totalLps=0;
    let totalVat=0;
    let serial = 0;
   
    const uniqueZoneCode = [...new Set(data.map((item) => item.zoneCode))];
    
    uniqueZoneCode.forEach(zone => {

      let findCircleListByZoneCodeList = data.filter(e=>e.zoneCode == zone);
      if(findCircleListByZoneCodeList.length > 0){
        const uniqueCircleCode = [...new Set(findCircleListByZoneCodeList.map((item) => item.circleCode))];
        uniqueCircleCode.forEach((eItem) => {
          let locationData = data.filter((x) => x.circleCode == eItem);
          locationData.forEach((value) => {

            totalAmount += value.totaL_AMOUNT;
            totalprincipal += value.totaL_PRINCIPAL_ARREAR;
            totalLps += value.totaL_LPS_ARREAR;
            totalVat += value.totaL_VAT_ARREAR;
    
    
            phases.table.body.push([
              {
                border: [true, false, true, true],
                text: `${serial}`,
                style: [
                  'setRight'
                  // setAgricultureAndPoultryStyles.setTitleBold,
                ],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
              {
                border: [true, false, true, true],
                text: `${value.locationCode}`,
                style: [],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
              {
                border: [true, false, true, true],
                text: `${value.customeR_NAME}`,
                style: ['setLeft'],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
              {
                border: [true, false, true, true],
                text: `${value.consumeR_NO}`,
                style: ['setLeft'],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
         
              {
                border: [true, true, true, true],
                text: `${value.totaL_PRINCIPAL_ARREAR}`,
                style: [
                  'setRight'
                ],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
           
              {
                border: [true, true, true, true],
                text: `${value.totaL_LPS_ARREAR}`,
                style: [
                  'setRight'
                ],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
              
              {
                border: [true, true, true, true],
                text: `${value.totaL_VAT_ARREAR}`,
                style: [
                  'setRight'
                ],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
              
              {
                border: [true, true, true, true],
                text: `${value.totaL_AMOUNT}`,
                style: [
                  'setRight'
                ],
                colSpan: 1,
                rowSpan: 1,
                alignment: "center",
              },
      
            ]);
          });
          let circleNameBn: UntracebleCustArrearReportModel = data.find(
            (c) => c.circleCode == eItem
          );
        });
      }
      let zoneData: UntracebleCustArrearReportModel = data.find(
        (z) => z.zoneCode == zone
      );

    });
    

    

    phases.table.body.push(
      [
        {
          border: [true, false, true, true],
          text: `Total`,
          style: [
            
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 2,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
         
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
           
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
           
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${totalprincipal.toFixed(3)}`,
          style: [
          
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${totalLps.toFixed(3)}`,
          style: [
        
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${totalVat.toFixed(3)}`,
          style: [
         
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${totalAmount.toFixed(3)}`,
          style: [
       
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        
      
     
      
      
    
   
      ]
      
    );

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

