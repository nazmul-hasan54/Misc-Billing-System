import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NonBengaliService {

  baseApiUrl: string =environment.apiUrl;
  constructor(private http: HttpClient) { }

  getAllNonBengaliList(validDate: string, reportType:string){
    
    return this.http.get(this.baseApiUrl+'get_non-bengali-consumer-list/'+ validDate+'/'+reportType);
    // return this.http.get<any>(

    //   // `${environment.apiUrl}get_non-bengali-consumer-list?ValidDate=` + validDate+ `&ReportType=` + reportType
    // );
  }

  getAllNonBengaliSummaryDataByDate(reportDate: string, reportType: string){
    return this.http.get(this.baseApiUrl+'get-non-bengali-summary-list/'+reportDate+'/'+reportType);
  }

  getOnlineNonBengaliSummaryDataByDate(zoneCode: string, locationCode: string, billMonth: string, reportType: string){
    return this.http.get(this.baseApiUrl + 'get-online-non-bengali-consumer-data-by-date/'+zoneCode+'/'+locationCode+'/'+billMonth+'/'+ reportType)
  }

  getAllLocation(){
    return this.http.get<any>(
      `${environment.apiUrl}get-all-location`
    );
  }
}
