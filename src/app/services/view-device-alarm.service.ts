import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { DataResult } from '../model/data-result.model';
import { DropDownStringkeyResult } from '../shared/models/drop-down-stringkey-result.model';

@Injectable({
  providedIn: 'root'
})
export class ViewDeviceAlarmService {
  constructor(private http: HttpClient) {}

  getViewDeviceAlarmList(
    pageNumber: number,
    pageSize: number,
    searchBy: string,
    searchByCaseId: string
  ) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-view-device-alarm-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy +
        `&searchByCaseId=` +
        searchByCaseId
    );
  }

  getSiteNoWithAddressDD() {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-site-nbr-address-dd-by-contract`
    );
  }
}
