
import { useState, useEffect } from 'react';
import { doctorAPI } from '../services/apiService';
import { dummyDoctors } from '../data/dummyData';

export const useDoctors = () => {
  const [doctors, setDoctors] = useState(dummyDoctors);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchDoctors = async () => {
    setLoading(true);
    try {
      setDoctors(dummyDoctors);
      setError(null);
    } catch (err) {
      setError('Failed to fetch doctors');
      console.error('Error fetching doctors:', err);
    }
    setLoading(false);
  };

  const addDoctor = async (doctorData) => {
    setLoading(true);
    try {
      const newDoctor = {
        ...doctorData,
        id: Date.now()
      };
      setDoctors(prev => [...prev, newDoctor]);
      setError(null);
      return newDoctor;
    } catch (err) {
      setError('Failed to add doctor');
      console.error('Error adding doctor:', err);
    }
    setLoading(false);
  };

  const deleteDoctor = async (id) => {
    setLoading(true);
    try {
      setDoctors(prev => prev.filter(doctor => doctor.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete doctor');
      console.error('Error deleting doctor:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return {
    doctors,
    loading,
    error,
    fetchDoctors,
    addDoctor,
    deleteDoctor
  };
};
