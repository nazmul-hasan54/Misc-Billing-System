import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import dayjs from 'dayjs';
import * as pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from '../../../../assets/vfs_fonts';
import { setPdfMakeFonts } from '../../../@core/pdfMakeConfig/pdf-make-config';
import { miscDefaultStyle, setAgricultureAndPoultryStyles, setAllCustomerArrearStyle, misMinistryArrearStyle, setHeading, setSubSetHeading, setFourthHeading} from '../config/pdfMakeConfig';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;
@Injectable({
  providedIn: 'root'
})
export class MinistryArrearCustomerService {
  defaultColor= "#0c0d0d"
  constructor(private http:HttpClient) { }

  
  generatePdf(data:any, reportObject:any) {
    //@ts-ignore
    pdfMake.fonts = setPdfMakeFonts;
    //@ts-ignore
    const documentDefinition = this.getDocumentDefinition(data,reportObject);
    //@ts-ignore
    return pdfMake.createPdf(documentDefinition);
  }

  private getDocumentDefinition(data:any, reportObject:any,billMonth:any) {
    return {
      info: {
        title: 'Ministry Arrear Customer',
        author: 'BPDB',
        subject: 'Ministry Arrear Customer',
        keywords: 'keywords for document',
        // creationDate: Date.now(),
      },
      pageSize: 'A4',
      footer: (currentPage, PageCount)=> {
        return {
          table: {
            widths: ['*', '*'],
            body: [
              [
                { text: `পৃষ্ঠা ${this.translateNumber(currentPage, 2)} এর ${this.translateNumber(PageCount, 2)}`, style: ['setFooterLeft'], margin: [30, 5, 30, 0] }, 
                { text: this.translateNumber(dayjs(new Date()).format('DD/MM/YYYY'), 2), style: ['setFooterRight'], margin: [30, 5, 30, 0] }
              ],
            ]
          },
          layout: 'noBorders'
        }
      },
      content: [this.getHeading(reportObject),this.getMinistryCustomerInfo(data,reportObject)],
      defaultStyle: {
        font: 'bangla',
        alignment: 'center',
        fontSize: 7.4,
        color: '#111',
      },
      pageMargins: [30, 30, 30, 30],
      styles: setAllCustomerArrearStyle,
    
    };
  }

  private translateNumber(num, option = 1) {
    let banglaDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"]
    if (option == 1) {
      num = Number(num).toLocaleString(undefined, { minimumFractionDigits: 2 })
    }
    return num.toString().replace(/\d/g, x => banglaDigits[x]);
  }
  
  year: any;
  month: any;
  private getHeading(billMonth: any) {
    // let billCode=billMonth;
    if(billMonth!=null){
      let dateBn = this.translateNumber(dayjs(billMonth).format('DD-MM-YY'),2);
      this.year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
      this.month = this.getBanglaMonth(billMonth);
    }else{
      this.year='';
      this.month='';
    }
    return {
      table: {
        margin: [0,0,0,0],
        widths: [50, 50, '*', '*', 60, 40],
        // headerRows:2,
        body: [
          [
            {
              image: `logo.png`,
              width: 60,
              height: 55,
              rowSpan: 2,
              colSpan: 2,
              alignment: 'right',
              margin: [-15, -15, 0, 0],
              border: [false,false,false,false],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              border: [false, false, false, false],
              text: 'বিভিন্ন সরকারি/আধা-সরকারি/স্বায়তশাসিত প্রতিষ্ঠান/কর্পোরেশন সমূহের নিকট',
              colSpan: 4,
              bold: true,
              style: [setSubSetHeading],
              margin: [-50, -10, 0, 0],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
          ],
          [
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            { 
              border: [false, false, false, false], 
              text: '' 
            },
            {
              border: [false, false, false, false],
              text: `বিদ্যুৎ বিতরণী সংস্থা/কোম্পানি বকেয়া বিলের বিবরনীঃ`,
              bold: true,
              colSpan: 2,
              style: [setFourthHeading],
              margin: [20, 0, 0, 0],
            },
            {},
            {
              text: '',
              border: [false, false, false, false],
              colSpan: 2,
              style: ['setBig', 'setBlack', 'setLeft'],
            },
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
          ],
          [
            {
              text: '',
              border: [false, false, false, false],
              style: ['setBig'],
            },
            { 
              border: [false, false, false, false], 
              text: '' 
            },
            {
              border: [false, false, false, false],
              text: `${this.month}-${this.year} ইং পর্যন্ত ।`,
              bold: true,
              colSpan: 2,
              style: [setFourthHeading],
              margin: [10, -15, 0, 0],
            },
            {},
            {
              text: `(কোটি টাকায়)`,
              border: [false, false, false, false],
              colSpan: 2,
              style: ['setBlack', setAgricultureAndPoultryStyles.setFontBangla,],
              margin: [50, 0, 0, 0]
            },
            {
              text: '',
              border: [false, false, false, false],
              style: [],
            },
          ],
        ],
      },
      layout: this.setTableBorder(),
    };
  }

  private getMinistryCustomerInfo(data:any,billMonth:any) {
    if(billMonth!=null){
      let dateBn = this.translateNumber(dayjs(billMonth).format('DD-MM-YY'),2);
      this.year = this.translateNumber(dayjs(billMonth).format("YYYY"), 2);
      this.month = this.getBanglaMonth(billMonth);
    }else{
      this.year='';
      this.month='';
    }
    const phases = {
      table: {
        headerRows: 1,
        widths: [25, '*','auto', 'auto', 'auto','auto', 40, 40, 40, 40,'auto',50],
        body: [
          [
            {
              border: [true, true, true, true],
              text: 'ক্রমিক নং',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
              rowSpan:1,
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
                setAgricultureAndPoultryStyles.setLeft,
                
              ],
              text: 'মন্ত্রনালয়/বিভাগের নাম',
              //rowSpan:2,
              colSpan:3,
              margin: [0, 0, 0, 0],
              alginment:'center'

            },{ },{ },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setRight,setAgricultureAndPoultryStyles.setFontBangla],
              text: 'বিউবো',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {

              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: 'পবিবো',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: 'ডিপিডিসি',
              alignment: "center",
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],

              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text:  'ডেসকো',
              margin: [0, 0, 0, 0],
              //alignment: 'center',
          
            },
            {
              text: 'ওজোপাডিকো',
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              alignment: "center",
              
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: 'নেসকো',
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: 'আদায়ের পরিমান',
              alignment: "center",
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,],
              text: 'মন্তব্য',
              //alignment: 'center',
              alignment: "center",
              rowSpan: 2
            },
          ],
          [
            {
              border: [true, true, true, true],
              text: '',
              style: [
                setAgricultureAndPoultryStyles.setCenter,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              colSpan: 1,
             rowSpan:1,
             margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
                setAgricultureAndPoultryStyles.setLeft,
              ],
              alignment: "left",
              text: '',
              margin: [0, 0, 0, 0],
              colSpan:3
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setRight,
                setAgricultureAndPoultryStyles.setFontBangla,
                misMinistryArrearStyle.setRight],
              text: `${this.month}'${this.year}`,
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setRight,
                setAgricultureAndPoultryStyles.setFontBangla,
                misMinistryArrearStyle.setRight],
                alignment: 'center',
                text: `${this.month}'${this.year}`,
                margin: [0, 0, 0, 0],
                },
            {
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setRight, 
                setAgricultureAndPoultryStyles.setFontBangla,
                misMinistryArrearStyle.setRight],
              text: `${this.month}'${this.year}`,
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {

              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              text: `${this.month}'${this.year}`,
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: `${this.month}'${this.year}`,
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],

              style: [setAgricultureAndPoultryStyles.setFontBangla],
              text: `${this.month}'${this.year}`,
              alignment: 'center',
              margin: [0, 0, 0, 0],
          
            },
            {
              text: `${this.month}'${this.year}`,
              border: [true, true, true, true],
              style: [
                setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,
              ],
              alignment: 'center',
              margin: [0, 0, 0, 0],
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
              setAgricultureAndPoultryStyles.setFontBangla,],
              text: `${this.month}'${this.year}`,
              alignment: 'center',
            },
           
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,],
              text: '',
              //alignment: 'center',
             // rowSpan:2
            },
            {
              border: [true, true, true, true],
              style: [setAgricultureAndPoultryStyles.setBlack,
                setAgricultureAndPoultryStyles.setFontBangla,],
              text: '',
              //alignment: 'center',
             // rowSpan:2
            },
          ]
          
        ],
      },
      layout: this.setTableBorder(),
    };

   

    let totalDues=0;
    let serial=1;
    let custSerial=0;
    let count = [];
    let biboTotal = 0;
    let agricultureValue = "";
    let val = 0;
    let biboValue = 0;
    let totalBill = 0;
    let totalAmount;
    let totalReceiptAmount = 0;
    data.forEach(ministryData => {
      let ministryDept = data.filter(x =>x.ministryCode == ministryData.ministryCode && x.hasDepartment == 1);
       if(ministryDept.length > 0){
        biboValue =0;
        ministryDept.forEach(item =>{
          biboValue += item.bill;
        })
      }
      let ministryTaka=Number(biboValue/10000000).toFixed(2)
  

      custSerial++;
      let {ministryNameBn,ministryCode, deptNameBn, deptCode, bill,hasDepartment, receiptAmount}= ministryData;

      totalBill += bill;
      let ministryBill = Number((bill / 10000000) > 0 ? (bill / 10000000):0.00).toFixed(2);
      hasDepartment == 1 ? serial : serial++;
     
      //arreaR_AMT = arreaR_AMT ? this.translateNumber(arreaR_AMT) : this.translateNumber(0.00);
      if(hasDepartment == 1){
        biboTotal += bill;
        val++;
        count.push(biboTotal);
      }

      if(ministryCode==2){
        ministryBill = Number(((bill-17900000) / 10000000) > 0 ? ((bill-17900000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==4){
        ministryBill = Number(((bill-7500000) / 10000000) > 0 ? ((bill-7500000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==6){
        ministryBill = Number(((bill-3050000) / 10000000) > 0 ? ((bill-3050000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==8){
        ministryBill = Number(((bill-5500000) / 10000000) > 0 ? ((bill-5500000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==11){
        ministryBill = Number(((bill-6370000) / 10000000) > 0 ? ((bill-6370000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==14){
        ministryBill = Number(((bill-6800000) / 10000000) > 0 ? ((bill-6800000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==15){
        ministryBill = Number(((bill-1300000) / 10000000) > 0 ? ((bill-1300000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==16){
        ministryBill = Number(((bill-7700000) / 10000000) > 0 ? ((bill-7700000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==17){
        ministryBill = Number(((bill-1700000) / 10000000) > 0 ? ((bill-1700000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==20){
        ministryBill = Number(((bill-3100000) / 10000000) > 0 ? ((bill-3100000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==35){
        ministryBill = Number(((bill-1250000) / 10000000) > 0 ? ((bill-1250000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==37){
        ministryBill = Number(((bill-1150000) / 10000000) > 0 ? ((bill-1150000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==40){
        ministryBill = Number(((bill-900000) / 10000000) > 0 ? ((bill-900000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==48){
        ministryBill = Number(((bill-3300000) / 10000000) > 0 ? ((bill-3300000) / 10000000):0.00).toFixed(2);
      }
      else if(ministryCode==51){
        ministryBill = Number(((bill-750000) / 10000000) > 0 ? ((bill-750000) / 10000000):0.00).toFixed(2);
      }
      totalDues+=Number(ministryBill);
      
      totalAmount=totalDues;
      totalReceiptAmount += receiptAmount;
      
      phases.table.body.push(
      [
        {
          border:hasDepartment == 1 ? [true, false, true, false]: [true, true, true, true],
          text: `${agricultureValue == ministryNameBn ? '' :this.translateNumber(serial,2)}`,
          style: [setAgricultureAndPoultryStyles.setFontBangla,
            setAgricultureAndPoultryStyles.setLeft, ],
          colSpan: 1,
          margin: [0, 0, 0, 0],
          alignment: "left",
          //rowSpan:hasDepartment == 1? 1 : 3
        },
        {
          border:  hasDepartment == 1 ? [true, false, true, false]: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          alignment: "left",
          margin:  hasDepartment ==1 ? [0, 20, 0, -20] :[0, 0, 0, 0],
          text: `${agricultureValue == ministryNameBn ? " ": ministryNameBn}`,
          colSpan: hasDepartment == 1? 1 : 3,
        },
        {
          border: [true, true, true, true],
          style: [ setAgricultureAndPoultryStyles.setFontBangla],
          text: `${deptNameBn}`,
          margin: [0, 0, 0, 0],
          alignment: "left",
        },
        {
            // text: `${this.translateNumber((bill / 10000000).toFixed(2)) }`,
          text: `${this.translateNumber(Number(bill/10000000).toFixed(2))}`,
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
        {
          border:  hasDepartment == 1 ? [true, false, true, false]: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: `${hasDepartment == 1 ? agricultureValue == ministryNameBn ? " " : this.translateNumber(ministryTaka, 0) : this.translateNumber(ministryBill,0)}`,
          //text: `${hasDepartment == 1 ? agricultureValue == ministryNameBn ? " " : this.translateNumber(Number(biboValue / 100000).toFixed(2), 0) : this.translateNumber(Number(bill / 100000).toFixed(2),0)}`,
          alignment: 'right',
          // margin: [0, 0, 0, 0],
          margin:  hasDepartment ==1 ? [0, 20, 0, -20] :[0, 0, 0, 0],
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: 'right',
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: 'right',
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: 'right',
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          alignment: 'right',

        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: ``,
          alignment: 'right',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: `${this.translateNumber(Number(receiptAmount/10000000).toFixed(2))}`,
          alignment: 'right',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: ``,
        }
      ]
      )
      agricultureValue = ministryNameBn; 
     
    });
   
    count =[];
    console.log(count);

    phases.table.body.push(
      [
        {
          border: [true, true, true, true],
          text: `মোট`,
          style: [setAgricultureAndPoultryStyles.setFontBangla,
            setAgricultureAndPoultryStyles.setLeft,],
          colSpan: 4,
          alignment: 'right',
          margin: [0, 0, 0, 0],
        },
        {
          border:  [true, false, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
            setAgricultureAndPoultryStyles.setLeft,
          ],
          alignment: "left",
          text: ``,
          margin: [0, 0, 0, 0],
          colSpan: 3
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla,
            setAgricultureAndPoultryStyles.setLeft,],
          text: ``,
          margin: [0, 0, 0, 0],
        },
        {

          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],
          text: ``,
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setFontBangla],
          //text: `${this.translateNumber(Number(totalDues / 100000).toFixed(2),2)}`,
          text: `${this.translateNumber(Number(totalAmount).toFixed(2))}`
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: "left",
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: "left",
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          border: [true, true, true, true],

          style: [setAgricultureAndPoultryStyles.setFontBangla],
          text: ``,
          alignment: "left",
          margin: [0, 0, 0, 0],
          colSpan: 1
        },
        {
          text: ``,
          border: [true, true, true, true],
          style: [
            setAgricultureAndPoultryStyles.setBlack,
            setAgricultureAndPoultryStyles.setFontBangla,
          ],

        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: ``,
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: `${this.translateNumber(Number(totalReceiptAmount / 10000000).toFixed(2))}`,
          alignment: 'right',
        },
        {
          border: [true, true, true, true],
          style: [setAgricultureAndPoultryStyles.setBlack,
          setAgricultureAndPoultryStyles.setFontBangla,],
          text: ``,
        }
      ]
    )
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

  private formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2,      
    maximumFractionDigits: 2,
 });

}
