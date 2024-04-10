import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PrepaidToPostpaidMod } from '../model/prepaid-to-postpaid-mod.model';

@Injectable({
  providedIn: 'root'
})
export class ModBillService {


  private baseApiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  // getAllMinistryArrear(currDate: string) {
  //   return this.http.get(this.baseApiUrl + 'get-ministry-arrear-by-date?CurrentDate=' + currDate);
  // }
  getAllMinistryArrear(currDate: string) {
    return this.http.get<any>(`${environment.apiUrl}get-ministry-arrear-by-date?CurrentDate=` + currDate);
  }

  getAllModBillByLocAndMonth(locationCode: string, billMonth: string){
    return this.http.get(this.baseApiUrl+'get-mod-bill-by-code-and-date/'+ locationCode+'/'+billMonth);
  }

  getAllPrepaidModData(modData: any){
    return this.http.post(this.baseApiUrl+'get-prepaidmoddata', modData)
  }
  getLocationCodeAndDeptCode(){
    return this.http.get(this.baseApiUrl+'get-location-code-and-dept-code');
  }
}
