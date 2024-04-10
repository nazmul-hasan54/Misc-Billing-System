import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StrategicObjectiveService {

  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  updateStrategicBill(apaBill: any) {
    return this.http.post(this.baseApiUrl + 'save-strategic-objective', apaBill)
  }

  saveStrategicBill(apaBill: any) {
    return this.http.post(this.baseApiUrl + 'save-strategic-objective', apaBill)
  }

  deleteStrategicBill(id: number) {
    return this.http.delete(this.baseApiUrl + 'delete-strategic-objective/' + `${id}`)
  }

}
