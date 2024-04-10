import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { NbToastrService } from "@nebular/theme";
import { log } from "console";
import { CenterModel } from "../../../model/center";
import { LocationModel } from "../../../model/location";
import { MiscUntracedCustModel, UntracedCustModel } from "../../../model/get-untraced-cust.model";
import { MinistryService } from "../../../services/ministry.service";
import { UntraceableCustomerReportService } from "../../../services/pdfGenerate/untraceable-customer/untraceable-customer-report.service";
import { PoultryListService } from "../../../services/pdfGenerate/agriculture/poultry-list.service";
import { ExcelServiceService } from "../../../services/pdfGenerate/excel-service.service";
import { UntracedConsumerService } from "../../../services/untraced-consumer.service";
import { dateFormatForReport } from "../../../@core/utils/utiliy";
import { Locations } from "../../../model/locations.model";
import { NewUserByCenterLocationService } from "../../../services/new-user-by-center-location.service";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import dayjs from "dayjs";
import { UntracebleCustReportService } from "../../../services/pdfGenerate/mis-report/untraceble-cust-report.service";

@Component({
  selector: "ngx-untraceable-consumer",
  templateUrl: "./untraceable-consumer.component.html",
  styleUrls: ["./untraceable-consumer.component.scss"],
})
export class UntraceableConsumerComponent implements OnInit {
  untraceConsumerForm: FormGroup;
  dbConfigData: CenterModel[] = [];
  locationList: LocationModel[] = [];
  report: any;
  isProgress: boolean = false;
  submitted: boolean = false;
  customerList: MiscUntracedCustModel[] = [];
  docData: any;
  documentTitle = "";
  isTrue: boolean = false;
  isLoading: boolean = false;
  isLocAndReportHideShow: boolean = false;
  locationDdList: any[];
  zoneList: any[];

  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private datePipe: DatePipe,
    private _toasterService: NbToastrService,
    private _pdfService: UntraceableCustomerReportService,
    private _poultryService: PoultryListService,
    private _excelService: ExcelServiceService,
    private _untracedConService: UntracedConsumerService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneList();
  }

  createForm() {
    this.untraceConsumerForm = this._fb.group({
      reportDate: [, [Validators.required]],
      // zoneCode: ["0"],
      // locationCode: ["0"],
      // report: [, []],
      // documentTitle: [, []],
    });
  }
  get f() {
    return this.untraceConsumerForm.controls;
  }

  get formval() {
    return this.untraceConsumerForm.value;
  }

  private getAllZoneList() {
    this._ministryService.getAllZone().subscribe((res) => {
      this.zoneList = res.data;
    });
  }

  public onChangeSelectDb(zoneCode) {
    if (zoneCode != "0") {
      this.getLocationDd(zoneCode);
      this.untraceConsumerForm.controls["locationCode"].enable();
      this.isLocAndReportHideShow = true;
    } else {
      this.untraceConsumerForm.controls["locationCode"].disable();
      this.isLocAndReportHideShow = false;
    }
  }

  private getLocationDd(zoneCode: string) {
    this._ministryService.getLocationDDByZoneCode(zoneCode).subscribe((res) => {
      this.untraceConsumerForm.patchValue({
        locationCode: 0,
      });
      this.locationDdList = res.data;
    });
  }

  onSearchAgain() {
    this.isTrue = false;
  }
  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = "Untraceable Consumer" + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } 
    else if (event == 2 || event == 3) {
      let date = new Date();
      this.isLoading = true;
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      };

      setTimeout(() => {
        let exporter = this._excelService.downloadExcelFile(
          excelObj,
          "Untraceable Consumer" + dateFormatForReport(date)
        );
        //@ts-ignore
        if (exporter.payload.data.length > 0) {
          this.isLoading = false;
        }
      }, 800);
      setTimeout(() => {
        this.isLoading = false;
      }, 3000);
    }
  }


  onReport() {
    this.isProgress = true;
    this.submitted = true;
    if (this.untraceConsumerForm.invalid) {
      this.isProgress = false;
      return;
    }
    this._untracedConService.getUntracableCustomerByDate( dateFormatForReport(this.f.reportDate.value).toString()).subscribe((res) => {
          this.customerList = res as MiscUntracedCustModel[];
          console.log("Response",this.customerList);
          if (this.customerList.length > 0) {
            this.docData = this._pdfService.generatePdf(this.customerList,this.f.reportDate.value);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
              this.isTrue = true;
              this.isProgress = false;
            });
          } 
          else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found");
            this.isProgress = false;
          }
        },
        (err) => {
          this.isProgress = false;
        }
      );
  }

}
