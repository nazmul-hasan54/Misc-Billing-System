import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DcRcBillGenService {
  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  
  dcRCBillSave(billGenerate:any){
    return this.http.post(this.baseApiUrl+'save-dcrc-bill',billGenerate);
  }

  getDcRcBill(billGenerate:any){
    return this.http.post(this.baseApiUrl+'get-dcrc-bill',billGenerate);
  }
  updateRcDate(billNumber:any){
    return this.http.post(this.baseApiUrl+'update-rcdate',billNumber);
  }
}
