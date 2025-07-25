export type FinanceEntry = {
  id: string;
  startDate: string;
  endDate: string;
  savings: {
    [key: string]: {
      amount: number;
    };
  };
  creditCards: {
    [key: string]: {
      amount: number;
    }
  };
  bills: {
    [key: string]: {
      amount: number;
    }
  }; 
  income: {
    [key: string]: {
      amount: number;
    }
  };
  savingsTotal: number;
  creditCardsTotal: number;
  billsTotal: number;
  incomeTotal: number;
}