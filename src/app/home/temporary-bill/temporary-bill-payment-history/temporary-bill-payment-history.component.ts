import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BillCycleModel } from '../../../model/temporary/billCycle.model';
import { BlockNumModel } from './../../../model/temporary/blockNum.model';
import { LocationModel } from '../../../model/temporary/location.model';
import { NbToastrService } from '@nebular/theme';
import { TemporaryBillService } from '../../../services/temporary-bill.service';
import { BillCycleService } from '../../../services/bill-cycle.service';
import { MiscLocationService } from '../../../services/misc-location.service';

@Component({
  selector: 'ngx-temporary-bill-payment-history',
  templateUrl: './temporary-bill-payment-history.component.html',
  styleUrls: ['./temporary-bill-payment-history.component.scss']
})
export class TemporaryBillPaymentHistoryComponent implements OnInit {
temporarypaymenthistory:FormGroup
locationList:any[]=[];
blockNumList:any[]=[];
billMonthList: any[] = [];
  locationsList = localStorage.getItem('locationCodeList');
  locationCode = this.locationsList.split(",");
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private temporaryService: TemporaryBillService,
    private _temporaryService: TemporaryBillService,
    private _billcycleService:BillCycleService,
    private _miscLocation:MiscLocationService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.getLocationByUser();
    this.getLocationByUser();
    this.getBillCylceCode();
  }

  getLocationByUser() {
    this._miscLocation.getLocationByUser(this.locationCode[0]).subscribe(res => {
      this.locationList = res as LocationModel[];
    })
  }

  getAllBlockNum(event: any) {
    this._miscLocation.getAllBlockNum(event).subscribe(res => {
      this.blockNumList = res as BlockNumModel[];
    })
  }

  getBillCylceCode() {
    this._billcycleService.getAllBillCycle().subscribe(res => {
      this.billMonthList = res as BillCycleModel[];
    })
  }

  CreateForm(){
    this.temporarypaymenthistory=this._fb.group({
        locationCode:[,[]],
        blockNum:[,[]],
      billMonth:[,[]],
      consumerNumber:[,[]]
    })
  }

  get f() {
    return this.temporarypaymenthistory.controls;
  }
  get formVal() {
    return this.temporarypaymenthistory.value;
  }

}
