import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PostpaidToPrepaidService } from '../../../services/postpaid-to-prepaid.service';
import { PrepaidConsumerByTransidService } from '../../../services/pdfGenerate/postpaid-to-prepaid/prepaid-consumer-by-transid.service';
import { PrepaidCustomerModel } from '../../../model/mis-report/prepaid-customer';
import { dateFormatForReport } from '../../../@core/utils/utiliy';
import { MinistryCustomeService } from '../../../services/ministry-custome.service';
import { DDForStringKeyModel } from '../../../model/DD-for-string-key.model';

@Component({
  selector: 'ngx-prepaid-customer-by-transid',
  templateUrl: './prepaid-customer-by-transid.component.html',
  styleUrls: ['./prepaid-customer-by-transid.component.scss']
})
export class PrepaidCustomerByTransidComponent implements OnInit {
  prepaidCustform:FormGroup;
  isProgress:boolean=false;
  isTrue:boolean=false;


  report:any;
  divisionList: any;
  districtList: any;
  thanaList: any;
  constructor(
    private _fb:FormBuilder,
    private _service:PostpaidToPrepaidService,
    private _prepaideConsumerByTransId:PrepaidConsumerByTransidService,
    private _ministryCustservice: MinistryCustomeService,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getAllDivision();
    this.getAllDistrict();
    this.getAllThana();
  }
  prepaidCustomerData:any;
  docData:any;
  documentTitle='';

  onSearchAgain(){
    this.isTrue=false;
  }

  
  getAllDivision() {
    this._service.getDivisionForPrepaidCustomer().subscribe((res: any) => {
      this.divisionList = res as any;
    });
  }
  
  getAllDistrict() {
    this._service.geDistrictForPrepaidCustomer().subscribe((res: any) => {
      this.districtList = res as any;
    });
  }
  
  getAllThana() {
    this._service.getThanaForPrepaidCustomer().subscribe((res: any) => {
      this.thanaList = res as any;
    });
  }
  
  onReport(){
    if(this.prepaidCustform.valid){

      let division;
      let district;
      let thana;
 
      this._service.getPrepaidCustomerByTransId(this.f.transID.value).subscribe((res:any)=>{
        this.prepaidCustomerData=res as any;

        let details={
          division: this.divisionList.find((d)=>d.divisionId==this.prepaidCustomerData.division),
          district: this.districtList.find((d)=>d.districtId==this.prepaidCustomerData.district),
          thana: this.thanaList.find((d)=>d.thanaId==this.prepaidCustomerData.thana),
        }
          this.docData = this._prepaideConsumerByTransId.generatePdf(this.prepaidCustomerData,details);
          this.docData.getBase64((base64Data) => {
            this.report = base64Data;
            this.documentTitle = this.docData.docDefinition.info.title;
            this.isTrue=true;
            let date = new Date();
            let fileName = 'Prepaid Customer Information ' + dateFormatForReport(date);
            const source = `data:application/pdf;base64,${this.report}`;
            const link = document.createElement("a");
            link.href = source;
            link.download = `${fileName}.pdf`
            link.click();
          });
      })
    }
    else{

    }
  }

  createForm(){
    this.prepaidCustform=this._fb.group({
      transID:[,[Validators.required]]
    })
  }
  get f(){
    return this.prepaidCustform.controls;
  }
}
