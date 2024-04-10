import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { DropDownResult } from "../shared/models/drop-down-result.model";

@Injectable({
  providedIn: "root",
})
export class ConfigService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllConfigDD() {
    return this.http.get<DropDownResult[]>(
      `${environment.apiUrl}get-configs-dd`
    );
  }

  getConfigById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-config-by-id?id=` + id
    );
  }
}
