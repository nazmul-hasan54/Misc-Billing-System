import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { environment } from '../../../../environments/environment';
import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, setHeading, setSubHeading } from '../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class AgricultureAndPoultryWiseCustomerListService {
  defaultColur = "#0c0d0d"
  constructor(private http:HttpClient) { }
  
  getKrishiPoultryCustomers(validDate:string){
    return this.http.get<any>(
      `${environment.apiUrl}get-agriculture-and-poultry-by-date?validDate=` + validDate
    );
  }
  generatePdf(data:any, reportObject:any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,reportObject);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data:any, reportObject:any) {
    return {
      info: {
        title: 'Agriculture and Poultry',
        author: 'BPDB',
        subject: 'Agriculture and Poultry',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',   
      footer: (currentPage, PageCount)=> {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(PageCount, 2)}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }, 
                { text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      content: [this.getHeading(reportObject), this.getAgricultureAndPoultryInfo(data), this.getElectricityClassification(data)],
      pageMargins: [30, 20, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setAllCustomerArrearStyle,
    };
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
  
  private getHeading(billMonth: any) {
    let dateBn = this.translateNumber(dayjs(billMonth).format('DD-MM-YY'),2);
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
              alignment: 'left',
              margin: [70, 0, 0, 0],
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
              margin: [-30, 0, 0, 0],
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
              text: 'অর্থ মন্ত্রণালয় কতৃক প্রদত্ত কৃষিভিত্তিক ও পোল্ট্রিশিল্পে ২০% রিবেট গ্রাহক তালিকা ।',
              style: [setSubHeading],
              margin: [-20, 0, 0, 0],
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
              text: `${month}'${year} ইং পর্যন্ত ।`,
              style: [setSubHeading],
              margin: [-30, -2, 0, 0],
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
    // return {
    //   table: {
    //     margin: [0,0,0,0],
    //     widths: [50, 50, '*', '*', 60, 40],
    //     body: [
    //       [
    //         { border: [false, false, false, false], text: '' },
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //         {
    //           border: [false, false, false, false],
    //           text: 'অর্থ মন্ত্রণালয় কতৃক প্রদত্ত কৃষিভিত্তিক ও পোল্ট্রিশিল্পে ২০% রিবেট গ্রাহক তালিকা ।',
    //           colSpan: 3,
    //           bold: true,
    //           style: [setAgricultureAndPoultryStyles.setHeading],
    //           margin: [-30, -5, 0, 0],
    //         },
    //         {},
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //       ],
    //       [
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //         { 
    //           border: [false, false, false, false], 
    //           text: '' 
    //         },
    //         {
    //           border: [false, false, false, false],
    //           text: `${month}'${year} ইং পর্যন্ত ।`,
    //           bold: true,
    //           colSpan: 2,
    //           style: [setAgricultureAndPoultryStyles.setHeading,],
    //           margin: [0, -3, 0, 0],
    //         },
    //         {},
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           colSpan: 2,
    //           style: ['setBig', 'setBlack', 'setLeft'],
    //         },
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //       ],
    //       [
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //         { 
    //           border: [false, false, false, false], 
    //           text: '' 
    //         },
    //         {
    //           border: [false, false, false, false],
    //           text: ``,
    //           // text: `${dateBn}`,
    //           bold: true,
    //           colSpan: 2,
    //           style: [setAgricultureAndPoultryStyles.setHeading,],
    //           margin: [0, -3, 0, 0],
    //         },
    //         {},
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           colSpan: 2,
    //           style: ['setBig', 'setBlack', 'setLeft'],
    //         },
    //         {
    //           text: '',
    //           border: [false, false, false, false],
    //           style: ['setBig'],
    //         },
    //       ],
    //     ],
    //   },
    //   layout: this.setTableBorder(),
    // };
  }

  private getAgricultureAndPoultryInfo(data:any) {
    const {TotalDues}=data;
    const phases = {
      margin:[0,-30,0,0],
      table: {
        headerRows: 1,
        widths: [20, 100, 10, 100, 90, 'auto', 'auto', '*','auto'],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: 'বিক্রয় ও বিতরণ বিভাগ/ বিদ্যুৎ সরবরাহের নাম',
              rowSpan:1
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setRight],
              text: '',
            },
            {

              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: 'গ্রাহকের নাম',
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'কৃষি সম্প্রসারণ অধিদপ্তর',
            },
            {
              border: [true, true, true, true],

              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text:  'শ্রেণীবিভাগ/হিসাব নং',
              //alignment: 'center',
              colSpan: 2
            },
            {
              text: '',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: 'কনজুমার নাম্বার',
            },
           
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,],
              text: 'বকেয়ার পরিমাণ(টাকা)',
              //alignment: 'center',
            },
          ]
        ],
      },
      layout: this.setTableBorder(),
    };

   

    // KrishiCustomers
    // KrishiLocations
    let KrishiLocations=data;
    let KrishiCustomers=data;
    let totalDues=0;
    let serial=0;
    let custSerial=0;
    let uniqueKrishiLocations=[...new Set(KrishiLocations.map(item => item.locationCode))];
    uniqueKrishiLocations.forEach((location) => {
      let customerGroupByLocation=KrishiCustomers.filter(x=>x.locationCode ==location);
      let customerGroupByLocationLength=customerGroupByLocation.length;
      let providerInsert=Math.ceil(Number(customerGroupByLocationLength/2));

      if(customerGroupByLocationLength>0){
        let providerNo=0;
        serial++;

        customerGroupByLocation.forEach(cust => {
          let {locationDescBn,locationCode,customerNameBn,deptNameBn,isPoultry,namebn,conExtgNum,customerNo,arrearAmt}=cust;
          let providerName=`${locationDescBn} (${locationCode})`;
          custSerial++;
          providerNo+=1;
          totalDues+=arrearAmt;
          arrearAmt = arrearAmt ? this.translateNumber(arrearAmt) : this.translateNumber(0.00);

          phases.table.body.push(
          [
            {
              border:providerInsert==1 ||providerNo==customerGroupByLocationLength? [true, false, true, true]:[true, false, true, false],
              text: `${providerNo==providerInsert?this.translateNumber(serial,2):""}`,
              style: [setAgricultureAndPoultryStyles.setFontBangla, ],
              colSpan: 1,
              rowSpan:1
            },
            {
              border: providerInsert==1 ||providerNo==customerGroupByLocationLength? [true, false, true, true]:[true, false, true, false],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: `${providerNo==providerInsert?providerName:""}`,
              rowSpan:1
            },
            {
              border: [true, true, true, true],
              style: [ setAgricultureAndPoultryStyles.setFontBangla],
              text: `${this.translateNumber(custSerial,2)}`,
            },
            {

              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: `${customerNameBn?customerNameBn:""}`,
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: `${deptNameBn}`,
            },
            {
              border: [true, true, true, true],

              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: `${isPoultry == 1 ? 'পোল্ট্রি শিল্প' : 'কৃষিভিত্তিক শিল্প'}`,
              colSpan: 1
            },
            {
              text: `${conExtgNum}`,
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],

            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: `${this.translateNumber(customerNo,2)}`,
              // text: `${this.translateNumber(customerNo).includes('.') ? this.translateNumber(customerNo).substring(0, this.translateNumber(customerNo).length - 3) : this.translateNumber(customerNo) }`,
            },

            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: `${arrearAmt}`,
            },
          ]
          )
        });
      }
    });
      /* Total section */ 
    phases.table.body.push(
      [
        {
          border: [true, true, false, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setFontBangla
          ],
          
        },
        {
          border: [false, true, false, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
        },
        {

          border: [false, true, false, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [false, true, false, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [false, true, false, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
          //alignment: 'center',
          colSpan: 1
        },
        {
          text: '',
          border: [false, true, false, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],

        },
        {
          border: [false, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: 'সর্বমোট',
         
        },

        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: `${this.translateNumber(totalDues)}`,
          //alignment: 'center',
         
        },
      ],
      [
        {
          border: [false, false, false, false],
          text: `(${toBengaliWord(totalDues)} টাকা মাত্র)`,
          style: [
            setAgricultureAndPoultryStyles.setRight,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 9,
          rowSpan:1
        },
        {
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
        },
        {

          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
          //alignment: 'center',
          colSpan: 1
        },
        {
          text: '',
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],

        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: '',
        },

        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: '',
          //alignment: 'center',
        },
      ],
    )
    return phases;
  }
  getElectricityClassification(data:any){
    const phase ={
      margin:[0,30,0,0],
      table: {
       // headerRows: 2,
        widths: [30, 100, 10, 50, 90, 150],
        body:[
          // row -1
          [
            {
              border: [true, true, true, true],
              text: "বিউবো'র শ্রেণীবিভাগ অনুযায়ী প্রদও রেয়াতের পরিমান",
              style: [setAgricultureAndPoultryStyles.setFontBangla],
             alignment: 'center',
              colSpan: 6
            },
            {},
            {},
            {},
            {},
            {},
          ],
          //row -2
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [

                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              alignment: 'center'
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: 'শ্রেণীবিভাগ',
            },

            {

              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: '',
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'হিসার সংখ্যা',
            },
            {
              border: [true, true, true, true],

              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: '',
              //alignment: 'center'
            },
            {
              text:'প্রদত্ত রেয়াতের পরিমান',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],

            },

          ]
        ]
      },
      layout: this.setTableBorder(),
    }
    let KrishiCustomers=data;
    let uniqueDivision=[... new Set(KrishiCustomers.map(item=>item.isPoultry))];
    let serial=0;
    let totalDues=0;
    uniqueDivision.forEach(division => {
      
      let groupByCustomerByDivision=KrishiCustomers.filter(x=>x.isPoultry==division);
      let totalSum=groupByCustomerByDivision.reduce((a,b)=>a+b.arrearAmt,0);
      totalDues+=totalSum;
     
      serial++;
      phase.table.body.push(
         //row-3
         [
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(serial,2)}`,
            style: [

              setAgricultureAndPoultryStyles.setFontBangla,
            ],
            colSpan: 1,
            alignment: 'center'
          },
          {
            border: [true, true, true, true],
            style: [
              setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,
            ],
            text: `${division == 1 ? 'পোল্ট্রি শিল্প' : 'কৃষিভিত্তিক শিল্প'}`,
          },
         
          {

            border: [true, true, true, true],
            style: [
              setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,
            ],
            text: '',
          },
          {
            border: [true, true, true, true],
            style: [setAgricultureAndPoultryStyles.setFontBangla],
            text: `${this.translateNumber(groupByCustomerByDivision.length,2)}টি`,
          },
          {
            border: [true, true, true, true],

            style: [setAgricultureAndPoultryStyles.setFontBangla],
            text:'',
            //alignment: 'center'
          },
          {
            text: `${totalSum ? this.translateNumber(totalSum) : this.translateNumber(0.00)}`,
            border: [true, true, true, true],
            style: [
              setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,
            ],

          },
         
        ],
      )
      
    });
    phase.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: 'সর্বমোট টাকা',
          style: [ setAgricultureAndPoultryStyles.setFontBangla ],
          colSpan: 4,
          alignment: 'right'
        },
        {
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },

        {

          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: '',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: '',
          //alignment: 'center'
        },
        {
          text: `${this.translateNumber(totalDues)}`,
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],

        },

      ],
    )
    return phase;
  }


  private setTableBorder() {
    const d = this.defaultColur;
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
      // hLineStyle: function (i, node) {
      //   // if (i === 0 || i === node.table.body.length) {
      //   //   return null;
      //   // }
      //   return { dash: { length: 10, space: 4 } };
      // },
      // vLineStyle: function (i, node) {
      //   // if (i === 0 || i === node.table.widths.length) {
      //   //   return {dash: {length: 4}};
      //   // }
      //   return { dash: { length: 4 } };
      // },
      //paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
}
