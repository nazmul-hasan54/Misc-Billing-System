import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PrintBillService {
  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http:HttpClient
  ) { }

  penaltyBillSrPrint(billNumber:string,customerNumber:string){
    return this.http.get(this.baseApiUrl+'penalty-bill-sr-print/'+billNumber+'/'+customerNumber);
  }


}
