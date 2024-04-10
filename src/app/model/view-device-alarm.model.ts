export interface ViewDeviceAlarm {
    alarmCode:number;
    alarmSetDate:Date;
    alarmClearDate :Date;
    arrivalDate:Date;
    caseId :string;
    urgencyFlag :string;
    pmFlag : number;
    deviceDescription:string;
    bitType :string;
    bitStart:number;
    bitEnd :number;
}
