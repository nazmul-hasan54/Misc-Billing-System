import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AlarmCodeService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllAlarmCode(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-alarm-code-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveAlarmCode(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-alarm-code`, data);
  }

  editAlarmCode(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-alarm-code`, data);
  }

  getAllAlarmCodeDD() {
    return this.http.get<any>(`${environment.apiUrl}get-alarm-codes-dd`);
  }

  checkUniqueAlarmCode(id: number){
    return this.http.get<any>(
      `${environment.apiUrl}check-unique-alarm-code?id=` + id
    );
  }
}
