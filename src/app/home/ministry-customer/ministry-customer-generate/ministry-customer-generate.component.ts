import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { ActivatedRoute, Router } from "@angular/router";
import { CenterModel } from "../../../model/center";
import { CircleModel } from "../../../model/circle.model";
import { CityCorporation } from "../../../model/city-corporation";
import { DDForStringKeyModel } from "../../../model/DD-for-string-key.model";
import { DropdownResultForStringKeyModel } from "../../../model/DropdownResultForStringKey.model";
import { LocationModel } from "../../../model/location";
import { Ministry } from "./../../../model/ministry.model";
import { MinistryCustomeService } from "../../../services/ministry-custome.service";
import { MinistryCustomerDetails } from "../../../model/ministry/ministry-cust-details.model";
import { MinistryCustomerGetModel } from "../../../model/ministry-customerget.model";
import { MinistryService } from "../../../services/ministry.service";
import { NbToastrService } from "@nebular/theme";
import { PouroshovaModel } from "../../../model/pouroshova";
import { ReligiousService } from "../../../services/religious.service";
import { Unionparishad } from "../../../model/unionparishad";
import { ViewCustomerData } from "../../../model/ministry/view-cust-data.model";
import { NewCustomerDataService } from "../../../services/pdfGenerate/ministry/new-customer-data.service";
import { MiscLocationService } from "../../../services/misc-location.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { log } from "console";
import { Locations } from "../../../model/locations.model";
import { ZoneModel } from "../../../model/zone";

@Component({
  selector: "ngx-ministry-customer-generate",
  templateUrl: "./ministry-customer-generate.component.html",
  styleUrls: ["./ministry-customer-generate.component.scss"],
})
export class MinistryCustomerGenerateComponent implements OnInit {
  ministryCustomerForm: FormGroup;
  ministryList: Ministry[] = [];
  ministryDept: DropdownResultForStringKeyModel[] = [];
  cityCorporationList: CityCorporation[] = [];
  zoneList: ZoneModel[] = [];
  circleList: CircleModel[] = [];
  dbConfigData: CenterModel[] = [];
  dbData: CenterModel[] = [];
  locationList: Locations[] = [];
  locationFormSession: Locations[] = [];
  lstPouroshova: PouroshovaModel[] = [];
  unionParishadList: Unionparishad[] = [];
  divisionList: DDForStringKeyModel[] = [];
  districtList: DDForStringKeyModel[] = [];
  upozilaList: DDForStringKeyModel[] = [];
  nonBengaliList: DDForStringKeyModel[] = [];
  ministryCustomerList: MinistryCustomerGetModel[] = [];
  customerDetails: MinistryCustomerDetails;
  isEditable: boolean = false;
  isSaveDisabled: boolean = false;
  isRefreshDisabled: boolean = false;
  customerNo: string = "";
  isLocEdit: boolean = false;
  isTrue: boolean = false;
  isSelected: boolean = false;
  newCustomerData: ViewCustomerData;
  locationCode = localStorage.getItem("locationCodeList");
  locationLists = this.locationCode.split(",");
  user = localStorage.getItem("userName");
  roleName = localStorage.getItem("roleName");
  dbCodeList = localStorage.getItem("dbCodeList");
  religiousList: any[] = [
    { id: "1", name: "Yes" },
    { id: "0", name: "No" },
  ];
  custList: any[] = [];
  filterLocation: any[] = [];
  policeList: any[] = [
    { id: "1", name: "Yes" },
    { id: "0", name: "No" },
  ];

  ministryData: any;
  docData: any;
  documentTitle: any;
  report: any;
  locationListAll: any[];
  zoneLists: ZoneModel[] = [];
  circleLists: CircleModel[] = [];
  db: CenterModel;
  constructor(
    private _ministryCustservice: MinistryCustomeService,
    private _fb: FormBuilder,
    private _service: ReligiousService,
    private _ministryService: MinistryService,
    private _toasterService: NbToastrService,
    private _activateRoute: ActivatedRoute,
    private _pdfService: NewCustomerDataService,
    private _router: Router,
    private _msLocation: MiscLocationService,
    private _miscBillingService: MiscBillingService,
  ) {
    this.locationCode = localStorage.getItem("locationCodeList");
    this.locationLists = this.locationCode.split(",");
    this.user = localStorage.getItem("userName");
    this.roleName = localStorage.getItem("roleName");
    this.dbCodeList = localStorage.getItem("dbCodeList");
  }

  ngOnInit(): void {
    if (this.roleName != "Admin") {
      this.getLocationsBySession(this.locationLists);
    }
    this.getAllMinistry();
    this.createForm();
    // this.getAllLocation();
    this.getZoneList();
    this.getCityCorporation();

    this.getAllPowrova();
    
    this.getAllUnionParishad();
    this.getAllDivision();
    this.getNonBengali();

    
    if (
      this._activateRoute.snapshot.paramMap.get("customerNumber") !== null &&
      this._activateRoute.snapshot.paramMap.get("locationCode") !== null
    ) {
      let customerNumber =
        this._activateRoute.snapshot.paramMap.get("customerNumber");
      let locationCode =
        this._activateRoute.snapshot.paramMap.get("locationCode");
      this.getMinistryDetailsByCustNum(customerNumber, locationCode);
      this.isLocEdit = true;
    }
  }
  getAllLocation() {
    this._miscBillingService.getAllLocation().subscribe((res) => {
      this.locationListAll = res.data.data;
    });
  }

  // getMinistryCustomer(customerNo, circleCode, dbCode, locationCode, cityCode) {
  //   this._ministryCustservice
  //     .getMinistryCustomer(
  //       customerNo,
  //       circleCode,
  //       dbCode,
  //       locationCode,
  //       cityCode
  //     )
  //     .subscribe((res: any) => {
  //       this.ministryCustomerList = res as MinistryCustomerGetModel[];
  //     });
  // }

  getMinistryDetailsByCustNum(customerNumber, locationCode) {
    this._ministryCustservice
      .getMinistryDetailsByCustNum(customerNumber, locationCode)
      .subscribe(
        (res: any) => {
          this.customerDetails = res as MinistryCustomerDetails;
          this.ministryCustomerForm.patchValue({
            customerNo: this.customerDetails.customerNo,
            customerNameBN: this.customerDetails.customerNameBN,
            customerNameEN: this.customerDetails.customerNameEN,
            divisionCode: this.customerDetails.divisionCode,
            ministryCode: this.customerDetails.ministryCode,
            citycorporationCode: this.customerDetails.citycorporationCode,
            pouroshovaCode: this.customerDetails.pouroshovaCode,
            unionParishadCode: this.customerDetails.unionParishadCode,
            religiousCode: this.customerDetails.religiousCode,
            nonBengaliCampCode: this.customerDetails.nonBengaliCampCode,
            zoneCode: this.customerDetails.zoneCode,
            dbCode: this.customerDetails.dbCode,
          });

          this.getDistrictByDivision(this.f.divisionCode.value);
          this.ministryCustomerForm.patchValue({
            districtCode: this.customerDetails.districtCode,
          });
          this.getUpozilaByDistrict(this.f.districtCode.value);
          this.ministryCustomerForm.patchValue({
            upazilaCode: this.customerDetails.upazilaCode,
          });
          this.getCircleByZone(this.f.zoneCode.value);
          this.ministryCustomerForm.patchValue({
            circleCode: this.customerDetails.circleCode,
          });
          this.getMinistryDept(this.f.ministryCode.value);
          this.ministryCustomerForm.patchValue({
            departmentCode: this.customerDetails.departmentCode,
          });
          this.getLocationByCircle(this.f.circleCode.value);
          this.ministryCustomerForm.patchValue({
            locationCode: this.customerDetails.locationCode,
          });
          this.getDbByLocation(this.f.locationCode.value)
        },
        (er) => {
          this._toasterService.danger("Something Is Wrong Please Try Again !!");
        }
      );
  }

  getAllMinistry() {
    this._ministryCustservice.getAllMinistry().subscribe((res) => {
      this.ministryList = res.data as Ministry[];
    });
  }

  getMinistryDept(event: string) {
    this.ministryDept=[];
    this.ministryCustomerForm.patchValue({
      departmentCode: null,
    });
    this._ministryCustservice.getMinsitryDept(event).subscribe((res: any) => {
      this.ministryDept = res.data as DropdownResultForStringKeyModel[]; 
      if(this.ministryDept.length==1){
        this.f.departmentCode.setValue(this.ministryDept[0].key)
      } 

    });

  }

  getCityCorporation() {
    this._ministryCustservice
      .getAllCityCorporationDatList()
      .subscribe((res: any) => {
        this.cityCorporationList = res.data as CityCorporation[];
      });
  }

  getZoneList() {

    this._miscBillingService.getAllLocation().subscribe((res) => {
      this.locationListAll = res.data.data as any[];
      if (this.locationListAll.length > 0) {
        this._ministryCustservice.getAllZoneDataList().subscribe((res: any) => {
          if (this.roleName == "Admin") {
            this.zoneList = res.data as ZoneModel[];
          }
          else if(this.locationFormSession.length == 1){
            this.zoneList = [];
            this.zoneLists = [];
            let zone = res.data as ZoneModel[];
            this.locationFormSession.forEach((l) => {
              this.zoneLists.push(zone.find((z) => z.code == l.zoneCode));
            });
            this.zoneList = [...new Set(this.zoneLists.map((item) => item))];
            this.ministryCustomerForm.patchValue({
              zoneCode: this.zoneList[0].code,
            });
            this.getCircleByZone(this.f.zoneCode.value);
          }
          else {
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
    });
  }

  getCircleByZone(event: string) {
    this.ministryCustomerForm.patchValue({
      circleCode: "",
    });
    this._miscBillingService.getAllLocation().subscribe((res) => {
      this.locationListAll = res.data.data as any[];
      this.filterLocation = this.locationListAll.filter(
        (p) => p.code == this.locationLists[0]
      );
      this._service.getAllCircleByZoneCode(event).subscribe((res: any) => {
        if (this.roleName == "Admin") {
          this.circleList = res.data as CircleModel[];
        }
        else if(this.locationFormSession.length == 1){
          this.circleLists = [];
          let circle = res.data as CircleModel[];
          this.locationFormSession.forEach((l) => {
            let singleArray = circle.find((z) => z.code == l.circleCode);
            if (singleArray != undefined) this.circleLists.push(singleArray);
          });
          this.circleList = [...new Set(this.circleLists.map((item) => item))];
          this.ministryCustomerForm.patchValue({
            circleCode: this.circleList[0].code,
          });
          this.getLocationByCircle(this.f.circleCode.value);
        }
         else {
          this.circleLists = [];
          let circle = res.data as CircleModel[];
          this.locationFormSession.forEach((l) => {
            let singleArray = circle.find((z) => z.code == l.circleCode);
            if (singleArray != undefined) this.circleLists.push(singleArray);
          });
          this.circleList = [...new Set(this.circleLists.map((item) => item))];
        }
        
      });
    });
  }

  // getAllDatabaseDD() {
  //   this._ministryService.getAllDbConfigDDList().subscribe((res: any) => {
  //     if (this.roleName == "Admin") {
  //       this.dbConfigData = res.data as CenterModel[];
  //     }
  //     else if(this.locationFormSession.length == 1){
  //       this.dbConfigData = [];
  //       let db = res.data as CenterModel[];
  //       this.locationFormSession.forEach((l) => {
  //         this.dbData.push(db.find((z) => z.key == l.dbCode));
  //       });
  //       this.dbConfigData = [...new Set(this.dbData.map((item) => item))];
  //       this.ministryCustomerForm.patchValue({
  //         dbCode: this.dbConfigData[0].key,
  //       });
  //       this.getLocationByCircle(this.f.dbCode.value);
  //     }
  //     else {
  //       this.dbConfigData = [];
  //       this.dbData = [];
  //       let db = res.data as CenterModel[];
  //       this.locationFormSession.forEach((l) => {
  //         this.dbData.push(db.find((z) => z.key == l.dbCode));
  //       });
  //       this.dbConfigData = [...new Set(this.dbData.map((item) => item))];
        
  //     }
  //   });
  // }

  getLocationByCircle(event: any) {
    this.ministryCustomerForm.patchValue({
      locationCode: '',
    });

    this._service.getAllLocationByCircle(event).subscribe(res => {
      if (this.roleName == "Admin") {
        this.locationList = res as Locations[];
        }
        else if(this.locationFormSession.length == 1){
          this.locationList = [];
          this.locationList.push(this.locationFormSession[0]);
          this.ministryCustomerForm.patchValue({
          locationCode: this.locationFormSession[0].code,
        });
        this.getDbByLocation(this.locationFormSession[0].code)
        }
        else{
          let loc = res as Locations[];
          let locData : Locations[] = [];
          this.locationFormSession.forEach((l) => {
          let singleArray = loc.find((z) => z.code == l.code);
          if (singleArray != undefined) locData.push(singleArray);
        });
        this.locationList = [...new Set(locData.map((item) => item))];
        }
    });
  }

  // getDbByCircle(circleCode:string){
  //   this.ministryCustomerForm.patchValue({
  //     dbCode: '',
  //   });
  //   if(this.roleName != 'Admin'){
  //     this._ministryService.getDbByCircle(circleCode).subscribe((res: any) => {
  //       let dbData = res as CenterModel[];
  //       this.dbConfigData = [...new Set(dbData.map((item) => item))];
  //       if(this.dbConfigData.length == 1){
  //         this.ministryCustomerForm.patchValue({
  //           dbCode: this.dbConfigData[0].key,
  //         });
  //         this.getLocationByCenter(this.f.dbCode.value);
  //       }
  //     });
  //   }
  // }

  getDbByLocation(event: string){
    
    this.ministryCustomerForm.patchValue({
      dbCode: '',
    });
    this._ministryService.getDbByLocation(event).subscribe((res: any) => {
      this.db = res as CenterModel;
      this.dbData=[];
      this.dbData.push(this.db)
      this.ministryCustomerForm.patchValue({
        dbCode: this.db.key,
      });
    });
  }

  // getLocationByCenter(event: string) {
  //   this.ministryCustomerForm.patchValue({
  //     locationCode: '',
  //   });
    
  //     this._ministryService.getLocationDDList(event).subscribe((res: any) => {
  //       if (this.roleName == "Admin") {
  //       this.locationList = res.data as LocationModel[];
  //       }
  //       else if(this.locationFormSession.length == 1){
  //         let loc = res.data as LocationModel[];
  //         let locData : LocationModel[] = [];
  //         this.locationFormSession.forEach((l) => {
  //         let singleArray = loc.find((z) => z.key == l.code);
  //         if (singleArray != undefined) locData.push(singleArray);
  //       });
  //       this.locationList = [...new Set(locData.map((item) => item))];
  //       this.ministryCustomerForm.patchValue({
  //         locationCode: this.locationList[0].key,
  //       });
  //       }
  //       else{
  //         let loc = res.data as LocationModel[];
  //         let locData : LocationModel[] = [];
  //         this.locationFormSession.forEach((l) => {
  //         let singleArray = loc.find((z) => z.key == l.code);
  //         if (singleArray != undefined) locData.push(singleArray);
  //       });
  //       this.locationList = [...new Set(locData.map((item) => item))];
  //       }
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

  getAllDivision() {
    this._ministryCustservice.getDivision().subscribe((res: any) => {
      this.divisionList = res as DDForStringKeyModel[];
    });
  }
  getDistrictByDivision(event: string) {
    this._ministryCustservice.getDistrict(event).subscribe((res: any) => {
      this.districtList = res as DDForStringKeyModel[];
      this.ministryCustomerForm.patchValue({
        districtCode: "0",
      });
    });
  }
  getUpozilaByDistrict(event: string) {
    this._ministryCustservice.getUpozila(event).subscribe((res: any) => {
      this.upozilaList = res as DDForStringKeyModel[];
      this.ministryCustomerForm.patchValue({
        upazilaCode: "0",
      });
    });
  }

  getNonBengali() {
    this._ministryCustservice.getNonBengaliList().subscribe((res: any) => {
      this.nonBengaliList = res as DDForStringKeyModel[];
    });
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];
        //this.getAllDatabaseDD();
      });
      
  }

  onSearchAgain() {
    this._router.navigate(["/ministry-customer/ministry-customer-generate"]);
    this.isTrue = false;
  }

  viewCustomerData(customerNo: any, locationCode: string) {
    this._ministryCustservice
      .viewCustomerData(customerNo, locationCode)
      .subscribe((res: any) => {
        this.newCustomerData = res as ViewCustomerData;
      });
  }

  public reportGenerate() {
    this.docData = this._pdfService.generatePdf(
      this.newCustomerData,
      this.f.locationCode.value
    );
    this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;
      this.isTrue = true;
    });
  }

  checkCustomerExistence(event) {
    if (event.key == "Enter" || event.key == "Tab") {
      let customerNo = this.f.customerNo.value;
      let locationCode = this.f.locationCode.value;
      let zoneCode = this.f.zoneCode.value;
      let circleCode = this.f.circleCode.value;
      let dbCode = this.f.dbCode.value;
      this._ministryCustservice
        .getMinistryCustomerByNo(this.f.customerNo.value)
        .subscribe((res: any) => {
          if (res == null) {
             this.ministryCustomerForm.patchValue({
              locationCode: locationCode,
              zoneCode: zoneCode,
              circleCode: circleCode,
              dbCode: dbCode,
              customerNo: customerNo,
            });
            this.isSaveDisabled = false;
            this.isRefreshDisabled = false;
          } else {
            this._router.navigate([
              "/ministry-customer/ministry-customer-view",
              customerNo,
              locationCode,
            ]);
            this._toasterService.danger(
              "Customer is already exist, please update",
              "Error"
            );
            this.isSaveDisabled = true;
            this.isRefreshDisabled = true;
          }
        });
    }
  }

  save() {
    if (this.ministryCustomerForm.invalid) {
      this._toasterService.danger(
        "Please fill all the required field!",
        "Error"
      );
      return;
    }

    this._ministryCustservice.saveMinistryCustomer(this.formval).subscribe(
      (res: any) => {
        //let ministryData = res;
        //let consumerNo = ministryData.filter(x => x.customerNo == this.formval.customerNo);
        if (res) {
          this.newCustomerData = res as ViewCustomerData;
          this._toasterService.success(
            "Customer Information Successfully Saved!",
            "Success"
          );
          // this.viewCustomerData(
          //   this.f.customerNo.value,
          //   this.f.locationCode.value
          // );
          this.reportGenerate();
          this.refresh();
        } else {
          this._toasterService.danger("Failed To Saved ", "Error");
        }
      },
      (er) => {
        this._toasterService.danger("Something went worng!!", "Error");
      }
    );
  }

  createForm() {
    this.ministryCustomerForm = this._fb.group({
      customerNo: [, [Validators.required]],
      customerNameBN: [, []],
      customerNameEN: [, []],
      divisionCode: [, []],
      districtCode: [, []],
      upazilaCode: [, []],
      ministryCode: [, [Validators.required]],
      departmentCode: [, []],
      citycorporationCode: [, []],
      pouroshovaCode: [, []],
      unionParishadCode: [, []],
      religiousCode: [, []],
      nonBengaliCampCode: [, []],
      isPolice: [, []],
      zoneCode: [, [Validators.required]],
      circleCode: [, []],
      dbCode: [, [Validators.required]],
      locationCode: [, [Validators.required]],
    });
  }
  get f() {
    return this.ministryCustomerForm.controls;
  }

  get formval() {
    return this.ministryCustomerForm.value;
  }

  refresh() {
    this.createForm();
    this.getZoneList();
    //this.getAllDatabaseDD();
  }

  ViewPage() {
    this._router.navigate(["ministry-customer/ministry-customer-view"]);
  }
}
