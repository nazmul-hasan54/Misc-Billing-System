import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from '../../../model/customer-details';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillReasonModel } from '../../../model/billReason.model';
import { BillReasonService } from '../../../services/bill-reason.service';
import { Console } from 'console';
import { CustomerService } from '../../../services/customer.service';
import { DCTypeModel } from '../../../model/dcType.model';
import { DatePipe } from '@angular/common';
import { DcRcBillGenService } from '../../../services/dc-rc-bill-gen.service';
import { LocationModel } from '../../../model/location';
import { LocationNameModel } from '../../../model/locationname.model';
import { LocationWiseReligiousReportComponent } from './../../reports/religious/location-wise-religious-report/location-wise-religious-report.component';
import { Locations } from '../../../model/locations.model';
import { MinistryService } from '../../../services/ministry.service';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { MiscChargeBillService } from '../../../services/misc-charge-bill.service';
import { MiscLocationService } from '../../../services/misc-location.service';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-misc-charge-genarate',
  templateUrl: './misc-charge-genarate.component.html',
  styleUrls: ['./misc-charge-genarate.component.scss']
})
export class MiscChargeGenarateComponent implements OnInit {

  rc_dc_bill: FormGroup;
  customerTypeList: any[] = [];
  customerCategoryList: any[] = [];
  billingReasonList: any[] = [""];
  dcTypeList: any[] = [];
  billNumber: string;
  isEditable: boolean = false;
  isProgress: boolean = false;
  isSaving: boolean = false;
  maxDate: Date = new Date();
  customerDetails: CustomerDetails;
  locationLists = localStorage.getItem('locationCodeList');
  locationCode = this.locationLists.split(",");
  roleName = localStorage.getItem('roleName');
  fileList: any[] = [];
  fileTypes: any[] = [];
  fileNames: any[] = [];
  arrayList: any[] = [];
  selectedReason: any[] = [];
  customerNumber:string='';
  minDate: Date = new Date();
  isSaveDisabled: boolean = true;
  locationDdList: LocationNameModel[];
  userName:string=localStorage.getItem('userName');
 locationFormSession: Locations[] = [];
  locationNamelist: LocationNameModel[];
  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _toasterService: NbToastrService,
    private _miscBillingService: MiscBillingService,
    private _dcrcBillGen: DcRcBillGenService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _miscchargeService: MiscChargeBillService,
    private _billReasonService: BillReasonService,
    private _datepipe: DatePipe,
    private _msLocation: MiscLocationService,
    private _ministryService: MinistryService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getMiscBillReason();
   // this.getLocationDd();
  //  this.getLocationChange();
    this.getLocationByUser();
    this.getDcType();
    if (
      this._activateRoute.snapshot.paramMap.get("billNumber") !== null &&
      this._activateRoute.snapshot.paramMap.get("customerNumber") !== null
    ) {
      let billNumber = this._activateRoute.snapshot.paramMap.get("billNumber");
      let customerNumber =
        this._activateRoute.snapshot.paramMap.get("customerNumber");
      this.getbillDetailsByBillNumbr(billNumber, customerNumber);
      this.billNumber = billNumber;
      this.isEditable = true;
      this.isSaveDisabled=false;
    }
  }
  getbillDetailsByBillNumbr(billNumber, customerNumber) {
    this._miscBillingService.getByBillNumber(billNumber, customerNumber).subscribe((res: any) => {
      if (res == null) {
        this._toasterService.danger("Data Not Found");
        this.createForm();
      }
      else {

        this.customerDetails = res as CustomerDetailsDTO;

        let dueDate = new Date(this.customerDetails.dueDate);
        this.dueDateChange(dueDate);
        let lastReadingDate = new Date(this.customerDetails.lastReadingDate);
        this.readingDateChange(lastReadingDate);
        let dcDate = new Date(this.customerDetails.dcDate)
         this.rc_dc_bill.patchValue(this.customerDetails);
         this.dateChange(dcDate);
       let transFormerKb = this.f.xformer_kva.value;
       let transFormerDay = this.f.xformer_day_rent.value
        this.rc_dc_bill.patchValue({
          lDate: lastReadingDate,
          dDate: dueDate,
          discDate: dcDate,
           xformer_kva:transFormerKb,
           xformer_day_rent: transFormerDay

        })
        let t = res.fileList as any[];
        t.forEach(e => {
          this.fileList.push(e.fileList);
          this.fileTypes.push(e.fileNames);
          this.fileNames.push(e.fileTypes);
          const param = {
            fileList: this.fileList,
            fileTypes: this.fileNames,
            fileNames: this.fileTypes
          };
          this.arrayList.push(param);
        })
        this.rc_dc_bill.patchValue({
          billNumber: billNumber
        })
      }
    }, er => {
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }

 
  getLocationByUser() {
    this.getLocationsBySession(this.locationCode)
    if (this.roleName != 'Admin' && this.locationCode.length == 1) {
      this.f.locationCode.setValue(this.locationCode[0])
    }
    else {
      this._miscBillingService.getAllLocation().subscribe((res) => {
        this.locationNamelist = res.data.data as LocationNameModel[];
      })
    }
  }
  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }



  getcustomerDetails(event) {
    if (event.key == "Enter" || event.key == "Tab") {
      if (this.f.customerNumber.value.length == 8) {
        this._miscBillingService
          .getCustomerByCustNumber(this.f.customerNumber.value, this.f.locationCode.value)
          .subscribe(
            (res: any) => {
              if (res == null) {
                this._toasterService.danger("Data Not Found");
                this.createForm();
              } else {
                this.customerDetails = res as CustomerDetails;
                this.rc_dc_bill.patchValue(this.customerDetails);
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

  calculateBill() {
    this.isProgress = true;
    this.isSaveDisabled=false;
    const param = {
      customerNumber: this.f.customerNumber.value,
      multypliBy: this.f.multypliBy.value,
      penaltyUnit: this.f.penaltyUnit.value,
      tariffDesc: this.f.tariffDesc.value,
      locationCode: this.f.locationCode.value,
      p_USER: this.f.userName.value,
      peakUnit: this.f.peakUnit.value,
      offPeakUnit: this.f.offPeakUnit.value,
      principleAmount: this.f.principleAmount.value,
      billReasonCode: this.f.billReasonCode.value,
      meterTypeCode: this.f.meterTypeCode.value,
      xformer_kva: this.f.xformer_kva.value,
      xformer_day_rent: this.f.xformer_day_rent.value

    };
    this._miscBillingService.getMiscChargeBillAmount(param).subscribe(
      (res: any) => {
        this.rc_dc_bill.patchValue({
          dcAmount: res.prN_AMOUNT,
          srAmount: res.sR_Amount,
          vatAmount: res.vaT_AMOUNT,
          peakAmount: res.peak_Amount,
          offPeakAmount: res.offPeak_Amount,
          totalAmount: res.prN_AMOUNT + res.vaT_AMOUNT,
        });
        this.isProgress = false;
      },
      (er) => {
        this._toasterService.danger("Something went wrong !! Please try again");
        this.isProgress = false;
      }
    );
  }




  totalAmountCalculate() { }

  changeAmount(event: any) {
    this.isSaveDisabled=true;
    this.rc_dc_bill.patchValue({
      dcAmount: null,
      vatAmount: null,
      totalAmount: null
    })
  }
  miscBillSave() {
    if(this.isEditable==false){
      if (this.rc_dc_bill.invalid) {
        this._toasterService.danger("Please fill all the requered field.");
        return;
      }
    }
    this.isSaving = true;
    this.rc_dc_bill.patchValue({
      fileList: this.arrayList,
    });
    this.formVal.billReasonCode =
      this._miscchargeService.miscChargeBillSave(this.formVal).subscribe(
        (res: any) => { 
          let saveData = res as any;
          if (saveData.status == 1) {

            this.customerNumber = this.f.customerNumber.value;
            this.billNumber = saveData.bilL_NUM;
            this._toasterService.success("Bill Generate Successfully Saved!", "Success");
            this.viewPrint();
            this.reset();
          } else {
            this._toasterService.danger("Failed To Saved ", "Error");
          }
          this.isSaving = false;
        },
        (er) => {
          this._toasterService.danger(er.message);
          this.isSaving = false;
        }
      );
  }

  reset() {
    this.createForm();
    this.arrayList = [];
  }

  viewPrint() {
    this._router.navigate(['bill-report/misc-charge-print', this.billNumber, this.customerNumber])
  }

  getMiscBillReason() {
    this._billReasonService.getMiscchargeBillReason().subscribe(
      (res) => {
        if ((res.data as any[]).length > 0) {
          this.billingReasonList = res.data as BillReasonModel[];
        } else {
          this._toasterService.danger("Data Not Found");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      });
  }

  getDcType() {
    this._miscchargeService.getMiscDcType().subscribe(
      (res) => {
        this.dcTypeList=res.data as DCTypeModel[];
       }
    );
  }

  readingDateChange(event: Date) {
    let lrDate = dateFormatForDDMMYY(event);
    this.rc_dc_bill.patchValue({
      lastReadingDate: lrDate
    })
  }


  dateChange(event: Date) { 
    let dcDate = dateFormatForDDMMYY(event);
    this.rc_dc_bill.patchValue({
      dcDate: dcDate
    })
    this.minDate = event;
    if (this.f.billNumber.value==null) {
      this.minDate.setDate(this.minDate.getDate() + 1);
    }
    else {
      this.minDate.setDate(this.minDate.getDate());
    }
  }

  dueDateChange(event: Date) {
    let dueDate = dateFormatForDDMMYY(event);
    this.rc_dc_bill.patchValue({
      dueDate: dueDate
    })
  }

  createForm() {
    this.rc_dc_bill = this._fb.group({
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
      nidNumber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(16)]],
      mobileNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
      lastReading: [, []],
      multypliBy: ["", []],
      billReasonCode: [, [Validators.required]],
      vatAmount: [, []],
      totalAmount: [, [Validators.required]],
      dcAmount: [, []],
      dcType: [, []],
      dueDate: [, []],
      lastReadingDate: [, []],
      dcDate: [, []],
      meterTypeCode: ["01", []],
      lastReadingOffPeak: [, []],
      lastReadingPeak: [, []],
      meterConditionDesc: [, []],
      fileList: [this.arrayList, []],
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
      dcTypeCode: [, [Validators.required]],
      discDate: [, [Validators.required]],
      dDate: [, [Validators.required]],
      lDate: [, []],
      xformer_kva: [,[]],
      xformer_day_rent: [,[]],
      userName:[this.userName,[]]
    });
  }
  get formVal() {
    return this.rc_dc_bill.value;
  }

  get f() {
    return this.rc_dc_bill.controls;
  }

  /* File Save Start */

  onFileSelected(event) {
    this.fileList = [];
    this.fileTypes = [];
    this.fileNames = [];

    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (reader: any) => {
          const result = reader.target.result;
          const base64 = reader.target.result.split(",");
          this.fileNames.push(event.target.files[i].name);
          this.fileTypes.push(base64[0]);
          this.fileList.push(base64[1]);
          const param = {
            fileList: this.fileList,
            fileTypes: this.fileTypes,
            fileNames: this.fileNames,
          };
          this.arrayList.push(param);
          this.fileList = [];
          this.fileTypes = [];
          this.fileNames = [];
        };
      }
    }
  }

  fileDownload(id) {
    let fullFIle =
      this.arrayList[id].fileTypes[0] + "," + this.arrayList[id].fileList[0];
    let a = document.createElement("a");
    a.download = `${this.arrayList[id].fileNames[0]}`;
    a.href = fullFIle;
    a.click();
  }
  fileDelete(id) {
    this.arrayList.splice(id, 1);
  }
  /* File Save End */
}
