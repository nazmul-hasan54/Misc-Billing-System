import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReligiousSetupService {

  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveReligiousSetup(religious: any){
    return this.http.post(this.baseApiUrl + 'religious-data-setup', religious);
  }
  getReligiousArrearSummary(){
    // return this.http.get(this.baseApiUrl+'get-religious-arrear-summary')
    return this.http.get(`${environment.apiUrl}get-religious-arrear-summary`);
  }
}

