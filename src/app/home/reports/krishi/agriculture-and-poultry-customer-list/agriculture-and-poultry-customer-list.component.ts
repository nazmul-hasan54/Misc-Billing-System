import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport, dateFormatISO } from '../../../../@core/utils/utiliy';
import { CommonService } from '../../../../services/common.service';
import { AgricultureWiseCustomerService } from '../../../../services/pdfGenerate/agriculture/agriculture-wise-customer.service';
import { PoultryListService } from '../../../../services/pdfGenerate/agriculture/poultry-list.service';
import { AgricultureAndPoultryWiseCustomerListService } from '../../../../services/pdfGenerate/agriculture/agriculture-and-poultry-customer-list.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-agriculture-and-poultry-customer-list',
  templateUrl: './agriculture-and-poultry-customer-list.component.html',
  styleUrls: ['./agriculture-and-poultry-customer-list.component.scss']
})
export class AgricultureAndPoultryCustomerListComponent implements OnInit {
  agriculturePoultryform:FormGroup;
  isTrue:boolean=false;
  isProgress:boolean=false;
  submitted: boolean = false;
  report: any;
   documentTitle = "";
  docData:any;
  poultryCustomerList:any[]=[];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
   reportTypeList:any[]=[
    {"id":1,"name":"Agriculture and Poultry"},
    {"id":2,"name":"Agriculture"},
    {"id":3,"name":"Poultry"},
  ]
  agricultureList: any;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private _fb:FormBuilder,
    private _commonService:CommonService,
    private _krishiService:AgricultureAndPoultryWiseCustomerListService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService,
    private _agricultureService:AgricultureWiseCustomerService,
    private _poultryService: PoultryListService,
    private _datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public updateVisitor(): void {
    const objParam = { ID: 1, TOTALVISITOR: 0 };
    this._commonService.updateTotalVisitorCount(objParam).subscribe(() => {

    },()=>{
      this._toasterService.danger("Something is Wrong !!!!")
    });
  }
  onSearchAgain(){
    this.isTrue=false;
  }
  space(e:any){
    if(e.charCode===32){
      e.preventDefault();
    }
  }
  onReport(){
    let reportObj={
      billMonth:this._datePipe.transform(this.f.billMonth.value,"yMM")
    }
    this.isProgress=true;
    this.submitted = true;
    if(this.agriculturePoultryform.invalid) { this.isProgress = false;return};
    if(this.agriculturePoultryform.value.reportType == 1){
      this._krishiService.getKrishiPoultryCustomers(reportObj.billMonth).subscribe(res=>{
        this.poultryCustomerList=res.data;
        if(this.poultryCustomerList.length>0){
          this.docData=this._krishiService.generatePdf(this.poultryCustomerList, reportObj.billMonth); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
  
          });
        }
  
        else{
          this.isTrue = false;
          this._toasterService.danger("No Data Found");
          this.isProgress=false;
        }
      }, err=>{
        this.isProgress=false;
      });
    }
    else if(this.agriculturePoultryform.value.reportType == 2){ // agriculture
      this._agricultureService.getAgricultureCustomer(reportObj.billMonth).subscribe(res=>{
        this.agricultureList=res.data;
        if(this.agricultureList.length>0){
          this.docData=this._agricultureService.generatePdf(this.agricultureList, reportObj.billMonth); 
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
  
          this.isProgress=false;
          });
        }
  
        else{
          this.isTrue = false;
          this._toasterService.danger("No Data Found");
          this.isProgress=false;
        }
      }, err=>{
        this.isProgress=false;
      });
    }else{//poultry
      this._poultryService.getPoultryCustomers(reportObj.billMonth).subscribe(res => {
        this.poultryCustomerList = res.data;
        if (this.poultryCustomerList.length > 0) {
          this.docData = this._poultryService.generatePdf(this.poultryCustomerList, reportObj.billMonth);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
          });
        }
  
        else {
          this.isTrue = false;
          this._toasterService.danger("No Data Found");
          this.isProgress=false;
        }
      }, err=>{
        this.isProgress=false;
      });
    }
   
  }
  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='krishi-poultry'+dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Agriculture and Poultry Customer List');
    
    }
  }
  createForm(){
    this.agriculturePoultryform=this._fb.group({
      billMonth:['', [Validators.required]],
      exportType:[1,[]],
      reportType: [1]
    })
  }

  get formVal(){
    return this.agriculturePoultryform.value;
  }

  get f(){
    return this.agriculturePoultryform.controls;
  }

}
