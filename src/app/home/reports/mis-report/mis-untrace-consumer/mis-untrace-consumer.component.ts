import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MisUntraceConsumerService } from '../../../../services/pdfGenerate/mis-report/mis-untrace-consumer.service';
import { DatePipe } from '@angular/common';
import { Locations } from '../../../../model/locations.model';
import { NewUserByCenterLocationService } from '../../../../services/new-user-by-center-location.service';
import { MisReportService } from '../../../../services/mis-report.service';

@Component({
  selector: 'ngx-mis-untrace-consumer',
  templateUrl: './mis-untrace-consumer.component.html',
  styleUrls: ['./mis-untrace-consumer.component.scss']
})
export class MisUntraceConsumerComponent implements OnInit {
  misUntraceConsumerForm:FormGroup;
  isTrue:boolean=false;
  report:any;
  isProgress:boolean=false;
  submitted:boolean=false;
  docData:any;
  documentTitle="";
  allCenter:any;
  patchLocation: any[] = [];
  locationData: Locations[] = [];
  selectedLocation: any[] = [];
  
  constructor(
    private _fb:FormBuilder,
    private _pdfService:MisUntraceConsumerService,
    private datePipe: DatePipe,
    private _getCenterService: NewUserByCenterLocationService,
    private _service: MisReportService,
    
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllCenterDD();
  }

  createForm(){
    this.misUntraceConsumerForm=this._fb.group({
      billMonth:[,[Validators.required]],
      centerName:[[],[Validators.required]],
      location: [[], []],
    })
  }
  get f(){
    return this.misUntraceConsumerForm.controls;
  }
  get formVal(){
    return this.misUntraceConsumerForm.value;
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }


  private getAllCenterDD() {
    this._service.getAllCenter().subscribe((response) => {
      this.allCenter = response;
    });
  }

  private getAllLocationDD(dbCode:any) {
    this._service.getAllLocationByMultipleCenter(dbCode).subscribe((response:any) => {
      this.locationData = response;
    });
  } 
  
  onSelect(data) {
    if(data.length == 0){
      this.misUntraceConsumerForm.patchValue({
        location: [],
      });
      this.patchLocation = [];
      this.locationData = [];
      this.selectedLocation = [];
    }
    this.patchLocation = [];
     this._service.getAllLocationByMultipleCenter(data).subscribe((response:any) => {
      this.locationData = response as Locations[];
      const filteredArray = this.locationData?.filter(value => this.selectedLocation.includes(value.id));
        this.selectedLocation = [];
        this.selectedLocation = filteredArray.map(a => a.id);
        this.selectedLocation?.forEach((item) => {
          this.locationData?.forEach((lData) => {
            if (item === lData.id) {
              this.patchLocation.push(lData.id);
            }
          });
        });
    
    });
    // this.getBillGroupDD(this.formVal.centerName,this.formVal.location);
    // this.getLocationBookDD(this.formVal.centerName,this.formVal.location.length > 0 ? this.formVal.location : null ,this.formVal.billGroupId ? this.formVal.billGroupId : "0");
  }

  onReport(){
    let utilityObj = {
      billMonth: this.datePipe.transform(this.f.billMonth.value, "yMM"),
    };

    this.docData = this._pdfService.generatePdf(this.f.billMonth.value,utilityObj);
        this.docData.getBase64((base64Data) => {
        this.report = base64Data;
        this.documentTitle = this.docData.docDefinition.info.title;
  })
  }
}
