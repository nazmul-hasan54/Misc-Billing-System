import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CustomerArrearService {

  constructor(private http:HttpClient) { }

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

  getBillGroup(any){
    return this.http.post(environment.apiUrl+'get-bill-group-multiple-loc-db-dd',any);
  }
  
  getLocationBook(bookParamData: any){
    return this.http.post<any>(`${environment.apiUrl}get-book-multiple-loc-db-dd`,bookParamData);
  }

//FOR TEMPORARY USE ONLY
  getAllCustomerArrearDetails(dbList:any[],locationList:any[],billMonth: string, fromAmount:number, toAmount:number,tarrif:string, billGroup:string, bookId:string, reportType:number, isAll:boolean, isPrinciple:boolean,isVat:boolean, isLps:boolean, noOfMonth:number, orderType:string) {
    debugger;
    return this.http.get<any>(`${environment.apiUrl}get-all-customer-arrear-details?`+ this.createParamsOfArray('DbCodes', dbList) + '&' + this.createParamsOfArray('LocationCodes', locationList) + `&BillMonth=${billMonth}&FromAmount=${fromAmount}&ToAmount=${toAmount}&Tariff=${tarrif}&BillGroupId=${billGroup}&BookId=${bookId}&NoOfMonth=${noOfMonth}&ReportTypeId=${reportType}&IsAll=${isAll}&IsPrincipal=${isPrinciple}&IsVAT=${isVat}&IsLPS=${isLps}&OrderTypeId=${orderType}&UserId=0&RoleId=0`);
  }
}
