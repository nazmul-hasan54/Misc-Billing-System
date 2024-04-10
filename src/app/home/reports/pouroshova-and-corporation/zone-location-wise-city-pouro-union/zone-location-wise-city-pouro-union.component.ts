import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbToastrService } from '@nebular/theme';
import { dateFormatForReport } from '../../../../@core/utils/utiliy';
import { CommonService } from '../../../../services/common.service';
import { ExcelServiceService } from '../../../../services/pdfGenerate/excel-service.service';
import { ZoneLocationWiseCityPouroUnionService } from '../../../../services/pdfGenerate/pourcityandunion/zone-location-wise-city-pouro-union.service';
import { PourAndCityCorporService } from '../../../../services/pour-and-city-corpor.service';

@Component({
  selector: 'ngx-zone-location-wise-city-pouro-union',
  templateUrl: './zone-location-wise-city-pouro-union.component.html',
  styleUrls: ['./zone-location-wise-city-pouro-union.component.scss'],
  providers: [DatePipe]
})
export class ZoneLocationWiseCityPouroUnionComponent implements OnInit {

  public zoneLocationWiseCityPouroUnionForm: FormGroup;
  exportTypeList: any[] = [
    {"id": 1, "name":".pdf"},
    {"id": 2, "name":".xls"}
  ]
  public report: any;
  documentTitle = "";
  isProgress: boolean = false;
  cityPouroUnionList: any[] = [];
  docData: any;
  public isTrue: boolean = false;
  zoneCodeDD: any []=[];

  constructor(
    private _fb: FormBuilder,
    private _service: PourAndCityCorporService,
    private _pdFservice: ZoneLocationWiseCityPouroUnionService,
    private _toasterService: NbToastrService,
    private _commonService: CommonService,
    private _excelService: ExcelServiceService,
    private _zoneService: PourAndCityCorporService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllZoneDD();
  }

  createForm() {
    this.zoneLocationWiseCityPouroUnionForm = this._fb.group({
      billMonth: ['', [Validators.required]],
      zoneCode: [4]
    })
  }

  private getAllZoneDD() {
    this._zoneService.getAllZoneDataList().subscribe(res => {
      this.zoneCodeDD = res.data;
    })
  }
  private getAllLocationDD() {
    this._zoneService.getAllLocationDDList().subscribe(res => {
      this.zoneCodeDD = res.data;
    })
  }

  get formCon() {
    return this.zoneLocationWiseCityPouroUnionForm.controls;
  }

  public onSearchAgain() {
    this.isTrue = false;
    this.getAllZoneDD();
  }

  onChangeExportType(event: any) {
    if (event == 1) {
      let date = new Date();
      let fileName = 'CityPouroUnioon' + dateFormatForReport(date);
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
      this._excelService.downloadExcelFile(excelObj, 'সিটি কর্পোরেশন/পৌরসভা/ইউনিয়ন পরিষদ এর বকেয়া সংক্রান্ত হালনাগাদ তথ্য প্রেরণের ছক');
    }
  }

  onReport() {
    //this.isProgress = true;
    let zoneCode = this.formCon.zoneCode.value;
    //if (this.zoneLocationWiseCityPouroUnionForm.invalid)
    //{
    //  this.isProgress = false;
    //  return;
    //}
    let utilityObj = {
      billMonth: this.datePipe.transform(this.formCon.billMonth.value, 'yMM'),
      zoneCode: this.formCon.zoneCode.value
    };
    this._service.getZoneLocationCityPouroUnion(utilityObj.billMonth, zoneCode ).subscribe(res => {
      this.zoneCodeDD = res.data;
      if (this.zoneCodeDD.length > 0) {
        this.docData = this._pdFservice.generatePdf(this.zoneCodeDD);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
          this.isProgress = false;
        });
      }
      else {
        this.isTrue = false;
        this._toasterService.danger("No Data Found");
        this.isProgress = false;
      }
    }, err=>{
      this.isProgress=false;
    });
  };

}
