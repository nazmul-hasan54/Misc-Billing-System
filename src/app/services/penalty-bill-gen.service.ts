import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PenaltyBillGenService {
  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  savePenaltyBill(billGenerate:any){
    return this.http.post(this.baseApiUrl+'save-penalty-bill',billGenerate);
  }

  getPenaltyBill(billGenerate:any){
    return this.http.post(this.baseApiUrl+'get-penalty-bill',billGenerate);
  }
  getPenaltyBillSrPrint(billNum: string, consumerNo: string){
    return this.http.get(this.baseApiUrl + 'penalty-bill-sr-print/'+`${billNum}/${consumerNo}`);
  }

  getPenaltyBillNonCustPrint(billNum: string, consumerNo: string){
    return this.http.get(this.baseApiUrl + 'penalty-bill-non-cust-print/'+`${billNum}/${consumerNo}`);
  }

  getPenaltyBillInstallmentPlan(billNumber:string){
    return this.http.get(this.baseApiUrl+'get-penaltybill-installmentplan/'+billNumber);
  }

  getBillPaymentDetails(consumerNo: string,locationCode:string){
    return this.http.get(this.baseApiUrl + 'bill-details-by-customer/'+`${consumerNo}/${locationCode}`);
  }

  getbillDetailsByBillNumbr(consumerNo: string,billNumber:string, user:string){
    return this.http.get(this.baseApiUrl + 'bill-details-by-billnumber/'+`${consumerNo}/${billNumber}/${user}`);
  }

  getUserAccessMenu(PageId:number,userName:string){
    return this.http.get(this.baseApiUrl +'get-user-access-menu/'+`${PageId}/${userName}`)
  }

  savePenaltyBillPrepaid(penaltybillPrepaid:any){
    return this.http.post(this.baseApiUrl+'save-penalty-bill-prepaid',penaltybillPrepaid);
  }

  getPenaltyBillPrepaid(billPrepaid:any){
    return this.http.post(this.baseApiUrl+'get-penalty-bill-prepaid',billPrepaid);
  }

  getPenaltyBillPrepaidSrPrint(billNum: string, consumerNo: string){
    return this.http.get(this.baseApiUrl + 'penalty-bill-prepaid-sr-print/'+`${billNum}/${consumerNo}`);
  }
}
