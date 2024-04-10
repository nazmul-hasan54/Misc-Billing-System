import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from './../../../model/customer-details';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillReasonModel } from './../../../model/billReason.model';
import { BillReasonService } from '../../../services/bill-reason.service';
import { ImposedByModel } from '../../../model/imposedby.model';
import { LocationNameModel } from '../../../model/locationname.model';
import { Locations } from '../../../model/locations.model';
import { MinistryService } from '../../../services/ministry.service';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { SupplementaryBillGenService } from '../../../services/supplementary-bill-gen.service';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-supplementary-existing-consumer-insert',
  templateUrl: './supplementary-existing-consumer-insert.component.html',
  styleUrls: ['./supplementary-existing-consumer-insert.component.scss']
})
export class SupplementaryExistingConsumerInsertComponent implements OnInit {
 supplementarybill: FormGroup;
  //billGenerate: FormGroup;
  isEditable: boolean = false;
  roleName = localStorage.getItem("roleName");
  locationFormSession: Locations[] = [];
  locationNamelist: LocationNameModel[] = [];
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  minDate: Date = new Date();
  maxDate: Date = new Date();
  isSaveDisabled: boolean = true;
  billingReasonList: BillReasonModel[] = [];
  isProgress: boolean = false;
  imposedByList: ImposedByModel[] = [];
  billNumber: string;
  customerDetails: CustomerDetails;
  isAdmin: boolean = false;
  userName: string = localStorage.getItem("userName");
  isMore: boolean = false;
  singleLocation: Locations;
  dbCode: string;
  locCode: any;
  dbCodeList = localStorage.getItem('dbCodeList');
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _miscBillingService: MiscBillingService,
    private _billReasonService: BillReasonService,
    private _toasterService: NbToastrService,
    private _activateRoute: ActivatedRoute,
    private _supplementaryBillGen: SupplementaryBillGenService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.penaltyConsumerLocationDes();
    this.getMiscBillReason();
    this.getImposedBy();
    this.getLocationsBySession(this.locationCodes);
  }


  penaltyConsumerLocationDes() {
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

  getMiscBillReason() {
    this._billReasonService.getPenaltyBillReason().subscribe((res) => {
      this.billingReasonList = res as BillReasonModel[];
    },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }


  getImposedBy() {
    this._miscBillingService.getImposedBy().subscribe((res) => {
      if ((res.data as any[]).length > 0) {
        this.imposedByList = res.data as ImposedByModel[];
      }
      else {
        this._toasterService.danger("Data Not Found");
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }

  dateChange(event: Date) {
    let lastReadingDate = dateFormatForDDMMYY(event);
    this.supplementarybill.patchValue({
      lastReadingDate: lastReadingDate
    })

    this.minDate = event;
    if (this.f.billNumber.value == null) {
      this.minDate.setDate(this.minDate.getDate() + 1);
    }
    else {
      this.minDate.setDate(this.minDate.getDate());
    }
  }

  dueDateChange(event: Date) {
    let dueDate = dateFormatForDDMMYY(event);
    this.supplementarybill.patchValue({
      dueDate: dueDate
    })
  }

  getLocationsBySession(locationCodeList: string[]) {
    if (this.locationCodes.length > 1) {
      this.isMore = true;
      this._ministryService.getLocationsBySession(locationCodeList).subscribe((res: any) => {
        this.locationFormSession = res as Locations[];
        console.log("this.locationFormSession", this.locationFormSession);
      });
    }
    else {
      this.supplementarybill.patchValue({
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
        this._miscBillingService.getUntracedCustomerByCustNumber(this.f.customerNumber.value, this.dbCode, this.locCode).subscribe((res: any) => {
          if (res == null) {
            this._toasterService.danger("Data Not Found");
            this.createForm();
          } else {
            this.customerDetails = res as CustomerDetails;
            this.supplementarybill.patchValue(this.customerDetails);
          }
        },
          (er) => {
            this._toasterService.danger("Something Is Wrong Please Try Again !!");
          }
        );
      } else {
        this._toasterService.danger("Make Sure You Enter Right Info !!");
      }
    }
  }

  supplementaryBillSaved() {
    if (this.supplementarybill.valid) {
      this._supplementaryBillGen.saveSupplementaryExistingConsumer(this.formVal).subscribe((res: any) => {
        if (res == true) {
          this._toasterService.success("Bill Generate Successfully", "Success");
          this.createForm();
        }
        else {
          this._toasterService.danger("Failed To Saved ", "Error");
        }
      })
    }
    else {
      this._toasterService.danger("Please fill all the requered field.");
     }
  }

  reset() {
    this.createForm();
  }

  getTotoalAmount(event) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      let vat = (this.f.principleAmount.value * 5) / 100;
      let total = this.f.principleAmount.value + vat;
      this.supplementarybill.patchValue({
        vatAmount: vat,
        totalAmount: total
      })
    }
    else {
      this.supplementarybill.patchValue({
        vatAmount: '',
        totalAmount: ''
      })
    }
  }

  createForm() {
    this.supplementarybill = this._fb.group({
      billNumber: [, []],
      locationCode: [, []],
      customerNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]],
      customerName: [, []],
      customerAddr: [, []],
      tariffDesc: [, []],//
      businessType: [, []],//
      prvAcNo: [, []],//
      areaCode: [, []],//
      nidNumber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(16)]],
      mobileNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$"), Validators.maxLength(11)]],
      meterTypeDesc: [, []],
      meterNum: [, []],
      meterConditionDesc: [, []],
      meterTypeCode: [, []],
      lastReadingOffPeak: [, []],
      lastReadingPeak: [, []],
      lDate: [, []],
      billReasonCode: [, [Validators.required]],
      principleAmount: [, []],
      vatAmount: [, []],
      imposedByCode: [, [Validators.required]],//
      totalAmount: [, [Validators.required]],
      dDate: [, [Validators.required]],
      createBy: [this.userName, []],
      custId: [, []],
      lastReadingDate: [, []],
      dueDate: [, []],
    //  formType: [2, []],
    })
  }
  get formVal() {
    return this.supplementarybill.value;
  }

  get f() {
    return this.supplementarybill.controls;
  }

}
