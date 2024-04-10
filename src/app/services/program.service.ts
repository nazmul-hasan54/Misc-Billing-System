import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProgramService {

  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllProgramlist() {
    return this.http.get(this.baseApiUrl + 'get-all-program-list');
  }

  saveProgramBill(progarmBill: any) {
    return this.http.post(this.baseApiUrl + 'save-program-bill', progarmBill)
  }
  deleteProgramBill(id: number) {
    return this.http.delete(this.baseApiUrl + 'delete-program-bill/' + `${id}`)
  }
}
