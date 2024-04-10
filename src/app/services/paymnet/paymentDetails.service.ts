import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class paymentDetailsService {
  private baseApiUrl: string = environment.apiUrl;
  constructor(private http:HttpClient ) { }

  penaltyPaymentDetails(){
    return this.http.get(this.baseApiUrl +'get-penalty-payment-details')
  }
}
