import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SupplementaryBillGenService {
  private baseApiUrl: string = environment.apiUrl;
  constructor(
    private http:HttpClient
  ) { }

  saveSupplementaryBill(billGenarate:any){
    
    return this.http.post(this.baseApiUrl + 'save-supplementary-bill', billGenarate);
  }
  getSupplementaryBill(billGenarate:any){
    return this.http.post(this.baseApiUrl + 'get-supplementary-bill', billGenarate);
  }

  supplementaryBillSrPrint(billNumber:string,customerNumber:string){
    return this.http.get(this.baseApiUrl+'penalty-bill-sr-print/'+billNumber+'/'+customerNumber);
  }

  getSupplementaryIntallmentPlan(billNumber:string){
    return this.http.get(this.baseApiUrl+'get-supplementary-installmentplan/'+billNumber);
  }

  saveSupplementaryExistingConsumer(data: any) {
    return this.http.post(`${environment.apiUrl}save-supplementary-existing-consumer`,data);
  }

}
