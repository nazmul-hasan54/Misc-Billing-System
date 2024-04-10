import { data } from 'jquery';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';

import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, misMinistryArrearStyle, setHeading, setPoultryStyles, setCommonStyle } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
import { setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
import { MONTH } from 'ngx-bootstrap/chronos/units/constants';

@Injectable({
  providedIn: 'root'
})
export class MinistryReportService {


  defaultColor = '#000000';
  constructor() { }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  generatePdf(data: any, reportObj: any, utilityObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition( data, reportObj, utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition( data: any, reportObj: any, utilityObj: any) {
    return {
      info: {
        title: 'APA Report',
        author: 'BPDB',
        subject: 'APA Report',
        keywords: 'keywords for document',
      },
      pageSize: 'legal',
      pageOrientation: 'landscape',

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

      header: this.getAPAHeading(data,reportObj,utilityObj),
      background: function (currentPage, pageSize) {
        return [
          {

            svg: `<svg height="820" width="445">
              <line x1="-80" y1="795.8" x2="138.2" y2="795.8" style="stroke:#111;stroke-width:1" />
            </svg>`

          }
        ]
      },
      content: [
        this.getAPAReport(data,reportObj,utilityObj)

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

  private getAPAHeading(data: any, utilityObj: any, reportObj: any) {
    let { billMonth } = reportObj;
    let year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
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
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        headerRows: 1,
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
              margin: [-300, 0, 0, 0],
            },
            {},
            { text: '', colSpan: 8, border: [false, false, false, false] },
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
            {
              text: '',

              colSpan: 3,
            },
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: [`বার্ষিক কর্ম সম্পাদনচুক্তি(এপিএ ${this.translateNumber(reportObj.year,2)} এর অর্জন `],
              style: [setSubHeading],
              margin: [-20, -2, 0, 0],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          [
            {},
            {},
            {
              text:`রিপোর্টিং মাস:${month}'${year}`,
              style: [setSubSetHeading],
              margin: [-20, -2, 0, 0],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            { text: '', colSpan: 3 },
            {},
            {},
          ],
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '',
              style: ['setBold', 'setBig'],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              style: ['setBig', 'setLeft'],
              margin: [0, 0, 50, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }


  private getAPAReport(data: any, utilityObj: any, reportObj: any) {
    let { fromBillMonth } = reportObj;
    let year = this.translateNumber(dayjs(fromBillMonth).format("YY"), 2);
    let month: string;
    switch (dayjs(fromBillMonth).format("M")) {
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
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 2,
        widths: [70, '*', 100, 30, 25, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30, 30,30, 30],
        body: [
          [
            {
              text: 'কৌশলগত উদ্দেশ্য',
              style: ['setBlack','setBold',
              setCommonStyle.setBlack],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 0,
              margin: [0, 10, 0, 0],
            
            },
            {
              text: 'কার্যক্রম',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 1,
              margin: [0, 10, 0, 0],
               
            },
            {
              text: 'কর্মসম্পাদন সূচক',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 0,
              margin: [0, 10, 0, 0],
            },

            {
              text: 'একক',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 0,
              margin: [0, 10, 0, 0],
            },
            {
              text: 'সূচকের মান',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 0,
              margin: [0, 10, 0, 0],
            },
            {
              text: 'লক্ষ্যমাত্রা',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
              colSpan: 0,
              margin: [0, 10, 0, 0],
            },
            {
              text: 'অর্জন',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 14,
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
          [
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 6,
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
             
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `জুলাই`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `আগষ্ট`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `সেপ্টেম্বর`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `অক্টোবর`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `নভেম্বর`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `ডিসেম্বর`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `জানুয়ারি`,
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 0,
              colSpan: 0,
            },
            {
              text: `ফেব্রুয়ারী`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `মার্চ`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `এপ্রিল`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `মে`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `জুন`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: `অর্থবছর ${this.translateNumber(reportObj.year,2)}`,
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'মন্তব্য',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ],
      },
    };
    

    let StrategicObjective=data;  
    let Program=data;
    let Performance=data;
    let serial = 0;
    let Totalindex=0;
    let totalFiscalYear=0;
    let uniqueStrategicObjective=[...new Set(StrategicObjective.map(item=>item.STRATIGIC_CODE))];
    let uniqueProgram=[...new Set(Program.map(item=>item.PROGRAM_CODE))];

    uniqueStrategicObjective .forEach((strategicObj)=>{
      //Unique STRATIGIC_CODE by PROGRAM_CODE
      let ProgramGroupByStrategicObjective=Program.filter(x=>x.STRATIGIC_CODE==strategicObj);
      let ProgramGroupByStrategicObjectiveLength=ProgramGroupByStrategicObjective.length;
      let providerInsert=Math.ceil(Number(ProgramGroupByStrategicObjectiveLength /2));
      //

      //Unique PROGRAM_CODE by PERFORMANCE_CODE
      let PerformanceIndexGroupByProgram=Performance.filter(x=>x.PROGRAM_CODE==strategicObj);
      let PerformanceIndexGroupByProgramLength=PerformanceIndexGroupByProgram.length;
      
      //
      let progarmName = '';
      if(ProgramGroupByStrategicObjectiveLength >0){
        let providerNo = 0;
        serial++;
        let TotalAmount=0;
        ProgramGroupByStrategicObjective .forEach(progData=>{
          let{ID,STRATIGIC_CODE,STATIGIC_NAME,PROGRAM_CODE,PROGRAM_NAME,PERFORMANCE_CODE,PERFORMANCE_NAME,UNIT_CODE,UNIT_NAME,INDEX_CODE,TARGET,FINANCIAL_AMOUNT,COMMENTS
          ,July,August,September,October,November,December,January,February,March,April,May,June}=progData;
          TotalAmount=(July+August+September+October+November+December+January+February+March+April+May+June);
          Totalindex +=INDEX_CODE;
          totalFiscalYear +=TotalAmount;
          providerNo += 1;
          
          phases.table.body.push(
          [
            {
              border: providerInsert == 1 || providerNo == ProgramGroupByStrategicObjectiveLength ? [true, false, true, true] : [true, false, true, false],
              style: ['setLeft','setBold'],
              text: `${providerNo == providerInsert ? STATIGIC_NAME : ""}`,
              margin: [0, 0, 0, 0],
              
              
              // text:`${STATIGIC_NAME}`,
              // style: ['setBlack', 'setLeft'],
              // border: [true, true, true, true],
            },
            {
              // border: providerProgramNameInsert == 1 || providerNo == PerformanceIndexGroupByProgramLength ? [true, false, true, true] : [true, false, true, false],
              // style: [],
              // text: `${providerNo == providerProgramNameInsert ? PROGRAM_NAME : ""}`,

              
              text:`${PROGRAM_NAME!= progarmName ? PROGRAM_NAME: " "}`,
              style: ['setBlack', 'setLeft'],
              border: PROGRAM_NAME!= progarmName ?  [true, true, true, false]: [true, false, true, false],
              margin: [0, 5, 0, 0],
            },
            {
              text:`${PERFORMANCE_NAME}`,
              style: ['setBlack', 'setLeft'],
              border: [true, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: `${UNIT_NAME}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
              margin: [0, 0, 0, 0],
            },

            {
              text: `${this.translateNumber(INDEX_CODE,2)}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: `${this.translateNumber(TARGET)}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
              margin: [0, 0, 0, 0],
            },
            {
              text: `${July? this.translateNumber(July) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${August? this.translateNumber(August) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${September? this.translateNumber(September) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${October? this.translateNumber(October) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${November? this.translateNumber(November) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${December? this.translateNumber(December) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${January? this.translateNumber(January) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${February? this.translateNumber(February) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${March? this.translateNumber(March) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${April? this.translateNumber(April) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${May? this.translateNumber(May) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${June? this.translateNumber(June) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${TotalAmount? this.translateNumber(TotalAmount) :''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
            {
              text: `${COMMENTS ? COMMENTS:''}`,
              style: ['setBlack', 'setCenter'],
              border: [false, true, true, true],
            },
          ])
          progarmName = PROGRAM_NAME;
        })
      }
    })

    phases.table.body.push(
      [
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, true, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: `সূচকের মোট মান`,
          style: [],
          border: [true, true, true, true],
        },

        {
          text: `${Totalindex? this.translateNumber(Totalindex,2) :''}`,
          style: [],
          border: [true, true, true, true],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
        
        {
          text: `${totalFiscalYear? this.translateNumber(totalFiscalYear) :''}`,
          style: [],
          border: [true, true, true, true],
        },
        {
          text: ``,
          style: [],
          border: [false, false, false, false],
        },
      ])

    return phases;
  }

  private toFixedNumber(num, digits, base) {
    var pow = Math.pow(base || 10, digits);
    return Math.round(num * pow) / pow;
  }
}
