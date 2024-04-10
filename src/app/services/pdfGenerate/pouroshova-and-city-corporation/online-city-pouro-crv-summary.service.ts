import { Injectable } from '@angular/core';
import dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { setHeading, setPdfMakeFonts, setPouroshovaAndCityStyle, setSubHeading, setSubSetHeading } from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class OnlineCityPouroCrvSummaryService {

  defaultColor = '#111';
  constructor() { }

  generatePdf(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
    //@ts-ignore
   pdfMake.fonts = setPdfMakeFonts;

   const documentDefinition = this.getDocumentDefinition(data,reportObj, zoneData, cityCorporationData);
    //@ts-ignore
   return pdfMake.createPdf(documentDefinition);
 }

 private getDocumentDefinition(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
  return {
    info: {
      title: 'Online City Corporation Summary Report',
      author: 'BPDB',
      subject: 'Online City Corporation Summary Report',
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

    header: this.getOnlineMunicipalZoneSummaryHeading(reportObj),
    content: [
      this.getOnlineMunicipalZoneSummaryReport(data, reportObj, zoneData, cityCorporationData)
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

private translateNumber(num, option = 1) {
  let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
  if (option == 1) {
    num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
  }
  return num.toString().replace(/\d/g, x => banglaDigits[x]);
}

private getOnlineMunicipalZoneSummaryHeading(reportObj: any) {
  let billMonth = reportObj;
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
            margin: [-150, 0, 0, 0],
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
          {},
          {},
          {},
        ],
        [
          {},
          {},
          {
            text: [` সিটি কর্পোরেশন ও পৌরসভা বকেয়া বিবরনী`],
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
            text:`${month}/${year} ইং পর্যন্ত`,
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

private getOnlineMunicipalZoneSummaryReport(data: any, reportObj: any, zoneData: any, cityCorporationData: any) {
  console.log("dataonline suymmarry",data);

  const phases = {
    table: {
      dontBreakRows: true,
      headerRows: 2,
      widths: [25, 60, '*', 60, 50,50,65],
      body: [
        [
          {
            text: 'ক্রঃ নং',
            style: ['setBlack'],
            border: [true, true, true, false],
            margin: [0, 0, 0, 0],
          },
          {
            text: 'সংস্থা বা কোম্পানি',
            style: ['setBlack'],
            border: [true, true, true, false],
            margin: [0, 0, 0, 0],
            colSpan: 1,
            rowSpan: 1
          },
          {
            text: 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ',
            style: ['setBlack'],
            border: [true, true, true, false],
            margin: [0, 0, 0, 0],
          },

          {
            text: 'পূর্বের বকেয়ার পরিমান (কোটি টাকায়)',
            style: ['setBlack'],
            border: [true, true, true, false],
            margin: [0, 0, 0, 0],
          },
          {
            text: 'মাসের বিল',
            style: ['setBlack'],
            border: [true, true, true, true],
            margin: [0, 0, 0, 0],
            colSpan: 1
          },
          {
            text: 'মোট আদায় (কোটি টাকায়)',
            style: ['setBlack'],
            border: [true, true, true, true],
          },
          {
            text: 'বর্তমান বকেয়ার পরিমান (কোটি টাকায়)',
            style: ['setBlack'],
            border: [true, true, true, false],
            margin: [0, 0, 0, 0],
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
            text: '৭=(৪+৫-৬)',
            style: ['setBlack'],
            border: [true, true, true, true],
          },
        ],
      ],
    },
  };


  let GrandArrPrevAmount = 0;
  let GrandCurrMonthArrAmount = 0;
  let GrandTotalReceiptAmount = 0;
  let GrandCurrArrAmount = 0;

  let cityCorporation=data.cityCoporationDataList;
  let totalReceiptAmount=0;
  let no = 0;
  let cityLength = data.cityCoporationDataList.length
  let cityInsert = Math.ceil(Number(cityLength / 2));
  let cityNumebr = 0;
  let uniqueCityCorporation=[...new Set(cityCorporation.map(item=>item.cityCorporationCode))];
  let removeNulluniqueCityCorporationData = uniqueCityCorporation.filter(el => {
    return el != null && el != '' && el != ' ';
  });

  let totalReceivableArrearAmount=0;

  let allCityArrPrevAmountTotal = 0;
  let allCityArrMonthAmountTotal = 0;
  let allCityTotalReceiptAmountTotal = 0;
  let allCityCurrArrAmountTotal = 0;

  removeNulluniqueCityCorporationData.forEach((cityCorpo)=>{
      let CityCorporationGroupBy = cityCorporation.filter(x => x.cityCorporationCode == cityCorpo);
      let CityCorporationGroupByLength = CityCorporationGroupBy.length;

      let cityArrPrevAmount = 0;
      let cityArrMonthAmount = 0;
      let cityTotalReceiptAmount = 0;
      let cityCurrArrAmount = 0;
      if(CityCorporationGroupByLength>0){
        CityCorporationGroupBy.forEach(city=>{
          let { cityCorporationNameBn,totalArrearAmount,currReceiptAmt,arrearReceiptAmount,prvReceiptAmt,
            arrearLps, arrearPrincipal, arrearVat, currPrin,
          currLps, currVat, totalReceiptPrincipal, totalReceiptVat,totalReceiptArrear,currReceiptPrincipal,currReceiptVat} = city;
          totalReceivableArrearAmount=(currReceiptAmt+arrearReceiptAmount);

          cityArrPrevAmount = arrearPrincipal+arrearLps+arrearVat- totalReceiptArrear ;
          cityArrMonthAmount = currPrin+currLps+currVat;
          cityTotalReceiptAmount = currReceiptPrincipal + currReceiptVat;
          //cityCurrArrAmount = cityArrPrevAmount + (cityArrMonthAmount - cityTotalReceiptAmount);
          cityCurrArrAmount = cityArrPrevAmount + cityArrMonthAmount-cityTotalReceiptAmount;

          allCityArrPrevAmountTotal+=cityArrPrevAmount;
          allCityArrMonthAmountTotal+=cityArrMonthAmount;
          allCityTotalReceiptAmountTotal+=cityTotalReceiptAmount;
          allCityCurrArrAmountTotal+=cityCurrArrAmount;
          no += 1;

          cityNumebr += 1;
          phases.table.body.push(
            [
              {
                text: `${this.translateNumber(no, 2)}`,
                style: [],
                border: [true, true, true, true]
              },
              {
                text: cityNumebr == cityInsert ? "বাবিউবো" : "",
                style: ['setBlack'],
                border: [false, false, false, false],
                rowSpan: 1,
                // no == ZoneInsert ? (Number(dataGroupLength) - ZoneInsert) :
                colSpan: 1
              },
              {
                text: cityCorporationNameBn ?? '',
                style: ['setBlack', 'setCenter'],
                border: [true, true, true, true],
              },
              {
                text: this.translateNumber(Number(cityArrPrevAmount / 10000000 >0 ? cityArrPrevAmount / 10000000:0).toFixed(4)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(cityArrMonthAmount / 10000000 >0 ? cityArrMonthAmount / 10000000:0).toFixed(4)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(cityTotalReceiptAmount / 10000000 >0 ? cityTotalReceiptAmount / 10000000:0).toFixed(4)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: this.translateNumber(Number(cityCurrArrAmount / 10000000 >0 ? cityCurrArrAmount / 10000000:0).toFixed(3)),
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
            ]
          )
        })
      }
    })

    //Total City Corporation
    phases.table.body.push(
      [
        {
          text: ``, style: [], border: [true, true, true, true]
        },
        {
          text: "মোট",
          style: ['setBlack', 'setCenter', 'setBold'],
          border: [true, true, true, true],
          rowSpan: 1,
          colSpan: 2
        },
        {
          text: '',
          style: ['setBlack', 'setLeft', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(allCityArrPrevAmountTotal / 10000000 >0 ? allCityArrPrevAmountTotal / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(allCityArrMonthAmountTotal / 10000000 >0 ? allCityArrMonthAmountTotal / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(allCityTotalReceiptAmountTotal / 10000000 >0 ? allCityTotalReceiptAmountTotal / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number( allCityCurrArrAmountTotal/ 10000000 >0 ? allCityCurrArrAmountTotal / 10000000:0).toFixed(3)),
          //text: this.translateNumber(Number( allCityCurrArrAmountTotal / 10000000).toFixed(2)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
      ]
    );




    let grandPouroTotalPrevArrAmount = 0;
    let grandPouroCurrMonthArrTotal = 0;
    let grandPouroAbsoluteTotalReceiptAmt = 0;
    let grandPouroTotalCurrArrAmount = 0;

    let zoneList=data.pouroshovaDataList;
    let pouroshovaList=data.pouroshovaDataList;
    let uniqueZone=[...new Set(zoneList.map(item=>item.zoneCode))];
    let valueOfIndexFour = uniqueZone.pop();
    let valueOfIndexThree = uniqueZone.pop();
    uniqueZone.push(valueOfIndexFour);
    uniqueZone.push(valueOfIndexThree);
    let serial = 0;

    uniqueZone.forEach((zone)=>{
      let pouroshovaGroupByZone=pouroshovaList.filter(x=>x.zoneCode==zone);
      let removeNullPouroshovaDataList = pouroshovaGroupByZone.filter(el => {
        return el.pouroshovaCode != null && el.pouroshovaCode != '' && el.pouroshovaCode != ' ';
      });
      let pouroshovaGroupByZoneLength=removeNullPouroshovaDataList.length;
      let providerInsert=Math.ceil(Number(pouroshovaGroupByZoneLength/2));

      let pouroTotalPrevArrAmount = 0;
      let pouroTotalCurrMonthArrTotal = 0;
      let pouroAbsoluteTotalReceiptAmt = 0;
      let pouroTotalCurrArrAmount = 0;
      if(pouroshovaGroupByZoneLength>0){
        let providerNo = 0;
        serial++;
        let pouroReceivableAmount=0;

        let pouroPrevArrAmount = 0;
        let pouroCurrMonthArr = 0;
        let pouroTotalReceiptAmt = 0;
        let pouroCurrArrAmount = 0;
        removeNullPouroshovaDataList.forEach(pouro=>{
          let{pouroNameBn,zoneName,totalArrearAmount,currReceiptAmt,arrearReceiptAmount, arrearLps, arrearPrincipal, arrearVat, currPrin,prvReceiptAmt,
            currLps, currVat, totalReceiptPrincipal, totalReceiptVat,totalReceiptArrear,currReceiptPrincipal,currReceiptVat}=pouro;
          pouroReceivableAmount=(currReceiptAmt+arrearReceiptAmount)
          zoneName = `বাবিউবো, ${zoneName}`
          no += 1;
          providerNo += 1;

          pouroPrevArrAmount = arrearPrincipal+arrearLps+arrearVat-totalReceiptArrear;
          pouroCurrMonthArr = currPrin+currLps+currVat;
          pouroTotalReceiptAmt = currReceiptPrincipal + currReceiptVat;
          //pouroCurrArrAmount = pouroPrevArrAmount + (pouroCurrMonthArr - pouroTotalReceiptAmt);
          pouroCurrArrAmount = pouroPrevArrAmount + pouroCurrMonthArr -pouroTotalReceiptAmt;

          pouroTotalPrevArrAmount+=pouroPrevArrAmount;
          pouroTotalCurrMonthArrTotal+=pouroCurrMonthArr;
          pouroAbsoluteTotalReceiptAmt+=pouroTotalReceiptAmt;
          pouroTotalCurrArrAmount+=pouroCurrArrAmount;

          phases.table.body.push(
            [
              {
                text: `${this.translateNumber(no, 2)}`,
                style: [],
                border: [true, true, true, true]
              },
              {
                border: providerInsert == 1 || providerNo == pouroshovaGroupByZoneLength ? [true, false, true, true] : [true, false, true, false],
                style: ['setBlack'],
                text: `${providerNo == providerInsert ? zoneName : ""}`,
                rowSpan: 1,
                colSpan: 1,
              },
              {
                border: [true, true, true, true],
                style: [],
                text: `${pouroNameBn }`,
                colSpan: 1,
                rowSpan: 1
              },
              {
                text: `${this.translateNumber(Number(pouroPrevArrAmount / 10000000 >0 ? pouroPrevArrAmount / 10000000:0).toFixed(4))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(pouroCurrMonthArr / 10000000 >0 ? pouroCurrMonthArr / 10000000:0).toFixed(4))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(pouroTotalReceiptAmt / 10000000 >0 ? pouroTotalReceiptAmt / 10000000:0).toFixed(4))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
              {
                text: `${this.translateNumber(Number(pouroCurrArrAmount / 10000000 >0 ? pouroCurrArrAmount / 10000000:0).toFixed(3))}`,
                style: ['setBlack', 'setRight'],
                border: [false, true, true, true],
              },
            ]
          )
        });
        //Total Pouroshova
        phases.table.body.push(
          [
            {
              text: ``, style: [], border: [true, true, true, true]
            },
            {
              text: "মোট",
              style: ['setBlack', 'setCenter', 'setBold'],
              border: [true, true, true, true],
              rowSpan: 1,
              colSpan: 2
            },
            {
              text: '',
              style: ['setBlack', 'setLeft', 'setBold'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(pouroTotalPrevArrAmount / 10000000 >0 ? pouroTotalPrevArrAmount / 10000000:0).toFixed(4)),
              style: ['setBlack', 'setRight', 'setBold'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(pouroTotalCurrMonthArrTotal / 10000000 >0 ? pouroTotalCurrMonthArrTotal / 10000000:0).toFixed(4)),
              style: ['setBlack', 'setRight', 'setBold'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number(pouroAbsoluteTotalReceiptAmt / 10000000 >0 ? pouroAbsoluteTotalReceiptAmt / 10000000:0).toFixed(4)),
              style: ['setBlack', 'setRight', 'setBold'],
              border: [false, true, true, true],
            },
            {
              text: this.translateNumber(Number( pouroTotalCurrArrAmount/ 10000000 >0 ? pouroTotalCurrArrAmount / 10000000:0).toFixed(3)),
              //text: this.translateNumber(Number( pouroTotalCurrArrAmount / 10000000).toFixed(2)),
              style: ['setBlack', 'setRight', 'setBold'],
              border: [false, true, true, true],
            },
          ]
        );

        grandPouroTotalPrevArrAmount += pouroTotalPrevArrAmount;
        grandPouroCurrMonthArrTotal += pouroTotalCurrMonthArrTotal;
        grandPouroAbsoluteTotalReceiptAmt += pouroAbsoluteTotalReceiptAmt;
        grandPouroTotalCurrArrAmount += pouroTotalCurrArrAmount;

      }


      GrandArrPrevAmount = (allCityArrPrevAmountTotal + grandPouroTotalPrevArrAmount);
      GrandCurrMonthArrAmount = (allCityArrMonthAmountTotal + grandPouroCurrMonthArrTotal);
      GrandTotalReceiptAmount = (allCityTotalReceiptAmountTotal + grandPouroAbsoluteTotalReceiptAmt);
      //GrandCurrArrAmount = GrandArrPrevAmount + (GrandCurrMonthArrAmount - GrandTotalReceiptAmount);
      GrandCurrArrAmount = (GrandArrPrevAmount + GrandCurrMonthArrAmount) -GrandTotalReceiptAmount;
    })


    // Grand Total
    phases.table.body.push(
      [
        {
          text: ``,
          style: [],
          border: [true, true, true, true]
        },
        {
          text: "সর্বমোট",
          style: ['setBlack', 'setCenter', 'setBold'],
          border: [true, true, true, true],
          rowSpan: 1,
          colSpan: 2
        },
        {
          text: '',
          style: ['setBlack', 'setLeft', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(GrandArrPrevAmount / 10000000 >0 ? GrandArrPrevAmount / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(GrandCurrMonthArrAmount / 10000000 >0 ? GrandCurrMonthArrAmount / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number(GrandTotalReceiptAmount / 10000000 >0 ? GrandTotalReceiptAmount / 10000000:0).toFixed(4)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
        {
          text: this.translateNumber(Number( GrandCurrArrAmount/ 10000000 >0 ? GrandCurrArrAmount / 10000000:0).toFixed(3)),
          //text: this.translateNumber(Number( GrandCurrArrAmount / 10000000).toFixed(2)),
          style: ['setBlack', 'setRight', 'setBold'],
          border: [false, true, true, true],
        },
      ]
    );

    let fValue= Number((GrandTotalReceiptAmount/ 10000000).toFixed(4));
    if(fValue>0.00){
        let city=data.cityCoporationDataList as any[];
        let cityData=city.filter(p=>p.receiptBillMonth !='0');
        let powro=data.pouroshovaDataList as any[];
        let powroshovaData=powro.filter(p=>p.receiptBillMonth !='0');
        let receiptBillMonth='0';
        if(cityData.length>0){
          receiptBillMonth=cityData[0].receiptBillMonth
        }
        else{
          if(powroshovaData.length>0){
            receiptBillMonth=powroshovaData[0].receiptBillMonth
          }
          else{
            receiptBillMonth='0';
          }
        }

        let dateBn = this.translateNumber(dayjs(receiptBillMonth).format('DD'),2);
        let year = this.translateNumber(dayjs(receiptBillMonth).format("YY"), 2);
        let month: string;
        switch (dayjs(receiptBillMonth).format("M")) {
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
        phases.table.body.push(
          [
            {
              // text: `${receiptBillMonth!='0' ? '[বিঃ দ্রঃ- আদায়কৃত বিল মাস ' +receiptBillMonth+']' :''}`,
              text: `${month+'-'+ year!='0' ? '[বিঃ দ্রঃ- মোট আদায়(আদায়কৃত বিল মাস ' +month+'-'+ year+')]' :''}`,
              style: ['setBlack', 'setLeft', 'setBold'],
              border: [false, false, false, false],
              rowSpan: 1,
              colSpan: 6
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
            {
              text: ``,
              style: [],
              border: [false, false, false, false]
            },
          ]
        );
      }
  return phases;
}
}
