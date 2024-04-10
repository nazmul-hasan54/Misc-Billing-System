import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReplicationStatusService {

  constructor(private http: HttpClient) { }

  getAllReplicationStatusList(billMonth: string){
    return this.http.get(`${environment.apiUrl}get-all-replication-status-by-month/`+ billMonth);
  }
}
