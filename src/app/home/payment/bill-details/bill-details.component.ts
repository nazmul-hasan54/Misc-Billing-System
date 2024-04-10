import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from '../../../model/customer-details';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerService } from '../../../services/customer.service';
import { DataTableDirective } from "angular-datatables";
import { ImposedByModel } from '../../../model/imposedby.model';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-bill-details',
  templateUrl: './bill-details.component.html',
  styleUrls: ['./bill-details.component.scss']
})
export class BillDetailsComponent implements OnInit {

  billDetailsForm:FormGroup;
  billNumberList: any[] = [];
  customerDetails: CustomerDetails[];
  imposedByList: ImposedByModel[] = [];
  isEditable: boolean = false;
  billNumber: string;
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isShow:boolean=false;
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _penaltyBillGen: PenaltyBillGenService,
  ) { }

  ngOnInit(): void {
    this.createForm();  
    this.dtOptions = {
        pagingType: 'full_numbers',
        searching: false
        };
  }

  getbillDetailsByBillNumbr() {
    this._penaltyBillGen.getBillPaymentDetails(this.f.consumerNumber.value,this.locationCodes[0]).subscribe((res: any) => {
        this.customerDetails = res as CustomerDetails [];
      this.billDetailsForm.patchValue(this.customerDetails[0]);
      
      this.dtTrigger.next();
    }, er => {
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }

  createForm(){
    this.billDetailsForm=this._fb.group({
      customerName:[,[]],
      consumerNumber:[,[]],
      locationName:[,[]],
      locationCode:[,[]],
      areaCode:[[]],
    })
  }
  get f(){
    return this.billDetailsForm.controls
  }
  get formval(){
    return this.billDetailsForm.value
  }

}
