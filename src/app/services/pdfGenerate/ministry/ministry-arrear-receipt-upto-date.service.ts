import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistryArrearReceiptUptoDateService {

  defaultColor = '#000000';

  constructor() { }

  generatePdf(data: any){
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data);

    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  private getDocumentDefinition(data: any){
    return {
      info: {
        title: 'Ministry Arrear and Receipt Up to date info',
        author: 'BPDB',
        subject: 'Ministry Arrear and Receipt Up to date info',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
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

      header: this.getMinistryArrearReceiptInfoHeader(data),
      content: [
        this.getMinistryArrearReceiptInfo(data)

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

  private getMinistryArrearReceiptInfoHeader(data: any){
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
              margin: [-140, 0, 0, 0],
            },
            {},
            { 
              text: '', 
              colSpan: 8, 
              border: [false, false, false, false] 
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
              text: [`বকেয়া ও আদায়ের হালনাগাদ তথ্য`],
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
              text:`ইং পর্যন্ত`,
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

  private getMinistryArrearReceiptInfo(data: any){
    const phases = {
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: [30, '*', 70, 70, 70, 80],
        body: [
          [
            {
              text: `ক্রঃ নং`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `বিবরণী`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `বকেয়ার পরিমান`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `আদায়ের পরিমান`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `অবশিষ্ট বকেয়া`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `মন্তব্য`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            }
          ],
          [
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: `কোটি টাকা`,
              border: [true, true, true, true],
              colSpan: 3,
              rowSpan: 1,
              margin: []
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan: 1,
              margin: []
            },
          ],
        ],
      }
    };

    phases.table.body.push(
      [
        {
          text: ``,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
        {
          text: `মোট`,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
        {
          text: `০.০০`,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
        {
          text: ``,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan: 1,
          margin: []
        },
      ],
    );
    return phases;
  }
}
