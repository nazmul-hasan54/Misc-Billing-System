import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookBillGroupService {

  baseApiUrl: string =environment.apiUrl;
  constructor(private http:HttpClient) { }
  
  getBooknumDD(){
    return this.http.get<any>(`${environment.apiUrl}get-bookno`);
  }
  
  getAllBillGroup(locationCode:string,bookNumber:string){
    return this.http.get(this.baseApiUrl+'get-bill-group-by-location/'+locationCode+'/'+bookNumber);
  }
}
