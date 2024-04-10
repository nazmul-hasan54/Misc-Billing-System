import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { CommonService } from '../../../../services/common.service';
import { AgricultureWiseCustomerService } from '../../../../services/pdfGenerate/agriculture/agriculture-wise-customer.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { DatePipe } from '@angular/common';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ngx-agriculture-wise-customer-list',
  templateUrl: './agriculture-wise-customer-list.component.html',
  styleUrls: ['./agriculture-wise-customer-list.component.scss']
})
export class AgricultureWiseCustomerListComponent implements OnInit {

  agricultureList: any[]=[];
  agricultureForm:FormGroup;
  isTrue:boolean=false;
  isProgress:boolean=false;
  submitted:boolean=false;
  report: any;
   documentTitle = "";
  docData:any;
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ]
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private _fb:FormBuilder,
    private _commonService:CommonService,
    private _agricultureService:AgricultureWiseCustomerService,
    private _toasterService: NbToastrService,
    private _datePipe: DatePipe,
    private _excelService:ExcelServiceService
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
    this.submitted=true;
    if(this.agricultureForm.invalid) { this.isProgress = false;return};
    // this.updateVisitor();
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
    this.agricultureForm=this._fb.group({
      billMonth:['',[Validators.required]],
      exportType:[1,[]],
      report:[,[]],
      documentTitle:[,[]]
    })
  }

  get formVal(){
    return this.agricultureForm.value;
  }

  get f(){
    return this.agricultureForm.controls;
  }

}
