export interface Building {
    buildingId: number;
    siteNbr: string;
    addressCode: boolean;
    buildingTitle:string;
    address:string;
    postalCode:string;
    buildingType:string;
    assetNo:string;
    ltaId:string;
    issInstallDate:Date | null | string;
    isActive:boolean;
    isOnTest:boolean;
  }