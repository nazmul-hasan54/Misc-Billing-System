import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TotalMinistryService {

  constructor(
    private _http: HttpClient
  ) { }

  getAllZone() {
    return this._http.get<any>(`${environment.apiUrl}get-all-zone`);
  }

  getAllCircleByZoneCode(zoneCode: string) {
    return this._http.get(
      `${environment.apiUrl}get-all-circle-by-zone-code/` + zoneCode
    );
  }

  getAllLocationByCircle(circleCode: string) {
    return this._http.get(`${environment.apiUrl}get-location-by-circle/` + circleCode);
  }

  getTotalLocationWiseMinistryArrear(zoneCode: string, circleCode: string, locationCode: string, billMonth: string) {
    return this._http.get(`${environment.apiUrl}total-ministry-arrear/` + zoneCode + `/` + circleCode + `/` + locationCode + `/` + billMonth);
  }

  getZoneCircleByLocation(locationCode:string){
    return this._http.get(`${environment.apiUrl}get-zone-circle-by-location/`+locationCode);
  }
}
