import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Locations } from '../../../../model/locations.model';
import { CustomerArrearService } from '../../../../services/customer-arrear.service';
import { NewUserByCenterLocationService } from '../../../../services/new-user-by-center-location.service';
import { orderTypeDropDownData, tariffList } from '../../Common/ReportCommonService';

@Component({
  selector: 'ngx-regular-customer-arrear-details',
  templateUrl: './regular-customer-arrear-details.component.html',
  styleUrls: ['./regular-customer-arrear-details.component.scss']
})
export class RegularCustomerArrearDetailsComponent implements OnInit {

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;

  form:FormGroup;
  allCenter:any[];
  locationData: any[];
  patchLocation: any[];
  selectedLocation: any[];
  connStatus_Value: any[];
  tariff:any=tariffList.ReportTariffData();
  orderTypeList:any=orderTypeDropDownData.MISOrderTypeData();
  billGroupList: any[];
  locationBookList: any[];
  submitted: boolean = false;
  allBill = {code: '0', name: 'All'};
  allBook = {code: '0', name: 'All'};

  constructor(
    private _fb: FormBuilder,
    private _getCenterService: NewUserByCenterLocationService,
    private _customerArrearService:CustomerArrearService,
  ) { }

  ngOnInit(): void {
    this.getAllCenterDD();
    this.getConnectionStatusValue();
    this.createForm();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }

  createForm(){
    this.form = this._fb.group({
      centerName: [[], [Validators.required]],
      location: [[], []],
      billMonth: ['', []],
      conStatus: ['', []],
      tariff:['0',[]],
      arrearFrom: ['',[]],
      arrearTo: ['', []],
      billGroup: ['0'],
      book: ['0'],
      isAll: [true,],
      isPrn: [true,],
      isLps: [true,],
      isVat: [true,],
      orderType:['billcycle'],
    });
  }

  get formVal(){
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
      this.locationData = response.data.data;
    });
  }

  onSelect(data) {
    if(data.length == 0){
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
    });
    this.getBillGroupDD(this.formVal.centerName,this.formVal.location);
    this.getLocationBookDD(this.formVal.centerName,this.formVal.location.length > 0 ? this.formVal.location : null ,this.formVal.billGroupId ? this.formVal.billGroupId : "0")
  }

  
  getBillGroupDD(DbCodes, LocationCodes){
    const params={
      dbCodes:DbCodes,
      locationCodes:LocationCodes
    }
    this._customerArrearService.getBillGroup(params).subscribe((res:any) => {
      this.billGroupList = res.data;
    });
  }

  locationChange(event: any){
    this.getBillGroupDD(this.formVal.centerName,this.formVal.location);
  }

  billGroupChange(event: any){
    this.getLocationBookDD(this.formVal.centerName,this.formVal.location,this.formVal.billGroup)
  }

  getLocationBookDD(dbCodes,locationCodes,billGroupId){
    let params = {
      dbCodes:dbCodes,
      locationCodes:locationCodes,
      billGroupId:billGroupId
    };
    this._customerArrearService.getLocationBook(params).subscribe(res=>{
      this.locationBookList=res.data;
    })
  }
  space(e: any){
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  onReport(){

  }

  private getConnectionStatusValue(){
    this.connStatus_Value = [
      { id: '0', text: 'All' },
      { id: '2', text: 'Regular' },
      { id: '1', text: 'Temporary Disconnected' },
      { id: '3', text: 'Permanent Disconnected' },
    ];
  }

}
