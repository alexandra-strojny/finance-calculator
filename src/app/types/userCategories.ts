export type UserCategories = {
  id?: string;
  savings: string[];
  expenses: string[];
  bills: string[];
  income: string[];
  creditCards: string[];
  // Firebase-specific fields
  userId?: string;
  createdAt?: Date;
  updatedAt?: Date;
}