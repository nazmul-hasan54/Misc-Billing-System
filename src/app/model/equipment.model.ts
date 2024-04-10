export interface Equipment {
    equipmentId: number;
    equipmentGroupIdFk: string;
    equipmentGroupTitle: string;
    buildingIdFk: string;
    rtuIdFk: string;
    rtuIpAddress: string;
    equipmentTitle: string;
    rtuNumber: number;
    baudrate: number;
    deviceType: number;
    letter: string;
    lastRbelo: string;
    lastRbehi: string;
    latestRbelo: string;
    latestRbehi: string;
    remarks: string;
    isRs485: boolean;
    isSmsActivated: boolean;
    commissionDate: Date;
    isOnline: boolean;
    isActive: boolean;
    postalCode:string;
    rtuTitle:string;
    siteNbr:string;
  }