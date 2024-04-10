import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";
import { DropDownResult } from "../shared/models/drop-down-result.model";

@Injectable({
  providedIn: "root",
})
export class BuildingService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllBuilding(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-building-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveBuilding(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-building`, data);
  }

  editBuilding(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-building`, data);
  }

  getAllBuildingDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-buildings-dd`
    );
  }

  getBuildingById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-building-by-id?id=` + id
    );
  }

  checkUniqueSiteNbr(buildingId:string ,siteNbr: string){
    return this.http.get<any>(
      `${environment.apiUrl}check-unique-site-nbr?BuildingId=`+buildingId+`&SiteNbr=`+siteNbr
    );
  }
}
