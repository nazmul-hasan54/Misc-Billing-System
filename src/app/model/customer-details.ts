export interface CustomerDetails {
  custId: string;
  customerName: string;
  fatherName: string;
  customerNumber: string;
  billNumber: string;
  locationCode: string;
  locationName: string;
  locationDeptCode?: string
  areaCode: string;
  tariffId: string;
  businessType: string;
  tariffDesc: string;
  meterNum: string;
  meterTypeDesc: string;
  prvAcNo: string;
  glkOrd: string;
  customerAddr: string;
  nidNumber: string;
  mobileNumber: string;
  meterCondition: string;
  lastReading: string;
  meterTypeCode: string;
  meterConditionCode: string;
  meterConditionDesc: string;
  businessTypeCode: string;
  lastReadingOffPeak: string;
  lastReadingPeak: string;
  lastReadingDate: string;
  offPeakUnit: string;
  peakUnit: string;
  dueDate: string | null;
  dcDate: string | null;
  xformer_kva: number;
  xformer_day_rent: number;
  sanctionedLoad?: number;
  arrearAmount: number;
  lastBillReadingSr :number;
  lastBillReadingPk :number;
  lastBillReadingOfPk :number;
}



export interface CustomerDetailsDTO {
  custId: string;
  customerName: string;
  fatherName: string;
  customerNumber: string;
  billNumber: string;
  locationCode: string;
  locationName: string;
  areaCode: string;
  tariffId: string;
  businessType: string;
  tariffDesc: string;
  meterNum: string;
  meterTypeDesc: string;
  prvAcNo: string;
  glkOrd: string;
  customerAddr: string;
  nidNumber: string;
  mobileNumber: string;
  meterCondition: string;
  lastReading: string;
  meterTypeCode: string;
  meterConditionCode: string;
  meterConditionDesc: string;
  businessTypeCode: string;
  lastReadingOffPeak: string;
  lastReadingPeak: string;
  offPeakUnit: string;
  peakUnit: string;
  billReasonCode: string | null;
  multypliBy: string | null;
  imposedByCode: string | null;
  penaltyUnit: number | null;
  principleAmount: number | null;
  vatAmount: number | null;
  totalAmount: number | null;
  dueDate: string | null;
  dcDate: string | null;
  dcTypeCode: string | null;
  lastReadingDate: string | null;
  supplymentaryAmount:number | null;
  fileList: FileModel[];
  xformer_kva: number|null;
  xformer_day_rent: number|null;
  arrearAmount: number;
  lastBillReadingSr :number;
  lastBillReadingPk :number;
  lastBillReadingOfPk :number;
}

export interface FileModel {
  fileList: any;
  fileTypes: string | null;
  fileNames: string | null;
}
