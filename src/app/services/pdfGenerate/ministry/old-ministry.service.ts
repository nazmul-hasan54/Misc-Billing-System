import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { ministryDetailsDefaultStyle, ministryDetailsHeaderMargin, ministryDetailsImageMargin, ministryDetailsPageMargin, ministryDetailsStyle, setHeading, setPdfMakeFonts, setSubHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OldMinistryService {

  defaultColor = '#111';
  constructor() { }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }

  generatePdf(data: any, utilityObj: any, uniqueZone: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;

    const documentDefinition = this.getDocumentDefinition(data, utilityObj, uniqueZone);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any, utilityObj: any, uniqueZone: any) {
    return {
      info: {
        title: 'Ministry Details By Ministry',
        author: 'BillonWeb',
        subject: 'Ministry Details By Ministry',
        keywords: 'keywords for document',
        //creationDate: Date.now(),
      },
      pageSize: 'A4',
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
      header: this.getHeading(data, utilityObj),
      content: [
        this.getMinistry(data, utilityObj, uniqueZone),
      ],
      pageMargins: ministryDetailsPageMargin,
      defaultStyle: ministryDetailsDefaultStyle,
      styles: ministryDetailsStyle
    }
  }

  private getMinistry(data: any, utilityObj: any, uniqueZone: any) {
    let grandPrinTotal = 0;
    let grandVatRecTotal = 0;
    let grandLpsRecTotal = 0;
    let grandBillTotal = 0;
    const phase = {
      margin: [0, -50, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [25, 120, 125, 'auto', 'auto', '*','auto', 'auto', 'auto', 45, 'auto'],

        //headerRows: 6,
        body: [
          [
            {
              text: '',
              style: ['setLeft'],
              border: [false, false, false, false],
              colSpan: 11
            }, {},
            {
              text: "",
              style: ['setLeft', 'setBold'],
              border: [false, false, false, false],
            }, {}, {}, {},{}, {}, {}, {}, {}
          ],
          // row 7
          [
            {
              text: "",
              style: ['setLeft'],
              colSpan: 11,
              border: [false, false, false, false]
            }, {},
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
            {
              text: "",
              style: ['setRight']
            },
          ],
        ]
      },
      layout: this.setTableStyles()
    };

    let uniqueZones = [...new Set(data.map(item => item.zoneName
      ))];
      
      uniqueZones?.forEach(item =>{
      let lCurrentBillTotal = 0;
      let lPrinTotal = 0;
      let lVatRecTotal = 0;
      let lLpsRecTotal = 0;
      let lBillTotal = 0;
      let sl =1;
      let zoneName = data.filter(x=> x.zoneName == item);
      if(item){
        phase.table.body.push(
          [
            {
              text:`Zone - ${item}`,
              style: ['setLeft', 'setLocationBold2'],
              border: [true, true, false, true],
              colSpan: 2,
            },
            {
              text: '',
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, false, true],
            },
            {
              text: "",
              style: ['setLeft', 'setLocationBold2'],
              border: [false, true, true, true],
            }
          ]
        )
    
      phase.table.body.push([
              {
                text: "Sl",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
               {
                text: "Customer Name",
                style: ['setBold'],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: "Address",
                style: ['setBold']
              },
              {
                text: "Customer Num",
                style: ['setBold']
              },
              {
                text: "Location",
                style: ['setBold'],
              },
              {
                text: "Location Desc",
                style: ['setBold'],
              },
              {
                text: "NOM",
                style: ['setBold'],
              },
              {
                text: "Principal"
                , style: ['setBold'],
              },
              {
                text: "Lps"
                , style: ['setBold'],
              },
              {
                text: "Vat"
                , style: ['setBold'],
              },
              {
                text: "Total",
                style: ['setBold']
              },
            ])
          
        zoneName.forEach(value => {
       

        const {  customerName,address,consumerno,locationCode,locationDesc,ministryName,ministryCode,zoneName,nom,prn,lps,vat,total} = value;
        if(value.zoneName){
        if (value.zoneName?.toUpperCase() == item?.toString().toUpperCase()){
          //if ('Chittagong'.toUpperCase() == item.name.toUpperCase()){
          lPrinTotal += prn;
          lVatRecTotal += vat;
          lLpsRecTotal += lps;
          lBillTotal += total;
          phase.table.body.push([
            {
              text: (sl++).toString() ?? "",
              style: ['setRight'],
              colSpan: 1,
              border: [true, true, true, true]
            }, {

              text:  `${customerName}`,
              style: ['setLeft'],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text:  `${address}`,
            },
            {
              text: `${consumerno ? consumerno : " "}`,
            },
            {
              text: `${locationCode}`,

            },
            {
              text: `${locationDesc ?? " "}`,

            },
            {
              text: `${nom}`,

            },
            {
              text: `${prn ? Number(prn).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
            {
              text: `${lps ? Number(lps).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
            {
              text: `${vat ? Number(vat).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
            {
              text: `${total ? Number(total).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight']
            },
          ])
        }
      }
      })
      phase.table.body.push([
            {
              text: "Zone Total",
              style: ['setRight', 'setBold', 'setBig'],
              colSpan: 6,
              border: [true, true, true, true]
            }, {}, {}, {}, {}, {},{},
            {
              text: `${lPrinTotal ? Number(lPrinTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${lLpsRecTotal ? Number(lLpsRecTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${lVatRecTotal ? Number(lVatRecTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
            {
              text: `${lBillTotal ? Number(lBillTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
              style: ['setRight', 'setBold']
            },
          ]);
        }
      grandPrinTotal += lPrinTotal;
      grandVatRecTotal += lVatRecTotal;
      grandLpsRecTotal += lLpsRecTotal;
      grandBillTotal += lBillTotal;
    });
    
    phase.table.body.push([
      {
        text: "Grand Total",
        style: ['setRight', 'setBold', 'setBig'],
        colSpan: 6,
        border: [true, true, true, true]
      }, {}, {}, {}, {}, {},{},
      {
        text: `${grandPrinTotal ? Number(grandPrinTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandLpsRecTotal ? Number(grandLpsRecTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandVatRecTotal ? Number(grandVatRecTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
      {
        text: `${grandBillTotal ? Number(grandBillTotal).toLocaleString(undefined, { minimumFractionDigits: 2 }) : 0.00}`,
        style: ['setRight', 'setBold']
      },
    ])
    return phase;
  }

  private getHeading(data: any, utilityObj: any) {
    const totalCount = data.length;
    const phase = {
      margin: ministryDetailsHeaderMargin,
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 50],
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
              margin: ministryDetailsImageMargin,
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
              text: 'BANGLADESH POWER DEVELOPMENT BOARD',
              style: [setHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],

          // row 4
          [
            {},
            {},
            {
              text: `Accounts Receivable As On ${utilityObj.billMonth ?? data[0]?.billcycleCode}`,
              style: [setSubHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // row 5
          [
            {},
            {},
            {
              text: '(Govt., Semi Govt., Autonomous & Corporation)',
              style: [setSubHeading],
              colSpan: 6,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {},
          ],
          // // row 3
          [
            {},
            {},
            {},
            {
              text: `${utilityObj.ministry.code == '0' ? 'All Ministry' : utilityObj.ministry.name} \n`,
              //text: `${ 'All Ministry' } \n`,
              style: ['setSubHeading'],
              colSpan: 4,
            },
            {},
            {},
            {},
            {
              text: `Total Customer: ${totalCount}`,
              style: [setSubHeading],
              colSpan: 3,
              bold: false
            },
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
  private setTableStyles() {
    return {
      paddingTop: function (i, node) { return 5; },
      paddingBottom: function (i, node) { return 5; },
    }
  }
}
