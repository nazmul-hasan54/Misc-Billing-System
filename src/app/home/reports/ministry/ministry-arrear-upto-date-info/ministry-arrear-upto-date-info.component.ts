import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { MinistryService } from '../../../../services/ministry.service';
import { MinistryArrearReceiptUptoDateService } from '../../../../services/pdfGenerate/ministry/ministry-arrear-receipt-upto-date.service';

@Component({
  selector: 'ngx-ministry-arrear-upto-date-info',
  templateUrl: './ministry-arrear-upto-date-info.component.html',
  styleUrls: ['./ministry-arrear-upto-date-info.component.scss']
})
export class MinistryArrearUptoDateInfoComponent implements OnInit {

  ministryForm: FormGroup;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  ministryArrerList: any[];
  docData: any;
  report: any;
  documentTitle:any;
  isTrue: boolean = false;
  isProgress: boolean = false;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _pdfService: MinistryArrearReceiptUptoDateService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }

  createForm(){
    this.ministryForm = this._fb.group({
      billMonth: ['', [Validators.required]],
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  onReprt(){
    this._ministryService.getAllMinistryArrear(dateFormatForReport(this.f.billMonth.value).toString()).subscribe(res =>{
      this.ministryArrerList = res.data;
      console.log("ghgf", this.ministryArrerList);
      if(this.ministryArrerList.length>0){
        this.docData = this._pdfService.generatePdf(this.ministryArrerList);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      }
    })
  }

  onChangeExportType(event: any){

  }

  onSearchAgain(){

  }

  get f(){
    return this.ministryForm.controls;
  }

}
