import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { LocationNameModel } from '../../../model/locationname.model';
import { Locations } from '../../../model/locations.model';
import { PenaltyBillPrintModel } from '../../../model/penaltyBillPrint.model';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { MinistryService } from '../../../services/ministry.service';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { PaymnetService } from '../../../services/paymnet/paymnet.service';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { PrintBillService } from '../../../services/print-bill.service';
import { ExtendDateBoxComponent } from '../../../shared/components/extend-date-box/extend-date-box.component';
import { PenaltyBillPrepaidViewModel } from '../../../model/penaltyBillPrepaidView.model';
import { PaymnetForPrepaidComponent } from '../../../shared/components/paymnet-for-prepaid/paymnet-for-prepaid.component';

@Component({
  selector: 'ngx-penalty-bill-for-prepaid-view',
  templateUrl: './penalty-bill-for-prepaid-view.component.html',
  styleUrls: ['./penalty-bill-for-prepaid-view.component.scss']
})
export class PenaltyBillForPrepaidViewComponent implements OnInit {

  searchPenaltyBillPrepaidForm: FormGroup;
  penaltybillPrepaidList: PenaltyBillPrepaidViewModel[] = [];
  billPrintList: PenaltyBillPrintModel[] = [];
  isProgress: boolean = false;
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

  paymentType: any[] = [
    {"id": '1', "value": 'Bkash'},
    {"id":'2', "value":'Nagad'},
    {"id":'3', "value":'UCash'}
  ];
  constructor(
    private _fb: FormBuilder,
    private _penaltyService: PenaltyBillGenService,
    private _printBillService: PrintBillService,
    private _toasterService: NbToastrService,
    private _paymnetGatewayService: PaymnetService,
    private _router: Router,
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
      this.searchPenaltyBillPrepaidForm.patchValue({
        locationCode: this.locationCodes[0],
      })
      this.getPenaltyBillPrepaid();
    }
    else{
      this.getAllLocations();
    }
    
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



  getPenaltyBillPrepaid() {
    this._penaltyService.getPenaltyBillPrepaid(this.formVal).subscribe(
      (res: any) => {
      
        if (res.status) {
          this.penaltybillPrepaidList = res.result as PenaltyBillPrepaidViewModel[];
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
          this.penaltybillPrepaidList = [];
        }
      },
      (er) => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
        this.penaltybillPrepaidList = [];
      }
    );
  }

  viewPrint(bill: PenaltyBillViewModel) {
    this.isProgress = true;
    if (bill.meterType == ("01" || "03" || "04" || "11")) {
      this._router.navigate([
        "bill-report/penalty-bill-prepaid-sr",
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




  makePayment(event: any) {
    const ref = this.dialog.open(PaymnetForPrepaidComponent, {
      position: { top: "50px" },
      width: "40%",
      height: "50%",
      data: {
        title: "Payment Method",
        billAmount:event.billAmount,
        billNumber: event.billNumber,
        customerNumber: event.customerNumber
        
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
        this.getPenaltyBillPrepaid();
      }
    });
  }

  onChangePaymentType(event:any,bill){
    let totalAmount = bill.billAmount;
    let customerNumber = bill.customerNumber;
    let billNumber = bill.billNumber;
    if (event == 2) {
      this._paymnetGatewayService.nagadGatewayPrepaid(totalAmount, customerNumber, billNumber)
      .subscribe((res: any) => {
        this._toasterService.success("Nagad Payment Successfully", "Success"); 
      });
    }

  }

  createForm() {
    this.searchPenaltyBillPrepaidForm = this._fb.group({
      customerNumber: ["", []],
      nidNumber: ["", []],
      billNumber: ["", []],
      dueDate: [, []],
      paymentType: [, []],
      locationCode: [this.locationCodes[0], []],
    });
  }

  get formVal() {
    return this.searchPenaltyBillPrepaidForm.value;
  }

  get f() {
    return this.searchPenaltyBillPrepaidForm.controls;
  }

  //#region Reload Page
  private reRender(): void {
    this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
      dtInstance.destroy();
      this.getPenaltyBillPrepaid();
    });
  }
  //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  IsHidden= true;

onSelect(i:number){

  this.IsHidden= !this.IsHidden;
}
showButton: boolean = false;
}
