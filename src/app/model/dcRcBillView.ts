import { Byte } from "@angular/compiler/src/util";

export interface DcRcBillViewModel {
    billNumber: string | null;
    meterType: string | null;
    customerNumber: string | null;
    customerName: string | null;
    tariff: string | null;
    billAmount: number | null;
    principleAmount: number | null;
    unitUse: number | null;
    nidNumber: string | null;
    duaDate: string | null;
    location: string | null;
    address: string | null;
    installmentNumber: number | null;

    FileNames: string;
    FileTypes: string;
    FileList: Byte;
    paid:number;
    paymentDate:string;
    rcDate:string;
}