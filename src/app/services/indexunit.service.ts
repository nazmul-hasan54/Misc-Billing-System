import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class IndexunitService {

  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  saveUnitIndexBill(unitIndexBill: any) {
    return this.http.post(this.baseApiUrl + 'save-unit-index-bill', unitIndexBill)
  }

  deleteUnitIndexBill(id: number) {
    return this.http.delete(this.baseApiUrl + 'delete-indexuint-bill/' + `${id}`)
  }

}
