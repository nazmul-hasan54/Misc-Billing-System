import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { CenterModel } from "../../../model/center";
import { CircleModel } from "../../../model/circle.model";
import { CityCorporation } from "../../../model/city-corporation";
import { ConfirmDialogComponent } from "../../../shared/components/confirm-dialog/confirm-dialog.component";
import { DataTableDirective } from "angular-datatables";
import { ExcelServiceService } from "../../../services/pdfGenerate/excel-service.service";
import { LocationModel } from "../../../model/location";
import { MatDialog } from "@angular/material/dialog";
import { Ministry } from "../../../model/ministry.model";
import { MinistryCustomeService } from "../../../services/ministry-custome.service";
import { MinistryCustomerGetModel } from "../../../model/ministry-customerget.model";
import { MinistryCustomerModel } from "../../../model/ministry-customer";
import { MinistryCustomerPrintViewService } from "../../../services/pdfGenerate/bill-print-view/ministry-customer-print-view/ministry-customer-print-view.service";
import { MinistryService } from "../../../services/ministry.service";
import { NbToastrService } from "@nebular/theme";
import { PouroshovaModel } from "../../../model/pouroshova";
import { ReligiousService } from "../../../services/religious.service";
import { Subject } from "rxjs";
import { Unionparishad } from "../../../model/unionparishad";
import { event } from "jquery";
import { log } from "console";

@Component({
  selector: "ngx-ministry-customer-view",
  templateUrl: "./ministry-customer-view.component.html",
  styleUrls: ["./ministry-customer-view.component.scss"],
})
export class MinistryCustomerViewComponent implements OnInit {
  form: FormGroup;
  ministryCustomerList: MinistryCustomerGetModel[] = [];
  zoneList: Zone[] = [];
  circleList: CircleModel[];
  dbConfigData: CenterModel[] = [];
  locationList: LocationModel[] = [];
  docData: any;
  documentTitle: any;
  report: any;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  locationLists = localStorage.getItem("locationCodeList");
  locationCode = this.locationLists.split(",");
  ministryList: Ministry[] = [];
  cityCorporationList: CityCorporation[] = 
  [
    { id: 1, name: "Ministry Customer",nameBn:"",code:"1" },
    { id: 2, name: "City Corporation",nameBn:"",code:"2" },
    { id: 3, name: "Pourashava",nameBn:"",code:"3" },
    { id: 4, name: "Union Parishad",nameBn:"",code:"4" }
  ];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  isAdmin : boolean = false;
  lstPouroshova: PouroshovaModel[] = [];
  unionParishadList: Unionparishad[] = [];
  user = localStorage.getItem("userName");
  roleName = localStorage.getItem("roleName");
  
  

  constructor(
    private _service: MinistryCustomeService,
    private _ministryCustservice: MinistryCustomeService,
    private _religiousService: ReligiousService,
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _router: Router,
    private dialog: MatDialog,
    private toastr: NbToastrService,
    private _activatedRoute: ActivatedRoute,
    private _ministryCustPdfService: MinistryCustomerPrintViewService,
    private _excelService: ExcelServiceService,
    private _activateRoute:ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      retrieve: true,
      searching: false,
    };
    
    this.createForm();
    if (
      this._activateRoute.snapshot.paramMap.get("customerNumber") !== null &&
      this._activateRoute.snapshot.paramMap.get("locationCode") !== null
    ) {
      let customerNumber =this._activateRoute.snapshot.paramMap.get("customerNumber");
      debugger;
      let locationCode =this._activateRoute.snapshot.paramMap.get("locationCode");
      this.form.patchValue({
        locationCode:locationCode,
        customerNo:customerNumber
      })
      this.getMinistryCustomerBySearch() 
    }
    this.getZoneList();
    this.getAllDatabaseDD();
    this.getAllMinistry();
    // this.getCityCorporation();
    this.getAllPowrova();
    this.getAllUnionParishad();
    this._activatedRoute.paramMap.subscribe((params) => {});
    if(this.roleName == "Admin"){
      this.isAdmin = true;
    }
    else{
      this.form.patchValue({
        locationCode : this.locationCode[0],
      });
    }
    
  }
  reset(){
     this.ministryCustomerList = [];
     this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.isDtInitialized = false;
    });
    this.createForm();
    // this.form.reset();
    this.form.patchValue({
      locationCode:this.locationCode[0]
    })
  
  }
  getAllMinistry() {
    this._ministryCustservice.getAllMinistry().subscribe((res) => {
      this.ministryList = res.data as Ministry[];
    });
  }

  // getCityCorporation() {
  //   this._ministryCustservice
  //     .getAllCityCorporationDatList()
  //     .subscribe((res: any) => {
  //       this.cityCorporationList = res.data as CityCorporation[];
  //     });
  // }
  getAllPowrova() {
    this._ministryCustservice.getAllPouroshovaList().subscribe((res: any) => {
      this.lstPouroshova = res.data as PouroshovaModel[];
    });
  }

  getAllUnionParishad() {
    this._ministryCustservice.getUnionParishad().subscribe((res: any) => {
      this.unionParishadList = res.data as Unionparishad[];
    });
  }
  getZoneList() {
    this._ministryCustservice.getAllZoneDataList().subscribe((res: any) => {
      this.zoneList = res.data as Zone[];
    });
  }

  getCircleByZone(event: string) {
    this._religiousService
      .getAllCircleByZoneCode(event)
      .subscribe((res: any) => {
        this.circleList = res.data as CircleModel[];
        this.f.ministryCode.setValue("");
      });
  }

  getAllDatabaseDD() {
    this._ministryService.getAllDbConfigDDList().subscribe((res: any) => {
      this.dbConfigData = res.data as CenterModel[];
    });
  }
  getLocationByCenter(event: string) {
    this._ministryService.getLocationDDList(event).subscribe((res: any) => {
      this.locationList = res.data as LocationModel[];
    });
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      this.onReport(1);
    } 
    else if (event == 2 || event == 3) {
      this.onReport(2||3);
      // let excelObj = {
      //   data: this.docData.docDefinition.content[1].table.body,
      // };
      // this._excelService.downloadExcelFile(excelObj, "Ministry Customer List");
    }
  }

  getMinistryCustomerBySearch() {    
    this._service
      .getMinistryCustomer(
        this.formVal.customerNo,
        this.formVal.centerCode,
        this.formVal.locationCode,
        this.formVal.ministryCode,
        this.formVal.cityCode,
        this.formVal.isRebate,
      
      )
      .subscribe((res: any) => {
        this.ministryCustomerList = res as MinistryCustomerGetModel[];
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true;
          this.dtTrigger.next();
        }
      });
  }

  onReport(reportType: number) {   
    
  let reportObj={
    ministryCode:this.f.ministryCode.value,
    nameData:this.ministryList.filter((x)=>x.code==this.f.ministryCode.value),
    categoryName:this.f.ministryCode.value=='2'?this.cityCorporationList.filter((x)=>x.code==this.formVal.cityCode):'',
  }
        this.ministryCustomerList;
        if (this.ministryCustomerList.length > 0) {
          this.docData = this._ministryCustPdfService.generatePdf(
            this.ministryCustomerList,reportObj
          );
          if(reportType==1){
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
              // this.documentTitle = "";
              let date = new Date();
              let fileName = this.formVal.ministryCode==''?"Ministry Customer    ":reportObj.nameData[0].name;
              fileName = fileName.toString();
              fileName = fileName.slice(0, -4);
              const source = `data:application/pdf;base64,${this.report}`;
              const link = document.createElement("a");
              link.href = source;
              link.download = `${fileName}.pdf`;
              link.click();
            });
          }
          else{
            let excelObj = {
              data: this.docData.docDefinition.content[1].table.body,
            }
            // this._excelService.downloadExcelFile(excelObj, 'Ministry Customer');
            let fileName = this.formVal.ministryCode==''?"Ministry Customer    ":reportObj.nameData[0].name;
            fileName = fileName.toString();
            fileName = fileName.slice(0, -4);
            this._excelService.downloadExcelFile(excelObj, fileName);
          }
        }
  }

  deleteCustomer(customerNo: string) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      position: { top: "250px" },
      width: "400px",
      data: {
        title: "Ministry Customer",
        message: "Are you sure want to delete this customer?",
      },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe((result) => {
      if (result) {
        debugger;
        this._service
          .deleteMinistryCustomer(customerNo)
          .subscribe((res: any) => {
            if (res) {
              this.toastr.danger("Delete Successful!", "Delete");
              this.refresh();
            } else {
              this.toastr.danger("Delete Failed!", "Delete");
            }
          });
      }
    });
  }

  refresh(): void {
    this.reRender();
  }
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.isDtInitialized = false;
      this.getMinistryCustomerBySearch();
    });
  }

  editMinistryCustomer(item: MinistryCustomerGetModel) {
    this._router.navigate([
      "/ministry-customer/ministry-customer-generate",
      item.customerNumber,
      item.locationCode,
    ]);
  }
  createForm() {
    this.form = this._fb.group({
      customerNo: ["", []],
      zoneCode: ["", []],
      ministryCode: ["", []],
      cityCode: ["", []],
      centerCode: ["", []],
      locationCode: ["", []],
      pouroshovaCode: [, []],
      unionParishadCode: [, []],
      isRebate:[true,[]],
    });
  }

  get formVal() {
    return this.form.value;
  }
  get f() {
    return this.form.controls;
  }
  CreatePage(){
    this._router.navigate(["ministry-customer/ministry-customer-generate"])
  }
}
