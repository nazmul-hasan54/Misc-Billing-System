import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApaService } from '../../../services/apa.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { StrategicObjectiveService } from './../../../services/strategic-objective.service';
import { StratigicModel } from '../../../model/apa/stratigic-objectives.model';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-apa-strategic-genarate',
  templateUrl: './apa-strategic-genarate.component.html',
  styleUrls: ['./apa-strategic-genarate.component.scss']
})
export class ApaStrategicGenarateComponent implements OnInit {

  apaListForm: FormGroup;
  strategicList: StratigicModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus:string="Save";

  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _strategicService:StrategicObjectiveService,
    private _router: Router,
    private _toasterService: NbToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      retrieve: true
    };
    this.createForm();
    this.getStrategicList();
    this.isSavedDisable = true;
    
  }

  getStrategicList() {
    this._apaService.getStrategicList().subscribe(res => {
      this.strategicList = res as StratigicModel[];
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    });
  }

  updateApaBill() {
    this._strategicService.updateStrategicBill(this.formval).subscribe(res => {
      let saveData = res as any;
      if (saveData) {
        this._toasterService.success("Bill Updated Successfully", "Success");
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
        this.getStrategicList();
        this.reset();
      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.strategicList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.strategicList = [];
      }
    );

  }


  deletestrategicbill(id: number) {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      position: { top: "250px" },
      width: "400px",
      data: { title: "Strategic Object", message: "Are you sure to delete this?" },
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
    ref.afterClosed().subscribe(result => {
      console.log('res', result)
      if (result) {
        this._strategicService.deleteStrategicBill(id).subscribe((res: any) => {
          if (res == 1) {
            this._toasterService.danger("Deleted Successfully", "Delete");
            if (this.isDtInitialized) {
              this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
                this.dtTrigger.next();
              });
            } else {
              this.isDtInitialized = true
              this.dtTrigger.next();
            }
            this.getStrategicList();
            this.reset();
          }
          else {
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        });
      }
    });
  }

  editApalist(apa: StratigicModel) {
    this.btnStatus = 'Update';
    this.apaListForm.patchValue(apa);
    if (this.isDtInitialized) {
      this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
        this.dtTrigger.next();
      });
    } else {
      this.isDtInitialized = true
      this.dtTrigger.next();
    }
    this.isSavedDisable = false;
  }

  

  saveApaBill() {
    this._strategicService.saveStrategicBill(this.formval).subscribe(res => {
      let saveData = res as any;
      if (saveData) {
        this._toasterService.success("Bill Saved Successfully", "Success");
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
        this.getStrategicList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.strategicList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.strategicList = [];
      }
    );

  }

  reset() {
    this.apaListForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }
  

  createForm() {
    this.apaListForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      code: [, []],
      orderBy: [, [Validators.required]],
    })
  }
  get f() {
    return this.apaListForm.controls;
  }

  get formval() {
    return this.apaListForm.value;
  }

}
