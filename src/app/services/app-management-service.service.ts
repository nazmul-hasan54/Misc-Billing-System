import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppManagementServiceService {


  private baseApiUrl: string = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getAppManagelist() {
    return this.http.get(this.baseApiUrl + 'get-app-management-list');
  }

  saveAppManagementBill(appUserBill: any) {
    return this.http.post(this.baseApiUrl + 'save-app-user-management-bill', appUserBill)
  }

  deleteAppManagementBill(id: number) {
    return this.http.delete(this.baseApiUrl+'delete-app-management-bill/' + `${id}`)
  }

  getDesignationlist(){
    return this.http.get(this.baseApiUrl + 'get-app-user-designation-list');
  }

}
