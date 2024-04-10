import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ApaService } from '../../../services/apa.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { IndexunitService } from './../../../services/indexunit.service';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UnitModel } from '../../../model/apa/unit.model';
import { Validators } from '@angular/forms';

@Component({
  selector: 'ngx-apa-unit-index-generate',
  templateUrl: './apa-unit-index-generate.component.html',
  styleUrls: ['./apa-unit-index-generate.component.scss']
})
export class ApaUnitIndexGenerateComponent implements OnInit {

  apaUnitIndexForm: FormGroup;
  unitIndexList: UnitModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus: string = "Save";
  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _indexUnitService:IndexunitService,
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
    this.getUnitIndexList();
  }

 
  getUnitIndexList() {
    this._apaService.getUnitList().subscribe((res) => {
      this.unitIndexList = res as UnitModel[];
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

  saveUnitIndexBill() {
    this._indexUnitService.saveUnitIndexBill(this.formval).subscribe(res => {
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
        this.getUnitIndexList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.unitIndexList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.unitIndexList = [];
      }
    );

  }

  editUnitIndexlist(apa: UnitModel) {
    this.btnStatus = 'Update';
    this.apaUnitIndexForm.patchValue(apa);
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

  updateUnitIndexBill() {
    this._indexUnitService.saveUnitIndexBill(this.formval).subscribe(res => {

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
        this.getUnitIndexList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.unitIndexList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.unitIndexList = [];
      }
    );

  }


  deleteIndexUnitbill(id: number) {
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
        this._indexUnitService.deleteUnitIndexBill(id).subscribe((res: any) => {
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
            this.getUnitIndexList();
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
    this.apaUnitIndexForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }

  createForm() {
    this.apaUnitIndexForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      code: [, []],
    })
  }
  get f() {
    return this.apaUnitIndexForm.controls;
  }

  get formval() {
    return this.apaUnitIndexForm.value;
  }
}
