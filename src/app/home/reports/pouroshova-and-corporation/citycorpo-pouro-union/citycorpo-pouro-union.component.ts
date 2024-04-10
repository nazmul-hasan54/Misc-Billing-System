import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { PourAndCityCorporBanglaService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/pour-and-city-corpor-bangla.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';
import { CitycorPouroUnionService } from '../../../../services/pdfGenerate/pourcityandunion/citycor-pouro-union.service';
import { CommonService } from '../../../../services/common.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-citycorpo-pouro-union',
  templateUrl: './citycorpo-pouro-union.component.html',
  styleUrls: ['./citycorpo-pouro-union.component.scss']
})
export class CitycorpoPouroUnionComponent implements OnInit {  
  isProgress:boolean=false;
  submitted:boolean=false;
  cityCorporForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  documentTitle = "";
  docData: any;
  poultryCustomerList: any[] = [];
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _service: PourAndCityCorporService,
    private _citycorPouroUnionService: CitycorPouroUnionService,
    private _datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  public updateVisitor(): void {
    const objParam = { ID: 1, TOTALVISITOR: 0 };
    this._commonService.updateTotalVisitorCount(objParam).subscribe(() => {

    }, () => {
      this._toasterService.danger("Something is Wrong !!!!")
    });
  }

  onSearchAgain() {
    this.isTrue = false;
  }

  onReport() {
    this.isProgress=true;
    this.submitted=true;
    if (this.cityCorporForm.invalid) {this.isProgress=false;return;}    
    let reportObj = {
      billMonth: this._datePipe.transform(this.f.billMonth.value, "yMM"),
    }
    this._service.getZoneWiseCityPouroUnionArrear(reportObj.billMonth).subscribe(res => {
      this.poultryCustomerList = res.data;
      if (this.poultryCustomerList.length > 0) {
        this.docData = this._citycorPouroUnionService.generatePdf(this.poultryCustomerList, reportObj);
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
  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'বিউবোর আওতাধীন সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক' + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'বিউবোর আওতাধীন সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক');
    }
  }

  createForm() {
    this.cityCorporForm = this._fb.group({
      billMonth: ['', [Validators.required]],
      exportType: [1, []],
      report: [, []],
      documentTitle: [, []]
    })
  }

  get formVal() {
    return this.cityCorporForm.value;
  }

  get f() {
    return this.cityCorporForm.controls;
  }
}
