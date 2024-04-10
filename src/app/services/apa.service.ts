import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApaService {

  private baseApiUrl: string =environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getStrategicList(){
    return this.http.get(this.baseApiUrl+'get-strategic-objective-list');
  }

 
  getProgramList(code:string){
    return this.http.get(this.baseApiUrl+'get-program-list-by-strategic-code/'+`${code}`);
  }

  getPerformanceList(code:string){
    return this.http.get(this.baseApiUrl+'get-performance-index-list-by-code/'+`${code}`);
  }

  getUnitList(){
    return this.http.get(this.baseApiUrl+'get-index-unit-list');
  }

  getUnitIndexTarget(code:string){
    return this.http.get(this.baseApiUrl+'get-apa-unit-index-target/'+`${code}`);
  }

  apaSave(apaData:any){
    return this.http.post(this.baseApiUrl+'save-apa-data',apaData);
  }

  getAPADetails(fromBillMonth:string,toBillMonth:string){
    return this.http.get(this.baseApiUrl+'get-apa-report/'+fromBillMonth+'/'+toBillMonth)
  }
}
