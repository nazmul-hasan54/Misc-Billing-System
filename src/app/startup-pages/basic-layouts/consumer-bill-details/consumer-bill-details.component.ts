import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { DataTableDirective } from "angular-datatables";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { Subject } from "rxjs";
import { CustomerBillDetailsModel } from "../../../model/customer-bill-details.model";
import { ImposedByModel } from "../../../model/imposedby.model";
import { PenaltyBillViewModel } from "../../../model/penaltyBillView.model";
import { PaymnetService } from "../../../services/paymnet/paymnet.service";
import { PenaltyBillGenService } from "../../../services/penalty-bill-gen.service";

@Component({
  selector: "ngx-consumer-bill-details",
  templateUrl: "./consumer-bill-details.component.html",
  styleUrls: ["./consumer-bill-details.component.scss"],
})
export class ConsumerBillDetailsComponent implements OnInit {
  consumerBillForm: FormGroup;
  billNumberList: any[] = [];
  customerDetails: CustomerBillDetailsModel[];
  imposedByList: ImposedByModel[] = [];
  isEditable: boolean = false;
  billNumber: string;
  hostName: string;
  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";

  bsConfig?: Partial<BsDatepickerConfig>;
  isShow: boolean = false;

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _penaltyBillGen: PenaltyBillGenService,
    private _paymnetGatewayService: PaymnetService
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
    };

    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
  }

  paymnetGateway(bill: PenaltyBillViewModel) {
    debugger;
    let totalAmount = bill.totalAmount;
    let customerNumber = bill.customerNumber;
    let billNumber = bill.billNumber;
    this.hostName = "/startup/consumer-bills";
    localStorage.setItem("redirectUrl", this.hostName);
    this._paymnetGatewayService
      .consumerPaymnetGateway(totalAmount, customerNumber, billNumber)
      .subscribe((res: any) => {
        window.open(res.url);
      });
  }

  getbillDetailsByBillNumbr() {
    let user = "admin";
    this._penaltyBillGen
      .getbillDetailsByBillNumbr(
        this.f.consumerNumber.value,
        this.formval.billNumber,
        user
      )
      .subscribe(
        (res: any) => {
          this.customerDetails = res as CustomerBillDetailsModel[];
          if (this.customerDetails.length < 1) {
            this._toasterService.danger("Data Not Found ", "Not Found");
            this.isShow = false;
          } else {
            this.isShow = true;
            this.consumerBillForm.patchValue(this.customerDetails[0]);
            this.dtTrigger.next();
          }
        },
        (er) => {
          this._toasterService.danger("Something Is Wrong Please Try Again !!");
        }
      );
  }

  createForm() {
    this.consumerBillForm = this._fb.group({
      customerName: [, []],
      consumerNumber: [, []],
      billNumber: [, []],
      locationCode: [, []],
      customerAddress: [, []],
      billMonth: [, []],
      phone: [, []],
      tariff: [, []],
    });
  }
  get f() {
    return this.consumerBillForm.controls;
  }
  get formval() {
    return this.consumerBillForm.value;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
