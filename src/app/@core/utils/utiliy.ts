import { FormGroup } from "@angular/forms";
import moment from "moment";

export const dateFormat = (date) => {
  return moment(date).format("DD/MM/YYYY HH:mm");
};

export const dateFormatISO = (date: string) => {
  return moment(new Date(date)).local().format('YYYY-MM-DDTHH:mm:ss.SSSZ');
};

export const ddmmyytodate = (date: string) => {
  return moment(new Date(date)).local().format('D MMM YYYY HH:mm:ss.SSSZ');
};

export const dateFormatForReport=(date:Date)=>{
  const monthNames = ["Jan", "Feb", "Mar", "Apr",
                        "May", "Jun", "Jul", "Aug",
                        "Sep", "Oct", "Nov", "Dec"];
    
    const day = date.getDate().toString().padStart(2, "0");
    
    const monthIndex = date.getMonth();
    const monthName = monthNames[monthIndex];
    
    const year = date.getFullYear().toString().substring(2,4);
    
    return `${day}-${monthName}-${year}`;  
}

export const dateFormatForDDMMYY=(date:Date)=>{
    return `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth()+1 ).toString().padStart(2, '0')}/${date.getFullYear().toString()}`;  
}

export const dateFormatForDDMMYYYY = (date: Date) => {
  return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString()}`;
}

export const MY_DATE_FORMATS = {
  parse: {
    dateInput: "DD-MM-YYYY",
  },
  display: {
    dateInput: "DD/MM/YYYY",
    monthYearLabel: "MMMM YYYY",
    dateA11yLabel: "LL",
    monthYearA11yLabel: "MMMM YYYY",
  },
};



export const hasErrorValidation = (formName: FormGroup, controlName: string, errorName: string) => {
  return formName.controls[controlName].hasError(errorName);

}
