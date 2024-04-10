import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { dateFormatForReport } from "../../../../@core/utils/utiliy";
import { Locations } from "../../../../model/locations.model";
import { CustomerArrearService } from "../../../../services/customer-arrear.service";
import { MinistryService } from "../../../../services/ministry.service";
import { NewUserByCenterLocationService } from "../../../../services/new-user-by-center-location.service";
import { NonBengaliService } from "../../../../services/non-bengali.service";
import { AllCustomerArrearDetailsService } from "../../../../services/pdfGenerate/customer-arrear/all-customer-arrear-details.service";
import { ExcelServiceService } from "../../../../services/pdfGenerate/excel-service.service";
import { NonBengaliBiharyBillArrearService } from "../../../../services/pdfGenerate/non-bengali-bihary-bill-arrear/non-bengali-bihary-bill-arrear.service";
import {
  reportTypeDropDownData,
  orderTypeDropDownData,
  tariffList,
} from "../../Common/ReportCommonService";
import { MisAllCustomerArrearService } from "../../../../services/pdfGenerate/mis-report/mis-all-customer-arrear.service";
import { AllCustomerArrearModel } from "../../../../model/mis-report/all-cust-arrear.model";
import { NbToastrService } from "@nebular/theme";
import dayjs from "dayjs";

@Component({
  selector: "ngx-all-customer-arrear-details",
  templateUrl: "./all-customer-arrear-details.component.html",
  styleUrls: ["./all-customer-arrear-details.component.scss"],
})
export class AllCustomerArrearDetailsComponent implements OnInit {
  form: FormGroup;
  allCenter: any;
  patchLocation: any[] = [];
  selectedLocation: any[] = [];
  locationData: Locations[] = [];
  isReadOnly: boolean;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;

  tariff: any = tariffList.ReportTariffData();
  reportTypeList: any = reportTypeDropDownData.reportType();
  orderTypeList: any = orderTypeDropDownData.MISOrderTypeData();
  allCustomerArrearList: AllCustomerArrearModel[];
  documentTitle: any;
  isTrue: boolean = false;
  isProgress: boolean = false;
  isLoading: boolean = false;
  docData: any;
  report: any;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];

  billGroupList: any;
  selectedDbGroup: any[] = [];
  locationBookList: any;
  allBill = { billGroup: "0", name: "All" };
  allBook = { bookId: "0", name: "All" };
  constructor(
    private _getCenterService: NewUserByCenterLocationService,
    private _fb: FormBuilder,
    private _excelService: ExcelServiceService,
    private _service: MinistryService,
    private _customerArrearService: CustomerArrearService,
    private _customerArrearDetailsPDFService: AllCustomerArrearDetailsService,
    private _misAllCustomerArrearService: MisAllCustomerArrearService,
    private _toasterService: NbToastrService
  ) {}

  ngOnInit(): void {
    this.getAllCenterDD();
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    this.createForm();
  }

  get formVal() {
    return this.form.value;
  }
  get formCon() {
    return this.form.controls;
  }

  private getAllCenterDD() {
    this._getCenterService.getAllDatabase().subscribe((response) => {
      this.allCenter = response.data.data;
    });
  }

  private getAllLocationDD() {
    this._getCenterService.getAllLocation().subscribe((response) => {
      this.locationData = response.data as any[];
    });
  }

  onSelect(data) {
    if (data.length == 0) {
      this.form.patchValue({
        location: [],
      });
      this.patchLocation = [];
      this.locationData = [];
      this.selectedLocation = [];
    }
    this.patchLocation = [];
    this._getCenterService.getLocationByDbArray(data).subscribe((response) => {
      this.locationData = response.data as Locations[];
      const filteredArray = this.locationData?.filter((value) =>
        this.selectedLocation.includes(value.id)
      );
      this.selectedLocation = [];
      this.selectedLocation = filteredArray.map((a) => a.id);
      this.selectedLocation?.forEach((item) => {
        this.locationData?.forEach((lData) => {
          if (item === lData.id) {
            this.patchLocation.push(lData.id);
          }
        });
      });
      if (data.length > 0) {
        setTimeout(() => {
          this.form.patchValue({
            location: this.patchLocation,
          });
        }, 400);
      }
    });

    this.getBillGroupDD(this.formVal.centerName, this.formVal.location);
    this.getLocationBookDD(
      this.formVal.centerName,
      this.formVal.location.length > 0 ? this.formVal.location : null,
      this.formVal.billGroupId ? this.formVal.billGroupId : "0"
    );
  }

  locationChange(data: any) {
    this.selectedLocation = [];
    data.forEach((p) => {
      this.selectedLocation.push(p);
    });

    this.getBillGroupDD(this.formVal.centerName, this.formVal.location);
    this.getLocationBookDD(
      this.formVal.centerName,
      this.form.value.location.length > 0 ? this.formVal.location : null,
      this.formVal.billGroupId ? this.formVal.billGroupId : "0"
    );
  }

  getBillGroupDD(DbCodes, LocationCodes) {
    const params = {
      dbCodes: DbCodes,
      locationCodes: LocationCodes,
    };

    this._customerArrearService.getBillGroup(params).subscribe((res: any) => {
      this.billGroupList = res.data;
    });
  }

  billGroupChange() {
    this.getLocationBookDD(
      this.formVal.centerName,
      this.formVal.location.length > 0 ? this.formVal.location : null,
      this.formVal.billGroupId ? this.formVal.billGroupId : "0"
    );
  }

  getLocationBookDD(dbCodes, locationCodes, billGroupId) {
    let params = {
      dbCodes: dbCodes,
      locationCodes: locationCodes,
      billGroupId: billGroupId,
    };
    this._customerArrearService.getLocationBook(params).subscribe((res) => {
      this.locationBookList = res.data;
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  public onSearchAgain() {
    this.isTrue = false;
    //this.getAllMinistry();
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = "Ministry Details (online) " + dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      this.isLoading = true;
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      };
      setTimeout(() => {
        let exporter = this._excelService.downloadExcelFile(
          excelObj,
          "Ministry Details(online)"
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

  generateReport(data: AllCustomerArrearModel[]) {
    if (this.form.value.reportType == 1) {
      this.docData =
        this._misAllCustomerArrearService.generateAllCustomerArrearDetailsPdf(
          data,
          this.formCon.billMonth.value
        );
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
      });
    }
    else{
      debugger;
      this.docData =
        this._misAllCustomerArrearService.generateAllCustomerArrearBillCycleWisePdf(
          data,
          this.formCon.billMonth.value
        );
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
      });
    }
  }

  onReport() {
    if (this.form.invalid) {
      this._toasterService.danger("Please fill the requered field.", "Error");
      return;
    }
    this.isProgress = true;
    if (this.form.value.billMonth != "") {
      this.form.patchValue({
        billMonth: dayjs(this.form.value.billMonth).format("YYYYMM"),
      });
    }

    this._customerArrearService
      .getAllCustomerArrearDetails(
        this.form.value.centerName,
        this.form.value.location,
        this.form.value.billMonth,
        this.form.value.arrearFrom != "" ? this.form.value.arrearFrom : 0,
        this.form.value.arrearTo != "" ? this.form.value.arrearTo : 0,
        this.form.value.tariff,
        this.form.value.billGroup,
        this.form.value.book,
        this.form.value.reportType == "1" ? 1 : 2,
        this.form.value.isAll,
        this.form.value.isPrn,
        this.form.value.isLps,
        this.form.value.isVat,
        this.form.value.noOfMonth != "" ? this.form.value.noOfMonth : 0,
        this.form.value.orderType
      )
      .subscribe(
        (res: any) => {
          this.allCustomerArrearList = res.data as AllCustomerArrearModel[];
          if (this.allCustomerArrearList.length > 0) {
            this.generateReport(this.allCustomerArrearList);
            this.isTrue = true;
            this.isProgress = false;
          } else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found", "Error");
            this.isProgress = false;
          }
        },
        (err) => {
          this._toasterService.danger("Something went wrong!", "Error");
          this.isProgress = false;
        }
      );
  }

  createForm() {
    this.form = this._fb.group({
      centerName: [[], [Validators.required]],
      location: [[], []],
      billMonth: ["", [Validators.required]],
      tariff: ["All", []],
      arrearFrom: [""],
      arrearTo: [""],
      noOfMonth: [""],
      billGroup: ["0"],
      book: ["0"],
      reportType: ["1"],
      isAll: [true],
      isPrn: [true],
      isLps: [true],
      isVat: [true],
      orderType: ["billcycle"],
    });
  }
}
