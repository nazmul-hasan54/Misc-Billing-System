import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { ReligiousPdfServiceService } from '../../../../services/pdfGenerate/religious/religious-pdf-service.service';
import { ReligiousService } from '../../../../services/religious.service';

@Component({
  selector: 'ngx-mosque-and-worship-details',
  templateUrl: './mosque-and-worship-details.component.html',
  styleUrls: ['./mosque-and-worship-details.component.scss']
})
export class MosqueAndWorshipDetailsComponent implements OnInit {

  worshipForm: FormGroup;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  isTrue : boolean = false;
  isProgress: boolean = false;
  report: any;
  docData:any;
  submitted: boolean=false;
  documentTitle: any;
  financialYearList: any[];
  religiousDataList: any[];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];

  constructor(
    private _fb: FormBuilder,
    private _religious: ReligiousService,
    private _pdfService: ReligiousPdfServiceService,
    private _excelService: ExcelServiceService,
    private _toasterService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.getFinancialYear();
    this.createForm();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }
  onChangeSelectedZone(event){
    this.worshipForm.patchValue({
      startMonth:event.startMonth,
      endMonth:event.endMonth
    })
    
  }
  createForm(){
    this.worshipForm = this._fb.group({
      financialYear: ['', [Validators.required]],
      startMonth:[,[]],
      endMonth:[,[]]
    })
  }

  get formCon(){
    return this.worshipForm.controls;
  }

  getFinancialYear(){
    this._religious.getFiscalYear().subscribe(res =>{
      this.financialYearList = res as any[];
      
    });
  }

  onChangeExportType(event: any){
    if (event == 1) {
      let date = new Date();
      let fileName = 'No of Mosque & Other Worship';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content.table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'No of Mosque & Other Worship');
    }
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  onReport(){
    this.isProgress = true;
    this.submitted = true;
    if(this.worshipForm.invalid) {this.isProgress=false; return};

    let financialValue = this.financialYearList.find(x => x.code == this.worshipForm.value.financialYear.code);
    
    let utilityObj = {
      startMonth: financialValue.startMonth,
      endMonth: financialValue.endMonth
    };

    let finscalYearName= financialValue.financialName;

    this._religious.getMosqueAndWorshipDataList(utilityObj.startMonth, utilityObj.endMonth).subscribe(res =>{
      this.religiousDataList = res as any[];
      if(this.religiousDataList.length > 0){
        this.docData=this._pdfService.generatePdf(this.religiousDataList, utilityObj, finscalYearName); 
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
        this.isProgress = false;
      }
    })
  }

  public onSearchAgain() {
    this.isTrue = false;
  }

  onSubmit(){
    this.onReport();
  }

}
