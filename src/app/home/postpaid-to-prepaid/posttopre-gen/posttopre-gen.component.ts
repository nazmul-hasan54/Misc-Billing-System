import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { dateFormatForDDMMYY, dateFormatForDDMMYYYY } from "../../../@core/utils/utiliy";

import { CustomerDetails } from "../../../model/customer-details";
import { LocationModel } from "../../../model/temporary/location.model";
import { MeterOwnerModel } from "../../../model/temporary/meterOwner.model";
import { MeterService } from "../../../services/meter.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { MiscLocationService } from "../../../services/misc-location.service";
import { NbToastrService } from "@nebular/theme";
import { PostpaidCustDetailsModel } from "../../../model/PostpaidToPrepaid/postCustDetails.model";
import { PostpaidToPrepaidService } from "../../../services/postpaid-to-prepaid.service";
import { Router } from "@angular/router";
import { LocationNameModel } from "../../../model/locationname.model";
import { DropDownResultForString } from "../../../shared/models/drop-down-result-for-string.model";

@Component({
  selector: "ngx-posttopre-gen",
  templateUrl: "./posttopre-gen.component.html",
  styleUrls: ["./posttopre-gen.component.scss"],
})
export class PosttopreGenComponent implements OnInit {
  posttopreform: FormGroup;
  locationList: LocationModel[] = [];
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  meterOwnerList: MeterOwnerModel[] = [];
  postDetails: PostpaidCustDetailsModel;
  locationNamelist: LocationNameModel[];
  isEditable: boolean = false;
  maxDate: Date = new Date();
  customerDetail: CustomerDetails;
  disable:boolean=true;
  dbCodeList = localStorage.getItem("dbCodeList");
  dbCode = this.locationLists.split(",");
  userNamelist = localStorage.getItem("userName");
  userCode = this.userNamelist.split(",");
  roleName = localStorage.getItem("roleName");
  meterOwnerLists: any[]=[
    {"id":'1', "name":"BPDB"},
    {"id":'2', "name":"Customer"}
  ];
  divisionLists: DropDownResultForString[];
  districtLists: DropDownResultForString[];
  thanaLists: DropDownResultForString[];

  constructor(
    private _fb: FormBuilder,
    private _miscLocation: MiscLocationService,
    private _toasterService: NbToastrService,
    private _meterOwnerService: MeterService,
     private _miscBillingService: MiscBillingService,
    private _posttopreService: PostpaidToPrepaidService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.CreateForm();
    this.getLocationByUser();
    this.getAllMeterOwner();
    this.getPrepaidDivision();
  }

  getcustomerDetails(event:any) {
    if (event.key == "Enter" || event.key == "Tab") {
      if (this.f.customerNumber.value.length == 8) {
        this._miscBillingService
          .getUntracedCustomerByCustNumber(this.f.customerNumber.value,this.dbCodeList, this.f.locationCode.value).subscribe((res: any) => {
              if (res == null)
              {
                this._toasterService.danger("Data Not Found");
                this.CreateForm();
                } else {
                this.customerDetail = res as CustomerDetails;
                
                this.posttopreform.patchValue(this.customerDetail);
                this.posttopreform.patchValue({
                  powerUtility: this.customerDetail.locationDeptCode,
                  maxPower: this.customerDetail.sanctionedLoad.toString(),
                  contactName:this.customerDetail.customerName
                  //meterOwnerCode: this.meterOwnerList[0]
                });

                
              }
            },
            (er) => {
              this._toasterService.danger(
                "Something Is Wrong Please Try Again !!"
              );
            }
          );
          this._posttopreService.getdivistiondistrictbylocation(this.f.locationCode.value).subscribe(res=>{
            let result=res as any;
            this.posttopreform.patchValue({
              divisionCode:result.divisionCode
            })
            this._posttopreService.GetPrepaidDistrictByDivision(result.divisionCode).subscribe((res:any) => {
              this.districtLists = res as DropDownResultForString[];
              this.posttopreform.patchValue({
                districtCode:result.districtCode
              })
              this.GetPrepaidThanaByDistrict(result.districtCode)
            });
          })
      } else {
        this._toasterService.danger("Make Sure You Enter Right Info !!");
      }
    }
  }

  getPrepaidDivision(){
    this._posttopreService.getPrepaidDivision().subscribe((res:any) => {
      this.divisionLists = res as DropDownResultForString[];
    });
  }

  GetPrepaidDistrictByDivision(divCode:string){
    this.districtLists = [];
    this._posttopreService.GetPrepaidDistrictByDivision(divCode).subscribe((res:any) => {
      this.districtLists = res as DropDownResultForString[];
    });
  }
  GetPrepaidThanaByDistrict(distCode:string){
    this.thanaLists = [];
    this._posttopreService.GetPrepaidThanaByDistrict(distCode).subscribe((res:any) => {
      this.thanaLists = res as DropDownResultForString[];
    });
  }

  getLocationByUser() {
    if(this.roleName != 'Admin'){
        this.posttopreform.patchValue({
          locationCode: this.locationCodes[0],
        });
    }
    else{
      
      this._miscBillingService.getAllLocation().subscribe((res) => {
        this.locationNamelist = res.data.data as LocationNameModel[];
    })
  }
}

  getAllMeterOwner() {
    this._meterOwnerService.getAllMeterOwner().subscribe((res) => {
      this.meterOwnerList = res as MeterOwnerModel[];
    });
  }

  save() {
    if (this.posttopreform.invalid) {
      this._toasterService.danger("Please fill all the required field.");
      return;
    }    

    if(this.f.nidNumber.value.length==10 ||this.f.nidNumber.value.length==17){
      this._posttopreService.saveData(this.formVal).subscribe(
        (res:any) => {
          if(res.status){
            this._toasterService.success(res.message, "Success");
            //this._router.navigate(['postpaid-to-prepaid/posttopre-view'])
            this.CreateForm();
          } 
          else{
            this._toasterService.danger(res.message, "error");
          }
        },
        (er) => {
          this._toasterService.danger(er.message);
        }
      );
    }
    else{
      this._toasterService.danger("Nid field value must be 10 or 17 digits","Error");
    }
    
  }


  dateChange(event: Date) {
    let lastReadingDate = dateFormatForDDMMYY(event);
    this.posttopreform.patchValue({
      lastReadingDate: lastReadingDate
    })
    
  }
  checkValue(event:boolean){
    if(this.f.isSanctionLoad.value==false){
      this.f.maxPower.setValue(0);
      this.disable=false;
    }
    else{
      this.f.maxPower.setValue(this.f.sanctionedLoad.value)
      this.disable=true
    }
    
  }
  CreateForm() {
    this.posttopreform = this._fb.group({
      areaCode: [, []],
      businessType: [, []],
      locationName: [, []],
      meterNum: [, []],
      meterTypeDesc: [, []],
      customerName: [, []],
      prvAcNo: [, []],
      tariffDesc: [, []],
      customerNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]],
      customerAddr: [, []],
      nidNumber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(17)]],
      mobileNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
      lastReading: [, []],
      multypliBy: ["", []],
      billReasonCode: [, []],
      vatAmount: [, []],
      totalAmount: [, []],
      dcAmount: [, []],
      dcType: [, [,]],
      dueDate: [, []],
      lastReadingDate: [, [Validators.required]],
      dcDate: [, []],
      meterTypeCode: ["01", []],
      lastReadingOffPeak: [, []],
      lastReadingPeak: [, []],
      meterConditionDesc: [, []],
      custId: [, []],
      locationCode: [, []],
      tariffId: [, []],
      meterCondition: [, []],
      penaltyUnit: [, []],
      principleAmount: [, []],
      imposedByCode: [, []],
      offPeakUnit: [, []],
      peakUnit: [, []],
      meterConditionCode: [, []],
      businessTypeCode: [, []],
      billNumber: [, []],
      peakAmount: [, []],
      offPeakAmount: [, []],
      srAmount: [, []],
      dcTypeCode: [, []],
      discDate: [, []],
      dDate: [, []],
      lDate: [, []],
      tin: [, []],
      powerUtility:[,[Validators.required]],
      maxPower: [, [Validators.required,Validators.max(79)]],
      userCode:[this.userCode[0],[]],
      latitude:[,[]],
      longitude:[,[]],
      meterOwnerCode:['1',[]],
      divisionCode:[,[]],
      districtCode:[,[]],
      thanaCode:[,[]],
      leftSerialNo:[,[]],
      rightSerialNo:[,[]],
      terminalLoss:[,[]],
      isSanctionLoad:[true,[]],
      sanctionedLoad:[,[]],
      arrearAmount:[,[]],
      contactName:[,[]],
      lastBillReadingSr :[,[]],
  lastBillReadingPk :    [,[]],
  lastBillReadingOfPk :  [,[]]
    });
  }

  get f() {
    return this.posttopreform.controls;
  }
  get formVal() {
    return this.posttopreform.value;
  }
}
