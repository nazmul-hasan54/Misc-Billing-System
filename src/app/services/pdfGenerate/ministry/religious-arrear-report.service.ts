import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { MinistrySummaryModel } from '../../../model/ministry.summary.model';
import { misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistryArrearStyle, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts, setSubSetHeading } from '../config/pdfMakeConfig';
import { ReligiousArrearData } from '../../../model/religious-arrear-data.model';
import { ReligiousArrearSummary } from '../../../model/religious/religious-arrear-summary.model';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ReligiousArrearReportService {
  defaultColor= "#0c0d0d"
  private year: any;
  private month: any;

  constructor() { }

  generatePdf(data:ReligiousArrearSummary[], reportObject?:any) {
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
        title: 'Religious Arrear Summary',
        author: 'BPDB',
        subject: 'Religious Arrear Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',
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
      header: this.getHeading(data),
      content: [
        this.getReligiusArrearInfo(data)
      ],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      pageMargins: [30, 125, 30, 30],
      // pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
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

  private getHeading(reportObj: any,){
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
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-170, 5, 0, 0],
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
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
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
              text: 'তালিকাভুক্ত মসজিদ ও অন্যান্য ধর্মীয় উপসনালয়ের',
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
              text: `বকেয়ার বিবরণী`,
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
              text: `পূঞ্জিভূত বকেয়ার তথ্যঃ`,
              style: ['setLeft', setSubSetHeading],
              margin: [-70, 0, 0, 0],
              colSpan: 8,
              bold: false
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

  private getReligiusArrearInfo(data: ReligiousArrearSummary[]) {
    

    const phases = {
      table: {
        headerRows: 1,
        widths: [40, 40, 45, 'auto', 35, 47, 47, 47, 47, 55,65,'*'],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'অর্থ বছর ওয়ারি বকেয়া',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 12,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, true, true, true],
              text: 'অর্থ বছর',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'তালিকাভুক্ত প্রতিষ্ঠানের সংখ্যা',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'রেয়াতপ্রাপ্ত ইউনিট (প্রতি মাসে)',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'প্রতি ইউনিটের মূল্য',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'বকেয়া মাসের সংখ্যা',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'দাবির পরিমান অর্থ বছর ওয়ারি (টাকা)',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 5,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'মোট দাবীর পরিমান (টাকা)',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'মন্তব্য',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:2,
              alignment: "center",
              margin: [0, 10, 0, 0],
            },
            
          ],
          [
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'মূল টাকা',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'সার্ভিস চার্জ',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'ডিমান্ড চার্জ',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'ভ্যাট',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: 'মোট বকেয়া',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    let totalAmount=0;
    const totalAmoun = data.reduce((acc, o) => acc + o.totalArrear, 0);
    let providerInsert2=Math.ceil(Number(data.length/3.5));
    
    let year=data;
    let financialYear=data;
    let uniquefinancialYear = [...new Set(year.map(item => item.financialYear))];

    uniquefinancialYear.forEach((year)=>{
      let financialYearGroupByYear = financialYear.filter(x => x.financialYear == year);
      let financialYearGroupByYearLength = financialYearGroupByYear.length;
      let providerInsert = Math.ceil(Number(financialYearGroupByYearLength / 1.5));


      if(financialYearGroupByYearLength>0){
          let providerNo = 0;
          financialYearGroupByYear.forEach(item => {
              providerNo++;
              let{financialYear,consumerCount,rebaitUnit,tariffRate,countMonth,principal,serviceCharge,demandCharge,vatAmount,totalArrear,note}=item;
            totalAmount +=totalArrear;
            
            
            const setMonth = item.note;
            const { startMonth, startYear, endMonth, endYear } = this.extractMonthAndYear(setMonth);
              let sMonth = dayjs(startMonth).format('M');
              let sYear = this.translateNumber(dayjs(startYear).format('YY'),2);
              let eMonth = dayjs(endMonth).format('M');
              let eYear = this.translateNumber(dayjs(endYear).format('YY'),2);
              let month: string;
              switch (dayjs(startMonth).format("M")) {
                case "1": {
                  sMonth = "জানুয়ারি"
                  break
                }
                case "2": {
                  sMonth = "ফেব্রুয়ারী"
                  break
                }
                case "3": {
                  sMonth = "মার্চ"
                  break
                }
                case "4": {
                  sMonth = "এপ্রিল"
                  break
                }
                case "5": {
                  sMonth = "মে"
                  break
                }
                case "6": {
                  sMonth = "জুন"
                  break
                }
                case "7": {
                  sMonth = "জুলাই"
                  break
                }
                case "8": {
                  sMonth = "আগষ্ট"
                  break
                }
                case "9": {
                  sMonth = "সেপ্টেম্বর"
                  break
                }
                case "10": {
                  sMonth = "অক্টোবর"
                  break
                }
                case "11": {
                  sMonth = "নভেম্বর"
                  break
                }
                case "12":{
                  sMonth = "ডিসেম্বর"
                    break
                  }
              }

              switch (dayjs(endMonth).format("M")) {
                case "1": {
                  eMonth = "জানুয়ারি"
                  break
                }
                case "2": {
                  eMonth = "ফেব্রুয়ারী"
                  break
                }
                case "3": {
                  eMonth = "মার্চ"
                  break
                }
                case "4": {
                  eMonth = "এপ্রিল"
                  break
                }
                case "5": {
                  eMonth = "মে"
                  break
                }
                case "6": {
                  eMonth = "জুন"
                  break
                }
                case "7": {
                  eMonth = "জুলাই"
                  break
                }
                case "8": {
                  eMonth = "আগষ্ট"
                  break
                }
                case "9": {
                  eMonth = "সেপ্টেম্বর"
                  break
                }
                case "10": {
                  eMonth = "অক্টোবর"
                  break
                }
                case "11": {
                  eMonth = "নভেম্বর"
                  break
                }
                case "12":{
                  eMonth = "ডিসেম্বর"
                    break
                  }
              }
              phases.table.body.push(
                [
                  {
                    border: providerInsert == 1 || providerNo == financialYearGroupByYearLength ? [true, false, true, true] : [true, false, true, false],
                    text: `${providerNo == providerInsert ? this.translateNumber(financialYear, 2) : "" }`,
                    // text: `${this.translateNumber(providerNo == providerInsert ? financialYear:'')}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(consumerCount, 2)}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(rebaitUnit, 2)}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(tariffRate, 2)}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(countMonth, 2)}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(Number(principal).toFixed(2))}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(Number(serviceCharge).toFixed(2))}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(Number(demandCharge).toFixed(2))}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(Number(vatAmount).toFixed(2))}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${this.translateNumber(Number(totalArrear).toFixed(2))}`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, false, true, false],
                    text: `${providerNo==providerInsert2 ? this.translateNumber(Number(totalAmoun).toFixed(2)): ''}`,
                    // text: ``,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    margin: [0, -13, 0, 0],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "right",
                  },
                  {
                    border: [true, true, true, true],
                    text: `${sMonth} ${sYear} - ${eMonth} ${eYear} পর্যন্ত পাওনা`,
                    // text: `${note} পর্যন্ত পাওনা`,
                    style: [
                      setAgricultureAndPoultryStyles.setCenter,
                      setAgricultureAndPoultryStyles.setFontBangla,
                    ],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: "center",
                  },
                  
                ],
              );
          })
      }
    })
    
    
    //  সর্বমোট
   phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: 'সর্বমোট',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
          ],
          colSpan: 10,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(Number(totalAmount).toFixed(2))}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
      ],
    );
    //Empty
    phases.table.body.push(
      [
        {
          border: [false, false, false, false],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 12,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
      ],
    )
    phases.table.body.push(
      [
        {
          border: [false, false, false, false],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 12,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
      ],
    )
    phases.table.body.push(
      [
        {
          border: [false, false, false, false],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 12,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
      ],
    )


    //মোট বকেয়ার পরিমানঃ
    phases.table.body.push(
      [
        {
          border: [false, false, false, false],
          text: 'মোট বকেয়ার পরিমানঃ ',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setBold,
          ],
          colSpan: 2,
          rowSpan:1,
          alignment: "right",
        },
        {
          border: [false, false, false, false],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: 'টাকা',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "left",
        },
        {
          border: [false, false, false, false],
          text: `${this.translateNumber(Number(totalAmount).toFixed(2))}/=`,
          // text: `${totalAmount.toFixed(2)}/=`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
          ],
          colSpan: 2,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [false, false, false, false],
          text: `(${toBengaliWord((totalAmount.toFixed(2)))} টাকা মাত্র)`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
          ],
          colSpan: 7,
          rowSpan:1,
          alignment: "left",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan:1,
          alignment: "center",
        },
      ],
    )
    return phases;
  }

  private extractMonthAndYear(billCycleCode: string): { startMonth: string, startYear: string, endMonth: string, endYear: string } {
    const parts = billCycleCode.split('-');
    const startMonth = parts[0].substring(4);
    const startYear = parts[0].substring(0, 4);
    const endMonth = parts[1].substring(4);
    const endYear = parts[1].substring(0, 4);
  
    return { startMonth, startYear, endMonth, endYear };
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
