import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { IpAddress } from '../model/ip-address';

@Injectable({
  providedIn: 'root'
})
export class VisitorDetailsService {

  constructor(
    private _http: HttpClient
  ) { }

  saveVisitorDetails(model: any){
    return this._http.post(`${environment.apiUrl}save-visitor-details`,model);
  }

  getVisitorCount(){
    return this._http.get(`${environment.apiUrl}get-visitor-count`);
  }
}
