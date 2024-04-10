import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class MinistrySummaryService {

  constructor(private http: HttpClient) { }

  getAllDbConfigDDList()
  {
    return this.http.get<any>(`${environment.apiUrl}get-database-dd-list`);
  }

  getLocationDDList(dbCode: string) {
    return this.http.get<any>(`${environment.apiUrl}get-location-dd-by-db-code?DbCode=`+dbCode);
  }
  getMinistrySummaryList(zoneCode: string, locationCode: string, reportDate: string){
    //get-all-ministry-summary-by-dbcode-and-date?ReportDate=09-jan-23&LocationCode=1&DbCode=0&ReportType=1
    let sUrl = `ReportDate=${reportDate}&ZoneCode=${zoneCode}`;
    if(locationCode != null || locationCode != '0'){
      sUrl += `&LocationCode=${locationCode}`
    }
    // if(reportType != " "){
    //   sUrl += `&ReportType=${reportType}`
    // }

    return this.http.get<any>(`${environment.apiUrl}get-all-ministry-summary-by-zoneCode-and-date?`+sUrl);
  }
}
