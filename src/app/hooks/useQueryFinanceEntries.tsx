
import { FinanceEntry } from '../types/financeEntry';

export const useQueryFinanceEntries = (): FinanceEntry[] => {
  return [
    {
      id: '1',
      startDate: '2025-06-01',
      endDate: '2025-06-15',
      savings: {
        'Nest Egg': { amount: 1000 },
        'Vacation': { amount: 1000 },
        'Jake Things': { amount: 1500 },
        'Etrade': { amount: 3500 }
      },
      expenses: {
        'Quicksilver': { amount: 1020.26 },
        'Savor': { amount: 1598.58 },
        'Chase Amazon': { amount: 76.74 },
        'Chase Sapphire': { amount: 113.02 },
        'Amex Gold': { amount: 369.72 },
        'Amex Blue': { amount: 153.33 },
        'Charity': { amount: 100 }
      },
      bills: {
        'Mortgage': { amount: 2500 },
        'Gas': { amount: 0 },
        'Comed': { amount: 0 },
        'Water/Sewage/Trash': { amount: 34.02 }
      },
      income: {
        'Jake': { amount: 5384.01 },
        'Alex': { amount: 4732.11 },
        'Misc': { amount: -458 }
      },
      savingsTotal: 3500,
      expensesTotal: 1250,
      billsTotal: 1700,
      incomeTotal: 5300
    },
    {
      id: '2',
      startDate: '2025-06-16',
      endDate: '2025-06-30',
      savings: {
        'Nest Egg': { amount: 5500 },
        'Vacation': { amount: 1000 },
        'Jake Things': { amount: 0 },
        'Etrade': { amount: 0 }
      },
      expenses: {
        'Quicksilver': { amount: 861.55 },
        'Savor': { amount: 1139.19 },
        'Chase Amazon': { amount: 809.53 },
        'Chase Sapphire': { amount: 730.8 },
        'Amex Gold': { amount: 237.67 },
        'Amex Blue': { amount: 391.91 },
        'Charity': { amount: 100 }
      },
      bills: {
        'Mortgage': { amount: 2500 },
        'Gas': { amount: 55.52 },
        'Comed': { amount: 0 },
        'Water/Sewage/Trash': { amount: 33.3 }
      },
      income: {
        'Jake': { amount: 5426.01 },
        'Alex': { amount: 4814.94 },
        'Misc': { amount: 3050.85 }
      },
      savingsTotal: 6600,
      expensesTotal: 900,
      billsTotal: 1675,
      incomeTotal: 5100
    },
    {
      id: '3',
      startDate: '2025-07-01',
      endDate: '2025-07-15',
      savings: {
        'Nest Egg': { amount: 6000 },
        'Vacation': { amount: 1500 },
        'Jake Things': { amount: 500 },
        'Etrade': { amount: 1000 }
      },
      expenses: {
        'Quicksilver': { amount: 400 },
        'Savor': { amount: 300 },
        'Chase Amazon': { amount: 350 },
        'Chase Sapphire': { amount: 700 },
        'Amex Gold': { amount: 500 },
        'Amex Blue': { amount: 200 }
      },
      bills: {
        'Mortgage': { amount: 1500 },
        'Gas': { amount: 110 },
        'Comed': { amount: 80 },
        'Water/Sewage/Trash': { amount: 70 }
      },
      income: {
        'Jake': { amount: 4500 },
        'Alex': { amount: 700 }
      },
      savingsTotal: 7000,
      expensesTotal: 1100,
      billsTotal: 1690,
      incomeTotal: 5200
    }
  ];
}