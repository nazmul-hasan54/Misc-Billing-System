import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";
import { DropDownResult } from "../shared/models/drop-down-result.model";

@Injectable({
  providedIn: "root",
})
export class EquipmentGroupService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllEquipmentGroup(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-equipment-group-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveEquipmentGroup(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-equipment-group`, data);
  }

  editEquipmentGroup(data: any) {
    
    return this.http.post<any>(`${environment.apiUrl}edit-equipment-group`, data);
  }

  getAllEquipmentGroupDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-equipment-groups-dd`
    );
  }

  getEquipmentGroupById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-equipment-group-by-id?id=` + id
    );
  }
}
