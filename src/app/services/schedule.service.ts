import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  baseApiUrl: string =environment.apiUrl;
  constructor(private http:HttpClient) { }
  
  billScheduleSave(scheduleBill){
    return this.http.post(this.baseApiUrl+'save-bill-cycle-schedule',scheduleBill);
  }
  
  getAllScheduleBillGroup(){
    return this.http.get(this.baseApiUrl+'get-all-bill-group');
  }
  getScheduleYear(){
    return this.http.get(this.baseApiUrl+'get-schedule-year');
  }
  getScheduleMonth(month){
    return this.http.get(this.baseApiUrl+'get-schedule-month/'+month);
  }
}
