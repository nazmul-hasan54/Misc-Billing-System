import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

import { CustomerDetails } from "../../../model/customer-details";
import { DCTypeModel } from "../../../model/dcType.model";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { NbToastrService } from "@nebular/theme";
import { UntracedConsumerModel } from "../../../model/untraced-consumer.model";
import { UntracedConsumerService } from "../../../services/untraced-consumer.service";
import { MinistryService } from "../../../services/ministry.service";
import { Locations } from "../../../model/locations.model";
import { LocationNameModel } from "../../../model/locationname.model";

@Component({
  selector: "ngx-untraced-consumer-generate",
  templateUrl: "./untraced-consumer-generate.component.html",
  styleUrls: ["./untraced-consumer-generate.component.scss"],
})
export class UntracedConsumerGenerateComponent implements OnInit {
  untracedConsumerForm: FormGroup;
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  customerDetails: CustomerDetails;
  customerNumber: string;
  roleName = localStorage.getItem("roleName");
  dcTypeList: DCTypeModel[] = [
    { dcTypeId: 1, dcTypeCode: "1", dcTypeDesc: "Untraced" },
    {
      dcTypeId: 1,
      dcTypeCode: "0",
      dcTypeDesc: "Traced",
    },
  ];
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  userName: string = localStorage.getItem("userName");
  locationFormSession: Locations[] = [];
  dbCodeList = localStorage.getItem("dbCodeList");
  isMore: boolean = false;
  singleLocation: Locations;
  dbCode: string;
  locCode: any;

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _miscBillingService: MiscBillingService,
    private _untracedConService: UntracedConsumerService,
    private _ministryService: MinistryService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getLocationByUser();
    
  }
  getLocationByUser() {
    if(this.roleName != 'Admin'){
        this.untracedConsumerForm.patchValue({
          locationCode: this.locationCodes[0],
        });
    }
    else{
      this._miscBillingService.getAllLocation().subscribe((res) => {
        this.locationFormSession = res.data.data as Locations[];
    })
  }
}
  getLocationsBySession(locationCodeList: string[]) {
    if (this.locationCodes.length > 1){
    this.isMore = true;
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];
      });
    } 
    else{
      this.untracedConsumerForm.patchValue({
        locationCode: this.locationCodes[0]
      })
      this.dbCode = this.dbCodeList[0];
      this.locCode = this.locationCodes[0];
    }
  }
  getDbByLocation(code) {
    this.singleLocation = this.locationFormSession.find((x) => x.code == code);
    this.dbCode = this.singleLocation.dbCode;
    this.locCode = code;
  }

  getcustomerDetails(event) {

    if (event.key == "Enter" || event.key == "Tab") {
      if (this.f.customerNumber.value.length == 8) {
        this._miscBillingService
          .getUntracedCustomerByCustNumber(
            this.f.customerNumber.value,
            this.dbCode,
            this.locCode
          )
          .subscribe(
            (res: any) => {
              if (res == null) {
                this._toasterService.danger("Data Not Found");
                this.createForm();
              } else {
                this.customerDetails = res as CustomerDetails;
                this.untracedConsumerForm.patchValue(this.customerDetails);
              }
            },
            (er) => {
              this._toasterService.danger(
                "Something Is Wrong Please Try Again !!"
              );
            }
          );
      } else {
        this._toasterService.danger("Make Sure You Enter Right Info !!");
      }
    }
  }

  getConsumerByCustNum(customerNumber: string) {
    this._untracedConService.getConsumerByCustNum(customerNumber).subscribe(
      (res: any) => {
        let data = res as UntracedConsumerModel;
        this.customerNumber = data.customerNumber;
      },
      (er) => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
      }
    );
  }

  getDcType() {
    this._miscBillingService.getDcType().subscribe(
      (res) => {
        this.dcTypeList = res.data as DCTypeModel[];
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }

  untracedConsumerSave() {
    if (this.untracedConsumerForm.invalid) {
      this._toasterService.danger("Please fill all the requered field.");
      return;
    }
    this._untracedConService.saveuntracedConsumerBill(this.formVal).subscribe(
      (res: any) => {
        let saveData = res as any;
        if (saveData.status) {
          this._toasterService.success("Successfully Saved Data", "Success");
          this.reset();
        } else {
          this._toasterService.danger(
            "Failed To Saved, Make sure you have not previously saved this consumer!",
            "Error"
          );
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }

  createForm() {
    this.untracedConsumerForm = this._fb.group({
      custId: [, []],
      areaCode: [, []],
      businessType: [, []],
      customerName: [, []],
      locationCode: [, []],
      locationName: [, []],
      meterNum: [, []],
      meterTypeDesc: [, []],
      prvAcNo: [, []],
      tariffId: [, []],
      tariffDesc: [, []],
      customerNumber: [
        ,
        [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")],
      ],
      customerAddr: [, []],
      meterConditionDesc: [, []],
      ucType: ["1", [Validators.required]],
      createdBy: [this.userName, []],
      updatedBy: [this.userName, []],
    });
  }
  reset() {
    this.createForm();
  }
  get formVal() {
    return this.untracedConsumerForm.value;
  }

  get f() {
    return this.untracedConsumerForm.controls;
  }
}
