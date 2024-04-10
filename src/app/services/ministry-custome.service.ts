import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MinistryDataModel } from '../model/ministryData.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MinistryCustomeService {

  private baseApiUrl: string =environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllMinistry() {
    return this.http.get<any>(`${environment.apiUrl}get-all-ministry`);
  }

  getAllCityCorporationDatList(){
    return this.http.get(`${environment.apiUrl}get-all-city-corporation`);
  }

  getAllPouroshovaList(){
    return this.http.get(`${environment.apiUrl}get-pouroshova`);
  }

  getUnionParishad(){
    return this.http.get(`${environment.apiUrl}get-unionporishod`);
  }

  getAllZoneDataList(){
    return this.http.get(`${environment.apiUrl}get-all-zone`);
  }

  getAllZoneWiseCircle(zoneCode: string){
    return this.http.get<any>(`${environment.apiUrl}get-all-circle-by-zone-code/`+zoneCode);
  }
  
  getLocationDDList(dbCode: string) {
    return this.http.get(`${environment.apiUrl}get-location-dd-by-db-code?DbCode=`+dbCode);
  }
  getMinsitryDept(ministryCode:string){
    return this.http.get(environment.apiUrl+'get-ministry-dept/'+ministryCode)
  }
  
  getMinistryCustomer(customerNo:string, centerCode:string, locationCode:string, ministryCode:string , cityCode:string, isRebate:any ){
    var httParam=new HttpParams()
    .append('customerNo',customerNo)
    .append('centerCode',centerCode)
    .append('locationCode',locationCode)
    .append('ministryCode',ministryCode)
    .append('cityCode',cityCode)
    .append('isRebate',isRebate)
    return this.http.get(this.baseApiUrl + 'get-ministry-customer/',{params:httParam});
  }

  deleteMinistryCustomer(customerNo:string){
    return this.http.delete(`${environment.apiUrl}delete-ministry-customer/`+customerNo)
  }
  
  getDivision(){
    return this.http.get(`${environment.apiUrl}get-division`);
  }
  
  getDistrict(divisionCode:string){
    return this.http.get(`${environment.apiUrl}get-district/`+divisionCode);
  }
  
  getUpozila(districtCode:string){
    return this.http.get(`${environment.apiUrl}get-upozila/`+districtCode);
  }

  getNonBengaliList(){
    return this.http.get(`${environment.apiUrl}get-non-bengali-list`)
  }

  saveMinistryCustomer(data:any){
    return this.http.post(this.baseApiUrl+'add-ministry-customer',data);
  }

  getMinistryDetailsByCustNum(customerNo: string,locationCode:string){
    return this.http.get(this.baseApiUrl + 'get-ministry-customer-by-id/'+`${customerNo}/${locationCode}`);
  }

  viewCustomerData(customerNo:any,locationCode:string){
    return this.http.get(this.baseApiUrl + 'get-customer-data/'+`${customerNo}/${locationCode}`);
  }

  getMinistryCustomerByNo(customerNo: string){
    return this.http.get(`${environment.apiUrl}get-ministry-customer-by-no/`+customerNo)
  }
}
