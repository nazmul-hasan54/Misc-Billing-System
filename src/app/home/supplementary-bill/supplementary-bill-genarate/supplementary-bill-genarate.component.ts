import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from './../../../model/customer-details';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillReasonModel } from './../../../model/billReason.model';
import { BillReasonService } from '../../../services/bill-reason.service';
import { ImposedByModel } from '../../../model/imposedby.model';
import { LocationNameModel } from '../../../model/locationname.model';
import { Locations } from '../../../model/locations.model';
import { MinistryService } from '../../../services/ministry.service';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { SupplementaryBillGenService } from '../../../services/supplementary-bill-gen.service';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-supplementary-bill-genarate',
  templateUrl: './supplementary-bill-genarate.component.html',
  styleUrls: ['./supplementary-bill-genarate.component.scss']
})
export class SupplementaryBillGenarateComponent implements OnInit {
  supplementarybill: FormGroup;
  customerTypeList: any[] = [];
  customerCategoryList: any[] = [];
  billingReasonList: BillReasonModel[] = [];
  customerDetailsByBillNumber: CustomerDetails;
  imposedByList:ImposedByModel[]=[];
  CustomerDetails:CustomerDetails;
  isEditable:boolean=false;
  isProgress:boolean=false;
  isSaving:boolean=false;
  billNumber:string;
  minDate: Date = new Date();
  maxDate: Date = new Date();
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  fileList: any[] = [];
  fileTypes: any[] = [];
  fileNames: any[] = [];
  arrayList: any[] = [];
  consumerNumber:string='';
  meterType:string='';
  isSaveDisabled: boolean = true;
  roleName = localStorage.getItem("roleName");
  locationNamelist: LocationNameModel[] = []
  userName:string=localStorage.getItem('userName');
  locationFormSession: Locations[] = [];
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
     private _miscBillingService: MiscBillingService,
    private _supplementaryBillGen: SupplementaryBillGenService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _billReasonService: BillReasonService,
    private _ministryService: MinistryService,
    ) { }

  ngOnInit(): void {
    
    this.createForm();
    this.getImposedBy();
    this.getMiscBillReason();
    this.suplementaryConsumerLocationDes();

    if (
      this._activateRoute.snapshot.paramMap.get("billNumber") !== null &&
      this._activateRoute.snapshot.paramMap.get("customerNumber") !== null
    ) {
      let billNumber = this._activateRoute.snapshot.paramMap.get("billNumber");
      let customerNumber =
        this._activateRoute.snapshot.paramMap.get("customerNumber");
      this.getbillDetailsByBillNumbr(billNumber, customerNumber);
      this.billNumber = billNumber;
      this.isEditable = true;
      this.isSaveDisabled=false;
    }
  }


  suplementaryConsumerLocationDes() {
     this.getLocationsBySession(this.locationCodes)
     
    if (this.roleName != 'Admin' && this.locationCodes.length == 1) {
      this.f.locationCode.setValue(this.locationCodes[0])
    }
    else {
      this._miscBillingService.getAllLocation().subscribe((res) => {
        this.locationNamelist = res.data.data;

      })
    }
  }

  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService
      .getLocationsBySession(locationCodeList)
      .subscribe((res: any) => {
        this.locationFormSession = res as Locations[];

      });
  }
  getbillDetailsByBillNumbr(billNumber,customerNumber){
    this._miscBillingService.getByBillNumber(billNumber,customerNumber).subscribe((res:any)=>{
      if(res==null){
        this._toasterService.danger("Data Not Found");
        this.createForm();
        
      }
      else{
        
        this.customerDetailsByBillNumber =res as CustomerDetailsDTO;
      
      this.supplementarybill.patchValue(this.customerDetailsByBillNumber);
        let dueDate = new Date(this.customerDetailsByBillNumber.dueDate);
        this.dueDateChange(dueDate);
        let lastReadingDate = new Date(this.customerDetailsByBillNumber.lastReadingDate);
        this.dateChange(lastReadingDate);
        this.supplementarybill.patchValue({
          lDate: lastReadingDate,
          dDate: dueDate,
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
      this.supplementarybill.patchValue({
        billNumber:billNumber
      })
      }
    },er=>{
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
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
  getcustomerDetails(event) {
    if(event.key=='Enter'||event.key=='Tab'){
    if(this.f.customerNumber.value.length==8){
      this._miscBillingService.getCustomerByCustNumber(this.f.customerNumber.value, this.f.locationCode.value).subscribe((res:any)=>{
        if(res==null){
          this._toasterService.danger("Data not Found");
          this.createForm();
        }
        else{
          this.CustomerDetails=res as CustomerDetails;
          this.supplementarybill.patchValue(this.CustomerDetails);
          this.supplementarybill.patchValue({
            multypliBy: "U",
          });
        }
      },()=>{
        this._toasterService.danger("Somthing Went worng please try again!");
      })
    }
    else{
      this._toasterService.danger("Make Sure you enter Right INfo!!")
    }
  }
  }

  getMiscBillReason() {
    this._billReasonService.getSupplementaryBillReason().subscribe(
      (res) => {
        this.billingReasonList = res as BillReasonModel[];
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  calculateBill() {
    this.isProgress = true;
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
      supplymentaryAmount: this.f.supplymentaryAmount.value
    };
    this._miscBillingService.getSuplimentaryBillAmount(param).subscribe(
      (res: any) => {
        this.supplementarybill.patchValue({
          principleAmount: res.prN_AMOUNT,
          srAmount: res.sR_Amount,
          vatAmount: res.vaT_AMOUNT,
          peakAmount: res.peak_Amount,
          offPeakAmount: res.offPeak_Amount,
          totalAmount: res.prN_AMOUNT + res.vaT_AMOUNT,
        });
        this.isProgress=false;
      },
      () => {
        this._toasterService.danger("something went wrong !! please try again");
        this.isProgress=false;
      }
    );
  }

  supplementaryBillSave() {
 if(this.isEditable==false){
   if (this.supplementarybill.invalid) {
     this._toasterService.danger("Please fill all the requred field.");
     return;
   }
 }
    this.isSaving=true;
    this.supplementarybill.patchValue({
      fileList: this.arrayList,
    });
    this._supplementaryBillGen.saveSupplementaryBill(this.formVal).subscribe((res:any)=>{
      let saveData=res as any;
      if(saveData.status==1){
        this.consumerNumber = this.f.customerNumber.value;
        this.billNumber = saveData.bilL_NUM;
        this._toasterService.success("Bill Generate Successfully","Success");
        this.viewPrint();
        this.reset();
      }
      else{
        this._toasterService.danger("Failed to Save Data",'Error');
      }
      this.isSaving=false;
    },er=>{
      this._toasterService.danger(er.message);
      this.isSaving=false;
    })

  }

  resetAmount(event: any) {
    this.isSaveDisabled=true;
    if (event == 'F' || event == 'U') {
      this.supplementarybill.patchValue({
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
  }
  
  chnageAmountbyUnit(event: any) {
    this.isSaveDisabled = true;
    this.supplementarybill.patchValue({
      principleAmount: 0,
      vatAmount: 0,
      totalAmount: 0,
      peakAmount: 0,
      offPeakAmount: 0
    })
  }

  viewPrint() {
    if (this.meterType == ('01' || '03' || '04' || '11')) {

      this._router.navigate(['bill-report/suplimentary-sr', this.billNumber, this.consumerNumber])
      this.isProgress = false;
    }
    else {
      this._router.navigate(['bill-report/suplimentary-dr', this.billNumber, this.consumerNumber])
      this.isProgress = false;
    }
  }

  onFileSelected(event) {
    this.fileList = [];
    this.fileTypes = [];
    this.fileNames = [];

    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (reader: any) => {
          const base64 = reader.target.result.split(",");
          this.fileNames.push(event.target.files[i].name);
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

  dateChange(event: Date) {
    let lastReading = dateFormatForDDMMYY(event);
    this.supplementarybill.patchValue({
      lastReadingDate: lastReading
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
    this.supplementarybill.patchValue({
      dueDate:dueDate
    })
  }

  createForm() {
    this.supplementarybill = this._fb.group({
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
      multypliBy: ["U", [Validators.required]],
      penaltyUnit: [, []],
      principleAmount: [, []],
      vatAmount: [, []],
      totalAmount: [, [Validators.required]],
      remarks: [, []],
      imposedByCode: [, [Validators.required]],
      dueDate: [, []],
      dDate: [, [Validators.required]],
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
      billReasonCode:[,[Validators.required]],
      supplymentaryAmount:[,[]],
      p_USER:[this.userName,[]]
    });
  }
  reset() {   
    this.createForm();
    this.arrayList = [];
  }
  get formVal() {
    return this.supplementarybill.value;
  }

  get f() {
    return this.supplementarybill.controls;
  }

}
