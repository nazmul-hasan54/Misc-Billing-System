import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForDDMMYY, ddmmyytodate } from '../../../@core/utils/utiliy';
import { ExtendDueDateService } from '../../../services/extend-due-date.service';
import { ConfirmDialogModel } from '../../models/confirm-dialog.model';
import { ExtendDateModel } from '../../models/extendDate.model';


@Component({
  selector: 'ngx-extend-date-box',
  templateUrl: './extend-date-box.component.html',
  styleUrls: ['./extend-date-box.component.scss']
})
export class ExtendDateBoxComponent implements OnInit {

  extendDateForm: FormGroup;
  title: string;
  billNumber: number;
  customerNumber: number;
  extendFor: number;
  billId: number;
  minDate: Date = new Date();
  dueDate: Date;
  userName:string=localStorage.getItem("userName")

  constructor(
    public dialogRef: MatDialogRef<ExtendDateBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ExtendDateModel,
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _extendDDateService: ExtendDueDateService,

  ) { 
    this.extendFor = data.extendFor;
    this.title = data.title;
    this.billNumber = data.billNumber;
    this.customerNumber = data.customerNumber;
    this.billId = data.billId;
    this.dueDate = new Date(ddmmyytodate (data.dueDate));
    this.minDate=this.dueDate;
  }

  ngOnInit(): void {
    this.CreateForm();
    this.extendDateForm.patchValue({
      uDate: this.dueDate,
    });
  }

  updateDate(){
    if(this.extendDateForm.value.uDate == null){
      this._toasterService.danger("Please fill date info!","Failed");
      return;
    }
    this.extendDateForm.patchValue({
      billNumber: this.billNumber,
      customerNumber: this.customerNumber
    });

    this._extendDDateService.updateDueDate(this.formVal).subscribe(res=>{
      if(res){
        if(res == 1){
          this._toasterService.success("Save Successful!","Success");
          this.CreateForm();
        }
        else{
          this._toasterService.danger("Failed To Save","Failed");
        }
      }
    },er=>{
      this._toasterService.danger("Something Went Wrong Please Try Again !!","Failed");
    });
    this.dialogRef.close(true);
  }

  updateDateForInstalment(){
    if(this.extendDateForm.value.uDate == null){
      this._toasterService.danger("Please fill date info!","Failed");
      return;
    }

   let param = {
      billId: this.billId,
      billNumber: this.billNumber,
      extendDate: this.formVal.extendDate,
      userName:this.formVal.userName,
    }

    this._extendDDateService.updateDueDateForInst(param).subscribe(res=>{
      if(res){
        if(res == 1){
          this._toasterService.success("Save Successful!","Success");
          this.CreateForm();
        }
        else{
          this._toasterService.danger("Failed To Save","Failed");
        }
      }
    },er=>{
      this._toasterService.danger("Something Went Wrong Please Try Again !!","Failed");
    });
    this.dialogRef.close(true);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }


  updateDateChange(event: Date){
    this.minDate = event
    let dueDate=dateFormatForDDMMYY(event);
    this.extendDateForm.patchValue({
      extendDate:dueDate
    });
  }

  CreateForm() {
    this.extendDateForm = this._fb.group({
      billNumber: [, []],
      customerNumber: [, []],
      extendDate: [,[]],
      uDate: [, [Validators.required]],
      userName:[this.userName,[]],
    });
  }

  get f() {
    return this.extendDateForm.controls;
  }
  get formVal() {
    return this.extendDateForm.value;
  }

}
