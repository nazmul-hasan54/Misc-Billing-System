import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BlockNumModel } from '../../../model/temporary/blockNum.model';
import { LocationModel } from '../../../model/temporary/location.model';
import { MiscLocationService } from '../../../services/misc-location.service';

@Component({
  selector: 'ngx-mod-generate',
  templateUrl: './mod-generate.component.html',
  styleUrls: ['./mod-generate.component.scss']
})
export class ModGenerateComponent implements OnInit {

  modgenform: FormGroup;
  locationList:LocationModel[]=[];
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  Blocklist: any[]=[];



  constructor(
    private _fb: FormBuilder,
    private _miscLocation:MiscLocationService,
    private _toasterService: NbToastrService,

  ) { }

  ngOnInit(): void {
    this.CreateForm();
    this.getLocationByUser();
  }

  getcustomerDetails(event:any){

  }

  getLocationByUser(){
    this._miscLocation.getLocationByUser(this.locationCodes[0]).subscribe(res=>{
      this.locationList=res as LocationModel[];
      console.log("Location", this.locationList);
      
      this.modgenform.patchValue({
        locationCode:this.locationList[0].locationCode
      })
    })
  }

  CreateForm() {
    this.modgenform = this._fb.group({
      customerNumber: [, [Validators.required]],
      locationCode: [, [Validators.required]],
    });
  }

  get f(){
    return this.modgenform.controls;
  }
  get formVal() {
    return this.modgenform.value;
  }

}
