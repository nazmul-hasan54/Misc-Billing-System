import { style } from '@angular/animations';
import { Injectable } from '@angular/core';
import { count } from 'console';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { setFourthHeading, setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class NonBengaliDetailsService {

  defaultColor = '#000000';
  constructor() { }
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }


  generatePdf(data: any, reportObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data,reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any,) {
    return {
      info: {
        title: 'Non-Bengali Bihary Camp Report',
        author: 'BPDB',
        subject: 'Non-Bengali Bihary Camp Report',
        keywords: 'Keyword for document'
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

      header: this.getNonBengaliDetailsHeading(reportObj),
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
        this.getNonBengaliDetailsReport(data, reportObj)
      ],
      pageMargins: [30, 80, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle,
    };
  }

  
  private getNonBengaliDetailsHeading(validDate: any,) {  

    // let decreateDate = dayjs(validDate.billMonth).add(-1, 'month').format('YYYYMM');
    let year = this.translateNumber(dayjs(validDate.billMonth).format("YYYY"), 2);
    let month = this.getBanglaMonth(validDate.billMonth);

    // let dateBn = this.translateNumber(dayjs(validDate).format('DD-MM-YY'),2);
    // let year = this.translateNumber(dayjs(validDate).format("YY"), 2);
    // let month: string;
    switch (dayjs(validDate).format("M")) {
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
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
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
              text: [`অবাঙ্গালী (বিহারি) ক্যাম্পের বকেয়া বিদ্যুৎ বিলের বিবরনী`],
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
              // text: `${dateBn}  ইং `,
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

  private getNonBengaliDetailsReport(data: any, reportObj: any,){
    const phase = {
      margin: [0,0, 0, 0],
      table: {
        headerRows: 1,
        dontBreakRows: true,
        widths: [25, '*', 90, 'auto', 'auto', 'auto', 'auto', 'auto'],
        body: [
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
              text: "ক্যাম্পের নাম",
              style: ['setBold'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text: "গ্রাহক নম্বর",
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
        ]
      },
      layout: this.setTableStyles()
    };
    let grandNonBengaliPrnTotal =0;
    let grandNonBengaliLpsTotal =0;
    let grandNonBengaliVatTotal =0;
    let grandNonBengaliTotal =0;
    let uniqueZone=[... new Set(data.map(item=>item.zoneName))];
    uniqueZone.forEach(item=>{
      if(item){
        //Unique Zone
        // phase.table.body.push(
        //     [
        //       {
        //         text: `জোন - ${item}`,
        //         style: ['setLeft', 'setBig'],
        //         border: [true, true, true, true],
        //         colSpan: 8,
        //       },
        //       {
        //         text: '',
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       }, 
        //       {
        //         text: "",
        //         style: ['setLeft', 'setLocationBold2'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //     ]
        //   )

        //Table Heading
        // phase.table.body.push(
        //     [
        //       {
        //         text: "ক্রমিক নং",
        //         style: ['setBold'],
        //         colSpan: 1,
        //         border: [true, true, true, true]
        //       },
        //       {
        //         text: "বিক্রয় ও বিতরণ বিভাগ",
        //         style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //       {
        //         text: "ক্যাম্পের নাম",
        //         style: ['setBold'],
        //         colSpan: 1,
        //         border: [true, true, true, true]
        //       },
        //       {
        //         text: "গ্রাহক নম্বর",
        //         style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //       {
        //         text: "মূল বকেয়া"
        //         , style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //       {
        //         text: "সারচার্জ"
        //         , style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //       {
        //         text: "মূসক"
        //         , style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //       {
        //         text: "মোট",
        //         style: ['setBold'],
        //         border: [true, true, true, true],
        //         colSpan: 1,
        //       },
        //     ]
        //   )

          
        let nonBengaliPrnTotal=0;
        let nonBengaliLpsTotal=0;
        let nonBengaliVatTotal =0;
        let nonBengaliTotal=0;
        let serial = 0;
        let zoneList=data.filter(p=>p.zoneName==item);
        let uniqueLocation=[...new Set(zoneList.map(item=>item.locationCode || item.zoneName))];
        uniqueLocation.forEach((location)=>{
          let nonBengaliArrearGroupByZone=data.filter(x=>x.locationCode==location);
          let nonBengaliArrearGroupByZoneLength=nonBengaliArrearGroupByZone.length;
          let providerInsert=Math.ceil(Number(nonBengaliArrearGroupByZoneLength/1.5));

          let middleInsertProviderNo = 2;

          if(nonBengaliArrearGroupByZoneLength>0){
            let providerNo = 0;
            nonBengaliArrearGroupByZone.forEach(value=>{
              let providerName=`${value.locationNameBn} (${value.locationCode})`;
              providerNo+=1; 
              serial ++;
              nonBengaliPrnTotal += value.prn;
              nonBengaliLpsTotal += value.lps;
              nonBengaliVatTotal += value.vat;
              nonBengaliTotal += value.totalArrear;   

              
              if(middleInsertProviderNo < nonBengaliArrearGroupByZoneLength){
                middleInsertProviderNo = providerNo%29 ==0 ? (middleInsertProviderNo +29) : (middleInsertProviderNo +0) 
              }
                  
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
                    text: `${providerNo == middleInsertProviderNo ? providerName : ""}`,
                    border: providerInsert==1 ||providerNo==nonBengaliArrearGroupByZoneLength? [true, false, true, true]:[true, false, true, false],
                    style: [ ],
                    colSpan: 1, 

                  //   text: `${providerNo == providerInsert ? providerName : ""}`,
                  //   border: providerInsert==1 ||providerNo==nonBengaliArrearGroupByZoneLength? [true, false, true, true]:[true, false, true, false],
                  //   style: [ ],
                  //   colSpan: 1, 
                  },
                  {
                    text: `${value.nameBn}`,
                    border: [true, true, true, true],
                    style: ['setLeft', ],
                    colSpan: 1,
                  },
                  {
                    text: `${this.translateNumber(value.customerNo,2)}`,
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
                    text: `${this.translateNumber(value.totalArrear.toFixed(2))}`,
                    border: [true, true, true, true],
                    style: ['setRight', ],
                    colSpan: 1,
                  },
                ]
              );
            })
          }
        })

        grandNonBengaliPrnTotal += nonBengaliPrnTotal;
        grandNonBengaliLpsTotal += nonBengaliLpsTotal;
        grandNonBengaliVatTotal += nonBengaliVatTotal;
        grandNonBengaliTotal += nonBengaliTotal;
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
            text: ``,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: ``,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: `${this.translateNumber(nonBengaliPrnTotal.toFixed(2))}`,
            // text: `${unionPrnTotal ? Number(unionPrnTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: `${this.translateNumber(nonBengaliLpsTotal.toFixed(2))}`,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: `${this.translateNumber(nonBengaliVatTotal.toFixed(2))}`,
            border: [true, true, true, true],
            style: ['setRight','setBold'],
            colSpan: 1,
          },
          {
            text: `${this.translateNumber(nonBengaliTotal.toFixed(2))}`,
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
         ] ,
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
            text: "ক্যাম্পের নাম",
            style: ['setBold'],
            colSpan: 1,
            border: [true, true, true, true]
          },
          {
            text: "গ্রাহক নম্বর",
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
       );
      }
    })
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
             text: `${this.translateNumber(grandNonBengaliPrnTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandNonBengaliLpsTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandNonBengaliVatTotal)}`,
             style: [],
             colSpan: 0
           },
           {
            border: [true, true, true, true],
             text: `${this.translateNumber(grandNonBengaliTotal)}`,
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
