import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { ActivatedRoute } from "@angular/router";
import { BillCycleModel } from "../../../model/temporary/billCycle.model";
import { BillCycleService } from "../../../services/bill-cycle.service";
import { DatePipe } from "@angular/common";
import { ExcelServiceService } from "../../../services/pdfGenerate/excel-service.service";
import { ModBillService } from "../../../services/mod-bill.service";
import { ModPrepaidService } from "../../../services/pdfGenerate/bill-print-view/mod-bill/mod-prepaid.service";
import { NbToastrService } from "@nebular/theme";
import { MinistryService } from "../../../services/ministry.service";

@Component({
  selector: "ngx-mod-prepaid",
  templateUrl: "./mod-prepaid.component.html",
  styleUrls: ["./mod-prepaid.component.scss"],
})
export class ModPrepaidComponent implements OnInit {
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  miscellaneousForm: FormGroup;
  isTrue: boolean = false;
  report: any;
  modBillList: any[];
  prepaidModDataList: any[];
  documentTitle = "";
  docData: any;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  dbCodeList: any;
  billMonthList: any[] = [];
  isProgress: boolean = false;
  deptList: any;
  ///locationCodes = localStorage.getItem('locationCodeList');
  roleName = localStorage.getItem("roleName");
  createdBy = localStorage.getItem("userName");
  locationList = localStorage.getItem("locationCodeList");
  locationCode = this.locationList.split(",");
  locationFormSession: any[];
  constructor(
    private _fb: FormBuilder,
    private _modService: ModBillService,
    private _pdfService: ModPrepaidService,
    private _billcycleService: BillCycleService,
    private datePipe: DatePipe,
    private _excelService: ExcelServiceService,
    private _toaster: NbToastrService,
    private _ministryService: MinistryService
  ) {
    this.dbCodeList = localStorage.getItem("dbCodeList");
  }

  ngOnInit(): void {
      console.log("loc",this.locationCode)
    console.log("createdBy",this.createdBy)
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    if (this.roleName != "Admin") {
      this.getLocationsBySession(this.locationCode);
    }
    this.createForm();
    this.getBillCylceCode();
    this.getLocationCodeAndDeptCode();
  }

  getBillCylceCode() {
    this._billcycleService.getAllBillCycle().subscribe((res) => {
      this.billMonthList = res as BillCycleModel[];
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      //let date=new Date();
      let fileName = "MOD PREPAID REPORT";
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      };
      this._excelService.downloadExcelFile(excelObj, "MOD PREPAID REPORT");
    }
  }

  onSearchAgain() {
    this.isTrue = false;
  }

  onReport() {
    this.isProgress = true;
    if (this.miscellaneousForm.invalid) {
      this.isProgress = false;
      return;
    }

    let t = this.datePipe.transform(this.f.billMonth.value, 'yMM');
    let s = this.datePipe.transform(this.f.billMonth.value, 'yMM');
    
    let year = Number(t.substring(0, 4));
    let m = Number(s.substring(4, 6));
    
    const date = new Date(year, m -1, 1);
    const firstDate = new Date(year, m - 1, 1);

    date.setMonth(date.getMonth() + 1);
    const lastDate = new Date(date.getTime() - 1);
    
    let fDate = `${firstDate.getFullYear()}-${(firstDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDate.getDate().toString().padStart(2, '0')}`;
      let tDate = `${lastDate.getFullYear()}-${(lastDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${lastDate.getDate().toString().padStart(2, '0')}`;
        //console.log("enddate",startDate);
        this.miscellaneousForm.patchValue({
          fDate:fDate,
          tDate:tDate
        })
    
    

    let Obj = {
      deptCode: this.f.deptCode.value,
      fDate: this.f.fDate.value,
      tDate: this.f.tDate.value,
      dbCode: this.dbCodeList,
      createdBy: this.createdBy,
    };
    
    
    let month = this.datePipe.transform(this.f.fDate.value, "MMM-yy");
    this._modService.getAllPrepaidModData(Obj).subscribe(
      (res) => {
        this.prepaidModDataList = res as any[];

        this.docData = this._pdfService.generatePdf(
          this.prepaidModDataList,
          Obj,
          month
        );
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      },
      (er) => {
        this.isProgress = false;
      }
    );
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as any[];
        console.log("locationse", this.locationFormSession)
        this.f.deptCode.setValue(this.locationFormSession[0].deptCode)
      });
  }

  getLocationCodeAndDeptCode() {
    this._modService.getLocationCodeAndDeptCode().subscribe((res: any) => {
      if (this.roleName == "Admin") {
        this.deptList = res;
      } else if (this.locationCode.length == 1) {
        this._modService.getLocationCodeAndDeptCode().subscribe((res: any) => {
          let location = res as any[];
          this.deptList = location.filter(
            (p) => p.code == this.locationCode[0]
          );
          this.miscellaneousForm.patchValue({
            deptCode: this.deptList[0].deptCode,
          });
        });
      } else {
        let loc = res as any[];
        let locData: any[] = [];
        this.locationFormSession.forEach((l) => {
          let singleArray = loc.find((z) => z.code == l.code);
          if (singleArray != undefined) locData.push(singleArray);
        });
        this.deptList = [...new Set(locData.map((item) => item))];
      }
    });
  }

  createForm() {
    this.miscellaneousForm = this._fb.group({
      deptCode: [, []],
      fDate: [, []],
      tDate: [, []],
      billMonth: [,[]],
      dbCode: [this.dbCodeList, []],
      createdBy: [this.createdBy, []],
    })
  }

  get formVal() {
    return this.miscellaneousForm.value;
  }

  get f() {
    return this.miscellaneousForm.controls;
  }
}
