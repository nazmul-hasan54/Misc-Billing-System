import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MinistryService } from '../../../services/ministry.service';
import { LocationNameModel } from '../../../model/locationname.model';
import { MiscBillingService } from '../../../services/misc-billing.service';
import { Locations } from '../../../model/locations.model';
import { CityCorporation } from '../../../model/city-corporation';
import { MinistryCustomeService } from '../../../services/ministry-custome.service';
import { PouroshovaModel } from '../../../model/pouroshova';
import { Unionparishad } from '../../../model/unionparishad';
import { MinistryCustomerCountService } from '../../../services/pdfGenerate/ministry/ministry-customer-count.service';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../@core/utils/utiliy';
import { ExcelServiceService } from '../../../services/pdfGenerate/excel-service.service';

@Component({
  selector: 'ngx-ministry-customer-count',
  templateUrl: './ministry-customer-count.component.html',
  styleUrls: ['./ministry-customer-count.component.scss']
})
export class MinistryCustomerCountComponent implements OnInit {
  ministryCustomerCountForm:FormGroup;
  report:any;
  isTrue:boolean=false;
  allMinistry = {code: '0', name: 'All'};
  ministryDropDownData:any;
  roleName = localStorage.getItem("roleName");
  locationLists = localStorage.getItem('locationCodeList');
  locationCodes = this.locationLists.split(",");
  locationNamelist:any;
  locationFormSession: Locations[] = [];
  isProgress:boolean=false;
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];

  constructor(
    private _fb: FormBuilder,
    private _miscBillingService: MiscBillingService,
    private _ministryService: MinistryService,
    private _ministryCustservice: MinistryCustomeService,
    private _report: MinistryCustomerCountService,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllMinistry();
    this.LocationList();
  }

  getAllMinistry(){
    return this._ministryService.getAllMinistry().subscribe(res =>{
      this.ministryDropDownData=res.data;
      this.ministryCustomerCountForm.controls['code'].setValue(this.allMinistry);
    });
  }

  LocationList() {
    this.getLocationsBySession(this.locationCodes)
    if (this.roleName !='Admin' && this.locationCodes.length == 1) {
      this.f.locationCode.setValue(this.locationCodes[0])
    }
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
    this._ministryService.getLocationsBySession(locationCodeList).subscribe((res: any) => {
      this.locationFormSession = res as Locations[];
    });
  }


  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Ministry Customer '+dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();
    }
    else if(event==2 || event==3){
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      }
      this._excelService.downloadExcelFile(excelObj, 'Ministry Customer ');
    }
  }
  public onSearchAgain(){
    this.isTrue=false;
    //this.getAllMinistry();
  }
  documentTitle='';
  ministryCountList:any;
  docData:any;

  onReport(){
   let divisionName:any;
    if(this.roleName=='Admin'){
      divisionName={
       locationName:this.locationNamelist.filter((x)=>x.code==this.formval.locationCode),
      }
    }
    else{
      divisionName={
       locationName:this.locationFormSession.filter((x)=>x.code==this.formval.locationCode),
      }
    }
    this._ministryService.getMinistryCustomerCount(this.formval.code.code,this.formval.locationCode).subscribe((res:any)=>{
      this.ministryCountList=res as any;
      if(this.ministryCountList.length > 0){
          this.docData = this._report.generatePdf(this.ministryCountList,divisionName);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
          })
      }
      else{
        this.isTrue = false;
        this._toasterService.danger("No Data Found");
        this.isProgress=false;
      }
    })
  }


  createForm(){
    this.ministryCustomerCountForm=this._fb.group({
      code:[,[]],
      locationCode:[,[]],
    })
  }
  get f(){
    return this.ministryCustomerCountForm.controls;
  }
  get formval(){
    return this.ministryCustomerCountForm.value;
  }
}
