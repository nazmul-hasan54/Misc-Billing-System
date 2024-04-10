import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivitiesModel } from '../../../model/apa/activities.model';
import { ApaService } from '../../../services/apa.service';
import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { ProgramModel } from '../../../model/apa/program.model';
import { ProgramService } from '../../../services/program.service';
import { Router } from '@angular/router';
import { StratigicModel } from '../../../model/apa/stratigic-objectives.model';
import { Subject } from 'rxjs';
import { event } from 'jquery';

@Component({
  selector: 'tests-apa-program-genarate',
  templateUrl: './apa-program-genarate.component.html',
  styleUrls: ['./apa-program-genarate.component.scss']
})
export class ApaProgramGenarateComponent implements OnInit {
  apaProgramForm: FormGroup;
  programList: ProgramModel[] = [];
  objectiveList: StratigicModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus: string = "Save";
  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _router: Router,
    private _programService:ProgramService,
    private _toasterService: NbToastrService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      searching: false,
      retrieve: true,
      pageLength:10,
    };  
    this.isSavedDisable = true;
   this.createForm();
   this.getStrategicList();
   this.getProgramList();
   
  }

  getStrategicList() {
    this._apaService.getStrategicList().subscribe((res) => {
      this.objectiveList = res as StratigicModel[];
    });
  }
  getProgramList() {
    this._programService.getAllProgramlist().subscribe((res) => {
      this.programList = res as ProgramModel[];
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

  saveProgarmBill() {
    this._programService.saveProgramBill(this.formval).subscribe(res => {
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
        this.getProgramList();
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

  editApalist(apa: ProgramModel) {
    this.btnStatus = 'Update';
    this.apaProgramForm.patchValue(apa);
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

  updateProgarmBill() {
    this._programService.saveProgramBill(this.formval).subscribe(res => {

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
        this.getProgramList();
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


  deleteProgrambill(id: number) {
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
        this._programService.deleteProgramBill(id).subscribe((res: any) => {
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
            this.getProgramList();
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
    this.apaProgramForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }

  createForm() {
    this.apaProgramForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      objectiveCode: [, [Validators.required]],
      orderBy: [, [Validators.required]],
    })
  }
  get f() {
    return this.apaProgramForm.controls;
  }

  get formval() {
    return this.apaProgramForm.value;
  }

}
