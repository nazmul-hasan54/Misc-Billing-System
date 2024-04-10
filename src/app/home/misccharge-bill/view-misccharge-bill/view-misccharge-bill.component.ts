import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { ExtendDateBoxComponent } from '../../../shared/components/extend-date-box/extend-date-box.component';
import { LocationNameModel } from '../../../model/locationname.model';
import { Locations } from '../../../model/locations.model';
import { MatDialog } from '@angular/material/dialog';
import { MinistryService } from '../../../services/ministry.service';
import { MiscChargeBillService } from '../../../services/misc-charge-bill.service';
import { MiscLocationService } from '../../../services/misc-location.service';
import { NbToastrService } from '@nebular/theme';
import { PaymnetService } from '../../../services/paymnet/paymnet.service';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { Subject } from 'rxjs';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';
import { miscChargeViewModel } from '../../../model/miscChargeView';

@Component({
  selector: 'ngx-view-misccharge-bill',
  templateUrl: './view-misccharge-bill.component.html',
  styleUrls: ['./view-misccharge-bill.component.scss']
})
export class ViewMischargeBillComponent implements OnInit {

  searchDcRcBillForm: FormGroup;
  miscbillList: miscChargeViewModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: any;
  isView: boolean = true;
  isrcView: boolean = false;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  locationFormSession: Locations[] = [];
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  roleName = localStorage.getItem('roleName');
  locationList: LocationNameModel[];
  constructor(
    private _fb: FormBuilder,
    private _miscChargeService: MiscChargeBillService,
    private _toasterService: NbToastrService,
    private _paymnetGatewayService: PaymnetService,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private dialog: MatDialog,
    private _msLocation: MiscLocationService,
    private _ministryService: MinistryService,
  ) { }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };
    this.createForm();
    this.getMiscBill();
    if(this.roleName == 'Admin'){
      this.getAllLocation();
    } else {
      this.getLocationsBySession(this.locationCodes)
      if (this.roleName != 'Admin' && this.locationCodes.length == 1) {
      this.searchDcRcBillForm.patchValue({
        locationCode: this.locationCodes[0],
      });
      this.getMiscBill();
    }
    }
  }

  getAllLocation(){
    this._msLocation.getLocationDD().subscribe((res: any) => {
      this.locationList = res.data as LocationNameModel[];
      console.log("fhafhjsfdhfjds",this.locationList);
      
    });
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }

  reconnect(bill: miscChargeViewModel) {
    this.isView = false;
    this.isrcView = true;
    this.searchDcRcBillForm.patchValue({
      customerNumber: bill.customerNumber,
      billNumber: bill.billNumber
    })
  }

  editByBillNo(bill: PenaltyBillViewModel) {
    this._router.navigate([
      "/misc-charge/misc-genarate",
      bill.billNumber,
      bill.customerNumber,
    ]);
  }

  getMiscBill() {
    this._miscChargeService.getMiscBill(this.formVal).subscribe(
      (res: any) => {
        if (res.status) {
          this.miscbillList = res.result as miscChargeViewModel[];
          this.dtTrigger.next();
        } else {
          this._toasterService.danger(res.result, "Error");
          this.miscbillList = [];
        }
      },
      () => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
        this.miscbillList = [];
      }
    );
  }

  dateExtend(event: any) {
    const ref = this.dialog.open(ExtendDateBoxComponent, {
      position: { top: "50px" },
      width: "40%",
      height: "50%",
      data: { title: "Extend Date", extendFor: 1, billNumber: event.billNumber, customerNumber: event.customerNumber, dueDate: event.dueDate, },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    })
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.reRender();
      }
    });
  }


  paymnetGateway(bill: PenaltyBillViewModel) {
    let totalAmount = bill.billAmount
    let customerNumber = bill.customerNumber
    let billNumber = bill.billNumber
    this.hostName = '/misc-charge/misc-charge-view';
    localStorage.setItem("redirectUrl", this.hostName);
    this._paymnetGatewayService.paymnetGateway(totalAmount, customerNumber, billNumber).subscribe((res: any) => {
      window.open(res.url);
    })
  }
  viewPrint(bill: PenaltyBillViewModel) {
    this._router.navigate(['bill-report/misc-charge-print', bill.billNumber, bill.customerNumber])
  }
  dueDateChange(event: Date) {
    let rcDate = dateFormatForDDMMYY(event);
    this.searchDcRcBillForm.patchValue({
      rcDate: rcDate
      
    })
  }

  save() {
    const param = {
      billNumber: this.f.billNumber.value,
      customerNumber: this.f.customerNumber.value,
      rcDate: this.f.rcDate.value,
    }
    this._miscChargeService.updateMiscDate(param).subscribe(res => {
      if (res) {
        this._toasterService.success("Reconnect Successfully", "Success");
        this.createForm();
        this.isView = true;
        this.isrcView = false;
        this.getMiscBill();
      }
    })
  }
  createForm() {
    this.searchDcRcBillForm = this._fb.group({
      customerNumber: ["", []],
      nidNumber: ["", []],
      billNumber: ["", []],
      dueDate: [, []],
      rDate: [, []],
      rcDate: [, []],
      locationCode: [this.locationCodes[0], []]
    });
  }

  get formVal() {
    return this.searchDcRcBillForm.value;
  }

  get f() {
    return this.searchDcRcBillForm.controls;
  }

  //#region Reload Page
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getMiscBill();
    });
  }
  //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
