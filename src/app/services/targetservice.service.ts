import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TargetserviceService {
  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTargetList() {
    return this.http.get(this.baseApiUrl + 'get-target-list');
  }

  getFiscalYear(){
    return this.http.get(this.baseApiUrl + 'get-financial-year-list');
  }

  
  saveTargetBill(targetBill:any){
    return this.http.post(this.baseApiUrl + 'save-target-bill', targetBill)
  }

  deleteTargetBill(id:number){
    return this.http.delete(this.baseApiUrl + 'delete-target-bill/' + `${id}`)
  }
}
