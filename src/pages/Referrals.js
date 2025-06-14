
import React, { useState } from 'react';
import ReferralForm from '../components/Referrals/ReferralForm';
import { useReferrals } from '../hooks/useReferrals';
import { usePatients } from '../hooks/usePatients';
import { useDoctors } from '../hooks/useDoctors';
import { Plus, ArrowLeft, Search, Eye, Trash2 } from 'lucide-react';

const Referrals = () => {
  const { referrals, loading, createReferral, deleteReferral } = useReferrals();
  const { patients } = usePatients();
  const { doctors } = useDoctors();
  const [view, setView] = useState('list'); // 'list', 'create'
  const [searchTerm, setSearchTerm] = useState('');

  const handleCreateReferral = async (referralData) => {
    try {
      await createReferral(referralData);
      setView('list');
      alert('Referral created successfully!');
    } catch (error) {
      alert('Failed to create referral');
    }
  };

  const handleDeleteReferral = async (referralId) => {
    if (window.confirm('Are you sure you want to delete this referral?')) {
      try {
        await deleteReferral(referralId);
        alert('Referral deleted successfully!');
      } catch (error) {
        alert('Failed to delete referral');
      }
    }
  };

  const getPatientName = (patientId) => {
    const patient = patients.find(p => p.id === patientId);
    return patient ? `${patient.firstName} ${patient.lastName}` : 'Unknown';
  };

  const getDoctorName = (doctorId) => {
    const doctor = doctors.find(d => d.id === doctorId);
    return doctor ? doctor.name : 'Unknown';
  };

  const filteredReferrals = referrals.filter(referral => {
    const patientName = getPatientName(referral.patientId).toLowerCase();
    const doctorName = getDoctorName(referral.doctorId).toLowerCase();
    const reason = referral.reason.toLowerCase();
    const search = searchTerm.toLowerCase();
    
    return patientName.includes(search) || 
           doctorName.includes(search) || 
           reason.includes(search);
  });

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

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
                  {view === 'list' ? 'Referral Management' : 'Create New Referral'}
                </h1>
                <p>
                  {view === 'list' 
                    ? 'Manage patient referrals from external doctors' 
                    : 'Register a new patient referral from an external doctor'
                  }
                </p>
              </div>
            </div>
            
            {view === 'list' && (
              <button 
                className="btn primary"
                onClick={() => setView('create')}
              >
                <Plus size={20} />
                Create Referral
              </button>
            )}
          </div>

          {view === 'list' && (
            <div className="table-container">
              <div className="table-container__header">
                <h3>Patient Referrals</h3>
                <div className="search">
                  <Search className="search-icon" size={16} />
                  <input
                    type="text"
                    placeholder="Search referrals..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>

              <table>
                <thead>
                  <tr>
                    <th>Referral ID</th>
                    <th>Patient</th>
                    <th>Referring Doctor</th>
                    <th>Reason</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReferrals.map(referral => (
                    <tr key={referral.id}>
                      <td>#{referral.id}</td>
                      <td>
                        <strong>{getPatientName(referral.patientId)}</strong>
                      </td>
                      <td>{getDoctorName(referral.doctorId)}</td>
                      <td>
                        <div style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {referral.reason}
                        </div>
                      </td>
                      <td>{new Date(referral.referralDate).toLocaleDateString()}</td>
                      <td>
                        <span className={`badge ${referral.status}`}>
                          {referral.status}
                        </span>
                      </td>
                      <td className="actions">
                        <button
                          className="btn-icon view"
                          title="View Details"
                          onClick={() => alert(`Viewing referral: ${referral.id}`)}
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          className="btn-icon delete"
                          title="Delete Referral"
                          onClick={() => handleDeleteReferral(referral.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {filteredReferrals.length === 0 && (
                <div style={{ padding: '2rem', textAlign: 'center', color: '#64748b' }}>
                  No referrals found matching your criteria.
                </div>
              )}
            </div>
          )}

          {view === 'create' && (
            <ReferralForm
              onSubmit={handleCreateReferral}
              loading={loading}
            />
          )}
        </main>
      </div>
    </div>
  );
};

export default Referrals;
