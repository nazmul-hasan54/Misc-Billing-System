import { EventEmitter, Injectable } from '@angular/core';

import { DataResult } from '../model/data-result.model';
import { HttpClient } from '@angular/common/http';
import { NbMenuItem } from "@nebular/theme";
import { Role } from '../model/role.model';
import { RoleToMenu } from '../model/role-to-menu.model';
import { UserToMenu } from '../model/user-to-menu.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllRole(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<any>(
      `${environment.apiUrl}get-roles?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }
  getAllUser(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<any>(
      `${environment.apiUrl}get-users?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }

  getRoleById(id: number){
    return this.http.get<any>(
      `${environment.apiUrl}get-role-by-id?Id=` + id
    );
  }
  getAllMenu(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-menus?pageNumber=` +
        pageNumber +
        `&pageSize=` +
        pageSize +
        `&searchBy=` +
        searchBy
    );
  }
  getAllMenuForRole(roleId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-menus-as-heirechy-by-role?roleId=` + roleId
    );
  }
  getAllMenuForUser(userId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-menus-as-heirechy-by-user?userId=` + userId
    );
  }

  getAllRestrictedMenuForUser(userId: number) {
    return this.http.get<any>(
      `${environment.apiUrl}get-restricted-menus-as-heirechy-by-user?userId=` +
        userId
    );
  }
  getAllGroupDD() {
    return this.http.get<any>(
      `${environment.apiUrl}get-groups-dd`
    );
  }

  getAllParentMenuDD() {
    return this.http.get<any>(
      `${environment.apiUrl}get-parent-menus-dd`
    );
  }
  getAllDashboardMenuDD() {
    return this.http.get<any>(
      `${environment.apiUrl}get-dashboard-menus-dd`
    );
  }

  // getAllSVGIcon() {
  //   return this.http.get(`${environment.apiUrl}get-svg-icons`);
  // }
  getAllRoleDD() {
    return this.http.get<any>(`${environment.apiUrl}get-roles-dd`);
  }
  getAllUserDD() {
    return this.http.get<any>(`${environment.apiUrl}get-users-dd`);
  }

  getAllUserDdByPriorityAndUserName(userName: string, locationCode: string){
    return this.http.get<any>(`${environment.apiUrl}get-user-dd-by-priority?UserName=` + userName + `&LocationCode=` + locationCode);
  }

  getAllMenuByRoleIdNUserId() {
    return this.http.get<any>(
      `${environment.apiUrl}get-menu-by-role-n-user`
    );
  }
  getAllMenuByRoleIdNUser() {
    var response = this.menuCache.get(
      `menus-${localStorage.getItem("roleName")}-${localStorage.getItem(
        "userName"
      )}`
    );
    if (response) {
      return of(response);
    }
    return this.http
      .get<NbMenuItem[]>(`${environment.apiUrl}get-menu-by-role-n-user`)
      .pipe(
        map((res) => {
          this.menuCache.set(
            `menus-${localStorage.getItem("roleName")}-${localStorage.getItem(
              "userName"
            )}`,
            res
          );
          return res;
        })
      );
  }

  getRoleByuserId(userId: number) {
    return this.http.get<Role>(
      `${environment.apiUrl}get-role-by-user-id?id=` + userId
    );
  }

  checkByUserNameExists(userName: string) {
    return this.http.get<Role>(
      `${environment.apiUrl}check-user-by-user-name?userName=` + userName
    );
  }

  //=======================================Post====================
  saveMenu(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-new-menu`, data);
  }

  editMenu(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-menu`, data);
  }

  saveUserRole(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-new-role`, data);
  }

  editUserRole(data: any) {
    return this.http.post<any>(`${environment.apiUrl}edit-role`, data);
  }

  deleteUserRole(id: number){
    return this.http.delete<any>(`${environment.apiUrl}delete-role?id=${id}`)
  }

  saveNewUser(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-new-user`, data);
  }

  editUser(data: any) {
      return this.http.post<any>(`${environment.apiUrl}edit-user`, data);
  }
  // saveUserToMenu(obj: UserToMenu) {
  //   return this.http.post<any>(`${environment.apiUrl}add-user-to-menu`, obj);
  // }
  saveUserToMenu(obj: any) {
    return this.http.post<any>(`${environment.apiUrl}add-user-to-menu`, obj);
  }

  UTMRestriction(obj: UserToMenu) {
    return this.http.post<any>(
      `${environment.apiUrl}menu-restriction-to-user`,
      obj
    );
  }
  saveRoleToMenu(obj: RoleToMenu) {
    return this.http.post<any>(`${environment.apiUrl}add-role-to-menu`, obj);
  }
  // //==================================Image Save========================
  // saveImage(formData) {
  //   return this.http.post(`${environment.apiUrl}/save_image`, formData);
  // }

  //===================DELETE MENU==================
  deleteMenu(id: any) {
    return this.http.delete<any>(`${environment.apiUrl}delete-menu?Id=${id}`);
  }
}
