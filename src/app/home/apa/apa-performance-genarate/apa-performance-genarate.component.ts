import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApaService } from '../../../services/apa.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { PerformanceModel } from '../../../model/apa/performance.model';
import { PerformanceService } from '../../../services/performance.service';
import { ProgramModel } from '../../../model/apa/program.model';
import { ProgramService } from '../../../services/program.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UnitModel } from './../../../model/apa/unit.model';

@Component({
  selector: 'ngx-apa-performance-genarate',
  templateUrl: './apa-performance-genarate.component.html',
  styleUrls: ['./apa-performance-genarate.component.scss']
})
export class ApaPerformanceGenarateComponent implements OnInit {
  apaPerformanceForm: FormGroup;
  programList: ProgramModel[] = [];
  performanceList: PerformanceModel[] = [];
  unitIndexlist:UnitModel[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus: string = "Save";
  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _performanceService:PerformanceService,
    private _programService: ProgramService,
    private _router: Router,
    private _toasterService: NbToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {

    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      retrieve: true,
      pageLength: 10,

    };  
    this.isSavedDisable = true;
    this.createForm();
    this.getProgramList();
    this.getIndexUnitList();
    this.getPerformanceList();
  }

  savePerformanceBill() {
    this._performanceService.savePerformanceBill(this.formval).subscribe(res => {
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
        this.getPerformanceList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.programList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.programList = [];
      }
    );
  }

  editApalist(apa:any) {
    this.btnStatus = 'Update';
    this.apaPerformanceForm.patchValue(apa);
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

  updatePerformanceBill() {
    this._performanceService.savePerformanceBill(this.formval).subscribe(res => {

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
        this.getPerformanceList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.programList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.programList = [];
      }
    );

  }

  deletePerformancebill(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      position: { top: "250px" },
      width: "400px",
      data: { title: "Program Generate", message: "Are you sure to delete this?" },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe(result => {
      if (result) {
        this._performanceService.deletePerformanceBill(id).subscribe((res: any) => {
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
            this.getPerformanceList();
            this.reset();
          }
          else {
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        });
      }
    });
  }


  getPerformanceList(){
    this._performanceService.getAllPerformanceList().subscribe((res) => {
      this.performanceList = res as PerformanceModel[];
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

  getProgramList() {
    this._programService.getAllProgramlist().subscribe((res) => {
      this.programList = res as ProgramModel[];
    });
  }

  getIndexUnitList() {
    this._apaService.getUnitList().subscribe((res) => {
      this.unitIndexlist = res as UnitModel[];
    });
  }

  reset() {
    this.apaPerformanceForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }


  createForm() {
    this.apaPerformanceForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      code:[,[]],
      programCode: [, [Validators.required]],
      indexUnitCode: [, [Validators.required]],
      value: [, [Validators.required]],
      orderBy: [, [Validators.required]],
    })
  }

  get f() {
    return this.apaPerformanceForm.controls;
  }

  get formval() {
    return this.apaPerformanceForm.value;
  }

}
