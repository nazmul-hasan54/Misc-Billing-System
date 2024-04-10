import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { DataTableDirective } from 'angular-datatables';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { MiscLocationService } from '../../../services/misc-location.service';
import { NbToastrService } from '@nebular/theme';
import { PostToPrepaidViewModel } from '../../../model/PostpaidToPrepaid/PostToPrepaidView.model';
import { PostToPrepaidViewService } from '../../../services/pdfGenerate/postpaid-to-prepaid/post-to-prepaid-view.service';
import { PostpaidToPrepaidService } from '../../../services/postpaid-to-prepaid.service';
import { PrepaidListModel } from '../../../model/PostpaidToPrepaid/prepaidList.model';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { dateFormatForDDMMYYYY } from '../../../@core/utils/utiliy';
import { BsDatepickerConfig, BsDatepickerViewMode } from 'ngx-bootstrap/datepicker';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'ngx-view-post-to-pre-list',
  templateUrl: './view-post-to-pre-list.component.html',
  styleUrls: ['./view-post-to-pre-list.component.scss']
})
export class ViewPostToPreListComponent implements OnInit {

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = 'month';
  bsConfig?: Partial<BsDatepickerConfig>;
  postToprepaidForm:FormGroup
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized: boolean = false
  ptopList: PrepaidListModel[];
  postToPrepaidViewList: PostToPrepaidViewModel[];
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  docData: any;
  documentTitle: any;
  report: any;
  exportTypeList: any[] = [
    { 'id': 1, 'name': '.pdf' },
    { 'id': 2, 'name': '.xls' }
  ];

  
  
  constructor(
    private _toasterService: NbToastrService,
    private _posttopreService: PostpaidToPrepaidService,
    private _miscLocation: MiscLocationService,
    private _pdfService: PostToPrepaidViewService,
    private _fb:FormBuilder,
    private _router: Router,
    private _excelService: ExcelServiceService,
    private _datePipe: DatePipe
    
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      searching: false
      
    };
    this.getPrepaidList();
    this.getLocationByUser();
    this.createForm();

    this.bsConfig = Object.assign({}, {
      minMode: this.minMode
    });
  }


  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  };

  getLocationByUser() {
    // console.log("Location", this.locationCodes);
  }

  getPrepaidList() {
    this._posttopreService.getPrepaidList(this.locationCodes[0]).subscribe(res=> {  
          this.ptopList = res as PrepaidListModel[];
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

  // get startAndEndDate(){
    
  //   return t
  // }


  getPostToPrepaidSearchByDate() {
    
    let t = this._datePipe.transform(this.f.billMonth.value, 'yMM');
    let s = this._datePipe.transform(this.f.billMonth.value, 'yMM');
    
    let year = Number(t.substring(0, 4));
 
    let month = Number(s.substring(4, 6));
    
    const date = new Date(year, month - 1, 1);
    const firstDate = new Date(year, month - 1, 1);
    
    date.setMonth(date.getMonth() + 1);
    const lastDate = new Date(date.getTime() - 1);
    let startDate = `${firstDate.getDate().toString().padStart(2, '0')}-${(firstDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDate.getFullYear()}`;
      let endDate = `${lastDate.getDate().toString().padStart(2, '0')}-${(lastDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${lastDate.getFullYear()}`;
        console.log("enddate",startDate);
        this.postToprepaidForm.patchValue({
          startDate:startDate,
          endDate:endDate
        })
      
    this._posttopreService.getPostToPrepaidSearchByDate(this.f.startDate.value, this.f.endDate.value, this.locationCodes[0]).subscribe(res => {
    // this._posttopreService.getPostToPrepaidSearchByDate(startDate, endDate, this.locationCodes[0]).subscribe(res => {
        this.ptopList = res as PrepaidListModel[];
      if (this.isDtInitialized) {
        this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.dtTrigger.next();
        });
      } else {
        this.isDtInitialized = true
        this.dtTrigger.next();
      }
    }); 

  }

  onReport() {
    let t = this._datePipe.transform(this.f.billMonth.value, 'yMM');
    let s = this._datePipe.transform(this.f.billMonth.value, 'yMM');
    
    let year = Number(t.substring(0, 4));
 
    let month = Number(s.substring(4, 6));
    
    const date = new Date(year, month - 1, 1);
    const firstDate = new Date(year, month - 1, 1);
    
    date.setMonth(date.getMonth() + 1);
    const lastDate = new Date(date.getTime() - 1);
    let startDate = `${firstDate.getDate().toString().padStart(2, '0')}-${(firstDate.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${firstDate.getFullYear()}`;
      let endDate = `${lastDate.getDate().toString().padStart(2, '0')}-${(lastDate.getMonth() + 1)
        .toString()
        .padStart(2, '0')}-${lastDate.getFullYear()}`;
        console.log("enddate",startDate);
        this.postToprepaidForm.patchValue({
          startDate:startDate,
          endDate:endDate
        })
    this._posttopreService.getPostToPrepaidByDate(this.f.startDate.value, this.f.endDate.value, this.locationCodes[0]).subscribe(res => {

      this.postToPrepaidViewList = res as PostToPrepaidViewModel[];

      if (this.postToPrepaidViewList.length > 0) {
        this.docData = this._pdfService.generatePdf(this.postToPrepaidViewList);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = "hdoiuhiuchbihdsbihxc";
          let date = new Date();
          let fileName = 'Post-To-Prepaid Customer List';
          const source = `data:application/pdf;base64,${this.report}`;
          const link = document.createElement("a");
          link.href = source;
          link.download = `${fileName}.pdf`
          link.click();
        })
      }
      else{
        this._toasterService.danger("Data Not Found","Error");
      }
    });
  }
  onChangeExportType(event: any) {
    if (event == 1) {
      this.onReport();
    }
    else if (event == 2 || event == 3) {
      this.onReport();
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Post-To-Prepaid  Customer List');
    }
  }


  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  startDates(event: Date) {
   
    let startDate = dateFormatForDDMMYYYY(event);
    console.log("startDate", startDate)
    this.postToprepaidForm.patchValue({
      startDate: startDate,
    })
  }

  endDates(event: Date) {
    let endDate = dateFormatForDDMMYYYY(event);
    console.log("date", endDate)
    this.postToprepaidForm.patchValue({
      endDate: endDate,
    })
  }



  createForm() {
    this.postToprepaidForm = this._fb.group({
      billMonth: [, []],
      startDate: [, []],
      postStartDate: [, [Validators.required]],
      endDate: [, []],
      postEndDate: [, [Validators.required]],
    })
  }

  get formVal(){
    return this.postToprepaidForm.value;
  }

  get f(){
    return this.postToprepaidForm.controls;
  }

  viewPrint(bill:PrepaidListModel) {
    debugger
    this._router.navigate([
      "bill-report/postpaid-to-prepaid",
      bill.customerNumber,
      bill.locationCode
    ]);
}
}
