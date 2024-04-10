import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from '../../../../assets/vfs_fonts';
import { setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { miscDefaultStyle, zoneLocationWiseCityPouroUnionStyle } from '../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class ZoneLocationWiseCityPouroUnionService {
  defaultColor = "#0c0d0d"
  constructor(private http: HttpClient) { }

  generatePdf(data: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }


  private getDocumentDefinition(data: any) {
    return {
      info: {
        title: 'City Corporation Pouroshova UnionParishad',
        author: 'BPDB',
        subject: 'Ministry',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',
      header: this.getHeading(data),
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
      // content: [this.getHeading(data), this.getZoneLocationWiseCityPouroUnion(data),],
      content: [this.getZoneLocationWiseCityPouroUnion(data)],
      pageMargins: [30, 100, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: zoneLocationWiseCityPouroUnionStyle,
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
    const phase =  {
      table: {
        dontBreakRows: true,
        // margin: [0, 20, 0, 0],
        // widths: [50, 50, '*', '*', 60, 40],
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        margin: [0, 10, 0, 0],
        // body: [
        //   [
        //     {
        //       border: [false, false, false, false],
        //       text: ''
        //     },
        //     {
        //       text: '',
        //       border: [false, false, false, false],
        //       style: [],
        //     },
        //     {
        //       border: [false, false, false, false],
        //       text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক।',
        //       colSpan: 3,
        //       bold: true,
        //       style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla, 'setBold', 'setBig',
        //         zoneLocationWiseCityPouroUnionStyle.setCenter
        //       ],
        //     },
        //     {},
        //     {
        //       text: '',
        //       border: [false, false, false, false],
        //       style: [],
        //     },
        //     {
        //       text: '',
        //       border: [false, false, false, false],
        //       style: [],
        //     },
        //   ],
        // ],
        body: [
          [
            {},
            {},
            {
              image: `logo.png`,
              width: 60,
              height: 50,
              color: 'gray',
              // rowSpan: 2,
              colSpan: 3,
              alignment: 'center',
              // margin: [-120, 0, 0, 0],
              margin: [20, 0, 0, 0],
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
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              margin: [20, 0, 0, 0],
              colSpan: 3,
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
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক।',
              style: [setSubHeading],
              margin: [0, 0, 0, 0],
              colSpan: 4,
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
              text:``,
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

  private getZoneLocationWiseCityPouroUnion(data: any) {
    const phases = {
      table: {
        // headerRow: 1,
        widths: [25,70,'*',55,55,55,55,50],
        body: [
          [
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [false, false, false, false],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
          ],
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,],
              colSpan: 0,
              rowSpan: 2,
              margin: [0, 10, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'ইএসইউ',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 2,
              margin: [0, 10, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'সংস্থার নাম',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'পূর্বের বকেয়ার পরিমান',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'মাসের বিল',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'মোট আদায়',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'মোট বকেয়ার পরিমাণ',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'অনাদায়ে সংযোগ বিচ্ছিন্নের তথ্য',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 2,
              margin: [0, 10, 0, 0],
            },
          ],
          [
            {
              border: [true, true, true, true],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
            {
              border: [true, true, true, true],
              text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'টাকা',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'টাকা',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'টাকা',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: 'টাকা',
              style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla],
              colSpan: 1,
              rowSpan: 1,
              margin: [0, 5, 0, 0],
            },
            {
              border: [true, true, true, true],
              text: '',
              style: [],
              colSpan: 1,
              rowSpan: 1,
            },
          ]
        ],
      },
      layout: this.setTableBorder(),
    };

    let cityCorporationGrandTotal = 0;
    let pouroshovaGrandTotal = 0;
    let unionPorishodGrandTotal = 0;
    let totalCityPouroUnion = 0;
    let grandTotal = 0;

    let grandTotalCityPouroUnionPreviousArrear = 0;
    let grandTotalCityPouroUnionCurrentMonthBill = 0;
    let grandTotalCityPouroUnionTotalCollection = 0;
    let grandTotalCityPouroUnionCurrentArrear = 0;
    let serialNumer = 0;

    // let GrandTotalCityPouroUnionPreviousArrear = 0;
    // let GrandTotalCityPouroUnionCurrentMonthBill = 0;
    // let GrandTotalCityPouroUnionTotalCollection = 0;
    // let GrandTotalCityPouroUnionCurrentArrear = 0;

    let GrandTotalCityPreviousArrear = 0;
    let GrandTotalCityCurrentMonthBill = 0;
    let GrandTotalCityTotalCollection = 0;
    let GrandTotalCityCurrentArrear = 0;

    let GrandTotalPouroPreviousArrear = 0;
    let GrandTotalPouroCurrentMonthBill = 0;
    let GrandTotalPouroTotalCollection = 0;
    let GrandTotalPouroCurrentArrear = 0;

    let GrandTotalUnionPreviousArrear = 0;
    let GrandTotalUnionCurrentMonthBill = 0;
    let GrandTotalUnionTotalCollection = 0;
    let GrandTotalUnionCurrentArrear = 0;

    let totalCityPouroUnionPreviousArrear = 0;
    let totalCityPouroUnionCurrentMonthBill = 0;
    let totalCityPouroUnionTotalCollection = 0;
    let totalCityPouroUnionCurrentArrear = 0;

    // CitycorporationPreviousArrear,
    // CitycorporationCurrentMonthBill,
    // CitycorporationTotalCollection,
    // CitycorporationCurrentArrear,

    // PouroshovaPreviousArrear,
    // PouroshovaCurrentMonthBill,
    // PouroshovaTotalCollection,
    // PouroshovaCurrentArrear,

    // UnionparishadPreviousArrear,
    // UnionparishadCurrentMonthBill,
    // UnionparishadTotalCollection,
    // UnionparishadCurrentArrear,
    data.forEach(item => {
      const { 
        locationCode, 
        locationNameBn, 
        citycorporationTotalBill, 
        pouroshovaTotalBill, 
        unionparisadTotalBill,
        
        citycorporationPreviousArrear,
        citycorporationCurrentMonthBill,
        citycorporationTotalCollection,
        citycorporationCurrentArrear,

        pouroshovaPreviousArrear,
        pouroshovaCurrentMonthBill,
        pouroshovaTotalCollection,
        pouroshovaCurrentArrear,

        unionparishadPreviousArrear,
        unionparishadCurrentMonthBill,
        unionparishadTotalCollection,
        unionparishadCurrentArrear,
      } = item;
      
      serialNumer++;

      // totalCityPouroUnion = citycorporationTotalBill + pouroshovaTotalBill + unionparisadTotalBill;
      // cityCorporationGrandTotal += citycorporationTotalBill;
      // pouroshovaGrandTotal += pouroshovaTotalBill;
      // unionPorishodGrandTotal += unionparisadTotalBill;
      // grandTotal = cityCorporationGrandTotal + pouroshovaGrandTotal + unionPorishodGrandTotal;

      totalCityPouroUnionPreviousArrear=citycorporationPreviousArrear+pouroshovaPreviousArrear+unionparishadPreviousArrear;
      totalCityPouroUnionCurrentMonthBill=citycorporationCurrentMonthBill+pouroshovaCurrentMonthBill+unionparishadCurrentMonthBill;
      totalCityPouroUnionTotalCollection=citycorporationTotalCollection+pouroshovaTotalCollection+unionparishadTotalCollection;
      totalCityPouroUnionCurrentArrear=citycorporationCurrentArrear+pouroshovaCurrentArrear+unionparishadCurrentArrear;

      GrandTotalCityPreviousArrear+=citycorporationPreviousArrear;
      GrandTotalCityCurrentMonthBill+=citycorporationCurrentMonthBill;
      GrandTotalCityTotalCollection+=citycorporationTotalCollection;
      GrandTotalCityCurrentArrear+=citycorporationCurrentArrear;
      
      GrandTotalPouroPreviousArrear+=pouroshovaPreviousArrear;
      GrandTotalPouroCurrentMonthBill+=pouroshovaCurrentMonthBill;
      GrandTotalPouroTotalCollection+=pouroshovaTotalCollection;
      GrandTotalPouroCurrentArrear+=pouroshovaCurrentArrear;
      
      GrandTotalUnionPreviousArrear+=unionparishadPreviousArrear;
      GrandTotalUnionCurrentMonthBill+=unionparishadCurrentMonthBill;
      GrandTotalUnionTotalCollection+=unionparishadTotalCollection;
      GrandTotalUnionCurrentArrear+=unionparishadCurrentArrear;
      
      grandTotalCityPouroUnionPreviousArrear=GrandTotalCityPreviousArrear+GrandTotalPouroPreviousArrear+GrandTotalUnionPreviousArrear;
      grandTotalCityPouroUnionCurrentMonthBill=GrandTotalCityCurrentMonthBill+GrandTotalPouroCurrentMonthBill+GrandTotalUnionCurrentMonthBill;
      grandTotalCityPouroUnionTotalCollection=GrandTotalCityTotalCollection+GrandTotalPouroTotalCollection+GrandTotalUnionTotalCollection;
      grandTotalCityPouroUnionCurrentArrear=GrandTotalCityCurrentArrear+GrandTotalPouroCurrentArrear+GrandTotalUnionCurrentArrear;
      // GrandTotalCityPouroUnionCurrentMonthBill+=totalCityPouroUnionCurrentMonthBill;
      // GrandTotalCityPouroUnionTotalCollection+=totalCityPouroUnionTotalCollection;
      // GrandTotalCityPouroUnionCurrentArrear+=totalCityPouroUnionCurrentArrear;

      phases.table.body.push(
        [
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(serialNumer, 2)}`,
            style: [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
            ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${locationNameBn}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setLeft,
                zoneLocationWiseCityPouroUnionStyle.margin,
              ],
            colSpan: 1,
            rowSpan: 3,
          },
          {
            border: [true, true, true, true],
            text: 'সিটি কর্পোরেশন',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setLeft
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(citycorporationPreviousArrear)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },  
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(citycorporationCurrentMonthBill)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },  
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(citycorporationTotalCollection)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(citycorporationCurrentArrear)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
        ],
        [
          {
            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: '',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: 'পৌরসভা',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setLeft
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(pouroshovaPreviousArrear)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(pouroshovaCurrentMonthBill)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(pouroshovaTotalCollection)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(pouroshovaCurrentArrear)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
        ],
        [
          {
            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: '',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: `ইউনিয়ন পরিষদ`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setLeft
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(unionparishadPreviousArrear)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(unionparishadCurrentMonthBill)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(unionparishadTotalCollection)}`,
            style: [zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(unionparishadCurrentArrear)}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
        ],
        [
          {
            border: [true, true, true, true],
            text: 'সর্বমোট',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setCenter
              ],
            colSpan: 3,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: ``,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: ' ',
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: `${this.translateNumber(totalCityPouroUnionPreviousArrear)}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: `${this.translateNumber(totalCityPouroUnionCurrentMonthBill)}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: `${this.translateNumber(totalCityPouroUnionTotalCollection)}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {
            border: [true, true, true, true],
            text: `${this.translateNumber(totalCityPouroUnionCurrentArrear)}`,
            style:
              [
                zoneLocationWiseCityPouroUnionStyle.setFontBangla,
                zoneLocationWiseCityPouroUnionStyle.setRight
              ],
            colSpan: 1,
            rowSpan: 1,
          },
          {

            border: [true, true, true, true],
            text: '',
            style: [],
            colSpan: 1,
            rowSpan: 1,
          },
        ],
      );
    });


    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: 'সিটি কর্পোরেশন=',
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalCityPreviousArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalCityCurrentMonthBill)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalCityTotalCollection)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalCityCurrentArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
      ]
    );
    
    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: 'পৌরসভা=',
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalPouroPreviousArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalPouroCurrentMonthBill)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalPouroTotalCollection)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalPouroCurrentArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
      ]
    );

    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: 'ইউনিয়ন পরিষদ=',
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalUnionPreviousArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalUnionCurrentMonthBill)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalUnionTotalCollection)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(GrandTotalUnionCurrentArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
      ]
    );

    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: 'সর্বমোট=',
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandTotalCityPouroUnionPreviousArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandTotalCityPouroUnionCurrentMonthBill)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandTotalCityPouroUnionTotalCollection)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandTotalCityPouroUnionCurrentArrear)}`,
          style:
            [
              zoneLocationWiseCityPouroUnionStyle.setFontBangla,
              zoneLocationWiseCityPouroUnionStyle.setRight
            ],
          colSpan: 1,
          rowSpan: 1,
        },
        {
          border: [true, true, true, true],
          text: '',
          style: [],
          colSpan: 1,
          rowSpan: 1,
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
