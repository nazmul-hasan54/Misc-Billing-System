import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BusinessTypesService {

  constructor(private http:HttpClient) { } 
  
  baseApiUrl: string =environment.apiUrl;
  
  getAllBusinessType(){
    return this.http.get(this.baseApiUrl+'get-business-type');
  }
}
