export class ExtendDateModel {

    constructor(
        public extendFor: number | null,
        public title: string | null, 
        public billNumber: number | null, 
        public customerNumber: number| null,
        public billId: number | null,
        public dueDate: string | null,
        ) 
        { }
}