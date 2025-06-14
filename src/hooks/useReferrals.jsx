
import { useState, useEffect } from 'react';
import { referralAPI } from '../services/apiService';
import { dummyReferrals } from '../data/dummyData';

export const useReferrals = () => {
  const [referrals, setReferrals] = useState(dummyReferrals);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchReferrals = async () => {
    setLoading(true);
    try {
      setReferrals(dummyReferrals);
      setError(null);
    } catch (err) {
      setError('Failed to fetch referrals');
      console.error('Error fetching referrals:', err);
    }
    setLoading(false);
  };

  const createReferral = async (referralData) => {
    setLoading(true);
    try {
      const newReferral = {
        ...referralData,
        id: Date.now(),
        referralDate: new Date().toISOString().split('T')[0],
        status: 'active'
      };
      setReferrals(prev => [...prev, newReferral]);
      setError(null);
      return newReferral;
    } catch (err) {
      setError('Failed to create referral');
      console.error('Error creating referral:', err);
    }
    setLoading(false);
  };

  const deleteReferral = async (id) => {
    setLoading(true);
    try {
      setReferrals(prev => prev.filter(referral => referral.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete referral');
      console.error('Error deleting referral:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchReferrals();
  }, []);

  return {
    referrals,
    loading,
    error,
    fetchReferrals,
    createReferral,
    deleteReferral
  };
};
