import { Byte } from "@angular/compiler/src/util";

export interface PenaltyBillViewModel {
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
    installmentNumber: number | null;
    paid: number | null;
    paymentDate: string | null;
    
    FileNames: string;
    FileTypes: string;
    FileList: Byte;
}