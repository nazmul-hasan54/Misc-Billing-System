import { Component, OnInit, ViewChild } from '@angular/core';
import { Data, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { MinistryService } from '../../../../services/ministry.service';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { ViewMinistryMoldel } from '../../../../model/viewMinistry.model';

@Component({
  selector: 'ngx-view-ministry-list',
  templateUrl: './view-ministry-list.component.html',
  styleUrls: ['./view-ministry-list.component.scss']
})
export class ViewMinistryListComponent implements OnInit {
  viewMinistryForm:FormGroup;
  ministrylist: ViewMinistryMoldel[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  isSavedDisable:boolean=true;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false

  constructor(
    private _ministryService: MinistryService,
    private _fb: FormBuilder,
     private _router: Router,
    private _toasterService: NbToastrService,
    ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
     searching:false,
     retrieve:true
      
    };
    
    this.createForm();
    this.getAllMinistry();
    this.isSavedDisable=true;
  }

  getAllMinistry(){
    this._ministryService.getMinistryList().subscribe(res=>{
      this.ministrylist = res as ViewMinistryMoldel[];
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    })
  }

  editMinistry(ministry: ViewMinistryMoldel){
    this.viewMinistryForm.patchValue(ministry); 
    this.dtTrigger.next();
    this.isSavedDisable=false;  
  }

  saveMinistry(){
    this._ministryService.saveMinistryBill(this.formVal).subscribe(res => {
        let saveData=res as any;
        if (saveData) {
          this._toasterService.success("Bill Updated Successfully", "Success");
          this.dtTrigger.next();  
          this.getAllMinistry();         
          this.reset();
          
        } else {
          this._toasterService.danger("Failed To Saved ", "Error");  
          this.ministrylist = [];     
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
        this.ministrylist = [];     
      }
    );
    
  }

 

  reset(){
    this.viewMinistryForm.reset()
    this.isSavedDisable=true;
  }
  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }
  createForm(){
    this.viewMinistryForm=this._fb.group({
      name:[,[]],
      nameBn:[,[]],
      code:[,[]],
      hasDepartment:[,[]]

    })
  }
  get formVal() {
    return this.viewMinistryForm.value;
  }

  get f() {
    return this.viewMinistryForm.controls;
  }

  

}
