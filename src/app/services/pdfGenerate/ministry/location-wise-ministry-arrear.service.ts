import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class LocationWiseMinistryArrearService {

  defaultColor = '#111';

  constructor() { }

  generatePdf(data: any, reportObj: any) {
    //@ts-ignore
   pdfMake.fonts = setPdfMakeFonts;

   const documentDefinition = this.getDocumentDefinition(data,reportObj);
    //@ts-ignore
   return pdfMake.createPdf(documentDefinition);
 }

 private getDocumentDefinition(data: any, reportObj: any) {
  return {
    info: {
      title: 'Location Wise Ministry Arrear Summary Report',
      author: 'BPDB',
      subject: 'Location Wise Ministry Arrear Summary Report',
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

    header: this.getLocationWiseMinistrySummaryHeading(data,reportObj),
    background: function (currentPage, pageSize) {
      return [
        {
          //   canvas: [
          //     // { type: 'line', x1: 5, y1: 5, x2: 590, y2: 5, lineWidth: 1 }, //Up line
          //     // { type: 'line', x1: 5, y1: 5, x2: 5, y2: 835, lineWidth: 1 }, //Left line
          //     { type: 'line', x1: 5, y1: 807.5, x2: 500, y2: 807.5, lineWidth: 1 }, //Bottom line
          //     // { type: 'line', x1: 590, y1: 5, x2: 590, y2: 835, lineWidth: 1 }, //Rigth line
          //   ],
          // svg: `<svg height="820" width="445">
          //   <line x1="-80" y1="795.8" x2="138.2" y2="795.8" style="stroke:#111;stroke-width:1" />
          // </svg>`

        }
      ]
    },
    content: [
      this.getLocationWiseMinistrySummaryReport(data, reportObj)
    ],
    pageMargins: [30, 120, 30, 30],
    defaultStyle: {
      font: 'bangla',
      alignment: 'center',
      fontSize: 7.4,
      color: '#111',
    },
    styles: setPouroshovaAndCityStyle,
  };
}

private translateNumber(num, option = 1) {
  let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  if (option == 1) {
    num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
  return num.toString().replace(/\d/g, x => banglaDigits[x]);
}

private getLocationWiseMinistrySummaryHeading(data: any, reportObj: any){
  const noWorshipTotal= data.reduce((acc, o) => acc + parseInt(o.consumerNo), 0);
  console.log("No of Worship : ",noWorshipTotal);
  
  let decreateDate = dayjs(reportObj.billMonth).add(-1, 'month').format('YYYYMM');
  let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
  let month = this.getBanglaMonth(decreateDate);

    const phase = {
      margin: [0, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
        headerRows: 2,
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
              margin: [-210, 0, 0, 0],
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
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              margin: [-90, -2, 0, 0],
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
              text: `বকেয়া এবং আদায়ের হালনাগাদ তথ্য`,
              style: [setSubHeading],
              margin: [-90, -2, 0, 0],
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
              text: `${month}-${year} ইং পর্যন্ত`,
              style: [setSubSetHeading],
              margin: [-90, -2, 0, 0],
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
            {
              text: `জোনের নামঃ- বিতরণ ${data[0].zoneNameBn} অঞ্চল, বিউবো, ${data[0].zoneNameBn}।`,
              style: [setSubSetHeading, 'setLeft'],
              margin: [30, 20, 0, 0],
              colSpan: 5,
            },
            {},
            {},
            {},
            {},
            {},
            {},
            {
              text: `সর্বমোট গ্রাহক: ${this.translateNumber(noWorshipTotal, 2)}`,
              style: [setSubSetHeading,],
              margin: [-150, 20, 0, 0],
              colSpan: 3,
            },
            {},
            {},
          ],
        ],
      },
      layout: 'noBorders',
    };
    return phase;
}

  private getLocationWiseMinistrySummaryReport(data: any, reportObj: any){
    const phases = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 2,
        widths: [20, '*', 60, 90, 70, 70, 90,90],
        body: [
          [
            {
              text: `ক্রঃ নং`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `দপ্তরের নাম`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1
            },
            // {
            //   text: `সার্কেলের নাম`,
            //   style: ['setBlack', 'setBold'],
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   margin: []
            // },
            {
              text: `গ্রাহক সংখ্যা`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `মন্ত্রণালয়ওয়ারী বকেয়ার পরিমান`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `সর্বশেষ বিল মাসের নাম`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `বিলের পরিমান`,
              style: ['setBlack'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `আদায়ের পরিমান`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: `মোট বকেয়ার পরিমান`,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
          ],
          [
            {
              text: '১',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '২',
              style: ['setBlack'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 1
            },
            {
              text: '৩',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৪',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৫',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৬',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৭',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
            {
              text: '৮=৪+৬-৭',
              style: ['setBlack'],
              border: [true, true, true, true],
            },
          ],
        ]
      }
    }

    let GrandConsumerTotal = 0;
    let GrandMinistryArrAmtTotal = 0;
    let GrandCurrentBillAmtTotal = 0;
    let GrandTotalReceiptAmt = 0;
    let GrandArrAfterReceiptAmtTotal = 0;

    const uniqueZone = [...new Set(data.map(item => item.zoneNameBn))];
    uniqueZone.forEach(zoneNameList => {
      let circleConsumerTotalZone = 0;
      let circleMinistryArrAmtTotalZone = 0;
      let circleCurrentBillAmtTotalZone = 0;
      let circleTotalReceiptAmtZone = 0;
      let circleArrAfterReceiptAmtTotalZone = 0;
      let zone = data.filter(x => x.zoneNameBn == zoneNameList);
      if(zoneNameList){
        phases.table.body.push(
          [
            {
              text: `${zoneNameList} জোন`,
              style: ['setBlack', 'setLeft', 'setBold'],
              border: [true, true, true, true],
              colSpan: 8,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            // {
            //   text: ``,
            //   style: ['setBlack', 'setBold'],
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   margin: []
            // },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
            {
              text: ``,
              style: ['setBlack', 'setBold'],
              border: [true, true, true, true],
              colSpan: 1,
              margin: []
            },
          ]
        );
      }

    let circleSerial = 0;
    let uniqueCircle = [...new Set(zone.map(item => item.circleName || item.zoneNameBn))]
    console.log(uniqueCircle);
    
    uniqueCircle.forEach(circleNameList => {
      let circle = data.filter(x => x.circleName == circleNameList);
      console.log(circle);
      let uniqueLocation = [...new Set(circle.map(item => item.locationCode || item.circleCode))];
      circleSerial++;
      phases.table.body.push(
        [
          {
            text: `${this.translateNumber(circleSerial, 2)}`,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `${circleNameList}`,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 7
          },
          // {
          //   text: ``,
          //   style: ['setBlack', 'setLeft', 'setBold'],
          //   border: [true, true, true, true],
          //   colSpan: 1
          // },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
        ]
      );

      let locSerial = 0;
      let nameOfCircle;
      let circleConsumerTotal = 0;
      let circleministryArrearAmtTotal = 0;
      let circleCurrentBillAmtTotal = 0;
      let circleTotalReceiptAmt = 0;
      let circleArrAfterReceiptAmt = 0;

      let previousReceiptArrear=0;
      let currentMonthBill=0;
      let totalReceiptAmount=0;
      let currentReceiptArrear=0;

      uniqueLocation.forEach(element => {
        let ministryData = data.filter(x=> x.locationCode == element);
        locSerial++;
        ministryData.forEach(value => {
          let { ministryArrearAmt, prevArrearAmt, currMonthBill, totalCollection,totalArrearAmt } = value;
          // prevArrearAmt
          // currMonthBill
          // totalCollection
          // totalArrearAmt
          // PrevArrearAmt
          // CurrMonthBill
          // TotalCollection
          // TotalArrearAmt
          // previousReceiptArrear=ministryArrearAmt-totalReceiptArrear;
          // currentMonthBill=currentBillAmt;
          // totalReceiptAmount=totalReceipt;
          // currentReceiptArrear=previousReceiptArrear+currentMonthBill-totalReceiptAmount;
          
          previousReceiptArrear=prevArrearAmt;
          currentMonthBill=currMonthBill;
          totalReceiptAmount=totalCollection;
          currentReceiptArrear=totalArrearAmt;


          nameOfCircle = value.circleName;
          circleConsumerTotal += value.consumerNo;
          circleministryArrearAmtTotal += previousReceiptArrear;
          circleCurrentBillAmtTotal += currentMonthBill;
          circleTotalReceiptAmt += totalReceiptAmount;
          circleArrAfterReceiptAmt += currentReceiptArrear;

          phases.table.body.push(
            [
              {
                text: `${this.translateNumber(locSerial, 2)}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${value.locationNameBn}`,
                style: ['setBlack', 'setLeft'],
                border: [true, true, true, true],
                colSpan: 1
              },
              // {
              //   text: `${value.circleName}`,
              //   style: ['setBlack', 'setLeft'],
              //   border: [true, true, true, true],
              //   colSpan: 1
              // },
              {
                text: `${this.translateNumber(value.consumerNo, 2)}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${this.translateNumber(previousReceiptArrear.toFixed(2))}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${this.translateNumber(value.billMonth, 2)}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${this.translateNumber(currentMonthBill.toFixed(2))}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${this.translateNumber(totalReceiptAmount.toFixed(2))}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
              {
                text: `${this.translateNumber(currentReceiptArrear.toFixed(2))}`,
                style: ['setBlack', 'setRight'],
                border: [true, true, true, true],
                colSpan: 1
              },
            ]
          );
        });
      });

      phases.table.body.push(
        [
          {
            text: `${nameOfCircle} সার্কেলের মোট`,
            style: ['setBlack', 'setCenter', 'setBold'],
            border: [true, true, true, true],
            colSpan: 2
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          // {
          //   text: ``,
          //   style: ['setBlack', 'setLeft', 'setBold'],
          //   border: [true, true, true, true],
          //   colSpan: 1
          // },
          {
            text: `${this.translateNumber(circleConsumerTotal, 2)}`,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `${this.translateNumber(circleministryArrearAmtTotal)}`,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: ``,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `${this.translateNumber(circleCurrentBillAmtTotal)}`,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `${this.translateNumber(circleTotalReceiptAmt)}`,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
          {
            text: `${this.translateNumber(circleArrAfterReceiptAmt)}`,
            style: ['setBlack', 'setRight', 'setBold'],
            border: [true, true, true, true],
            colSpan: 1
          },
        ]
      );

      circleConsumerTotalZone += circleConsumerTotal;
      circleMinistryArrAmtTotalZone += circleministryArrearAmtTotal;
      circleCurrentBillAmtTotalZone += circleCurrentBillAmtTotal;
      circleTotalReceiptAmtZone += circleTotalReceiptAmt;
      circleArrAfterReceiptAmtTotalZone += circleArrAfterReceiptAmt;
    })

    phases.table.body.push(
      [
        {
          text: `${zoneNameList} জোনের মোট`,
          style: ['setBlack', 'setCenter', 'setBold'],
          border: [true, true, true, true],
          colSpan: 2
        },
        {
          text: ``,
          style: ['setBlack', 'setLeft', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        // {
        //   text: ``,
        //   style: ['setBlack', 'setLeft', 'setBold'],
        //   border: [true, true, true, true],
        //   colSpan: 1
        // },
        {
          text: `${this.translateNumber(circleConsumerTotalZone, 2)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(circleMinistryArrAmtTotalZone)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(circleCurrentBillAmtTotalZone)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(circleTotalReceiptAmtZone)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(circleArrAfterReceiptAmtTotalZone)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
      ]
    );

    if(zoneNameList != uniqueZone[uniqueZone.length -1]){
      phases.table.body.push(
        [
          {
            text: ``,
            style: ['setBlack', 'setCenter'],
            border: [],
            colSpan: 1,
            margin: [0, 7, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setLeft'],
            border: [],
            colSpan: 1,
            margin: [0, 7, 0, 0]
          },
          // {
          //   text: ``,
          //   style: ['setBlack', 'setLeft'],
          //   border: [],
          //   colSpan: 1,
          //   margin: [0, 5, 0, 0]
          // },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
          {
            text: ``,
            style: ['setBlack', 'setRight'],
            border: [],
            colSpan: 1,
            margin: [0, 8, 0, 0]
          },
        ]
      );
    }

    GrandConsumerTotal += circleConsumerTotalZone;
    GrandMinistryArrAmtTotal += circleMinistryArrAmtTotalZone;
    GrandCurrentBillAmtTotal += circleCurrentBillAmtTotalZone;
    GrandTotalReceiptAmt += circleTotalReceiptAmtZone;
    GrandArrAfterReceiptAmtTotal += circleArrAfterReceiptAmtTotalZone;
    });
    
    phases.table.body.push(
      [
        {
          text: ` সর্বমোট `,
          style: ['setBlack', 'setCenter', 'setBold'],
          border: [true, true, true, true],
          colSpan: 2
        },
        {
          text: ``,
          style: ['setBlack', 'setLeft', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        // {
        //   text: ``,
        //   style: ['setBlack', 'setLeft', 'setBold'],
        //   border: [true, true, true, true],
        //   colSpan: 1
        // },
        {
          text: `${this.translateNumber(GrandConsumerTotal, 2)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(GrandMinistryArrAmtTotal)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: ``,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(GrandCurrentBillAmtTotal)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(GrandTotalReceiptAmt)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
        {
          text: `${this.translateNumber(GrandArrAfterReceiptAmtTotal)}`,
          style: ['setBlack', 'setRight', 'setBold'],
          border: [true, true, true, true],
          colSpan: 1
        },
      ]
    );
    return phases;
  }
  private getBanglaMonth(billMonth: string): string{
    let month='';
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
    return month;
  }
}
