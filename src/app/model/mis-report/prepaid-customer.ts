export interface PrepaidCustomerModel {
    state:string;
    message:string;
    customerNo:string;
    customerName: string;
    customerType:string;
    division:string;
    fatherName:string;
    motherName:string;
    spouseName:string;
    sex:string;
    nid:string;
    tinNo:string;
    email:string;
    isGovtCustomer:string;
    instituteName:string;
    isFreedomFighter:string;
    oldCustomerNo:string;
    oldMeterNo:string;
    overdue:string;
    customerAddress:string;
    addressLine2:string;
    district:string;
    thana:string;
    powerUtility:string;
    powerCapacity:string;
    electricalProperty:string;
    industry:string;
    powerSupplyVoltage:string;
    meterReadingDate:string;
    meterReadingTime:string;
    temporaryPower:string;
    icCardNo:string;
    remark:string;
    maxPower:string;
    meterOwnedBy:string;
    ContractModel: ContractModel[];
    transID:string;
}


export interface ContractModel {
    contactName:string;
    telephone:string;
    mmobile:string;
    serviceProviders:string;
}