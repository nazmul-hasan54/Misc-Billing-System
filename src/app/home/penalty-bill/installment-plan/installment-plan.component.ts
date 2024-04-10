import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { CommonService } from '../../../services/common.service';
import { InstallmentPlanService } from '../../../services/installment-plan.service';
import { NbToastrService } from '@nebular/theme';
import { PenaltyBillGenService } from '../../../services/penalty-bill-gen.service';
import { PenaltyBillViewModel } from '../../../model/penaltyBillView.model';
import { VatLpsModel } from '../../../model/vatLps.model';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-installment-plan',
  templateUrl: './installment-plan.component.html',
  styleUrls: ['./installment-plan.component.scss']
})
export class InstallmentPlanComponent implements OnInit {
  installmentform:FormGroup;
bill:PenaltyBillViewModel;
installmentFormArray:FormArray;
totalAmount:number=0;
disableDate:Date = new Date() ;
startDate:any;
ngModelDate = new Date();
vatLpsData : VatLpsModel;

  constructor(
    private _fb: FormBuilder,
    private _router: Router,
    private _commonService: CommonService,
    private _toasterService: NbToastrService,
    private _activateRoute:ActivatedRoute,
    private _penaltyService:PenaltyBillGenService,
    private _installmentService:InstallmentPlanService

  ) { }

  ngOnInit(): void {
    this.createForm();
    
    if (this._activateRoute.snapshot.params['id'] !== undefined) {

      let billNumber = this._activateRoute.snapshot.params['id'] ;

      this._penaltyService.getPenaltyBillInstallmentPlan(billNumber).subscribe((res:any)=>{
        if(res){
          let penaltyList=res as PenaltyBillViewModel []
            penaltyList.forEach(p=>{
              this.installmentform.patchValue(p);
            })
        }
      },
      er=>{
        this._toasterService.danger("something went wrong !! please try again","Error");
        console.log("res.data",er.result);
      })
    }
  }

  get capValues(): FormArray {
    return this.installmentform.get('installmentFormArray') as FormArray;
}

get formValue() : FormArray {
  return this.installmentform.get('installmentFormArray') as FormArray;
}

getVatLps(){
  this._installmentService.getPenaltyVatLps(this.f.customerNumber.value, this.f.location.value).subscribe((res:any)=>{
    if(res){
      this.vatLpsData = res as VatLpsModel;
    }
  },
  er=>{
    this._toasterService.danger("something went wrong !! please try again","Error");
  })
}

  calculateInstallment(){
    if(this.installmentform.invalid){
      this._toasterService.danger("Please Select Required Field First");
    }
    this.installmentFormArray = this._fb.array([]);
    
    this.totalAmount=0;
    if(this.f.installNumber.value>0){

    let billAmount=this.f.principleAmount.value;
    let firstInstallAmount=Number((billAmount*Number((this.f.installmentPercn.value /100).toFixed(2))).toFixed(2));
    // let vatAmount=Number((firstInstallAmount*.05).toFixed(2));
    // let lpsAmount=Number(0);
    let vatPercent = (Number(this.vatLpsData.vatAmount));
    let lpsPercent = (Number(this.vatLpsData.lpsAmount));
    vatPercent = (vatPercent/100);
    lpsPercent = (lpsPercent/100)
    let vatAmount = Number((firstInstallAmount*vatPercent).toFixed(2));
    let lpsAmount = Number(0);
    this.totalAmount +=( firstInstallAmount+vatAmount+lpsAmount);
    this.addRow(firstInstallAmount,vatAmount,lpsAmount,1)
    for(let i=0;i<this.f.installNumber.value;i++){
      let dueAmount=billAmount-firstInstallAmount;
      let dueInstallAmount=Number((dueAmount/this.f.installNumber.value).toFixed(2)).toFixed(2);
      let duevatAmount=Number((Number(dueInstallAmount)*vatPercent).toFixed(2)).toFixed(2);
      let duelpsAmount=Number((Number(dueInstallAmount)*lpsPercent).toFixed(2)).toFixed(2);
      this.totalAmount +=Number((Number(dueInstallAmount)+Number(duevatAmount)+Number(duelpsAmount)));
      this.addRow(Number(dueInstallAmount),duevatAmount,duelpsAmount,2)
    }
 
  }
  else{
    this._toasterService.danger("Please Select Installment Number First","Error")
  }
  }

  addRow(principleAmount:any,vatAmount:any,lpsAmount:any,check:number){
    this.installmentFormArray.push(new FormGroup({
      id: new FormControl(0),
      billNumber: new FormControl(this.f.billNumber.value),
      principleAmount: new FormControl(principleAmount),
      vatAmount: new FormControl(vatAmount),
      lpsAmount: new FormControl(lpsAmount),
      totalAmount: new FormControl( Number(Number(principleAmount)+Number(lpsAmount)+Number(vatAmount)).toFixed(2)),
      dueDate: new FormControl(),
      selectDate: new FormControl(),
      check: new FormControl(check),
      installNumber:new FormControl(this.f.installNumber.value),
      installmentPercn:new FormControl(this.f.installmentPercn.value),
      remarks:new FormControl(''),
      userName:new FormControl(this.f.userName.value),
    }))
  }

  modelChangeFn(event:any,i:number){
    

    this.disableDate = this.installmentFormArray.controls[i].value.selectDate;
    this.startDate=event;
    let t=this.installmentFormArray.controls[i].get('selectDate').value
    let timeConvert=dateFormatForDDMMYY(event);
    this.installmentFormArray.controls[i].patchValue({
      dueDate:timeConvert
    });

  }
  saveInstallment(){
    this._installmentService.saveInstallmentPlan(this.detailsFormAllVal).subscribe((res:any)=>{
      if(res.status){
        this._toasterService.success(res.result,"Success");
        this._router.navigate(['/bill/penaltybill-view']);
      }
      else{
        this._toasterService.danger(res.result,"Failed");

      }
    },er=>{
      this._toasterService.danger(er.message,"Error")
    })
  }

  createForm() {
    this.installmentform = this._fb.group({
      customerNumber:[,[]],
      location: ['',[]],
      locationCode: ['',[]],
      address: ['',[]],
      customerName: ['',[]],
      tariff: ['',[]],
      billNumber: ['',[]],
      billAmount: [0,[]], 
      principleAmount: [0,[]], 
      installmentPercn:[50,[Validators.required]],
      installNumber: [, [Validators.required]],
      userName:[this.userName,[]],
    })
    this.installmentFormArray = this._fb.array([]);
  }
  userName:string=localStorage.getItem("userName");
  
  get formVal(){
    return this.installmentform.value;
  }

  get f(){
    return this.installmentform.controls;
  }
  get detailsFormAllVal() {
    return this.installmentFormArray.value;
  }

  
}
