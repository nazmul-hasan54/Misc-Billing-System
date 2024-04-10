import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntracePenaltySupplementaryListModel, UntracebleCustArrearReportModel, UntracedCustArrearMergeSummaryModel } from '../../../model/untraced-consumer.model';

import { DatePipe } from '@angular/common';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { MinistryCustomeService } from '../../../services/ministry-custome.service';
import { MinistryService } from '../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { ReligiousService } from '../../../services/religious.service';
import { UntracedConsumerService } from '../../../services/untraced-consumer.service';
import { UntracedCustArrearService } from '../../../services/pdfGenerate/untraceable-customer/untraced-cust-arrear.service';
import { UntracedCustArrearSumReportService } from '../../../services/pdfGenerate/untraceable-customer/untraced-cust-arrear-sum-report.service';
import { ZoneModel } from '../../../model/zone';
import { dateFormatForReport } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-untraced-con-arrear-sum',
  templateUrl: './untraced-con-arrear-sum.component.html',
  styleUrls: ['./untraced-con-arrear-sum.component.scss']
})
export class UntracedConArrearSumComponent implements OnInit {
  zoneList: ZoneModel[];
  untracedConArrearSumForm: FormGroup;
  report: any;
  isProgress: boolean = false;
  submitted: boolean = false;
  docData: any;
  documentTitle = "";
  isTrue: boolean = false;
  isLoading: boolean = false;
  customerList: UntracePenaltySupplementaryListModel;
  maxDate: Date = new Date();

  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    // { id: 2, name: ".xls" },
  ];
  constructor(
    private _pdfService: UntracedCustArrearSumReportService,
    private _fb: FormBuilder,
    private _excelService: ExcelServiceService,
    private _untracedConService: UntracedConsumerService,
    private _toasterService: NbToastrService,
    private _ministryCustservice: MinistryCustomeService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getZoneList();
    this.createForm();
  }

  getZoneList() {
    this._ministryCustservice.getAllZoneDataList().subscribe((res: any) => {
        this.zoneList = res.data as ZoneModel[];
    });
  }

  onSearchAgain() {
    this.isTrue = false;
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName =
        "Untraced Consumer Arrear Collection Summary" +
        dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      let date = new Date();
      this.isLoading = true;
      let excelObj = { data: this.docData.docDefinition.content[0].table.body};
      // let exporter = this._excelService.downloadExcelFile( excelObj,"Untraced Consumer Arrear Collection Summary" + dateFormatForReport(date));
      this._excelService.downloadExcelFile(excelObj, 'Post To Prepaid Update Customer Information ');
      // setTimeout(() => {
        
      //   //@ts-ignore
      //   if (exporter.payload.data.length > 0) {
      //     this.isLoading = false;
      //   }
      // }, 800);
      // setTimeout(() => {
      //   this.isLoading = false;
      // }, 3000);
    }
  }

  // generateReport(){
  //   debugger
  //   let customerList;
  //   let billmonth;
  //   this.docData = this._pdfService.generatePdf(
  //     customerList,
  //     billmonth
  //   );
  //   this.docData.getBase64((base64Data) => {
  //     this.report = base64Data;
  //     this.documentTitle = this.docData.docDefinition.info.title;
  //     this.isTrue = true;
  //     this.isProgress = false;
  //   });
  // }

  onReport() {
    this.isProgress = true;
    this.submitted = true;

    let billmonth = this.datePipe.transform(
      this.untracedConArrearSumForm.value.billMonth,
      "yMM"
    );
    if (this.untracedConArrearSumForm.invalid) {
      this._toasterService.danger(
        "Please fill all the requered field.",
        "Error"
      );
      this.isProgress = false;
      return;
    }
    this._untracedConService
      .getUntracedCustArrearSumCollection(
        this.untracedConArrearSumForm.value.zoneCode,
        this.datePipe.transform(
          this.untracedConArrearSumForm.value.billMonth,
          "yMM"
        )
      )
      .subscribe(
        (res) => {
          this.customerList = res as UntracePenaltySupplementaryListModel;
          console.log("Response", this.customerList);
          debugger
          if (this.customerList.untraceableDataList.length > 0 || this.customerList.penaltyDataList.length > 0 || this.customerList.supplementaryDataList.length > 0) {
            this.docData = this._pdfService.generatePdf(
              this.customerList,
              billmonth
            );
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
              this.isTrue = true;
              this.isProgress = false;
            });
          } else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found");
            this.isProgress = false;
          }
        },
        () => {
          this.isProgress = false;
        }
      );
  }

  createForm() {
    this.untracedConArrearSumForm = this._fb.group({
      zoneCode: ["0", []],
      billMonth: ["", [Validators.required]],
    });
  }

  get f() {
    return this.untracedConArrearSumForm.controls;
  }

  get formval() {
    return this.untracedConArrearSumForm.value;
  }

}
