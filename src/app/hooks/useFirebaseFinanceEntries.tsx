import { useState, useEffect } from 'react';
import { 
  collection, 
  doc, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  query, 
  orderBy,
  where
} from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { FinanceEntry } from '../types/financeEntry';
import { useAuth } from './useAuth';

export const useFirebaseFinanceEntries = () => {
  const [financeEntries, setFinanceEntries] = useState<FinanceEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  const fetchFinanceEntries = async () => {
    if (!user) {
      setFinanceEntries([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const q = query(
        collection(db, 'financeEntries'),
        where('userId', '==', user.uid),
        orderBy('startDate', 'desc')
      );
      
      const querySnapshot = await getDocs(q);
      const entries: FinanceEntry[] = [];
      
      querySnapshot.forEach((doc) => {
        entries.push({
          id: doc.id,
          ...doc.data()
        } as FinanceEntry);
      });
      
      setFinanceEntries(entries);
      setError(null);
    } catch (err) {
      console.error('Error fetching finance entries:', err);
      setError('Failed to fetch finance entries');
    } finally {
      setLoading(false);
    }
  };

  const addFinanceEntry = async (entry: Omit<FinanceEntry, 'id'>) => {
    if (!user) {
      setError('User must be authenticated');
      return null;
    }

    try {
      const docRef = await addDoc(collection(db, 'financeEntries'), {
        ...entry,
        userId: user.uid,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      
      await fetchFinanceEntries(); // Refresh the list
      return docRef.id;
    } catch (err) {
      console.error('Error adding finance entry:', err);
      setError('Failed to add finance entry');
      return null;
    }
  };

  const updateFinanceEntry = async (id: string, updates: Partial<FinanceEntry>) => {
    if (!user) {
      setError('User must be authenticated');
      return false;
    }

    try {
      const docRef = doc(db, 'financeEntries', id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: new Date()
      });
      
      await fetchFinanceEntries(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error updating finance entry:', err);
      setError('Failed to update finance entry');
      return false;
    }
  };

  const deleteFinanceEntry = async (id: string) => {
    if (!user) {
      setError('User must be authenticated');
      return false;
    }

    try {
      await deleteDoc(doc(db, 'financeEntries', id));
      await fetchFinanceEntries(); // Refresh the list
      return true;
    } catch (err) {
      console.error('Error deleting finance entry:', err);
      setError('Failed to delete finance entry');
      return false;
    }
  };

  useEffect(() => {
    fetchFinanceEntries();
  }, [user]);

  return {
    financeEntries,
    loading,
    error,
    addFinanceEntry,
    updateFinanceEntry,
    deleteFinanceEntry,
    refetch: fetchFinanceEntries
  };
};
