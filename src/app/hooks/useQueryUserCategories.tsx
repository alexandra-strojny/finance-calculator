import { UserCategories } from "../types/userCategories"

export const useQueryUserCategories = (): UserCategories => {
  return {
    savings: ['Nest Egg', 'Vacation', 'Jake Things', 'Etrade'],
    expenses: ['Quicksilver', 'Savor', 'Chase Amazon', 'Chase Sapphire', 'Amex Gold', 'Amex Blue', 'Charity'],
    bills: ['Mortgage', 'Gas', 'Comed', 'Water/Sewage/Trash'],
    income: ['Jake', 'Alex', 'Misc'],
  }
}