import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { ReligiousSetupService } from '../../../../services/religious-setup.service';

@Component({
  selector: 'ngx-religious-setup-generate',
  templateUrl: './religious-setup-generate.component.html',
  styleUrls: ['./religious-setup-generate.component.scss']
})
export class ReligiousSetupGenerateComponent implements OnInit {

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  religiousSetupForm: FormGroup;
  userName: string;
  constructor(
    private _fb: FormBuilder,
    private _religiousSetup: ReligiousSetupService,
    private _toasterService: NbToastrService,
    private _datePipe: DatePipe
  ) { 
    this.userName = localStorage.getItem('userName');
  }

  ngOnInit(): void {
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.createForm();
  }

  createForm(){
    this.religiousSetupForm = this._fb.group({
      fromMonth: ['', [Validators.required]],
      toMonth: ['', [Validators.required]],
      user: [this.userName]
    });
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  onSubmit(){
    let obj = {
      fromMonth: this._datePipe.transform(this.formCon.fromMonth.value, 'yMM'),
      toMonth: this._datePipe.transform(this.formCon.toMonth.value, 'yMM'),
      user: this.formCon.user.value
    }
    this._religiousSetup.saveReligiousSetup(obj).subscribe((res: any) => {
      if(res.status){
        this._toasterService.success("Religious Setup Saved Successfully!!");
        this.createForm();
      }else{
        this._toasterService.danger("Failed to Saved!!");
      }
    });
  }

  get formVal(){
    return this.religiousSetupForm.value;
  }

  get formCon(){
    return this.religiousSetupForm.controls;
  }

}
