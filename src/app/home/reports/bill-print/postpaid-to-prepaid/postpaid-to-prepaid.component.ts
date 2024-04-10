import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostpaidCustDetailsModel } from '../../../../model/postpaid-to-prepaid.model';
import { SuplimentartBillSrService } from '../../../../services/pdfGenerate/bill-print-view/supplementary-bill/suplimentart-bill-sr.service';
import { PostPaidToPrePaidPdfService } from '../../../../services/pdfGenerate/postpaid-to-prepaid/post-paid-to-pre-paid-pdf.service';
import { PenaltyBillGenService } from '../../../../services/penalty-bill-gen.service';
import { PostpaidToPrepaidService } from '../../../../services/postpaid-to-prepaid.service';

@Component({
  selector: 'ngx-postpaid-to-prepaid',
  templateUrl: './postpaid-to-prepaid.component.html',
  styleUrls: ['./postpaid-to-prepaid.component.scss']
})
export class PostpaidToPrepaidComponent implements OnInit {

  postpaidtoprepaidform: FormGroup;
    isTrue: boolean = false;
    report: any;
    documentTitle = "";
    docData: any;    
    isProgress:boolean=false;
    pdfList:PostpaidCustDetailsModel[]=[];

    exportTypeList: any[] = [
      { "id": 1, "name": ".pdf" },
    ]
    penaltyBillPrintData: Object;
    constructor(
      private _fb: FormBuilder,
      private _suplimentaryBillsr: SuplimentartBillSrService,
      private _penaltyService: PenaltyBillGenService,
      private _activateRoute: ActivatedRoute,
      private _router: Router,
      private _posttopreService: PostpaidToPrepaidService,
      private _pdfService:PostPaidToPrePaidPdfService,
  
    ) { }
  
    ngOnInit(): void {
      debugger;
      if (this._activateRoute.snapshot.paramMap.get('customerNumber') !== null && this._activateRoute.snapshot.paramMap.get('locationCode') !== null) {
       let customerNumber = this._activateRoute.snapshot.paramMap.get('customerNumber');
        let locationCode = this._activateRoute.snapshot.paramMap.get('locationCode');
        this.onReport(customerNumber, locationCode);
      }
      this.createForm();
    }
  
    onReport(customerNumber, locationCode) {
      this._posttopreService.getPrepaidPrint(customerNumber, locationCode).subscribe(res => {
        this.pdfList = res as PostpaidCustDetailsModel[];
        this.docData = this._pdfService.generatePdf(this.pdfList);
        this.docData.getBase64((base64Data) => {
          this.report = base64Data;
          this.documentTitle = this.docData.docDefinition.info.title;
          this.isTrue = true;
        });
      });
    }

    onSearchAgain(){
      this.isTrue=false;
      this._router.navigate(["postpaid-to-prepaid/posttopre-view"]);
    }
  
    onChangeExportType(event: any){
      if(event==1){
        let fileName= "Postpaid ToPrepaid Bill";
        const source = `data:application/pdf;base64,${this.report}`;
        const link = document.createElement("a");
        link.href=source;
        link.download=`${fileName}.pdf`
        link.click();
      }
    }
  
    createForm() {
      this.postpaidtoprepaidform = this._fb.group({
        locationCodes:[0,[]],
        customerNumber:[],
      })
    }
    
    get formVal() {
      return this.postpaidtoprepaidform.value;
    }
  
    get f() {
      return this.postpaidtoprepaidform.controls;
    }
  }
  