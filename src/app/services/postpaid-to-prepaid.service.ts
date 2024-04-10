import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostpaidToPrepaidService {
  baseApiUrl: string =environment.apiUrl;


  constructor(
    private http:HttpClient

  ) { }

  getCustomerByCustNumber(customerNumber:string,locationCode:string){
    return this.http.get(this.baseApiUrl+'get-postpaid-customer-by-custnumber/'+customerNumber+'/'+locationCode);
  }

  saveData(data:any){
    return this.http.post(this.baseApiUrl+'save-postpaid-to-prepaid',data);
  }

  getPrepaidList(locationCode: string){
    return this.http.get(this.baseApiUrl+'get-prepaid-list/'+locationCode);
  }
  getPrepaidPrint(customerNumber,locationCode: string){
    return this.http.get(this.baseApiUrl+'get-prepaid-print/'+customerNumber+'/'+locationCode);
  }

  getPostToPrepaidByDate(startDate: string, endDate: string, locationCode: string) {
    return this.http.get(this.baseApiUrl + 'get-posttoprepaid-by-date/' + startDate + '/' + endDate + '/' + locationCode);
  }
  
  getPostToPrepaidSearchByDate(startDate: string, endDate: string, locationCode: string){
    return this.http.get(this.baseApiUrl + 'get-posttoprepaid-search-by-date/' + startDate + '/' + endDate + '/' + locationCode);
  }

  
  getPostToPrepaidForUpdate(startDate: string, endDate: string, locationCode: string){
    return this.http.get(this.baseApiUrl + 'get-postoprepaid-for-update/' + startDate + '/' + endDate + '/' + locationCode)
  }

  getPrepaidDivision(){
    return this.http.get(this.baseApiUrl+'get-all-prepaid-division');
  }
  
  GetPrepaidDistrictByDivision(divCode:string){
    return this.http.get(this.baseApiUrl+'get-prepaid-district-by-division/'+divCode);
  }

  GetPrepaidThanaByDistrict(distCode:string){
    return this.http.get(this.baseApiUrl+'get-prepaid-thana-by-district/'+distCode);
  }

  updatePreToPostCust(data:any[]){
    return this.http.post(this.baseApiUrl+'update-postto-prepaid-customer',data);
  }

  getBillGroupList(userName:string,password:string,locationCode: string){
    return this.http.get(this.baseApiUrl+'get-all-bill-groups?userName='+userName+'&password='+password+'&locationCode='+locationCode);
  }

  getBookNoList(userName:string,password:string, locationCode: string, billGroup: string){
    return this.http.get(this.baseApiUrl+'get-all-book-number?userName='+userName+'&password='+password+'&locationCode='+locationCode+'&billgroup='+billGroup);
  }
  
  getPostpaidCustByBookNo(userName:string,password:string,bookNo: string,locationCode: string){
    return this.http.get(this.baseApiUrl+'get-postpaid-customer-by-book-number?userName='+userName+'&password='+password+'&bookNumber='+bookNo+'&locationCode='+locationCode);
  }
  getdivistiondistrictbylocation(locationCode:string){
    return this.http.get(this.baseApiUrl+'get-division-district-by-loc-code?locationCode='+locationCode);
  }

  getPrepaidCustomerByTransId(transID:String){
    return this.http.get(`${environment.apiUrl}get-prepaid-customer-by_transId/`+transID)
  }

  
  getDivisionForPrepaidCustomer(){
    return this.http.get(`${environment.apiUrl}get-division-for-prepaid-customer`);
  }
  geDistrictForPrepaidCustomer(){
    return this.http.get(`${environment.apiUrl}get-district-for-prepaid-customer`);
  }
  getThanaForPrepaidCustomer(){
    return this.http.get(`${environment.apiUrl}get-thana-for-prepaid-customer`);
  }

  getModPrepaidCustomer(zoneCode:string,locationCode:string,fromDate:string,toDate:string) {
    return this.http.get(this.baseApiUrl + 'get-mod-prepaid-customer/' + zoneCode + '/' + locationCode+'/'+fromDate+'/'+toDate);
  }
  LocationWiseCustomerCount(zoneCode:string,locationCode:string) {
    return this.http.get(this.baseApiUrl + 'location-wise-customer-count/' + zoneCode + '/' + locationCode);
  }
  
}
