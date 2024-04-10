import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

import { DataTableDirective } from "angular-datatables";
import { DcRcBillGenService } from "../../../services/dc-rc-bill-gen.service";
import { DcRcBillViewModel } from "../../../model/dcRcBillView";
import { ExtendDateBoxComponent } from "../../../shared/components/extend-date-box/extend-date-box.component";
import { LocationNameModel } from "../../../model/locationname.model";
import { Locations } from "../../../model/locations.model";
import { MatDialog } from "@angular/material/dialog";
import { MinistryService } from "../../../services/ministry.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { MiscLocationService } from "../../../services/misc-location.service";
import { NbToastrService } from "@nebular/theme";
import { PaymnetService } from "../../../services/paymnet/paymnet.service";
import { PenaltyBillGenService } from "../../../services/penalty-bill-gen.service";
import { PenaltyBillViewModel } from "../../../model/penaltyBillView.model";
import { Subject } from "rxjs";
import { dateFormatForDDMMYY } from "../../../@core/utils/utiliy";

@Component({
  selector: "ngx-view-dc-rc-bill",
  templateUrl: "./view-dc-rc-bill.component.html",
  styleUrls: ["./view-dc-rc-bill.component.scss"],
})
export class ViewDcRcBillComponent implements OnInit {
  searchDcRcBillForm: FormGroup;
  dcRcbillList: DcRcBillViewModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: any;
  isView:boolean=true;
  isrcView:boolean=false;

  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  roleName = localStorage.getItem('roleName');
  locationList: LocationNameModel[];
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  locationFormSession: Locations[] = [];
  locationNamelist: LocationNameModel[];
  userAccess: any;
  pageId:any
  constructor(
    private _fb: FormBuilder,
    private _dcrcBillGen: DcRcBillGenService,
    private _toasterService: NbToastrService,
    private _paymnetGatewayService:PaymnetService,
    private _router: Router,
    private _activatedRoute:ActivatedRoute,
    private dialog: MatDialog,
    private _msLocation: MiscLocationService,
    private _ministryService: MinistryService,
    private _miscBillingService: MiscBillingService,
    private _penaltyService: PenaltyBillGenService,
  ) {}

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((params) => {
    });
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
    };
    this.createForm();
    if(this.roleName=='Admin'){
      
      this.getAllLocation();
    }
    else{
      this.getLocationsBySession(this.locationCodes)
      if (this.roleName != 'Admin' && this.locationCodes.length == 1){
      this.searchDcRcBillForm.patchValue({
        locationCode: this.locationCodes[0],
      });
      this.getDcRcBill();
      }
    }

    let pageIds: any = this._activatedRoute.data;
    this.pageId = pageIds._value.pageId;
    console.log(this.pageId);
    this.userName = localStorage.getItem('userName');
    console.log(this.userName);
    this.getUserAccessMenu(this.pageId, this.userName)
  }

  getUserAccessMenu(pageId, userName) {
    this._penaltyService.getUserAccessMenu(pageId, userName).subscribe((res: any) => {
      this.userAccess = res;
      console.log(this.userAccess[0].isEdited);
    })
  }

  reconnect(bill:DcRcBillViewModel){
    this.isView=false;
    this.isrcView=true;
    this.searchDcRcBillForm.patchValue({
      customerNumber:bill.customerNumber,
      billNumber:bill.billNumber
    })
    
  }

  getAllLocation() {
    this._msLocation.getLocationDD().subscribe((res: any) => {
      this.locationList = res.data as LocationNameModel[];
      console.log("res", this.locationList);

    });
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }

  editByBillNo(bill: PenaltyBillViewModel) {
    this._router.navigate([
      "/dc-rc/dc-rc-bill",
      bill.billNumber,
      bill.customerNumber,
    ]);
  }

  getDcRcBill() {
    this._dcrcBillGen.getDcRcBill(this.formVal).subscribe(
      (res: any) => {
        if (res.status) {
          this.dcRcbillList = res.result as DcRcBillViewModel[];
          this.dtTrigger.next();
        } else {
          this._toasterService.danger(res.result, "Error");
          this.dcRcbillList = [];
        }
      },
      () => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
        this.dcRcbillList = [];
      }
    );
  }

  dateExtend(event: any){
    const ref=  this.dialog.open(ExtendDateBoxComponent, {
      position:{top:"50px"},
      width:"40%",
      height:"50%",
      data:{title:"Extend Date",extendFor:1,billNumber:event.billNumber,customerNumber:event.customerNumber,dueDate: event.dueDate,},
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

  

paymnetGateway(bill:PenaltyBillViewModel){
    let totalAmount=bill.billAmount
    let customerNumber=bill.customerNumber
    let billNumber=bill.billNumber
     this.hostName = '/dc-rc/dc-rc-bill-view';
    localStorage.setItem("redirectUrl",this.hostName);
  this._paymnetGatewayService.paymnetGateway(totalAmount,customerNumber,billNumber).subscribe((res:any)=>{
    window.open(res.url);
  })
}
  viewPrint(bill:PenaltyBillViewModel){
      this._router.navigate(['bill-report/dcrc-print', bill.billNumber, bill.customerNumber])
  }
  dueDateChange(event: Date){
    let rcDate=dateFormatForDDMMYY(event);
    this.searchDcRcBillForm.patchValue({
      rcDate:rcDate
    })
  }

  save(){
    const param={
      billNumber:this.f.billNumber.value,
      customerNumber:this.f.customerNumber.value,
      rcDate:this.f.rcDate.value,
      userName:this.f.userName.value,
    }
    this._dcrcBillGen.updateRcDate(param).subscribe(res=>{
      if(res){
        this._toasterService.success("Reconnect Successfully","Success");
        this.createForm();
        this.isView=true;
        this.isrcView=false;
        this.getDcRcBill();
      }
    })
  }
  
  userName:string=localStorage.getItem("userName")
  createForm() {
    this.searchDcRcBillForm = this._fb.group({
      customerNumber: ["", []],
      nidNumber: ["", []],
      billNumber: ["", []],
      dueDate: [, []],
      rDate:[,[]],
      rcDate:[,[]],
      locationCode:[this.locationCodes[0],[]],
      userName:[this.userName,[]],
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
            this.getDcRcBill();
          });
        }
        //#endregion

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
