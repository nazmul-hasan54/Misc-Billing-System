import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { CustomerBillDetailsModel } from '../../../model/customer-bill-details.model';
import { DataTableDirective } from 'angular-datatables';
import { ImposedByModel } from '../../../model/imposedby.model';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { Subject } from 'rxjs';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { PaymnetService } from '../../../services/paymnet/paymnet.service';

@Component({
  selector: 'ngx-customer-bill-details',
  templateUrl: './customer-bill-details.component.html',
  styleUrls: ['./customer-bill-details.component.scss']
})
export class CustomerBillDetailsComponent implements OnInit {

 
  billDetailsForm:FormGroup;
  billNumberList: any[] = [];
  customerDetails: CustomerBillDetailsModel[];
  imposedByList: ImposedByModel[] = [];
  isEditable: boolean = false;
  billNumber: string;
  hostName: string;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  
  bsConfig?: Partial<BsDatepickerConfig>;
    isShow:boolean=false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _penaltyBillGen: PenaltyBillGenService,
    private _paymnetGatewayService: PaymnetService,
  ) { }

  ngOnInit(): void {
    this.createForm();  
    this.dtOptions = {
        pagingType: 'full_numbers',
        searching: false
        };

    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }
  paymnetGateway(bill: PenaltyBillViewModel) {
    let totalAmount=bill.totalAmount
    let customerNumber=bill.customerNumber
    let billNumber=bill.billNumber
     this.hostName ='/startup/customer-bill';
    localStorage.setItem("redirectUrl",this.hostName);
  this._paymnetGatewayService.paymnetGateway(totalAmount,customerNumber,billNumber).subscribe((res:any)=>{
    window.open(res.url);
  })
  }

  getbillDetailsByBillNumbr() {
    this._penaltyBillGen.getBillPaymentDetails(this.f.consumerNumber.value, this.formval.locationCode).subscribe((res: any) => {
      this.customerDetails = res as CustomerBillDetailsModel [];
        if(this.customerDetails.length<1){
          this._toasterService.danger("Data Not Found ","Not Found");
          this.isShow=false;
        }
        else{
          this.isShow=true;
          this.billDetailsForm.patchValue(this.customerDetails[0]);
          this.dtTrigger.next();

        }
      
      
    }, er => {
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  createForm(){
    this.billDetailsForm=this._fb.group({
      customerName:[,[]],
      consumerNumber:[,[]],
      locationCode:[,[]],
      areaCode:[,[]],
      billMonth:[,[]],
      nidNumber:[,[]],
      tariff:[,[]]
    })
  }
  get f(){
    return this.billDetailsForm.controls
  }
  get formval(){
    return this.billDetailsForm.value
  }

  

}
