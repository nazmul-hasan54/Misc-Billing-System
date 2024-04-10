import { Injectable } from '@angular/core';
import { setFooterLeft, setFourthHeading, setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setPouroshovaStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
import dayjs from 'dayjs';
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
(<any> pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PourCorporArrearYearlyService {
  defaultColor = '#000000';

  constructor() { } 

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
  generatePdf(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
     //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(
      data,
      reportObj, zoneData, cityCorporationData
    );
     //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
    return {
      info: {
        title: 'City Corporation Report',
        author: 'BPDB',
        subject: 'City Corporation Report',
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

      header: this.getMunicipalZoneSummaryHeading(reportObj),
      background: function (currentPage, pageSize) {
        return [
          {
            //   canvas: [
            //     // { type: 'line', x1: 5, y1: 5, x2: 590, y2: 5, lineWidth: 1 }, //Up line
            //     // { type: 'line', x1: 5, y1: 5, x2: 5, y2: 835, lineWidth: 1 }, //Left line
            //     { type: 'line', x1: 5, y1: 807.5, x2: 500, y2: 807.5, lineWidth: 1 }, //Bottom line
            //     // { type: 'line', x1: 590, y1: 5, x2: 590, y2: 835, lineWidth: 1 }, //Rigth line
            //   ],
            svg: `<svg height="820" width="500">
              <line x1="11" y1="809.2" x2="81" y2="809.2" style="stroke:#111;stroke-width:1" />
            </svg>`

          }
        ]
      },
      content: [
        this.getMunicipalZoneSummaryReport(data, reportObj, zoneData, cityCorporationData)

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
  private getMunicipalZoneSummaryHeading(reportObj: any) {
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
              margin: [-10, 0, 0, 0],
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
              text: [` সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক`],
              style: [setSubSetHeading],
              margin: [0, -2, 0, 0],
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
              text: [
                {
                  text:
                    `${month}/${year} ইং পর্যন্ত`
                },
              ],
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
          [
            { 
              text: 'বিতরণ জোনঃ  ',
              style: [setFourthHeading],
              colSpan: 4,
              margin: [-275, 0, 0, 0],
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


  private getMunicipalZoneSummaryReport(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {

    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 2,
        widths: [20, 135, 95, 120, 120],
        body: [
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
            },
            {
              text: 'সংস্থার নাম',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 1,
              alignment: 'center'
            },
            {
              text: 'হালনাগাদ বকেয়ার পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'চলতি অর্থ বছরের আদায়ের পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'অনাদায়ে সংযোগ বিচ্ছিন্নের তথ্য',
              style: ['setBlack'],
              border: [false, true, true, true],
              rowSpan: 2,
            }
          ],
          [
            {},
            {
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ ',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'টাকা',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'টাকা',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {}
          ],
          [
            {
              text: 'ক্রঃ নং',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 2,
            },
            {
              text: 'সংস্থার নাম',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 1,
              alignment: 'center'
            },
            {
              text: 'হালনাগাদ বকেয়ার পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'চলতি অর্থ বছরের আদায়ের পরিমান',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'অনাদায়ে সংযোগ বিচ্ছিন্নের তথ্য',
              style: ['setBlack'],
              border: [false, true, true, true],
              rowSpan: 2,
            }
          ],
          [
            {},
            {
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ ',
              style: ['setBlack'],
              border: [false, true, true, true],
            },
            {
              text: 'টাকা',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: 'টাকা',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {}
          ],
          [
            {
              text: 'সর্বমোট = ',
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 2,
            },
            {},
            {
              text: '০.০০',
              style: ['setBlack'],
              border: [true, true, true, true]
            },
            {
              text: '০.০০',
              style: ['setBlack'],
              border: [true, true, true, true]
            },
            {},
          ],
        ],
      },
    };
    return phases;
  }
}
