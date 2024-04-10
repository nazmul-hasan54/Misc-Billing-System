import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { MinistryDept } from '../model/ministry-dept.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MinistryService {

  constructor(private http: HttpClient) {

  }

  baseApiUrl=environment.apiUrl;

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

  getAllMinistryArrear(currDate: string) {
    return this.http.get<any>(`${environment.apiUrl}get-ministry-arrear-by-date?CurrentDate=` + currDate);
  }
  getAllMinistryDept() {
    return this.http.get<any>(`${environment.apiUrl}get-all-ministry-dept`);
  }
  getAllMinistry() {
    return this.http.get<any>(`${environment.apiUrl}get-all-ministry`);
  }

  getAllDbConfigDDList()
  {
    return this.http.get<any>(`${environment.apiUrl}get-database-dd-list`);
  }

  getLocationDDList(dbCode: string) {
    return this.http.get<any>(`${environment.apiUrl}get-location-dd-by-db-code?DbCode=`+dbCode);
  }

  getDbByCircle(circleCode: string) {
    return this.http.get(this.baseApiUrl+'get-db-by-circle/'+circleCode);
  }

  getDbByLocation(locCode: string) {
    return this.http.get(this.baseApiUrl+'get-db-by-location/'+locCode);
  }


  getAllZone() {
    return this.http.get<any>(`${environment.apiUrl}get-all-zone`);
  }
  getLocationDDByZoneCode(zoneCode: string) {
    return this.http.get<any>(`${environment.apiUrl}get-location-by-zone-code?ZoneCode=`+zoneCode);
  }
  getAllMinistryByMinistryAndCode(billMonth: string, ministryCode: string,isRebate:any, zoneCode: string, locationCode: string, circleCode: string,reportType:string) {

    return this.http.get<any>(`${environment.apiUrl}get-all-ministry-details-by-zone-code-and-date?Code=` + ministryCode +`&isRebate=`+isRebate+ `&BillMonth=` + billMonth + `&ZoneCode=` + zoneCode + `&locationCode=` + locationCode +`&circleCode=` + circleCode+`&reportType=` + reportType);
  }

  getAllOldMinistryCode(formValue: any, ministryCode: string, billMonth: string, dbCode: string, locationCode: string) {
    // MinistryCode=1&BillMonth=201802&NoOfMonth=1&ArrearTo=1&ArrearFrom=1
    let subUrl = '';
    subUrl += billMonth != null ? `&BillMonth=${billMonth}` : '';
    if (formValue.arrearTo) {
      subUrl += `&ArrearTo=${formValue.arrearTo}`
    }
    if (formValue.arrearFrom) {
      subUrl += `&ArrearFrom=${formValue.arrearFrom}`
    }
    if (formValue.noOfMonth) {
      subUrl += `&NoOfMonth=${formValue.noOfMonth}`
    }
    subUrl += `&IsAll=${formValue.isAll}&IsPrincipal=${formValue.isPrn}&IsLps=${formValue.isLps}&IsVat=${formValue.isVat}`;
    return this.http.get<any>(`${environment.apiUrl}get-old-ministry-details?MinistryCode=${ministryCode}` + subUrl + `&DbCode=${dbCode}` + `&LocationCode=${locationCode}`);
  }

  getOnlineMinistryDataByZoneCode(formValue: any, ministryCode: string, billMonth: string, zoneCode: string, locationCode: string, isRebate: any) {
    // MinistryCode=1&BillMonth=201802&NoOfMonth=1&ArrearTo=1&ArrearFrom=1
    let subUrl = '';
    subUrl += billMonth != null ? `&BillMonth=${billMonth}` : '';
    if (formValue.arrearTo) {
      subUrl += `&ArrearTo=${formValue.arrearTo}`
    }
    if (formValue.arrearFrom) {
      subUrl += `&ArrearFrom=${formValue.arrearFrom}`
    }
    if (formValue.noOfMonth) {
      subUrl += `&NoOfMonth=${formValue.noOfMonth}`
    }
    subUrl += `&IsAll=${formValue.isAll}&IsPrincipal=${formValue.isPrn}&IsLps=${formValue.isLps}&IsVat=${formValue.isVat}`;
    return this.http.get<any>(`${environment.apiUrl}get-online-ministry-details-zone-wise?MinistryCode=${ministryCode}` + subUrl + `&ZoneCode=${zoneCode}` + `&LocationCode=${locationCode}` + `&IsRebate=${isRebate}`);
  }
  getOnlineMinistrySummary(formValue: any, ministryCode: string, billMonth: string, zoneCode: string, locationCode: string, isRebate: any) {
    let subUrl = '';
    subUrl += billMonth != null ? `&BillMonth=${billMonth}` : '';
    if (formValue.arrearTo) {
      subUrl += `&ArrearTo=${formValue.arrearTo}`
    }
    if (formValue.arrearFrom) {
      subUrl += `&ArrearFrom=${formValue.arrearFrom}`
    }
    if (formValue.noOfMonth) {
      subUrl += `&NoOfMonth=${formValue.noOfMonth}`
    }
    subUrl += `&IsAll=${formValue.isAll}&IsPrincipal=${formValue.isPrn}&IsLps=${formValue.isLps}&IsVat=${formValue.isVat}`;
    return this.http.get<any>(`${environment.apiUrl}get-online-ministry-details-summary-zone-wise?MinistryCode=${ministryCode}` + subUrl + `&ZoneCode=${zoneCode}` + `&LocationCode=${locationCode}` + `&IsRebate=${isRebate}`);
  }
  getMinistrySummaryList(zoneCode: string, locationCode: string, reportDate: string){
    //get-all-ministry-summary-by-dbcode-and-date?ReportDate=09-jan-23&LocationCode=1&DbCode=0&ReportType=1
    let sUrl = `ReportDate=${reportDate}&ZoneCode=${zoneCode}`;
    if(locationCode != null || locationCode != '0'){
      sUrl += `&LocationCode=${locationCode}`
    }
    return this.http.get<any>(`${environment.apiUrl}get-all-ministry-summary-by-zoneCode-and-date?`+sUrl)
  }

  getMinistryList(){
    return this.http.get(`${environment.apiUrl}get-ministry-list`)
  }

  saveMinistryBill(billGenerate: any) {
    return this.http.post(`${environment.apiUrl}save-ministry-bill`,billGenerate);
  }

  // getMinistryLedgerByDate(currDate: string){
  //   return this.http.get(`${environment.apiUrl}get-ministry-ledger-by-date/`+ currDate)
  // }

  getMinistryDetailsByCustNum(customerNumber:string, locationCode:string){
    return this.http.get(`${environment.apiUrl}get-ministry-customer-by-id/`+ customerNumber+'/'+ locationCode)
  }


  getZoneAndLocationWiseRailwayArrear(zoneCode: string,reportDate: string,locationCode: string, reportType: string,circleCode:string){
    return this.http.get(`${environment.apiUrl}get-railway-arrear/`+ zoneCode+'/'+ reportDate+'/'+ locationCode+'/'+reportType+'/'+circleCode)
  }

  getZoneWiseRailwayArrearSummary(zoneCode: string,reportDate: string,locationCode: string, reportType: string,circleCode){
    return this.http.get(`${environment.apiUrl}get-railway-summary/` + zoneCode + '/' + reportDate + '/' + locationCode + '/' + reportType + '/' + circleCode);
  }

  getZoneAndLocatoinWisePoliceArrear(zoneCode: string,reportDate: string,locationCode: string,reportType: string){
    return this.http.get(`${environment.apiUrl}get-police-arrear/`+ zoneCode+'/'+ reportDate+'/'+ locationCode+'/'+reportType) 
  }

  getZoneAndLocatoinWisePoliceArrearSummary(zoneCode: string,reportDate: string,locationCode: string,reportType: string){
    return this.http.get(`${environment.apiUrl}get-police-arrear-summary/`+ zoneCode+'/'+ reportDate+'/'+ locationCode+'/'+reportType) 
  }

  getMinistryWiseMinistryLedgerList(billMonth: string){
    return this.http.get(`${environment.apiUrl}get-ministry-ledger-by-date/`+ billMonth)
  }

  getPouroshovaList(){
    return this.http.get(`${environment.apiUrl}get-all-pouroshova`)
  }
 
  savePouroshovaBill(billGenerate:any){
    return this.http.post(`${environment.apiUrl}save-pouroshova-bill`, billGenerate);
  }

  deletePouroshovaBill(id:number){
    return this.http.delete(this.baseApiUrl + 'delete-pouroshova-bill/' + `${id}`)
  }

  getAllUnionPorishod(){
    return this.http.get(`${environment.apiUrl}get-all-unionporishod`)
  }

  saveUnionPorishodBill(billGenerate: any) {
    return this.http.post(`${environment.apiUrl}save-unionporishod-bill`, billGenerate);
  }

  deleteUnionPorishodBill(id: number) {
    return this.http.delete(this.baseApiUrl + 'delete-unionporishod-bill/' + `${id}`)
  }

  getAllCircleByZoneCode(zoneCode: string){
    return this.http.get(
      `${environment.apiUrl}get-all-circle-by-zone-code/` + zoneCode
    );
  }

  getAllLocationByCircle(circleCode : string){
    return this.http.get(`${environment.apiUrl}get-location-by-circle/`+ circleCode);
  }

  getAllLocationWiseMinistryArrear(zoneCode: string, circleCode: string, locationCode: string, reportDate: string){
    return this.http.get(`${environment.apiUrl}location-wise-ministry-arrera/`+ zoneCode + `/` + circleCode + `/` + locationCode + `/` + reportDate);
  }

  getTotalLocationWiseMinistryArrear(zoneCode: string, circleCode: string, locationCode: string, reportDate: string){
    return this.http.get(`${environment.apiUrl}total-location-wise-ministry-arrear/`+ zoneCode + `/` + circleCode + `/` + locationCode + `/` + reportDate);
  }

  getPreModDataByBillMonth(billMonth: string, deptCode: string){
    return this.http.get(`${environment.apiUrl}get-pre-mod-data/`+ billMonth + `/` + deptCode)
  }

  getZoneByUserName(userName:string){
    return this.http.get(`${environment.apiUrl}get-zone-by-userName/`+userName);
  }

  getCircleByUserNameZoneCode(userName:string,zoneCode:string){
    return this.http.get(`${environment.apiUrl}get-circle-by-userName-zoneCode/`+userName+'/'+zoneCode);
  }

  getLocationByUserNameCircleCode(userName:string,circleCode:string){
    return this.http.get(`${environment.apiUrl}get-location-by-userName-circleCode/`+userName+'/'+circleCode);
  }

  getLocationByUserNameZoneCode(userName:string,zoneCode:string){
    return this.http.get(`${environment.apiUrl}get-location-by-userName-zoneCode/`+userName+'/'+zoneCode);
  }
  getLocationsBySession(locationCodeList:string[]){
    return this.http.get<any>(`${environment.apiUrl}get-location-by-loc-code?`+ this.createParamsOfArray('LocationCode', locationCodeList));
  }
  getOnlineMinistryArrear(zoneCode:string,locationCode:string,billMonth:string) {
    return this.http.get<any>(`${environment.apiUrl}get-online-ministry-arrear?ZoneCode=`+zoneCode+`&LocationCode=`+locationCode+`&BillMonth=`+billMonth);
  }

  getOnlineMinistryArrearWithCRV(zoneCode:string,locationCode:string,billMonth:string) {
    return this.http.get<any>(`${environment.apiUrl}get-online-ministry-arrear-with-crv?ZoneCode=`+zoneCode+`&LocationCode=`+locationCode+`&BillMonth=`+billMonth);
  }

  getOnlineMinistryArrearDetails(billMonth: string, ministryCode: string, zoneCode: string, locationCode: string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-ministry-arrear-details/`+billMonth+`/`+ministryCode+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }

  getOnlineMinistryArrearDetailsByCode(billMonth: string, ministryCode: string, zoneCode: string, locationCode: string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-ministry-arrear-details-by-code/`+billMonth+`/`+ministryCode+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }

  getMinistryCustomerCount(ministryCode:string,locationCode:string){
    return this.http.get(`${environment.apiUrl}get-ministry-cust-count/`+ministryCode+`/`+locationCode)
  }

  
  getOnlineCRVPaymentDetails(billMonth: string, ministryCode: string, zoneCode: string, locationCode: string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-crv-payment-details/`+billMonth+`/`+ministryCode+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }

  getOnlineMinistryArrearDetailsWithCRV(billMonth: string, ministryCode: string, zoneCode: string, locationCode: string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-ministry-arrear-details-with-crv/`+billMonth+`/`+ministryCode+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }

  getLocDeptCodeByCenter(centerCode:string){
    return this.http.get(`${environment.apiUrl}get-location-and-dept-code-by-center/`+centerCode)
  }

  getPrivateAndMinistryWiseCustReport(formValue: any,billMonth: string, zoneCode: string, locationCode: string, isRebate: any) {
    // MinistryCode=1&BillMonth=201802&NoOfMonth=1&ArrearTo=1&ArrearFrom=1
    let subUrl = '';
    subUrl += billMonth != null ? `&BillMonth=${billMonth}` : '';
    if (formValue.arrearTo) {
      subUrl += `&ArrearTo=${formValue.arrearTo}`
    }
    if (formValue.arrearFrom) {
      subUrl += `&ArrearFrom=${formValue.arrearFrom}`
    }
    if (formValue.noOfMonth) {
      subUrl += `&NoOfMonth=${formValue.noOfMonth}`
    }
    subUrl += `&IsAll=${formValue.isAll}&IsPrincipal=${formValue.isPrn}&IsLps=${formValue.isLps}&IsVat=${formValue.isVat}`;
    return this.http.get<any>(`${environment.apiUrl}get-all-customer-details?DbCode=${zoneCode}` + subUrl + `&LocationCode=${locationCode}` + `&IsRebate=${isRebate}`);
  }
  
}

