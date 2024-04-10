import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApaService } from '../../../services/apa.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { FinancialYearModel } from '../../../model/apa/financialyear.model';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { PerformanceModel } from '../../../model/apa/performance.model';
import { PerformanceService } from '../../../services/performance.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { TargetModel } from '../../../model/apa/target.model';
import { TargetserviceService } from '../../../services/targetservice.service';

@Component({
  selector: 'ngx-apa-target-genarate',
  templateUrl: './apa-target-genarate.component.html',
  styleUrls: ['./apa-target-genarate.component.scss']
})
export class ApaTargetGenarateComponent implements OnInit {
  apaTargetForm: FormGroup;
  performanceList: PerformanceModel[] = [];
  targetList: TargetModel[] = [];
  fiscalYearlist: FinancialYearModel[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus: string = "Save";
  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _targetService: TargetserviceService,
    private _performanceService: PerformanceService,
    private _router: Router,
    private _toasterService: NbToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      retrieve: true,
    };
    this.isSavedDisable = true;
    this.createForm();
    this.gettargetList();
    this.getPerformanceList();
    this.getFiscalYearList();    

  }

  gettargetList() {
    this._targetService.getTargetList().subscribe((res) => {
       this.targetList = res as TargetModel[];
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      }
      else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
   });
  }
  getPerformanceList() {
    this._performanceService.getAllPerformanceList().subscribe((res) => {
      this.performanceList = res as PerformanceModel[];
    });
  }

  getFiscalYearList(){
    this._targetService.getFiscalYear().subscribe((res) => {
      this.fiscalYearlist = res as FinancialYearModel[];
  })
}


  saveTargetBill() {
    this._targetService.saveTargetBill(this.formval).subscribe(res => {
      let saveData = res as any;
      if (saveData) {
        this._toasterService.success("Bill Saved Successfully", "Success");
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        }
        else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
        this.gettargetList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.targetList = [];
      }},
      (er) => {
        this._toasterService.danger(er.message);
        this.targetList = [];
      }
    );

  }

  editTargetlist(apa: TargetModel) {
    this.btnStatus = 'Update';
    this.apaTargetForm.patchValue(apa);
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        dtInstance.destroy();
        this.dtTrigger.next();
      });
    }
    else {
      this.isDtInitialized = true
      this.dtTrigger.next();
    }
    this.isSavedDisable = false;
  }

  updateTargetBill() {
    this._targetService.saveTargetBill(this.formval).subscribe(res => {

      let saveData = res as any;
      if (saveData) {
        this._toasterService.success("Bill Updated Successfully", "Success");
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        }
        else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
        this.gettargetList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.targetList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.targetList = [];
      }
    );
  }

  deleteProgrambill(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      position: { top: "250px" },
      width: "400px",
      data: { title: "Target Generate", message: "Are you sure to delete this?" },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this._targetService.deleteTargetBill(id).subscribe((res: any) => {
          if (res == 1) {
            this._toasterService.danger("Deleted Successfully", "Delete");
            if (this.isDtInitialized) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                dtInstance.destroy();
                this.dtTrigger.next();
              });
            }
            else {
              this.isDtInitialized = true
              this.dtTrigger.next();
            }
            this.gettargetList();
            this.reset();
          }
          else {
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        });
      }
    });
  }

  reset() {
    this.apaTargetForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }

  createForm() {
    this.apaTargetForm = this._fb.group({
      id: [, []],
      fiscalYearCode: [, [Validators.required]],
      performanceIndexCode: [, [Validators.required]],
      value: [, [Validators.required]],
    })
  }
  get f() {
    return this.apaTargetForm.controls;
  }

  get formval() {
    return this.apaTargetForm.value;
  }

}
