export type FinanceEntry = {
  id: string;
  startDate: string;
  endDate: string;
  savings: {
    [key: string]: {
      amount: number;
    };
  };
  expenses: {
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
  expensesTotal: number;
  billsTotal: number;
  incomeTotal: number;
  // Firebase-specific fields
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}