
import { useState, useEffect } from 'react';
import { patientAPI } from '../services/apiService';
import { dummyPatients } from '../data/dummyData';

export const usePatients = () => {
  const [patients, setPatients] = useState(dummyPatients);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPatients = async () => {
    setLoading(true);
    try {
      // In development, use dummy data
      // const response = await patientAPI.getAllPatients();
      // setPatients(response.data);
      setPatients(dummyPatients);
      setError(null);
    } catch (err) {
      setError('Failed to fetch patients');
      console.error('Error fetching patients:', err);
    }
    setLoading(false);
  };

  const registerPatient = async (patientData, isOnline = true) => {
    setLoading(true);
    try {
      const newPatient = {
        ...patientData,
        id: Date.now(),
        registrationType: isOnline ? 'online' : 'offline',
        registrationDate: new Date().toISOString().split('T')[0]
      };
      
      // In development, add to dummy data
      setPatients(prev => [...prev, newPatient]);
      
      // In production, use API
      // const response = isOnline 
      //   ? await patientAPI.onlineRegister(patientData)
      //   : await patientAPI.offlineRegister(patientData);
      
      setError(null);
      return newPatient;
    } catch (err) {
      setError('Failed to register patient');
      console.error('Error registering patient:', err);
    }
    setLoading(false);
  };

  const updatePatient = async (id, patientData) => {
    setLoading(true);
    try {
      setPatients(prev => 
        prev.map(patient => 
          patient.id === id ? { ...patient, ...patientData } : patient
        )
      );
      setError(null);
    } catch (err) {
      setError('Failed to update patient');
      console.error('Error updating patient:', err);
    }
    setLoading(false);
  };

  const deletePatient = async (id) => {
    setLoading(true);
    try {
      setPatients(prev => prev.filter(patient => patient.id !== id));
      setError(null);
    } catch (err) {
      setError('Failed to delete patient');
      console.error('Error deleting patient:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return {
    patients,
    loading,
    error,
    fetchPatients,
    registerPatient,
    updatePatient,
    deletePatient
  };
};
