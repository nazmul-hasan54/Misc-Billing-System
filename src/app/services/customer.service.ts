import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  
  constructor(
    private http:HttpClient
  ) { }

  getCustomerTypeforBillGenerate(){
    return this.http.get<any>(
      `${environment.apiUrl}get-customertype-billgen` 
    );
  }

  getCustomerCategoryForBillGeneration(){
    return this.http.get<any>(
      `${environment.apiUrl}get-customercategory-billgen` 
    );
  }
  getCustomerTarrifForBillGenaration(){
    return this.http.get<any>(`${environment.apiUrl}get-customer-tariff`);
  }

  

}
