import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailLogo,ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistryCustomerCountService {

  defaultColur = "#0c0d0d"
  constructor() { }

  generatePdf(data: any,divisionName:any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data,divisionName);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any,divisionName:any) {
    return {
      info: {
        title: 'Ministry Customer Count',
        author: 'BPDB',
        subject: 'Ministry Customer Count',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data,divisionName),background: function (currentPage, pageSize) {
        return [
          {
            // svg: `<svg height="1060" width="945">
            //   <line x1="3.5" y1="535" x2="222.4" y2="535" style="stroke:#111;stroke-width:1" />
            // </svg>`
          }
        ]
      },
      content: [
        this.getMinistryCustomerCountInfo(data)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      // styles: setAllCustomerArre
      // defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any,divisionName:any){
    const totalMinistry = data.length;
    const phase = {
      // margin: misMinistrySummaryHeaderMargin,
      margin: [30,10,30,0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        // margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 65,
              height: 55,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'left',
              margin: [50, 5, 0, 0],
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
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              margin: [-50, 0, 0, 0],
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
              text: `Division/ESU Name: ${divisionName.locationName[0].name}`,
              margin: [-50, 0, 0, 0],
              style: [setSubSetHeading],
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
              text: `Ministry List with no. of Customer`,
              margin: [-50, 0, 0, 0],
              style: [setSubSetHeading],
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
          [
            {
              text: `Location Code: ${divisionName.locationName[0].code}`,
              style: ['setLeft', setSubSetHeading],
              margin: [0, -11, 0, 0],
              colSpan: 2,
              // bold: false
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
            {
              text: `Total Ministry: ${totalMinistry}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -11, 0, 0],
              colSpan: 2,
              // bold: false
            },
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
  }


  private getMinistryCustomerCountInfo(data: any){
    const phase = {
      // margin: [5, 15, 0, 0],
      table: {
        dontBreakRows: true,
        // headerRows: 1,
        // footerRows: 1,
				// heights: [10,10.10,10],
        widths: [30,180, '*', 50,45,45,45,40,45],
        body: [
          [
            {
              text: `Sl. No`,
              style: ['setBold', 'setBig'],
              colSpan: 1,
              border: [true, true, true, true],
            },
            {
              text: `Ministry Name`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Ministry Customer`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `City Corporation`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Pourasova`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Union porishod`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `Rebate Mosjid`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
            {
              text: `No. of Customer`,
              style: ['setBold', 'setBig'],
              border: [true, true, true, true],
              colSpan: 1
            },
          ]
        ]
      },
      layout: this.setTableBorder(),
    };
    let serial=0;
    let totalCustomer=0;
    let ministryCustomer=0;
    data.forEach(value => {
      serial++;
      totalCustomer+=value.totalCustomer;
      ministryCustomer=value.ministryCode=='2'?(value.totalCustomer-(value.cityCorporationCount+value.pouroshovaCount+value.unionPorishodCount)):0 || value.ministryCode=='29'?(value.totalCustomer-(value.rebaitCount)):0;
      // ministryCustomer=value.ministryCode=='29'?(value.totalCustomer-value.rebaitCount):0;
      phase.table.body.push(
        [
          {
            text: `${serial}`,
            border: [true, true, true, true],
            style: [],
            colSpan: 1,
          },
          {
            text: `${value.ministryName}`,
            border: [true, true, true, true],
            style: ['setLeft','setBold', 'setBig'],
            colSpan: 1,
          },
          {
            text: `${value.ministryCode=='2'? ministryCustomer:'' || value.ministryCode=='29'? ministryCustomer:''}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          },
          {
            text: `${value.ministryCode=='2'? value.cityCorporationCount:''}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          },
          {
            text: `${value.ministryCode=='2'? value.pouroshovaCount:''}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          },
          {
            text: `${value.ministryCode=='2'? value.unionPorishodCount:''}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          },
          {
            text: `${value.ministryCode=='29'? value.rebaitCount:''}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          },
          {
            text: `${value.totalCustomer}`,
            border: [true, true, true, true],
            style: ['setBold',],
            colSpan: 1,
          }
        ]
      );
    });
    phase.table.body.push(
      [
        {
          text: `Total Customer`,
          border: [true, true, true, true],
          style: [],
          colSpan: 2,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setLeft','setBold', 'setBig'],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setLeft','setBold', 'setBig'],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setBold',],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setBold',],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setBold',],
          colSpan: 1,
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: ['setBold',],
          colSpan: 1,
        },
        {
          text: `${totalCustomer}`,
          border: [true, true, true, true],
          style: ['setBold',],
          colSpan: 1,
        }
      ]
    );
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
      paddingBottom: function (i, node) {
        return 5;
      },
    };
  }
  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
}
