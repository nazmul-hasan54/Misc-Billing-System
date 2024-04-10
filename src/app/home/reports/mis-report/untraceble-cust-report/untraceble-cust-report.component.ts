import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UntracedCustModel } from '../../../../model/get-untraced-cust.model';
import dayjs from 'dayjs';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { Locations } from '../../../../model/locations.model';
import { NewUserByCenterLocationService } from '../../../../services/new-user-by-center-location.service';
import { UntracedConsumerService } from '../../../../services/untraced-consumer.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { PoultryListService } from '../../../../services/pdfGenerate/agriculture/poultry-list.service';
import { UntraceableCustomerReportService } from '../../../../services/pdfGenerate/untraceable-customer/untraceable-customer-report.service';
import { DatePipe } from '@angular/common';
import { NbToastrService } from '@nebular/theme';
import { MinistryService } from '../../../../services/ministry.service';
import { LocationModel } from '../../../../model/location';
import { CenterModel } from '../../../../model/center';
import { UntracebleCustReportService } from '../../../../services/pdfGenerate/mis-report/untraceble-cust-report.service';

@Component({
  selector: 'ngx-untraceble-cust-report',
  templateUrl: './untraceble-cust-report.component.html',
  styleUrls: ['./untraceble-cust-report.component.scss']
})
export class UntracebleCustReportComponent implements OnInit {

  allCenter: any;
  patchLocation: any[] = [];
  selectedLocation: any[] = [];
  locationData: Locations[] = [];
  untraceConsumerForm: FormGroup;
  dbConfigData: CenterModel[] = [];
  locationList: LocationModel[] = [];
  report: any;
  isProgress: boolean = false;
  submitted: boolean = false;
  customerList: UntracedCustModel[] = [];
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
    private _pdfService: UntracebleCustReportService,
    private _poultryService: PoultryListService,
    private _excelService: ExcelServiceService,
    private _untracedConService: UntracedConsumerService,
    private _getCenterService: NewUserByCenterLocationService,
  ) {}

  ngOnInit(): void {
    this.getAllCenterDD();
    this.createForm();
    this.getAllZoneList();
  }

  

  private getAllZoneList() {
    this._ministryService.getAllZone().subscribe((res) => {
      this.zoneList = res.data;
    });
  }

  private getAllCenterDD() {
    this._getCenterService.getAllDatabase().subscribe((response) => {
      this.allCenter = response.data.data;
    });
  }

  onSelect(data) {
    if (data.length == 0) {
      this.untraceConsumerForm.patchValue({
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
          this.untraceConsumerForm.patchValue({
            location: this.patchLocation,
          });
        }, 400);
      }
    });
  }

  locationChange(data: any) {
    this.selectedLocation = [];
    data.forEach((p) => {
      this.selectedLocation.push(p);
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
  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
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

  generateReport(data: UntracedCustModel[]) {
    
      this.docData = this._pdfService.generatePdf(data,this.untraceConsumerForm.value.billMonth);
      this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
      });
    
  }


  onReport() {
    console.log(this.untraceConsumerForm.value);
    debugger;
    this.isProgress = true;
    this.submitted = true;
    if (this.untraceConsumerForm.invalid) {
      this.isProgress = false;
      return;
    }
    if (this.untraceConsumerForm.value.billMonth != "") {
      this.untraceConsumerForm.patchValue({
        billMonth: dayjs(this.untraceConsumerForm.value.billMonth).format("YYYYMM"),
      });
    }
    this._untracedConService.getUntracableCustomer( 
      this.untraceConsumerForm.value.centerName,
      this.untraceConsumerForm.value.location,
      this.untraceConsumerForm.value.billMonth
    ).subscribe((res) => {
          this.customerList = res as UntracedCustModel[];
          if (this.customerList.length > 0) {
              this.generateReport(this.customerList);
              this.isTrue = true;
              this.isProgress = false;
          } 
          else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found!","Error");
            this.isProgress = false;
          }
        },
        (err) => {
          this.isProgress = false;
        }
      );
  }

  createForm() {
    this.untraceConsumerForm = this._fb.group({
      centerName: [[], [Validators.required]],
      location: [[], []],
      billMonth: ["", [Validators.required]],
    });
  }
  get f() {
    return this.untraceConsumerForm.controls;
  }

  get formval() {
    return this.untraceConsumerForm.value;
  }

}
