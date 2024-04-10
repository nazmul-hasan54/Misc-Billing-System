import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogEventService {
  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getLogEvent(){
    return this.http.get(this.baseApiUrl+'get-log-event');
  }

  getLogEventByDate(fromDate:any,toDate:any){
    return this.http.get(this.baseApiUrl+'get-log-event-by-date/'+fromDate+'/'+toDate);
  }

  deleteLog(id:number){
    return this.http.delete(this.baseApiUrl+'delete-log/'+id);
  }

  deleteLogEventByDate(fromDate:any,toDate:any){
    return this.http.delete(this.baseApiUrl+'delete-log-event-by-date/'+fromDate+'/'+toDate);
  }
  
}
