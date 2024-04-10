export class MISReportModel {
    centerId: number;
    location_Id: number;
    location_Code: string = '';
    consumer_Number: string;
    tariffId: number;
    tariff: string = '';
    fromAmount: number;
    toAmount: number;
    billGroupId: string;
    bookId: string = '0';
    billMonth: string;
    reportTypeId: number;
    ministry_Id: number;
    fromBillMonth: string;
    toBillMonth: string;
    meterCondition: string = '0';
    arrearFrom: number;
    arrearTo: number;
    connStatusId: number;
    orderTypeId: string = 'billcycle';
    noOfMonth: number;
    statusId: number = 0;
    isPrincipal: boolean = true;
    isVAT: boolean = true;
    isLPS: boolean = true;
    orderId: number = 0;
    isAll: boolean = true;
  }

  export interface RegularCustomerArrearSummary{
    center: string | null;
    noc: number | null;
    month: string | null;
    bldUnit: number | null;
    curPrin: number | null;
    curVat: number | null;
    arrPrin: number | null;
    arrVat: number | null;
    arrLps: number | null;
    totalBill: number | null;
    currentLps: number | null;
    order: number | null;
    loc: string | null;
    office: string | null;
  }
  