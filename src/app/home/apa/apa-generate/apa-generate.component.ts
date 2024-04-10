import { Component, OnInit } from "@angular/core";
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";

import { ActivitiesModel } from "../../../model/apa/activities.model";
import { ApaFormModel } from "../../../model/apa/apa-form.model";
import { ApaService } from "../../../services/apa.service";
import { DatePipe } from "@angular/common";
import { NbToastrService } from "@nebular/theme";
import { PerformanceModel } from "../../../model/apa/performance.model";
import { StratigicModel } from "../../../model/apa/stratigic-objectives.model";
import { UITModel } from "../../../model/apa/unit-index-target.model";
import { UnitModel } from "../../../model/apa/unit.model";
import { param } from "jquery";

@Component({
  selector: "ngx-apa-generate",
  templateUrl: "./apa-generate.component.html",
  styleUrls: ["./apa-generate.component.scss"],
})
export class ApaGenerateComponent implements OnInit {

  apaGenerateForm: FormGroup;
  apaFormArray: FormArray;
  apaGenerateList: any[] = [];
  strategicList: StratigicModel[] = [];
  programList: ActivitiesModel[] = [];
  performanceList: PerformanceModel[] = [];
  unitList: UnitModel[] = [];
  achievementList: any[] = [];
  uitList: UITModel;
  apaId:number;
  isUpdate: boolean = false;
  billChangedMonth: string;
  


  constructor(
    private _fb: FormBuilder,
    private _apaService: ApaService,
    private _toasterService: NbToastrService,
    private datePipe: DatePipe
    ) {}

  ngOnInit(): void {
    this.createForm();
    this.getStrategicList();
    this.getUnitList();
  }

  getStrategicList() {
    this._apaService.getStrategicList().subscribe((res) => {
      this.strategicList = res as StratigicModel[];
    });
  }

  getProgramList(event: string) {
    this._apaService.getProgramList(event).subscribe((res) => {
      this.programList = res as ActivitiesModel[];
    });
  }

  getUnitIndexTarget(event:string){
    this._apaService.getUnitIndexTarget(event).subscribe((res) => {
      this.uitList = res as UITModel;
      
      this.apaGenerateForm.patchValue({
        unitCode: this.uitList.unitCode,
        unitName: this.uitList.unitName,
        indexName: this.uitList.indexName,
        targetName: this.uitList.target,
        performanceName: this.uitList.performanceName,
      });
    });
  }
  
  getPerformanceList(event: string) {
    this._apaService.getPerformanceList(event).subscribe((res) => {
      this.performanceList = res as PerformanceModel[];
    });
  }

  getUnitList() {
    this._apaService.getUnitList().subscribe((res) => {
      this.unitList = res as UnitModel[];
    });
  }
  

  save() {
    this._apaService.apaSave(this.apaFormArray.value).subscribe(
      (res: any) => {        
        if (res.status) {
          this._toasterService.success("APA Generate Successfully Saved!", "Success");
          this.createForm();
        } 
        else {
          this._toasterService.danger("Failed To Saved ", "Error");
        }      
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }

  refresh() {
    this.createForm();
  }


  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }

  addAcheivement() {
    this.apaFormArray.push(new FormGroup({
      stratigicCode  : new FormControl(this.f.stratigicCode.value),
      programCode    : new FormControl(this.f.programCode.value),
      performanceCode: new FormControl(this.f.performanceCode.value),
      performanceName: new FormControl(this.f.performanceName.value),
      unitCode       : new FormControl(this.f.unitCode.value),
      unitName       : new FormControl(this.f.unitName.value),
      indexName      : new FormControl(this.f.indexName.value),
      targetName     : new FormControl(this.f.targetName.value),
      billMonth      : new FormControl(this.f.billMonth.value),
      financialAmount: new FormControl(this.f.financialAmount.value),
      comments       : new FormControl(this.f.comments.value),
    }));

    this.apaGenerateForm.patchValue({
      stratigicCode  : '',
      programCode    : '',
      performanceCode: '',
      unitCode       : '',
      indexName      : '',
      targetName     : '',
      bMonth         : '',
      financialAmount: '',
      comments       : '',
    });

  }

  editAcheivement(item,id){
    this.apaId=id;    
    this.isUpdate=true;
    this.apaGenerateForm.patchValue({
      stratigicCode  : item.stratigicCode,
      programCode    : item.programCode,
      performanceCode: item.performanceCode,
      unitCode       : item.unitCode,
      indexName      : item.indexName,
      targetName     : item.targetName,
      bMonth         : item.billMonth,
      financialAmount: item.financialAmount,
      comments       : item.comments,
    });
    this.apaFormArray.removeAt(id);
  }

  updateAcheivement(){
    this.apaGenerateForm.patchValue({
      stratigicCode  : '',
      programCode    : '',
      performanceCode: '',
      unitCode       : '',
      indexName      : '',
      targetName     : '',
      bMonth         : '',
      financialAmount: '',
      comments       : '',
    });

    this.isUpdate=false;
  }

  deleteAcheivement(id:number) {
    this.apaFormArray.removeAt(id);
  }

  dateChange(event:Date){
    this.apaGenerateForm.patchValue({
      billMonth: this.datePipe.transform(event, 'yMM'),
    })
  }

  createForm() {
    this.apaGenerateForm = this._fb.group({
      stratigicCode: [, []],
      programCode: [, []],
      performanceCode: [, []],
      performanceName: [, []],
      unitCode: [, []],
      unitName: [, []],
      indexName: [, []],
      targetName: [, []],
      billMonth: [, []],
      bMonth: [, []],
      financialAmount: [, []],
      comments: [, []],
    });
    this.apaFormArray=this._fb.array([]);
  }
  get f() {
    return this.apaGenerateForm.controls;
  }

  get formval() {
    return this.apaGenerateForm.value;
  }
}
