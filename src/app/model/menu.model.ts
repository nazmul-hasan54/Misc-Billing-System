export interface Menu {
    menuId: number;
    menuName: string;
    url: string;
    isActive: number; //bool
    timeStamp: Date;
    icon: string;
    parentId: number; // bool
    isParent: number; // bool
    isGroup: boolean;
    groupId: number;
  }