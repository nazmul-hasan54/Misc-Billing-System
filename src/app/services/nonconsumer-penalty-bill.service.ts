import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NonconsumerPenaltyBillService {
  private baseApiUrl: string = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  nonconsulmerbillsave(billGenarate:any){ 
    return this.http.post(this.baseApiUrl + 'save-nonconsumer-penalty-bill', billGenarate)
  }
  // getNonConsumerBill(billGenarate: any) {
  //   return this.http.post(this.baseApiUrl + 'get-penalty-bill', billGenarate);
  // }

  nonCustLocationName(locationCode:string){
    return this.http.get(this.baseApiUrl + 'get-noncust-location-desc/' + locationCode);
  }
}
