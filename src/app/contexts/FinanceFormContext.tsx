'use client';

import { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { UserCategories } from '../types/userCategories';

export interface FinanceFormData {
  income: { [key: string]: number };
  expenses: { [key: string]: number };
  bills: { [key: string]: number };
  savings: { [key: string]: number };
  creditCards: { [key: string]: number };
}

interface FinanceFormContextType {
  formData: FinanceFormData;
  updateCategoryValue: (category: keyof FinanceFormData, item: string, value: number) => void;
  resetForm: () => void;
  isInitialized: boolean;
  startDate: string;
  endDate: string;
  setStartDate: (date: string) => void;
  setEndDate: (date: string) => void;
}

const FinanceFormContext = createContext<FinanceFormContextType | undefined>(undefined);

export const useFinanceForm = () => {
  const context = useContext(FinanceFormContext);
  if (!context) {
    throw new Error('useFinanceForm must be used within a FinanceFormProvider');
  }
  return context;
};

interface FinanceFormProviderProps {
  children: ReactNode;
  userCategories?: UserCategories;
}

export const FinanceFormProvider = ({ children, userCategories }: FinanceFormProviderProps) => {
  // Calculate default dates (two weeks span)
  const getDefaultDates = () => {
    const today = new Date();
    const twoWeeksAgo = new Date();
    twoWeeksAgo.setDate(today.getDate() - 14);
    
    return {
      startDate: twoWeeksAgo.toISOString().split('T')[0],
      endDate: today.toISOString().split('T')[0]
    };
  };

  const [startDate, setStartDate] = useState(getDefaultDates().startDate);
  const [endDate, setEndDate] = useState(getDefaultDates().endDate);

  // Create a stable key for categories to detect changes
  const categoriesKey = useMemo(() => {
    if (!userCategories?.id) return null;
    return `${userCategories.id}-${userCategories.income.length}-${userCategories.expenses.length}-${userCategories.bills.length}-${userCategories.savings.length}-${userCategories.creditCards.length}`;
  }, [userCategories]);

  // Initialize form data when categories change
  const initialFormData = useMemo((): FinanceFormData => {
    if (!userCategories) {
      return {
        income: {},
        expenses: {},
        bills: {},
        savings: {},
        creditCards: {}
      };
    }

    const initialData: FinanceFormData = {
      income: {},
      expenses: {},
      bills: {},
      savings: {},
      creditCards: {}
    };

    // Initialize each category with 0 values
    userCategories.income.forEach(item => {
      initialData.income[item] = 0;
    });

    userCategories.expenses.forEach(item => {
      initialData.expenses[item] = 0;
    });

    userCategories.bills.forEach(item => {
      initialData.bills[item] = 0;
    });

    userCategories.savings.forEach(item => {
      initialData.savings[item] = 0;
    });

    userCategories.creditCards.forEach(item => {
      initialData.creditCards[item] = 0;
    });

    return initialData;
  }, [categoriesKey]);

  const [formData, setFormData] = useState<FinanceFormData>(initialFormData);

  // Reset form data when categories change
  useEffect(() => {
    setFormData(initialFormData);
  }, [initialFormData]);

  const isInitialized = Boolean(categoriesKey);

  const updateCategoryValue = (category: keyof FinanceFormData, item: string, value: number) => {
    setFormData(prev => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: value
      }
    }));
  };

  const resetForm = () => {
    if (userCategories) {
      setFormData(initialFormData);
    } else {
      setFormData({
        income: {},
        expenses: {},
        bills: {},
        savings: {},
        creditCards: {}
      });
    }
  };

  return (
    <FinanceFormContext.Provider
      value={{
        formData,
        updateCategoryValue,
        resetForm,
        isInitialized,
        startDate,
        endDate,
        setStartDate,
        setEndDate
      }}
    >
      {children}
    </FinanceFormContext.Provider>
  );
};
