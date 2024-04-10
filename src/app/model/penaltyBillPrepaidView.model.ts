import { Byte } from "@angular/compiler/src/util";

export interface PenaltyBillPrepaidViewModel {
    id: number | null;
    billNumber: string | null;
    meterType: string | null;
    customerNumber: string | null;
    customerName: string | null;
    tariff: string | null;
    billAmount: number | null;
    totalAmount: number | null;
    principleAmount: number | null;
    unitUse: number | null;
    nidNumber: string | null;
    duaDate: string | null;
    dcDate: string | null;
    location: string | null;
    address: string | null;
    paid:number | null;
    
    FileNames: string;
    FileTypes: string;
    FileList: Byte;
}