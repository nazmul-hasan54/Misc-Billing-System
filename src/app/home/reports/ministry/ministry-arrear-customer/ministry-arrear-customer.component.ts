import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { MinistryDept } from '../../../../model/ministry-dept.model';
import { MinistryService } from '../../../../services/ministry.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { MinistryArrearCustomerService } from '../../../../services/pdfGenerate/ministry/ministry-arrear-customer.service';

@Component({
  selector: 'ngx-ministry-arrear-customer',
  templateUrl: './ministry-arrear-customer.component.html',
  styleUrls: ['./ministry-arrear-customer.component.scss']
})
export class MinistryArrearCustomerComponent implements OnInit {
 public form: FormGroup;
 public isTrue:boolean=false;
 public report: any;
  ministryData: any;
  isProgress:boolean=false;
  submitted:boolean=false;

  docData: any;
  documentTitle = "";
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ]
  public ministryDeptData: MinistryDept[] = [];
 
  constructor(
    private fb: FormBuilder,
    private _service: MinistryService,
    private _pdfService: MinistryArrearCustomerService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService,
    private _datePipe: DatePipe
    ) { }

  ngOnInit(): void {
    this.createForm();
  }
  private createForm(){
    this.form = this.fb.group({
      currentDate: ['',[Validators.required]]
    })
  }

  public onSearchAgain(){
    this.isTrue=false;
  }

  get formCon(){
    return this.form.controls;
  }
  
  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Ministry Arrear Customer'+dateFormatForReport(date);
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
      this._excelService.downloadExcelFile(excelObj, 'Ministry Arrear Customer List');
    }
  }

  public onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) { this.isProgress = false;return};
    let reportObj ={
      currentDate: this._datePipe.transform(this.formCon.currentDate.value, 'yMM')
    }
    // this.updateVisitor();
    this._service.getAllMinistryArrear(reportObj.currentDate).subscribe(res=>{
      this.ministryData=res.data;
      if(this.ministryData.length>0){
        this.docData=this._pdfService.generatePdf(this.ministryData, reportObj.currentDate); 
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
}
