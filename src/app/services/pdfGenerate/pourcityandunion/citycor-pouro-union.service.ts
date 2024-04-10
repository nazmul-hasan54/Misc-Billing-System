import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { environment } from '../../../../environments/environment';
import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';

import { ZoneWiseCityPouroUnionArrear } from '../../../model/zone-wise-city-pouro-union-arrear';

import { miscDefaultStyle, setAllCustomerArrearStyle, setCityPouroUnionStyles, setHeading, setSubHeading } from '../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class CitycorPouroUnionService {

  defaultColur = "#0c0d0d"
  constructor(private http: HttpClient) { }

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
        title: '',
        author: 'BPDB',
        subject: '',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
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
      content: [this.getHeading(reportObject), this.getCityCorporUnionInfo(data)],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      pageMargins: [30, 40, 30, 30],
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
  private getHeading(reportObj: any) {
    let billMonth = reportObj.billMonth;
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
    return {
      table: {
        margin: [0, 20, 0, 0],
        widths: [5, 5, '*', '*', 60, 40],
        body: [
          [
            { border: [false, false, false, false], text: '' },
            {
              text: '',border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              border: [false, false, false, false],
              text: 'বিউবোর আওতাধীন সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক',
              colSpan: 3,
              bold: true,
              style: [setCityPouroUnionStyles.setFontBangla, setCityPouroUnionStyles.setHeading],
              margin: [80, -5, 0, 0],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              style: [],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: [],
            },
          ],
          [
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            { border: [false, false, false, false], text: '' },
            {
              border: [false, false, false, false],
              // text: `তথ্য প্রেরণের তারিখঃ ${dateBn} খ্রিঃ`,
              text: `তথ্য প্রেরণের তারিখঃ ${month }-${year} খ্রিঃ`,
              bold: true,
              colSpan: 2,
              style: [setCityPouroUnionStyles.setFontBangla, setCityPouroUnionStyles.setSubHeading],
              margin: [80, -3, 0, 0],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              colSpan: 2,
              style: ['setBig', 'setBlack', 'setLeft'],
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

  private getCityCorporUnionInfo(data: any) {
    const { TotalDues } = data;
    const phases = {
      table: {
        headerRows: 1,
        widths: [40, 70, '*', 70,70,70,70,70],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [
                setCityPouroUnionStyles.setCenter,
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
              ],
              margin: [0, 10, 0, 0],
              colSpan: 1,
              rowSpan: 2,
            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setBlack,
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
              ],
              text: 'জোনের নাম',
              rowSpan: 2,
              margin: [0, 10, 0, 0],
            },
            {

              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setBlack,
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
                setCityPouroUnionStyles.setCenter
              ],
              text: 'সংস্থার নাম',

            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold
              ],
              text: 'পূর্বের বকেয়ার পরিমান',
              colSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold
              ],
              text: 'বর্তমান মাসের বিল',
              colSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold
              ],
              text: 'মোট আদায়',
              colSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold
              ],
              text: 'মোট বকেয়ার পরিমাণ',
              colSpan: 1
            },
            {
              border: [true, true, true, true],
              style: [
                setCityPouroUnionStyles.setBlack,
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold
              ],
              text: 'অনাদায়ে সংযোগ বিচ্ছিন্নের তথ্য',
              rowSpan: 2,
              margin: [0, 10, 0, 0],
              //alignment: 'center',
            },
          ],
          [
            {
              border: [true, true, true, true],
              style: [],
              text: '',
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla, setCityPouroUnionStyles.setCenter],
              text: '',
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla, 'setRight'],
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ',
              margin: [20, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla,],
              text: '(লক্ষ টাকায়)',
              margin: [0, 0, -55, 0],
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla,],
              text: '(লক্ষ টাকায়)',
              margin: [0, 0, -55, 0],
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla,],
              text: '(লক্ষ টাকায়)',
              margin: [0, 0, -55, 0],
            },
            {
              border: [true, true, true, true],
              style: [setCityPouroUnionStyles.setFontBangla,],
              text: '(লক্ষ টাকায়)',
              margin: [0, 0, -55, 0],
            },
            {
              border: [true, true, true, true],
              style: [],
              text: '',
              //alignment: 'center',
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };



    // KrishiCustomers
    // KrishiLocations
    let Locations = data;
    let CityPouroUnion = data;
    let totalDues = 0;
    let serial = 0;
    //let custSerial = 0;
    let zoneTotal = 0;
    let totalArrear = 0;

    let grandTotalPreviousArrear = 0;
    let grandTotalCurrentMonthBill = 0;
    let grandTotalTotalCollection = 0;
    let grandTotalCurrentArrear = 0;

    //let uniquePoultryLocations = [...new Set(Locations.map(item => item.locationCode))];

    let cityCorporGrandTotal = 0;
    let pouroshovaGrandTotal = 0;
    let unionparishodGrandTotal =0;

    let previousArrearTotal =0;
    let currentMonthBillTotal =0;
    let totalCollectionTotal =0;
    let currentArrearTotal =0;

    let cityCorporPreviousArrearGrandTotal =0;
    let cityCorporCurrentMonthBillGrandTotal =0;
    let cityCorporoTotalCollectionGrandTotal =0;
    let cityCorporCurrentArrearGrandTotal =0;

    let pourashavaPreviousArrearGrandTotal =0;
    let pourashavaCurrentMonthBillGrandTotal =0;
    let pourashavaTotalCollectionGrandTotal =0;
    let pourashavaCurrentArrearGrandTotal =0;

    let unionporishodPreviousArrearGrandTotal =0;
    let unionporishodCurrentMonthBillGrandTotal =0;
    let unionporishodTotalCollectionGrandTotal =0;
    let unionporishodCurrentArrearGrandTotal =0;

    let uniqueCityPouroUnionLocation = [...new Set(Locations.map(item => item.zoneCode))];
    let providerNo = 0;
    uniqueCityPouroUnionLocation.forEach((location) => {
      let customerGroupByLocation = CityPouroUnion.filter(x => x.zoneCode == location);
      let customerGroupByLocationLength = customerGroupByLocation.length;
      let providerInsert = Math.ceil(Number(customerGroupByLocationLength / 2));
      if (customerGroupByLocationLength > 0) {
       
        providerNo++;
        serial++;
        customerGroupByLocation.forEach(cust => {

// citycorparationCurrentArrear
// citycorparationCurrentMonthBill
// citycorparationPreviousArrear
// citycorparationTotalCollection

// pourashavaCurrentArrear
// pourashavaCurrentMonthBill
// pourashavaPreviousArrear
// pourashavaTotalCollection

// unionporishodCurrentArrear
// unionporishodCurrentMonthBill
// unionporishodPreviousArrear
// unionporishodTotalCollection

          let {  
            zoneCode, 
            zoneName, 
            zoneNamebn, 
            citycorparationPreviousArrear, 
            citycorparationCurrentMonthBill, 
            citycorparationTotalCollection, 
            citycorparationCurrentArrear, 

            pourashavaPreviousArrear, 
            pourashavaCurrentMonthBill, 
            pourashavaTotalCollection, 
            pourashavaCurrentArrear, 

            unionporishodPreviousArrear, 
            unionporishodCurrentMonthBill, 
            unionporishodTotalCollection, 
            unionporishodCurrentArrear, 

          } = cust;

          let providerName = `${zoneNamebn}`;
          
          // cityCorporGrandTotal += citycorparationTotalBill;
          // pouroshovaGrandTotal += pourashavaTotalBill;
          // unionparishodGrandTotal += unionporishodTotalBill;
          // zoneTotal = citycorparationTotalBill + pourashavaTotalBill + unionporishodTotalBill;

          totalArrear = cityCorporGrandTotal + pouroshovaGrandTotal + unionparishodGrandTotal;

          //custSerial++;
      
          //totalDues += arrearAmt;
          //arrearAmt = arrearAmt ? this.translateNumber(arrearAmt) : this.translateNumber(0.00);
          // citycorparationTotalBill = citycorparationTotalBill ? this.translateNumber(Number(citycorparationTotalBill / 100000).toFixed(2)) : this.translateNumber(0.00);
          // pourashavaTotalBill = pourashavaTotalBill ? this.translateNumber(Number(pourashavaTotalBill / 100000).toFixed(2)) : this.translateNumber(0.00);
          // unionporishodTotalBill = unionporishodTotalBill ? this.translateNumber(Number(unionporishodTotalBill / 100000).toFixed(2)) : this.translateNumber(0.00);

          cityCorporPreviousArrearGrandTotal += citycorparationPreviousArrear;
          cityCorporCurrentMonthBillGrandTotal += citycorparationCurrentMonthBill;
          cityCorporoTotalCollectionGrandTotal += citycorparationTotalCollection;
          cityCorporCurrentArrearGrandTotal += citycorparationCurrentArrear;

          pourashavaPreviousArrearGrandTotal += pourashavaPreviousArrear;
          pourashavaCurrentMonthBillGrandTotal += pourashavaCurrentMonthBill;
          pourashavaTotalCollectionGrandTotal += pourashavaTotalCollection;
          pourashavaCurrentArrearGrandTotal += pourashavaCurrentArrear;

          unionporishodPreviousArrearGrandTotal += unionporishodPreviousArrear;
          unionporishodCurrentMonthBillGrandTotal += unionporishodCurrentMonthBill;
          unionporishodTotalCollectionGrandTotal += unionporishodTotalCollection;
          unionporishodCurrentArrearGrandTotal += unionporishodCurrentArrear;

          grandTotalPreviousArrear=cityCorporPreviousArrearGrandTotal+pourashavaPreviousArrearGrandTotal+unionporishodPreviousArrearGrandTotal;
          grandTotalCurrentMonthBill=cityCorporCurrentMonthBillGrandTotal+pourashavaCurrentMonthBillGrandTotal+unionporishodCurrentMonthBillGrandTotal;
          grandTotalTotalCollection=cityCorporoTotalCollectionGrandTotal+pourashavaTotalCollectionGrandTotal+unionporishodTotalCollectionGrandTotal;
          grandTotalCurrentArrear=cityCorporCurrentArrearGrandTotal+pourashavaCurrentArrearGrandTotal+unionporishodCurrentArrearGrandTotal;
     
          previousArrearTotal=citycorparationPreviousArrear+pourashavaPreviousArrear+unionporishodPreviousArrear;
          currentMonthBillTotal=citycorparationCurrentMonthBill+pourashavaCurrentMonthBill+unionporishodCurrentMonthBill;
          totalCollectionTotal=citycorparationTotalCollection+pourashavaTotalCollection+unionporishodTotalCollection;
          currentArrearTotal=citycorparationCurrentArrear+pourashavaCurrentArrear+unionporishodCurrentArrear;

          citycorparationPreviousArrear = citycorparationPreviousArrear ? this.translateNumber(Number(citycorparationPreviousArrear / 100000).toFixed(2)) : this.translateNumber(0.00);
          citycorparationCurrentMonthBill = citycorparationCurrentMonthBill ? this.translateNumber(Number(citycorparationCurrentMonthBill / 100000).toFixed(2)) : this.translateNumber(0.00);
          citycorparationTotalCollection = citycorparationTotalCollection ? this.translateNumber(Number(citycorparationTotalCollection / 100000).toFixed(2)) : this.translateNumber(0.00);
          citycorparationCurrentArrear = citycorparationCurrentArrear ? this.translateNumber(Number(citycorparationCurrentArrear / 100000).toFixed(2)) : this.translateNumber(0.00);
          
          pourashavaPreviousArrear = pourashavaPreviousArrear ? this.translateNumber(Number(pourashavaPreviousArrear / 100000).toFixed(2)) : this.translateNumber(0.00);
          pourashavaCurrentMonthBill = pourashavaCurrentMonthBill ? this.translateNumber(Number(pourashavaCurrentMonthBill / 100000).toFixed(2)) : this.translateNumber(0.00);
          pourashavaTotalCollection = pourashavaTotalCollection ? this.translateNumber(Number(pourashavaTotalCollection / 100000).toFixed(2)) : this.translateNumber(0.00);
          pourashavaCurrentArrear = pourashavaCurrentArrear ? this.translateNumber(Number(pourashavaCurrentArrear / 100000).toFixed(2)) : this.translateNumber(0.00);

          unionporishodPreviousArrear = unionporishodPreviousArrear ? this.translateNumber(Number(unionporishodPreviousArrear / 100000).toFixed(2)) : this.translateNumber(0.00);
          unionporishodCurrentMonthBill = unionporishodCurrentMonthBill ? this.translateNumber(Number(unionporishodCurrentMonthBill / 100000).toFixed(2)) : this.translateNumber(0.00);
          unionporishodTotalCollection = unionporishodTotalCollection ? this.translateNumber(Number(unionporishodTotalCollection / 100000).toFixed(2)) : this.translateNumber(0.00);
          unionporishodCurrentArrear = unionporishodCurrentArrear ? this.translateNumber(Number(unionporishodCurrentArrear / 100000).toFixed(2)) : this.translateNumber(0.00);


          phases.table.body.push(
            [
              {
                text: `${this.translateNumber(providerNo, 2)}`,
                border: [true, true, true, true],
                style: [
                  setCityPouroUnionStyles.setFontBangla
                ],
                rowSpan: 3,
                margin: [0, 20, 0, 0],
              },
              {
                text: `${providerName}`,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true],
                rowSpan: 3,
                margin: [0, 20, 0, 0],
              },
              {
                text: `সিটি কর্পোরেশন`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setLeft
                ],
                border: [true, true, true, true],
              },
              {
                text: `${citycorparationPreviousArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${citycorparationCurrentMonthBill}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${citycorparationTotalCollection}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${citycorparationCurrentArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true],
              },
            ],
            [
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              },
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              },
              {
                text: `পৌরসভা`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setLeft
                ],
                border: [true, true, true, true]
              },
              {
                text: `${pourashavaPreviousArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${pourashavaCurrentMonthBill}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${pourashavaTotalCollection}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${pourashavaCurrentArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              },
            ],
            [
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              },
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              },
              {
                text: `ইউনিয়ন পরিষদ`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setLeft
                ],
                border: [true, true, true, true]
              },
              {
                text: `${unionporishodPreviousArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${unionporishodCurrentMonthBill}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${unionporishodTotalCollection}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${unionporishodCurrentArrear}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: ``,
                style: [setCityPouroUnionStyles.setFontBangla],
                border: [true, true, true, true]
              }
            ],
            [
              {
                text: ` `,
                border: [true, true, true, true],
                style: [setCityPouroUnionStyles.setFontBangla],
              },
              {
                text: `সর্বমোট ${providerName} জোন `,
                border: [true, true, true, true],
                style: [setCityPouroUnionStyles.setFontBangla],
                colSpan: 2
              },
              {
                text: ` `,
                border: [true, true, true, true],
                style: [setCityPouroUnionStyles.setFontBangla],
              },
              {
                text: `${this.translateNumber(Number(previousArrearTotal / 100000).toFixed(2))}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${this.translateNumber(Number(currentMonthBillTotal / 100000).toFixed(2))}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${this.translateNumber(Number(totalCollectionTotal / 100000).toFixed(2))}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: `${this.translateNumber(Number(currentArrearTotal / 100000).toFixed(2))}`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setAllCustomerArrearStyle.setRight
                ],
                border: [true, true, true, true]
              },
              {
                text: ` `,
                border: [true, true, true, true],
                style: [setCityPouroUnionStyles.setFontBangla],
              },
            ],
          )
        });
      }
    });
    /* Total section */

    phases.table.body.push(
      [
        {
          text: `বিউবোর আওতাধীন`,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
          colSpan: 2,
          rowSpan: 3,
          margin: [0, 20, 0, 0],
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
        {
          text: `সিটি কর্পোরেশন`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setCityPouroUnionStyles.setLeft
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(cityCorporPreviousArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(cityCorporCurrentMonthBillGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(cityCorporoTotalCollectionGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(cityCorporCurrentArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
      ],
      [
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
        {
          text: `পৌরসভা`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setCityPouroUnionStyles.setLeft
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(pourashavaPreviousArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(pourashavaCurrentMonthBillGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(pourashavaTotalCollectionGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(pourashavaCurrentArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
      ],
      [
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        },
        {
          text: `ইউনিয়ন পরিষদ`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setCityPouroUnionStyles.setLeft
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(unionporishodPreviousArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(unionporishodCurrentMonthBillGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(unionporishodTotalCollectionGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(unionporishodCurrentArrearGrandTotal / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: ``,
          style: [setCityPouroUnionStyles.setFontBangla],
          border: [true, true, true, true]
        }
      ],
    );
    phases.table.body.push(
      [
        {
          text: `সর্বমোট`,
          border: [true, true, true, true],
          style: [
            setCityPouroUnionStyles.setFontBangla,
          ],
          colSpan: 3
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [
            setCityPouroUnionStyles.setFontBangla,
          ],
        },
        {
          text: ` `,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
        },
        {
          text: `${this.translateNumber(Number(grandTotalPreviousArrear / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalCurrentMonthBill / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalTotalCollection / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalCurrentArrear / 100000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: ` `,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
        },
      ],
    );

    phases.table.body.push(
      [
        {
          text: `কোটি টাকায়`,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
          colSpan: 3
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
        },
        {
          text: ` `,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
        },
        {
          text: `${this.translateNumber(Number(grandTotalPreviousArrear / 10000000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalCurrentMonthBill / 10000000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalTotalCollection / 10000000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: `${this.translateNumber(Number(grandTotalCurrentArrear / 10000000).toFixed(2))}`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setAllCustomerArrearStyle.setRight
          ],
          border: [true, true, true, true]
        },
        {
          text: ` `,
          border: [true, true, true, true],
          style: [setCityPouroUnionStyles.setFontBangla],
        },
    ],
    );
    return phases;
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
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
 }
