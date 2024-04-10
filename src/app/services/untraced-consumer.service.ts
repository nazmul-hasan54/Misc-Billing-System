import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UntracedConsumerService {

  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  public createParamsOfArray(keyword: string, list: any){
    let setParams = '';
    for (let i = 0; i < list?.length; i++) {
      setParams += new HttpParams().set(keyword, list[i]); // dbId is keyword. do not change. dbId is api param name.
      if (i < (list.length - 1)) {
        setParams += '&';
      }
    }
    return setParams;
  }

  saveuntracedConsumerBill(data:any){
    
    return this.http.post(this.baseApiUrl+'save-untraced-consumer',data);
  }

  getUntracedConsumer(){
    return this.http.get(this.baseApiUrl+'get-all-consumer');
  }

  changeStatus(id:number,custStatus:number,updatedBy:string[] ){
    return this.http.get(this.baseApiUrl+'change-consumer-status/'+id+'/'+custStatus+'/'+updatedBy);
  }

  getConsumerByCustNum(custNumber:string){
    return this.http.get(this.baseApiUrl+'get-consumer-by-custnumber/'+custNumber);
  }

  getUntracableCustomer(dbList:any[],locationList:any[],billMonth: string){
    debugger;
    return this.http.get<any>(`${environment.apiUrl}get-mis-untrace-consumer?`+ this.createParamsOfArray('CenterCodes', dbList) + '&' + this.createParamsOfArray('LocationCodes', locationList) + `&BillMonth=${billMonth}&UserId=0&RoleId=0`);
  }

  getConsumerByDate(startDate:string,endDate:string,locationCode:string){
    return this.http.get(this.baseApiUrl + 'get-consumer-by-date/' + startDate + '/' + endDate+'/'+locationCode);
  }
  GetConsumerSearchByDate(startDate: string, endDate: string, locationCode: string){
    return this.http.get(this.baseApiUrl + 'get-consumer-search-by-date/' + startDate + '/' + endDate + '/' + locationCode);
  }

  getUntracableCustomerByDate(reportDate:string){

    return this.http.get(this.baseApiUrl+'get-untraceable-customer/'+reportDate);
  }
  
  getUntracedCustArrearCollection(zoneCode:string, circleCode:string, locationCode:string, billMonth:string){

    return this.http.get(this.baseApiUrl+'get-untraceable-cust-arrear-collection/'+ zoneCode + '/' + circleCode + '/' + locationCode+ '/' + billMonth);
  }
  getUntracedCustArrearSumCollection(zoneCode:string, billMonth:string){

    return this.http.get(this.baseApiUrl+'get-untraceable-cust-arrear-summary-collection/'+ zoneCode + '/' + billMonth);
  }

  getUntracedCustArrearDetails(zoneCode:string, circleCode:string, location:string, billMonth:string){

    // return this.http.get(this.baseApiUrl+'get-untraceable-cust-arrear-details?'zoneCode + '/' + circleCode + '/' + location+ '/' + billMonth);
    return this.http.get<any>(`${environment.apiUrl}get-untraceable-cust-arrear-details?ZoneCode=`+zoneCode+`&CircleCode=`+circleCode+`&LocationCode=`+location+`&BillMonth=`+billMonth);

  }

}
