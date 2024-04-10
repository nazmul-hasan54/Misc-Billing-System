import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { MRSBillPrintModel } from '../../../../../model/temporary/mrsBillPrint.model';
import { MrsGenerateService } from '../../../../../services/mrs-generate.service';
import { CencusBillService } from '../../../../../services/pdfGenerate/bill-print-view/cencus-bill/cencus-bill.service';
import { TemporaryBillService } from '../../../../../services/temporary-bill.service';
import { TemporaryBillModule } from '../../../../temporary-bill/temporary-bill.module';

@Component({
  selector: 'ngx-cencus-bill-print',
  templateUrl: './cencus-bill-print.component.html',
  styleUrls: ['./cencus-bill-print.component.scss']
})
export class CencusBillPrintComponent implements OnInit {

  documentTitle = "";
  report : any;
  isTrue: boolean = false;
  reportData: any;
  exportTypeList: any[]=[
    {"id":1, "name":'.pdf'},
    {"id":2, "name":'.xls'}
  ];
  temporaryBillData: object;
  docData: any;
  constructor(
    private _router: Router,
    private _temporatyService: TemporaryBillService,
    private http: HttpClient,
    private _cencusService: CencusBillService,
    private _activateRoute: ActivatedRoute,
    private _mrsGernerateService:MrsGenerateService
  ) {}
   
//    public getJSON(): Observable<any> {
//     return this.http.get("../../../../../../assets/response_1675145835849.json");
// }

  ngOnInit(): void {
    debugger
    
    if(this._activateRoute.snapshot.paramMap.get('locationCode') !== null && this._activateRoute.snapshot.paramMap.get('customerNumber') !== null 
    && this._activateRoute.snapshot.paramMap.get('billNumber') !== null){
      let locationCode = this._activateRoute.snapshot.paramMap.get('locationCode');
      let customerNumber = this._activateRoute.snapshot.paramMap.get('customerNumber');
      let billNumber = this._activateRoute.snapshot.paramMap.get('billNumber');
      this.onReport(locationCode, customerNumber, billNumber );
    }
  }

  onChangeExportType(event: any){
    if(event==1){
      let fileName = "Census Bill";
      const source = `data:application/pdf;base64,${this.report}`;
      const link = document.createElement("a");
      link.href = source;
      link.download = `${fileName}.pdf`;
      link.click();
    }
    else if(event==2 || event==3){

    }
  }

  onSearchAgain(){
    this.isTrue = false;
    this._router.navigate(["temporary/bill-mrsgenarate"]);
  }

  onReport(locationCode,customerNumber,billNumber){
  this._mrsGernerateService.getMrsBillReport(locationCode, customerNumber, billNumber).subscribe(res => {
    this.temporaryBillData = res as MRSBillPrintModel[];

    this.docData = this._cencusService.generatePdf(this.temporaryBillData);
    this.docData.getBase64((base64Data) => {
      this.report = base64Data;
      this.documentTitle = this.docData.docDefinition.info.title;
      this.isTrue = true;
    });
  });
  
  }
}
