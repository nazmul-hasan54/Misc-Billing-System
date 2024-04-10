export class PaymentPrepaidModel {

    constructor(
        public title: string | null, 
        public billAmount: number | null, 
        public billNumber: number | null, 
        public customerNumber: number| null,
        ) 
        { }
}