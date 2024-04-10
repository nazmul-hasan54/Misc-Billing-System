import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { NbToastrService } from "@nebular/theme";
import { Subject } from "rxjs";
import { BillCycleViewModel } from "../../../model/temporary/billCycleList.model";
import { BillCycleService } from "../../../services/bill-cycle.service";
import { TemporaryBillService } from "../../../services/temporary-bill.service";

@Component({
  selector: "ngx-bill-cycle-list",
  templateUrl: "./bill-cycle-list.component.html",
  styleUrls: ["./bill-cycle-list.component.scss"],
})
export class BillCycleListComponent implements OnInit {
  billCycleList: BillCycleViewModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();

  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _temporaryService: TemporaryBillService,
    private _billcycleService:BillCycleService
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
    };
    this.getBillCycle();
  }

  getBillCycle() {
    this._billcycleService.getBillCycle().subscribe(
      (res: any) => {
        this.billCycleList = res as BillCycleViewModel[];
        this.dtTrigger.next();
      },
      (er) => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
      }
    );
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
}
