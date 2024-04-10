import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PoliceService {

  constructor(private http: HttpClient) { }



  getOnlinePoliceDetailsData(billMonth: string,  zoneCode: string, locationCode: string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-police-details-data/`+billMonth+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }


}
