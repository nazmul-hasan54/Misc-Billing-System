import { Component, OnInit } from "@angular/core";
import { FormGroup, FormArray, FormBuilder, Validators } from "@angular/forms";
import { MatDialog } from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { installmentDetails } from "../../../model/installmentDetails.model";
import { PenaltyBillViewModel } from "../../../model/penaltyBillView.model";
import { InstallmentPlanService } from "../../../services/installment-plan.service";
import { ExtendDateBoxComponent } from "../../../shared/components/extend-date-box/extend-date-box.component";

@Component({
  selector: "ngx-view-sup-installment",
  templateUrl: "./view-sup-installment.component.html",
  styleUrls: ["./view-sup-installment.component.scss"],
})
export class ViewSupInstallmentComponent implements OnInit {
  installmentform: FormGroup;
  bill: PenaltyBillViewModel;
  installmentFormArray: FormArray;
  totalAmount: number = 0;
  isReadOnly: boolean;
  lstInstallment: installmentDetails[] = [];
  billNumber: any;

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _activateRoute: ActivatedRoute,
    private _installmentService: InstallmentPlanService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.createForm();
    if (this._activateRoute.snapshot.params["id"] !== undefined) {
      this.billNumber = this._activateRoute.snapshot.params["id"];
    }
    this.getSupInstallment();
  }

  getSupInstallment() {
    this._installmentService.getPenaltyInstallment(this.billNumber).subscribe(
      (res: any) => {
        this.lstInstallment = res as installmentDetails[];
        this.installmentform.patchValue(this.lstInstallment[0]);
      },
      () => {
        this._toasterService.danger(
          "Something went wrong !! please try again",
          "Error"
        );
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
        extendFor: 2,
        billNumber: event.billNumber,
        billId: event.id,
        dueDate: event.dueDate,
      },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });

    ref.afterClosed().subscribe((result) => {
      if (result) {
        setTimeout(() => {
          this.getSupInstallment();
        }, 800);
      }
    });
  }

  createForm() {
    this.installmentform = this._fb.group({
      customerNumber: [, []],
      location: ["", []],
      customerName: ["", []],
      tariff: ["", []],
      billNumber: ["", []],
      billAmount: [0, []],
      principleAmount: [0, []],
      installmentPercn: [50, [Validators.required]],
      installNumber: [, [Validators.required]],
      vatAmount: [0, []],
      lpsAmount: [0, []],
      totalAmount: [0, []],
    });
    this.installmentFormArray = this._fb.array([]);
  }
}
