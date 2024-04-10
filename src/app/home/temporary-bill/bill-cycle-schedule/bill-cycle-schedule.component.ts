import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { BillGroupModel } from '../../../model/temporary/billGroup.model';
import { LocationModel } from '../../../model/temporary/location.model';
import { MiscLocationService } from '../../../services/misc-location.service';
import { NbToastrService } from '@nebular/theme';
import { Router } from '@angular/router';
import { ScheduleBillGroupModel } from '../../../model/temporary/scheduleBillGroup.model';
import { ScheduleMonthModel } from '../../../model/temporary/scheduleMonth.model';
import { ScheduleService } from '../../../services/schedule.service';
import { ScheduleYearModel } from '../../../model/temporary/scheduleYear.model';
import { TemporaryBillService } from '../../../services/temporary-bill.service';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-bill-cycle-schedule',
  templateUrl: './bill-cycle-schedule.component.html',
  styleUrls: ['./bill-cycle-schedule.component.scss']
})
export class BillCycleScheduleComponent implements OnInit {
  billcycleform: FormGroup;
  locationList:LocationModel[]=[];
  billGroupList:ScheduleBillGroupModel[]=[];
  scheduleYear: ScheduleYearModel[] = [];
  scheduleMonth: ScheduleMonthModel[] = [];
  locationsList = localStorage.getItem('locationCodeList');
  locationCode = this.locationsList.split(",");
  userName:string=localStorage.getItem('userName');
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _temporaryService: TemporaryBillService,
    private _billSchedule:ScheduleService,
    private _miscLocation:MiscLocationService
  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.getLocationByUser();
    this.getAllScheduleBillGroup();
    this.getScheduleYear();
  }

  getLocationByUser(){
    this._miscLocation.getLocationByUser(this.locationCode[0]).subscribe(res=>{
      this.locationList=res as LocationModel[];
    })
  }

  getAllScheduleBillGroup(){
    this._billSchedule.getAllScheduleBillGroup().subscribe(res=>{
      this.billGroupList=res as ScheduleBillGroupModel[];
    })
  }

  getScheduleYear(){
    this._billSchedule.getScheduleYear().subscribe(res=>{
      this.scheduleYear=res as ScheduleYearModel[];
    })
  }

  getScheduleMonth(event){  
    this._billSchedule.getScheduleMonth(event).subscribe(res=>{
      this.scheduleMonth=res as ScheduleMonthModel[];
    })
  }

  startDateChange(event: Date){
    let startDate=dateFormatForDDMMYY(event);
    this.billcycleform.patchValue({
      startDate:startDate
    })
  }

  endDateChange(event: Date){
    let endDate=dateFormatForDDMMYY(event);
    this.billcycleform.patchValue({
      endDate:endDate
    })
  }

  generateDateChange(event: Date){
    let readingDate=dateFormatForDDMMYY(event);
    this.billcycleform.patchValue({
      readingDate:readingDate
    })
  }

  dueDateChange(event: Date){
    let dueDate=dateFormatForDDMMYY(event);
    this.billcycleform.patchValue({
      dueDate:dueDate
    })
  }

  billSave(){
    this._billSchedule.billScheduleSave(this.formVal).subscribe(
      (res: any) => {
        let saveData = res as any;
        
        if (saveData == 1) {
          this._toasterService.success("Bill Cycle Schedule Successfully Saved!", "Success");
          this.CreateForm();
        } 
        else {
          this._toasterService.danger("Failed To Saved!", "Error");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  reset() {
    this.billcycleform.reset();
  }

  CreateForm() {
    this.billcycleform = this._fb.group({
      locationCode: [,[]],
      billGroup: [,[]],
      billYear: [,[]],
      billMonth: [,[]],
      startDate: [,[]],
      endDate: [,[]],
      readingDate: [,[]],
      dueDate: [,[]],
      userName:[this.userName,[]],
      sDate: [,[]],
      eDate: [,[]],
      rDate: [,[]],
      dDate: [,[]],
    });
  }

  
  get f(){
    return this.billcycleform.controls;
  }
  get formVal() {
    return this.billcycleform.value;
  }


}
