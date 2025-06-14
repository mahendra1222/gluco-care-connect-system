
import { useState, useEffect } from 'react';
import { branchAPI } from '../services/apiService';
import { dummyBranches } from '../data/dummyData';

export const useBranches = () => {
  const [branches, setBranches] = useState(dummyBranches);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchBranches = async () => {
    setLoading(true);
    try {
      setBranches(dummyBranches);
      setError(null);
    } catch (err) {
      setError('Failed to fetch branches');
      console.error('Error fetching branches:', err);
    }
    setLoading(false);
  };

  const createBranch = async (branchData) => {
    setLoading(true);
    try {
      const newBranch = {
        ...branchData,
        id: Date.now()
      };
      setBranches(prev => [...prev, newBranch]);
      setError(null);
      return newBranch;
    } catch (err) {
      setError('Failed to create branch');
      console.error('Error creating branch:', err);
    }
    setLoading(false);
  };

  const updateBranch = async (id, branchData) => {
    setLoading(true);
    try {
      setBranches(prev => 
        prev.map(branch => 
          branch.id === id ? { ...branch, ...branchData } : branch
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update branch');
      console.error('Error updating branch:', err);
    }
    setLoading(false);
  };

  const deleteBranch = async (id) => {
    setLoading(true);
    try {
      setBranches(prev => prev.filter(branch => branch.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete branch');
      console.error('Error deleting branch:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return {
    branches,
    loading,
    error,
    fetchBranches,
    createBranch,
    updateBranch,
    deleteBranch
  };
};
