
'use client';

import { useState } from 'react';
import { useFirebaseUserCategories } from '../hooks/useFirebaseUserCategories';

export const CategoriesCard = () => {
  const { userCategories, loading, error, addCategoryItem, removeCategoryItem } = useFirebaseUserCategories();
  const [newItems, setNewItems] = useState({
    income: '',
    bills: '',
    expenses: '',
    savings: '',
    creditCards: ''
  });

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-600 p-4 bg-red-50 rounded-lg">
        Error: {error}
      </div>
    );
  }

  const handleAddItem = async (categoryType: keyof typeof newItems) => {
    const newItem = newItems[categoryType].trim();
    if (!newItem) return;

    const success = await addCategoryItem(categoryType, newItem);
    if (success) {
      setNewItems(prev => ({ ...prev, [categoryType]: '' }));
    }
  };

  const handleRemoveItem = async (categoryType: keyof typeof newItems, itemToRemove: string) => {
    await removeCategoryItem(categoryType, itemToRemove);
  };

  const generateCategories = (
    categoryType: keyof typeof newItems,
    displayName: string,
    name: string,
    items: string[]
  ) => {
    return (
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4">{`${displayName}`}</h3>
        {items.map((item, index) => (
          <div key={index} className="flex items-center justify-between mb-4">
            <span>{item}</span>
            <button 
              onClick={() => handleRemoveItem(categoryType, item)}
              className="bg-red-500 hover:bg-red-700 text-white w-6 h-6 rounded-full cursor-pointer"
            >
              -
            </button>
          </div>
        ))}

        <div className="flex gap-4">
          <input
            type="text"
            value={newItems[categoryType]}
            onChange={(e) => setNewItems(prev => ({ ...prev, [categoryType]: e.target.value }))}
            onKeyPress={(e) => e.key === 'Enter' && handleAddItem(categoryType)}
            placeholder={`Add ${/^[aeiouAEIOU]/.test(name) ? 'an' : 'a'} ${name.toLowerCase()}`}
            className="border border-gray-300 rounded-lg p-1 w-full mb-4"
          />
          <button 
            onClick={() => handleAddItem(categoryType)}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold w-8 h-8 rounded-full focus:outline-none focus:shadow-outline cursor-pointer"
          >
            +
          </button>
        </div>
      </div>
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
      {generateCategories('income', 'Income Sources', 'Income Source', userCategories.income)}
      {generateCategories('bills', 'Bills', 'Bill', userCategories.bills)}
      {generateCategories('expenses', 'Expenses', 'Expense', userCategories.expenses)}
      {generateCategories('savings', 'Savings Categories', 'Savings Category', userCategories.savings)}
      {generateCategories('creditCards', 'Credit Cards', 'Credit Card', userCategories.creditCards)}
    </div>
  );
};