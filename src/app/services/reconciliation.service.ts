import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReconciliationService {

  constructor(
    private http: HttpClient
  ) { }


  getCustomerReconciliation(startDate: string, endDate: string, user: string) {
    return this.http.get(environment.apiUrl + 'get-consumer-reconciliation/' + startDate + '/' + endDate + '/' + user);
  }



  saveConsumerReconciliation(payDate: any) {
    return this.http.post(environment.apiUrl + 'save-consumer-reconciliation', payDate)
  }

  getMiscReconciliation(startDate: string, endDate: string, user: string) {
    return this.http.get(environment.apiUrl + 'get-misc-reconciliation/' + startDate + '/' + endDate + '/' + user);
  }

  saveMiscReconciliation(payDate: any) {
    return this.http.post(environment.apiUrl + 'save-misc-reconciliation', payDate)
  }


}
