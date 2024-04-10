import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BillCycleModel } from '../../../model/temporary/billCycle.model';
import { BillCycleService } from '../../../services/bill-cycle.service';
import { MrsGenarateModel } from '../../../model/temporary/mrsGenarate.model';
import { MrsGenerateService } from '../../../services/mrs-generate.service';
import { NbToastrService } from '@nebular/theme';
import { TemporaryBillService } from '../../../services/temporary-bill.service';

@Component({
  selector: 'ngx-temporary-bill-mrsgenarate',
  templateUrl: './temporary-bill-mrsgenarate.component.html',
  styleUrls: ['./temporary-bill-mrsgenarate.component.scss']
})
export class TemporaryBillMrsgenarateComponent implements OnInit {

  temporarybillprint: FormGroup;
  billMonthList: any[] = [];
  mrsGenerateList: MrsGenarateModel[] = [];
  mrsArrayForm: FormArray;
  mrsCalculationList: any[] = [];
  locationList = localStorage.getItem('locationCodeList');
  locationCode = this.locationList.split(",");
  isShow:boolean=false;
  isShowList:boolean=false;
  userName:string=localStorage.getItem("userName");
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _temporaryService: TemporaryBillService,
    private _billcycleService:BillCycleService,
    private _mrsGernerateService:MrsGenerateService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getBillCylceCode();
  }

  getBillCylceCode() {
    this._billcycleService.getAllBillCycle().subscribe(res => {
      this.billMonthList = res as BillCycleModel[];
    })
  }

  generateMrs() {
    this.mrsArrayForm = this._fb.array([]);
    this._mrsGernerateService.getMrsGenarateByCustomer(this.locationCode[0], this.f.customerNumber.value, this.f.billMonth.value).subscribe(res => {
      this.mrsGenerateList = res as MrsGenarateModel[];
      if(this.mrsGenerateList.length>0) this.isShow=true;
      this.addRow(this.mrsGenerateList, this.f.billMonth.value);
    })
  }
  claculateUserUnit(event: any, index: number) {
    let presentReading = Number(this.detailsFormVal(index, "presentReading"));
    let openReading = Number(this.detailsFormVal(index, "openReading"));
    let userUnit = (presentReading - openReading).toString();
    this.mrsArrayForm.controls[index].patchValue({
      advance: userUnit
    });

  }

  cencusBillPrint(){
    this._router.navigate(['bill-report/cencus-bill-print',this.locationCode[0],this.f.customerNumber.value,this.mrsCalculationList[0].columnValue]);
  }
  saveMRS() {
    let msrSaveList = this.detailsFormAllVal as MrsGenarateModel[];

    this._mrsGernerateService.saveMrsGenerate(msrSaveList).subscribe(res => {
      if (res) {
        this._toasterService.success("Save Successfully", "Success");
        this.isShow = false;
        this.mrsArrayForm = this._fb.array([]);

      }
      else {
        this._toasterService.danger("Failed To Save", "Error");
      }

    }, er => {
      this._toasterService.danger("Something Went Wrong Please Try Again!", "Error");
    })

  }

  reset() {
    this.temporarybillprint.reset();
  }

  calculateMrs(){
    this._mrsGernerateService.getMrsBillCalculation(this.locationCode[0],this.f.customerNumber.value,this.f.billMonth.value).subscribe(res=>{
      this.mrsCalculationList = res as any[];
      this.isShowList=true;
    });
  }

  addRow(mrsGenerateList: MrsGenarateModel[], billCycleCode) {
    mrsGenerateList.forEach(p => {
      this.mrsArrayForm.push(new FormGroup({
        customerNum: new FormControl(p.customerNum),
        advance: new FormControl(p.advance),
        custId: new FormControl(p.custId),
        customerName: new FormControl(p.customerName),
        meterCondition: new FormControl(p.meterCondition),
        meterNumber: new FormControl(p.meterNumber),
        meterReadingId: new FormControl(p.meterReadingId),
        openReading: new FormControl(p.openReading),
        powerFactor: new FormControl(p.powerFactor),
        presentReading: new FormControl(p.presentReading),
        readingDescr: new FormControl(p.readingDescr),
        readingId: new FormControl(p.readingId),
        readingTypeCode: new FormControl(p.readingTypeCode),
        status: new FormControl(p.status),
        timeCycleCode: new FormControl(p.timeCycleCode),
        timeCycleDesc: new FormControl(p.timeCycleDesc),
        todCode: new FormControl(p.todCode),
        todDesc: new FormControl(p.todDesc),
        walkSequence: new FormControl(p.walkSequence),
        billCycleCode: new FormControl(billCycleCode),
        userName:new FormControl(this.f.userName.value),
      }))
    })

  }
  createForm() {
    this.temporarybillprint = this._fb.group({
      customerNumber: [, [Validators.required]],
      billMonth: [, [Validators.required]],
      locationCode: [, []],
      userName:[this.userName,[]],
    });
    this.mrsArrayForm = this._fb.array([]);
  }

  get f() {
    return this.temporarybillprint.controls;
  }
  get formVal() {
    return this.temporarybillprint.value;
  }
  get detailsFormAllVal() {
    return this.mrsArrayForm.value;
  }
  detailsFormVal(index, fieldName) {
    return this.mrsArrayForm.controls[index].get(fieldName).value;
  }

}
