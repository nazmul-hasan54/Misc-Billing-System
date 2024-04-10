import { EventEmitter, Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { DropDownStringkeyResult } from "../shared/models/drop-down-stringkey-result.model";

@Injectable({
  providedIn: "root",
})
export class BitmapService {
  onMenuMapping: EventEmitter<boolean> = new EventEmitter<boolean>();
  menuCache = new Map();
  constructor(private http: HttpClient) {}

  getAllBitmapDD() {
    return this.http.get<any>(`${environment.apiUrl}get-bitmaps-dd`);
  }

  getAllBitmapDDByEquipmentId(equipmentId: string) {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-bitmaps-dd-by-equipments-id?equipmentId=` +
      equipmentId
    );
  }

  getAllBitmapDDByKeyswitchDeviceId(keyswitchDeviceId: string) {
    return this.http.get<DropDownStringkeyResult[]>(
      `${environment.apiUrl}get-bitmaps-dd-by-key-switch-device-id?keyswitchDeviceId=` +
      keyswitchDeviceId
    );
  }
}
