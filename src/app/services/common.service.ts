import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PrepaidCustDataModel } from '../model/mis-report/prepaid-cust-data.model';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  private apiUrl=environment.apiUrl+'/common/';
  constructor(private http: HttpClient) { }


  updateTotalVisitorCount(count:any){
    return this.http.put(this.apiUrl+'TotalVisitor',count)
  }
}
