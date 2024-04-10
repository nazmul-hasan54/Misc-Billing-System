export interface CustomerBillDetailsModel {
    customerNumber: string | null;
    customerName: string | null;
    locationCode: string | null;
    areaCode: string | null;
    customerAddress: string | null;
    billNumber: string | null;
    billTypeCode: string | null;
    nidNumber: string | null;
    phone: string | null;
    tariff: string | null;
    totalAmount: number | null;
    dueDate: string | null;
    paymentDate: string | null;
    principleAmount: number | null;
    vatAmount: number | null;
    paid: string | null;
}