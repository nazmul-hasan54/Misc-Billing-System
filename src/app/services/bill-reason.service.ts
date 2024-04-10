import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillReasonService {


  constructor(private httpClient:HttpClient) { }

  getPenaltyBillReason(){
    return this.httpClient.get(environment.apiUrl+'get-penalty-billing-reason');
  }
  getNonCustPenaltyBillReason(){
    return this.httpClient.get(environment.apiUrl+'get-noncust-billing-reason');
  }
  getSupplementaryBillReason(){
    return this.httpClient.get(environment.apiUrl + 'get-billreason-for-supplimentary');
  }
  getMiscchargeBillReason(){
    return this.httpClient.get<any>(
      `${environment.apiUrl}get-billreason-for-misc-charge`
    );
  }
}
