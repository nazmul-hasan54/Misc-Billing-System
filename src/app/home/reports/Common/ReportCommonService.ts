

export const tariffList = {
    ReportTariffData(){ 
        return  [
          { id: '0', text: 'All' },
          { id: '1', text: 'F2' },
          { id: '2', text: 'HT-1' },
          { id: '3', text: 'HT-2' },
          { id: '4', text: 'HT-3' },
          { id: '5', text: 'LT-A' },
          { id: '6', text: 'LT-B' },
          { id: '7', text: 'LT-C1' },
          { id: '8', text: 'LT-C2' },
          { id: '9', text: 'LT-D1' },
          { id: '10', text: 'LT-D2' },
          { id: '20', text: 'LT-D3' },
          { id: '11', text: 'LT-E' },
          { id: '13', text: 'LT-T' },
          { id: '14', text: 'MT-1' },
          { id: '15', text: 'MT-2' },
          { id: '16', text: 'MT-3' },
          { id: '17', text: 'MT-4' },
          { id: '18', text: 'MT-5' },
          { id: '19', text: 'MT-6' },
        ];
    }
};

export const reportTypeDropDownData={
    reportType(){
    return [
        { id: '1', text: 'Details' },
        { id: '2', text: 'Bill Cycle Wise' },
        ]
    }
}


export const orderTypeDropDownData={
    MISOrderTypeData(){
        return [
          { id: 'billcycle', text: 'Bill Cycle' },
          { id: 'billgroup', text: 'Bill Group' },
          { id: 'book', text: 'Book' },
          { id: 'tariff', text: 'Tariff' },
       ];
    }
} 