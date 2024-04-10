import { Component, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { BulkTransferConsumer } from '../../../model/bulk-transfer-consumer.model';
import { MinistryService } from '../../../services/ministry.service';
import { PostpaidToPrepaidService } from '../../../services/postpaid-to-prepaid.service';
import { DropDownResultForString } from '../../../shared/models/drop-down-result-for-string.model';

@Component({
  selector: 'ngx-bulk-transfer-customer',
  templateUrl: './bulk-transfer-customer.component.html',
  styleUrls: ['./bulk-transfer-customer.component.scss']
})
export class BulkTransferCustomerComponent implements OnInit {

  bulkTransferForm: FormGroup;
  bulkTransferFormArray: FormArray;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  dbCodeLists = localStorage.getItem("dbCodeList");
  dbCodes = this.dbCodeLists.split(',');
  postToPrepaidList: BulkTransferConsumer[];
  billGroupList: any[];
  bookNoList: any[];
  postpaidCustList: any[];
  divisionList: DropDownResultForString[];
  districtLists: DropDownResultForString[];
  thanaLists: DropDownResultForString[];
  isDtInitialized: boolean = false;
  constructor(
    private _fb: FormBuilder,
    private _ministryService: MinistryService,
    private _posttopreService: PostpaidToPrepaidService,
    private _toasterService: NbToastrService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
      
    };
    this.getBillGroupList();
    this.getPretoPostDivision();
  }


  createForm(){
    this.bulkTransferForm = this._fb.group({
      locationCode: [this.locationCodes,[]],
      billGroup: ['', [Validators.required]],
      bookNo: ['', [Validators.required]],
      division: ['', []],
      district: ['', []],
      thana: ['', []],
      nidNumber: ['', []],
      mobileNo: ['', []]
    });
    this.bulkTransferFormArray = this._fb.array([]);
  }


  getBillGroupList(){
    this._posttopreService.getBillGroupList('MISCBILL_SYSTEM','S0M3RAN0MS3CR3T1MAG1C1',this.locationCodes[0]).subscribe((res:any) => {
      this.billGroupList = res;
    });
  }

  getAllBookNoList(billGroup:any){
    this._posttopreService.getBookNoList('MISCBILL_SYSTEM','S0M3RAN0MS3CR3T1MAG1C1', this.locationCodes[0], this.f.billGroup.value).subscribe((res: any) =>{
      this.bookNoList = res;
    });
  }

  getPostpaidCustByBookNo(){
    this._posttopreService.getPostpaidCustByBookNo('MISCBILL_SYSTEM','S0M3RAN0MS3CR3T1MAG1C1',this.f.bookNo.value, this.locationCodes[0]).subscribe((res: any) =>{
      this.postpaidCustList = res as BulkTransferConsumer[];
      this.bulkTransferFormArray = this._fb.array([]);
      this.postpaidCustList.forEach((item) => {
        this.bulkTransferFormArray.push(
          new FormGroup({
            custId: new FormControl(item.custId),
            locationName: new FormControl(item.locationName, []),
            customerNumber: new FormControl(item.customerNumber, []),
            nidNumber: new FormControl(item.nidNumber, []),
            mobileNumber: new FormControl(item.mobileNumber, []),
            customerName: new FormControl(item.customerName, []),
            customerAddr: new FormControl(item.customerAddr, []),
            tariffDesc: new FormControl(item.tariffDesc, []),
            businessType: new FormControl(item.businessType, []),
            prvAcNo: new FormControl(item.prvAcNo, []),
            areaCode: new FormControl(item.areaCode, []),
            division: new FormControl(item.division, []),
            district: new FormControl(item.district, []),
            thana: new FormControl(item.thana, []),
            meterTypeDesc: new FormControl(item.meterTypeDesc, []),
            meterNum: new FormControl(item.meterNum, []),
            meterConditionDesc: new FormControl(item.meterConditionDesc, []),
            sanctionedLoad: new FormControl(item.sanctionedLoad, []),
          })
        );
      });
    })
  }

  onChangeBilGroup(billGroup: any){
    this.getAllBookNoList(billGroup);
  }

  getPretoPostDivision(){
    this._posttopreService.getPrepaidDivision().subscribe((res: any) => {
      this.divisionList = res as DropDownResultForString[];
    });
  }

  GetPrepaidDistrictByDivision(divCode:string){
    this.districtLists = [];
    this._posttopreService.GetPrepaidDistrictByDivision(divCode).subscribe((res:any) => {
      this.districtLists = res as DropDownResultForString[];
    });
  }

  GetPrepaidThanaByDistrict(distCode:string){
    this.thanaLists = [];
    this._posttopreService.GetPrepaidThanaByDistrict(distCode).subscribe((res:any) => {
      this.thanaLists = res as DropDownResultForString[];
    });
  }

  get f(){
    return this.bulkTransferForm.controls;
  }

  get formVal(){
    return this.bulkTransferForm.value;
  }

}
