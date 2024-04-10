import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TemporaryBillService {
  baseApiUrl: string =environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAllFeeder(locationCode:string){
    return this.http.get(this.baseApiUrl+'get-feeder-by-location/'+locationCode);
  }
  getInitialReading(meterTypeCode : string){
    return this.http.get(this.baseApiUrl+'get-initial-reading/'+meterTypeCode);
  }
  saveCensusBill(censusBill){
    return this.http.post(this.baseApiUrl+'save-census-bill',censusBill);
  }
  getCustomerCensusList(locationCode:any){
    return this.http.get(this.baseApiUrl+'get-customer-census-list/'+locationCode)
  } 
  getTemporaryBill(temporarybill: any) {
    return this.http.post(this.baseApiUrl + 'get-temporary-bill', temporarybill);
  }

  
}
