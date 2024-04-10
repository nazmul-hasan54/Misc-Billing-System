import { ActivatedRoute, Router } from "@angular/router";
import { Component, OnInit } from "@angular/core";
import { Console, log } from 'console';
import {
  CustomerDetails,
  CustomerDetailsDTO,
} from "../../../model/customer-details";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbDateService, NbToastrService } from "@nebular/theme";
import { data, param } from 'jquery';

import { BillReasonModel } from "../../../model/billReason.model";
import { BillReasonService } from "../../../services/bill-reason.service";
import { CustomerCategoryModel } from "../../../model/customerCategory.model";
import { CustomerService } from "../../../services/customer.service";
import { CustomerTypeModel } from "../../../model/customerType.model";
import { DatePipe } from '@angular/common';
import { ImposedByModel } from "../../../model/imposedby.model";
import { LocationNameModel } from "../../../model/locationname.model";
import { Locations } from "../../../model/locations.model";
import { MinistryService } from "../../../services/ministry.service";
import { MiscBillingService } from "../../../services/misc-billing.service";
import { PenaltyBillGenService } from "../../../services/penalty-bill-gen.service";
import { dateFormatForDDMMYY } from "../../../@core/utils/utiliy";

@Component({
  selector: "ngx-pending-bill-generate",
  templateUrl: "./pending-bill-generate.component.html",
  styleUrls: ["./pending-bill-generate.component.scss"],
  providers: [DatePipe]
})


export class PendingBillGenerateComponent implements OnInit {
  beillGenerate: FormGroup;
  customerTypeList: CustomerTypeModel[] = [];
  customerCategoryList: CustomerCategoryModel[] = [];
  billingReasonList: BillReasonModel[] = [];
  imposedByList: ImposedByModel[] = [];
  customerDetails: CustomerDetails;
  isEditable: boolean = false;
  billNumber: string;
  locationCode:string;
  fileList: any[] = [];
  fileTypes: any[] = [];
  fileNames: any[] = [];
  arrayList: any[] = [];
  isProgress:boolean=false;
  isSaving:boolean=false;
  minDate: Date = new Date();
  maxDate:Date=new Date();
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  consumerNumber:string='';
  meterType:string='';
   isSaveDisabled:boolean=true;
  locationFormSession: Locations[] = [];
  roleName = localStorage.getItem("roleName");
  locationlist:any;
  locationNamelist: LocationNameModel[] = []
  isAdmin: boolean = false;
  userName:string=localStorage.getItem("userName")
  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _toasterService: NbToastrService,
    private _miscBillingService: MiscBillingService,
    private _penaltyBillGen: PenaltyBillGenService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _dateService: NbDateService<Date>,
    private _billReasonService:BillReasonService,
    private _datepipe: DatePipe,
     private _ministryService: MinistryService,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getMiscBillReason();
    this.getImposedBy();
    this.penaltyConsumerLocationDes();
    //this.getAllLocations();
    if (
      this._activateRoute.snapshot.paramMap.get("billNumber") !== null &&
      this._activateRoute.snapshot.paramMap.get("customerNumber") !== null
    ) {
      let billNumber = this._activateRoute.snapshot.paramMap.get("billNumber");
      console.log(billNumber);
      let customerNumber =
        this._activateRoute.snapshot.paramMap.get("customerNumber");
      this.getbillDetailsByBillNumbr(billNumber, customerNumber);
      this.billNumber = billNumber;
      this.isEditable = true;
      this.isSaveDisabled=false;
    }
  }

  getbillDetailsByBillNumbr(billNumber,customerNumber){
    this._miscBillingService.getByBillNumber(billNumber,customerNumber).subscribe((res:any)=>{
      if(res==null){
        this.createForm();
        
      }
      else{
        
        this.customerDetails = res as CustomerDetailsDTO;
        this.beillGenerate.patchValue(this.customerDetails);
     
        const inputDate = new Date(this.customerDetails.dueDate);
        this.dueDateChange(inputDate);
        const readingDate=new Date(this.customerDetails.lastReadingDate);
        this.dateChange(readingDate);
        this.beillGenerate.patchValue({
          lDate: readingDate,
          dDate: inputDate,
          
        }) 
      let t=res.fileList as any[];
      t.forEach(e=>{
        this.fileList.push(e.fileList) ;
        this.fileTypes.push(e.fileNames) ;
        this.fileNames.push( e.fileTypes);
        
        const param = {
          fileList: this.fileList ,
          fileTypes: this.fileNames ,
          fileNames: this.fileTypes 
        };
        this.arrayList.push(param);
      }) 
      this.beillGenerate.patchValue({
        billNumber:billNumber
        
      })
      }

    },er=>{
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }

 

  penaltyConsumerLocationDes() {
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName != 'Admin' && this.locationCodes.length == 1) {
      this.f.locationCode.setValue(this.locationCodes[0])
    }
     
    else {
      
      this.getAllLocations();
    }
  }

  getAllLocations(){
    this._miscBillingService.getAllLocation().subscribe((res)=>{
      this.locationNamelist = res.data.data;
      
    })
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }


  getcustomerDetails(event) {
    if (event.key == "Enter" || event.key == "Tab") {
      if (this.f.customerNumber.value.length == 8) {
        this._miscBillingService
          .getCustomerByCustNumber(this.f.customerNumber.value, this.f.locationCode.value)
          .subscribe(
            (res: any) => {
              if (res == null) {
                this._toasterService.danger("Data Not Found");
                this.createForm();
              } else {
                this.customerDetails = res as CustomerDetails;
                this.beillGenerate.patchValue(this.customerDetails);
                this.beillGenerate.patchValue({
                  multypliBy: "3",
                // locationName: this.customerDetails.locationName,
                  
                });
               
              }
            },
            (er) => {
              this._toasterService.danger(
                "Something Is Wrong Please Try Again !!"
              );
            }
          );
      } else {
        this._toasterService.danger("Make Sure You Enter Right Info !!");
      }
    }
  }
  getImposedBy() {
    this._miscBillingService.getImposedBy().subscribe(
      (res) => {
        if ((res.data as any[]).length > 0) {
          this.imposedByList = res.data as ImposedByModel[];
        } else {
          this._toasterService.danger("Data Not Found");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  chnageAmountbyUnit(event:any){
     this.isSaveDisabled = true;
      this.beillGenerate.patchValue({
        principleAmount: null,
        vatAmount: null,
        totalAmount:null,
        peakAmount: null,
        offPeakAmount: null
      })
  }
  resetAmount(event:any){ 
    this.isSaveDisabled = true;
    if (event== 'F' || event == 2 || event == 3){
      this.beillGenerate.patchValue({
        penaltyUnit: null,
        principleAmount : null,
         vatAmount:  null,
         totalAmount:null,
         offPeakUnit:null,
        peakUnit:null,
        peakAmount: null,
        offPeakAmount:null
         
      })
    }
  }

  changeAmount(event: any) {
    this.isSaveDisabled = true;
      this.beillGenerate.patchValue({
        penaltyUnit: null,
        principleAmount: null,
        vatAmount: null,
        totalAmount: null,
        offPeakUnit: null,
        peakUnit: null,
        peakAmount: null,
        offPeakAmount: null

      })
    
  }
  getMiscBillReason() {
    this._billReasonService.getPenaltyBillReason().subscribe(
      (res) => {
          this.billingReasonList = res as BillReasonModel[];
        
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  getCustomerType() {
    this._customerService.getCustomerTypeforBillGenerate().subscribe(
      (res) => {
        if ((res.data as any[]).length > 0) {
          this.customerTypeList = res.data as any[];
        } else {
          this._toasterService.danger("No Data Found");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  getCustomerCategory() {
    this._customerService.getCustomerCategoryForBillGeneration().subscribe(
      (res) => {
        if ((res.data as any[]).length > 0) {
          this.customerCategoryList = res.data as any[];
        } else {
          this._toasterService.danger("No Data Found");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  calculateBill() {
    this.isProgress=true;
    this.isSaveDisabled=false;
    const param = {
      customerNumber: this.f.customerNumber.value,
      multypliBy: this.f.multypliBy.value,
      penaltyUnit: this.f.penaltyUnit.value,
      tariffDesc: this.f.tariffDesc.value,
      locationCode: this.f.locationCode.value,
      p_USER: this.f.p_USER.value,
      peakUnit: this.f.peakUnit.value,
      offPeakUnit: this.f.offPeakUnit.value,
      principleAmount: this.f.principleAmount.value,
      billReasonCode: this.f.billReasonCode.value,
    };
    this._miscBillingService.getCalculateBill(param).subscribe(
      (res: any) => {
        this.beillGenerate.patchValue({
          principleAmount: res.prN_AMOUNT,
          srAmount: res.sR_Amount,
          vatAmount: res.vaT_AMOUNT,
          peakAmount: res.peak_Amount,
          offPeakAmount: res.offPeak_Amount,
          totalAmount: res.prN_AMOUNT + res.vaT_AMOUNT,
        });
      
       

        this.isProgress=false;
        
      },
      (er) => {
        this._toasterService.danger("something went wrong !! please try again");
        this.isProgress=false;
      }
    );
  }
  totalAmountCalculate(event) {
    if (event.key == "Enter" || event.key == "Tab") {
      this.calculateBill();
    }
  }
  penaltyBillSave() {
    if (this.isEditable==false){
      if (this.beillGenerate.invalid) {
        this._toasterService.danger("Please fill all the requered field.");
        return;
      }
    }
    
    this.isSaving=true;
    
    this.beillGenerate.patchValue({
      fileList: this.arrayList,
    });
    this._penaltyBillGen.savePenaltyBill(this.formVal).subscribe(
      (res: any) => {
        let saveData = res as any;
        if (saveData.status == 1) {
          this.isSaving = false;
          this.isProgress = false;
          this._toasterService.success("Bill Generate Successfully", "Success"); 
          this.meterType = this.f.meterTypeCode.value;
          this.consumerNumber = this.f.customerNumber.value;
          this.billNumber = saveData.bilL_NUM;     
          this.viewPrint();
         this.reset();
       
        } else {
          this._toasterService.danger("Failed To Saved ", "Error");
          this.isSaving=false;
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
        this.isSaving=false;
      }
    );
  }
  viewPrint(){
    debugger
    if(this.meterType==('01' || '03' || '04' || '11')){
      
      this._router.navigate(['bill-report/penalty-billsr', this.billNumber, this.consumerNumber]);
      this.isProgress=false;

    }
    else{
      this._router.navigate(['bill-report/penalty-billdr', this.billNumber, this.consumerNumber])
      this.isProgress=false;
    }
 
  }
  dateChange(event: Date) {
    let lastReadingDate = dateFormatForDDMMYY(event);
    this.beillGenerate.patchValue({
      lastReadingDate: lastReadingDate
    })   
    this.minDate = event;
    if (this.f.billNumber.value == null) {
      this.minDate.setDate(this.minDate.getDate() + 1);
    }
    else {
      this.minDate.setDate(this.minDate.getDate());
    }
  }

  dueDateChange(event: Date){
    let dueDate=dateFormatForDDMMYY(event);
    this.beillGenerate.patchValue({
      dueDate:dueDate
    })
  }
  
  createForm() {
    this.beillGenerate = this._fb.group({
      // billMonth:[dateFormatForReport(new Date()),[Validators.required]],
      areaCode: [, []],
      businessType: [, []],
      custId: [, []],
      customerName: [, []],
      locationCode: [, []],
      locationName: [, []],
      meterNum: [, []],
      meterTypeDesc: [, []],
      prvAcNo: [, []],
      tariffId: [, []],
      tariffDesc: [, []],
      customerNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{8}$")]],
      customerAddr: [, []],
      nidNumber: [, [Validators.required, Validators.pattern("^[0-9]*$"), Validators.minLength(10), Validators.maxLength(16)]],
      mobileNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$"), Validators.maxLength(11)]],
      meterCondition: [, []],
      lastReading: [, []],
      multypliBy: ["3", [Validators.required]],
      penaltyUnit: [, []],
      principleAmount: [, []],
      vatAmount: [, []],
      totalAmount: [, [Validators.required]],
      billReasonCode: [, [Validators.required]],
      imposedByCode: [, [Validators.required]],
      dueDate: [, []],
      meterTypeCode: ["01", []],
      lastReadingOffPeak: [, []],
      lastReadingPeak: [, []],
      offPeakUnit: [, []],
      peakUnit: [, []],
      meterConditionCode: [, []],
      meterConditionDesc: [, []],
      businessTypeCode: [, []],
      billNumber: [, []],
      fileList: [this.arrayList, []],
      peakAmount: [, []],
      offPeakAmount: [, []],
      srAmount: [, []],
      lastReadingDate: [, []],
      lDate: [, []],
      dDate: [, [Validators.required]],
      p_USER:[this.userName,[]]
    });
  }
  reset() {
    this.createForm();
    this.arrayList = [];
  }
  get formVal() {
    return this.beillGenerate.value;
  }

  get f() {
    return this.beillGenerate.controls;
  }

  /* File Save Start */

  onFileSelected(event) {
    this.fileList = [];
    this.fileTypes = [];
    this.fileNames = [];

    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (reader: any) => {
          const result = reader.target.result;
          const base64 = reader.target.result.split(",");
          
          this.fileNames.push(event.target.files[i].name);
          console.log("")
          this.fileTypes.push(base64[0]);
          this.fileList.push(base64[1]);

          const param = {
            fileList: this.fileList,
            fileTypes: this.fileTypes,
            fileNames: this.fileNames,
          };
          this.arrayList.push(param);

          this.fileList = [];
          this.fileTypes = [];
          this.fileNames = [];
        };
      }
    }
  }

  fileDownload(id) {
    let fullFIle =
      this.arrayList[id].fileTypes[0] + "," + this.arrayList[id].fileList[0];

    let a = document.createElement("a");
    a.download = `${this.arrayList[id].fileNames[0]}`;
    a.href = fullFIle;
    a.click();
  }

  fileDelete(id) {
    this.arrayList.splice(id, 1);
  }

  /* File Save End */
}
