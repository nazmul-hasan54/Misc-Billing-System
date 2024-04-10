import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaymnetService {
  private baseApiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) {}

  paymnetGateway(totalPrice:number,customerNumber:any,billNumber:any) {
    // const paramObj = new HttpParams()
    // .set('totalPrice', totalPrice.toString())
    // .set('baseUrl', baseUrl)
    // .set('confirmUrl', confirmUrl)
    // .set('failedUrl', failedUrl)
    // .set('cencelUrl', cencelUrl)
    // .set('customerNumber', customerNumber)
    // .set('billNumber', billNumber)
    return this.http.get(this.baseApiUrl + 'get-payment-amount/'+`${totalPrice}/${customerNumber}/${billNumber}` );
  }

  nagadGateway(totalPrice:number,customerNumber:any,billNumber:any) {
    // const paramObj = new HttpParams()
    // .set('totalPrice', totalPrice.toString())
    // .set('baseUrl', baseUrl)
    // .set('confirmUrl', confirmUrl)
    // .set('failedUrl', failedUrl)
    // .set('cencelUrl', cencelUrl)
    // .set('customerNumber', customerNumber)
    // .set('billNumber', billNumber)
    return this.http.get(this.baseApiUrl + 'nagad-payment-gateway/'+`${totalPrice}/${customerNumber}/${billNumber}` );
  }
  
  consumerPaymnetGateway(totalPrice:number,customerNumber:any,billNumber:any) {
    return this.http.get(this.baseApiUrl + 'consumer-payment-amount/'+`${totalPrice}/${customerNumber}/${billNumber}` );
  }

  nagadGatewayPrepaid(totalPrice:number,customerNumber:any,billNumber:any) {
    return this.http.get(this.baseApiUrl + 'nagad-payment-gateway/'+`${totalPrice}/${customerNumber}/${billNumber}` );
  }
}
