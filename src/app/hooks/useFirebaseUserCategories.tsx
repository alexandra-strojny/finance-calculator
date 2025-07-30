import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  query, 
  where,
  limit
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { UserCategories } from '../types/userCategories';
import { useAuth } from './useAuth';

export const useFirebaseUserCategories = () => {
  const [userCategories, setUserCategories] = useState<UserCategories>({
    savings: [],
    expenses: [],
    bills: [],
    income: [],
    creditCards: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchUserCategories = async () => {
    if (!user) {
      setUserCategories({
        savings: [],
        expenses: [],
        bills: [],
        income: [],
        creditCards: []
      });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const q = query(
        collection(db, 'userCategories'),
        where('userId', '==', user.uid),
        limit(1)
      );
      
      const querySnapshot = await getDocs(q);
      
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const categories = {
          id: doc.id,
          ...doc.data()
        } as UserCategories;
        setUserCategories(categories);
      } else {
        // If no categories exist, create default ones
        await createDefaultCategories();
      }
      
      setError(null);
    } catch (err) {
      console.error('Error fetching user categories:', err);
      setError('Failed to fetch user categories');
    } finally {
      setLoading(false);
    }
  };

  const createDefaultCategories = async () => {
    if (!user) return;

    const defaultCategories: Omit<UserCategories, 'id'> = {
      savings: ['Nest Egg', 'Vacation', 'Emergency Fund', 'Investment'],
      expenses: ['Groceries', 'Transportation', 'Entertainment', 'Shopping'],
      bills: ['Mortgage/Rent', 'Utilities', 'Insurance', 'Phone'],
      income: ['Salary', 'Freelance', 'Investments'],
      creditCards: ['Credit Card 1', 'Credit Card 2'],
      userId: user.uid,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    try {
      const docRef = await addDoc(collection(db, 'userCategories'), defaultCategories);
      setUserCategories({
        id: docRef.id,
        ...defaultCategories
      });
    } catch (err) {
      console.error('Error creating default categories:', err);
      setError('Failed to create default categories');
    }
  };

  const updateUserCategories = async (updates: Partial<UserCategories>) => {
    if (!user || !userCategories.id) {
      setError('User must be authenticated and categories must exist');
      return false;
    }

    try {
      const docRef = doc(db, 'userCategories', userCategories.id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      
      await fetchUserCategories(); // Refresh the data
      return true;
    } catch (err) {
      console.error('Error updating user categories:', err);
      setError('Failed to update user categories');
      return false;
    }
  };

  const addCategoryItem = async (categoryType: keyof Omit<UserCategories, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, newItem: string) => {
    if (!userCategories[categoryType]) return false;

    const updatedCategories = {
      ...userCategories,
      [categoryType]: [...userCategories[categoryType], newItem]
    };

    return await updateUserCategories(updatedCategories);
  };

  const removeCategoryItem = async (categoryType: keyof Omit<UserCategories, 'id' | 'userId' | 'createdAt' | 'updatedAt'>, itemToRemove: string) => {
    if (!userCategories[categoryType]) return false;

    const updatedCategories = {
      ...userCategories,
      [categoryType]: userCategories[categoryType].filter(item => item !== itemToRemove)
    };

    return await updateUserCategories(updatedCategories);
  };

  useEffect(() => {
    fetchUserCategories();
  }, [user]);

  return {
    userCategories,
    loading,
    error,
    updateUserCategories,
    addCategoryItem,
    removeCategoryItem,
    refetch: fetchUserCategories
  };
};
