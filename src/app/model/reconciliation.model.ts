export interface ReconcilationStatusModel {
    payDate: string | null;
    noOfTransaction: number | null;
    totalAmount: number | null;
    principleAmount: number | null;
    vatAmount: number | null;
    user: string | null;
}