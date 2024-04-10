export interface DiagnosisRules {
    diagnosisRulesId: number;
    equipmentIdFk: string;
    equipmentTitle:string;
    deviceCategoryIdFk:string;
    deviceCategoryTitle: string;
    alarmCodeFk: number;
    alarmType: string;
    diagnosisRulesTitle: string;
    diagnosisAlarmDescription: string;
    diagnosisBitType: string;
    isActive: boolean;
    DiagnosisRulesDetails:[];
  }