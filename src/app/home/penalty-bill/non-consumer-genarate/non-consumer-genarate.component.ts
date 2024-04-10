import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CustomerDetails, CustomerDetailsDTO } from '../../../model/customer-details';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BillReasonModel } from '../../../model/billReason.model';
import { BillReasonService } from '../../../services/bill-reason.service';
import { CustomerService } from '../../../services/customer.service';
import { CustomerTarrif } from '../../../model/customer-tarrif';
import { ImposedByModel } from '../../../model/imposedby.model';
import { LocationNameModel } from '../../../model/locationname.model';
import { Locations } from '../../../model/locations.model';
import { MinistryService } from '../../../services/ministry.service';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { NbToastrService } from '@nebular/theme';
import { NonconsumerPenaltyBillService } from '../../../services/nonconsumer-penalty-bill.service';
import { TariffModel } from '../../../model/temporary/tariff.model';
import { TarrifService } from '../../../services/tarrif.service';
import { dateFormatForDDMMYY } from '../../../@core/utils/utiliy';
import { log } from 'console';

@Component({
  selector: 'ngx-non-consumer-genarate',
  templateUrl: './non-consumer-genarate.component.html',
  styleUrls: ['./non-consumer-genarate.component.scss']
})
export class NonConsumerGenarateComponent implements OnInit {

  nonconsumerbill: FormGroup;
  nonconsumerlist: any[] = [];
  billingReasonList: any[] = [];
  imposedByList: any[] = [];
  isEditable: boolean = false;
  billNumber: string;
  tarrifList: any[] = [];

  consumerNumber: string = '';
  meterType: string = '';
  roleName = localStorage.getItem("roleName");
  locationNamelist:LocationNameModel[]=[]
  customerDetails: CustomerDetails;
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  fileList: any[] = [];
  fileTypes: any[] = [];
  arrayList: any[] = [];
  fileNames: any[] = [];
  isProgress: boolean = false;
  isSaving: boolean = false;
  minDate: Date = new Date();
  isSaveDisabled: boolean = true;
 locationList = localStorage.getItem('locationCodeList');
 locationCode = this.locationList.split(",");
 userName:string=localStorage.getItem("userName");
 codeWiseloclist:any[]
  locationFormSession: Locations[] = [];
 
  constructor(
    private _fb: FormBuilder,
    private _customerService: CustomerService,
    private _toasterService: NbToastrService,
    private _miscBillingService: MiscBillingService,
    private _penaltyBillGen: NonconsumerPenaltyBillService,
    private _router: Router,
    private _activateRoute: ActivatedRoute,
    private _billReasonService:BillReasonService,
    private _tarrifService:TarrifService,
   private _ministryService: MinistryService,
    ) { }

  ngOnInit(): void {
    this.createForm();
    if(this.roleName!='Admin'){
      let locationList = localStorage.getItem('locationCodeList')
      let locationCodeList = locationList.split(",")
      this.nonconsumerbill.patchValue({
        locationCode: locationCodeList[0],

      });
    }
    
   
    this.nonConsumerLocationDes();
   this.getImposedBy();
   this.getMiscBillReason();
   this.getCustomerTarrifDetails();
    this.penaltyNonConsumerLocationDes();
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

  penaltyNonConsumerLocationDes() {
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName != "Admin")
      this._miscBillingService.PenaltyCustLocationName(this.locationCodes[0]).subscribe((res) => {
        this.locationNamelist = res as LocationNameModel[];
        this.nonconsumerbill.patchValue({
          locationName: this.locationNamelist[0].locationName
        })

      })
    else {
    
       
      this.getAllLocations();
    }
  }

  getAllLocations() {
    this._miscBillingService.getAllLocation().subscribe((res) => {
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

  // getlocationCodewiseDesc(){
  //   this._miscBillingService.PenaltyCustLocationName(this.f.locationCode.value).subscribe((res=>{
  //     this.codeWiseloclist=res as any;
  //   }))
  // }

  getbillDetailsByBillNumbr(billNumber, customerNumber) {
    this._miscBillingService.getNonCustomerByBillAndCustomerNumber(billNumber, customerNumber).subscribe((res: any) => {
      if (res == null) {
        this._toasterService.danger("Data Not Found");
        this.createForm();

      }
      else {

        this.customerDetails = res as CustomerDetailsDTO;
        this.nonconsumerbill.patchValue(this.customerDetails);
        const inputDate = new Date(this.customerDetails.dueDate);
        this.dueDateChange(inputDate);
        this.nonconsumerbill.patchValue({
          dDate: inputDate
        })
        let t = res.fileList as any[];
        t.forEach(e => {
          this.fileList.push(e.fileList);
          this.fileTypes.push(e.fileNames);
          this.fileNames.push(e.fileTypes);

          const param = {
            fileList: this.fileList,
            fileTypes: this.fileNames,
            fileNames: this.fileTypes
          };
          this.arrayList.push(param);
        })
        this.nonconsumerbill.patchValue({
          billNumber: billNumber
        })
      }

    }, er => {
      this._toasterService.danger("Something Is Wrong Please Try Again !!");
    })
  }

  getcustomerDetails(event) {
    if (event.key == "Enter" || event.key == "Tab") {
      if (this.f.customerNumber.value.length == 8) {
        this._miscBillingService
          .getCustomerByCustNumber(this.f.customerNumber.value,this.locationCodes[0])
          .subscribe(
            (res: any) => {
              if (res == null) {
                this._toasterService.danger("Data Not Found");
                this.createForm();
              } else {
                this.customerDetails = res as CustomerDetails;
                this.nonconsumerbill.patchValue(this.customerDetails);
                this.nonconsumerbill.patchValue({
                  multypliBy: "3",
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

  dueDateChange(event: Date) {
    let dueDate = dateFormatForDDMMYY(event);
    this.nonconsumerbill.patchValue({
      dueDate: dueDate
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
  getMiscBillReason() {
    this._billReasonService.getNonCustPenaltyBillReason().subscribe(
      (res) => {
        
          this.billingReasonList = (res as BillReasonModel[]);
       
      },
      (er) => {
        this._toasterService.danger(er.message);
      }
    );
  }
  getCustomerTarrifDetails(){
  
    this._tarrifService.getAllNonCustTarrif(this.locationCode[0]).subscribe(
      (res:any)=>{
          this.tarrifList = (res as TariffModel[] );
        
      },
      (er)=>{
        this._toasterService.danger(er.message);
      }
    );
  }

  calculateBill() {
    this.isProgress = true;
    this.isSaveDisabled = false;
    const param = {
      multypliBy: this.f.multypliBy.value,
      penaltyUnit: this.f.penaltyUnit.value,
      tariffDesc: this.f.tariffDesc.value,
      locationCode: this.f.locationCode.value,
      principleAmount: this.f.principleAmount.value,
      billReasonCode: this.f.billReasonCode.value,
      p_USER:this.f.p_USER.value,
    };
    this._miscBillingService.getNonConsumerBillAmount(param).subscribe(
      (res: any) => {
        this.nonconsumerbill.patchValue({
          principleAmount: res.prN_AMOUNT,
          srAmount: res.sR_Amount,
          vatAmount: res.vaT_AMOUNT,
          peakAmount: res.peak_Amount,
          offPeakAmount: res.offPeak_Amount,
          totalAmount: res.prN_AMOUNT + res.vaT_AMOUNT,
        });
        this.isProgress = false;
      },
      (er) => {
        this._toasterService.danger("something went wrong !! please try again");
        this.isProgress = false;
      }
    );

  }


  NonconsumerBillSave() {

    if (this.isEditable == false) {
      if (this.nonconsumerbill.invalid) {
        this._toasterService.danger("Please fill all the requered field.");
        return;
      }
    }
    // if (this.nonconsumerbill.invalid) {
    //   this._toasterService.danger("Please fill all the requered field.");
    //   return;
    // }
    this.isSaving = true;
    this.nonconsumerbill.patchValue({
      fileList: this.arrayList,
    });

    this._penaltyBillGen.nonconsulmerbillsave(this.formVal).subscribe(
      (res: any) => {
        let saveData = res as any;
        this.isSaving = false;
        if (saveData.status == 1) {
          this._toasterService.success("Bill Generate Successfully", "Success");
          this.consumerNumber = this.f.nidNumber.value;
          this.billNumber = saveData.bilL_NUM; 
          this.viewPrint();  
          this.reset();
         
        } else {
          this._toasterService.danger("Failed To Saved ", "Error");
        }
      },
      (er) => {
        this._toasterService.danger(er.message);
        this.isSaving = false;
      }
    );

  }

  nonConsumerLocationDes(){
    this._penaltyBillGen.nonCustLocationName(this.f.locationCode.value).subscribe((res)=>{
      let result=res as any[]; 
      this.nonconsumerbill.patchValue({
        locationName: result[0].locationName
      })

    })
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
          const result = reader.target.result;
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

  resetAmount(event: any) {
    if (event == 'F' || event == 2 || event == 3) {
      this.isSaveDisabled = true;
      this.nonconsumerbill.patchValue({
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
    this.nonconsumerbill.patchValue({
      principleAmount: null,
      vatAmount: null,
      totalAmount: null,
      peakAmount: null,
      offPeakAmount: null
    })
  }

  viewPrint() {
      this._router.navigate([
        "bill-report/penalty-billnoncust",
        this.billNumber,
        this.consumerNumber,
      ]);
}

  reset() {
    this.createForm();
    this.arrayList = [];
  }

  changeAmount(event: any) {
    this.isSaveDisabled = true;
    this.nonconsumerbill.patchValue({
      dcAmount: null,
      vatAmount: null,
      principleAmount:null,
      totalAmount: null,
      penaltyUnit:null,
    })
  }

  createForm() {
    this.nonconsumerbill = this._fb.group({
      businessType: ['', []],
      customerName: [, []],
      locationCode: [this.locationCode[0], []],
      locationName: [, []],
      billNumber:[,[]],
      meterTypeDesc: ['Non Metered', []],
      prvAcNo: [, []],
      tariffDesc: [, [Validators.required]],
      customerAddr: [, []],
      nidNumber: [, [Validators.required, Validators.pattern("^[0-9]*$")]],
      mobileNumber: [, [Validators.required, Validators.pattern("^((\\+91-?)|0)?[0-9]{11}$")]],
      meterCondition: [, []],
      lastReading: [, []],
      multypliBy: ['3', []],
      penaltyUnit: [,[]],
      principleAmount: [, []],
      vatAmount: [, []],
      totalAmount: [, [Validators.required]],
      billReasonCode: [, [Validators.required]],
      imposedByCode: [, [Validators.required]],
      dueDate: [, []],
      dDate: [,[] ],
      meterTypeCode: ['88', []],
      meterConditionCode: [, []],
      meterConditionDesc: [, []],
      peakUnit:[,[]],
      offPeakUnit:[,[]],
      p_USER:[this.userName,[]],
      fileList: [this.arrayList, []],
    })

  }
 

  get formVal() {
    return this.nonconsumerbill.value;
  }

  get f() {
    return this.nonconsumerbill.controls;
  }


}
