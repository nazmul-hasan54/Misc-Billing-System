import { Component, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import { dateFormatForReport } from "../../../../@core/utils/utiliy";
import { MinistrySummaryService } from "../../../../services/ministry-summary.service";
import { ExcelServiceService } from "../../../../services/pdfGenerate/excel-service.service";
import { MinistrySummaryPdfService } from "../../../../services/pdfGenerate/ministry/ministry-summary-pdf.service";
import { CenterWiseSummeryReportService } from "../../../../services/pdfGenerate/ministry/center-wise-summery-report.service";
import { DatePipe } from "@angular/common";
import { MinistryWiseMinistrySummaryService } from "../../../../services/pdfGenerate/ministry/ministry-wise-ministry-summary.service";
import { ZoneWiseMinistrySummaryService } from "../../../../services/pdfGenerate/ministry/zone-wise-ministry-summary.service";
import { MinistryService } from "../../../../services/ministry.service";
import { SingalZoneWiseMinistrySummaryService } from "../../../../services/pdfGenerate/ministry/singal-zone-wise-ministry-summary.service";


@Component({
  selector: 'ngx-ministry-summary-report',
  templateUrl: './ministry-summary-report.component.html',
  styleUrls: ['./ministry-summary-report.component.scss'],
  providers: [DatePipe]
})
export class MinistrySummaryReportComponent implements OnInit {

  form: FormGroup;

  submitted:boolean=false;
  dbConfigData: any = [''];
  zoneList: any[];
  locationDataDD: any = [''];
  locations: any[] = [];
  allLocations: any;
  isReadOnly: boolean;
  isProgress:boolean=false;
  docData: any;
  public report: any;
  documentTitle = "";
  public isTrue:boolean=false;
  isLocAndReportHideShow: boolean = false;
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ];
  reportType: any[]=[
    {"key":'1', "value":"Center Summary"},
    {"key":'2', "value":"Ministry Summary"},
    {"key":'3', "value":"Zone Summary"},
  ];
  ministrySummaryData: any;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList:any[]=[];
  locationByUserZoneList:any[];
  isAllAdded: boolean;
  isAll: boolean;

  constructor(
    private fb: FormBuilder,
    private _service: MinistrySummaryService,
    private _ministryService: MinistryService,
    private toaster: NbToastrService,
    private _excelService: ExcelServiceService,
    private _pdfCenterWiseSummaryService: CenterWiseSummeryReportService,
    private _pdfMinistrySummaryService: MinistrySummaryPdfService,
    private datePipe: DatePipe,
    private _pdfMinistryWiseSummaryService: MinistryWiseMinistrySummaryService,
    private _pdfZoneWiseMinistrySummery: ZoneWiseMinistrySummaryService,
    private _pdfSpecificZoneWiseMinsSummary: SingalZoneWiseMinistrySummaryService
  ) { }


  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDdList();
    this.getZoneByUser();
    //this.getAllDatabaseDD();
    //this.getLocationDD();
  }

  private getAllZoneDdList(){
    if(this.roleName=='Admin'){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  private getLocationDD(event:any) {
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  
  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(response => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDD = response.data;
    });
  }
  public onChangeSelectDb(zoneCode) {
    if(zoneCode != '0'){
      this.getLocationDD(zoneCode);
      this.form.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }else{
      this.form.controls['locationCode'].disable();
      this.isLocAndReportHideShow = false;
    }
  }

  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Ministry Wise Ministry Summary'+dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`
      link.click();

    }
    else if (event == 2 || event == 3) {
      let excelObj = {
        data: ''
      }
      if (this.form.value.dbCode == "0" && this.form.value.reportType == '1') {
        excelObj.data = this.docData.docDefinition.content[0].table.body;
      }
      else if (this.form.value.dbCode == "0" && this.form.value.reportType == '2') {
        excelObj.data = this.docData.docDefinition.content[0].table.body;
      }
      else {
        excelObj.data = this.docData.docDefinition.content.table.body;
      }
      
      this._excelService.downloadExcelFile(excelObj, 'Ministry Wise Ministry Summary');
    
    }
  }

  private getAllDatabaseDD() {
    this._service.getAllDbConfigDDList().subscribe(response => {
      this.dbConfigData = response.data;
    });
  }
  
  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.form.patchValue({
          zoneCode:this.zoneByUserList[0].code
        });
        this.getLocationByUserNameZoneCodes(this.zoneByUserList[0].code);
      });
    }
  }

  getLocationByUserNameZoneCodes(event:any){
    this.getLocationList(event);
    setTimeout(()=>{
      if(this.roleName!='Admin'){
      this._ministryService.getLocationByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
        this.locationByUserZoneList=res as any[];
        this.isAll=this.locationByUserZoneList.length==this.locationDataDD.length?true:false;

        if(this.isAll){
          this.locationByUserZoneList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.form.patchValue({
            locationCode:this.locationByUserZoneList[0].code
          })
        },300) ;
      })
    }
    },250)
  }

  public onSearchAgain(){
    this.isTrue=false;
  }

   public onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) { this.isProgress = false;return};
    let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneList : this.zoneByUserList;
    let utilityObj = {
      //billMonth:this.datePipe.transform(this.formCon.reportDate.value, 'dd-MMM-yy'),
      billMonth:this.datePipe.transform(this.formCon.reportDate.value, 'yMM'),
      ministry: this.form.value.code,
      code: zoneResultDataList.find(x=> x.code == this.form.value.zoneCode),
      zone: zoneResultDataList.find(x=> x.code==this.form.value.zoneCode) ? zoneResultDataList.find(x=> x.code==this.form.value.zoneCode).nameBN : 'All'
     };
     
    //  let zoneResultDataList = this.roleName.toLocaleLowerCase() == 'admin' ? this.zoneList : this.zoneByUserList;
    if(this.form.value.zoneCode == "0"){
        this._service.getMinistrySummaryList(this.form.value.zoneCode, " ",utilityObj.billMonth,).subscribe(res=>{
          this.ministrySummaryData=res.data;
          if(this.ministrySummaryData.length>0){
            // this.docData = this._pdfZoneWiseMinistrySummery.generatePdf(this.ministrySummaryData, this.form.value.zoneCode, utilityObj);
            this.docData = this._pdfZoneWiseMinistrySummery.generatePdf(this.ministrySummaryData,  this.form.value.reportDate, utilityObj);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
            });
          }
    
          else{
            this.isTrue = false;
            this.toaster.danger("No Data Found");
            this.isProgress=false;
          }
        }, err=>{
          this.isProgress=false;
        });
    }
    else{
      this._service.getMinistrySummaryList(this.form.value.zoneCode, this.form.value.locationCode,utilityObj.billMonth).subscribe(res=>{
        this.ministrySummaryData=res.data;
        if(this.ministrySummaryData.length>0){
          this.docData = this._pdfSpecificZoneWiseMinsSummary.generatePdf(this.ministrySummaryData, this.form.value.reportDate, utilityObj );
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress=false;
          });
        }
  
        else{
          this.isTrue = false;
          this.toaster.danger("No Data Found");
          this.isProgress=false;
        }
      }, err=>{
        this.isProgress=false;
      });
    }
  }

  createForm() {
    this.form = this.fb.group({
      zoneCode: ['0'],
      dbCode: ['0'],
      locationCode: ['0'],
      reportDate: ['', [Validators.required]],
      reportType: ['1'],
      exportType:[1,[]]
    });
  }
  get formCon(){
    return this.form.controls;
  }

}
