import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { CommonService } from '../../../../services/common.service';
import { AgricultureWiseCustomerService } from '../../../../services/pdfGenerate/agriculture/agriculture-wise-customer.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { CitycorPouroshovaUnionArrearService } from '../../../../services/pdfGenerate/pourcityandunion/citycor-pouroshova-union-arrear.service';

@Component({
  selector: 'ngx-citycorpo-pouro-union-halnagad',
  templateUrl: './citycorpo-pouro-union-halnagad.component.html',
  styleUrls: ['./citycorpo-pouro-union-halnagad.component.scss']
})
export class CitycorpoPouroUnionHalnagadComponent implements OnInit {
  isProgress:boolean=false;
  submitted:boolean=false;
  agricultureList: any[] = [];
  form: FormGroup;
  isTrue: boolean = false;
  report: any;
  documentTitle = "";
  docData: any;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ]
  constructor(
    private _fb: FormBuilder,
    private _commonService: CommonService,
    private _citycorpouroshovaunionArrearService: CitycorPouroshovaUnionArrearService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  createForm() {
    this.form = this._fb.group({
      billMonth: ['', [Validators.required]],
      exportType: [1, []],
      report: [, []],
      documentTitle: [, []]
    })
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

  get formVal() {
    return this.form.value;
  }

  get f() {
    return this.form.controls;
  }
  onReport() {
    this.isProgress=true;
    this.submitted=true;
    if (this.form.invalid){this.isProgress=false;return;}
    this._citycorpouroshovaunionArrearService.getAgricultureCustomer(dateFormatForReport(this.f.billMonth.value).toString()).subscribe(res => {
      this.agricultureList = res.data;
      if (this.agricultureList.length > 0) {
        this.docData = this._citycorpouroshovaunionArrearService.generatePdf(this.agricultureList, this.f.billMonth.value);
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
      let fileName = 'krishi-poultry' + dateFormatForReport(date);
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
      this._excelService.downloadExcelFile(excelObj, 'Agriculture and Poultry Customer List');
    }
  }
}
