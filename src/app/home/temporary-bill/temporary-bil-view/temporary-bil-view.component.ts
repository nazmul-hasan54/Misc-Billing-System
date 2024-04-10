import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { NbToastrService } from '@nebular/theme';
import { PaymentDetailsModel } from '../../../model/paymentdetails.model';
import { PaymnetService } from '../../../services/paymnet/paymnet.service';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { PenaltyBillPrintModel } from '../../../model/penaltyBillPrint.model';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { PrintBillService } from '../../../services/print-bill.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TemporaryBillService } from './../../../services/temporary-bill.service';
import { paymentDetailsService } from '../../../services/paymnet/paymentdetails.service';
import { MiscLocationService } from '../../../services/misc-location.service';
import { LocationNameModel } from '../../../model/locationname.model';

@Component({
  selector: 'ngx-temporary-bil-view',
  templateUrl: './temporary-bil-view.component.html',
  styleUrls: ['./temporary-bil-view.component.scss']
})
export class TemporaryBilViewComponent implements OnInit {
  searchPenaltyBillForm: FormGroup;
  penaltybillList: PenaltyBillViewModel[] = [];
  billPrintList: PenaltyBillPrintModel[] = [];
  locationListDd: LocationNameModel[];
  isProgress: boolean = false;
  paymentDetailsList: PaymentDetailsModel[] = [];
  locationList = localStorage.getItem('locationCodeList');
  locationCode = this.locationList.split(",");
  closeResult = '';
  mrsCalculationList: any[] = [];
  roleName = localStorage.getItem('roleName');

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: string;
  constructor(
    private _fb: FormBuilder,
    private _penaltyService: PenaltyBillGenService,
    private _printBillService: PrintBillService,
    private _toasterService: NbToastrService,
    private _paymnetGatewayService: PaymnetService,
    private _router: Router,
    private _paymentDetailsservice: paymentDetailsService,
    private _temporarybillservice:TemporaryBillService,
    private _msLocation: MiscLocationService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };

    this.createForm();
    this.getTemporaryBill();
    if(this.roleName == 'Admin'){
      this.getAllLocation();
    } else {
      this.searchPenaltyBillForm.patchValue({
        locationCode: this.locationCode[0],
      });
      this.getTemporaryBill();
    }
  }

  getAllLocation(){
    this._msLocation.getLocationDD().subscribe((res:any) => {
      this.locationListDd = res.data as LocationNameModel[];
    });
  }

  getByIdInstall(bill: PenaltyBillViewModel) {
    this._router.navigate(['/bill/penaltybill-installment', bill.billNumber])
  }

  installmentDetails(bill: PenaltyBillViewModel) {
    this._router.navigate(['/bill/penaltyinstallment-view', bill.billNumber])
  }

  editByBillNo(bill: PenaltyBillViewModel) {
    this._router.navigate(['/bill/penalty-bill', bill.billNumber, bill.customerNumber])
  }
  getTemporaryBill() {
    this._temporarybillservice.getTemporaryBill(this.formVal).subscribe((res: any) => {
      if (res.status) {
        this.penaltybillList = res.result as PenaltyBillViewModel[];
        this.dtTrigger.next();
      }
      else {
        this._toasterService.danger(res.result, "Error");
        this.penaltybillList = [];
      }

    },
      er => {
        this._toasterService.danger("Something went wrong !! Please try again", "Error");
        this.penaltybillList = []
      })
  }

  viewPrint(bill: PenaltyBillViewModel) {
    this.isProgress = true;
    if (bill.meterType == ('01' || '03' || '04' || '11')) {

      this._router.navigate(['bill-report/penalty-billsr', bill.billNumber, bill.customerNumber]);
      this.isProgress = false;

    }
    else if (bill.meterType == ('88')) {
      this._router.navigate(['bill-report/penalty-billnoncust', bill.billNumber, bill.customerNumber]);
      this.isProgress = false;
    }
    else {
      this._router.navigate(['bill-report/penalty-billdr', bill.billNumber, bill.customerNumber])
      this.isProgress = false;
    }
  }

  cencusBillPrint(bill:PenaltyBillViewModel) {
    this._router.navigate(['bill-report/cencus-bill-print', this.locationCode[0], bill.customerNumber, bill.billNumber]);
  }

 
  paymnetGateway(bill: PenaltyBillViewModel) {
    let totalAmount = bill.billAmount
    let customerNumber = bill.customerNumber
    let billNumber = bill.billNumber
    this.hostName = '/temporary/temporary-bill-view';
    localStorage.setItem("redirectUrl", this.hostName);
    this._paymnetGatewayService.paymnetGateway(totalAmount, customerNumber, billNumber).subscribe((res: any) => {
      window.open(res.url);
    })
  }

  paymentDetails() {
    this._paymentDetailsservice.penaltyPaymentDetails().subscribe((res) => {
      this.paymentDetailsList = res as PaymentDetailsModel[];
    })
  }

  createForm() {
    this.searchPenaltyBillForm = this._fb.group({
      customerNumber: ['', []],
      nidNumber: ['', []],
      billNumber: ['', []],
      dueDate: [, []],
      locationCode:[this.locationCode[0],[]]
    })
  }

  get formVal() {
    return this.searchPenaltyBillForm.value;
  }

  get f() {
    return this.searchPenaltyBillForm.controls;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
