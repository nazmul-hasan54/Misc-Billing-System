import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MinistryService } from '../../../services/ministry.service';
import { CenterModel } from '../../../model/center';
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { DatePipe } from '@angular/common';
import { ModBillService } from '../../../services/mod-bill.service';
import { ModPrepaidService } from '../../../services/pdfGenerate/bill-print-view/mod-bill/mod-prepaid.service';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';
import { PreModDataService } from '../../../services/pdfGenerate/ministry/pre-mod-data.service';
import { NbToastrService } from '@nebular/theme';
@Component({
  selector: 'ngx-universal-prepaid-mod',
  templateUrl: './universal-prepaid-mod.component.html',
  styleUrls: ['./universal-prepaid-mod.component.scss']
})
export class UniversalPrepaidModComponent implements OnInit {
  universalPrepaidModForm:FormGroup;
  centerDataList: CenterModel[] = [];
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  isProgress:boolean=false;
  isTrue:boolean=false;
  submitted:boolean=false;
  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  createdBy = localStorage.getItem("userName");
  locationList: any = localStorage.getItem("locationCodeList");
  locationCode = this.locationList.split(',');
  userNames=this.userName.split(",");  
  centerCode:string=localStorage.getItem("dbCodeList");
  locationDataList:any[];

  constructor(
    private _fb:FormBuilder,
    private _ministryService: MinistryService,
    private _modService: ModBillService,
    private _pdfService: PreModDataService,
    private _excelService: ExcelServiceService,
    private _datePipe: DatePipe,
    private _toastrService: NbToastrService,
  ) { }

  ngOnInit(): void {
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    this.getAllCenterDD();
    this.createForm();
  }
  adminCenterList:any;
  getAllCenterDD() {
    this._ministryService.getAllDbConfigDDList().subscribe((res: any) => {
      this.centerDataList = res.data as CenterModel[];
        this.adminCenterList=this.centerDataList
    });
  }
  getLocDeptByCenter(event:any){
    this._ministryService.getLocDeptCodeByCenter(event).subscribe((res:any)=>{
      this.locationDataList=res as any;
    
    })
  }
  
  locationFormSession: any[];
  getLocationsBySession(locationCodeList: string[]) {
    this._ministryService.getLocationsBySession(locationCodeList).subscribe((res: any) => {
        this.locationFormSession = res as any[];
        this.universalPrepaidModForm.patchValue({
          locDeptCode:this.locationFormSession[0].deptCode
        })
        // this.f.locDeptCode.setValue(this.locationFormSession[0].deptCode)
      });
  }

  locationCodeValue: string;
  isHideShow: boolean = false;
  
  space(e:any){
    if(e.charCode===32){
      e.preventDefault();
    }
  }


  documentTitle = "";
  docData: any;
  report: any;
  prepaidModDataList: any[];
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];


  // onReport() {
  //   this.isProgress = true;
  //   this.submitted=true;
  //   if (this.universalPrepaidModForm.invalid) {
  //     this.isProgress = false;
  //     return;
  //   }

  //   let t = this.datePipe.transform(this.f.billMonth.value, 'yMM');
  //   let s = this.datePipe.transform(this.f.billMonth.value, 'yMM');
    
  //   let year = Number(t.substring(0, 4));
  //   let m = Number(s.substring(4, 6));
    
  //   const date = new Date(year, m -1, 1);
  //   const firstDate = new Date(year, m - 1, 1);

  //   date.setMonth(date.getMonth() + 1);
  //   const lastDate = new Date(date.getTime() - 1);
    
  //   let fDate = `${firstDate.getFullYear()}-${(firstDate.getMonth() + 1)
  //     .toString()
  //     .padStart(2, '0')}-${firstDate.getDate().toString().padStart(2, '0')}`;
  //     let tDate = `${lastDate.getFullYear()}-${(lastDate.getMonth() + 1)
  //       .toString()
  //       .padStart(2, '0')}-${lastDate.getDate().toString().padStart(2, '0')}`;
  //       //console.log("enddate",startDate);
  //       this.universalPrepaidModForm.patchValue({
  //         fDate:fDate,
  //         tDate:tDate
  //       })
    
    

  //   let Obj = {
  //     deptCode: this.f.locDeptCode.value,
  //     fDate: this.f.fDate.value,
  //     tDate: this.f.tDate.value,
  //     dbCode:this.f.centerCode.value,
  //     createdBy: this.createdBy,
  //   };
    
    
  //   let month = this.datePipe.transform(this.f.fDate.value, "MMM-yy");
  //   this._modService.getAllPrepaidModData(Obj).subscribe((res) => {
  //       this.prepaidModDataList = res as any[];

  //       this.docData = this._pdfService.generatePdf(
  //         this.prepaidModDataList,Obj,month
  //       );
  //       this.docData.getBase64((base64Data) => {
  //         this.report = base64Data;
  //         this.documentTitle = this.docData.docDefinition.info.title;
  //         this.isTrue = true;
  //         this.isProgress = false;
  //       });
  //     },
  //     (er) => {
  //       this.isProgress = false;
  //     }
  //   );
  // }

  // onChangeExportType(event: any) {
  //   if (event == 1) {
  //     //let date=new Date();
  //     let fileName = "MOD PREPAID REPORT";
  //     const source = `data:application/pdf;base64,${this.report}`;
  //     const link = document.createElement("a");
  //     link.href = source;
  //     link.download = `${fileName}.pdf`;
  //     link.click();
  //   } else if (event == 2 || event == 3) {
  //     let excelObj = {
  //       data: this.docData.docDefinition.content[1].table.body,
  //     };
  //     this._excelService.downloadExcelFile(excelObj, "MOD PREPAID REPORT");
  //   }
  // }

  onSearchAgain() {
    this.isTrue = false;
  }

  
  onChangeExportType(event: any) {
    if (event == 1) {
      //let date=new Date();
      let fileName = 'MOD PREPAID REPORT';
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[1].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'MOD PREPAID REPORT');
    }
  }

  preModList: any[];
  onReport(){
    this.isProgress = true;
    if(this.universalPrepaidModForm.invalid) {this.isProgress = false; return};
    let billMonth = this._datePipe.transform(this.f.billMonth.value, "yMM");
    
    this._ministryService.getPreModDataByBillMonth(billMonth, this.f.locDeptCode.value).subscribe((res: any) => {
      const replacementValue ='LT-A';
      const valuesToReplace = 'LT-A';
      // res = res.map((value) => {
      //   if (valuesToReplace.includes(value.tariffName)) {
      //     return {...value, tariffName:replacementValue};
      //   }
      //   return value;
      // });
      this.preModList = res;
      console.log("]dfjojbhdfsi",this.preModList)
      if(this.preModList.length > 0){
        this.docData = this._pdfService.generatePdf(this.preModList, billMonth);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      } else{
        this.isTrue = false;
        this._toastrService.danger('No Data found');
        this.isProgress = false;
      }
    });
  }

  createForm(){
    this.universalPrepaidModForm=this._fb.group({
      locDeptCode:[,[Validators.required]],
      billMonth:[,[Validators.required]],
      centerCode:[,[Validators.required]],
      // fDate: [, []],
      // tDate: [, []],
    })
  }

  get f(){
   return this.universalPrepaidModForm.controls
  }
}
