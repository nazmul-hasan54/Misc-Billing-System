import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { environment } from '../../../../environments/environment';
import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle } from '../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class CitycorPouroshovaUnionArrearService {
  defaultColor = "#0c0d0d"
  constructor(private http: HttpClient) { }

  getAgricultureCustomer(validDate: string) {
    return this.http.get<any>(
      `${environment.apiUrl}get-agriculture-by-date?validDate=` + validDate
    );
  }

  generatePdf(data: any, reportObject: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, reportObject);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, reportObject: any) {
    return {
      info: {
        title: 'City Corporation & Pouroshova',
        author: 'BPDB',
        subject: 'Ministry',
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
      content: [this.getHeading(reportObject), this.getAgriCultureCustomerInfo(data),],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      pageMargins: [20, 40, 20, 20],
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
    let dateBn = this.translateNumber(dayjs(billMonth).format('DD-MM-YY'), 2);
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
    return {
      table: {
        margin: [0, 20, 0, 0],
        widths: [50, 50, '*', '*', 60, 40],
        body: [

          [
            {
              border: [false, false, false, false],
              text: ''
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              border: [false, false, false, false],
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক',
              colSpan: 2,
              bold: true,
              style: [setAgricultureAndPoultryStyles.setFontBangla,],
              margin: [0, -5, 0, 0],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };
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

  private getAgriCultureCustomerInfo(data: any) {
    const { TotalDues } = data;
    const phases = {
      table: {
        headerRows: 1,
        widths: [30, 60, 160,70, 50,55, 50],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'ক্রঃ নং',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 2,
            },
            {
              border: [true, true, true, true],
              text: 'দপ্তরের নাম',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 2,
            },
            {
              border: [true, true, true, true],
              style: ['setMiddle', setAgricultureAndPoultryStyles.setBlack, setAgricultureAndPoultryStyles.setFontBangla],
              text: 'সংস্থার নাম',
              rowSpan: 1,
              colSpan: 1,
              alginment: 'center'
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: 'হালনাগাদ বকেয়ার পরিমান',
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'চলতি অর্থ বছরের আদায়ের পরিমান',
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'অনাদায়ে সংযোগ বিচ্ছিন্নের তথ্য',
              rowSpan: 2,
              colSpan: 1
            },
            {
              text: 'মন্তব্য',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              rowSpan: 2,
              colSpan: 1
            },
          ],
          [
            {
              text: '',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              rowSpan: 1,
              colSpan: 1
            },
            {
              text: '',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              rowSpan: 1,
              colSpan: 1
            },
            {
              border: [false, true, true, true],
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ ',
              style: ['setMiddle', 'setBlack', setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla],
            },
            {
              text: 'টাকা',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              rowSpan: 1,
              colSpan: 1
            },
            {
              text: 'টাকা',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              rowSpan: 1,
              colSpan: 1
            },
            {},
            {}
          ]
        ],
      },
      layout: this.setTableBorder(),
    };



    // KrishiCustomers
    // KrishiLocations
    let KrishiLocations = data;
    let KrishiCustomers = data;
    let totalDues = 0;
    let serial = 0;
    let custSerial = 0;
    let uniqueKrishiLocations = [...new Set(KrishiLocations.map(item => item.locationCode))];


    uniqueKrishiLocations.forEach((location) => {
      let customerGroupByLocation = KrishiCustomers.filter(x => x.locationCode == location);
      let customerGroupByLocationLength = customerGroupByLocation.length;
      let providerInsert = Math.ceil(Number(customerGroupByLocationLength / 2));

      if (customerGroupByLocationLength > 0)
      {
        let providerNo = 0;

        serial++;
        customerGroupByLocation.forEach(cust => {
          let { customerNo, customerNameBn, deptNameBn, locationCode, locationDescBn, isKrishi, conExtgNum, arrearAmt } = cust;
          let providerName = `${locationDescBn} (${locationCode})`;
          custSerial++;
          providerNo += 1;
          totalDues += arrearAmt;
          arrearAmt = arrearAmt ? this.translateNumber(arrearAmt) : this.translateNumber(0.00);


          phases.table.body.push(
            [
              {
                border: providerInsert == 1 || providerNo == customerGroupByLocationLength ? [true, false, true, true] : [true, false, true, false],
                text: ``,
                //text: `${providerNo == providerInsert ? this.translateNumber(serial, 2) : ""}`,
                style: [setAgricultureAndPoultryStyles.setFontBangla,],
                colSpan: 1,
                rowSpan: 1
              },
              {

                border: [true, true, true, true],
                style: [
                  setAgricultureAndPoultryStyles.setBlack,
                  setAgricultureAndPoultryStyles.setFontBangla,
                ],
                text: ``,
                //text: `${customerNameBn ? customerNameBn : ""}`,
              },
              {
                border: providerInsert == 1 || providerNo == customerGroupByLocationLength ? [true, false, true, true] : [true, false, true, false],
                style: [
                  setAgricultureAndPoultryStyles.setBlack,
                  setAgricultureAndPoultryStyles.setFontBangla,
                ],
                text: ``,
                //text: `${providerNo == providerInsert ? providerName : ""}`,
              },
              {

                border: [true, true, true, true],
                style: [
                  setAgricultureAndPoultryStyles.setBlack,
                  setAgricultureAndPoultryStyles.setFontBangla,
                ],
                text: ``,
                //text: `${customerNameBn ? customerNameBn : ""}`,
              },
              {
                border: [true, true, true, true],
                style: [setAgricultureAndPoultryStyles.setFontBangla],
                text: ``,
                //text: `${deptNameBn}`,
              },

              {
                border: [true, true, true, true],
                style: [setAgricultureAndPoultryStyles.setFontBangla],
                text: ``,
              //text: `${isKrishi == 1 ? 'কৃষিভিত্তিক শিল্প' : ''}`,
              },
              {
                border: providerInsert == 1 || providerNo == customerGroupByLocationLength ? [true, false, true, true] : [true, false, true, false],
                style: [
                  setAgricultureAndPoultryStyles.setBlack,
                  setAgricultureAndPoultryStyles.setFontBangla,
                ],
                //text: ``,
                text: ``,
              }
            ]
          )
        });


        phases.table.body.push(
          [
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: '',
              rowSpan: 1,
              colSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'মোট=',
              rowSpan: 1,
              colSpan: 2
            },
            {
              text: '',
              style: ['setBlack', 'setLeft'],
              border: [false, true, true, true],
            },
            {
              text: "",
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: ``,
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: ``,
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
            {
              text: ``,
              style: ['setBlack', 'setRight'],
              border: [false, true, true, true],
            },
          ]
        )

      }
    });

    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: 'সর্বমোট',
          rowSpan: 1,
          colSpan: 3
        },
        {
          text: ``,
          style: [],
          border: [true, true, true, true]
        },
        {
          text: '',
          style: ['setBlack', 'setLeft'],
          border: [false, true, true, true],
        },
        {
          text: '',
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: '',
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: '',
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
        {
          text: '',
          style: ['setBlack', 'setRight'],
          border: [false, true, true, true],
        },
      ]
    )
    return phases;
  }
}
