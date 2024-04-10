import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MisReportService } from '../../../../services/mis-report.service';
import { NewUserByCenterLocationService } from '../../../../services/new-user-by-center-location.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { CenterWiseRegularCustomerArrearService } from '../../../../services/pdfGenerate/mis-report/center-wise-regular-customer-arrear.service';

@Component({
  selector: 'ngx-regular-customer-arrear-summary',
  templateUrl: './regular-customer-arrear-summary.component.html',
  styleUrls: ['./regular-customer-arrear-summary.component.scss']
})
export class RegularCustomerArrearSummaryComponent implements OnInit {

  regularCustomerForm: FormGroup;
  submitted: boolean = false;
  allCenter:any[];
  docData: any;
  documentTitle: any;
  report: any;
  isTrue: boolean = false;
  regularCustomerArrearList: any[];
  exportTypeList: any[] = [
    {'id': 1, 'name':'.pdf'},
    {'id': 2, 'name': '.xls'}
  ];
  isProgress: boolean = false;
  constructor(
    private _getCenterService: NewUserByCenterLocationService,
    private _fb: FormBuilder,
    private _excelService: ExcelServiceService,
    private _misReport: MisReportService,
    private _datePipe: DatePipe,
    private _centerWiseCustSummary: CenterWiseRegularCustomerArrearService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCenterDD();
  }

  createForm(){
    this.regularCustomerForm = this._fb.group({
      centerCode: ['0',[Validators.required]],
      billMonth: [,[Validators.required]],
      isAll: [true,[]],
      isPrn: [true,[]],
      isLps: [true,[]],
      isVat: [true,[]]
    })
  }

  private getAllCenterDD() {
    this._getCenterService.getAllDatabase().subscribe((response) => {
      this.allCenter = response.data.data;
    });
  }

  onChangeExportType(event: any){
    if(event==1){
      let date=new Date();
      let fileName='Customer Arrear Summary';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Customer Arrear Summary');
    
    }
  }

  onSearchAgain(){
    this.isTrue = false;
  }

  onReport(){

    this.isProgress = true;
    if(this.regularCustomerForm.invalid) {this.isProgress = false; return}
    let obj = {
      billMonth: this._datePipe.transform(this.f.billMonth.value, 'yMM'),
      centerName: this.allCenter.find(x=> x.code == this.f.centerCode.value )  
    }
    this._misReport.getAllRegularCustomerArrearSummary(this.regularCustomerForm.value, this.f.centerCode.value, obj.billMonth, 0, 0).subscribe((res: any) => {
      this.regularCustomerArrearList = res.data;
      console.log(this.regularCustomerArrearList);
      if(this.regularCustomerArrearList.length > 0){
        this.docData = this._centerWiseCustSummary.generatePdf(this.regularCustomerArrearList, obj.centerName?.dbName, obj.billMonth);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      }
    })
  }

  get f(){
    return this.regularCustomerForm.controls;
  }

  get formVal(){
    return this.regularCustomerForm.value;
  }

  space(e: any){
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

}
