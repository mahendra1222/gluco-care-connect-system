
import React, { useState } from 'react';
import PatientList from '../components/Patients/PatientList';
import PatientRegistration from '../components/Patients/PatientRegistration';
import { usePatients } from '../hooks/usePatients';
import { Plus, ArrowLeft } from 'lucide-react';

const Patients = () => {
  const { patients, loading, registerPatient, updatePatient, deletePatient } = usePatients();
  const [view, setView] = useState('list'); // 'list', 'register-online', 'register-offline'
  const [selectedPatient, setSelectedPatient] = useState(null);

  const handleRegisterPatient = async (patientData) => {
    const isOnline = view === 'register-online';
    try {
      await registerPatient(patientData, isOnline);
      setView('list');
      alert('Patient registered successfully!');
    } catch (error) {
      alert('Failed to register patient');
    }
  };

  const handleDeletePatient = async (patientId) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      try {
        await deletePatient(patientId);
        alert('Patient deleted successfully!');
      } catch (error) {
        alert('Failed to delete patient');
      }
    }
  };

  const handleViewPatient = (patient) => {
    setSelectedPatient(patient);
    // Could open a modal or navigate to detail view
    alert(`Viewing patient: ${patient.firstName} ${patient.lastName}`);
  };

  const handleEditPatient = (patient) => {
    setSelectedPatient(patient);
    // Could open edit form
    alert(`Editing patient: ${patient.firstName} ${patient.lastName}`);
  };

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <main className="dashboard__main">
          <div className="dashboard__page-header">
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              {view !== 'list' && (
                <button 
                  className="btn secondary"
                  onClick={() => setView('list')}
                >
                  <ArrowLeft size={20} />
                  Back to List
                </button>
              )}
              <div>
                <h1>
                  {view === 'list' && 'Patient Management'}
                  {view === 'register-online' && 'Online Patient Registration'}
                  {view === 'register-offline' && 'Offline Patient Registration'}
                </h1>
                <p>
                  {view === 'list' && 'Manage all patient records and registrations'}
                  {view === 'register-online' && 'Patient self-registration form'}
                  {view === 'register-offline' && 'Staff registration for walk-in patients'}
                </p>
              </div>
            </div>
            
            {view === 'list' && (
              <div style={{ display: 'flex', gap: '1rem' }}>
                <button 
                  className="btn primary"
                  onClick={() => setView('register-online')}
                >
                  <Plus size={20} />
                  Online Registration
                </button>
                <button 
                  className="btn secondary"
                  onClick={() => setView('register-offline')}
                >
                  <Plus size={20} />
                  Offline Registration
                </button>
              </div>
            )}
          </div>

          {view === 'list' && (
            <PatientList
              patients={patients}
              loading={loading}
              onView={handleViewPatient}
              onEdit={handleEditPatient}
              onDelete={handleDeletePatient}
            />
          )}

          {(view === 'register-online' || view === 'register-offline') && (
            <PatientRegistration
              onSubmit={handleRegisterPatient}
              isOnline={view === 'register-online'}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Patients;
