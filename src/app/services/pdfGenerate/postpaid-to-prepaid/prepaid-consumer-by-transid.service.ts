import { Injectable } from "@angular/core";
import { fadeInItems } from "@angular/material/menu";
import dayjs from "dayjs";
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "../../../../assets/vfs_fonts";
import { setAllCustomerArrearStyle, misAllMinistryCenterwiseSummaryDefaultStyle, misAllMinistryCenterwiseSummaryPageMargin, misMinistrySummaryHeaderMargin, misMinistrySummaryStyle, setHeading, setPdfMakeFonts, setPoultryStyles, setSubHeading, setSubSetHeading, setNewConnectionStyle, setBillStyles, ministryDetailsPageMargin, ministryDetailsDefaultStyle, ministryDetailsStyle, ministryDetailsHeaderMargin } from "../config/pdfMakeConfig";
import { UntracedCustModel } from "../../../model/get-untraced-cust.model";
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class PrepaidConsumerByTransidService {
  setColor: string = "";
  constructor() { }

  
  generatePdf(data: any,details:any) {
    //this.setColorForBill(USAGE_TYPE);
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,details);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }
  
  private getDocumentDefinition(data: any,details:any) {
    return {
      info: {
        title: 'Prepaid Customer Information',
        author: 'BPDB',
        subject: 'Prepaid Customer Info',
        keywords: 'keywords for Information',
      },
      pageSize: 'A4',
      // pageOrientation: 'landscape',
      footer: function (currentPage, pageCount) {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `Page ${currentPage.toString()} of ${pageCount}`, style: ['setFooterLeft'],alignment:'left', margin: [30, 5, 30, 0] },
                { text: dayjs(new Date).format("DD/MM/YYYY"), style: ['setFooterRight'],alignment:'right', margin: [0, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      header: this.getHeading(data),
      content: [this.gePrepaidConsumerInfo(data,details)],

      defaultStyle: {
        fonts: 'Arial',
        alignment: 'center',
        fontSize: 9,
        color: this.setColor,
      },
      styles: setBillStyles,
      pageMargins:  [30, 130, 30, 30],
    }
  }

  
  private getHeading(data) {
      const phase={
        margin: [0, 50, 0, 0],
        table: {
          // headerRows: 1,
          dontBreakRows: true,
          widths: [50, 50, '*', '*', 60, 40],
          body: [
            [
              {
                image: `logo.png`,
                width: 70,
                height: 60,
                rowSpan: 2,
                colSpan: 2,
                alignment: 'right',
                margin: [-75,-10, 0, 0],
                border: [false,false,false,false],
              },
              {},
              {
                text: `BANGLADESH POWER DEVELOPMENT BOARD`,
                style: ['setTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
              {},
              {},
              {},
            ],
            [
              {},
              {},
              {
                text: `Prepaid Consumer Details`,
                style: ['setSubTitleBold'],
                colSpan: 2,
                margin: [0, 0, 0, 0],
              },
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
              {}
  
            ],
            [
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
            ],
          ]
        },
        layout: 'noBorders'
      }
      return phase;

  }
  private gePrepaidConsumerInfo(data:any,details:any){
    let{state,message,customerNo,customerName,customerType,division,fatherName,motherName,spouseName,sex,nid,tinNo,
      email,isGovtCustomer,instituteName,isFreedomFighter,oldCustomerNo,oldMeterNo,overdue,customerAddress,
      addressLine2, district,thana,powerUtility,powerCapacity,electricalProperty,industry,powerSupplyVoltage,meterReadingDate,
      meterReadingTime,temporaryPower,icCardNo,remark,maxPower,meterOwnedBy,transID}=data;
      let serial=0;
      serial++;
    const phase = {
      margin: [0, 0, 0, 0],
      table: {
        dontBreakRows: true,
        headerRows: 1,
        widths: ['*', '*'],
        body: [
          [
            {
              text: `Customer No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${customerNo}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `Customer Name`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${customerName}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          // [
          //   {
          //     text: `Sex`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${sex}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Father Name`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${fatherName}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Mother Name`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${motherName}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Spouse Name`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${spouseName}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          [
            {
              text: `Division`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${details.division.divisionName}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `District`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${details.district.districtName}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `Thana`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${details.thana.thanaName}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `Customer Address`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${customerAddress}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `Address Line2`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${addressLine2}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          // [
          //   {
          //     text: `Customer Type`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${customerType}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Email`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${email}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          [
            {
              text: `Nid`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${nid}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `TinNo`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${tinNo}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          // [
          //   {
          //     text: `Is Govt Customer`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${isGovtCustomer}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          [
            {
              text: `Old Meter No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${oldMeterNo}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          [
            {
              text: `Old Customer No`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${oldCustomerNo}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          // [
          //   {
          //     text: `Institute Name`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${instituteName}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Is Freedom Fighter`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${isFreedomFighter}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Over Due`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${overdue}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          [
            {
              text: `Power Utility`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
            {
              text: `${powerUtility}`,
              style: ['setColumnBold'],
              border: [true, true, true, true],
              lineHeight: 1,
              alignment:'left', 
              margin: [0, 0, 0, 0],
              rowSpan:'',
              colSpan:'',
            },
          ],
          // [
          //   {
          //     text: `Power Capacity`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${powerCapacity}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Electrical Property`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${electricalProperty}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Industry`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${industry}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Power Supply Voltage`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${powerSupplyVoltage}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Meter Reading Date`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${meterReadingDate}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Meter Reading Time`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${meterReadingTime}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Temporary Power`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${temporaryPower}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Ic Card No`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${icCardNo}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Remark`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${remark}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Max Power`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${maxPower}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Meter Owned By`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${meterOwnedBy}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: ``,
          //     style: ['setColumnBold'],
          //     border: [false, false, false, false],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: ``,
          //     style: ['setColumnBold'],
          //     border: [false, false, false, false],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Contact Name`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${data.contactList.contactsList[0].contactName}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Telephone`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${data.contactList.contactsList[0].telephone}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Mobile`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${data.contactList.contactsList[0].mmobile}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
          // [
          //   {
          //     text: `Service Providers`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          //   {
          //     text: `${data.contactList.contactsList[0].serviceProviders}`,
          //     style: ['setColumnBold'],
          //     border: [true, true, true, true],
          //     lineHeight: 1,
          //     alignment:'left', 
          //     margin: [0, 0, 0, 0],
          //     rowSpan:'',
          //     colSpan:'',
          //   },
          // ],
        ],
      }
    }
    return phase;
  }
}
