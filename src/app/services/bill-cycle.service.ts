import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillCycleService {
  baseApiUrl: string =environment.apiUrl;

  constructor(private http:HttpClient) { }
  getAllBillCycle(){
    return this.http.get(this.baseApiUrl+'get-all-billcycle')
  }
  getBillCycle(){
    return this.http.get(this.baseApiUrl+'get-bill-cycle-list')
  }
}
