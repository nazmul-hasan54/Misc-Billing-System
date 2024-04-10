import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { PourCorporArrearYearlyService } from '../../../../services/pdfGenerate/pouroshova-and-city-corporation/pour-corpor-arrear-yearly.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';


@Component({
  selector: 'ngx-pour-corpor-uni-arrear-yearly',
  templateUrl: './pour-corpor-uni-arrear-yearly.component.html',
  styleUrls: ['./pour-corpor-uni-arrear-yearly.component.scss']
})
export class PourCorporUniArrearYearlyComponent implements OnInit {
  isProgress:boolean=false;
  submitted:boolean=false;
  public form: FormGroup;
  public isTrue:boolean=false;
  public report: any;
  pouroshovaAndCityData: any;
  zoneDataList: any[];
  docData: any;
  documentTitle = "";
  exportTypeList:any[]=[
    {"id":1,"name":".pdf"},
    {"id":2,"name":".xls"},
  ]
  cityCorporationDataList: any;
  
  constructor(
    private _service: PourAndCityCorporService,
    private fb: FormBuilder,
    private _pdfService: PourCorporArrearYearlyService,
    private _toasterService: NbToastrService,
    private _excelService:ExcelServiceService
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDataList();
    this.getAllCityCorporationDataList();
  }

  private createForm(){
    this.form = this.fb.group({
      currentDate: ['',[Validators.required]]
    })
  }
  private getAllZoneDataList(){
    this._service.getAllZoneDataList().subscribe(res=>{
      this.zoneDataList = res.data;
    })
  }
  private getAllCityCorporationDataList(){
    this._service.getAllCityCorporationDatList().subscribe(res=>{
      this.cityCorporationDataList = res.data;
  });
}
  get formCon(){
    return this.form.controls;
  }

  public onSearchAgain(){
    this.isTrue=false;
  }


  onChangeExportType(event:any){
    if(event==1){
      let date=new Date();
      let fileName='Pouroshova and City Corporation'+dateFormatForReport(date);
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
      this._excelService.downloadExcelFile(excelObj, 'সিটি কর্পোরেশন ও পৌরসভার বকেয়া বিবরনী');
    }
  }

  public onReport(){
    this.isProgress=true;
    this.submitted=true;
    if(this.form.invalid) {this.isProgress=false;return;}
   
    this._service.getPouroshovaAndCityCorporationData(dateFormatForReport(this.formCon.currentDate.value).toString()).subscribe(res=>{
      this.pouroshovaAndCityData=res.data;
      if(this.pouroshovaAndCityData.length>0 && this.zoneDataList.length > 0){
        this.docData=this._pdfService.generatePdf(this.pouroshovaAndCityData, this.formCon.currentDate.value, this.zoneDataList, this.cityCorporationDataList); 
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
        this.isTrue = true;
        this.isProgress=false;
        });
      }

      else{
        this.isTrue = false;
        this._toasterService.danger("No Data Found");
        this.isProgress=false;
      }
    }, err=>{
      this.isProgress=false;
    });
  }

}

