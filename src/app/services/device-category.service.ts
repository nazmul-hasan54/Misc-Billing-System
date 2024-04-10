import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DeviceCategoryService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllDeviceCategory(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-device-category-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveDeviceCategory(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}add-device-category`,
      data
    );
  }

  editDeviceCategory(data: any) {
    return this.http.post<any>(
      `${environment.apiUrl}edit-device-category`,
      data
    );
  }

  getAllDeviceCategoryDD() {
    return this.http.get<any>(`${environment.apiUrl}get-device-categories-dd`);
  }
}
