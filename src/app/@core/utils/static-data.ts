export const SD = {
  channels: [
    { value: 0, viewValue: "Email" },
    { value: 1, viewValue: "SMS" },
  ],
  status: [
    { value: true, viewValue: "Yes" },
    { value: false, viewValue: "No" },
  ],
  deployStatus: [
    { value: true, viewValue: "Deployed" },
    { value: false, viewValue: "Not Deployed" },
  ],
  feedbackStatus: [
    { value: true, viewValue: "Open" },
    { value: false, viewValue: "Close" },
  ],
  priorities: [
    { value: 0, viewValue: "Normal" },
    { value: 1, viewValue: "Urgent" },
  ],
  buildingTypeDdList : ['PUP', 'POB', 'VUP', 'VB', 'OG'],
  addressCodeDdList : ['E', 'W', 'N', 'C'],
  rtuNumberDdList : [1,2,3,4,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23],
  deviceTypeDdList : [19, 20],
  conditionalOperatorDdList:[
    {key:'>=', value:'>= (Greater than or equal)'},
    {key:'<=', value:'<= (Less than or equal)'},
    {key:'=', value:'= (Equal)'},
    {key:'!=', value:'!= (Not equal)'},
    {key:'<', value:'< (Less than)'},
    {key:'>', value:'> (Greater than)'},
  ],
  roleContractor: "Contractor",
};
