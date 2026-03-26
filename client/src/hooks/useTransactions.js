import { useState, useCallback } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchTransactions = useCallback(async (filters = {}) => {
    setLoading(true);
    try {
      const params = {};
      if (filters.month) params.month = filters.month;
      if (filters.type) params.type = filters.type;
      if (filters.category) params.category = filters.category;
      const { data } = await api.get('/transactions', { params });
      setTransactions(data);
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to load transactions');
    } finally {
      setLoading(false);
    }
  }, []);

  const addTransaction = async (formData) => {
    const { data } = await api.post('/transactions', formData);
    setTransactions((prev) => [data, ...prev]);
    return data;
  };

  const updateTransaction = async (id, formData) => {
    const { data } = await api.put(`/transactions/${id}`, formData);
    setTransactions((prev) => prev.map((t) => (t._id === id ? data : t)));
    return data;
  };

  const deleteTransaction = async (id) => {
    await api.delete(`/transactions/${id}`);
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  };

  return { transactions, loading, fetchTransactions, addTransaction, updateTransaction, deleteTransaction };
};
