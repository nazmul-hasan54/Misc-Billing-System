export interface SupplementaryBillViewDTO {
    billNumber: string | null;
    meterType: string | null;
    principleAmount: number | null;
    customerNumber: string | null;
    installmentNumber: number | null;
    customerName: string | null;
    tariff: string | null;
    billAmount: number | null;
    unitUse: number | null;
    nidNumber: string | null;
    address: string | null;
    location: string | null;
    paid: number | null;
    duaDate: string | null;
    paymentDate: string | null;
    locationCode: string | null;
}


// export interface SupplementaryBillDTO {
//     areaCode: string | null;
//     billReasonCode: string | null;
//     businessType: string | null;
//     custId: number | null;
//     customerAddr: string | null;
//     customerName: string | null;
//     customerNumber: string | null;
//     billNumber: string | null;
//     dueDate: string | null;
//     imposedByCode: string | null;
//     lastReading: number | null;
//     locationCode: string | null;
//     locationName: string | null;
//     meterCondition: string | null;
//     meterNum: string | null;
//     meterTypeDesc: string | null;
//     meterTypeCode: string | null;
//     mobileNumber: string;
//     multypliBy: string | null;
//     nidNumber: string;
//     penaltyUnit: number | null;
//     lastReadingPeak: number | null;
//     lastReadingOffPeak: number | null;
//     offPeakUnit: number | null;
//     peakUnit: number | null;
//     principleAmount: number | null;
//     prvAcNo: string | null;
//     tariffDesc: string | null;
//     totalAmount: number | null;
//     vatAmount: number | null;
//     p_REMARK: string | null;
//     p_USER: string | null;
//     meterConditionCode: string | null;
//     meterConditionDesc: string | null;
//     businessTypeCode: string | null;
//     srAmount: number | null;
//     peakAmount: number | null;
//     offPeakAmount: number | null;
//     lastReadingDate: string | null;
//     remarks: string | null;
//     fileList: FileSaveDto[] | null;
// }