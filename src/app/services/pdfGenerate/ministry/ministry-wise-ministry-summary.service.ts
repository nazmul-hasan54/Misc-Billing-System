import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { MinistrySummaryModel } from '../../../model/ministry.summary.model';
import { ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any> pdfMake).vfs=pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistryWiseMinistrySummaryService {


  constructor() { }
  defaultColor = "";
  generatePdf(data: any, reportObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data, reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  private getDocumentDefinition(data: any, reportObj: any) {
    return {
      info: {
        title: 'All Ministry Center wise Summary',
        author: 'EBCWEB',
        subject: 'All Ministry Center wise Summary',
        keywords: 'keywords for document',
      },
      pageSize: 'Legal',
      pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }
                , { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data, reportObj),

      content: [
        this.getMinistry(data, reportObj)
      ],
      pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      defaultStyle: misAllMinistryCenterwiseSummaryDefaultStyle,
      styles: misMinistrySummaryStyle
    }
  }

  private getHeading(data: any, reportObj: any) {
    const { runBillCycle, locDesc } = data[0];
    const totalCount = data.length;
    const phase = {
      margin: misMinistrySummaryHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          // row 1
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-250, -2, 0, 0],
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
          // // row 2
          [
            {},
            {},
            {
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],

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
          // // row 2
          [
            {},
            {},
            {
              text: `All Center Ministry Report`,
              style: [setSubSetHeading],
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

          // row 3
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${reportObj.billMonth ?? ''
                }`,
              style: [setSubSetHeading],
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
          // row- 4
          [
            { text: '', colSpan: 2 },
            {},
            {
              text: '(Govt., Semi Govt., Autonomous & Corporation)',
              style: [setSubSetHeading],

              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {
              text: ``,
              style: ['setLeft'],
              margin: [0, 0, 30, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
          // row 5
          [
            {
              text: `Total Ministry:\t${totalCount}`,
              style: ['setRight', setSubSetHeading],
              margin: [0, -17, 30, 0],
              colSpan: 10,
              bold: false
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

  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 10; },
      paddingBottom: function (i, node) { return 10; },
    }
  }
  private getMinistry(data: MinistrySummaryModel[], reportObj: any) {
    console.log(data);
    const phase = {
      margin: [10, 0, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [20, '*', 20, 50, 20, 50, 20, 50, 20, 50, 20, 50, 20, 50, 20, 50, 20, 50, 20, 50],
        headerRows: 2,
        body: [
          [
            {
              text: "SL No",
              style: ['setBold', 'setBig'], rowSpan: 2,
              colSpan: 1

            },
            {
              text: "Ministry",
              style: ['setBold', 'setBig'], rowSpan: 2
            },
            {
              text: "Chittagong",
              style: ['setBold'],
              colSpan: 2
            },
            {


            },
            {
              text: "Comilla",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Mymensingh",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Sylhet",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Tangail",
              style: ['setBold'],
              colSpan: 2

            },
            {},
            {
              text: "Jamalpur",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Kishoreganj",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Moulvibazar",
              style: ['setBold'],
              colSpan: 2
            },
            {},
            {
              text: "Total",
              style: ['setBold'],
              colSpan: 2
            },
            {},
          ],

          [
            {
              text: "NOC",
              style: ['setBold'],
              colSpan: 1
            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
            {
              text: "NOC",
              style: ['setBold'],

            },
            {
              text: "Arr Prn",
              style: ['setBold'],
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };
    let dbctggNocTotal = 0;
    let dbctggArrPrnTotal = 0;
    let dbcomNocTotal = 0;
    let dbcomArrPrnTotal = 0;
    let dbmymenNocTotal = 0;
    let dbmymenArrPrnTotal = 0;
    let dbsylNocTotal = 0;
    let dbsylArrPrnTotal = 0;
    let dbtangNocTotal = 0;
    let dbtangArrPrnTotal = 0;
    let dbjamNocTotal = 0;
    let dbjamArrPrnTotal = 0;
    let dbkishorNocTotal = 0;
    let dbkishorArrPrnTotal = 0;
    let dbmoulviNocTotal = 0;
    let dbmoulviArrPrnTotal = 0;
    let grandTotalNoc = 0;
    //DBCTGG_NOC_Total 
    //  + DBCOM_NOC_Total  + DBMYMEN_NOC_Total  + DBSYL_NOC_Total  + DBTANG_NOC_Total  +DBJAM_NOC_Total 
    //  + DBKISHOR_NOC_Total +DBMOULVI_NOC_Total ;
    // DBKISHOR_ARRPRN_Total +DBMOULVI_NOC_Total +DBMOULVI_ARRPRN_Total ;
    let grandBilTotal = 0;
    // let Grand_bil_total = 
    // DBCTGG_ARRPRN_Total + DBCOM_ARRPRN_Total + DBMYMEN_ARRPRN_Total  + DBSYL_ARRPRN_Total  +DBTANG_ARRPRN_Total  
    // +DBJAM_ARRPRN_Total  + DBKISHOR_ARRPRN_Total + DBMOULVI_ARRPRN_Total;
    let TotalBilTotal = 0;
    data.forEach((item, index) => {

   
      dbctggNocTotal += (item.chittagongCount ?? 0);
      dbctggArrPrnTotal += (item.chittagongPrn ?? 0);
      dbcomNocTotal += (item.comillaCount ?? 0);
      dbcomArrPrnTotal += (item.comillaPrn ?? 0);
      dbmymenNocTotal += (item.mymensinghCount ?? 0);
      dbmymenArrPrnTotal += (item.mymensinghPrn ?? 0);
      dbsylNocTotal += (item.sylhetCount ?? 0);
      dbsylArrPrnTotal += (item.sylhetPrn ?? 0);
      dbtangNocTotal += (item.tangailCount ?? 0);
      dbtangArrPrnTotal += (item.tangailPrn ?? 0);
      dbjamNocTotal += (item.jamalpurCount ?? 0);
      dbjamArrPrnTotal += (item.jamalpurPrn ?? 0);
      dbkishorNocTotal += (item.kishoreganjCount ?? 0);
      dbkishorArrPrnTotal += (item.kishoreganjPrn ?? 0);
      dbmoulviNocTotal += (item.moulvibazarCount ?? 0);
      dbmoulviArrPrnTotal += (item.moulvibazarPrn ?? 0);
      // Grand_Total_Noc += (item. ?? 0);
      //TOTAL_BILL_Total += (TOTAL_BILL ?? 0);
      let totalNoc = item.chittagongCount+ item.jamalpurCount +item.kishoreganjCount + item.tangailCount + item.moulvibazarCount+ item.sylhetCount
      +item.comillaCount + item.mymensinghCount;
      let totalBill = item.chittagongPrn +item.comillaPrn + item.jamalpurPrn + item.mymensinghPrn + item.kishoreganjPrn
      +item.tangailPrn+ item.sylhetPrn + item.moulvibazarPrn;
      grandTotalNoc += totalNoc;
      grandBilTotal += totalBill;
      phase.table.body.push(
        [
          {
            text: (index + 1).toString(),
            style: [],
          },
          {
            text: item.ministryName ?? "",
            style: ['setLeft', 'setBold'],
          },
          {
            text:item.chittagongCount.toString() ?? " ", // Chittagonj db code is 1
            style: [],

          },
          {
            text: item.chittagongPrn ? item.chittagongPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.comillaCount.toString() ?? "",
            style: [],

          },
          {
            text: item.comillaPrn ? item.comillaPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.mymensinghCount.toString() ?? "",
            style: [],

          },
          {
            text: item.mymensinghPrn ? item.mymensinghPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.sylhetCount.toString() ?? "",
            style: [],

          },
          {
            text: item.sylhetPrn ? item.sylhetPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.tangailCount.toString() ?? "",
            style: [],

          },
          {
            text: item.tangailPrn ? item.tangailPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.jamalpurCount.toString() ?? "",
            style: [],

          },
          {
            text: item.jamalpurPrn ? item.jamalpurPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.kishoreganjCount.toString() ?? "",
            style: [],

          },
          {
            text: item.kishoreganjPrn ? item.kishoreganjPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
          {
            text: item.moulvibazarCount.toString() ?? "",
            style: [],

          },
          {
            text: item.moulvibazarPrn ? item.moulvibazarPrn.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setLeft', 'setRight'],
          },
          {
            text: totalNoc.toString() ?? "",
            style: [],

          },
          {
            text: totalBill? totalBill.toLocaleString(undefined, { minimumFractionDigits: 2 }) : "",
            style: ['setRight'],
          },
        ],
      )
    });
    phase.table.body.push(
      [
        {
          text: "Grand Total",
          style: ['setRight', 'setBold'],
          colSpan: 2

        },
        {
          text: "",
          style: [],
        },
        {
          text: `${dbctggNocTotal}`,
          style: [],

        },
        {
          text: `${dbctggArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbcomNocTotal}`,
          style: [],

        },
        {
          text: `${dbcomArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbmymenNocTotal}`,
          style: [],

        },
        {
          text: `${dbmymenArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbsylNocTotal}`,
          style: [],

        },
        {
          text: `${dbsylArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbtangNocTotal}`,
          style: [],

        },
        {
          text: `${dbtangArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbjamNocTotal}`,
          style: [],

        },
        {
          text: `${dbjamArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
        {
          text: `${dbkishorNocTotal}`,
          style: [],

        },
        {
          text: dbkishorArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 }) ?? "",
          style: ['setRight'],
        },
        {
          text: `${dbmoulviNocTotal}`,
          style: [],

        },
        {
          text: `${dbmoulviArrPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setLeft', 'setRight'],
        },
        {
          text: `${grandTotalNoc}`,
          style: [],

        },
        {
          text: `${grandBilTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          style: ['setRight'],
        },
      ],
    )
    return phase;
  }
}
