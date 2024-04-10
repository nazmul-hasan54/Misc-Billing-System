import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { CircleModel } from '../../../../model/circle.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { PouroshovaModels } from '../../../../model/ministry/pouroshova.model';
import { ReligiousService } from '../../../../services/religious.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UnionPorishodModel } from '../../../../model/ministry/unionporishod.model';

@Component({
  selector: 'ngx-unionporishod-genarate',
  templateUrl: './unionporishod-genarate.component.html',
  styleUrls: ['./unionporishod-genarate.component.scss']
})
export class UnionporishodGenarateComponent implements OnInit {
  unionPorishodForm: FormGroup;
  zoneList: Zone[] = [];
  circleList: CircleModel[] = [];
  unionPorishodList: UnionPorishodModel[] = [];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable: boolean = true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false;
  btnStatus: string = "Save";
  constructor(
    private _fb: FormBuilder,
    private _ministryCustService: MinistryCustomeService,
    private _religiousService: ReligiousService,
    private _ministryService: MinistryService,
    private _router: Router,
    private _toasterService: NbToastrService,
    private dialog: MatDialog
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
    this.getZoneList();
    this.getAllUnionPorishod();
    
  }


  getZoneList() {
    this._ministryCustService.getAllZoneDataList().subscribe((res: any) => {
      this.zoneList = res.data as Zone[];
      
    });
  }

  getCircleByZone(event: string) {
    this._religiousService.getAllCircleByZoneCode(event).subscribe((res: any) => {
      this.circleList = res.data as CircleModel[];

    });
    this.changeZonecode();

  }

  changeZonecode() {
    this.unionPorishodForm.patchValue({
      circleCode: null
    })
  }

  saveUnionBill() {
    this._ministryService.saveUnionPorishodBill(this.formval).subscribe(res => {
      let saveData = res as any;
      if (saveData) { this._toasterService.success("Bill Saved Successfully", "Success");
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
        this.getAllUnionPorishod();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.unionPorishodList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.unionPorishodList = [];
      }
    );
  }


  updateUnionBill() {
    this._ministryService.saveUnionPorishodBill(this.formval).subscribe(res => {
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
        this.getAllUnionPorishod();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.unionPorishodList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.unionPorishodList = [];
      }
    );

  }

  editUnionList(u) {
    this.btnStatus = 'Update';
    this.unionPorishodForm.patchValue(u);
    this.getCircleByZone(u.zoneCode)
    this.unionPorishodForm.patchValue({
      circleCode: u.circleCode
    })
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


  deleteUnionbill(id: number) {
    console.log("id",id);
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
        this._ministryService.deleteUnionPorishodBill(id).subscribe((res: any) => {
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
            this.getAllUnionPorishod();
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
    this.unionPorishodForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }
  getAllUnionPorishod(){
    this._ministryService.getAllUnionPorishod().subscribe((res)=>{
       this.unionPorishodList=res as UnionPorishodModel[];
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
    })
  }


  createForm() {
    this.unionPorishodForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      code: [, []],
      zoneCode: [, [Validators.required]],
      circleCode: [, [Validators.required]],
      zoneName: [, []],
      circleName: [, []],
      orderNo: [, [Validators.required]]
      
    })
  }

  get f() {
    return this.unionPorishodForm.controls;
  }

  get formval() {
    return this.unionPorishodForm.value;
  }

}
