import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeterService {
  baseApiUrl: string =environment.apiUrl;

  constructor(private http:HttpClient) { }

  getAllMeterOwner(){
    return this.http.get(this.baseApiUrl+'get-meter-owner');
  }
  getAllMeterType(){
    return this.http.get(this.baseApiUrl+'get-meter-type');
  }
  getAllMeterCondition(){
    return this.http.get(this.baseApiUrl+'get-meter-condition');
  }
}
