import { Injectable } from '@angular/core';

import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { setBillStyles, setCityPouroUnionStyles } from '../config/pdfMakeConfig';
import { PostpaidCustDetailsModel } from '../../../model/postpaid-to-prepaid.model';
import { DatePipe } from '@angular/common';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Injectable({
  providedIn: 'root'
})
export class PostPaidToPrePaidPdfService {
  setColor: string = "";
  marginTop = [0, 1, 0, 0];
  constructor() { }

  generatePdf(data:any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  
  private getDocumentDefinition(data:any) {
    return {
      info: {
        title: '',
        author: 'BPDB',
        subject: '',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      //pageOrientation: 'landscape',   
      content: [
        this.getHeading(data[0]), 
        this.getPostpaidToPrepaid(data[0])
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
  private getHeading(data: PostpaidCustDetailsModel) {
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
              text: `Postpaid To Prepaid  `,
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
              text: `Transferred`,
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
              text:  `Location Code : ${data.locationCode}` ,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setLeft],
              colSpan: 1, 
              margin: [0,0,0,0],
            },
            {
              text: data.transID,
              style: ['setSubTitleBold',setCityPouroUnionStyles.setCenter],
              colSpan: 2, 
              margin: [0,0,0,0]
            },
            {},
            {
              text: data.transferDate,
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

  private getPostpaidToPrepaid(data:PostpaidCustDetailsModel)
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
                text:  data.customerNumber ?? "",
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
                text:data.customerName ?? "",
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
                text:  `Father Name`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: data.fatherName ?? "",
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
                text:  `NID Number`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data.nidNumber ?? "",
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
                text:  `Mobile No`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data.mobileNumber ?? "",
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
                text:  `Division`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text: data.locationName ?? "",
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
              text:  `Power Utility`,
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
                setCityPouroUnionStyles.marginLeft,
              ],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text:  data.powerUtility ?? "",
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
                text:  `MAX Power`,
                style: [
                  setCityPouroUnionStyles.setFontBangla,
                  setCityPouroUnionStyles.setBold,
                  setCityPouroUnionStyles.marginLeft,
                ],
                colSpan: 1,
                border: [true, true, true, true]
              },
              {
                text:  data.maxPower ?? "",
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
              text:  `Book No`,
              style: [
                setCityPouroUnionStyles.setFontBangla,
                setCityPouroUnionStyles.setBold,
                setCityPouroUnionStyles.marginLeft,
              ],
              colSpan: 1,
              border: [true, true, true, true]
            },
            {
              text:  data.bookNo ?? "",
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
            text:  `Previous Account No`,
            style: [
              setCityPouroUnionStyles.setFontBangla,
              setCityPouroUnionStyles.setBold,
              setCityPouroUnionStyles.marginLeft,
            ],
            colSpan: 1,
            border: [true, true, true, true]
          },
          {
            text:  data.prvAcNo ?? "",
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
          text:  `Meter No.`,
          style: [
            setCityPouroUnionStyles.setFontBangla,
            setCityPouroUnionStyles.setBold,
            setCityPouroUnionStyles.marginLeft,
          ],
          colSpan: 1,
          border: [true, true, true, true]
        },
        {
          text:  data.meterNum ?? "",
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
        text:  `Last Reading`,
        style: [
          setCityPouroUnionStyles.setFontBangla,
          setCityPouroUnionStyles.setBold,
          setCityPouroUnionStyles.marginLeft,
        ],
        colSpan: 1,
        border: [true, true, true, true]
      },
      {
        text:  data.lastReading ?? "",
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
        text:  `Cut Out Date`,
        style: [
          setCityPouroUnionStyles.setFontBangla,
          setCityPouroUnionStyles.setBold,
          setCityPouroUnionStyles.marginLeft,
        ],
        colSpan: 1,
        border: [true, true, true, true]
      },
      {
        text:  data.cutOutDate ?? "",
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
  
      // data.forEach((item) => {
          // const { transID,customerName,customerNumber,fatherName,locationCode,locationName,customerType,nidNumber,mobileNumber,customerAddress,powerUtility,maxPower,meterOwnedBy,meterOwner}=data;
          // phases.table.body.push(

          // )
      // });
    return phases;
  }
}
