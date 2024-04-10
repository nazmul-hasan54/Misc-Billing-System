import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ApaService } from '../../../../services/apa.service';
import { CircleModel } from '../../../../model/circle.model';
import { ConfirmDialogComponent } from '../../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { MatDialog } from '@angular/material/dialog';
import { MinistryCustomeService } from '../../../../services/ministry-custome.service';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { PouroshovaModel } from '../../../../model/pouroshova';
import { PouroshovaModels } from '../../../../model/ministry/pouroshova.model';
import { ReligiousService } from '../../../../services/religious.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'ngx-pouroshova-genarate',
  templateUrl: './pouroshova-genarate.component.html',
  styleUrls: ['./pouroshova-genarate.component.scss']
})
export class PouroshovaGenarateComponent implements OnInit {
  pouroshovaForm: FormGroup;
  zoneList: Zone[] = [];
  circleList: CircleModel[] = [];
  pouroshovaList: PouroshovaModels[]=[];
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
    this.getPouroshovaList();
    
  }

  savePouroshovaBill() {
    this._ministryService.savePouroshovaBill(this.formval).subscribe(res => {
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
        this.getPouroshovaList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.pouroshovaList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.pouroshovaList = [];
      }
    );
  }

  editPouroshovaist(p) {
    this.btnStatus = 'Update';
    this.pouroshovaForm.patchValue(p);
    this.getCircleByZone(p.zoneCode)
    this.pouroshovaForm.patchValue({
      circleCode:p.circleCode
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

  updatePouroshovaBill() {
    this._ministryService.savePouroshovaBill(this.formval).subscribe(res => {

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
        this.getPouroshovaList();
        this.reset();

      } else {
        this._toasterService.danger("Failed To Saved ", "Error");
        this.pouroshovaList = [];
      }
    },
      (er) => {
        this._toasterService.danger(er.message);
        this.pouroshovaList = [];
      }
    );

  }

  deletePouroshovasbill(id: number) {
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
        this._ministryService.deletePouroshovaBill(id).subscribe((res: any) => {
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
            this.getPouroshovaList();
            this.reset();
          }
          else {
            this._toasterService.danger("Delete Failed!", "Delete");
          }
        });
      }
    });
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

  getPouroshovaList(){
    this._ministryService.getPouroshovaList().subscribe((res)=>{
      this.pouroshovaList = res as PouroshovaModels[];
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
  
  changeZonecode(){
    this.pouroshovaForm.patchValue({
      circleCode:null
    })
  }
  

  reset() {
    this.pouroshovaForm.reset();
    this.isSavedDisable = true;
    this.btnStatus = 'Save';
  }


  createForm() {
    this.pouroshovaForm = this._fb.group({
      id: [, []],
      name: [, [Validators.required]],
      nameBn: [, [Validators.required]],
      code: [, []],
      zoneCode: [, [Validators.required]],
      circleCode: [, [Validators.required]],
      zoneName: [, []],
       circleName: [, []],
    })
  }

  get f() {
    return this.pouroshovaForm.controls;
  }

  get formval() {
    return this.pouroshovaForm.value;
  }


}
