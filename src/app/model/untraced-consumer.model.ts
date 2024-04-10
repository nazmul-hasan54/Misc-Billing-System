export interface UntracedConsumerModel {
    id: number
    customerNumber: string
    customerName: string
    locationCode: any
    locationName: string
    customerAddr: any
    businessType: any
    tariffId: any
    tariffDesc: string
    areaCode: any
    prvAcNo: any
    meterNum: any
    meterTypeDesc: string
    meterConditionDesc: any
    status: number
    createdBy: any
    createdDate: any
    updatedBy: any
    updatedDate: any
     ucType:string|null
   
  }

  export interface UntracebleCustArrearReportModel {
    locationCode: string;
    locationDesc: string;
    locationnamebn: string;
    zoneCode: string;
    zoneName: string;
    circleCode: string;
    circleNameBn: string;
    customeR_NAME: string;
    consumeR_NO: string;
    bilL_CYCLE_CODE: string;
    curR_PRINCIPAL: number;
    totaL_AMOUNT: number;
    totaL_LPS_ARREAR: number;
    totaL_PRINCIPAL_ARREAR: number;
    curR_RECEIPT_PRINCIPAL: number;
    totaL_RECEIPT_PRINCIPAL: number;
    totaL_RECEIPT_VAT: number;
    totaL_VAT_ARREAR: number;
    totalUntracedCustCount: number;
    totalUntracedCustArrear: number;
    preMonTracedCustCount: number;
    preMonTracedCustArrear: number;
    preMonTracedCustReceipt: number;
    currMonTracedCustCount: number;
    currMonTracedCustArrear: number;
    currMonTracedCustReceipt: number;
    totalCurrMonTracedCustCount: number;
    totalCurrMonTracedCustArrear: number;
    totalCurrMonTracedCustReceipt: number;
    totalFinalUntracedCustCount: number;
    totalfinalarreraramount: number;
}

export interface UntracedCustArrearMergeSummaryModel {
  zoneCode: string;
  zoneName: string;
  preMonTracedCustCount: number;
  preMonTracedCustArrear: number;
  preMonTracedCustReceipt: number;
  currMonTracedCustCount: number;
  currMonTracedCustArrear: number;
  currMonTracedCustReceipt: number;
  totalCurrMonTracedCustCount: number;
  totalCurrMonTracedCustArrear: number;
  totalCurrMonTracedCustReceipt: number;
}

export interface UntracePenaltySupplementaryListModel {
  untraceableDataList: UntracedCustArrearMergeSummaryModel[];
  penaltyDataList: UntracedCustArrearMergeSummaryModel[];
  supplementaryDataList: UntracedCustArrearMergeSummaryModel[];
}