import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { DropDownResult } from "../shared/models/drop-down-result.model";

@Injectable({
  providedIn: "root",
})
export class DgSetupService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllDgSetupDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-dg-setups-dd`
    );
  }

  getDgSetupById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-dg-setup-by-id?id=` + id
    );
  }
}
