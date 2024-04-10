import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PourAndCityCorporService {

  constructor(private http: HttpClient) { }

  getPouroshovaAndCityCorporationData(validDate: string){
    return this.http.get<any>(`${environment.apiUrl}Get_PourAndCityCorporby_Date?ValidDate=`+validDate);
  }

  getPouroshovaAndCityCorporationDataSummary(billMonth: string, reportType: string, zoneCode: string, locationCode: string, circleCode: string){
    return this.http.get<any>(`${environment.apiUrl}Get_PourAndCityCorporby_Date?billMonth=` + billMonth + `&reportType=` + reportType + `&zoneCode=` + zoneCode + `&locationCode=` + locationCode +`&circleCode=`+circleCode);
  }

  getPouroshovaAndCityCorporationDetails(billMonth: string, reportType: string, zoneCode: string, locationCode: string, circleCode: string, ){
    return this.http.get(`${environment.apiUrl}get-city-corpor-and-pouroshova-details-by-date/` + billMonth + `/` + reportType + `/` + zoneCode + `/` + locationCode + `/` + circleCode);
  }
  getAllZoneDataList(){
    return this.http.get<any>(`${environment.apiUrl}get-all-zone`);
  }

  getAllZoneWiseCircle(zoneCode: string){
    return this.http.get(`${environment.apiUrl}get-all-circle-by-zone-code`+zoneCode);
  }

  getAllCityCorporationDatList(){
    return this.http.get<any>(`${environment.apiUrl}get-all-city-corporation`);
  }

  getZoneWiseCityPouroUnionArrear(billMonth: string) {
    return this.http.get<any>(`${environment.apiUrl}zone-wise-city-corpor-pouro-union-arrear?billMonth=` + billMonth);
  }
  getAllLocationDDList() {
    return this.http.get<any>(`${environment.apiUrl}get-all-location`);
  }

  getZoneLocationCityPouroUnion(billMonth: string, zoneCode: string) {
    return this.http.get<any>(
      `${environment.apiUrl}zone-location-wise-city-pouro-union-arrear?billMonth=` + billMonth + `&zoneCode=`+zoneCode
    );
  }

  getOnlinePouroshovaAndCityCorporationDetails(billMonth : string,zoneCode:string,locationCode:string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-city-corpor-and-pouro-bn-by-month/`+billMonth +`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }

  getOnlineCityAndPouroWiseBnData(billMonth : string,zoneCode:string,locationCode:string,cityCorporationCode:string,pouroshovaCode:string,reportType:string){
    return this.http.get(`${environment.apiUrl}get-online-codewise-city-pouro-bn-data/`+billMonth +`/`+zoneCode+`/`+locationCode+`/`+cityCorporationCode+`/`+pouroshovaCode+`/`+reportType);
  }

  getOnlinePouroshovaAndCityCorporationBnDetails(billMonth : string,zoneCode:string,locationCode:string){
    return this.http.get(`${environment.apiUrl}get-online-city-corpor-and-pouro-bn-details/`+billMonth +`/`+zoneCode+`/`+locationCode);
  }

  getOnlineCityAndPouroWiseBnDetailsData(billMonth : string,zoneCode:string,locationCode:string,cityCorporationCode:string,pouroshovaCode:string){
    return this.http.get(`${environment.apiUrl}get-online-codewise-city-pouro-bn-details-data/`+billMonth +`/`+zoneCode+`/`+locationCode+`/`+cityCorporationCode+`/`+pouroshovaCode);
  }

  getZoneWiseCityCorporation(zoneCode: string){
    return this.http.get(`${environment.apiUrl}get-zone-wise-city-corporation/`+zoneCode);
  }

  getZoneWisePouroshova(zoneCode: string){
    return this.http.get(`${environment.apiUrl}get-zone-wise-pouroshova/`+zoneCode);
  }

  getOnlineCityAndPouroCRVDetails(billMonth: string, zoneCode: string, locationCode: string, reportType: string){
    return this.http.get(`${environment.apiUrl}get-online-city-pouro-details-with-crv/`+billMonth+`/`+zoneCode+`/`+locationCode+`/`+reportType);
  }
}
