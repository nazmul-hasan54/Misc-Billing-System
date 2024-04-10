import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { NonBengaliSummary } from '../../../../model/nonBengali-summary.model';
import { NonBengaliService } from '../../../../services/non-bengali.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { NonBengaliBiharyBillArrearService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/non-bengali-bihary-bill-arrear.service';
import { NonBengaliDetailsService } from '../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/non-bengali-details.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';

@Component({
  selector: 'ngx-non-bengali-bihary-bill-arrear-doc',
  templateUrl: './non-bengali-bihary-bill-arrear-doc.component.html',
  styleUrls: ['./non-bengali-bihary-bill-arrear-doc.component.scss']
})
export class NonBengaliBiharyBillArrearDocComponent implements OnInit {

  public form: FormGroup;
  submitted:boolean=false;
  public isTrue:boolean=false;
  isProgress:boolean=false;
  public report: any;
  pouroshovaAndCityData: any;
  docData: any;
  locationList: any[];
  nonBengaliData: any;
  nonBengaliSummaryData: NonBengaliSummary[];
  zoneDataList: any[];
  documentTitle = "";
  reportType: any[]=[
    {"key":'1', "value":"Summary"},
    {"key":'2', "value":"Details"},
  ];
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  cityCorporationDataList: any;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  constructor(
    private _service: PourAndCityCorporService,
    private _nonBengaliService: NonBengaliService,
    private fb: FormBuilder,
    private _pdfService: NonBengaliBiharyBillArrearService,
    private _pdfNonBengaliDetails:NonBengaliDetailsService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllLocationList();
  }
  space(e:any){
    if(e.charCode===32){
      e.preventDefault();
    }
  }
  private createForm(){
    this.form = this.fb.group({
      validDate: ['',[Validators.required]],
      reportType: ['1'],
    })
  }


  private getAllLocationList(){
    this._nonBengaliService.getAllLocation().subscribe( res => {
      this.locationList = res.data;
    });
  }

  get formCon(){
    return this.form.controls;
  }

  public onSearchAgain(){
    this.isTrue=false;
  }

  onChangeExportType(event:any){
    if(this.formCon.reportType.value=='1'){
      if(event==1){
        let date=new Date();
        let fileName='Non-Bengali (Bihary Camp) Summary Report '+dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
        let arr = [...this.docData.docDefinition.content[0].table.body,...this.docData.docDefinition.content[1].table.body,...this.docData.docDefinition.content[2].table.body]
        let excelObj = {
          data: arr,
        }
        this._excelService.downloadExcelFile(excelObj, 'Non-Bengali (Bihary Camp) Summary Report ');
      }
    }
    else{
      if(event==1){
        let date=new Date();
        let fileName='Non-Bengali (Bihary Camp) Details Report '+dateFormatForReport(date);
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
        this._excelService.downloadExcelFile(excelObj, 'Non-Bengali (Bihary Camp) Details Report ');
      }
    }
  }

  public onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) {this.isProgress=false;return;}
  
    let utilityObj = {
      billMonth:this.datePipe.transform(this.formCon.validDate.value, 'yMM'),
      // billMonth:this.formCon.validDate.value,
     };
     //Summary 
    if(this.formCon.reportType.value == '1'){
        this._nonBengaliService.getAllNonBengaliSummaryDataByDate(utilityObj.billMonth, this.formCon.reportType.value).subscribe((res:any)=>{
          this.nonBengaliSummaryData=res.data;
          if(this.nonBengaliSummaryData.length>0){
            this.docData=this._pdfService.generatePdf(this.nonBengaliSummaryData, utilityObj); 
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
    else{        
      //Details
      this._nonBengaliService.getAllNonBengaliList(utilityObj.billMonth, this.formCon.reportType.value).subscribe((res:any)=>{
      this.nonBengaliData=res.data;
      if(this.nonBengaliData.length>0){
        this.docData=this._pdfNonBengaliDetails.generatePdf(this.nonBengaliData, utilityObj.billMonth); 
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

}
