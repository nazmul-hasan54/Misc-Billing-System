import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MrsGenerateService {

  baseApiUrl: string =environment.apiUrl;
  constructor(private http:HttpClient) { }
  
  getMrsGenarateByCustomer(locationCode:string,customerNumber:string,billCycleCode:string){
    return this.http.get(this.baseApiUrl+'get-mrsgenarate-by-customernumber/'+locationCode+'/'+customerNumber+'/'+billCycleCode);
  }
  saveMrsGenerate(msrmodel){
    return this.http.post(this.baseApiUrl+'save-mrs-bill',msrmodel);
  } 
  getMrsBillCalculation(userLocation:string,customerNumber:string,billCycleCode:string){
    return this.http.get(this.baseApiUrl+'get-mrs-bill-calculation/'+userLocation+'/'+customerNumber+'/'+billCycleCode);
  }
  getMrsBillReport(locationCode:string,customerNumber:string,billNumber:string){
    return this.http.get(this.baseApiUrl+'get-mrs-bill-report/'+locationCode+'/'+customerNumber+'/'+billNumber);
  }
}
