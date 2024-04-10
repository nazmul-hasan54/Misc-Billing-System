export interface NavItem {
    itemId: number;
    itemName: string;
    parentId: string | null;
    url: string | null;
    icon: string | null;
    children: NavItem[];
    isActive: number;
  isCreated: boolean,
    isEdited:boolean,
  isDeleted: boolean
  }
  