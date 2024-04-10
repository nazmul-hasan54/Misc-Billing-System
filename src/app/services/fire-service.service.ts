import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FireServiceService {

  constructor(private http: HttpClient) {

  }

  baseApiUrl = environment.apiUrl;

  getSecurityServiceDivArrearDetails(billMonth: string, zoneCode: string, locationCode: string, reportType: string) {
    return this.http.get(`${environment.apiUrl}get-online-security-Service-arrear-details/` + billMonth + `/` + zoneCode + `/` + locationCode + `/` + reportType);
  }
  
}
