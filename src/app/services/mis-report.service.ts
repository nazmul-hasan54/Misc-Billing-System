import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MisReportService {

  constructor(private http: HttpClient) { }

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

  getAllDatabaseDDList(){
    return this.http.get<any>(`${environment.apiUrl}get-database-dd-list`);
  }

  getAllMinistryArrear(currDate: string) {
    return this.http.get<any>(`${environment.apiUrl}get-ministry-arrear-by-date?CurrentDate=` + currDate);
  }

  getAllCustomerArrearSummary(centerCode: string, billMonth: string, isAll: boolean, isPrincipal: boolean, isVat: boolean, isLps: boolean){
    debugger;
    return this.http.get<any>(`${environment.apiUrl}get-all-customer-arrear-summary-by-code-and-month?CenterCode=`+centerCode+`&BillMonth=`+billMonth+`&IsAll=`+isAll+`&IsPrincipal=`+isPrincipal+`&IsVat=`+isVat+`&IsLps=`+isLps);
  }

  getMisReportData(data:any){
    return this.http.get<any>(`${environment.apiUrl}get-mis-report-data` + data);
  }

  getArrearPrepaidCustomer(dbList: any[], locationList: any[], consumerNo:any, tariff:any, fromAmount:any, toAmount:any, status:any, isAll:any, isPrincipal:any, isLps:any, isVat:any, orderBy:any,  reportType:number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}get-prepaid-customer-arrear-based-on-offset?ConsumerNo=${consumerNo}&Tariff=${tariff}&&FromAmount=${fromAmount}&ToAmount=${toAmount}&Status=${status}&IsAll=${isAll}&IsPrincipal=${isPrincipal}&IsLps=${isLps}&IsVat=${isVat}&OrderBy=${orderBy}&ReportType=${reportType}&UserId=0&RoleId=0&` + this.createParamsOfArray('DbCodes', dbList) + '&' + this.createParamsOfArray('LocationCodes', locationList));
  }
  
  getAllCenter() {
    return this.http.get<any>(`${environment.apiUrl}Get-DB-by-user-id-role-id`);
  }
  getAllLocationByMultipleCenter(dbCodes:any) {
    return this.http.get<any>(`${environment.apiUrl}get-location-by-Multiple-dbCode-userId-roleId?`+this.createParamsOfArray('dbCodes', dbCodes));
  }

  // getAllRegularCustomerArrearSummary(centerCode: string, billMonth: string, isAll: boolean, isPrincipal: boolean, isVat: boolean, isLps: boolean, userId: string, roleId: string){
  //   return this.http.get(`${environment.apiUrl}regular-customer-arrear-summary?CenterCode=`+centerCode+`&BillCycleCode=`+billMonth+`&IsAll=`+isAll+`&IsPrincipal=`+isPrincipal+`&IsVat=`+isVat+`&IsLPS=`+isLps+`&UserId=`+userId+`&RoleId=`+roleId);
  // }

  getAllRegularCustomerArrearSummary(formValue: any, centerCode: string, billCycleCode: string, userId: number, roleId: number) {
    let subUrl = '';
    //subUrl += billMonth != null ? `&BillCycleCode=${billMonth}` : '';
    subUrl += `&IsAll=${formValue.isAll}&IsPrincipal=${formValue.isPrn}&IsLps=${formValue.isLps}&IsVat=${formValue.isVat}`;
    return this.http.get(`${environment.apiUrl}regular-customer-arrear-summary?CenterCode=${centerCode}` + subUrl + `&BillCycleCode=${billCycleCode}` + `&UserId=${userId}`+`&RoleId=${roleId}`);
  }
  getIllegalConsumer(billMonth){
    return this.http.get<any>(`${environment.apiUrl}get-existing-consumer-penalty/` + billMonth)

  }
}
