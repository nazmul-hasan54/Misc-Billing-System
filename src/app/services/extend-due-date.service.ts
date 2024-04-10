import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExtendDueDateService {
  private baseApiUrl: string =environment.apiUrl;


  constructor(
    private http: HttpClient

  ) { }

  updateDueDate(param:any){
    return this.http.put(this.baseApiUrl+'extend-due-date',param);
  }

  updateDueDateForInst(param:any){
    return this.http.put(this.baseApiUrl+'extend-due-date-forinst',param);
  }
}
