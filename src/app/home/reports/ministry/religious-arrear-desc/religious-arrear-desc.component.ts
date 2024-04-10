import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinistryService } from '../../../../services/ministry.service';
import { MinistryArrearCustomerService } from '../../../../services/pdfGenerate/ministry/ministry-arrear-customer.service';
import { NbToastrService } from '@nebular/theme';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { ReligiousArrearReportService } from '../../../../services/pdfGenerate/ministry/religious-arrear-report.service';
import { ReligiousArrearData } from '../../../../model/religious-arrear-data.model';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ReligiousSetupService } from '../../../../services/religious-setup.service';
import { ReligiousArrearSummary } from '../../../../model/religious/religious-arrear-summary.model';

@Component({
  selector: 'ngx-religious-arrear-desc',
  templateUrl: './religious-arrear-desc.component.html',
  styleUrls: ['./religious-arrear-desc.component.scss']
})
export class ReligiousArrearDescComponent implements OnInit {
  religiousDateform: FormGroup;
  public isTrue: boolean=false;
  public report: any;
  isProgress:boolean=false;
  submitted:boolean=false;
  docData: any;
  documentTitle = "";
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    // {"id":2,"name":".xls"},
  ]

  religiousData: ReligiousArrearSummary[]=[];

  constructor(
    private fb: FormBuilder,
    private _service: ReligiousSetupService,
    private _pdfService: ReligiousArrearReportService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'Religious Arrear Summary ' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    // else if(event==2 || event==3){
    //   let excelObj = {
    //     data: this.docData.docDefinition.content[0].table.body,
    //   }
    //   this._excelService.downloadExcelFile(excelObj, 'Religious Arrear Summary ');
    // }
}
  public onReport()
  {
    this.isProgress=true;
    this.submitted=true;
    if(this.religiousDateform.invalid) { this.isProgress = false;return};

    this._service.getReligiousArrearSummary().subscribe((res:any)=>{
      this.religiousData=res as ReligiousArrearSummary[];
      if(this.religiousData.length>0){
        this.docData=this._pdfService.generatePdf(this.religiousData); 
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
  
  onSearchAgain(){
    this.isTrue=false;
  }
  

  private createForm(){
    this.religiousDateform = this.fb.group({
      // currentDate: ['',[Validators.required]]
    })
  }

  get formVal() {
    return this.religiousDateform.value;
  }

  get f() {
    return this.religiousDateform.controls;
  }
}
