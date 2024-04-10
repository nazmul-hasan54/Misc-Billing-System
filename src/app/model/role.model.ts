export interface Role {
    [x: string]: any;
    id: number;
    roleName: string;
    menuFkId: number;
    menuName: string;
    isActive: number;
    timeStamp: Date;
  }