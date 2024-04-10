import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Role } from '../model/role.model';

@Injectable({
  providedIn: 'root'
})
export class NewUserByCenterLocationService {

  constructor(private http: HttpClient) { }

  getAllRoleDD() {
    return this.http.get<any>(`${environment.apiUrl}get-roles-dd`);
  }

  getPriorityWiseAllRole() {
    return this.http.get<any>(`${environment.apiUrl}get-role-by-userName`);
  }

  getAllDatabase() {
    return this.http.get<any>(`${environment.apiUrl}get-all-database`);
  }

  getAllLocation() {
    return this.http.get<any>(`${environment.apiUrl}get-all-location`);
  }

  saveNewUserByCenterLocation(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-new-user-by-center-location`, data);
  }

  getUsersRoles() {
    return this.http.get<any>(`${environment.apiUrl}get-users-roles`);
  }

  getRoleByuserId(userId: number) {
    return this.http.get<Role>(
      `${environment.apiUrl}get-role-by-user-id?id=` + userId
    );
  }

  deleteNewUser(Id) {
    return this.http.delete<any>(
      `${environment.apiUrl}delete-new-user-by-center-location?id=` + Id
    );
  }
  getUserByLocationCenterbyId(userId: number){
    return this.http.get<any>(`${environment.apiUrl}get-new-user-by-center-location-by-id?Id=`+ userId)
  }

  updateNewUserLocationCenter(model: any){
    return this.http.post<any>(`${environment.apiUrl}edit-new-user-by-center-location`, model);
  }

  getLocationByDbArray(dbCode: any[]){
    return this.http.get<any>(`${environment.apiUrl}get-location-by-db-array?DbCode=`+ dbCode)
  }

  getAllDBCenterByUsernaem(userName:string) {
    return this.http.get(`${environment.apiUrl}get-DBCenter-by-username/`+userName);
  }
  getLocationByUserNameAndDBCenter(userName:string,db:string[]) {
    // return this.http.get(`${environment.apiUrl}get-DBCenter-by-username/`+userName+'/'+db);
    return this.http.get(`${environment.apiUrl}get-location-by-userName-centerCode?UserName=`+userName+`&db=`+db);
  }
  getLocationByCenter(DbCode:string){
    return this.http.get(`${environment.apiUrl}get-location-dd-by-db-code?=`+DbCode)
  }
}
