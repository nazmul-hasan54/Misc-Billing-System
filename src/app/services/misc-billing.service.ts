import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscBillingService {
  baseApiUrl: string =environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  

  getBillingReason(){
    return this.http.get<any>(
      `${environment.apiUrl}get-dcrc-billing-reason` 
    );
  }
  getDcType(){
    return this.http.get<any>(
      `${environment.apiUrl}get-dc-type` 
    );
  }
  getImposedBy(){
    return this.http.get<any>(
      `${environment.apiUrl}get-imposed-by` 
    );
  }
  getCustomerByCustNumber(customerNumber:string,locationCode:string){
    return this.http.get(this.baseApiUrl+'get-customer-details-by-number/'+customerNumber+'/'+locationCode);
  }

  getUntracedCustomerByCustNumber(customerNumber:string,dbCode:string, locCode:string){
    return this.http.get(this.baseApiUrl+'get-untraced-customer-by-number?customerNumber='+customerNumber+'&dbCode='+dbCode+'&locCode='+locCode);
  }

  getByBillNumber(billNumber:string,customerNumber:string){
    return this.http.get(this.baseApiUrl+'get-customer-details-by-billNumber/'+billNumber+'/'+customerNumber);
  }
  getNonCustomerByBillAndCustomerNumber(billNumber: string, customerNumber: string){
    return this.http.get(this.baseApiUrl+'get-non-customer-details-by-billNumber/'+billNumber+'/'+customerNumber);
  }
  getCalculateBill(objParam){
    return this.http.post(this.baseApiUrl +'get-penalty-amount',objParam);
  }
  getSuplimentaryBillAmount(objParam) {
    return this.http.post(this.baseApiUrl + 'get-supplementary-amount', objParam);
  }
  getDcRcBillAmount(objParam) {
    return this.http.post(this.baseApiUrl + 'get-dcrc-amount', objParam);
  }
  getNonConsumerBillAmount(objParam){
    return this.http.post<any>(this.baseApiUrl +'get-nonconsumer-penalty-amount',objParam);
  }

  getMiscChargeBillAmount(objParam){
    return this.http.post(this.baseApiUrl + 'get-misc-charge-amount', objParam);
  }

  PenaltyCustLocationName(locationCode: string) {
    return this.http.get(this.baseApiUrl + 'get-noncust-location-desc/' + locationCode);
  }
  
 getAllLocation(){
   return this.http.get<any>(
     `${environment.apiUrl}get-all-location`
   );
 }

//  getLocationByDbArray(dbCode:any){
//    return this.http.get(this.baseApiUrl + 'get-location-by-db-array/'+ dbCode);
//  }
 
savePenaltyExistingConsumer(data:any){
  return this.http.post(`${environment.apiUrl}save-penalty-existing-consumer`,data)
}

getPenaltyBillPrepaidByCustomerNumber(customerNumber:string,dbCode:string, locCode:string){
  return this.http.get(this.baseApiUrl+'get-customer-details-prepaid-bill-penalty?customerNumber='+customerNumber+'&dbCode='+dbCode+'&locCode='+locCode);
}

}
