import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscChargeBillService {
  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  miscChargeBillSave(billGenerate: any) {
    return this.http.post(this.baseApiUrl + 'save-misccharge-bill', billGenerate);
  }

  getMiscBill(billGenerate: any) {
    return this.http.post(this.baseApiUrl + 'get-misc-bill', billGenerate);
  }

  updateMiscDate(billNumber: any) {
    return this.http.post(this.baseApiUrl + 'update-miscdate', billNumber);
  }

 
  getMiscDcType(){
    return this.http.get<any>(`${environment.apiUrl}get-misc-type`);
  }

}
