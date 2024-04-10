import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubSetHeading } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class OnlineNonBengaliBillArrearSummaryService {

  defaultColor: '#000000';

  constructor() { }

  private translateNumber(num, option=1){
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if(option==1){
      num = Number(num).toLocaleString(undefined, {minimumFractionDigits: 2})
    }
    return num.toString().replace(/\d/g, x=> banglaDigits[x]);
  }

  generatePdf(data:any, reportObj: any){
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(data, reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data:any, reportObj:any){
    return {
      info: {
        title: 'Non-Bengali Bihary Camp Report',
        author: 'BPDB',
        subject: 'Non-Bengali Bihary Camp Report',
        keywords: 'Keyword for document'
      },
      pageSize: 'A4',      
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

      header: this.getLocatoinWiseNonBengaliTableHeading(reportObj),
      content: [
        this.getLocatoinWiseNonBengaliTable1Report(data,  reportObj),
        this.getLocationWiseNonBengaliTable2Report(data, reportObj),
        this.getLocationWiseNonBengaliTable3Report(data, reportObj),
      ],
      pageMargins: [30, 80, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle,
    }
  }

  private getLocatoinWiseNonBengaliTableHeading(validDate: any) {
    let year = this.translateNumber(dayjs(validDate).format("YYYY"), 2);
    //let year2 = this.translateNumber(moment(billMonth).subtract(7, 'year').format('YYYY').toString(), 2);
    //console.log(year2);
    let month: string;
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
        //  headerRows: 5,
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
              margin: [-85, 0, 0, 0],
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
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: [`অবাঙ্গালী (বিহারি) ক্যাম্পের বকেয়া বিদ্যুৎ বিলের প্রতিবেদন (সংশোধিত)`],
              style: [setSubSetHeading],
              margin: [0, -2, 0, 0],
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
              text:`${month}/${year} ইং পর্যন্ত`,
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

  table1Prn = 0;
  table1Lps = 0;
  table1TotalArrear = 0;
  private getLocatoinWiseNonBengaliTable1Report(data: any,reportObj: any) {
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
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [25, 80, 80, 20, 'auto', '*', 50, 'auto', 'auto'],
        body: [
          [
            {
              text: `টেবিল-১ঃ আদেশের পূর্বের বকেয়ার তথাদি (মার্চ'২০১৬ ইং পর্যন্ত):`,
              style: ['setBlack', 'setLeft'],
              border: [false, false, false, false],
              colSpan: 7,
              margin: [-5, 0, 0, 0]
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {
              text: `(কোটি টাকায়)`,
              style: ['setBlack'],
              border: [false, false, false, false],
              colSpan: 2,
            },
            {},
          ],
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center'
            },
            {
              text: 'সংস্থা/কোম্পানির নাম',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
              colSpan: 4,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: 'মূল বকেয়া(ভ্যাটসহ)',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'সারচার্জ',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মোট বকেয়ার পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মন্তব্য',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            }
          ],
          [
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'অবাঙ্গালী ক্যাম্পের নাম',
              style: ['setBlack'],
              border: [true, true, true, true],

            },
            {
              text: 'তথ্য উপাত্ত কেন্দ্র',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 2,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: []
            },
            {
              text: 'মিটার সংখ্যা',
              style: ['setBlack',],
              border: [true, true, true, true],
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            }
          ]
        ],
      },
    };

    let serial = 0;
    let subTotalPrn = 0;
    let subTotalLps = 0;
    let subTotalArrear = 0;
    let meterTotal = 0;
    let locCodeValue = " ";
   
    //const uniqueIsStatic = [...new Set(data.map(item => item.isStatic))]
    // console.log(uniqueIsStatic);
    // var isStaticFirst = uniqueIsStatic[1];
    // console.log(isStaticFirst);
    
    
    // uniqueIsStatic.forEach((static) =>{
      
    // });
    const unique = [...new Set(data.nonbengliDetailsStaticDataList.map(item => item.locationCode))];
      unique.forEach((item: any) =>{


        console.log("What is : ", item);
      serial++;
      let providerNo =0;
      let nonBengaliDist = data.nonbengliDetailsStaticDataList.filter(x=> x.locationCode == item );
      console.log("nonBengaliDist",nonBengaliDist);
      const meterSumTotal = nonBengaliDist.reduce((acc, o) => acc + parseInt(o.meterCount), 0);
      meterTotal+= meterSumTotal;
      let locationGroupByLength=nonBengaliDist.length;
      let providerInsert=Math.ceil(Number(locationGroupByLength/2));
      if(locationGroupByLength > 0){
        nonBengaliDist.forEach(element => {
          if(element.isStatic == '1'){
          //let {nameBn, locationCode, locationNameBn, meterCount, prn, lps, totalArrear, isStatic}= element;
          providerNo+=1;
          subTotalPrn += element.prn;
          subTotalLps += element.lps;
          subTotalArrear += element.totalArrear;
          this.table1Prn = element.prn ;
          this.table1Lps = element.lps;
          this.table1TotalArrear = element.totalArrear;
          console.log("Principal : ", this.table1Prn);
          //if(element.isStatic == '1'){
          phases.table.body.push(
            [ 
              {
              border: locCodeValue != element.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] ,
              text: `${providerNo==providerInsert ? this.translateNumber(serial,2): ''}`,
              style: [],
              },
              {
                border: [true, true, true, true],
                text: `${element.nonBengaliNameBn}`,
                style: [ ],
                alignment: 'center',
              },
              {
                border: locCodeValue != element.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] , 
                text: `${providerNo==providerInsert ? element.locationName  ? element.locationName : '': ''}`,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: `${locationGroupByLength > 1 ? this.translateNumber(element.meterCount,2): ''}`,
                style: [],
              },
              {
                border: locCodeValue != element.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false],
                text: ` ${providerNo==providerInsert ? this.translateNumber(meterSumTotal,2) : ' '}`,
                style: [],
                alignment: 'right',
              },
              {
                 text:  this.translateNumber(element.prn) ?? 0.00,
                //text:  this.translateNumber(element.prn) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(element.lps / 10000000).toFixed(2)) ?? 0.00,
                text: this.translateNumber(element.lps) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(element.totalArrear / 10000000).toFixed(2)) ?? 0.00,
                text: this.translateNumber(element.totalArrear) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              }
            ],
          );
          }
          locCodeValue = element.locationCode;
        });
        if(locationGroupByLength > 1){
          phases.table.body.push(
           
            [ 
              {
              border: [true, true, true, true],
              text: ``,
              style: [],
              },
              {
                border: [true, true, true, true],
                text: `মোট`,
                style: [],
                colSpan: 3
              },
              {
                
                border:[true, true, true, true] , 
                text: ``,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: ``,
                style: [],
              },
              {
                border:[true, true, true, true] ,
                text: ``,
                style: [],
              },
              {
                 //text:  `${subTotalPrn}`,
                text:  this.translateNumber(subTotalPrn) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(subTotalLps / 10000000).toFixed(2)) ?? 0.00,
                text: this.translateNumber(subTotalLps) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(subTotalArrear / 10000000).toFixed(2)) ?? 0.00,
                text: this.translateNumber(subTotalArrear) ?? 0.00,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: []
              }
            ],
          );
        }
    }
    });

    phases.table.body.push(
           
      [ {
        border: [true, true, true, true],
        text: `মোট`,
        style: [],
        colSpan: 4
      },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          
          border:[true, true, true, true] , 
          text: ``,
          style: [],
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          border:[true, true, true, true] ,
          text: ` ${ this.translateNumber(meterTotal,0)}`,
          style: [],
          alignment: 'right',
        },
        {
          //text:  this.translateNumber(Number(subTotalPrn / 10000000).toFixed(2)) ?? 0.00,
          text:  this.translateNumber(subTotalPrn) ?? 0.00,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          //text: this.translateNumber(Number(subTotalLps / 10000000).toFixed(2)) ?? 0.00,
          text: this.translateNumber(subTotalLps) ?? 0.00,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          //text: this.translateNumber(Number(subTotalArrear / 10000000).toFixed(2)) ?? 0.00,
          text: this.translateNumber(subTotalArrear) ?? 0.00,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          text: '',
          border: [true, true, true, true,],
          style: []
        }
      ],
    );
   
    return phases;
  }

  table2Prn = 0;
  table2Lps = 0;
  table2TotalArrear = 0;
  private getLocationWiseNonBengaliTable2Report(data: any,  validDate: any){
    //let {billCycleCode} = data[0];
    // let billCycleCode = '202301';
    var valuedate = validDate.substring(0, 4) + '/' + validDate.substr(validDate.length - 2) + '/01';
    let year = this.translateNumber(dayjs(valuedate).format("YYYY"), 2);
    let month: string;
    switch (dayjs(valuedate).format("M")) {
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
      margin: [0, 10, 0, 0],
      table: {
      //margin: [0, 20, 0, 0],
      widths: [25, 80, 80, 20, 'auto', '*', 50, 'auto', 'auto'],
      body: [
          [
            {
              text:`টেবিল-২ঃ আদেশের পূর্বের বকেয়ার হালনাগাদ তথাদি ( এপ্রিল'২০১৬ ইং হতে ${month} ${year} ইং পর্যন্ত):`,
              style: ['setBlack', 'setLeft'],
              border: [false, false, false, false],
              colSpan: 7,
              margin: [-5, 0, 0, 0]
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {
              text: `(কোটি টাকায়)`,
              style: ['setBlack'],
              border: [false, false, false, false],
              colSpan: 2,
            },
            {},
          ],
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center'
            },
            {
              text: 'সংস্থা/কোম্পানির নাম',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
              colSpan: 4,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: 'মূল বকেয়া(ভ্যাটসহ)',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'সারচার্জ',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মোট বকেয়ার পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মন্তব্য',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            }
          ],
          [
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'অবাঙ্গালী ক্যাম্পের নাম',
              style: ['setBlack'],
              border: [true, true, true, true],

            },
            {
              text: 'তথ্য উপাত্ত কেন্দ্র',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 2,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: []
            },
            {
              text: 'মিটার সংখ্যা',
              style: ['setBlack',],
              border: [true, true, true, true],
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            }
          ]
        ],
      },
    };

    let serial = 0;
    let subTotalPrn2 = 0;
    let subTotalLps2 = 0;
    let subTotalAmount2 = 0;
    let meterTotal = 0;
    let locCodeValue = " ";
   
    const unique = [...new Set(data.nonbengliDetailsDynamicDataList.map(item => item.locationCode))];
      unique.forEach((item: any) =>{
      serial++;
      let providerNo =0;
      let nonBengaliDist = data.nonbengliDetailsDynamicDataList.filter(x=> x.locationCode == item);
      const meterSumTotal = nonBengaliDist.reduce((acc, o) => acc + parseInt(o.meterCount), 0);
      meterTotal+= meterSumTotal;
      let locationGroupByLength=nonBengaliDist.length;
      let providerInsert=Math.ceil(Number(locationGroupByLength/2));
      if(locationGroupByLength > 0){
        nonBengaliDist.forEach(value => {
          //let {nameBn, locationCode, locationNameBn, meterCount, prn, lps, totalArrear}= element;
          providerNo+=1;
          subTotalPrn2 += value.prn;
          subTotalLps2 += value.lps;
          subTotalAmount2 += value.totalAmount;
          this.table2Prn = value.prn ;
          
          this.table2Lps = value.lps;
          this.table2TotalArrear = value.totalArrear;
          phases.table.body.push(
           
            [ {
              border: locCodeValue != value.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] ,
              text: `${providerNo==providerInsert ? this.translateNumber(serial,2): ''}`,
              style: [],
            },
              {
                border: [true, true, true, true],
                text: `${value.nonBengaliNameBn}`,
                style: [ ],
                alignment: 'center',
                
              },
              {
                
                border: locCodeValue != value.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] , 
                text: `${providerNo==providerInsert ? value.locationNameBn  ? value.locationNameBn : '': ''}`,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: `${locationGroupByLength > 1 ? this.translateNumber(value.meterCount,2): ''}`,
                style: [],
              },
              {
                border: locCodeValue != value.locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false],
                text: ` ${providerNo==providerInsert ? this.translateNumber(meterSumTotal,2) : ' '}`,
                style: [],
                alignment: 'right',
              },
              {
                 text:  this.translateNumber(Number(value.prn / 10000000).toFixed(2)) ?? 0.00,
                //text:  `${this.translateNumber(value.prn)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 text: this.translateNumber(Number(value.lps / 10000000).toFixed(2)) ?? 0.00,
                //text: `${this.translateNumber(value.lps)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 text: this.translateNumber(Number(value.totalAmount / 10000000).toFixed(2)) ?? 0.00,
                //text:  `${this.translateNumber(value.totalArrear)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              }
            ],
          );
          locCodeValue = value.locationCode;
        });
        if(locationGroupByLength > 1){
          phases.table.body.push(
           
            [ {
              border: [true, true, true, true],
              text: ``,
              style: [],
            },
              {
                border: [true, true, true, true],
                text: `মোট`,
                style: [],
                colSpan: 3
              },
              {
                
                border:[true, true, true, true] , 
                text: ``,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: ``,
                style: [],
              },
              {
                border:[true, true, true, true] ,
                text: ``,
                style: [],
              },
              {
                 text:  this.translateNumber(Number(subTotalPrn2 / 10000000).toFixed(2)) ?? 0.00,
                //text:  `${this.translateNumber(subTotalPrn2)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: this.translateNumber(Number(subTotalLps2 / 10000000).toFixed(2)) ?? 0.00,
                //text: `${this.translateNumber(subTotalLps2)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: this.translateNumber(Number(subTotalAmount2 / 10000000).toFixed(2)) ?? 0.00,
                //text: `${this.translateNumber(subTotalArrear2)}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: []
              }
            ],
          );
        }
      }
    });

    phases.table.body.push(
           
      [ {
        border: [true, true, true, true],
        text: `মোট`,
        style: [],
        colSpan: 4
      },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          
          border:[true, true, true, true] , 
          text: ``,
          style: [],
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          border:[true, true, true, true] ,
          text: ` ${ this.translateNumber(meterTotal,0)}`,
          style: [],
          alignment: 'right',
        },
        {
          text:  this.translateNumber(Number(subTotalPrn2 / 10000000).toFixed(2)) ?? 0.00,
          ///text:  `${this.translateNumber(subTotalPrn2)}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          text: this.translateNumber(Number(subTotalLps2 / 10000000).toFixed(2)) ?? 0.00,
          //text: `${this.translateNumber(subTotalLps2)}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          text: this.translateNumber(Number(subTotalAmount2 / 10000000).toFixed(2)) ?? 0.00,
          //text: `${this.translateNumber(subTotalArrear2)}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          text: '',
          border: [true, true, true, true,],
          style: []
        }
      ],
    );
    return phases;
  }

  table3Prn = 0;
  able3Lps = 0;
  table3TotalArrear = 0;
  private getLocationWiseNonBengaliTable3Report(data: any,  validDate:any){
    //let {billCycleCode} = data[0];
    // let billCycleCode = '202301';
    var valuedate = validDate.substring(0, 4) + '/' + validDate.substr(validDate.length - 2) + '/01';
    let year = this.translateNumber(dayjs(valuedate).format("YYYY"), 2);
    let month: string;
    switch (dayjs(valuedate).format("M")) {
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
      margin: [0, 10, 0, 0],
      table: {
      //margin: [0, 20, 0, 0],
      widths: [25, 80, 80, 20, 'auto', '*', 50, 'auto', 'auto'],
      body: [
          [
            {
              text: `টেবিল-৩ (টেবিল-১+২): আদেশের পূর্বে ও আদেশের পর হতে বিউবো'র আওতাধীন বিভিন্ন অবাঙ্গালী ক্যাম্প সমূহের বকেয়ার হালনাগাদ তথাদি (${month} ${year} ইং পর্যন্ত): `,
              style: ['setBlack', 'setLeft'],
              border: [false, false, false, false],
              colSpan: 7,
              margin: [-5, 0, 0, 0]
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {
              text: `(কোটি টাকায়)`,
              style: ['setBlack'],
              border: [false, false, false, false],
              colSpan: 2,
            },
            {},
          ],
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center'
            },
            {
              text: 'সংস্থা/কোম্পানির নাম',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
              colSpan: 4,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack'],
              alignment: 'center',
            },
            {
              text: 'মূল বকেয়া(ভ্যাটসহ)',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'সারচার্জ',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মোট বকেয়ার পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'মন্তব্য',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            }
          ],
          [
            {
              text: '',
              style: ['setBlack'],
              border: [true, true, true, true],
              alignment: 'center',
            },
            {
              text: 'অবাঙ্গালী ক্যাম্পের নাম',
              style: ['setBlack'],
              border: [true, true, true, true],

            },
            {
              text: 'তথ্য উপাত্ত কেন্দ্র',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 2,
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: []
            },
            {
              text: 'মিটার সংখ্যা',
              style: ['setBlack',],
              border: [true, true, true, true],
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            },
            {
              text: '',
              border: [true, true, true, true,],
              style: ['setBlack']
            }
          ]
        ],
      },
    };

    let serial = 0;
    let subTotalPrn3 = 0;
    let subTotalLps3 = 0;
    let subTotalAmount3 = 0;
    let meterTotal = 0;
    let locCodeValue = " ";
    let table3Prn = 0;
   
    const unique = [...new Set((data.nonbengliDetailsStaticDataList && data.nonbengliDetailsDynamicDataList).map(item => item.locationCode))];
      unique.forEach((item: any) =>{
      serial++;
      let providerNo =0;
      let nonBengaliDist = data.nonbengliDetailsDynamicDataList.filter(x=> x.locationCode == item);
      let nonBengaliStaticData = data.nonbengliDetailsStaticDataList.filter(x=> x.locationCode == item);
      const meterSumTotal = nonBengaliDist.reduce((acc, o) => acc + parseInt(o.meterCount), 0);
      meterTotal+= meterSumTotal;
      let locationGroupByLength=nonBengaliDist.length;
      let providerInsert=Math.ceil(Number(locationGroupByLength/2));
      if(locationGroupByLength > 0){
        //let i = 0;
        for(let i = 0; i < nonBengaliDist.length; i++){
          providerNo+=1;
          subTotalPrn3 += (nonBengaliDist[i].prn / 10000000)+ nonBengaliStaticData[i].prn;
          subTotalLps3 += (nonBengaliDist[i].lps / 10000000)+ nonBengaliStaticData[i].lps;
          subTotalAmount3 += (nonBengaliDist[i].totalAmount / 10000000) +  nonBengaliStaticData[i].totalArrear;
          //table3Prn = this.table1Prn + this.table2Prn;
          //console.log(table3Prn);
          
          phases.table.body.push(
           
            [ {
              border: locCodeValue != nonBengaliDist[i].locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] ,
              text: `${providerNo==providerInsert ? this.translateNumber(serial,2): ''}`,
              style: [],
            },
              {
                border: [true, true, true, true],
                text: `${nonBengaliDist[i].nonBengaliNameBn}`,
                style: [ ],
                alignment: 'center',
                
              },
              {
                
                border: locCodeValue != nonBengaliDist[i].locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false] , 
                text: `${providerNo==providerInsert ? nonBengaliDist[i].locationNameBn  ? nonBengaliDist[i].locationNameBn : '': ''}`,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: `${locationGroupByLength > 1 ? this.translateNumber(nonBengaliDist[i].meterCount,2): ''}`,
                style: [],
              },
              {
                border: locCodeValue != nonBengaliDist[i].locationCode  ? locCodeValue == " " ? [true, true, true, false] : [true, true, true, true] : [true, false, true, false],
                text: ` ${providerNo==providerInsert ? this.translateNumber(meterSumTotal,2) : ' '}`,
                style: [],
                alignment: 'right',
              },
              {
                 //text:  this.translateNumber(Number((nonBengaliDist[i].prn / 10000000+ nonBengaliStaticData[i].prn)).toFixed(2)) ?? 0.00,
                text:  `${this.translateNumber(Number(nonBengaliDist[i].prn / 10000000+ nonBengaliStaticData[i].prn).toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number((nonBengaliDist[i].lps / 10000000 + nonBengaliStaticData[i].lps)).toFixed(2)) ?? 0.00,
                text: `${this.translateNumber(Number(nonBengaliDist[i].lps / 10000000+ nonBengaliStaticData[i].lps).toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                //text: this.translateNumber(Number((nonBengaliDist[i].totalArrear +  nonBengaliStaticData[i].totalArrear) / 10000000).toFixed(2)) ?? 0.00,
                text:  `${this.translateNumber(Number(nonBengaliDist[i].totalAmount / 10000000 +  nonBengaliStaticData[i].totalArrear).toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              }
            ],
          );
          locCodeValue = nonBengaliDist[i].locationCode;
        }
       
        if(locationGroupByLength > 1){
          phases.table.body.push(
           
            [ {
              border: [true, true, true, true],
              text: ``,
              style: [],
            },
              {
                border: [true, true, true, true],
                text: `মোট`,
                style: [],
                colSpan: 3
              },
              {
                
                border:[true, true, true, true] , 
                text: ``,
                style: [],
              },
              {
                border: [true, true, true, true],
                text: ``,
                style: [],
              },
              {
                border:[true, true, true, true] ,
                text: ``,
                style: [],
              },
              {
                 //text:  this.translateNumber(Number(subTotalPrn / 10000000).toFixed(2)) ?? 0.00,
                text:  `${this.translateNumber(subTotalPrn3.toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(subTotalLps / 10000000).toFixed(2)) ?? 0.00,
                text: `${this.translateNumber(subTotalLps3.toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                 //text: this.translateNumber(Number(subTotalArrear / 10000000).toFixed(2)) ?? 0.00,
                text: `${this.translateNumber(subTotalAmount3.toFixed(2))}`,
                border: [true, true, true, true,],
                style: [],
                alignment: 'right',
              },
              {
                text: '',
                border: [true, true, true, true,],
                style: []
              }
            ],
          );
        }
      }
    });

    phases.table.body.push(
           
      [ {
        border: [true, true, true, true],
        text: `মোট`,
        style: [],
        colSpan: 4
      },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          
          border:[true, true, true, true] , 
          text: ``,
          style: [],
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [],
        },
        {
          border:[true, true, true, true] ,
          text: ` ${ this.translateNumber(meterTotal,0)}`,
          style: [],
          alignment: 'right',
        },
        {
          //text:  this.translateNumber((subTotalPrn / 10000000).toFixed(2)) ?? 0.00,
          text:  `${this.translateNumber(subTotalPrn3.toFixed(2))}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          //text: this.translateNumber((subTotalLps / 10000000).toFixed(2)) ?? 0.00,
          text: `${this.translateNumber(subTotalLps3.toFixed(2))}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          //text: this.translateNumber((subTotalArrear / 10000000).toFixed(2)) ?? 0.00,
          text: `${this.translateNumber(subTotalAmount3.toFixed(2))}`,
          border: [true, true, true, true,],
          style: [],
          alignment: 'right',
        },
        {
          text: '',
          border: [true, true, true, true,],
          style: []
        }
      ],
    );
    return phases;
  }
}
