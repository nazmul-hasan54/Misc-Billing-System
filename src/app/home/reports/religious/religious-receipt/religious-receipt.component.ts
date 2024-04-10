import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { LocationNameModel } from '../../../../model/locationname.model';
import { Locations } from '../../../../model/locations.model';
import { MinistryService } from '../../../../services/ministry.service';
import { MiscBillingService } from '../../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { ReligiousService } from '../../../../services/religious.service';
import { Subject } from 'rxjs';
import { __values } from 'tslib';
import { dateFormatForDDMMYY } from '../../../../@core/utils/utiliy';
import { dateFormatForDDMMYYYY } from './../../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-religious-receipt',
  templateUrl: './religious-receipt.component.html',
  styleUrls: ['./religious-receipt.component.scss']
})
export class ReligiousReceiptComponent implements OnInit {
  religisreceiptForm: FormGroup;
  religiousReceiptFormArray:FormArray;
  locationFormSession: Locations[] = [];
  roleName = localStorage.getItem("roleName");
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  locationNamelist: LocationNameModel[] = []
  postpaidCustList:any;
  religiousReceiptlist: any;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  disableDate: Date = new Date();
  startDate: any;
  table:any;
  userName: string = localStorage.getItem("userName");
  
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _ministryService: MinistryService,
    private _miscBillingService: MiscBillingService,
    private _religiousService: ReligiousService,
  ) { }

 

  ngOnInit(): void {
     this.createForm();
    this.religiousConsumerLocationDes();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,

    };
    
  }
  religiousConsumerLocationDes() {
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName != 'Admin' && this.locationCodes.length == 1) {
      this.f.locationCode.setValue(this.locationCodes[0])
    }

    else {

      this.getAllLocations();
    }
  }

  getAllLocations() {
    this._miscBillingService.getAllLocation().subscribe((res) => {
      this.locationNamelist = res.data.data;

    })
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }

  GetAllReceipt(){
    this._religiousService.getReligiousReceiptList(this.f.locationCode.value).subscribe((res:any)=>{
      this.religiousReceiptlist = res ;
      // this.religiousReceiptFormArray = this._fb.array([]);
      this.religiousReceiptFormArray = this._fb.array([]);
      this.religiousReceiptlist.forEach((item) => {
        this.religiousReceiptFormArray.push(
          new FormGroup({
            customerNo: new FormControl(item.customerNo, [Validators.required]),
            customerName: new FormControl(item.customerName, [Validators.required]),
            locationCode: new FormControl(item.locationCode, [Validators.required]),      
            newCustomerNumber: new FormControl(),
            receiptAmt: new FormControl(),    
            billMonth: new FormControl('', []),
            currentDate: new FormControl(),
            createBy: new FormControl(this.f.createBy.value,[])
          })
        );
      });


      
    })
  }
  

  modelChangeFn(event: any, i: number) {
    this.disableDate = this.religiousReceiptFormArray.controls[i].value.billMonth;
    this.startDate = event;
    let t = this.religiousReceiptFormArray.controls[i].get('billMonth').value
    let timeConvert = dateFormatForDDMMYYYY(event);
    this.religiousReceiptFormArray.controls[i].patchValue({
      currentDate: timeConvert
    });

  }
  
  
  Save(){
    let newCustomerList=this.detailsFormAllVal.filter(p=>p.newCustomerNumber !=null && p.receiptAmt>0);
    let customerList=this.detailsFormAllVal.filter(p=>p.newCustomerNumber ==null  && p.receiptAmt>0);
    const param={
      newCustomerList:newCustomerList,
      customerList:customerList
    }
  
    this._religiousService.saveReligiousReceipt(param).subscribe((res:any)=>{
     
        
         if (res.status) {
           this._toasterService.success(res.result, "Success");
           this.religiousReceiptFormArray.clear();
           this.religisreceiptForm.reset();
         }
         else {
           this._toasterService.danger(res.result, "Failed");

         }
       }, er => {
         this._toasterService.danger(er.message, "Error")
       })
    
  }
  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  createForm(){
    this.religisreceiptForm=this._fb.group({
      customerNo:[,[]],
      customerName:[,[]],
      locationCode: [, [Validators.required]],
      newCustomerNumber:[,[]],
      receiptAmt:[,[]],
      billMonth:[,[]],
      createBy: [this.userName, []]
    })
    this.religiousReceiptFormArray = this._fb.array([]);
  }
  get formVal() {
    return this.religisreceiptForm.value;
  }

  get f() {
    return this.religisreceiptForm.controls;
  }
  get detailsFormAllVal() {
    return this.religiousReceiptFormArray.value;
  }

}
