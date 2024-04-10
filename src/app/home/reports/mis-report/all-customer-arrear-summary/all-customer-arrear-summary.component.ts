import { DatePipe } from "@angular/common";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { dateFormatForReport } from "../../../../@core/utils/utiliy";
import { AllCustomerArrearSummary } from "../../../../services/all-customer-arrear-summary.service";
import { MisReportService } from "../../../../services/mis-report.service";
import { misAllCustomerArrearSummaryService } from "../../../../services/pdfGenerate/customer-arrear/misAllCustomerArrearSummaryService";
import { ExcelServiceService } from "../../../../services/pdfGenerate/excel-service.service";
import { NbToastrService } from "@nebular/theme";
import dayjs from "dayjs";
import { AllCustArrearSummaryService } from "../../../../services/pdfGenerate/mis-report/all-cust-arrear-summary.service";

@Component({
  selector: "ngx-all-customer-arrear-summary",
  templateUrl: "./all-customer-arrear-summary.component.html",
  styleUrls: ["./all-customer-arrear-summary.component.scss"],
  providers: [DatePipe],
})
export class AllCustomerArrearSummaryComponent implements OnInit {
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;

  customerForm: FormGroup;
  centerList: any[];
  customerArrearSummary: AllCustomerArrearSummary[];
  docData: any;
  documentTitle: any;
  report: any;
  isTrue: boolean = false;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  isProgress: boolean = false;

  //allCenter: {key: '0', name: 'All'};
  constructor(
    private _fb: FormBuilder,
    private _misReportService: MisReportService,
    private _centerWiseCustSummary: AllCustArrearSummaryService,
    private _excelService: ExcelServiceService,
    private datePipe: DatePipe,
    private _toasterService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    this.getAllCenterList();
    this.createForm();
  }

  

  get formCon() {
    return this.customerForm.controls;
  }

  getAllCenterList() {
    this._misReportService.getAllDatabaseDDList().subscribe((res) => {
      this.centerList = res.data;
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = "Customer Arrear Summary";
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      };
      this._excelService.downloadExcelFile(excelObj, "Customer Arrear Summary");
    }
  }

  onSearchAgain() {
    this.isTrue = false;
  }

  generateReport(data: AllCustomerArrearSummary[]){
    let center = this.centerList.find(
      (x) => x.key === this.formCon.centerCode.value
    );

    if (this.customerForm.value.centerCode == "0") {
      this.docData = this._centerWiseCustSummary.generateCenterWisePdf(
        data,
        this.customerForm.value.billMonth
      );
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
        this.isProgress = false;
      });
    } else {
      this.docData = this._centerWiseCustSummary.generateLocationWisePdf(
        data,
        this.customerForm.value.billMonth,
        center.value
      );
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
        this.isProgress = false;
      });
    }

  }

  onReport() {
    debugger;
    if (this.customerForm.invalid) {
      this._toasterService.danger("Please fill the requered field.", "Error");
      return;
    }
    this.isProgress = true;
    // let dateValue = this.datePipe.transform(
    //   this.formCon.billMonth.value,
    //   "ydd"
    // );

    if (this.customerForm.value.billMonth != "") {
      this.customerForm.patchValue({
        billMonth: dayjs(this.customerForm.value.billMonth).format("YYYYMM"),
      });
    }
    
    this._misReportService
      .getAllCustomerArrearSummary(
        this.customerForm.value.centerCode,
        this.customerForm.value.billMonth,
        this.customerForm.value.isAll,
        this.customerForm.value.isPrn,
        this.customerForm.value.isVat,
        this.customerForm.value.isLps
      )
      .subscribe((res: any) => {
        console.log("res",res);
        
        this.customerArrearSummary = res.data as AllCustomerArrearSummary[];
        if (this.customerArrearSummary.length > 0) {
          this.generateReport(this.customerArrearSummary)
        } else {
          this._toasterService.danger("No Data Found", "Error");
          this.isTrue = false;
          this.isProgress = false;
        }
      },
      (err) => {
        this._toasterService.danger("Something went wrong!", "Error");
        this.isProgress = false;
      });
  }

  createForm() {
    this.customerForm = this._fb.group({
      billMonth: ["", [Validators.required]],
      centerCode: ["0"],
      isAll: [true],
      isPrn: [true],
      isLps: [true],
      isVat: [true],
    });
  }

}
