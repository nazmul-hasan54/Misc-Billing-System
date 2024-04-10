import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import pdfMake from 'pdfmake/build/pdfmake';
import { miscDefaultStyle, misMinistrySummaryHeaderMargin, misMinistrySummaryPageMargin, misMinistrySummaryStyle, setAllCustomerArrearStyle, setHeading, setMosqueAndOtherPlacesStyles, setPdfMakeFonts, setSubHeading, setSubSetHeading, ZoneCircleWiseAllReligiousPageMarginStyle } from '../config/pdfMakeConfig';

@Injectable({
  providedIn: 'root'
})
export class MonthWiseReligiousReportService {

  defaultColor = "";

  constructor() { }

  generatePdf(data: any,reportObj:any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    const documentDefinition = this.getDocumentDefinition(data,reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any,reportObj:any){
    return {
      info: {
        title: 'Month Wise Religious Report',
        author: 'BPDB',
        subject: 'Month Wise Religious Report',
        keywords: 'keywords for document',
      },
      pageSize: 'A4',
      //pageOrientation: 'portrait',
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
      // header: this.getHeading(data,reportObj),
      // content: this.getReligiousReport(data,reportObj),
      content: [this.getHeading(data, reportObj),this.getReligiousReport(data, reportObj)],
      defaultStyle: miscDefaultStyle,
      pageMargins: [20, 20, 20, 20],
      styles: setAllCustomerArrearStyle,
    }
  }

  private getHeading(data: any,reportObj:any){
    const noWorshipTotal= data.reduce((acc, o) => acc + parseInt(o.consumerCount), 0);
    console.log(noWorshipTotal);
 
    const phase = {
      // margin: [0, 30, 0, 0],
      table: {
        dontBreakRows: true,
        //headerRows: 2,
        widths: [70, '*', 33, 70, 70, 70,70],
        // margin: [0, 0, 20, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              rowSpan: 3,
              colSpan: 2,
              alignment: 'right',
              margin: [70, -10, 0, 0],
            },
            {},
            {
              text: 'Bangladesh Power Development Board',
              style: [setHeading],
              colSpan: 5,
              margin: [-200, 0, 0, 0],
            },
            {},
            {},
            {},
            {},
          ],
          [
            {},
            {},
            {
              text: 'Mosque & other Places of Worship (Rebait Customer)',
              style: [setSubHeading],
              colSpan: 5,
              margin: [-200, 0, 0, 0],
            },
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
            {
              border: [true, true, true, true],
              text: `Total Worship : ${noWorshipTotal}`,
              style: [setSubSetHeading],
              colSpan: 3,
              margin: [70, 10, 0, 0]
            },
            {},
            {}
          ]
        ],
      },
      layout: 'noBorders'
    };
    return phase;
  }

  private getReligiousReport(data: any,reportObj:any){
    // let finscalYearNam=finscalYearName;

    let billMonth = reportObj.billMonth;
    let year = (dayjs(billMonth).format("YYYY"));
    let month: string;
 
    switch (dayjs(billMonth).format("M")) {
     case "1": {
       month = "January"
       break
     }
     case "2": {
       month = "February"
       break
     }
     case "3": {
       month = "March"
       break
     }
     case "4": {
       month = "April"
       break
     }
     case "5": {
       month = "May"
       break
     }
     case "6": {
       month = "June"
       break
     }
     case "7": {
       month = "July"
       break
     }
     case "8": {
       month = "August"
       break
     }
     case "9": {
       month = "September"
       break
     }
     case "10": {
       month = "October"
       break
     }
     case "11": {
       month = "November"
       break
     }
     case "12":
     default:
       {
         month = "December"
         break
       }
   }
   
    const phase ={
      margin:[0,-20,0,0],
      table: {
        widths: [20, '*', 33, 25, 'auto', 'auto','auto','auto','auto',50],
        //Heading
        body:[
          [
            {
              border: [true, true, true, true],
              text: `For The Month ${month}-${year}`,
              // text: `For The Year ${finscalYearNam}`,
              style: [setMosqueAndOtherPlacesStyles.setBold,setMosqueAndOtherPlacesStyles.fontSize],
              alignment: 'center',
              colSpan: 10,
              //lineHeight: 2,
              //margin: [0, 10, 0, 0]
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
            // {},
          ],
          [
            {
              text: 'Sl No',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:3,
              style: [setAllCustomerArrearStyle.boldText, ''],
              alignment: 'center',
              margin: [0, 25, 0, 0],
              
            },
            {
              text: 'Name of Zone/Circle/Esu',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:3,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 25, 0, 0],
            },
            {
              text: 'No. of Worship',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:3,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 25, 0, 0],
            },
            {
              text: 'Sanction Unit',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:3,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 25, 0, 0],
            },
            {
              text: 'Per Unit Rate',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:3,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 25, 0, 0],
            },
            {
              text:'Billed Amount',
              border: [true, true, true, true],
              colSpan: 5,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            // {
            //   text:'Note',
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   rowSpan:3,
            //   style: [setAllCustomerArrearStyle.boldText, ''],
            //   margin: [0, 0, 0, 0],
            // }
          ],
          [
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              heights: 2, 
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'Principal Amount',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:2,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 15, 0, 0],
            },
            {
              text:'Demand Charge',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'Amount Before Vat',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:2,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 15, 0, 0],
            },
            {
              text:'Vat',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'Total',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            // {
            //   text:'Note',
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   rowSpan:1,
            //   style: [setAllCustomerArrearStyle.boldText, ''],
            //   margin: [0, 0, 0, 0],
            // }
          ],
          [
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              heights: 2, 
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text: '',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:`${data[0].demandRate}`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'5%',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            {
              text:'Billed Amount',
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText, ''],
              margin: [0, 0, 0, 0],
            },
            // {
            //   text:'',
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   rowSpan:1,
            //   style: [setAllCustomerArrearStyle.boldText, ''],
            //   margin: [0, 0, 0, 0],
            // }
          ],
        ]
      },
      layout: this.setTableBorder(),
    };


    let grandNoWorshipTotal=0;
    let grandPrnTotal=0;
    let grandVatTotal=0;
    let grandWithoutVatTotal=0;
    let grandDemandAmountTotal = 0;
    let grandTotalAmount=0;

    let locSerial = 0;
    const uniqueZone = [...new Set(data.map(item => item.zoneName))];
    uniqueZone.forEach(zoneCodeItem=>{
      let circlePrnTotalZone = 0;
      let circleNoOfWorshipZone = 0;
      let circleWithoutVatTotalZone = 0;
      let circleVatTotalZone = 0;
      let circleAmountTotalZone = 0;
      let circleDemandAmountTotalZone=0;
      let zone = data.filter(x=> x.zoneName == zoneCodeItem);
      
      if(zoneCodeItem){
        phase.table.body.push(
        [
          {
            text: `${zoneCodeItem}`,
            border: [true, true, true, true],
            colSpan: 2,
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText, 'setBig3'],
            margin: [0, 0, 0, 0],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
            //alignment: 'left',
            margin: [0, 0, 0, 0],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
            margin: [0, 0, 0, 0],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
            margin: [0, 0, 0, 0],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          {
            text: ``,
            border: [true, true, true, true],
            colSpan: 1,
            margin: [0, 0, 0, 0],
            rowSpan:1,
            style: [setAllCustomerArrearStyle.boldText],
          },
          // {
          //   text: `Months`,
          //   border: [true, true, true, true],
          //   colSpan: 1,
          //   margin: [0, 0, 0, 0],
          //   rowSpan:1,
          //   style: [setAllCustomerArrearStyle.boldText],
          // },
      
        ]);

        let circleSerial = 0;
        const uniqueCircleCode=[...new Set(zone.map(item=>item.circleCode || item.zoneName))];
        uniqueCircleCode.forEach(circleCodeitem =>{
          let circle=data.filter(x=>x.circleCode===circleCodeitem);
          let uniqueLocation=[...new Set(circle.map(item=>item.locationCode || item.circleCode))]
            circleSerial++;
            phase.table.body.push(
              [
                {
                  text: `${circleSerial}`,
                  border: [true, true, true, true],
                  colSpan: 1,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: `${circle[0].circleName} (O & M) Circle`,
                  border: [true, true, true, true],
                  colSpan: 1,
                  rowSpan:1,
                  //alignment: 'left',
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 7,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                {
                  text: ``,
                  border: [true, true, true, true],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                },
                // {
                //   text: ``,
                //   // text: `${data[0].countMonth}`,
                //   border: [true, true, true, true],
                //   colSpan: 1,
                //   margin: [0, 0, 0, 0],
                //   rowSpan:1,
                //   style: [setAllCustomerArrearStyle.boldText, 'setBig2'],
                // },
            
              ]);

              let nameOfCircle;
              let locSerial = 0;
              let noWorshipTotal=0;
              let circlePrnTotal = 0;
              let circleWithoutVatTotal = 0;
              let circleVatTotal = 0;
              let circleAmountTotal = 0;
              let circleDemandAmountTotal = 0;

              uniqueLocation.forEach(element => {
                let religiousList = data.filter(x=> x.locationCode == element);
                locSerial++;

                religiousList.forEach(value => {
                  // const setMonth = value.setupMonth;
                  // const { startMonth, startYear, endMonth, endYear } = this.extractMonthAndYear(setMonth);
                  // let sMonth = dayjs(startMonth).format("MMM");
                  // let sYear = dayjs(startYear).format("YY");
                  // let eMonth = dayjs(endMonth).format("MMM");
                  // let eYear = dayjs(endYear).format("YY");
                  
                  
                  nameOfCircle = value.circleName;
                  noWorshipTotal += Number(value.consumerCount);
                  circlePrnTotal += value.principal;
                  circleDemandAmountTotal += value.demandAmount;
                  circleVatTotal += value.vatAmount;
                  circleWithoutVatTotal += (value.withoutVat ?? 0);
                  circleAmountTotal += value.totalAmount;

                  phase.table.body.push(
                    [
                      {
                        text: `${locSerial}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        rowSpan:1,
                        margin: [0, 0, 0, 0],
                        style: [],
                      },
                      {
                        text: `${value.locationDesc}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        rowSpan:1,
                        alignment: 'left',
                        margin: [0, 0, 0, 0],
                        style: [],
                      },
                      {
                        text: `${value.consumerCount}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        rowSpan:1,
                        margin: [0, 0, 0, 0],
                        style: [],
                      },
                      {
                        text: `${value.rebaitUnit}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        rowSpan:1,
                        margin: [0, 0, 0, 0],
                        style: [],
                      },
                      {
                        text: `${value.tariffRate}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      {
                        text: `${value.principal}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      {
                        text: `${value.demandAmount}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      {
                        text: `${value.withoutVat}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      {
                        text: `${value.vatAmount}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      {
                        text: `${value.totalAmount}`,
                        border: [true, true, true, true],
                        colSpan: 1,
                        margin: [0, 0, 0, 0],
                        rowSpan:1,
                        style: ['setRight'],
                      },
                      // {
                      //   text: ``,
                      //   // text: `${sMonth} ${sYear} - ${eMonth} ${eYear}`,
                      //   border: [true, true, true, true],
                      //   colSpan: 1,
                      //   margin: [0, 0, 0, 0],
                      //   rowSpan:1,
                      //   style: [],
                      // },
                  
                    ]);
                })
              })

              phase.table.body.push(
                [
                  {
                    text: `Total of ${nameOfCircle} (O & M) Circle`,
                    border: [true, true, true, true],
                    colSpan: 2,
                    rowSpan:1,
                    margin: [0, 0, 0, 0],
                    style: [setAllCustomerArrearStyle.boldText],
                  },
                  {
                    text: ``,
                    border: [true, true, true, true],
                    colSpan: 1,
                    rowSpan:1,
                    alignment: 'left',
                    margin: [0, 0, 0, 0],
                    style: [setAllCustomerArrearStyle.boldText],
                  },
                  {
                    text: `${noWorshipTotal}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    rowSpan:1,
                    margin: [0, 0, 0, 0],
                    style: [setAllCustomerArrearStyle.boldText],
                  },
                  {
                    text: ``,
                    border: [true, true, true, true],
                    colSpan: 1,
                    rowSpan:1,
                    margin: [0, 0, 0, 0],
                    style: [setAllCustomerArrearStyle.boldText],
                  },
                  {
                    text: ``,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText],
                  },
                  {
                    text: `${circlePrnTotal}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText,'setRight'],
                  },
                  {
                    text: `${circleDemandAmountTotal}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText,'setRight'],
                  },
                  {
                    text: `${circleWithoutVatTotal}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText,'setRight'],
                  },
                  {
                    text: `${circleVatTotal.toFixed(2)}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText,'setRight'],
                  },
                  {
                    text: `${circleAmountTotal.toFixed(2)}`,
                    border: [true, true, true, true],
                    colSpan: 1,
                    margin: [0, 0, 0, 0],
                    rowSpan:1,
                    style: [setAllCustomerArrearStyle.boldText,'setRight'],
                  },
                  // {
                  //   text: ``,
                  //   border: [true, true, true, true],
                  //   colSpan: 1,
                  //   margin: [0, 0, 0, 0],
                  //   rowSpan:1,
                  //   style: [setAllCustomerArrearStyle.boldText],
                  // },
              
                ]);
              
              if(circleCodeitem != uniqueCircleCode[uniqueCircleCode.length - 1]){
                phase.table.body.push(
                  [
                    {
                      text: ``,
                      border: [],
                      colSpan: 0,
                      rowSpan:1,
                      margin: [0, 0, 0, 0],
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      rowSpan:1,
                      alignment: 'left',
                      margin: [0, 0, 0, 0],
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      rowSpan:1,
                      margin: [0, 0, 0, 0],
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      rowSpan:1,
                      margin: [0, 0, 0, 0],
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    {
                      text: ``,
                      border: [],
                      colSpan: 1,
                      margin: [0, 0, 0, 0],
                      rowSpan:1,
                      style: [setAllCustomerArrearStyle.boldText],
                    },
                    // {
                    //   text: ``,
                    //   border: [],
                    //   colSpan: 1,
                    //   margin: [0, 0, 0, 0],
                    //   rowSpan:1,
                    //   style: [setAllCustomerArrearStyle.boldText],
                    // },
                
                  ]);
              }

              circlePrnTotalZone += circlePrnTotal;
              circleNoOfWorshipZone += noWorshipTotal;
              circleDemandAmountTotalZone += circleDemandAmountTotal;
              circleVatTotalZone += circleVatTotal;
              circleWithoutVatTotalZone += circleWithoutVatTotal;
              circleAmountTotalZone += circleAmountTotal;
        }) 

        phase.table.body.push(
          [
            {
              text: `Total of ${zoneCodeItem} Zone`,
              border: [true, true, true, true],
              colSpan: 2,
              rowSpan:1,
              margin: [0, 0, 0, 0],
              style: [setAllCustomerArrearStyle.boldText],
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              alignment: 'left',
              margin: [0, 0, 0, 0],
              style: [setAllCustomerArrearStyle.boldText],
            },
            {
              text: `${circleNoOfWorshipZone}`,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              margin: [0, 0, 0, 0],
              style: [setAllCustomerArrearStyle.boldText],
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              rowSpan:1,
              margin: [0, 0, 0, 0],
              style: [setAllCustomerArrearStyle.boldText],
            },
            {
              text: ``,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText],
            },
            {
              text: `${circlePrnTotalZone}`,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText,'setRight'],
            },
            {
              text: `${circleDemandAmountTotalZone}`,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText,'setRight'],
            },
            {
              text: `${circleWithoutVatTotalZone}`,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText,'setRight'],
            },
            {
              text: `${circleVatTotalZone.toFixed(2)}`,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText,'setRight'],
            },
            {
              text: `${circleAmountTotalZone.toFixed(2)}`,
              border: [true, true, true, true],
              colSpan: 1,
              margin: [0, 0, 0, 0],
              rowSpan:1,
              style: [setAllCustomerArrearStyle.boldText,'setRight'],
            },
            // {
            //   text: ``,
            //   border: [true, true, true, true],
            //   colSpan: 1,
            //   margin: [0, 0, 0, 0],
            //   rowSpan:1,
            //   style: [setAllCustomerArrearStyle.boldText],
            // },
        
          ]);

          if(zoneCodeItem != uniqueZone[uniqueZone.length - 1]){
            phase.table.body.push(
              [
                {
                  text: ``,
                  border: [],
                  colSpan: 0,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  rowSpan:1,
                  alignment: 'left',
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  rowSpan:1,
                  margin: [0, 0, 0, 0],
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                {
                  text: ``,
                  border: [],
                  colSpan: 1,
                  margin: [0, 0, 0, 0],
                  rowSpan:1,
                  style: [setAllCustomerArrearStyle.boldText],
                },
                // {
                //   text: ``,
                //   border: [],
                //   colSpan: 1,
                //   margin: [0, 0, 0, 0],
                //   rowSpan:1,
                //   style: [setAllCustomerArrearStyle.boldText],
                // },
            
              ]);
          }

          grandPrnTotal += circlePrnTotalZone;
          grandNoWorshipTotal += circleNoOfWorshipZone;
          grandDemandAmountTotal += circleDemandAmountTotalZone;
          grandVatTotal += circleVatTotalZone;
          grandWithoutVatTotal += circleWithoutVatTotalZone;
          grandTotalAmount += circleAmountTotalZone;
      } 
    });

    phase.table.body.push(
      [
        {
          text: ``,
          border: [],
          colSpan: 1,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          rowSpan:1,
          alignment: 'left',
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        // {
        //   text: ``,
        //   border: [],
        //   colSpan: 1,
        //   margin: [0, 0, 0, 0],
        //   rowSpan:1,
        //   style: [setAllCustomerArrearStyle.boldText],
        // },
    
      ]);

    phase.table.body.push(
      [
        {
          text: `Grand Total`,
          border: [true, true, true, true],
          colSpan: 2,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan:1,
          alignment: 'left',
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: `${grandNoWorshipTotal}`,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [true, true, true, true],
          colSpan: 1,
          rowSpan:1,
          margin: [0, 0, 0, 0],
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: ``,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText],
        },
        {
          text: `${grandPrnTotal}`,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText,'setRight'],
        },
        {
          text: `${grandDemandAmountTotal}`,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText,'setRight'],
        },
        {
          text: `${grandWithoutVatTotal}`,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText,'setRight'],
        },
        {
          text: `${grandVatTotal.toFixed(2)}`,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText,'setRight'],
        },
        {
          text: `${grandTotalAmount.toFixed(2)}`,
          border: [true, true, true, true],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          rowSpan:1,
          style: [setAllCustomerArrearStyle.boldText,'setRight','setBold'],
        },
        // {
        //   text: ``,
        //   border: [true, true, true, true],
        //   colSpan: 1,
        //   margin: [0, 0, 0, 0],
        //   rowSpan:1,
        //   style: [setAllCustomerArrearStyle.boldText,'setRight',],
        // },
    
      ]);
    return phase;
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
  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
}
