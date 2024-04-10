import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Locations } from "../../../../model/locations.model";
import { NewUserByCenterLocationService } from "../../../../services/new-user-by-center-location.service";
import { tariffList } from "../../Common/ReportCommonService";
import { MISReportModel } from "../../../../model/mis-report.model";
import { NbToastrService } from "@nebular/theme";
import { log } from "console";
import { takeUntil } from "rxjs/operators";
import { Subject } from "rxjs";
import { MisReportService } from "../../../../services/mis-report.service";
import { MisReportDetailsService } from "../../../../services/pdfGenerate/mis-report/mis-report-details.service";
import { MisReportSummaryService } from "../../../../services/pdfGenerate/mis-report/mis-report-summary.service";
import { PrepaidCustDataModel } from "../../../../model/mis-report/prepaid-cust-data.model";
import { ExcelServiceService } from "../../../../services/pdfGenerate/excel-service.service";

@Component({
  selector: "ngx-arrear-prepaid-cust-basedon-offset",
  templateUrl: "./arrear-prepaid-cust-basedon-offset.component.html",
  styleUrls: ["./arrear-prepaid-cust-basedon-offset.component.scss"],
})
export class ArrearPrepaidCustBasedonOffsetComponent implements OnInit {
  arrearPrepaidForm: FormGroup;
  allCenter: any;
  isTrue: boolean = false;
  report: any;
  patchLocation: any[] = [];
  locationData: any[] = [];
  selectedLocation: any[] = [];
  submitted: any;
  tariff: any = tariffList.ReportTariffData();
  reportTypeList: any[] = [
    { id: "1", text: "Summary" },
    { id: "2", text: "Details" },
  ];
  orderTypeList: any;
  statusDataList: any;
  selectValid: boolean = true;
  misReportModel: MISReportModel;
  isShowingSpinner: boolean = false;
  unsubscription$ = new Subject();
  documentTitle: any;
  data: PrepaidCustDataModel[];
  exportTypeList: any[] = [
    {'id': 1, 'name':'.pdf'},
    {'id': 2, 'name': '.xls'}
  ];
  isLoading : boolean = false;
  locationString : string[];


  
  docData:any;
  constructor(
    private _fb: FormBuilder,
    private _getCenterService: NewUserByCenterLocationService,
    private _toasterService: NbToastrService,
    private _misReportService: MisReportService,
    private _misReportDetailsService: MisReportDetailsService,
    private _misReportSummaryService: MisReportSummaryService,
    private _excelService: ExcelServiceService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getAllCenterDD();
    this.setOrderValue();
    this.setStatusValue();
  }

  private getAllCenterDD() {
    this._getCenterService.getAllDatabase().subscribe((response) => {
      this.allCenter = response.data.data;
    });
  }

  onSelect(data) {

    if(data.length == 0){
      this.arrearPrepaidForm.patchValue({
        location: [],
      });
      this.patchLocation = [];
      this.locationData = [];
      this.selectedLocation = [];
    }
    this.patchLocation = [];
    this._getCenterService.getLocationByDbArray(data).subscribe((response) => {
      this.locationData = response.data as Locations[];
      const filteredArray = this.locationData?.filter(value => this.selectedLocation.includes(value.id));
      this.selectedLocation = [];
      this.selectedLocation = filteredArray.map(a => a.id);
      this.selectedLocation?.forEach((item) => {
        this.locationData?.forEach((lData) => {
          if (item === lData.id) {
            this.patchLocation.push(lData.id);
          }
        });
      });
     if(data.length > 0){
      setTimeout(() => {
        debugger;
        this.arrearPrepaidForm.patchValue({
          location: this.patchLocation,
        });
      }, 400);
     }
    });

    // if (data.length == 0) {
    //   this.arrearPrepaidForm.patchValue({
    //     location: [],
    //   });
    //   this.patchLocation = [];
    //   this.locationData = [];
    //   this.selectedLocation = [];
    // }
    // this.patchLocation = [];
    // this._getCenterService.getLocationByDbArray(data).subscribe((response) => {
    //   this.locationData = response.data as Locations[];
    //   const filteredArray = this.locationData?.filter((value) =>
    //     this.selectedLocation.includes(value.id)
    //   );
    //   this.selectedLocation = [];
    //   this.selectedLocation = filteredArray.map((a) => a.id);
    //   this.selectedLocation?.forEach((item) => {
    //     this.locationData?.forEach((lData) => {
    //       if (item === lData.id) {
    //         this.patchLocation.push(lData.id);
    //       }
    //     });
    //   });
    // });
  }

  locationChange(data) {
    this.selectedLocation = [];
    data.forEach((p) => {
      this.selectedLocation.push(p);
    });
  }

  private setOrderValue(): void {
    this.orderTypeList = [
      { id: "0", text: "Total Ascending" },
      { id: "1", text: "Total Descending" },
    ];
  }

  private setStatusValue(): void {
    this.statusDataList = [
      { id: 0, text: "All" },
      { id: 1, text: "Dispatched" },
      { id: 2, text: "Not Dispatched" },
    ];
  }
  onChangeExportType(event: any){
    if(event==1){
      let date=new Date();
      let fileName='Arrear Prepaid Customer';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Arrear Prepaid Customer');
    
    }
  }

  onSearchAgain(){
    this.isTrue = false;
    
  }

  generateReport(data: PrepaidCustDataModel[]) {

    if (this.arrearPrepaidForm.value.reportType == '2') {

    this.docData = this._misReportDetailsService.generateLocationWiseArrearPrepaidCustomerPdf(data);
    this.docData.getBase64((base64Data) => {
      debugger;
    this.report = base64Data;
    this.documentTitle = this.docData.docDefinition.info.title;
      });
       
    } else {
      const intersection = this.allCenter.filter(element => this.arrearPrepaidForm.value.centerCode.includes(element.code));
      let dbNames = Array.prototype.map.call(intersection, s => s.dbName).toString();
      this.docData = this._misReportSummaryService.generatePdf(data,dbNames);
      this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;
    }
  )}
  }

  onReport() {
    if (this.arrearPrepaidForm.invalid) {
      this._toasterService.danger("Please fill the requered field.","Error");
      return;
    }
    
    this.isLoading = true;

    this._misReportService
      .getArrearPrepaidCustomer(
        this.arrearPrepaidForm.value.centerCode, 
        this.arrearPrepaidForm.value.location,
        this.arrearPrepaidForm.value.consumerNo  ?  this.arrearPrepaidForm.value.consumerNo : 0 , 
        this.arrearPrepaidForm.value.tariff, 
        this.arrearPrepaidForm.value.arrearFrom ?  this.arrearPrepaidForm.value.arrearFrom : 0 , 
        this.arrearPrepaidForm.value.arrearTo  ?  this.arrearPrepaidForm.value.arrearTo : 0 , 
        this.arrearPrepaidForm.value.status, 
        this.arrearPrepaidForm.value.isAll, 
        this.arrearPrepaidForm.value.isPrn, 
        this.arrearPrepaidForm.value.isLps, 
        this.arrearPrepaidForm.value.isVat, 
        this.arrearPrepaidForm.value.orderBy, 
        this.arrearPrepaidForm.value.reportType
        )
      .subscribe((res: any) => {
        this.data = res as PrepaidCustDataModel[];

        if (this.data.length>0) {
          this.isTrue = true;
          this.isLoading = false;
          this.generateReport(this.data);
        } else {
          
          this._toasterService.danger("No Data Found");
          this.isLoading = false;
        }
      },err=>{
        this.isLoading = false;
      });
  }

  createForm() {
    this.arrearPrepaidForm = this._fb.group({
      centerCode: [[], [Validators.required]],
      location: [[], []],
      consumerNo: ["", []],
      tariff: ["All"],
      arrearFrom: [, []],
      arrearTo: [, []],
      reportType: ["2", []],
      isAll: [true],
      isPrn: [true],
      isLps: [true],
      isVat: [true],
      status: [0,[]],
      orderBy: ["0",[]],
    });
  }

  get f() {
    return this.arrearPrepaidForm.controls;
  }

  onSaveReport(event: any) {
    this.onReport();
  }
}
