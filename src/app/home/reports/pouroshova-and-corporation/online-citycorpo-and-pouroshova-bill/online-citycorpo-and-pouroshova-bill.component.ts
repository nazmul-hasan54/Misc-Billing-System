import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { NbToastrService } from "@nebular/theme";
import {
  BsDatepickerConfig,
  BsDatepickerViewMode,
} from "ngx-bootstrap/datepicker";
import { ExcelServiceService } from "../../../../services/pdfGenerate/excel-service.service";
import { Router } from "@angular/router";
import { DatePipe } from "@angular/common";
import { OnlineCitycorpoAndPouroshovaService } from "../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-and-pouroshova.service";
import { PourAndCityCorporService } from "../../../../services/pour-and-city-corpor.service";
import { dateFormatForReport } from "../../../../@core/utils/utiliy";
import { MinistryService } from "../../../../services/ministry.service";
import { OnlineCitycorpoAndPouroshovaDetailsService } from "../../../../services/pdfGenerate/pouroshova-and-city-corporation/online-citycorpo-and-pouroshova-details.service";
import { OnlineCityPourModel } from "../../../../model/pouroshovaAndCitycorporation/online-pouroshova-and-citycorporation.model";
@Component({
  selector: "ngx-online-citycorpo-and-pouroshova-bill",
  templateUrl: "./online-citycorpo-and-pouroshova-bill.component.html",
  styleUrls: ["./online-citycorpo-and-pouroshova-bill.component.scss"],
})
export class OnlineCitycorpoAndPouroshovaBillComponent implements OnInit {
  form: FormGroup;

  datePickerValue: Date = new Date();
  minMode: BsDatepickerViewMode = "month";
  bsConfig?: Partial<BsDatepickerConfig>;
  docData: any;
  documentTitle = "";
  onlinePouroshovaAndCityData: any;
  isProgress: boolean = false;
  isTrue: boolean = false;
  report: any;
  exportTypeList: any[] = [
    { id: 1, name: ".pdf" },
    { id: 2, name: ".xls" },
  ];
  reportType: any[]=[
    {"key":'1', "value":"Summary "},
    // {"key":'2', "value":"Details"},
  ];

  zoneDataList: any;
  cityCorporationDataList: any;
  submitted: boolean = false;
  zoneList: any[];
  locationDataDd: any[];
  isLocAndReportHideShow: boolean = false;
  locationCodeValue: string;
  cityCorporationValue: string;
  pouroshovaCode: string;

  roleName:string=localStorage.getItem("roleName");
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");  
  zoneByUserList: any[];
  locationByUserZoneList: any[];
  isAll: boolean;
  constructor(
    private _fb: FormBuilder,
    private _toasterService: NbToastrService,
    private _excelService: ExcelServiceService,
    private _router: Router,
    private datePipe: DatePipe,
    private _pdfService: OnlineCitycorpoAndPouroshovaService,
    private _pdfDetailsService:OnlineCitycorpoAndPouroshovaDetailsService,
    private _service: PourAndCityCorporService,
    private _ministryService: MinistryService,
    private _datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.bsConfig = Object.assign(
      {},
      {
        minMode: this.minMode,
      }
    );
    this.getAllZoneDataList();
    this.getAllCityCorporationDataList();
    this.getAllZoneList();
    this.getZoneByUser();
  }

  private getAllZoneDataList() {
    this._service.getAllZoneDataList().subscribe((res) => {
      this.zoneDataList = res.data;
    });
  }
  private getAllCityCorporationDataList() {
    this._service.getAllCityCorporationDatList().subscribe((res) => {
      this.cityCorporationDataList = res.data;
    });
  }
  

  private getAllZoneList(){
    if(this.roleName=='Admin'){
      this._ministryService.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  private getLocationDDByZone(event:any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  private getLocationList(event:any){
    this._ministryService.getLocationDDByZoneCode(event).subscribe(res => {
      this.form.patchValue({
        locationCode: 0
      })
      this.locationDataDd = res.data;
    });
  }
  public onChangeSelectedZone(zoneCode){
    if(zoneCode != '0'){
      this.getLocationDDByZone(zoneCode);
      this.form.controls['locationCode'].enable();
      this.isLocAndReportHideShow = true;
    }
    else {
      this.form.controls['locationCode'].disable();
      this.locationCodeValue = "0";
      this.isLocAndReportHideShow = false;
    }
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
        this.isAll=this.locationByUserZoneList.length==this.locationDataDd.length?true:false;

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

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName =
        "Online Pouroshova and City Corporation Summary Report " +
        dateFormatForReport(date);
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    } else if (event == 2 || event == 3) {
      let excelObj = {
        data: this.docData.docDefinition.content[0].table.body,
      };
      this._excelService.downloadExcelFile(
        excelObj,
        "Online Pouroshova and City Corporation Summary Report "
      );
    }
  }

  public onSearchAgain() {
    this.isTrue = false;
  }

  onReport() {
    this.isProgress = true;
    this.submitted = true;
    if (this.form.invalid) {
      this.isProgress = false;
      return;
    }

    let utilityObj = {
      billMonth: this.datePipe.transform(this.fCon.billMonth.value, "yMM"),
      ministry: this.form.value.code,
    };
    // if(this.fCon.reportType.value == '1'){
          this._service.getOnlinePouroshovaAndCityCorporationDetails(utilityObj.billMonth,this.fCon.zoneCode.value,this.fCon.locationCode.value,this.fCon.reportType.value).subscribe((res:any) => {
          this.onlinePouroshovaAndCityData = res ;
          if (this.onlinePouroshovaAndCityData.cityCoporationDataList != null &&  this.onlinePouroshovaAndCityData.pouroshovaDataList != null) {
            this.docData = this._pdfService.generatePdf(this.onlinePouroshovaAndCityData,this.fCon.billMonth.value,this.zoneDataList,this.cityCorporationDataList,utilityObj.billMonth);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
              this.isTrue = true;
              this.isProgress = false;
            });
          } else {
            this.isTrue = false;
            this._toasterService.danger("No Data Found");
            this.isProgress = false;
          }
        },
        (err) => {
          this.isProgress = false;
        }
      );
    // }
    // else if(this.fCon.reportType.value == '2'){
    //       this._service.getOnlinePouroshovaAndCityCorporationDetails(utilityObj.billMonth,this.fCon.zoneCode.value,this.fCon.locationCode.value,this.fCon.cityCorporationCode.value).subscribe((res:any) => {
    //       this.onlinePouroshovaAndCityData = res ;
    //       if (this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList != null) {
    //         this.docData = this._pdfDetailsService.generatePdf(this.onlinePouroshovaAndCityData.cityPouroshovaDetailsDataList,utilityObj,this.zoneDataList,);
    //         this.docData.getBase64((base64Data) => {
    //           this.report = base64Data;
    //           this.documentTitle = this.docData.docDefinition.info.title;
    //           this.isTrue = true;
    //           this.isProgress = false;
    //         });
    //       } else {
    //         this.isTrue = false;
    //         this._toasterService.danger("No Data Found");
    //         this.isProgress = false;
    //       }
    //     },
    //     (err) => {
    //       this.isProgress = false;
    //     }
    //   );
    // }
  }

  space(e: any) {
    if (e.charCode === 32) {
      e.preventDefault();
    }
  }
  createForm() {
    this.form = this._fb.group({
      billMonth: ["", [Validators.required]],
      zoneCode: ['0',[Validators.required]],
      locationCode: ['0'],
      reportType: ['1'],
    });
  }

  get fCon() {
    return this.form.controls;
  }
  get fVal() {
    return this.form.value;
  }
}
