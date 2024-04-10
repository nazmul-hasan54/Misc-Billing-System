import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ZonewiseUnionService {
  baseApiUrl: string = environment.apiUrl;
  constructor(private _http: HttpClient) { }

  getZoneWsieUnionData(zoneCode:string,circleCode:string,locationCode:string,billMonth: string,reportType:string) {
    return this._http.get(this.baseApiUrl + 'get_unionporishodby_date/'+zoneCode+'/'+circleCode+'/'+locationCode+'/'+billMonth+'/'+reportType);
  }

  getOnlineUnionPorishod(zoneCode:string,locationCode:string,billMonth: string,reportType:string){
    return this._http.get(this.baseApiUrl + 'online-union-porishod/'+zoneCode+'/'+locationCode+'/'+billMonth+'/'+reportType);
  }
}
