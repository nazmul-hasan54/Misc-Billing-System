import { Injectable } from '@angular/core';
import * as dayjs from 'dayjs'
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../../assets/vfs_fonts.js';
import { PenaltyBillPrintModel } from '../../../../model/penaltyBillPrint.model.js';
import { setAgricultureAndPoultryStyles, setBillStyles, setHeading, setPdfMakeFonts, setSubSetHeading } from '../../config/pdfMakeConfig';

(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class MinistryCustomerPrintViewService {

  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data: any,reportObj:any) {
    
    //this.setColorForBill(USAGE_TYPE);
   //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,reportObj);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: any,reportObj:any) {
    return {
      info: {
        title: 'Ministry Customer Info',
        author: 'ebcweb',
        subject: 'Bill of Consumer',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'portrait',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'],alignment:'left', margin: [40, 5, 30, 0] }
                , { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'],alignment:'right', margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },

      content: [
        this.getHeading(data,reportObj),
        this.getMinistryCustomerInfo(data,reportObj),
        this.getFooter()
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 7.5,
        color: this.setColor,
      },
      styles: setBillStyles,
    }
  }

  private getHeading(data: any,reportObj){
    const totalCount = data.length;
    return {
      // margin: [0, 5, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 40],
        margin: [0, 0, 0, 0],
        body: [
          [
            {
              image: `logo.png`,
              width: 70,
              height: 60,
              color: 'gray',
              rowSpan: 5,
              colSpan: 2,
              alignment: 'right',
              margin: [-70, 0, 0, 0],
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
              style: ['setHeading'],
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
              text: `Ministry Customer Information`,
              style: ['setSubSetHeading'],
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
              text: `${reportObj.ministryCode==''?'All Ministry':data[0].ministryName}`,
              style: ['setSubSetHeading'],
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
              text: `${reportObj.categoryName.length==0?'':reportObj.categoryName[0].name}`,
              style: ['setSubSetHeading'],
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
              text: `Total Customer: ${totalCount}`,
              style: ['setSubSetHeading'],
              colSpan: 8,
              margin:[0,-50,0,0],
              alignment:'right'
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
              text: `Location: ${data[0].locationCode}-${data[0].locationDesc}`,
              style: ['setSubSetHeading'],
              colSpan: 8,
              margin:[-85,-50,0,0],
              alignment:''
            },
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
      layout: 'noBorders'
    }
  }

  private getFooter(){

  }

  private getMinistryCustomerInfo(data: any,reportObj:any){
    let phase;
    if(reportObj.ministryCode==''){
       phase = {
        margin: [0, -35, 0, 0],
        table: {
          dontBreakRows: true,
          headerRows: 1,
          widths: [20,100, 20,'auto', '*', 150],
          body: [
            [
              {
                text: `SN`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Ministry Name`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `SN`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Customer No`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Customer Name`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Address`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
            ],
          ],
        }
      }
    }
    else{
      phase = {
        margin: [0, -35, 0, 0],
        table: {
          dontBreakRows: true,
          headerRows: 1,
          widths: [20,50, '*',130, 50, 70],
          body: [
            [
              {
                text: `SN`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Customer No`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Customer Name`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Address`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 0, 0, 0],
              },
              {
                text: `Zone`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
              {
                text: `Circle`,
                style: ['setColumnBold'],
                border: [true, true, true, true],
                lineHeight: 1,
                margin: [0, 8, 0, 0],
              },
            ],
          ],
        }
      }
    }
    let serial=0;
    let custSerial=0;
    let ministryConsumer=[...new Set(data.map((data=>data.ministryCode)))];
    ministryConsumer.forEach((mCust)=>{
      let customerGroupByMinistry=data.filter((d)=>d.ministryCode==mCust);
      let customerGroupByMinistryLength=customerGroupByMinistry.length;
      let providerInsert=Math.ceil(Number(customerGroupByMinistryLength/1.5))
      if(customerGroupByMinistryLength>0){
        let providerNo=0;
        serial++;
        customerGroupByMinistry.forEach(cust=>{
          providerNo+=1;
          custSerial++;
          let{centerName,circleName,customerAddress,customerName,customerNumber,locationCode,locationDesc,ministryCode,ministryName,religiousCode,zoneName}=cust;
          
          if(reportObj.ministryCode==''){
            phase.table.body.push(
              [
                {
                  border:providerInsert==1 ||providerNo==customerGroupByMinistryLength? [true, false, true, true]:[true, false, true, false],
                  text: `${providerNo==providerInsert?(serial):""}`,
                  style: [],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  border: providerInsert==1 ||providerNo==customerGroupByMinistryLength? [true, false, true, true]:[true, false, true, false],
                  style: [],
                  text: `${providerNo==providerInsert?ministryName:""}`,
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${custSerial}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerNumber}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerName?customerName:''}`,
                  style: ['setLeft'],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerAddress?customerAddress:''}`,
                  style: ['setLeft'],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
              ]
            );
          }
          else{
            phase.table.body.push(
              [
                {
                  text: `${custSerial}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerNumber}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerName?customerName:''}`,
                  style: ['setLeft'],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${customerAddress?customerAddress:''}`,
                  style: ['setLeft'],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${zoneName}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
                {
                  text: `${circleName}`,
                  style: [],
                  border: [true, true, true, true],
                  lineHeight: 1,
                  margin: [0, 0, 0, 0],
                },
              ]
            );
          }
        })
      }
    })
    return phase;
  }
}
