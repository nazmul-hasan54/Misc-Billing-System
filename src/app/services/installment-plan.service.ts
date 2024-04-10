import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { installmentDetails } from '../model/installmentDetails.model';

@Injectable({
  providedIn: 'root'
})
export class InstallmentPlanService {

  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  saveInstallmentPlan(billGenerate:any){
    return this.http.post(this.baseApiUrl+'add-penalty-installment',billGenerate);
  }

  getPenaltyInstallment(billNumber: any){
    return this.http.get(`${environment.apiUrl}get-penalty-installment/`+ billNumber);
  }

  getSupplementaryVatLps(customerNumber:string, locationCode:string){
    return this.http.get(this.baseApiUrl+'get-supplementary-vat-lps/'+customerNumber+'/'+locationCode);
  }

  getPenaltyVatLps(customerNumber:string, locationCode:string){
    return this.http.get(this.baseApiUrl+'get-penalty-vat-lps/'+customerNumber+'/'+locationCode);
  }
 
}
