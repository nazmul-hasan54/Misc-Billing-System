import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";
import { DropDownResult } from "../shared/models/drop-down-result.model";
import { DropDownStringkeyResult } from "../shared/models/drop-down-stringkey-result.model";

@Injectable({
  providedIn: "root",
})
export class RtuService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllRtu(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-rtu-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveRtu(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-rtu`, data);
  }

  editRtu(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-rtu`, data);
  }

  getAllRtuDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-rtus-dd`
    );
  }

  getAllMasterRtuDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-master-rtus-dd`
    );
  }

  getRtuById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-rtu-by-id?id=` + id
    );
  }

  getAllRtuDDByBuildingId(buildingId: string) {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-rtus-dd-by-building-id?buildingId=` +
      buildingId
    );
  }

  checkUniqueTitleAndIp(id:string, title: string, ip:string){
    return this.http.get<any>(
      `${environment.apiUrl}check-unique-rtu-title-and-ip?RtuId=`+id+`&Title=`+title+`&Ip=`+ip
    );
  }
}
