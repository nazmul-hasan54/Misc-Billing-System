import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { CustomerCensusListModel } from './../../../model/temporary/customerCensusList.model';
import { FormBuilder } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { TemporaryBillService } from '../../../services/temporary-bill.service';

@Component({
  selector: 'ngx-temporary-customer-censuslist',
  templateUrl: './temporary-customer-censuslist.component.html',
  styleUrls: ['./temporary-customer-censuslist.component.scss']
})
export class TemporaryCustomerCensuslistComponent implements OnInit {
  customerCensuslist:CustomerCensusListModel[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  locationCode = localStorage.getItem('locationCodeList');
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _temporaryService: TemporaryBillService,

  ) { }

  ngOnInit(): void {
    this.getAllCensusCustomer();
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };
  }

  getAllCensusCustomer(){
    this._temporaryService.getCustomerCensusList(this.locationCode).subscribe(res=>{
      this.customerCensuslist=res as CustomerCensusListModel[];
      this.dtTrigger.next();
    })
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
