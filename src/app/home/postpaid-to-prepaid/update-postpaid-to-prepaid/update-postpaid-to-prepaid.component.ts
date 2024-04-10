import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { Subject } from 'rxjs';
import { PostToPrepaidViewModel } from '../../../model/PostpaidToPrepaid/PostToPrepaidView.model';
import { PrepaidListModel } from '../../../model/PostpaidToPrepaid/prepaidList.model';
import { PostpaidToPrepaidService } from '../../../services/postpaid-to-prepaid.service';
import { PostPaidToPrePaidUpdateCustomerService } from '../../../services/pdfGenerate/postpaid-to-prepaid/post-paid-to-pre-paid-update-customer.service';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { dateFormatForDDMMYYYY, dateFormatForReport } from '../../../@core/utils/utiliy';
import { MinistryService } from '../../../services/ministry.service';
import { Locations } from '../../../model/locations.model';
import { MiscLocationService } from '../../../services/misc-location.service';

@Component({
  selector: 'ngx-update-postpaid-to-prepaid',
  templateUrl: './update-postpaid-to-prepaid.component.html',
  styleUrls: ['./update-postpaid-to-prepaid.component.scss']
})
export class UpdatePostpaidToPrepaidComponent implements OnInit {

  postToprepaidForm:FormGroup;
  postToPrepaidFormArray: FormArray;
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  postToPrepaidViewList: PostToPrepaidViewModel[];
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  isDtInitialized: boolean = false;
  postToPrepaidList: PrepaidListModel[];
  selectionPostToPrepaidList: PrepaidListModel[]=[];
  isAllChecked: boolean = true;
  docData: any;
  report: any;
  documentTitle = "";
  isTrue: boolean = false;
  isProgress:boolean=false;
  exportTypeList: any[] = [
    { 'id': 1, 'name': '.pdf' },
    { 'id': 2, 'name': '.xls' }
  ];
  submitted:boolean=false;
  roleName = localStorage.getItem("roleName");
  LocationList:any[]=[];
  locationFormSession: Locations[] = [];
  constructor(
    private _posttopreService: PostpaidToPrepaidService,
    private _fb:FormBuilder,
    private _datePipe: DatePipe,
    private _toasterService: NbToastrService,
    private _postToPrepaidUpdateConsumer:PostPaidToPrePaidUpdateCustomerService,
    private _excelService: ExcelServiceService,
    private _ministryService:MinistryService,
    private _miscLocationService:MiscLocationService,
  ) { }

  ngOnInit(): void {
    this.getPrepaidList();
    this.createForm();
    if (this.roleName != "Admin") {
      this.getLocationsBySession(this.locationCodes);
    }
    // this.getLocationName();
    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
    this.getAllLocation();
  }


  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  getPrepaidList() {
    this._posttopreService.getPrepaidList(this.locationCodes[0]).subscribe(res=> {  
          this.postToPrepaidList = res as PrepaidListModel[];
          this.postToPrepaidFormArray = this._fb.array([]);
          this.postToPrepaidList.forEach((item) =>{
            this.postToPrepaidFormArray.push(
              new FormGroup({
                customerNumber: new FormControl(item.customerNumber, []),
                customerName: new FormControl(item.customerName, []),
                locationName: new FormControl(item.locationName, []),
                locationCode: new FormControl(item.locationCode, []),
                nidNumber: new FormControl(item.nidNumber, []),
                mobileNumber: new FormControl(item.mobileNumber, []),
                powerUtility: new FormControl(item.powerUtility, []),
                maxPower: new FormControl(item.maxPower, []),
                transferDate: new FormControl(item.transferDate, []),
                preToPostId: new FormControl(item.preToPostId, [])
              })
            );
          })
          if (this.isDtInitialized) {
            this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
              dtInstance.destroy();
              this.dtTrigger.next();
            });
          } else {
            this.isDtInitialized = true
            this.dtTrigger.next();
          }
         
      },
      () => {
        this._toasterService.danger(
          "Something went wrong !! Please try again",
          "Error"
        );
      });
  }

  onChangeExportType(event: any) {
    let utilityObj = {
      startDate: this._datePipe.transform(this.f.preToPostStartDate.value, 'yyyy-MM-dd'),
      endDate: this._datePipe.transform(this.f.preToPostSEndDate.value, 'yyyy-MM-dd'),
    };
    if(this.postToprepaidForm.valid){
      this._posttopreService.getPostToPrepaidForUpdate(utilityObj.startDate, utilityObj.endDate, this.f.locationCode.value).subscribe((res:any) => {
            this.postToPrepaidList = res.customerList.customersList as PrepaidListModel[];
            if (this.postToPrepaidList.length > 0) {
              this.docData = this._postToPrepaidUpdateConsumer.generatePdf(this.postToPrepaidList,utilityObj,this.postToPrepaidList[0].locationName);
              this.docData.getBase64((base64Data) => {
                this.report = base64Data;
                this.documentTitle = this.docData.docDefinition.info.title;
                this.isTrue = true;
                this.isProgress=false;
                if (event == 1) {
                  let date = new Date();
                  let fileName = 'Post To Prepaid Update Customer Information ' + dateFormatForReport(date);
                  const source = `data:application/pdf;base64,${this.report}`;
                  const link = document.createElement("a");
                  link.href = source;
                  link.download = `${fileName}.pdf`
                  link.click();
            
                }
                else if (event == 2 || event == 3) {
                  let excelObj = {
                    data: this.docData.docDefinition.content[0].table.body,
                  }
                  this._excelService.downloadExcelFile(excelObj, 'Post To Prepaid Update Customer Information ');
            
                }

              });
            }
            else {
              this.isTrue = false;
              this._toasterService.danger("No Data Found");
              this.isProgress=false;
            }            
            // if (this.isDtInitialized) {
            //   this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            //     dtInstance.destroy();
            //     this.dtTrigger.next();
            //   });
            // } else {
            //   this.isDtInitialized = true;
            //   this.dtTrigger.next();
            // }
        }); 
    }
    else{
      this._toasterService.danger("Invalid Form","Error");
    }
  }
  getAllLocation(){
      this._miscLocationService.getAllLocation().subscribe((res:any)=>{
        this.LocationList=res.data.data as any[];
      })
  }
  
  getLocationsBySession(locationCodeList: string[]){
    this._ministryService.getLocationsBySession(locationCodeList).subscribe((res: any) => {
        this.locationFormSession = res as Locations[];
      });
  }

  // getPostpaidToprepaidForUpdate(){
  //     let utilityObj = {
  //       startDate: this._datePipe.transform(this.f.preToPostStartDate.value, 'yyyy-MM-dd'),
  //       endDate: this._datePipe.transform(this.f.preToPostSEndDate.value, 'yyyy-MM-dd'),
  //     };
  //     if(this.postToprepaidForm.valid){
  //       this._posttopreService.getPostToPrepaidForUpdate(utilityObj.startDate, utilityObj.endDate, this.f.locationCode.value).subscribe((res:any) => {
  //             this.postToPrepaidList = res.customerList.customersList as PrepaidListModel[];
  //             if (this.postToPrepaidList.length > 0) {
  //               this.docData = this._postToPrepaidUpdateConsumer.generatePdf(this.postToPrepaidList,utilityObj,this.postToPrepaidList[0].locationName);
  //               this.docData.getBase64((base64Data) => {
  //                 this.report = base64Data;
  //                 this.documentTitle = this.docData.docDefinition.info.title;
  //                 this.isTrue = true;
  //                 this.isProgress=false;

  //               });
  //             }
  //             else {
  //               this.isTrue = false;
  //               this._toasterService.danger("No Data Found");
  //               this.isProgress=false;
  //             }            
  //             if (this.isDtInitialized) {
  //               this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
  //                 dtInstance.destroy();
  //                 this.dtTrigger.next();
  //               });
  //             } else {
  //               this.isDtInitialized = true;
  //               this.dtTrigger.next();
  //             }
  //         }); 
  //     }
  //     else{
  //       this._toasterService.danger("Invalid Form","Error");
  //     }


  // }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // getSelection(item: any) {
  //   return this.selectionPostToPrepaidList.findIndex((s) => s.customerNumber === item.customerNumber) !== -1;
  // }

  // changeHandler(item: any) {
  //   const customerNumber = item.customerNumber;
  //   const index = this.selectionPostToPrepaidList.findIndex((u) => u.customerNumber === customerNumber);
  //   if (index === -1) {
  //     this.selectionPostToPrepaidList = [...this.selectionPostToPrepaidList, item];
  //     this.postToPrepaidFormArray = this._fb.array([]);
  //     this.selectionPostToPrepaidList.forEach((p) => {
  //       this.postToPrepaidFormArray.push(
  //         new FormGroup({
  //           customerNumber: new FormControl(p.customerNumber),
  //           customerName: new FormControl(p.customerName),
  //           locationName: new FormControl(p.locationName),
  //           locationCode: new FormControl(p.locationCode),
  //           nidNumber: new FormControl(p.nidNumber),
  //           mobileNumber: new FormControl(p.mobileNumber),
  //           powerUtility: new FormControl(p.powerUtility),
  //           maxPower: new FormControl(p.maxPower)
  //         })
  //       );
  //     });
  //   } else {
  //     this.selectionPostToPrepaidList = this.selectionPostToPrepaidList.filter(
  //       (pt) => pt.customerNumber !== item.customerNumber
  //     );
  //     this.postToPrepaidFormArray = this._fb.array([]);

  //     this.selectionPostToPrepaidList.forEach((p) => {
  //       this.postToPrepaidFormArray.push(
  //         new FormGroup({
  //           customerNumber: new FormControl(p.customerNumber),
  //           customerName: new FormControl(p.customerName),
  //           locationName: new FormControl(p.locationName),
  //           locationCode: new FormControl(p.locationCode),
  //           nidNumber: new FormControl(p.nidNumber),
  //           mobileNumber: new FormControl(p.mobileNumber),
  //           powerUtility: new FormControl(p.powerUtility),
  //           maxPower: new FormControl(p.maxPower)
  //         })
  //       );
  //     });
  //   }
  // }

  // onSelectAll(isSelect){
  //   if(isSelect){
  //     this.isAllChecked = isSelect;
  //     this.postToPrepaidFormArray.controls.forEach(p => p['controls'].preToPostId.patchValue(1));
  //   }
  //   else{
  //     this.isAllChecked = isSelect;
  //     this.postToPrepaidFormArray.controls.forEach(p => p['controls'].preToPostId.patchValue(0));
  //   }
  // }

  // onSelectedSigleItem(isSelect: any,i:number){
  //   if(isSelect){
  //     this.postToPrepaidFormArray.controls[i].get('preToPostId').patchValue(1);
  //     if(this.postToPrepaidFormArray.length == (i+1)){
  //       this.isAllChecked = true;
  //     }
  //     else {
  //       this.isAllChecked = false;
  //     }
  //   }
  //   else {
  //     this.postToPrepaidFormArray.controls[i].get('preToPostId').patchValue(0);
  //     let isCheckList=this.postToPrepaidFormArray.value.filter(c=>c.preToPostId);
  //     console.log("fhahfa",isCheckList);
      
  //     if(isCheckList.length==(i+1)){
  //       this.isAllChecked=true;

  //     }else{
  //       this.isAllChecked=false;
  //     }
  //   }
  // }

  // updatePreToPostCust(){
  //   this._posttopreService.updatePreToPostCust(this.postToPrepaidFormArray.value).subscribe((res:any) => {
  //     if(res){
  //       this._toasterService.success("Data Transfered Successfully!!", "Success");
  //     }
  //     else {
  //       this._toasterService.danger("Something went wrong!!", "Error")
  //     }
  //   })
  // }


  createForm() {
    this.postToprepaidForm = this._fb.group({
      billMonth: [, []],
      preToPostId: [,[]],
      startDate: [, []],
      endDate: [, []],
      locationCode:[,[]],
      preToPostStartDate: [, [Validators.required]],
      preToPostSEndDate: [, [Validators.required]],
    });
    // this.postToPrepaidFormArray = this._fb.array([]);
  }

  get formVal(){
    return this.postToprepaidForm.value;
  }

  get f(){
    return this.postToprepaidForm.controls;
  }

}
