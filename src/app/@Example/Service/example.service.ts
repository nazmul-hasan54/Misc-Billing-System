import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { DataResult } from '../../shared/models/data-result.model';

@Injectable({
  providedIn: 'root'
})
export class ExampleService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) { }
  getAllOfficeStuff(pageNumber: number, pageSize: number, searchBy: string) {
    return this.http.get<DataResult>(
      `${environment.apiUrl}get-office-stuff-list?pageNumber=` +
      pageNumber +
      `&pageSize=` +
      pageSize +
      `&searchBy=` +
      searchBy
    );
  }

  saveStuffInfo(data: any) {
    return this.http.post<any>(`${environment.apiUrl}add-office-stuff`, data);
  }

  editStuff(data : any){
    return this.http.put<any>(`${environment.apiUrl}`, data);
  }

}
