import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { environment } from '../../../../environments/environment';
import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, setHeading, setMosqueAndOtherPlacesStyles, setPouroshovaAndCityStyle,  } from '../config/pdfMakeConfig';
const { toBengaliNumber, toBengaliWord } = require('bengali-number');
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;


@Injectable({
  providedIn: 'root'
})
export class TempleMosqueSummaryService {
  defaultColur = "#0c0d0d"
  constructor(private http:HttpClient) { }
  
  getKrishiPoultryCustomers(validDate:string){
    return this.http.get<any>(
      `${environment.apiUrl}get-agriculture-and-poultry-by-date?validDate=` + validDate
    );
  }
  generatePdf(data:any, reportObject:any, utilityObj: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,reportObject,utilityObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data:any, reportObject:any, utilityObj: any) {
    return {
      info: {
        title: 'Mosque & other Places of Worship',
        author: 'BPDB',
        subject: 'Mosque & other Places of Worship',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',
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
      content: [this.getHeading(data,reportObject,utilityObj),this.getMosqueAndOtherPlaces(data)],
      pageMargins: [30, 40, 30, 30],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      styles: setPouroshovaAndCityStyle,
    
    };
  }

  
  private getHeading(data:any, reportObj: any,utilityObj:any) {
    let decreateDate = dayjs(utilityObj.billMonth).add(-1, 'month').format('YYYYMM');
     let year = this.translateNumber(dayjs(decreateDate).format("YYYY"), 2);
     let month = this.getBanglaMonth(decreateDate);
    
    const noWorshipTotal= data.reduce((acc, o) => acc + parseInt(o.noWorship), 0);
    const phase = {
      table: {
        dontBreakRows: true,
        widths: [20, '*', 33, 70, 70, 70,70],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 50,
              height: 45,
              rowSpan: 2,
              colSpan: 2,
              alignment: 'right',
              margin: [-5, -20, 0, 0],
              border: [false,false,false,false],
            },
            {},
            {
              text: 'বাংলাদেশ বিদ্যুৎ উন্নয়ন বোর্ড',
              style: [setHeading],
              colSpan: 4,
              alignment: '',
              margin: [0, -15, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
          ],
          [
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: `ধর্ম মন্ত্রণালয়ের বকেয়া বিবরনী`,
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 3,
              alignment: '',
              margin: [10, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
          ],
          [
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text:`${month}-${year} ইং পর্যন্ত`,
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              margin: [-28, -10, 0, 0],
              colSpan: 3,
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
          ],
          [
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              // text: `Consumer Count: ${noWorshipTotal} `,
              text: `গ্রাহক সংখ্যা ${this.translateNumber(noWorshipTotal, 2)}`, 
              style: [setMosqueAndOtherPlacesStyles.setTitleBold],
              colSpan: 2,
              alignment: '',
              margin: [56, 0, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              style: [setMosqueAndOtherPlacesStyles.fontSize],
              colSpan: 0,
              alignment: '',
              margin: [0, 0, 0, 0],
              border: [false,false,false,false],
            },
          ],
        ],
      },
    };
    return phase;
  }
  

  getMosqueAndOtherPlaces(data:any){
    const phase ={
      margin:[0,0,0,0],
      table: {
        widths: [20, '*', 33, 70, 70, 70,70],
        //Heading
        body:[
          [
            {
              text: 'ক্রঃ নং',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              // text: 'Name of Zone/Circle/Esu',
              text: 'জোন/সার্কেল/লোকেশনের নাম',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 15, 0, 0],
              alignment: 'center'
            },
            {
              text: 'ধর্মীয় প্রতিষ্ঠানের সংখ্যা',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              alignment: 'center'
            },
            {
              text: 'মূল বকেয়া',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              text: 'সারচার্জ',
              border: [true, true, true, true],
              style: [],
              colSpan: 1,
              margin: [0, 12, 0, 0],
              alignment: 'center'
            },
            {
              text:'মূসক(৫%)',
              border: [true, true, true, true],
              margin: [0, 12, 0, 0],
              style: [],
            },
            {
              text:'মোট',
              border: [true, true, true, true],
              margin: [0, 12, 0, 0],
              style: [],
            }
          ],
        ]
      },
      layout: this.setTableBorder(),
    };

    
    let grandNoWorshipTotal=0;
    let grandPrnTotal=0;
    let grandVatTotal=0;
    let grandLpsTotal=0;
    let grandTotalarrear=0;

    const uniqueZone = [...new Set(data.map(item => item.zoneName))];
    uniqueZone.forEach(zoneCodeItem =>{

      let noWorshipTotalZone=0;
      let circlePrnTotalZone = 0;
      let circleLpsTotalZone = 0;
      let circleVatTotalZone = 0;
      let circleArrearTotalZone = 0;
      let zone = data.filter(x => x.zoneName == zoneCodeItem);
      
      if(zoneCodeItem){
        //Unique Zone Heading 
        phase.table.body.push(
          [
            {
              border: [true, true, true, true],
              text: `${zoneCodeItem}`,
              style: [setMosqueAndOtherPlacesStyles.setBold],
              alignment: 'left',
              colSpan: 2
            },
            {
              border: [true, true, true, true],
              text: ``,
              style: [setMosqueAndOtherPlacesStyles.setBold],
              alignment: 'left',
              colSpan: 0
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [setMosqueAndOtherPlacesStyles.setBold],
              alignment: '',
              colSpan: 5
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [],
              alignment: '',
              colSpan: 0
            },
        
        ]);
        
        //Zone Wise Circle
        let circleSerial = 0;
        const uniqueCircleCode=[...new Set(zone.map(item=>item.circleCode || item.zoneName))];
        uniqueCircleCode.forEach(circleCodeitem=>{
          let circle=data.filter(x=>x.circleCode===circleCodeitem);
          let uniqueLocation=[...new Set(circle.map(item=>item.locationCode || item.circleCode))]
            circleSerial++;
            
           //Circle Heading
          phase.table.body.push(
            [
              {
                border: [true, true, true, true],
                text: `${this.translateNumber(circleSerial, 2)}`, 
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'center',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: `${circle[0].circleName} (O & M) Circle`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'left',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: "",
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: '',
                colSpan: 5
              },
              {
                border: [true, true, true, true],
                text: "",
                style: [],
                alignment: '',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: "",
                style: [],
                alignment: '',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: "",
                style: [],
                alignment: '',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: "",
                style: [],
                alignment: '',
                colSpan: 0
              },
          
          ]);

          let nameOfCircle;
          let locSerial = 0;
          let noWorshipTotal=0;
          let circlePrnTotal = 0;
          let circleLpsTotal = 0;
          let circleVatTotal = 0;
          let circleArrearTotal = 0;
          uniqueLocation.forEach(element => {
            let religiousDist = data.filter(x=> x.locationCode == element);

            locSerial++;
            religiousDist.forEach(value=>{            
              nameOfCircle=value.circleName;
              noWorshipTotal += value.noWorship;
              circlePrnTotal += value.prn;
              circleVatTotal += (value.vat ?? 0);
              circleLpsTotal += (value.lps ?? 0);
              circleArrearTotal += (value.totalArrear ?? 0);
              
              //Circle Body
              phase.table.body.push(
                [
                  {
                    text: `${this.translateNumber(locSerial, 2)}`, 
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'center',
                    colSpan: 0
                  },
                  {
                    text:`${value.locationName} (${value.locationCode})`,
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'left',
                    colSpan: 0
                  },
                  {
                    text: `${this.translateNumber(value.noWorship, 2)}`, 
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'right',
                    colSpan: 0
                  },
                  {
                    // text: `${this.translateNumber(value.prn, 2)}`, 
                    text: `${this.translateNumber(Number(value.prn >0 ? value.prn:0 ).toFixed(2))}`,
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'right',
                    colSpan: 0
                  },
                  {
                    // text: `${this.translateNumber(value.vat, 2)}`, 
                    text: `${this.translateNumber(Number(value.vat >0 ? value.vat:0 ).toFixed(2))}`,
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'right',
                    colSpan: 0
                  },
                  {
                    // text: `${this.translateNumber(value.lps, 2)}`, 
                    text: `${this.translateNumber(Number(value.lps >0 ? value.lps:0 ).toFixed(2))}`,
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'right',
                    colSpan: 0
                  },
                  {
                    // text: `${this.translateNumber(value.totalArrear, 2)}`, 
                    text: `${this.translateNumber(Number(value.totalArrear >0 ? value.totalArrear:0 ).toFixed(2))}`,
                    border: [true, true, true, true],
                    style: [],
                    alignment: 'right',
                    colSpan: 0
                  },
                ]
              )
            })
          })
          //Circle Total
          phase.table.body.push(
            [ 
              {
                border: [true, true, true, true],
                text: `Total of ${nameOfCircle} (O & M) Circle`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: '',
                colSpan: 2
              },
              {
                border: [true, true, true, true],
                text: ``,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: '',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: `${this.translateNumber(noWorshipTotal, 2)}`, 
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                // text: `${this.translateNumber(circlePrnTotal, 2)}`, 
                text: `${this.translateNumber(Number(circlePrnTotal>0 ? circlePrnTotal:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                // text: `${this.translateNumber(circleLpsTotal, 2)}`, 
                text: `${this.translateNumber(Number(circleLpsTotal>0 ? circleLpsTotal:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                // text: `${this.translateNumber(circleVatTotal, 2)}`, 
                text: `${this.translateNumber(Number(circleVatTotal>0 ? circleVatTotal:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                // text: `${this.translateNumber(circleArrearTotal, 2)}`, 
                text: `${this.translateNumber(Number(circleArrearTotal>0 ? circleArrearTotal:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 0
              },
            ]
          );
          // Empty Row    
          if(circleCodeitem != uniqueCircleCode[uniqueCircleCode.length-1]){
            phase.table.body.push(
              [ 
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 7
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
                {
                  border: [false, false, false, false],
                  text: ``,
                  style: [],
                  alignment: '',
                  colSpan: 0
                },
              ] 
            );
          }
         noWorshipTotalZone +=noWorshipTotal;
         circlePrnTotalZone +=circlePrnTotal;
         circleLpsTotalZone +=circleLpsTotal ;
         circleVatTotalZone +=circleVatTotal;
         circleArrearTotalZone +=circleArrearTotal;
        })
          //Zone Total
          phase.table.body.push(
            [
              {
                border: [true, true, true, true],
                text: `সর্বমোট ${zoneCodeItem} জোন`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'center',
                colSpan: 2
              },
              {
                border: [true, true, true, true],
                text: ``,
                style: [setMosqueAndOtherPlacesStyles.setBold,],
                alignment: 'left',
                colSpan: 0
              },
              {
                border: [true, true, true, true],
                text: `${this.translateNumber(noWorshipTotalZone, 2)}`, 
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 1
              },
              {
                border: [true, true, true, true],
                // text: `${circlePrnTotalZone.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                text: `${this.translateNumber(Number(circlePrnTotalZone >0 ? circlePrnTotalZone:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 1
              },
              {
                border: [true, true, true, true],
                // text: `${circleLpsTotalZone.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                text: `${this.translateNumber(Number(circleLpsTotalZone >0 ? circleLpsTotalZone:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 1
              },
              {
                border: [true, true, true, true],
                // text: `${circleVatTotalZone.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                text: `${this.translateNumber(Number(circleVatTotalZone>0 ? circleVatTotalZone:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 1
              },
              {
                border: [true, true, true, true],
                // text: `${circleArrearTotalZone.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
                text: `${this.translateNumber(Number(circleArrearTotalZone>0 ? circleArrearTotalZone:0 ).toFixed(2))}`,
                style: [setMosqueAndOtherPlacesStyles.setBold],
                alignment: 'right',
                colSpan: 1
              },
          
          ]);
      }
      // Empty Row
      if(zoneCodeItem != uniqueZone[uniqueZone.length-1]){
        phase.table.body.push(
          [ 
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 7
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
            {
              border: [false, false, false, false],
              text: ``,
              style: [],
              alignment: '',
              colSpan: 0
            },
          ] 
        );
      }
      grandNoWorshipTotal+=noWorshipTotalZone;
      grandPrnTotal +=circlePrnTotalZone;
      grandVatTotal +=circleLpsTotalZone;
      grandLpsTotal +=circleVatTotalZone;
      grandTotalarrear +=circleArrearTotalZone;
    })
    //Grand Total
    phase.table.body.push(
      [ 
        {
          border: [true, true, true, true],
          text: `সর্বমোট`,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: '',
          colSpan: 2
        },
        {
          border: [true, true, true, true],
          text: ``,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: '',
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          // text: `${grandNoWorshipTotal}`,
          text: `${this.translateNumber(grandNoWorshipTotal, 2)}`, 
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: 'right',
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          // text: `${grandPrnTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(grandPrnTotal >0 ? grandPrnTotal:0 ).toFixed(2))}`,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: 'right',
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          // text: `${grandVatTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(grandVatTotal >0 ? grandVatTotal:0 ).toFixed(2))}`,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: 'right',
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          // text: `${grandLpsTotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(grandLpsTotal >0 ? grandLpsTotal:0 ).toFixed(2))}`,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: 'right',
          colSpan: 0
        },
        {
          border: [true, true, true, true],
          // text: `${grandTotalarrear.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
          text: `${this.translateNumber(Number(grandTotalarrear >0 ? grandTotalarrear:0 ).toFixed(2))}`,
          style: [setMosqueAndOtherPlacesStyles.setBold],
          alignment: 'right',
          colSpan: 0
        },
      ]);
    return phase;
  }


  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
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
