import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { MinistryService } from '../../../../services/ministry.service';
import { ModBillService } from '../../../../services/mod-bill.service';
import { PreModDataService } from '../../../../services/pdfGenerate/ministry/pre-mod-data.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';

@Component({
  selector: 'ngx-pre-mod-data',
  templateUrl: './pre-mod-data.component.html',
  styleUrls: ['./pre-mod-data.component.scss']
})
export class PreModDataComponent implements OnInit {

  preModForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  preModList: any[];
  documentTitle: any;
  docData: any;
  isProgress:boolean = false;
  deptList:any;
  exportTypeList: any[] = [
    { "id": 1, "name": ".pdf" },
    { "id": 2, "name": ".xls" },
  ];
  roleName = localStorage.getItem("roleName");
  locationList = localStorage.getItem("locationCodeList");
  locationCode = this.locationList.split(",");
  locationFormSession: any[];
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe,
    private _pdfService: PreModDataService,
    private _modService: ModBillService,
    private _toastrService: NbToastrService,
    private _excelService: ExcelServiceService,
  ) { }


  ngOnInit(): void {
    this.createForm();
    if (this.roleName != "Admin") {
      this.getLocationsBySession(this.locationCode);
    }
    else{
    this.getLocationCodeAndDeptCode();
    }
  }
  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.deptList = res as any[];
        this.f.deptCode.setValue(this.deptList[0].deptCode)
      });
  }
  createForm(){
    this.preModForm = this._fb.group({
      deptCode: [,[]],
      // fDate: [,[]],
      // tDate: [,[]],
      billMonth: [,[Validators.required]]
    });
  }

  
  getLocationCodeAndDeptCode(){
    this._modService.getLocationCodeAndDeptCode().subscribe((res:any)=>{
      this.deptList=res;
    })
  }

  onSearchAgain(){
    this.isTrue = false;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      //let date=new Date();
      let fileName = 'MOD PREPAID REPORT';
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
      this._excelService.downloadExcelFile(excelObj, 'MOD PREPAID REPORT');
    }
  }

  onReport(){
    this.isProgress = true;
    if(this.preModForm.invalid) {this.isProgress = false; return};
    let billMonth = this._datePipe.transform(this.f.billMonth.value, "yMM");
    
    this._ministryService.getPreModDataByBillMonth(billMonth, this.f.deptCode.value).subscribe((res: any) => {
      const replacementValue ='LT-A';
      const valuesToReplace = 'LT-A';
      // res = res.map((value) => {
      //   if (valuesToReplace.includes(value.tariffName)) {
      //     return {...value, tariffName:replacementValue};
      //   }
      //   return value;
      // });
      this.preModList = res;
      if(this.preModList.length > 0){
        this.docData = this._pdfService.generatePdf(this.preModList, billMonth);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      } else{
        this.isTrue = false;
        this._toastrService.danger('No Data found');
        this.isProgress = false;
      }
    });
  }

  get f(){
    return this.preModForm.controls;
  }

}
