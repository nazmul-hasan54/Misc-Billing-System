import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { BillGroupModel } from "../../../model/temporary/billGroup.model";
import { BlockNumModel } from "../../../model/temporary/blockNum.model";
import { BookBillGroupService } from "../../../services/book-bill-group.service";
import { BusinessTypeModel } from "../../../model/temporary/businessTyp.model";
import { BusinessTypesService } from "../../../services/business-types.service";
import { FeederModel } from "../../../model/temporary/feeder.model";
import { InitialReadingModel } from "../../../model/temporary/initialReading.model";
import { LocationModel } from "../../../model/temporary/location.model";
import { MeterConditionModel } from "../../../model/temporary/meterCondition.model";
import { MeterOwnerModel } from "../../../model/temporary/meterOwner.model";
import { MeterService } from "../../../services/meter.service";
import { MeterTypeModel } from "../../../model/temporary/meterType.model";
import { MiscLocationService } from "../../../services/misc-location.service";
import { NbToastrService } from "@nebular/theme";
import { TariffModel } from "../../../model/temporary/tariff.model";
import { TarrifService } from "../../../services/tarrif.service";
import { TemporaryBillService } from "../../../services/temporary-bill.service";

@Component({
  selector: "ngx-temporary-bill-genarate",
  templateUrl: "./temporary-bill-genarate.component.html",
  styleUrls: ["./temporary-bill-genarate.component.scss"],
})
export class TemporaryBillGenarateComponent implements OnInit {
  temporarybillform: FormGroup;
  locationlist: any[] = [];
  locListLD: any[] = [];
  Blocklist: any[]=[];
  booklistld:any[]=[]
  meterOwnerlist: any[]=[];
  meterNumberlist: any[] = [];
  connectedLoadList: any[] = [];
  locationList:LocationModel[]=[];
  locationListDd: any[];
  billGroupList:BillGroupModel[]=[];
  meterOwnerList:MeterOwnerModel[]=[];
  meterTypeList:MeterTypeModel[]=[];
  meterConsitionList:MeterConditionModel[]=[];
  tariffList:TariffModel[]=[];
  businessTypeList:BusinessTypeModel[]=[];
  feederList:FeederModel[]=[];
  initialReadingList : InitialReadingModel[] = [];
  initReadingFormArray:FormArray;
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  roleName = localStorage.getItem('roleName');
  userName:string=localStorage.getItem("userName")
  
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private temporaryService: TemporaryBillService,
    private _temporaryService: TemporaryBillService,
    private _bookBillGroup:BookBillGroupService,
    private _meterOwnerService:MeterService,
    private _tarrifService:TarrifService,
    private _businessTypeService:BusinessTypesService,
    private _miscLocation:MiscLocationService
  ) {}

  ngOnInit(): void {
    this.CreateForm();
    this.getLocationByUser();
    this.getAllMeterOwner();
    this.getAllMeterType();
    this.getAllMeterCondition();
    this.getAllTariff();
    this.getAllBusinessType();
    this.getAllFeeder();
    
  }

  getLocationByUser(){
    if(this.roleName == 'Admin'){
      this._miscLocation.getLocationDD().subscribe((res: any) => {
        this.locationListDd = res.data as any[];
        console.log(this.locationList);
        
      });
    } else {
      this._miscLocation.getLocationByUser(this.locationCodes[0]).subscribe(res=>{
        this.locationList=res as LocationModel[];
        this.temporarybillform.patchValue({
          locationCode:this.locationList[0].locationCode
        })
        this._miscLocation.getAllBlockNum(this.f.locationCode.value).subscribe(res=>{
          this.Blocklist=res as BlockNumModel[];
        })
      })
    }
  }

  getAllBillGroup(event){
    this._bookBillGroup.getAllBillGroup(this.f.locationCode.value, event).subscribe(res=>{
      this.billGroupList=res as BillGroupModel[];
      this.temporarybillform.patchValue({
        billGroup: this.billGroupList[0].billGroup
      })
    })
  }

  getAllMeterOwner(){
    this._meterOwnerService.getAllMeterOwner().subscribe(res=>{
      this.meterOwnerList=res as MeterOwnerModel[];
    })
  }

  getAllMeterType(){
    this._meterOwnerService.getAllMeterType().subscribe(res=>{
      this.meterTypeList=res as MeterTypeModel[];
    })
  }
  getAllMeterCondition(){
    this._meterOwnerService.getAllMeterCondition().subscribe(res=>{
      this.meterConsitionList=res as MeterConditionModel[];
    })
  }
  getAllTariff(){
    this._tarrifService.getAllTariff().subscribe(res=>{
      this.tariffList=res as TariffModel[];
    })
  }
  getAllBusinessType(){
    this._businessTypeService.getAllBusinessType().subscribe(res=>{
      this.businessTypeList=res as BusinessTypeModel[];
      this.temporarybillform.patchValue({
        businessType:this.businessTypeList[0].busTypeCode
      })
    })
  }

  getAllFeeder(){
    this._temporaryService.getAllFeeder(this.locationCodes[0]).subscribe(res=>{
      this.feederList=res as FeederModel[];
    })
  }

  getAllBlockNum(event:any){
    this._miscLocation.getAllBlockNum(event).subscribe(res=>{
      this.Blocklist=res as BlockNumModel[];
    })
  }

  getInitialReading(){
    if (this.temporarybillform.value.meterOwner == null || this.temporarybillform.value.meterType == null || this.temporarybillform.value.meterNumber == null ||
      this.temporarybillform.value.meterDigit == null || this.temporarybillform.value.meterCondition == null || this.temporarybillform.value.omf == null) {
      this._toasterService.danger("Please fill all Meter Information!.","Failed");
      return;
    }
    this.initReadingFormArray = this._fb.array([]);
    this.temporaryService.getInitialReading(this.formVal.meterType).subscribe(res =>{
      this.initialReadingList = res as InitialReadingModel[];
      this.addRow(this.initialReadingList);
    })
  }

  addRow(initReadingList:InitialReadingModel[]){
    initReadingList.forEach(e => {
      this.initReadingFormArray.push(new FormGroup({
        todDesc: new FormControl(e.todDesc),
        timeCycleDesc: new FormControl(e.timeCycleDesc),
        readingTypeDesc: new FormControl(e.readingTypeDesc),
        reading: new FormControl(0),
        readingDate: new FormControl(new Date()),
        todCode: new FormControl(e.todCode),
        timeCycleCode: new FormControl(e.timeCycleCode),
        readingTypeCode: new FormControl(e.readingTypeCode),
      }))
    })
  }
  changeInitialReading(event:any){
    this.initReadingFormArray=this._fb.array([]);
  }
  save(){
    if (this.temporarybillform.invalid) {
      this._toasterService.danger("Please fill all the requered field.","Failed");
      return;
    }
    this.temporarybillform.patchValue({
      initialReadingList:this.detailsFormAllVal
    })
    this._temporaryService.saveCensusBill(this.formVal).subscribe(res=>{
      if(res){
        this._toasterService.success("Save Successfully","Success");
        this.CreateForm();
        this.initReadingFormArray = this._fb.array([]);
        this._router.navigate(['/temporary/customer-censuslist'])
      }
      else{
        this._toasterService.danger("Failed To Save","Failed");
      }
    },er=>{
      this._toasterService.danger("Something Went Wrong Please Try Again !!","Failed");
    })

  }
  CreateForm() {
    this.temporarybillform = this._fb.group({
      locationCode: [, [Validators.required]],
      blcokNumber: [, [Validators.required]],
      billGroup: [, []],
      oldAcNo: [, []],
      walkOrder: [, [Validators.pattern("^((\\+91-?)|0)?[0-9]{4}$")]],
      customerName: [, [Validators.required]],
      fatherName: [, []],
      address: [, []],
      nidNUmber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(16)]],
      mobileNumber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(11),Validators.maxLength(15)]],
      meterOwner: [, [Validators.required]],
      meterType: [, [Validators.required]],
      meterNumber: [, [Validators.required]],
      meterDigit: [, [Validators.required]],
      meterCondition: [, [Validators.required]],
      omf: [, []],
      tarrif: [, [Validators.required]],
      sanctionLoad: [, [Validators.required]],
      connectedLoad: [, [Validators.required]],
      monthlyConsumption: [, []],
      businessType: [, [Validators.required]],
      formerNumber: [, []],
      formerCapacity: [, []],
      feederdesc: [, []],
      todDesc: ['', []],
      timeCycleDesc: ['', []],
      readingTypeDesc: ['', []],
      reading: [, []],
      readingDate: ['', []],
      initialReadingList:[[],],
      userName:[this.userName,[]]
    });
    this.initReadingFormArray = this._fb.array([]);
  }

  get f(){
    return this.temporarybillform.controls;
  }
  get formVal() {
    return this.temporarybillform.value;
  }
  get detailsFormAllVal() {
    return this.initReadingFormArray.value;
  }

 
}
