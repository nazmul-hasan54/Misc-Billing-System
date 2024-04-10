import { Unionparishad } from './../../../model/unionparishad';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, misMinistryArrearStyle, setHeading, setMosqueAndOtherPlacesStyles } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class UnionporishodDetailsService {

  defaultColor = '#000000';
  constructor() { }
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  generatePdf(data: any, reportObj: any, zoneData: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data,reportObj, zoneData);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, reportObj: any, zoneData: any) {
    return {
      info: {
        title: 'Union Porishod Report',
        author: 'BPDB',
        subject: 'Union Porishod Report',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',

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

      header: this.getUnionPorishodDetailsHeading(reportObj),
      background: function (currentPage, pageSize) {
        return [
          {
            // svg: `<svg height="1060" width="945">
            //   <line x1="100" y1="800" x2="300" y2="800" style="stroke:#111;stroke-width:1" />
            // </svg>` 
          }
        ]
      },
      content: [
        this.getUnionPorishodDetailsReport(data, reportObj, zoneData)
      ],
      pageMargins: [30, 100, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle,
    };
  }

  
  private getUnionPorishodDetailsHeading(reportObj: any) {
    // let billMonth= reportObj;
    // let year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
    // let month: string;
    // switch (dayjs(billMonth).format("M")) {
    //   case "1": {
    //     month = "জানুয়ারি"
    //     break
    //   }
    //   case "2": {
    //     month = "ফেব্রুয়ারী"
    //     break
    //   }
    //   case "3": {
    //     month = "মার্চ"
    //     break
    //   }
    //   case "4": {
    //     month = "এপ্রিল"
    //     break
    //   }
    //   case "5": {
    //     month = "মে"
    //     break
    //   }
    //   case "6": {
    //     month = "জুন"
    //     break
    //   }
    //   case "7": {
    //     month = "জুলাই"
    //     break
    //   }
    //   case "8": {
    //     month = "আগষ্ট"
    //     break
    //   }
    //   case "9": {
    //     month = "সেপ্টেম্বর"
    //     break
    //   }
    //   case "10": {
    //     month = "অক্টোবর"
    //     break
    //   }
    //   case "11": {
    //     month = "নভেম্বর"
    //     break
    //   }
    //   case "12":
    //   default:
    //     {
    //       month = "ডিসেম্বর"
    //       break
    //     }
    // }

    let decreateDate = dayjs(reportObj.billMonth).add(-1, 'month').format('YYYYMM');
    let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
    let month = this.getBanglaMonth(decreateDate);

    const phase = {
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        headerRows: 4,
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 4,
              colSpan: 2,
              alignment: 'right',
              margin: [-140, 0, 0, 0],
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
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              margin: [-20, -2, 0, 0],
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
              text: [`জোন অনুসারে ইউনিয়ন পরিষদ বকেয়া বিবরনী`],
              style: [setSubHeading],
              margin: [-20, -2, 0, 0],
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
              text:`${month}-${year} ইং পর্যন্ত`,
              border: [true, true, true, true],
              style: [setSubSetHeading],
              margin: [-20, -2, 0, 0],
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
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }

  private getUnionPorishodDetailsReport(data: any, reportObj: any, zoneData: any){    
      const phase = {
      margin: [0,-15, 0, 0],
      table: {
      dontBreakRows: true,
      headerRows: 1,
      widths: [25, '*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
      body: [
        [
          {
            text: '',
            style: ['setLeft'],
            border: [false, false, false, false],
            colSpan: 8
          }, {},{}, {}, {}, {}, {}, {},
        ],
      ]
      },
      layout: this.setTableStyles()
    };

    let grandUnionPrnTotal = 0;
    let grandUnionLpsTotal = 0;
    let grandUnionVatTotal = 0;
    let grandUnionTotal = 0;
    let uniqueZone=[... new Set(data.map(item=>item.zoneName))];
    uniqueZone.forEach(item=>{
      if(item){
        //Unique Zone
        phase.table.body.push(
            [
              {
                text: `জোন - ${item}`,
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 8,
              },
              {
                text: '',
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              }, 
              {
                text: "",
                style: ['setLeft', 'setLocationBold2'],
                border: [true, true, true, true],
                colSpan: 1,
              },
            ]
          )
        //Table Heading
        phase.table.body.push(
            [
              {
                text: "ক্রমিক নং",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: "বিক্রয় ও বিতরণ বিভাগ",
                style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: "ইউনিয়ন পরিষদের নাম",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: "গ্রাহক নং",
                style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: "মূল বকেয়া"
                , style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: "সারচার্জ"
                , style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: "মূসক"
                , style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
              {
                text: "মোট",
                style: ['setBold'],
                border: [true, true, true, true],
                colSpan: 1,
              },
            ]
          )

          let unionPrnTotal=0;
          let unionLpsTotal=0;
          let unionVatTotal =0;
          let unionTotal=0;
        let serial = 0;
        let zoneList=data.filter(p=>p.zoneName==item);
        let uniqueLocation=[...new Set(zoneList.map(item=>item.locationCode || item.zoneName))];
        uniqueLocation.forEach((location)=>{
          let unionArrearGroupByZone=data.filter(x=>x.locationCode==location);
          let unionArrearGroupByZoneLength=unionArrearGroupByZone.length;
          let providerInsert=Math.ceil(Number(unionArrearGroupByZoneLength/1.5));

          if(unionArrearGroupByZoneLength>0){
            let providerNo = 0;
            unionArrearGroupByZone.forEach(value=>{
              let providerName=`${value.locationName} (${value.locationCode})`;
              providerNo+=1; 
              serial ++;
              unionPrnTotal += value.prn;
              unionLpsTotal += value.lps;
              unionVatTotal += value.vat;
              unionTotal += value.arrearAmt;
              //Body
              phase.table.body.push(
                [
                  {
                    text: `${this.translateNumber(serial,2)}`,
                    border: [true, true, true, true],
                    style: [],
                    colSpan: 1,
                  },
                  {
                    text: `${providerNo == providerInsert ? providerName : ""}`,
                    border: providerInsert==1 ||providerNo==unionArrearGroupByZoneLength? [true, false, true, true]:[true, false, true, false],
                    style: [ ],
                    colSpan: 1, 
                  },
                  {
                    text: `${value.unionPorishodName}`,
                    border: [true, true, true, true],
                    style: ['setLeft', ],
                    colSpan: 1,
                  },
                  {
                    // text: `${this.translateNumber(value.customerNumber)}`,
                    text: `${this.translateNumber(value.customerNumber).includes('.') ? this.translateNumber(value.customerNumber).substring(0, this.translateNumber(value.customerNumber).length - 3) : this.translateNumber(value.customerNumber) }`,
                    border: [true, true, true, true],
                    style: ['setRight',],
                    colSpan: 1,
                  },
                  {
                    text: `${this.translateNumber(value.prn.toFixed(2))}`,
                    border: [true, true, true, true],
                    style: ['setRight', ],
                    colSpan: 1,
                  },
                  {
                    text: `${this.translateNumber(value.lps.toFixed(2))}`,
                    border: [true, true, true, true],
                    style: ['setRight',],
                    colSpan: 1,
                  },
                  {
                    text: `${this.translateNumber(value.vat.toFixed(2))}`,
                    border: [true, true, true, true],
                    style: ['setRight', ],
                    colSpan: 1,
                  },
                  {
                    text: `${this.translateNumber(value.arrearAmt.toFixed(2))}`,
                    border: [true, true, true, true],
                    style: ['setRight', ],
                    colSpan: 1,
                  },
                ]
              );
            })
          }
        })

        grandUnionPrnTotal += unionPrnTotal;
        grandUnionLpsTotal += unionLpsTotal;
        grandUnionVatTotal += unionVatTotal;
        grandUnionTotal += unionTotal;
        //Zone Total
        phase.table.body.push(
          [
            {
              text: `${item} জোনের সর্বমোট টাকা`,
              border: [true, true, true, true],
              style: [ 'setBold'],
              colSpan: 4,
            },
            {
              text: "",
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
            },
            {
              text: "",
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
            },
            {
              text: "",
              style: [],
              border: [true, true, true, true],
              colSpan: 1,
            },
            {
              text: `${this.translateNumber(unionPrnTotal.toFixed(2))}`,
              // text: `${unionPrnTotal ? Number(unionPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              border: [true, true, true, true],
              style: ['setRight','setBold'],
              colSpan: 1,
            },
            {
              text: `${this.translateNumber(unionLpsTotal.toFixed(2))}`,
              border: [true, true, true, true],
              style: ['setRight','setBold'],
              colSpan: 1,
            },
            {
              text: `${this.translateNumber(unionVatTotal.toFixed(2))}`,
              border: [true, true, true, true],
              style: ['setRight','setBold'],
              colSpan: 1,
            },
            {
              text: `${this.translateNumber(unionTotal.toFixed(2))}`,
              border: [true, true, true, true],
              style: ['setRight', 'setBold'],
              colSpan: 1,
            },
          ]
        );
        
      }
      // Empty Row    
      if(item != uniqueZone[uniqueZone.length-1])
      {
       phase.table.body.push(
         [ 
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 7
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 7
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
           {
             border: [false, false, false, false],
             text: ``,
             style: [],
             colSpan: 0
           },
         ] 
       );
      }
      
    });

    //Grand Total
    phase.table.body.push(
      [ 
        {
          border: [true, true, true, true],
          text: `সর্বমোট টাকা`,
          style: [],
          colSpan: 4
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
          colSpan: 0
        },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandUnionPrnTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandUnionLpsTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandUnionVatTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandUnionTotal)}`,
             style: [],
             colSpan: 0
           },
      ]);
    return phase;
  }

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) { return 5; },
    }
  }
  
  private getBanglaMonth(billMonth: string): string{
    let month='';
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
    return month;
  }
}
