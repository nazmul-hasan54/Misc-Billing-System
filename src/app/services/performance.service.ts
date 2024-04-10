import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PerformanceService {

  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAllPerformanceList() {
    return this.http.get(this.baseApiUrl + 'get-all-performance-index-list');
  }

  savePerformanceBill(performanceBill: any) {
    return this.http.post(this.baseApiUrl + 'save-performance-bill', performanceBill)
  }

  deletePerformanceBill(id: number) {
    return this.http.delete(this.baseApiUrl + 'delete-performance-bill/' + `${id}`)
  }
}
