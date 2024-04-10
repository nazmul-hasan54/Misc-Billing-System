import { UntracePenaltySupplementaryListModel, UntracedCustArrearMergeSummaryModel } from '../../../model/untraced-consumer.model';
import { misMinistrySummaryHeaderMargin, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, setHeading, setPdfMakeFonts } from '../config/pdfMakeConfig';

import { Injectable } from '@angular/core';
import dayjs from 'dayjs';

@Injectable({
  providedIn: 'root'
})
export class UntracedCustArrearSumReportService {

  defaultColor = "#0c0d0d";
  private year: any;
  private month: any;

  constructor() {}

  generatePdf(data: UntracePenaltySupplementaryListModel, yearMonth?: any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data, yearMonth);
    
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data: UntracePenaltySupplementaryListModel,yearMonth: any) {
    return {
      info: {
        title: "Untraced Consumer Arrear Collection Summary",
        author: "BPDB",
        subject: "Untraced Consumer Arrear Collection Summary",
        keywords: "keywords for document",
      },
      pageSize: "A4",
      pageOrientation: "landscape",
      footer: (currentPage, PageCount) => {
        return {
          table: {
            widths: ["*", "*"],
            body: [
              [
                {
                  text: `পৃষ্ঠা ${this.translateNumber(
                    currentPage,
                    2
                  )} এর ${this.translateNumber(PageCount, 2)}`,
                  style: ["setFooterLeft"],
                  margin: [30, 5, 30, 0],
                },
                {
                  text: this.translateNumber(
                    dayjs(new Date()).format("DD/MM/YYYY"),
                    2
                  ),
                  style: ["setFooterRight"],
                  margin: [30, 5, 30,0],
                },
              ],
            ],
          },
          layout: "noBorders",
        };
      },
      header: this.getLogoHeading(data.untraceableDataList, yearMonth,''),
      content: [
        this.getHeading(data.untraceableDataList, yearMonth, 'নিখোঁজ গ্রাহকের বকেয়া আদায়ের তথ্য '),
        this.getUntracedArrearInfo(data.untraceableDataList, yearMonth),
        this.getHeading(data.penaltyDataList, yearMonth,'অবৈধ গ্রাহকের জরিমানা আদায়ের তথ্য'),
        this.getPenaltyArrearInfos(data.penaltyDataList, yearMonth),
        this.getHeading(data.penaltyDataList, yearMonth, 'সম্পূরক বিল আদায়ের তথ্য'),
        this.getSupplementaryArrearInfos(data.supplementaryDataList, yearMonth)
        
      ],
      defaultStyle: {
        font: "bangla",
        alignment: "center",
        fontSize: 7.4,
        color: "#111",
      },
      pageMargins: [30, 60, 30, 30],
      // pageMargins: misAllMinistryCenterwiseSummaryPageMargin,
      styles: setAllCustomerArrearStyle,
    };
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 });
    }
    return num.toString().replace(/\d/g, (x) => banglaDigits[x]);
  }

  private getChangesDate(data:any): string{
    let billMonth = data.toString();
    let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
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
    return `${month}'${year}`;
  }

  private getLogoHeading(data: any, reportObj: any, headerValue: string) {

    // let dateBn = this.translateNumber(dayjs(validDate).format('DD-MM-YY'), 2);
    // let year = this.translateNumber(dayjs(validDate).format("YY"), 2);
    // let month: string;
    // switch (dayjs(validDate).format("M")) {
    //   case "1": {
    //     month = "জানুয়ারি"
    //     break
    //   }
    //   case "2": {
    //     month = "ফেব্রুয়ারী"
    //     break
    //   }
    //   case "3": {
    //     month = "মার্চ"
    //     break
    //   }
    //   case "4": {
    //     month = "এপ্রিল"
    //     break
    //   }
    //   case "5": {
    //     month = "মে"
    //     break
    //   }
    //   case "6": {
    //     month = "জুন"
    //     break
    //   }
    //   case "7": {
    //     month = "জুলাই"
    //     break
    //   }
    //   case "8": {
    //     month = "আগষ্ট"
    //     break
    //   }
    //   case "9": {
    //     month = "সেপ্টেম্বর"
    //     break
    //   }
    //   case "10": {
    //     month = "অক্টোবর"
    //     break
    //   }
    //   case "11": {
    //     month = "নভেম্বর"
    //     break
    //   }
    //   case "12":
    //   default:
    //     {
    //       month = "ডিসেম্বর"
    //       break
    //     }
    // }
    const phase = {
      margin: [80, 10, 0, 0],
      table: {
        dontBreakRows: true,
        widths: [70, 'auto', 40, '*', 40, 45, 45, 'auto', 'auto', 'auto'],
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
              margin: [-140, 6, 0, 0],
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
              margin: [-140, 15, 0, 0],
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
  private getHeading(data:any,reportObj: any, headerValue: string) {
    let billMonth = reportObj;
    let year = this.translateNumber(dayjs(billMonth).format("YY"), 2);
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
      margin: [30,4,30,0],
      table: {
        dontBreakRows: true,
        widths: [70, "auto", 40, "*", 40, 45, 45, "auto", "auto", 40],
        margin: [0, 0, 0, 0],
        body: [
          [
            {},
            {},
            {
              text: `${headerValue} ${month}-${year} ইং পর্যন্ত`,
              style: [],
              fontSize:10,
              bold: true,
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
        ],
      },
      layout: "noBorders",
    };
    return phase;
  }

  private getUntracedArrearInfo(data: UntracedCustArrearMergeSummaryModel[], dateMonth:any) {
    let previousBillMonth = this.getChangesDate(dateMonth-1);
    let currentBillMonth = this.getChangesDate(dateMonth);
    const phases = {
      table: {
        headerRows: 3,
        widths: [40, 60, 60, 65, 65, 60, 65, 65, 60, 65, 65],
        body: [
          [
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাসের পূর্বের মাস ${previousBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, true],
              text: "ক্রমিক নং",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "অঞ্চলের নাম",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সনাক্তকৃত গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "বকেয়ার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সনাক্তকৃত গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "বকেয়ার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সনাক্তকৃত গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "বকেয়ার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            
          ],
          [
            {
              border: [true, false, true, true],
              text: "১",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "২",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৩",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৪",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৫",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৯=৩+৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১০=৪+৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১১=৫+৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            
          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    /*GrandTotal*/
    let grandTotalUntracedCustCount = 0;
    let grandTotalUntracedCustArrear = 0;
    let grandPreMonTracedCustCount = 0;
    let grandPreMonTracedCustArrear = 0;
    let grandPreMonTracedCustReceipt = 0;
    let grandCurrMonTracedCustCount = 0;
    let grandCurrMonTracedCustArrear = 0;
    let grandCurrMonTracedCustReceipt = 0;
    let grandTotalCurrMonTracedCustCount = 0;
    let grandTotalCurrMonTracedCustArrear = 0;
    let grandTotalCurrMonTracedCustReceipt = 0;
    let grandTotalFinalUntracedCustCount = 0;
    let grandTotalfinalarreraramount = 0;

    let serial = 0;

    data.forEach((value) => {
      serial++;
      grandPreMonTracedCustCount        += value.preMonTracedCustCount;
      grandPreMonTracedCustArrear       += value.preMonTracedCustArrear;
      grandPreMonTracedCustReceipt      += value.preMonTracedCustReceipt;
      grandCurrMonTracedCustCount       += value.currMonTracedCustCount;
      grandCurrMonTracedCustArrear      += value.currMonTracedCustArrear;
      grandCurrMonTracedCustReceipt     += value.currMonTracedCustReceipt;
      grandTotalCurrMonTracedCustCount  += value.totalCurrMonTracedCustCount;
      grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
      grandTotalCurrMonTracedCustReceipt+= value.totalCurrMonTracedCustReceipt;


      phases.table.body.push([
        {
          border: [true, false, true, true],
          text: `${this.translateNumber(serial, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: `${value.zoneName}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]);
    });
   
    // const uniqueZoneCode = [...new Set(data.map((item) => item.zoneCode))];
    
    // uniqueZoneCode.forEach(zone => {
    // let zoneWiseTotalUntracedCustCount = 0;
    // let zoneWiseTotalUntracedCustArrear = 0;
    // let zoneWisePreMonTracedCustCount = 0;
    // let zoneWisePreMonTracedCustArrear = 0;
    // let zoneWisePreMonTracedCustReceipt = 0;
    // let zoneWiseCurrMonTracedCustCount = 0;
    // let zoneWiseCurrMonTracedCustArrear = 0;
    // let zoneWiseCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalCurrMonTracedCustCount = 0;
    // let zoneWiseTotalCurrMonTracedCustArrear = 0;
    // let zoneWiseTotalCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalFinalUntracedCustCount = 0;
    // let zoneWiseTotalfinalarreraramount = 0;

    //   let findCircleListByZoneCodeList = data.filter(e=>e.zoneCode == zone);
    //   if(findCircleListByZoneCodeList.length > 0){
    //     const uniqueCircleCode = [...new Set(findCircleListByZoneCodeList.map((item) => item.circleCode))];
    //     let circleWiseTotalUntracedCustCount = 0;
    //     let circleWiseTotalUntracedCustArrear = 0;
    //     let circleWisePreMonTracedCustCount = 0;
    //     let circleWisePreMonTracedCustArrear = 0;
    //     let circleWisePreMonTracedCustReceipt = 0;
    //     let circleWiseCurrMonTracedCustCount = 0;
    //     let circleWiseCurrMonTracedCustArrear = 0;
    //     let circleWiseCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalCurrMonTracedCustCount = 0;
    //     let circleWiseTotalCurrMonTracedCustArrear = 0;
    //     let circleWiseTotalCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalFinalUntracedCustCount = 0;
    //     let circleWiseTotalfinalarreraramount = 0;
    //     uniqueCircleCode.forEach((eItem) => {
    //       let locationData = data.filter((x) => x.circleCode == eItem);
    //       locationData.forEach((value) => {
    //         circleWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         circleWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         circleWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         circleWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         circleWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         circleWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         circleWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         circleWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         circleWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         circleWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         circleWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         circleWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         circleWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;
            
    //         zoneWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         zoneWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         zoneWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         zoneWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         zoneWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         zoneWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         zoneWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         zoneWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         zoneWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         zoneWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         zoneWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         zoneWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         zoneWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;

    //         serial++;
    
    //         grandTotalUntracedCustCount       += value.totalUntracedCustCount;
    //         grandTotalUntracedCustArrear      += value.totalUntracedCustArrear;
    //         grandPreMonTracedCustCount        += value.preMonTracedCustCount;
    //         grandPreMonTracedCustArrear       += value.preMonTracedCustArrear;
    //         grandPreMonTracedCustReceipt      += value.preMonTracedCustReceipt;
    //         grandCurrMonTracedCustCount       += value.currMonTracedCustCount;
    //         grandCurrMonTracedCustArrear      += value.currMonTracedCustArrear;
    //         grandCurrMonTracedCustReceipt     += value.currMonTracedCustReceipt;
    //         grandTotalCurrMonTracedCustCount  += value.totalCurrMonTracedCustCount;
    //         grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         grandTotalCurrMonTracedCustReceipt+= value.totalCurrMonTracedCustReceipt;
    //         grandTotalFinalUntracedCustCount  += value.totalFinalUntracedCustCount;
    //         grandTotalfinalarreraramount      += value.totalfinalarreraramount;
    
    
    //         phases.table.body.push([
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(serial, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setHead,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${value.locationDesc}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]);
    //       });
    //       let circleNameBn: UntracebleCustArrearReportModel = data.find(
    //         (c) => c.circleCode == eItem
    //       );
    //       phases.table.body.push(
    //         [
    //           {
    //             border: [true, false, true, true],
    //             text: `পওস সার্কেল (${circleNameBn.circleNameBn})`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 2,
    //             rowSpan: 1,
    //             alignment: "center",
    //             //fontSize: 7,
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: ``,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(circleWiseTotalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustArrear
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseTotalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]
            
    //       );
    //     });
    //   }
    //   let zoneData: UntracebleCustArrearReportModel = data.find(
    //     (z) => z.zoneCode == zone
    //   );
    //   phases.table.body.push(
    //     [
    //       {
    //         border: [true, false, true, true],
    //         text: `মোট ${zoneData.zoneName} জোন`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //           // setAgricultureAndPoultryStyles.setTitleBold,
    //         ],
    //         colSpan: 2,
    //         rowSpan: 1,
    //         alignment: "center",
    //         //fontSize: 7,
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: ``,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalUntracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustCount, 0)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustArrear
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustReceipt
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalFinalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalfinalarreraramount)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //     ]
        
    //   );
    // });
    
    

    phases.table.body.push(
      [
        {
          border: [true, false, true, true],
          text: `সর্বমোট`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 2,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustArrear
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]
      
    );

    return phases;
  }


  private getPenaltyArrearInfos(data: UntracedCustArrearMergeSummaryModel[], dateMonth: any) {
    let previousBillMonth = this.getChangesDate(dateMonth - 1);
    let currentBillMonth = this.getChangesDate(dateMonth);
    const phases = {
      table: {
        headerRows:1,
        widths: [40, 60, 60, 65, 65, 60, 65, 65, 60, 65, 65],
        body: [
          [
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাসের পূর্বের মাস ${previousBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, true],
              text: "ক্রমিক নং",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "অঞ্চলের নাম",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "অবৈধ গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "জরিমানার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "অবৈধ গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "জরিমানার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "অবৈধ গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "জরিমানার পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },

          ],
          [
            {
              border: [true, false, true, true],
              text: "১",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "২",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৩",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৪",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৫",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৯=৩+৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১০=৪+৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১১=৫+৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },

          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    /*GrandTotal*/
    let grandTotalUntracedCustCount = 0;
    let grandTotalUntracedCustArrear = 0;
    let grandPreMonTracedCustCount = 0;
    let grandPreMonTracedCustArrear = 0;
    let grandPreMonTracedCustReceipt = 0;
    let grandCurrMonTracedCustCount = 0;
    let grandCurrMonTracedCustArrear = 0;
    let grandCurrMonTracedCustReceipt = 0;
    let grandTotalCurrMonTracedCustCount = 0;
    let grandTotalCurrMonTracedCustArrear = 0;
    let grandTotalCurrMonTracedCustReceipt = 0;
    let grandTotalFinalUntracedCustCount = 0;
    let grandTotalfinalarreraramount = 0;

    let serial = 0;

    data.forEach((value) => {
      serial++;
      grandPreMonTracedCustCount += value.preMonTracedCustCount;
      grandPreMonTracedCustArrear += value.preMonTracedCustArrear;
      grandPreMonTracedCustReceipt += value.preMonTracedCustReceipt;
      grandCurrMonTracedCustCount += value.currMonTracedCustCount;
      grandCurrMonTracedCustArrear += value.currMonTracedCustArrear;
      grandCurrMonTracedCustReceipt += value.currMonTracedCustReceipt;
      grandTotalCurrMonTracedCustCount += value.totalCurrMonTracedCustCount;
      grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
      grandTotalCurrMonTracedCustReceipt += value.totalCurrMonTracedCustReceipt;


      phases.table.body.push([
        {
          border: [true, false, true, true],
          text: `${this.translateNumber(serial, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: `${value.zoneName}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]);
    });

    // const uniqueZoneCode = [...new Set(data.map((item) => item.zoneCode))];

    // uniqueZoneCode.forEach(zone => {
    // let zoneWiseTotalUntracedCustCount = 0;
    // let zoneWiseTotalUntracedCustArrear = 0;
    // let zoneWisePreMonTracedCustCount = 0;
    // let zoneWisePreMonTracedCustArrear = 0;
    // let zoneWisePreMonTracedCustReceipt = 0;
    // let zoneWiseCurrMonTracedCustCount = 0;
    // let zoneWiseCurrMonTracedCustArrear = 0;
    // let zoneWiseCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalCurrMonTracedCustCount = 0;
    // let zoneWiseTotalCurrMonTracedCustArrear = 0;
    // let zoneWiseTotalCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalFinalUntracedCustCount = 0;
    // let zoneWiseTotalfinalarreraramount = 0;

    //   let findCircleListByZoneCodeList = data.filter(e=>e.zoneCode == zone);
    //   if(findCircleListByZoneCodeList.length > 0){
    //     const uniqueCircleCode = [...new Set(findCircleListByZoneCodeList.map((item) => item.circleCode))];
    //     let circleWiseTotalUntracedCustCount = 0;
    //     let circleWiseTotalUntracedCustArrear = 0;
    //     let circleWisePreMonTracedCustCount = 0;
    //     let circleWisePreMonTracedCustArrear = 0;
    //     let circleWisePreMonTracedCustReceipt = 0;
    //     let circleWiseCurrMonTracedCustCount = 0;
    //     let circleWiseCurrMonTracedCustArrear = 0;
    //     let circleWiseCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalCurrMonTracedCustCount = 0;
    //     let circleWiseTotalCurrMonTracedCustArrear = 0;
    //     let circleWiseTotalCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalFinalUntracedCustCount = 0;
    //     let circleWiseTotalfinalarreraramount = 0;
    //     uniqueCircleCode.forEach((eItem) => {
    //       let locationData = data.filter((x) => x.circleCode == eItem);
    //       locationData.forEach((value) => {
    //         circleWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         circleWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         circleWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         circleWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         circleWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         circleWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         circleWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         circleWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         circleWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         circleWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         circleWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         circleWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         circleWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;

    //         zoneWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         zoneWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         zoneWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         zoneWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         zoneWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         zoneWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         zoneWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         zoneWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         zoneWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         zoneWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         zoneWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         zoneWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         zoneWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;

    //         serial++;

    //         grandTotalUntracedCustCount       += value.totalUntracedCustCount;
    //         grandTotalUntracedCustArrear      += value.totalUntracedCustArrear;
    //         grandPreMonTracedCustCount        += value.preMonTracedCustCount;
    //         grandPreMonTracedCustArrear       += value.preMonTracedCustArrear;
    //         grandPreMonTracedCustReceipt      += value.preMonTracedCustReceipt;
    //         grandCurrMonTracedCustCount       += value.currMonTracedCustCount;
    //         grandCurrMonTracedCustArrear      += value.currMonTracedCustArrear;
    //         grandCurrMonTracedCustReceipt     += value.currMonTracedCustReceipt;
    //         grandTotalCurrMonTracedCustCount  += value.totalCurrMonTracedCustCount;
    //         grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         grandTotalCurrMonTracedCustReceipt+= value.totalCurrMonTracedCustReceipt;
    //         grandTotalFinalUntracedCustCount  += value.totalFinalUntracedCustCount;
    //         grandTotalfinalarreraramount      += value.totalfinalarreraramount;


    //         phases.table.body.push([
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(serial, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setHead,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${value.locationDesc}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]);
    //       });
    //       let circleNameBn: UntracebleCustArrearReportModel = data.find(
    //         (c) => c.circleCode == eItem
    //       );
    //       phases.table.body.push(
    //         [
    //           {
    //             border: [true, false, true, true],
    //             text: `পওস সার্কেল (${circleNameBn.circleNameBn})`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 2,
    //             rowSpan: 1,
    //             alignment: "center",
    //             //fontSize: 7,
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: ``,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(circleWiseTotalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustArrear
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseTotalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]

    //       );
    //     });
    //   }
    //   let zoneData: UntracebleCustArrearReportModel = data.find(
    //     (z) => z.zoneCode == zone
    //   );
    //   phases.table.body.push(
    //     [
    //       {
    //         border: [true, false, true, true],
    //         text: `মোট ${zoneData.zoneName} জোন`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //           // setAgricultureAndPoultryStyles.setTitleBold,
    //         ],
    //         colSpan: 2,
    //         rowSpan: 1,
    //         alignment: "center",
    //         //fontSize: 7,
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: ``,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalUntracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustCount, 0)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustArrear
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustReceipt
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalFinalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalfinalarreraramount)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //     ]

    //   );
    // });



    phases.table.body.push(
      [
        {
          border: [true, false, true, true],
          text: `সর্বমোট`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 2,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },

        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustArrear
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]

    );

    return phases;
  }

  private getSupplementaryArrearInfos(data: UntracedCustArrearMergeSummaryModel[], dateMonth: any) {
    let previousBillMonth = this.getChangesDate(dateMonth - 1);
    let currentBillMonth = this.getChangesDate(dateMonth);
    const phases = {
      table: {
        headerRows: 1,
        widths: [40, 60, 60, 65, 65, 60, 65, 65, 60, 65, 65],
        body: [
          [
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, false],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাসের পূর্বের মাস ${previousBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: `মার্চ'২১ হতে রিপোর্টিং মাস ${currentBillMonth} পর্যন্ত`,
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 3,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
          ],
          [
            {
              border: [true, false, true, true],
              text: "ক্রমিক নং",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "অঞ্চলের নাম",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সম্পূরক বিল প্রদানকারী গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: " সম্পূরক বিলের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সম্পূরক বিল প্রদানকারী গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সম্পূরক বিলের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সম্পূরক বিল প্রদানকারী গ্রাহক সংখ্যা",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "সম্পূরক বিলের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "আদায়ের পরিমাণ (টাকা)",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },

          ],
          [
            {
              border: [true, false, true, true],
              text: "১",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setHead,
                // setAgricultureAndPoultryStyles.setTitleBold,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "২",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৩",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, false, true, true],
              text: "৪",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৫",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "৯=৩+৬",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১০=৪+৭",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              text: "১১=৫+৮",
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan: 1,
              alignment: "center",
            },

          ],
        ],
      },
      layout: this.setTableBorder(),
    };

    /*GrandTotal*/
    let grandTotalUntracedCustCount = 0;
    let grandTotalUntracedCustArrear = 0;
    let grandPreMonTracedCustCount = 0;
    let grandPreMonTracedCustArrear = 0;
    let grandPreMonTracedCustReceipt = 0;
    let grandCurrMonTracedCustCount = 0;
    let grandCurrMonTracedCustArrear = 0;
    let grandCurrMonTracedCustReceipt = 0;
    let grandTotalCurrMonTracedCustCount = 0;
    let grandTotalCurrMonTracedCustArrear = 0;
    let grandTotalCurrMonTracedCustReceipt = 0;
    let grandTotalFinalUntracedCustCount = 0;
    let grandTotalfinalarreraramount = 0;

    let serial = 0;

    data.forEach((value) => {
      serial++;
      grandPreMonTracedCustCount += value.preMonTracedCustCount;
      grandPreMonTracedCustArrear += value.preMonTracedCustArrear;
      grandPreMonTracedCustReceipt += value.preMonTracedCustReceipt;
      grandCurrMonTracedCustCount += value.currMonTracedCustCount;
      grandCurrMonTracedCustArrear += value.currMonTracedCustArrear;
      grandCurrMonTracedCustReceipt += value.currMonTracedCustReceipt;
      grandTotalCurrMonTracedCustCount += value.totalCurrMonTracedCustCount;
      grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
      grandTotalCurrMonTracedCustReceipt += value.totalCurrMonTracedCustReceipt;


      phases.table.body.push([
        {
          border: [true, false, true, true],
          text: `${this.translateNumber(serial, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: `${value.zoneName}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            value.totalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]);
    });

    // const uniqueZoneCode = [...new Set(data.map((item) => item.zoneCode))];

    // uniqueZoneCode.forEach(zone => {
    // let zoneWiseTotalUntracedCustCount = 0;
    // let zoneWiseTotalUntracedCustArrear = 0;
    // let zoneWisePreMonTracedCustCount = 0;
    // let zoneWisePreMonTracedCustArrear = 0;
    // let zoneWisePreMonTracedCustReceipt = 0;
    // let zoneWiseCurrMonTracedCustCount = 0;
    // let zoneWiseCurrMonTracedCustArrear = 0;
    // let zoneWiseCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalCurrMonTracedCustCount = 0;
    // let zoneWiseTotalCurrMonTracedCustArrear = 0;
    // let zoneWiseTotalCurrMonTracedCustReceipt = 0;
    // let zoneWiseTotalFinalUntracedCustCount = 0;
    // let zoneWiseTotalfinalarreraramount = 0;

    //   let findCircleListByZoneCodeList = data.filter(e=>e.zoneCode == zone);
    //   if(findCircleListByZoneCodeList.length > 0){
    //     const uniqueCircleCode = [...new Set(findCircleListByZoneCodeList.map((item) => item.circleCode))];
    //     let circleWiseTotalUntracedCustCount = 0;
    //     let circleWiseTotalUntracedCustArrear = 0;
    //     let circleWisePreMonTracedCustCount = 0;
    //     let circleWisePreMonTracedCustArrear = 0;
    //     let circleWisePreMonTracedCustReceipt = 0;
    //     let circleWiseCurrMonTracedCustCount = 0;
    //     let circleWiseCurrMonTracedCustArrear = 0;
    //     let circleWiseCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalCurrMonTracedCustCount = 0;
    //     let circleWiseTotalCurrMonTracedCustArrear = 0;
    //     let circleWiseTotalCurrMonTracedCustReceipt = 0;
    //     let circleWiseTotalFinalUntracedCustCount = 0;
    //     let circleWiseTotalfinalarreraramount = 0;
    //     uniqueCircleCode.forEach((eItem) => {
    //       let locationData = data.filter((x) => x.circleCode == eItem);
    //       locationData.forEach((value) => {
    //         circleWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         circleWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         circleWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         circleWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         circleWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         circleWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         circleWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         circleWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         circleWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         circleWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         circleWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         circleWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         circleWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;

    //         zoneWiseTotalUntracedCustCount +=       value.totalUntracedCustCount;
    //         zoneWiseTotalUntracedCustArrear +=      value.totalUntracedCustArrear;
    //         zoneWisePreMonTracedCustCount +=        value.preMonTracedCustCount;
    //         zoneWisePreMonTracedCustArrear +=       value.preMonTracedCustArrear;
    //         zoneWisePreMonTracedCustReceipt +=      value.preMonTracedCustReceipt;
    //         zoneWiseCurrMonTracedCustCount +=       value.currMonTracedCustCount;
    //         zoneWiseCurrMonTracedCustArrear +=      value.currMonTracedCustArrear;
    //         zoneWiseCurrMonTracedCustReceipt +=     value.currMonTracedCustReceipt;
    //         zoneWiseTotalCurrMonTracedCustCount +=  value.totalCurrMonTracedCustCount;
    //         zoneWiseTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         zoneWiseTotalCurrMonTracedCustReceipt +=value.totalCurrMonTracedCustReceipt;
    //         zoneWiseTotalFinalUntracedCustCount +=  value.totalFinalUntracedCustCount;
    //         zoneWiseTotalfinalarreraramount +=      value.totalfinalarreraramount;

    //         serial++;

    //         grandTotalUntracedCustCount       += value.totalUntracedCustCount;
    //         grandTotalUntracedCustArrear      += value.totalUntracedCustArrear;
    //         grandPreMonTracedCustCount        += value.preMonTracedCustCount;
    //         grandPreMonTracedCustArrear       += value.preMonTracedCustArrear;
    //         grandPreMonTracedCustReceipt      += value.preMonTracedCustReceipt;
    //         grandCurrMonTracedCustCount       += value.currMonTracedCustCount;
    //         grandCurrMonTracedCustArrear      += value.currMonTracedCustArrear;
    //         grandCurrMonTracedCustReceipt     += value.currMonTracedCustReceipt;
    //         grandTotalCurrMonTracedCustCount  += value.totalCurrMonTracedCustCount;
    //         grandTotalCurrMonTracedCustArrear += value.totalCurrMonTracedCustArrear;
    //         grandTotalCurrMonTracedCustReceipt+= value.totalCurrMonTracedCustReceipt;
    //         grandTotalFinalUntracedCustCount  += value.totalFinalUntracedCustCount;
    //         grandTotalfinalarreraramount      += value.totalfinalarreraramount;


    //         phases.table.body.push([
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(serial, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setHead,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${value.locationDesc}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(value.totalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.preMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.currMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               value.totalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(value.totalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]);
    //       });
    //       let circleNameBn: UntracebleCustArrearReportModel = data.find(
    //         (c) => c.circleCode == eItem
    //       );
    //       phases.table.body.push(
    //         [
    //           {
    //             border: [true, false, true, true],
    //             text: `পওস সার্কেল (${circleNameBn.circleNameBn})`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //               // setAgricultureAndPoultryStyles.setTitleBold,
    //             ],
    //             colSpan: 2,
    //             rowSpan: 1,
    //             alignment: "center",
    //             //fontSize: 7,
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: ``,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, false, true, true],
    //             text: `${this.translateNumber(circleWiseTotalUntracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustCount, 0)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWisePreMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustArrear)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseCurrMonTracedCustReceipt)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustArrear
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalCurrMonTracedCustReceipt
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(
    //               circleWiseTotalFinalUntracedCustCount,
    //               0
    //             )}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //           {
    //             border: [true, true, true, true],
    //             text: `${this.translateNumber(circleWiseTotalfinalarreraramount)}`,
    //             style: [
    //               setAgricultureAndPoultryStyles.setCenter,
    //               setAgricultureAndPoultryStyles.setFontBangla,
    //             ],
    //             colSpan: 1,
    //             rowSpan: 1,
    //             alignment: "center",
    //           },
    //         ]

    //       );
    //     });
    //   }
    //   let zoneData: UntracebleCustArrearReportModel = data.find(
    //     (z) => z.zoneCode == zone
    //   );
    //   phases.table.body.push(
    //     [
    //       {
    //         border: [true, false, true, true],
    //         text: `মোট ${zoneData.zoneName} জোন`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //           // setAgricultureAndPoultryStyles.setTitleBold,
    //         ],
    //         colSpan: 2,
    //         rowSpan: 1,
    //         alignment: "center",
    //         //fontSize: 7,
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: ``,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, false, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalUntracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustCount, 0)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWisePreMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustArrear)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseCurrMonTracedCustReceipt)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustArrear
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalCurrMonTracedCustReceipt
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(
    //           zoneWiseTotalFinalUntracedCustCount,
    //           0
    //         )}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //       {
    //         border: [true, true, true, true],
    //         text: `${this.translateNumber(zoneWiseTotalfinalarreraramount)}`,
    //         style: [
    //           setAgricultureAndPoultryStyles.setCenter,
    //           setAgricultureAndPoultryStyles.setFontBangla,
    //         ],
    //         colSpan: 1,
    //         rowSpan: 1,
    //         alignment: "center",
    //       },
    //     ]

    //   );
    // });



    phases.table.body.push(
      [
        {
          border: [true, false, true, true],
          text: `সর্বমোট`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setHead,
            // setAgricultureAndPoultryStyles.setTitleBold,
          ],
          colSpan: 2,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, false, true, true],
          text: ``,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },

        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustCount, 0)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandPreMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustArrear)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(grandCurrMonTracedCustReceipt)}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustCount,
            0
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustArrear
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
        {
          border: [true, true, true, true],
          text: `${this.translateNumber(
            grandTotalCurrMonTracedCustReceipt
          )}`,
          style: [
            setAgricultureAndPoultryStyles.setCenter,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          colSpan: 1,
          rowSpan: 1,
          alignment: "center",
        },
      ]

    );

    return phases;
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
}
