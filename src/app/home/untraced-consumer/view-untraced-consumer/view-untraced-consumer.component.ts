import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ConfirmDialogComponent } from '../../../shared/components/confirm-dialog/confirm-dialog.component';
import { DataTableDirective } from 'angular-datatables';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { MatDialog } from '@angular/material/dialog';
import { NbToastrService } from '@nebular/theme';
import { Subject } from 'rxjs';
import { UntracedConsumerModel } from '../../../model/untraced-consumer.model';
import { UntracedConsumerService } from '../../../services/untraced-consumer.service';
import { UntracedConsumerViewReportService } from '../../../services/pdfGenerate/untraceable-customer/untraced-consumer-view-report.service';
import { UntracedCustomerViewModel } from '../../../model/untraced-consumer-view.model';
import { dateFormatForDDMMYYYY } from '../../../@core/utils/utiliy';

@Component({
  selector: 'ngx-view-untraced-consumer',
  templateUrl: './view-untraced-consumer.component.html',
  styleUrls: ['./view-untraced-consumer.component.scss']
})
export class ViewUntracedConsumerComponent implements OnInit {
   untracedViewForm:FormGroup;
  untracedConsumerList: UntracedConsumerModel[];
  untracedConsumerViewList: UntracedCustomerViewModel[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  hostName: string;
  @ViewChild(DataTableDirective) dtElement: DataTableDirective;
  isDtInitialized:boolean = false;
  custStatus: number;
  locationLists = localStorage.getItem("locationCodeList");
  locationCodes = this.locationLists.split(",");
  docData: any;
  documentTitle: any;
  report: any;
  exportTypeList: any[] = [
    { 'id': 1, 'name': '.pdf' },
    { 'id': 2, 'name': '.xls' }
  ];
  userName:string=localStorage.getItem("userName");
  updatedBy=this.userName.split(",");
  messages: string;

  constructor(
    private _toasterService: NbToastrService,
    private _untracedConService: UntracedConsumerService,
    private dialog: MatDialog,
    private _fb: FormBuilder,
    private _PdfService: UntracedConsumerViewReportService,
    private _excelService: ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
    };
    this.getUntracedConsumer();
    this.createForm();
  }

  getUntracedConsumer(){
        this._untracedConService.getUntracedConsumer().subscribe((res:any)=>{
      if(res.length>0){
        this.untracedConsumerList = res as UntracedConsumerModel[];
        if (this.isDtInitialized) {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.dtTrigger.next();
          });
        } else {
          this.isDtInitialized = true
          this.dtTrigger.next();
        }
      }
      else{
        this._toasterService.danger("Data Not Found!", "Error");
      }
    }),
    (er) => {
      this._toasterService.danger(
        "Something went wrong !! Please try again",
        "Error"
      );
    }
  }

  getConsumerSearchByDate(){  
    this._untracedConService.GetConsumerSearchByDate(this.f.startDate.value, this.f.endDate.value, this.locationCodes[0]).subscribe(res => {

      this.untracedConsumerList = res as UntracedConsumerModel[];
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

  onReport(exportType:number) {
    this._untracedConService.getConsumerByDate(this.f.startDate.value, this.f.endDate.value, this.locationCodes[0]).subscribe(res => {
      this.untracedConsumerViewList = res as UntracedCustomerViewModel[];
      if (this.untracedConsumerViewList.length > 0) {
        this.docData = this._PdfService.generatePdf(this.untracedConsumerViewList);

        if(exportType==1){
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = "hdoiuhiuchbihdsbihxc";
            let date = new Date();
            let fileName = 'Untraced Customer List';
            const source = `data:application/pdf;base64,${this.report}`;
            const link = document.createElement("a");
            link.href = source;
            link.download = `${fileName}.pdf`
            link.click();
          })
        }
      }
      else {
        this._toasterService.danger("Data Not Found", "Error");
      }
      
    });
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      this.onReport(1);
    }
    else if (event == 2 || event == 3) {
      this.onReport(2||3);
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Untraced Customer List');
    }
  }

  changeStatus(item:UntracedConsumerModel){
    item.status ? this.messages = "Are you sure want to Trace this Customer?" : this.messages = "Are you sure want to Untrace this Customer?";
    // if(item.status) this.messages = "Are you sure want to Trace this Customer?";
    // else this.messages = "Are you sure want to Untrace this Customer?";
    const ref=  this.dialog.open(ConfirmDialogComponent, {
      position:{top:"50px"},
      width:"500px",
      data:{title:"Status Change",message:this.messages},
      panelClass: [
        "animate__animated",
        "animate__slideInTop",
        "dialog_width_change",
      ],
    });
      ref.afterClosed().subscribe(result => {
        if (result) {

    item.status ? this.custStatus = 0:this.custStatus=1;
    this._untracedConService.changeStatus(item.id,this.custStatus,this.updatedBy).subscribe((res:any)=>{
      let data = res as any;
      console.log("data",data);
      
      if (data) {
        this._toasterService.success("Successfully Update Data", "Success");
        this.getUntracedConsumer();
      }
    }),
    (er) => {
      this._toasterService.danger(
        "Something went wrong !! Please try again",
        "Error"
      )};
  }});
    
  }

  startDates(event: Date) { 
    let startDate = dateFormatForDDMMYYYY(event);
    this.untracedViewForm.patchValue({
      startDate: startDate,
    })
  }

  endDates(event: Date) {
    let endDate = dateFormatForDDMMYYYY(event);
    this.untracedViewForm.patchValue({
      endDate: endDate,
    })
  }

  createForm() {
    this.untracedViewForm = this._fb.group({
      startDate: [, []],
      untracedStartDate: [, [Validators.required]],
      endDate: [, []],
       untracedEndDate: [, [Validators.required]],
    })
  }

  get formVal() {
    return this.untracedViewForm.value;
  }

  get f(){
    return this.untracedViewForm.controls;
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }


  

}
