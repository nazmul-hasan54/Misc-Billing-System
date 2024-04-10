import { Injectable } from '@angular/core';
import { setAllCustomerArrearStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setBillStyles } from "../config/pdfMakeConfig";

import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { setCityPouroUnionStyles } from '../config/pdfMakeConfig';
import { PostpaidCustDetailsModel } from '../../../model/postpaid-to-prepaid.model';
import { DatePipe } from '@angular/common';
import { ViewCustomerData } from '../../../model/ministry/view-cust-data.model';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class NewCustomerDataService {
  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data:ViewCustomerData, locationCode:string) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, locationCode);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  
  private getDocumentDefinition(data:ViewCustomerData, locationCode:string) {
    return {
      info: {
        title: '',
        author: 'BPDB',
        subject: '',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      pageOrientation: 'landscape',   
      content: [
        this.getHeading(data, locationCode), 
        this.viewCustData(data, locationCode)
      ],
      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 8,
        color: this.setColor,
      },
      styles: setBillStyles,
    };
  }
  private getHeading(data: ViewCustomerData, locationCode:string) {
    // let{transID,locationCode,transferDate}=data[0];
    return {
      margin: [0, 10, 0, 0],
      table: {
        widths: [100, '*', '*', 100],
        body: [
          [
            {
              image: `logo_green.png`, width: 60, height: 50, color: 'gray', rowSpan: 2,
              margin: [0, -10, 0, 0]
            },
            {
              text: [
                { text: ``, style: "setBold" },
              ], colSpan: 2
            },
            {},
            {
              style: ['setColumnBold'], text: ``
            }
          ],
          // logo section
          [
            {},
            {
              text: `BANGLADESH POWER DEVELOPMENT BOARD`,
              style: ['setTitleBold'],
              colSpan: 2, margin: [0, 0, 0, 0]
            },
            {},
            { image: `slogan2.png`, width: 60, height: 45, rowSpan: 2, margin: [0, -0, 0, 0] }
          ],
          [
            {},
            {
              text: `New Customer Information`,
              style: ['setTitleBold'],
              colSpan: 2, 
              margin: [0, -25, 0, 0]
            },
            {},
            {
            },
          ],
          [
            {},
            {
              text: `Customer Data`,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setRed],
              colSpan: 2, 
              margin: [0, -18, 0, 0]
            },
            {},
            {
            },
          ],
          [
            {
              text:  `Location Code : ${locationCode}` ,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setLeft],
              colSpan: 1, 
              margin: [0,0,0,0],
            },
            {
              text: ``,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setCenter],
              colSpan: 2, 
              margin: [0,0,0,0]
            },
            {},
            {
              text: ``,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setCenter],
              colSpan: 1, 
              margin: [0,0,0,0]
            },
          ],
          [
            {
            },
            {},
            {},
            {},
          ],
        ]
      },
      layout: 'noBorders'
    }
  }

  private viewCustData(data:ViewCustomerData, locationCode:string)
  {
    const phases = {
        table: {
          headerRows: 1,
          widths: ['*','*'],
          body: [
            [            
              {
                text:  `Customer Number`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data?.customerNo ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
          ],
          [
              {
                text:  `Customer Name`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:data?.customerName ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
          ],
          [            
              {
                text:  `Ministry`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: data?.ministry ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
          ],
          [
              {
                text:  `Zone`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data?.zone ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
          ],
          [
            {
                text:  `Circle`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data?.circle ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
          ],
          [            
              {
                text:  `Location`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  locationCode +", "+ data?.location ?? "",
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              }, 
          ],
          [
            {
              text:  `Address`,
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
                setCityPouroUnionStyles.marginLeft,
              ],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text: data?.address ?? "",
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
                setCityPouroUnionStyles.marginLeft,
              ],
              colSpan: 1,
              border: [true, true, true, true]
            },
          ],
          ],
        },
      };
    return phases;
  }
}
