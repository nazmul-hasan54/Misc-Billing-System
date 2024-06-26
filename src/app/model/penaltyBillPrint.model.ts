export interface PenaltyBillPrintModel {
    customerName: string | null;
    fatherName: string | null;
    locationName: string | null;
    customerAddress: string | null;
    locationAddress: string | null;
    monthName: string | null;
    billNumber: string | null;
    billCheckDigit: string | null;
    issueDate: string | null;
    locationCode: string | null;
    walkOrd: string | null;
    billGroup: string | null;
    bookNo: string | null;
    prvAcc: string | null;
    customerNumber: string | null;
    lastPaymentDate: string | null;
    tariff: string | null;
    bsCode: string | null;
    meterNumber: string | null;
    meterType: string | null;
    meterCondition: string | null;
    mobileNumber: string | null;
    nidNumber: string | null;
    imposedBy: string | null;
    billReason: string | null;
    penaltyUnit: number | null;
    peakUnit: number | null;
    offPeakUnit: number | null;
    installmentNo: number | null;
    principleAmount: number | null;
    peakAmount: number | null;
    offPeakAmount: number | null;
    vatAmount: number | null;
    totalAmount: number | null;
    totalInstallmentTaka: number | null;
    installmentDueDate: string | null;
    dcTypeCode: string | null;
    remarks: string | null;
    paid: string | null;
    lpsAmountAfterDue: string | null;
    totalAmountAfterDue: string | null;
}