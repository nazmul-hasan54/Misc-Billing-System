export interface Rtu {
    rtuId: number;
    rtuTitle: string;
    buildingIdFk: string;
    buildingTitle: string;
    dgSetupIdFk: string;
    dgId: string;
    configIdFk: string;
    configType: string;
    masterRtuId: string;
    rtuIpAddress: string;
    baudrate: number;
    hardwareVersion: string;
    dvrType: string;
    dvrIpAddress: string;
    dvrTerm: string;
    iemsDvrIp: string;
    remarks: string;
    setupDate: Date;
    enableDisableStatus: boolean;
    dayNightFlag: boolean;
    isOnline: boolean;
    isActive: boolean;
  }