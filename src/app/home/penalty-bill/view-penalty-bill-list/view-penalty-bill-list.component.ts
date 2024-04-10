import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Console, log } from 'console';
import { FormBuilder, FormGroup } from "@angular/forms";

import { DataTableDirective } from "angular-datatables";
import { ExtendDateBoxComponent } from "../../../shared/components/extend-date-box/extend-date-box.component";
import { LocationNameModel } from "../../../model/locationname.model";
import { Locations } from "../../../model/locations.model";
import { MatDialog } from "@angular/material/dialog";
import { MinistryService } from "../../../services/ministry.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { NbToastrService } from "@nebular/theme";
import { PaymentDetailsModel } from "../../../model/paymentdetails.model";
import { PaymnetService } from "../../../services/paymnet/paymnet.service";
import { PenaltyBillGenService } from "../../../services/penalty-bill-gen.service";
import { PenaltyBillPrintModel } from "../../../model/penaltyBillPrint.model";
import { PenaltyBillViewModel } from "../../../model/penaltyBillView.model";
import { PrintBillService } from "../../../services/print-bill.service";
import { Subject } from "rxjs";
import { User } from './../../../model/user.model';
import { __values } from 'tslib';
import { data } from "jquery";
import { paymentDetailsService } from "../../../services/paymnet/paymentdetails.service";

@Component({
  selector: "ngx-view-penalty-bill-list",
  templateUrl: "./view-penalty-bill-list.component.html",
  styleUrls: ["./view-penalty-bill-list.component.scss"],
})
export class ViewPenaltyBillListComponent implements OnInit {
  searchPenaltyBillForm: FormGroup;
  penaltybillList: PenaltyBillViewModel[] = [];
  billPrintList: PenaltyBillPrintModel[] = [];
  isProgress: boolean = false;
  paymentDetailsList: PaymentDetailsModel[] = [];
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  locationcodearray = Array.from('locationCodeList');
  
  locationFormSession: Locations[] = [];

  pageId:any;
  roleName = localStorage.getItem('roleName');
  userName = localStorage.getItem('userName');
  closeResult = "";
  locationNamelist: LocationNameModel[] = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: string;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized:boolean = false
  userAccess:any;
  constructor(
    private _fb: FormBuilder,
    private _penaltyService: PenaltyBillGenService,
    private _printBillService: PrintBillService,
    private _toasterService: NbToastrService,
    private _paymnetGatewayService: PaymnetService,
    private _router: Router,
    private _paymentDetailsservice: paymentDetailsService,
    private dialog: MatDialog,
    private _miscBillingService: MiscBillingService,
    private _ministryService: MinistryService,
    private _activateRoute: ActivatedRoute,

  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
    };

    this.createForm();
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName != 'Admin' && this.locationCodes.length ==1){
      this.searchPenaltyBillForm.patchValue({
        locationCode: this.locationCodes[0],
      })
      this.getPenaltyBill();
    }
    else{
      this.getAllLocations();
    }
    // this.paymentDetails();
    
    let pageIds: any = this._activateRoute.data;
    this.pageId = pageIds._value.pageId;
   this.userName = localStorage.getItem('userName');
   this.getUserAccessMenu(this.pageId,this.userName)
  }

  getUserAccessMenu(pageId,userName){
      this._penaltyService.getUserAccessMenu(pageId,userName).subscribe((res:any)=>{
        this.userAccess = res;
      })
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
    this._router.navigate(["/bill/penaltybill-installment", bill.billNumber]);
  }

  installmentDetails(bill: PenaltyBillViewModel) {
    this._router.navigate(["/bill/penaltyinstallment-view", bill.billNumber]);
  }

  editByBillNo(bill: PenaltyBillViewModel) {
    const pageId = {  pageId:8 };
   // this.router.navigate(['/product/msg'], { queryParams: queryParams });
    if (bill.meterType == '88'){
      this._router.navigate([
        "/bill/penalty-nonconsumer",
        bill.billNumber,
        bill.customerNumber,
       
      ],);
      
    }
    else{
      this._router.navigate([
        "/bill/penalty-bill",
        bill.billNumber,
        bill.customerNumber,
       
      ],);
    }
   
  }

  // userAccess(bill: PenaltyBillViewModel){

  //   if (bill.meterType == '88') {
  //     this._router.navigate([
  //       "/bill/penalty-nonconsumer",
  //       bill.billNumber,
  //       bill.customerNumber,
  //     ]);

  //   }
  //  else if (this.userName =='sohan_mollah'){
  //     this._router.navigate([
  //       "/bill/penalty-bill",
  //       bill.billNumber,
  //       bill.customerNumber,
  //     ]);
  //   }
  //   else if (this.userName == 'chief_ctg'){
  //     this._router.navigate([
  //       "/bill/penalty-bill",
  //       bill.billNumber,
  //       bill.customerNumber,
  //     ]);
  //   }
  // }
  getPenaltyBill() {
    this._penaltyService.getPenaltyBill(this.formVal).subscribe(
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

  viewPrint(bill: PenaltyBillViewModel) {
  
    this.isProgress = true;
    if (bill.meterType == ("01" || "03" || "04" || "11")) {
      this._router.navigate([
        "bill-report/penalty-billsr",
        bill.billNumber,
        bill.customerNumber,
      ]);
      this.isProgress = false;
    } else if (bill.meterType == "88") {
      this._router.navigate([
        "bill-report/penalty-billnoncust",
        bill.billNumber,
        bill.customerNumber,
      ]);
      this.isProgress = false;
    } else {
      this._router.navigate([
        "bill-report/penalty-billdr",
        bill.billNumber,
        bill.customerNumber,
      ]);
      this.isProgress = false;
    }
  }

  paymnetGateway(bill: PenaltyBillViewModel) {
    debugger;
    let totalAmount = bill.billAmount;
    let customerNumber = bill.customerNumber;
    let billNumber = bill.billNumber;
    this.hostName = "/bill/penaltybill-view";
    localStorage.setItem("redirectUrl", this.hostName);
    this._paymnetGatewayService
      .nagadGateway(totalAmount, customerNumber, billNumber)
      .subscribe((res: any) => {
        window.open(res.url);
      });
  }

  paymentDetails() {
    this._paymentDetailsservice.penaltyPaymentDetails().subscribe((res) => {
      this.paymentDetailsList = res as PaymentDetailsModel[];
    });
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
      },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        // this.reRender();
        this.getPenaltyBill();
      }
    });
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
      this.getPenaltyBill();
    });
  }
  //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
