import { useState } from 'react';
import api from '../api/axios';
import toast from 'react-hot-toast';

export const useAIInsights = () => {
  const [insights, setInsights] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchInsights = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await api.get('/ai/insights');
      setInsights(data);
    } catch (err) {
      const msg = err.response?.data?.message || 'Failed to fetch insights';
      setError(msg);
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  return { insights, loading, error, fetchInsights };
};
