import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MinistryDept } from '../model/ministry-dept.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class OnlineAgricultureService {
    constructor(
        private http: HttpClient
    ){

    }

    getOnlineAgriPoultryData(billMonth: string, zoneCode: string, locationCode: string, reportType: string){
        return this.http.get<any>(`${environment.apiUrl}get-online-agriculture-data?BillMonth=`+billMonth+`&ZoneCode=`+zoneCode+`&LocationCode=`+locationCode+`&ReportType=`+reportType);
    }

    getOnlineAgriPoultryLedgerData(startMonth: string, endMonth: string, zoneCode: string, locationCode: string){
        return this.http.get<any>(`${environment.apiUrl}get-online-agriculture-poultry-ledger?StartMonth=`+startMonth+`&EndMonth=`+endMonth+`&ZoneCode=`+zoneCode+`&LocationCode=`+locationCode);
    }

}