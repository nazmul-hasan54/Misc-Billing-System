import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { DataTableDirective } from "angular-datatables";
import { ExtendDateBoxComponent } from "../../../shared/components/extend-date-box/extend-date-box.component";
import { LocationNameModel } from "../../../model/locationname.model";
import { Locations } from "../../../model/locations.model";
import { MatDialog } from "@angular/material/dialog";
import { MinistryService } from "../../../services/ministry.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { NbToastrService } from "@nebular/theme";
import { PaymnetService } from "../../../services/paymnet/paymnet.service";
import { PenaltyBillGenService } from "../../../services/penalty-bill-gen.service";
import { PenaltyBillPrintModel } from "../../../model/penaltyBillPrint.model";
import { PenaltyBillViewModel } from "../../../model/penaltyBillView.model";
import { PrintBillService } from "../../../services/print-bill.service";
import { Router } from "@angular/router";
import { Subject } from "rxjs";
import { SupplementaryBillGenService } from "./../../../services/supplementary-bill-gen.service";

@Component({
  selector: "ngx-view-supplementary-bill",
  templateUrl: "./view-supplementary-bill.component.html",
  styleUrls: ["./view-supplementary-bill.component.scss"],
})
export class ViewSupplementaryBillComponent implements OnInit {
  searchPenaltyBillForm: FormGroup;
  penaltybillList: PenaltyBillViewModel[] = [];
  billPrintList: PenaltyBillPrintModel[] = [];

  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: string;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized:boolean = false

  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  roleName = localStorage.getItem('roleName');
  locationNamelist: LocationNameModel[] = []
  locationFormSession: Locations[] = [];
  constructor(
    private _fb: FormBuilder,
    private _penaltyService: PenaltyBillGenService,
    private _printBillService: PrintBillService,
    private _suplimentaryBillService: SupplementaryBillGenService,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _paymnetGatewayService: PaymnetService,
    private dialog: MatDialog,
    private _miscBillingService: MiscBillingService,
    private _ministryService: MinistryService,
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      retrieve: true,
    };
    this.createForm();
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName != 'Admin' && this.locationCodes.length == 1){
      this.searchPenaltyBillForm.patchValue({
        locationCode: this.locationCodes[0],
      })
      this.getSupplementaryBill();
    }
    else{
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

  getByIdInstall(bill: PenaltyBillViewModel) {
    this._router.navigate([
      "/supplementary/suplimentary-installment",
      bill.billNumber,
    ]);
  }

  installmentDetails(bill: PenaltyBillViewModel) {
    this._router.navigate(["/supplementary/installment-view", bill.billNumber]);
  }

  editByBillNo(bill: PenaltyBillViewModel) {
    this._router.navigate([
      "/supplementary/supplementary-bill",
      bill.billNumber,
      bill.customerNumber,
    ]);
  }
  paymnetGateway(bill: PenaltyBillViewModel) {
    let totalAmount = bill.billAmount;
    let customerNumber = bill.customerNumber;
    let billNumber = bill.billNumber;
    this.hostName = "/supplementary/supplementarybill-view";
    localStorage.setItem("redirectUrl", this.hostName);
    this._paymnetGatewayService
      .paymnetGateway(totalAmount, customerNumber, billNumber)
      .subscribe((res: any) => {
        window.open(res.url);
      });
  }
  getSupplementaryBill() {
    this._suplimentaryBillService.getSupplementaryBill(this.formVal).subscribe(
      (res: any) => {
        if (res.status) {
          this.penaltybillList = res.result as PenaltyBillViewModel[];
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
        } else {
          this._toasterService.danger(res.result, "Error");
          this.penaltybillList = [];
        }
      },
      (er) => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
        this.penaltybillList = [];
      }
    );
  }

  dateExtend(event: any) {
    const ref = this.dialog.open(ExtendDateBoxComponent, {
      position: { top: "50px" },
      width: "40%",
      height: "50%",
      data: {
        title: "Extend Date",
        extendFor: 1,
        billNumber: event.billNumber,
        customerNumber: event.customerNumber,
        dueDate: event.duaDate,
        minDate: event.duaDate,
      },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        //this.reRender();
        this.getSupplementaryBill();
      }
    });
  }

  viewPrint(bill: PenaltyBillViewModel) {
    if (bill.meterType == ("01" || "03" || "04" || "11")) {
      this._router.navigate([
        "bill-report/suplimentary-sr",
        bill.billNumber,
        bill.customerNumber,
      ]);
    } else {
      this._router.navigate([
        "bill-report/suplimentary-dr",
        bill.billNumber,
        bill.customerNumber,
      ]);
    }
  }
  createForm() {
    this.searchPenaltyBillForm = this._fb.group({
      customerNumber: ["", []],
      nidNumber: ["", []],
      billNumber: ["", []],
      dueDate: [, []],
      locationCode: [this.locationCodes[0], []],
    });
  }

  get formVal() {
    return this.searchPenaltyBillForm.value;
  }

  get f() {
    return this.searchPenaltyBillForm.controls;
  }

  //#region Reload Page
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getSupplementaryBill();
    });
  }
  //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
