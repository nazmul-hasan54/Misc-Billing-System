export interface BillReasonModel {
    billReasonId: number;
    billReasonCode: string | null;
    billTypeCode: string | null;
    billReasonDesc: string | null;
    remarks: string | null;
    status: string | null;
    createBy: string | null;
    createDate: string | null;
    updateBy: string | null;
    updateDate: string | null;
}