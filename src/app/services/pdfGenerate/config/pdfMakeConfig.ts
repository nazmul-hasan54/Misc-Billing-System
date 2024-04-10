export const setPdfMakeFonts = {
  bangla: {
    normal: 'Siyamrupali.ttf',
    bold: 'Siyamrupali.ttf'
  },
  Roboto: {
    normal: 'Roboto-Regular.ttf',
    bold: 'Roboto-Medium.ttf',
    italics: 'Roboto-Italic.ttf',
    bolditalics: 'Roboto-MediumItalic.ttf',
  },
  Arial: {
    normal: 'ARIAL.ttf',
    bold: 'ARIAL-bold.ttf',
  },
};

export const setFooterLefts = {
  alignment: 'left',
  fontSize: 9,
};
export const setFooterRights = {
  alignment: 'right',
  fontSize: 9,
};
// bill section
export const setBillStyles = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right'
  },
  setLeft: {
    alignment: 'left'
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
  },
  setTitleBold: {
    bold: true,
    fontSize: 11,
  },
  setSubTitleBold: {
    bold: true,
    fontSize: 10
  },  
  setHeadingBold: {
    bold: true,
    fontSize: 8
  },
  setColumnBold: {
    bold: true,
   //  fontSize: 9.2,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
    color: 'red',
  },
  footer: {
    font: 'bangla',
    fontSize: 9,
  },

  setHeading: {
    bold: true,
    fontSize: 10.5,
  },

  setSubSetHeading: {
    bold: true,
    fontSize: 9.5,
  },
  

  setFooterLefts,
  setFooterRights,
};
//#region Pouroshova Bangla report
export const CityCorporationDefaultStyle = {

}
//#endregion

//#region mis report common section
export const miscDefaultStyle = {
  fonts: 'Arial',
  alignment: 'center',
  fontSize: 9,
  color: '#111',
};
export const misDefaultPageMargin = [30, 80, 30, 30];
export const misAllCustomerArrearDetailsHeadingMargin = [140, 10, 0, 0];
export const misAllCustomerArrearBillCycleHeadingMargin = [85, 10, 0, 0]
export const misDefaultHeaderMargin = [140, 10, 0, 0];
export const misDefaultImageMargin = [-120, 0, 0, 0];
export const misArrearRegularCustomerPageMargin = [30, 85, 30, 30];

export const setHeading = {
  bold: true,
  fontSize: 14,
};
export const setSubHeading = {
  bold: true,
  fontSize: 10,
};
export const setSubSetHeading = {
  bold: true,
  fontSize: 10,
};

export const setFourthHeading = {
  bold: true,
  fontSize: 8
};

export const setReligioushHeading = {
  bold: true,
  fontSize: 5
};
export const setFooterLeft = {
  alignment: 'left',
  fontSize: 9,
};
export const setFooterRight = {
  alignment: 'right',
  fontSize: 9,
};
const setBlack = {
  color: 'black',
}
const setRight = {
  alignment: 'right',
}
const setLeft = {
  alignment: 'left',
}
export const setBold = {
  bold: true,
  fontSize: 8,
}

const setIcon = {
  icon: { font: 'Fontello' }
}
//#region energy selling
export const misEnergySellingDefaultStyle = {
  fonts: 'Arial',
  alignment: 'center',
  fontSize: 9,
  color: '#111',
}
export const misEnergySellingStyle = {
  setRight,
  setLeft,
  setBig: {
    fontSize: 9.5,
  },
  setBold: {
    bold: true,
  },
  setLocation: {
    fontSize: 9.7,
  },
  setLocationBold: {
    bold: true,
    fontSize: 9.8,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

export const misEnergySellingPageMargin = [30, 85, 30, 75];
export const misEnergySellingHeaderMargin = [80, 20, 25, 12];
export const misEnergySellingImageMargin = [-30, 0, 0, 0];
//#endregion energy selling
//#region arrear prepaid customer
export const misArrearPrepaidPageMargin = [30, 110, 25, 30];
export const misArrearPrepaidBasedOnPaymentUpToBillMonthPageMargin = [30, 125, 25, 30];
export const misArrearPrepaidBasedOnOffsetUpToBillMonthPageMargin = [30, 125, 25, 30];
export const misArrearPrepaidImageMargin = [-75, 0, 0, 0];
export const misArrearPrepaidHeaderMargin = [120, 20, 40, 0];

//#endregion arrear prepaid customer

//#region Never Paid Customer List
export const misNeverPaidCustomerImageMargin = [-80, 0, 0, 0];

//#endregion
//#region untraceable customer list
export const misUntraceableCustomerImageMargin = [-85, 0, 0, 0];
export const misUntraceableCustomerHeaderMargin = [-20, 25, 20, 0];
export const misUntraceableCustomerPageMargin = [20, 95, 20, 30];
//#endregion

//#region Arrear Regular Customer Location Wise

export const misArrearRegularLocationWisePageMargin = [30, 110, 30, 30];
export const arrearRegularHeadingMargin = [80, 20, 0, 0];
export const misArrearRegularImageMargin = [-190, 5, 0, 0];
//#endregion Arrear Regular Customer Location Wise

//#region all Customer Arrear Summary
export const misAllCustomerArrearSummaryImageMargin = [-100, 5, 0, 15];
//#endregion

//#region All Customer Arrear Summary Location wise
export const misAllCustomerArrearSummaryLocationHeaderMargin = [80, 25, 0, 0];
export const misAllCustomerArrearSummaryCenterWiseHeaderMargin = [0, 25, 0, 0];
export const misAllCustomerArrearLoactionWisePageMargin = [30, 110, 30, 30];
export const misAllCustomerArrearCenterWisePageMargin = [20, 80, 20, 30];
//#endregion
//#region Billing Status

export const misBillingStatusHeaderMargin = [-20, 30, 30, 0];
export const misBillingStatusPageMargin = [30, 100, 30, 30];
export const misBillingStatusImageMargin = [-205, 0, 0, 0];
//#endregion Billing Status

//#region Arrear Summary
export const misArrearSummaryCenterWise = [0, 15, 30, -40];
export const misArrearSummaryLocationWise = [0, 10, 30, 0];
//#endregion

//#region Never paid customer
export const misNeverPaidCustomerHeaderMargin = [30, 10, 30, 0];
//#endregion


export const setNewConnectionStyle = {
  setBlack,
  setRight,
  setLeft,
  setBig: {
    fontSize: 10,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

export const setArrearSummaryStyle = {
  setBlack,
  boldText: {
    bold: true,
  },
  setRight,
  setLeft,
  setBig: {
    fontSize: 10,
  },
  setText: {
    fontSize: 8,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

export const setBillingStatusStyle = {
  setBlack,
  setRight,
  setLeft,
  boldText: {
    bold: true,
  },
  setBig: {
    fontSize: 10,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

export const setStatisticsSummaryStyle = {
  setBlack,
  fontSize: 9,
  boldText: {
    bold: true,
  },
  setRight,
  setLeft,
  setBig: {
    fontSize: 10,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
  setLineHeight:{
    LineHeight: 3
  }
};

export const setMiscStatisticsSummaryStyle = {
  setBlack,
  fontSize: 9,
  boldText: {
    bold: true,
  },
  setRight,
  setLeft,
  setBig: {
    fontSize: 10,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
  setLineHeight:{
    LineHeight: 3
  },
  setIcon
};

export const setPouroshovaStyle = {
  setBlack,
  setRight,
  setLeft,
  setCenter: {
    alignment: 'center'
  },
  boldText: {
    bold: true,
  },
  setBig: {
    fontSize: 10,
  },
  setTitleBold: {
    bold: true,
    fontSize: 12,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

//#region all-customer-areaer location waise
export const setAllCustomerArrearStyle = {
  setBlack,
  setRight,
  setLeft,
  setCenter: {
    alignment: 'right',
  },

  setBig: {
    fontSize: 11,
  },
  setBig3: {
    fontSize: 9.5,
  },
  boldText: {
    bold: true,
  },
  setBig2: {
    bold: true,
    fontSize: 8.8,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};

//#region zoneLocationWiseCityPouroUnionStyle
export const  zoneLocationWiseCityPouroUnionStyle = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  margin: {
    margin: [0, 15, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },
};
export const misDefaultStyle = {
  fonts: 'Arial',
  alignment: 'center',
  fontSize: 9,
  color: '#111',
};
export const allCustomerArrearLocationWiseStyle = {
  setBlack,
  setRight,
  setLeft,
  setCenter: {
    alignment: 'center',
  },
  setBig: {
    fontSize: 10,
  },
  boldText: {
    bold: true,
  },

  setBillCycle: {
    bold: true,
    fontSize: 10,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
};
//#endregion all-customer-areaer location waise
//#region ministry details

export const ministryDetailsPageMargin = [30, 130, 30, 30];
export const ministryDetailsHeaderMargin = [30, 20, 30, 40];
export const ministryDetailsImageMargin = [-167, 5, 0, 0];
export const ministryDetailLogo = [-145, 5, 0, 0];
export const ministryDetailsDefaultStyle = {
  fonts: 'Roboto',
  alignment: 'center',
  fontSize: 9,
  color: '#111',
};
export const ministryDetailsStyle = {
  setRight,
  setLeft,
  setBig: {
    fontSize: 9.5,
  },
  setBold: {
    bold: true,
  },
  setLocation: {
    fontSize: 9.7,
  },
  setLocationBold: {
    bold: true,
    fontSize: 9.8,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
  setLineHight: {
   lineHeight: 0.1
  },
  setTopAndBottomPadding:{
    padding: [0, -12, 0, 2]
  },
  setLocationBold2: {
    bold: true,
    fontSize: 11,
  },

};

//#Customer Arrear
export const customerArrearPageMargin = [30, 130, 30, 30];
export const customerArrearHeaderMargin = [30, 20, 30, 40];
export const customerArrearImageMargin = [-167, 5, 0, 0];
export const customerArrearLogo = [-145, 5, 0, 0];
export const customerArrearDefaultStyle = {
  fonts: 'Roboto',
  alignment: 'center',
  fontSize: 9,
  color: '#111',
};
export const customerArrearStyle = {
  setRight,
  setLeft,
  setBig: {
    fontSize: 9.5,
  },
  setBold: {
    bold: true,
  },
  setLocation: {
    fontSize: 9.7,
  },
  setLocationBold: {
    bold: true,
    fontSize: 9.8,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
  setLineHight: {
   lineHeight: 0.1
  },
  setTopAndBottomPadding:{
    padding: [0, -12, 0, 2]
  },
  setLocationBold2: {
    bold: true,
    fontSize: 11,
  },

};

//#endregion minintry details
//#endregion mis report
//#region Ministry summary
export const misMinistrySummaryPageMargin = [30, 100, 30, 0];
export const misMinistryLedgerPageMargin = [30, 115, 30, 0];
export const misMinistrySummaryHeaderMargin = [30, 20, 30, 0];
export const misMinistrySummaryImageMargin = [-170, 3, 0, 0];
export const misMinistrySummaryStyle = {
  setBlack,
  setRight,
  setLeft,
  setBig: {
    fontSize: 9,
  },
  setBold2: {
    bold: true,
    fontSize: 10,
  },
  setBold,
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
}
// MisAllMinistryCenterwiseSummary
export const misAllMinistryCenterwiseSummaryPageMargin = [30, 100, 30, 30];
export const misAllMinistryCenterwiseSummaryHeaderMargin = [140, 10, 0, 0];
export const misAllMinistryCenterwiseSummaryImageMargin = [-290, 10, 0, 0];
export const misAllMinistryCenterwiseSummaryDefaultStyle = {
  fonts: 'Arial',
  alignment: 'center',
  fontSize: 7,
  color: '#111',
}
export const ZoneCircleWiseAllReligiousPageMarginStyle = {
  fonts: 'Arial',
  alignment: 'center',
  fontSize: 8,
  color: '#111',
};

//#endregion Ministry summary



//#region  Certificate
export const bodyMargin = [-30, -7, -30, 0];
export const setCertificateStyles = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 9,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 9.5,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },

};


//#endregion

//#region agriculture and poultry
export const setAgricultureAndPoultryStyles = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },  
  setHeading: {
    font: 'bangla',
    fontSize: 9,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },
  setBanglaSubHeading: {
    font: 'bangla',
    fontSize: 8,
  },
  setHead: {
    font: 'bangla',
    fontSize: 8,
  },
};
//#endregion


//#region Poultry
export const setPoultryStyles = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },  
  setHeading: {
    font: 'bangla',
    fontSize: 9,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },

};

// City-Corporation-Pouroshova-Union
export const setCityPouroUnionStyles = {
  setBlack: {
    color: 'black',
  },  
  setRed: {
    color: 'red',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 8,
  },
  setBanglaFont: {
    font: 'bangla',
    fontSize: 10,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },
  setHeading : {
    bold: true,
    fontSize: 12
  },
  setSubHeading: {
    bold: true,
    fontSize: 11,
  },
  marginLeft: {
    alignment: 'left',
  },

};
//#endregion

//#ministry Arrear 

export const misMinistryArrearPageMargin = [30, 100, 30, 30];
export const misMinistryArrearHeaderMargin = [30, 20, 30, 0];
export const misMinistryArrearImageMargin = [-160, 3, 0, 0];
export const misMinistryArrearStyle = {
  setBlack,
  setRight,
  setLeft,
  setBig: {
    fontSize: 9,
  },
  setBold,
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,

  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
 

}
//#endregion ministry Arrear

//#region pouroshova style

export const setPouroshovaAndCityStyle = {
  setBlack,
  setRight,
  setLeft,
  //setBold,
  setCenter: {
    alignment: 'center',
  },
  setBold: {
    bold: true,
    fontSize: 8.5
  },
  setFontBangla: {
    font: 'Arial',
    fontSize: 6,
  },
  setBig: {
    fontSize: 11,
  },
  boldText: {
    bold: true,
  },
  setBig2: {
    bold: true,
    fontSize: 11,
  },
  setHeading,
  setSubHeading,
  setFooterLeft,
  setFooterRight,
}
//#endregion


//#region Mosque And Other Places
export const setMosqueAndOtherPlacesStyles = {

  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
  },
  fontSize: {
    bold: true,
    fontSize: 11.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },
};
//#endregion


//#region agriculture and poultry
export const setCommonStyle = {
  setBlack: {
    color: 'black',
  },
  setRight: {
    alignment: 'right',
  },
  setLeft: {
    alignment: 'left',
  },
  setCenter: {
    alignment: 'center'
  },
  setBold: {
    bold: true,
    fontSize: 9.5,
  },
  setTitleBold: {
    bold: true,
    fontSize: 9,
  },
  margin_Top: {
    margin: [0, 3, 0, 0],
  },
  dueStyle: {
    decoration: 'underline',
  },
  setFontBangla: {
    font: 'bangla',
    fontSize: 6,
  },  
  setHeading: {
    font: 'bangla',
    fontSize: 9,
  },
  setBanglaHeadingFont: {
    font: 'bangla',
    fontSize: 6,
  },
  setBanglaTableFont: {
    font: 'bangla',
    fontSize: 9,
    color: 'red',
  },
  setTableValeFont: {
    font: 'Roboto',
    fontSize: 8,
    color: 'black',
  },
  setFooterRight: {
    alignment: 'right',
  },
  setFooterLeft: {
    alignment: 'left',
  },
  setBanglaSubHeading: {
    font: 'bangla',
    fontSize: 8,
  },
};
//#endregion