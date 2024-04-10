import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TarrifService {
  baseApiUrl: string =environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAllTariff(){
    return this.http.get(this.baseApiUrl+'get-tariff');
  }
  
  getAllNonCustTarrif(locationCode:string){
    return this.http.get(environment.apiUrl +'get-noncust-tarriflist/'+locationCode)
  }
}
