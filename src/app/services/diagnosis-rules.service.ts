import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { DataResult } from "../shared/models/data-result.model";
import { environment } from "../../environments/environment";

@Injectable({
  providedIn: "root",
})
export class DiagnosisRulesService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllDiagnosisRules(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-diagnosis-rules-list?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  saveDiagnosisRules(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-diagnosis-rules`, data);
  }

  editDiagnosisRules(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-diagnosis-rules`, data);
  }

  getDiagnosisRulesById(id: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-diagnosis-rules-by-id?id=` + id
    );
  }

  getDiagnosisRulesDetailsByDiagnosisRuleId(id: string) {
    return this.http.get<any>(
      `${environment.apiUrl}get-diagnosis-rules-details-by-diagnosis-rules-id?id=` + id
    );
  }
}
