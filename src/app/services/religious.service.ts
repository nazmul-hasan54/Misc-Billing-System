import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { data } from 'jquery';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReligiousService {

  constructor(private http: HttpClient) { }

  getAllZone(){
    return this.http.get<any>(
      `${environment.apiUrl}get-all-zone`
    );
  }

  getAllCircle(){
    return this.http.get<any>(
      `${environment.apiUrl}get-all-circle`
    );
  }

  getAllCircleByZoneCode(zoneCode: string){
    return this.http.get<any>(
      `${environment.apiUrl}get-all-circle-by-zone-code/` + zoneCode
    );
  }

  getAllReligiousData(reportDate: string, zoneCode: string, locationCode: string, reportType: string,circleCode:string){
    return this.http.get<any>(
      `${environment.apiUrl}get-religious-data-list/` + reportDate + `/` + zoneCode + `/` + locationCode + `/` + reportType+ `/` +circleCode
    );
  }
  
  getAllLocationByCircle(circleCode : string){
    return this.http.get(`${environment.apiUrl}get-location-by-circle/`+ circleCode);
  }

  getFiscalYear(){
    return this.http.get(`${environment.apiUrl}get-financial-year-list`);
  }

  getMosqueAndWorshipDataList(startMonth: string, endMonth:string){
    return this.http.get(`${environment.apiUrl}religious-circle-wise-rpt/`+ startMonth + `/` + endMonth);
  }

  getLocationDDByZoneCode(zoneCode: string) {
    return this.http.get<any>(`${environment.apiUrl}get-location-by-zone-code?ZoneCode=`+zoneCode);
  }

  // getZoneAndLocationWiseRailwayArrear(zoneCode: string,reportDate: string,locationCode: string, reportType: string){
  //   return this.http.get(`${environment.apiUrl}get-railway-arrear/`+ zoneCode+'/'+ reportDate+'/'+ locationCode+'/'+reportType)
  // }

  getLocationWiseReligiousRpt(startMonth: string, endMonth: string,zoneCode:string,locationCode: string){
    return this.http.get(`${environment.apiUrl}religious-location-wise-rep?startMonth=` + startMonth + `&endMonth=`+ endMonth +`&zoneCode=`+zoneCode+`&locationCode=`+locationCode);
  }

  getReligiousReceiptList(locationCode:string){
    return this.http.get(`${environment.apiUrl}get-religious-receipt-list/` + locationCode);
  }

  saveReligiousReceipt(data:any){
    return this.http.post(`${environment.apiUrl}save-religious-receipt-bill`, data)
  }
  
  getReligiousByMonths(billMonth:string,zoneCode:string,locationCode: string){
    return this.http.get(`${environment.apiUrl}get-religious-by-month/` + billMonth+'/'+zoneCode+'/'+locationCode);
  }
}
