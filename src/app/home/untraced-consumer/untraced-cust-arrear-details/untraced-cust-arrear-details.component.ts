import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../@core/utils/utiliy';
import { CircleModel } from '../../../model/circle.model';
import { Locations } from '../../../model/locations.model';
import { UntracebleCustArrearReportModel } from '../../../model/untraced-consumer.model';
import { ZoneModel } from '../../../model/zone';
import { MinistryCustomeService } from '../../../services/ministry-custome.service';
import { MinistryService } from '../../../services/ministry.service';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { UntracedCustArrearService } from '../../../services/pdfGenerate/untraceable-customer/untraced-cust-arrear.service';
import { ReligiousService } from '../../../services/religious.service';
import { UntracedConsumerService } from '../../../services/untraced-consumer.service';
import { UntracedCustArrearDetailsService } from '../../../services/pdfGenerate/untraceable-customer/untraced-cust-arrear-details.service';

@Component({
  selector: 'ngx-untraced-cust-arrear-details',
  templateUrl: './untraced-cust-arrear-details.component.html',
  styleUrls: ['./untraced-cust-arrear-details.component.scss']
})
export class UntracedCustArrearDetailsComponent implements OnInit {

  untraceConArrearForm: FormGroup;
  report: any;
  isProgress: boolean = false;
  submitted: boolean = false;
  docData: any;
  documentTitle = "";
  isTrue: boolean = false;
  isLoading: boolean = false;
  isLocAndReportHideShow: boolean = false;
  locationDdList: any[];
  zoneList: any[];
  roleName = localStorage.getItem("roleName");
  locationCode = localStorage.getItem("locationCodeList");
  locationLists = this.locationCode.split(",");
  maxDate: Date = new Date();

  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    //{ id: 2, name: ".xls" },
  ];
  customerList: UntracebleCustArrearReportModel[];
  locationFormSession: Locations[];
  locationListAll: any[];
  zoneLists: ZoneModel[];
  filterLocation: any[];
  circleList: CircleModel[];
  circleLists: any[];
  locationList: any[];

  constructor(
    private _pdfService: UntracedCustArrearDetailsService,
    private _fb: FormBuilder,
    private _excelService: ExcelServiceService,
    private _untracedConService: UntracedConsumerService,
    private _toasterService: NbToastrService,
    private _ministryService: MinistryService,
    private _ministryCustservice: MinistryCustomeService,
    private _service: ReligiousService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    if (this.roleName != "Admin")
      this.getLocationsBySession(this.locationLists);
    this.getZoneList();
    this.createForm();
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];
      });
  }

  getZoneList() {
    this._ministryCustservice.getAllZoneDataList().subscribe((res: any) => {
      if (this.roleName == "Admin") {
        this.zoneList = res.data as ZoneModel[];
      } else if (this.locationFormSession.length == 1) {
        this.zoneList = [];
        this.zoneLists = [];
        let zone = res.data as ZoneModel[];
        this.locationFormSession.forEach((l) => {
          this.zoneLists.push(zone.find((z) => z.code == l.zoneCode));
        });
        this.zoneList = [...new Set(this.zoneLists.map((item) => item))];
        this.untraceConArrearForm.patchValue({
          zoneCode: this.zoneList[0].code,
        });
        this.getCircleByZone(this.f.zoneCode.value);
      } else {
        this.zoneList = [];
        this.zoneLists = [];
        let zone = res.data as ZoneModel[];
        this.locationFormSession.forEach((l) => {
          this.zoneLists.push(zone.find((z) => z.code == l.zoneCode));
        });
        this.zoneList = [...new Set(this.zoneLists.map((item) => item))];
      }
    });
  }

  getCircleByZone(event: string) {
    this.untraceConArrearForm.patchValue({
      circleCode: "0",
      locationCode: "0",
    });

    this._service.getAllCircleByZoneCode(event).subscribe((res: any) => {
      if (this.roleName == "Admin") {
        this.circleList = res.data as CircleModel[];
      } else if (this.locationFormSession.length == 1) {
        this.circleLists = [];
        let circle = res.data as CircleModel[];
        this.locationFormSession.forEach((l) => {
          let singleArray = circle.find((z) => z.code == l.circleCode);
          if (singleArray != undefined) this.circleLists.push(singleArray);
        });
        this.circleList = [...new Set(this.circleLists.map((item) => item))];
        this.untraceConArrearForm.patchValue({
          circleCode: this.circleList[0].code,
        });
        this.getLocationByCircle(this.f.circleCode.value);
      } else {
        this.circleLists = [];
        let circle = res.data as CircleModel[];
        this.locationFormSession.forEach((l) => {
          let singleArray = circle.find((z) => z.code == l.circleCode);
          if (singleArray != undefined) this.circleLists.push(singleArray);
        });
        this.circleList = [...new Set(this.circleLists.map((item) => item))];
      }
    });
  }

  getLocationByCircle(event: any) {
    this.untraceConArrearForm.patchValue({
      locationCode: "0",
    });
    this._service.getAllLocationByCircle(event).subscribe((res) => {
      if (this.roleName == "Admin") {
        this.locationList = res as Locations[];
      } else if (this.locationFormSession.length == 1) {
        this.locationList = [];
        this.locationList.push(this.locationFormSession[0]);
        this.untraceConArrearForm.patchValue({
          locationCode: this.locationFormSession[0].code,
        });
      } else {
        let loc = res as Locations[];
        let locData: Locations[] = [];
        this.locationFormSession.forEach((l) => {
          let singleArray = loc.find((z) => z.code == l.code);
          if (singleArray != undefined) locData.push(singleArray);
        });
        this.locationList = [...new Set(locData.map((item) => item))];
      }
    });
  }

  onSearchAgain() {
    this.isTrue = false;
  }
  onChangeExportType(event: any) {
    debugger;
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
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      };
      let exporter = this._excelService.downloadExcelFile(
        excelObj,
        "Untraced Consumer Arrear Collection Summary" + dateFormatForReport(date)
      );
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

  onReport() {
    this.isProgress = true;
    this.submitted = true;

    let billmonth = this.datePipe.transform(
      this.untraceConArrearForm.value.billMonth,
      "yMM"
    );
    if (this.untraceConArrearForm.invalid) {
      this._toasterService.danger(
        "Please fill all the requered field.",
        "Error"
      );
      this.isProgress = false;
      return;
    }
    this._untracedConService
      .getUntracedCustArrearDetails(
        this.untraceConArrearForm.value.zoneCode,
        this.untraceConArrearForm.value.circleCode,
        this.untraceConArrearForm.value.locationCode,
        this.datePipe.transform(
          this.untraceConArrearForm.value.billMonth,
          "yMM"
        )
      )
      .subscribe(
        (res) => {
          this.customerList = res.data as UntracebleCustArrearReportModel[];
          console.log("Response", this.customerList);
          debugger
          if (this.customerList.length > 0) {
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
        (err) => {
          this.isProgress = false;
        }
      );
  }

  createForm() {
    this.untraceConArrearForm = this._fb.group({
      zoneCode: ["0", []],
      circleCode: ["0", []],
      locationCode: ["0", []],
      billMonth: ["", [Validators.required]],
    });
  }

  get f() {
    return this.untraceConArrearForm.controls;
  }

  get formval() {
    return this.untraceConArrearForm.value;
  }
}
