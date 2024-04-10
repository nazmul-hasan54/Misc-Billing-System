export interface MinistrySummaryModel{
      dbName: string; 
      ministryCode: string;
      ministryName: string;
      ministryNameBn : string;
      noc: number; 
      lps: number; 
      vat: number; 
      prn: number; 
      total: number; 
      dbCode: string;
      zoneCode: string;
   
      chittagongCount: number;
      chittagongPrn: number;
      chittagongPrevArrearAmt: number;
      chittagongCurrMonthBill: number;
      chittagongCollectionAmt: number;
      chittagongTotalArrearAmt: number;

      comillaCount: number;
      comillaPrn: number;
      comillaPrevArrearAmt: number;
      comillaCurrMonthBill: number;
      comillaCollectionAmt: number;
      comillaTotalArrearAmt: number;

      sylhetCount: number;
      sylhetPrn: number;
      sylhetPrevArrearAmt: number;
      sylhetCurrMonthBill: number;
      sylhetCollectionAmt: number;
      sylhetTotalArrearAmt: number;

      mymensinghCount: number;
      mymensinghPrn: number;
      mymensinghPrevArrearAmt: number;
      mymensinghCurrMonthBill: number;
      mymensinghCollectionAmt: number;
      mymensinghTotalArrearAmt: number;

      kishoreganjCount: number;
      kishoreganjPrn: number;
      moulvibazarCount: number;
      moulvibazarPrn: number;
      tangailCount: number;
      tangailPrn: number;
      jamalpurCount: number;
      jamalpurPrn: number;
        
}