import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";
import { DropDownStringkeyResult } from "../shared/models/drop-down-stringkey-result.model";

@Injectable({
  providedIn: "root",
})
export class EquipmentService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllEquipment(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-equipment-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveEquipment(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-equipment`, data);
  }

  editEquipment(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-equipment`, data);
  }

  getAllEquipmentDD() {
    return this.http.get<any>(`${environment.apiUrl}get-equipments-dd`);
  }

  getEquipmentById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipment-by-id?id=` + id
    );
  }

  getAllEquipmentDDByRtuId(rtuId: string) {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-equipments-dd-by-rtu-id?rtuId=` +
      rtuId
    );
  }

  getAllKeyswitchDeviceDDByRTUId(rtuId: string) {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-keyswitch-device-dd-by-rtu-id?rtuId=` +
      rtuId
    );
  }
}
