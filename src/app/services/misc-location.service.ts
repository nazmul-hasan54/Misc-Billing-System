import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MiscLocationService {

  baseApiUrl: string =environment.apiUrl;
  constructor(private http:HttpClient) { }
  
  getLocationDD(){
    return this.http.get<any>(`${environment.apiUrl}get-location`);
  }
  getLocationByUser(locationCode:string){
    return this.http.get(this.baseApiUrl+'get-location-by-user/'+locationCode);
  }
  getAllBlockNum(locationCode:string){
    return this.http.get(this.baseApiUrl +'get-blocknum-by-location/'+locationCode);
  }

  getAllLocation(){
    return this.http.get(this.baseApiUrl+ 'get-all-location')
  }
}
