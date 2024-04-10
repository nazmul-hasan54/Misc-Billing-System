import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { ReligiousDetailsService } from '../../../../services/pdfGenerate/religious/religious-details.service';
import { ReligiousPdfServiceService } from '../../../../services/pdfGenerate/religious/religious-pdf-service.service';
import { TempleMosqueSummaryService } from '../../../../services/pdfGenerate/religious/temple-mosque-summary.service';
import { ReligiousService } from '../../../../services/religious.service';
import { MinistryService } from '../../../../services/ministry.service';
import { ReligiousLocationReportService } from '../../../../services/pdfGenerate/religious/religious-location-report.service';
import { event } from 'jquery';

@Component({
  selector: 'ngx-religious-place',
  templateUrl: './religious-summery.component.html',
  styleUrls: ['./religious-summery.component.scss']
})
export class ReligiousSummeryComponent implements OnInit {

  religiousForm: FormGroup;
  zoneList: any[];
  locationDdList: any[];
  zoneDataDd: any[];
  circleList: any[];
  allZone = { code: '0', name: 'All' };
  religiousSummeryData: any[];
  public report: any;
  docData: any;
  documentTitle = "";
  iszoneAndCircleHideShow: boolean = false;
  isProgress: boolean = false;
  public isTrue : boolean = false;
  submitted:boolean=false;
  isLoading:boolean=false;
  isLocAndReportHideShow:boolean=false;
  reportType: any[]=[
    {"key":'1', "value":"Summary "},
    {"key":'2', "value":"Details"},
    // {"key":'3', "value":"Location"},
  ];
  exportTypeList: any[]=[
    {"id":1, "name":".pdf"},
    {"id":2, "name":".xls"}
  ];
  circleCodeValue: string;
  isLocationHideShow:boolean=false;
  roleName:string=localStorage.getItem('roleName');
  userName:string=localStorage.getItem("userName");
  userNames=this.userName.split(",");
  zoneByUserList:any[]=[];
  circleByUserZoneList:any[]=[];
  locationByUserCircleList:any[];
  isAllAdded: any;
  isAll: boolean;

  constructor(
    private _service: ReligiousService,
    private datePipe: DatePipe,
    private _fb: FormBuilder,
    private _religiousPdfService: ReligiousPdfServiceService,
    private _excelService: ExcelServiceService,
    private _toastrService: NbToastrService,
    private _religiousDetails:TempleMosqueSummaryService,
    private _religiousDetail:ReligiousDetailsService,
    private _ministryService : MinistryService,
    private _religiousLocation:ReligiousLocationReportService
  ) { }

  ngOnInit(): void {
    this.getAllZoneList();
    this.createForm();
    this.getZoneByUser();
  }


  onSearchAgain(){
    this.isTrue=false;
  }

  onChangeExportType(event: any) {
    if (this.formCon.reportType.value == '1'){
      if (event == 1) {
        let date = new Date();
        let fileName = 'Religious Summary Report ' + dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
            this.isLoading = true;
            let excelObj = {
              data: this.docData.docDefinition.content[1].table.body,
            }
            setTimeout(() => {
              let exporter =  this._excelService.downloadExcelFile(excelObj, 'Religious Summary Report ');
                //@ts-ignore
              if(exporter.payload.data.length > 0 ){
                this.isLoading = false;
              }
            }, 800);
            setTimeout(() => {
              this.isLoading = false;
            }, 3000);
          }
    }
    if (this.formCon.reportType.value == '2'){
      if (event == 1) {
        let date = new Date();
        let fileName = 'Religious Details Report ' + dateFormatForReport(date);
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href = source;
        link.download = `${fileName}.pdf`
        link.click();
      }
      else if(event==2 || event==3){
            this.isLoading = true;
            let excelObj = {
              data: this.docData.docDefinition.content[0].table.body,
            }
            setTimeout(() => {
              let exporter =  this._excelService.downloadExcelFile(excelObj, 'Religious Details Report ');
                //@ts-ignore
              if(exporter.payload.data.length > 0 ){
                this.isLoading = false;
              }
            }, 800);
            setTimeout(() => {
              this.isLoading = false;
            }, 3000);
          }
    }
  }

  private getAllZoneList(){
    if(this.roleName=='Admin'){
      this._service.getAllZone().subscribe(res => {
        this.zoneList = res.data;
      });
    }
  }

  private getAllCircleDdByZoneCode(event: any){
    if(this.roleName=='Admin'){
      this.getCircleList(event);
    }
  }

  private getCircleList(event: any){
    this._service.getAllCircleByZoneCode(event).subscribe(res =>{
      // this.religiousForm.patchValue({
      //   circleCode: 0,
      //   locationCode:0
      // })
      this.circleList = res.data;
      this.formCon.circleCode.setValue('0');
      this.formCon.locationCode.setValue('0');
    });
  }
  
  private getLocationByCircle(event : any){
    if(this.roleName=='Admin'){
      this.getLocationList(event);
    }
  }
  private getLocationList(event:any){
    this._service.getAllLocationByCircle(event ).subscribe((res:any) =>{
      // this.religiousForm.patchValue({
      //   locationCode: 0
      // })
      this.locationDdList = res;
      this.formCon.locationCode.setValue('0');
    });
  }
  public onChangeSelectedCircle(zoneCode: string){
    if(zoneCode != '0'){
      this.getAllCircleDdByZoneCode(zoneCode);
      this.religiousForm.controls['circleCode'].enable();
      this.iszoneAndCircleHideShow = true;
    }
    else{
      this.religiousForm.controls['circleCode'].disable();
      // this.circleCodeValue = "0";
      this.formCon.circleCode.setValue('0');
      this.formCon.locationCode.setValue('0');
      this.iszoneAndCircleHideShow = false;
    }
  }
  public onChangeSelectedLocation(circleCode: string){
    if(circleCode != '0'){
      this.getLocationByCircle(circleCode);
      this.religiousForm.controls['locationCode'].enable();
      this.isLocationHideShow = true;
    }
    else{
      this.religiousForm.controls['locationCode'].disable();
      // this.formCon.locationCode.setValue('0');
      this.religiousForm.controls['locationCode'].setValue('0');
      // this.circleCodeValue = "0";
      this.isLocationHideShow = false;
    }
  }
  // private getAllCircleList(){
  //   this._service.getAllCircle().subscribe(res => {
  //     this.circleList = res.data;
  //   });
  // }

  // private getLocationDd(zoneCode : string){
  //   this._ministryService.getLocationDDByZoneCode(zoneCode).subscribe(res => {
  //     this.religiousForm.patchValue({
  //       locationCode: 0
  //     })
  //     this.locationDdList = res.data;
  //   });
  // }

  // public onChangeSelectDb(zoneCode){
  //   if(zoneCode != '0'){
  //     this.getLocationDd(zoneCode);
  //     this.religiousForm.controls['locationCode'].enable();
  //     this.isLocAndReportHideShow = true;
  //   } else{
  //     this.religiousForm.controls['locationCode'].disable();
  //     this.isLocAndReportHideShow = false;
  //   }
  // }

  getZoneByUser(){
    if(this.roleName!='Admin'){
      this._ministryService.getZoneByUserName(this.userNames[0]).subscribe((res:any)=>{
        this.zoneByUserList= res as any[];
        this.religiousForm.patchValue({
          zoneCode:this.zoneByUserList[0].code
        });
        this.getCircleByUserNameZoneCode(this.zoneByUserList[0].code);
      });
    }
  }
  getCircleByUserNameZoneCode(event:any){
    this.getCircleList(event);
    setTimeout(()=>{
      if(this.roleName!='Admin'){
        this._ministryService.getCircleByUserNameZoneCode(this.userNames[0],event).subscribe((res:any)=>{
          this.circleByUserZoneList=res as any[];
         this.isAllAdded =  this.circleByUserZoneList.length == this.circleList.length ? true : false;
        
         if(this.isAllAdded){
          this.circleByUserZoneList.unshift({id: 1,name: "All",nameBn:null, nulltemp_C: "all",code: "0",zoneCode: "0"})
         }
          setTimeout(()=>{
            this.religiousForm.patchValue({
              circleCode:this.circleByUserZoneList[0].code
            });
          },300) ;
          this.getLocationByUserNameCircleCodes(this.circleByUserZoneList[0].code);
        });
      }
    },250);
  }
  getLocationByUserNameCircleCodes(event:any){
    this.getLocationList(event);
    setTimeout(()=>{if(this.roleName!='Admin'){
      this._ministryService.getLocationByUserNameCircleCode(this.userNames[0],event).subscribe((res:any)=>{
        this.locationByUserCircleList=res as any[];
        this.isAll=this.locationByUserCircleList.length==this.locationDdList.length?true:false;

        if(this.isAll){
          this.locationByUserCircleList.unshift({id:1,name:"All",nameBn:null,code: "0",zoneCode:"0",circleCode:"0",dbCode:"0",deptCode:"0"})
        }
        setTimeout(()=>{
          this.religiousForm.patchValue({
            locationCode:this.locationByUserCircleList[0].code
          })
        },300) ;
      })
    }
    },250)
  }


  onReport(){
    this.isProgress = true;
    this.submitted=true;
    if(this.religiousForm.invalid) {this.isProgress=false; return};

    let utilityObj = {
      reportDate: this.datePipe.transform(this.formCon.reportDate.value, "yMM"),
      billMonth:this.formCon.reportDate.value,
     };

     if(this.religiousForm.value.circleCode == '0'){
      this.religiousForm.patchValue({
        locationCode:'0',
      })
    }
      if(this.formCon.reportType.value == '1'){
        // Religious Summary
        this._service.getAllReligiousData(dateFormatForReport(this.formCon.reportDate.value).toString(), this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.reportType.value,this.formCon.circleCode.value ).subscribe(res => {
          this.religiousSummeryData = res.data;
          if(this.religiousSummeryData.length > 0){
            this.docData = this._religiousDetails.generatePdf(this.religiousSummeryData, this.formCon.zoneCode.value, utilityObj);
            this.docData.getBase64((base64Data) => {
              this.report = base64Data;
              this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue = true;
            this.isProgress=false;
            });
          }
          else {
            this.isTrue = false;
            this._toastrService.danger('Data Not Found');
            this.isProgress = false;
          }
        }, err=>{
          this.isProgress=false;
        });
        
      }
      else if (this.formCon.reportType.value == '2'){
        // Religious Details 
        this._service.getAllReligiousData(dateFormatForReport(this.formCon.reportDate.value).toString(), this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.reportType.value,this.formCon.circleCode.value).subscribe(res => {
          this.religiousSummeryData = res.data;
            if(this.religiousSummeryData.length > 0){
              this.docData = this._religiousDetail.generatePdf(this.religiousSummeryData, this.formCon.zoneCode.value, utilityObj);
              this.docData.getBase64((base64Data) => {
                this.report = base64Data;
                this.documentTitle = this.docData.docDefinition.info.title;
              this.isTrue = true;
              this.isProgress=false;
              });
            }
            else {
              this.isTrue = false;
              this._toastrService.danger('Data Not Found');
              this.isProgress = false;
            }
          }, err=>{
            this.isProgress=false;
          });
      }
      // else{
      //   // Religious Location 
      //   this._service.getAllReligiousData(dateFormatForReport(this.formCon.reportDate.value).toString(), this.formCon.zoneCode.value, this.formCon.locationCode.value, this.formCon.reportType.value,this.formCon.circleCode.value).subscribe(res => {
      //     this.religiousSummeryData = res.data;
      //       if(this.religiousSummeryData.length > 0){
      //         this.docData = this._religiousLocation.generatePdf(this.religiousSummeryData, this.formCon.zoneCode.value,utilityObj);
      //         this.docData.getBase64((base64Data) => {
      //           this.report = base64Data;
      //           this.documentTitle = this.docData.docDefinition.info.title;
      //         this.isTrue = true;
      //         this.isProgress=false;
      //         });
      //       }
      //       else {
      //         this.isTrue = false;
      //         this._toastrService.danger('Data Not Found');
      //         this.isProgress = false;
      //       }
      //     }, err=>{
      //       this.isProgress=false;
      //     });
      // }
  }
  createForm(){
    this.religiousForm = this._fb.group({
      reportDate: ['', [Validators.required]],
      zoneCode: ['0', [Validators.required]],
      circleCode: ['0'],
      locationCode: ['0'],
      reportType: ['1'],
      exportType:[1,[]]
    })
  }

  get formCon(){
    return this.religiousForm.controls;
  }
}
