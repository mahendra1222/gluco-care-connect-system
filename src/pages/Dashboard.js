
import React from 'react';
import DashboardStats from '../components/Dashboard/DashboardStats';
import { usePatients } from '../hooks/usePatients';
import { useBranches } from '../hooks/useBranches';
import { useDoctors } from '../hooks/useDoctors';
import { useReferrals } from '../hooks/useReferrals';

const Dashboard = () => {
  const { patients, loading: patientsLoading } = usePatients();
  const { branches, loading: branchesLoading } = useBranches();
  const { doctors, loading: doctorsLoading } = useDoctors();
  const { referrals, loading: referralsLoading } = useReferrals();

  const loading = patientsLoading || branchesLoading || doctorsLoading || referralsLoading;

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
      </div>
    );
  }

  const recentPatients = patients
    .sort((a, b) => new Date(b.registrationDate) - new Date(a.registrationDate))
    .slice(0, 5);

  const activeReferrals = referrals.filter(r => r.status === 'active');

  return (
    <div className="dashboard">
      <div className="dashboard__content">
        <main className="dashboard__main">
          <div className="dashboard__page-header">
            <h1>Healthcare Dashboard</h1>
            <p>Welcome to NDC Diabetic Healthcare Management System</p>
          </div>

          <DashboardStats 
            patients={patients}
            branches={branches}
            doctors={doctors}
            referrals={referrals}
          />

          <div className="dashboard__content-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '2rem' }}>
            {/* Recent Patients */}
            <div className="table-container">
              <div className="table-container__header">
                <h3>Recent Patients</h3>
                <a href="/patients" className="btn primary">View All</a>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Registration</th>
                  </tr>
                </thead>
                <tbody>
                  {recentPatients.map(patient => (
                    <tr key={patient.id}>
                      <td>
                        <strong>{patient.firstName} {patient.lastName}</strong>
                        <br />
                        <small>{patient.mobile}</small>
                      </td>
                      <td>
                        <span className={`badge ${patient.diabetesType === 'Type 1' ? 'active' : 'pending'}`}>
                          {patient.diabetesType}
                        </span>
                      </td>
                      <td>
                        <span className={`badge ${patient.registrationType}`}>
                          {patient.registrationType}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Active Referrals */}
            <div className="table-container">
              <div className="table-container__header">
                <h3>Active Referrals</h3>
                <a href="/referrals" className="btn primary">View All</a>
              </div>
              <table>
                <thead>
                  <tr>
                    <th>Patient</th>
                    <th>Doctor</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {activeReferrals.slice(0, 5).map(referral => {
                    const patient = patients.find(p => p.id === referral.patientId);
                    const doctor = doctors.find(d => d.id === referral.doctorId);
                    return (
                      <tr key={referral.id}>
                        <td>
                          <strong>{patient?.firstName} {patient?.lastName}</strong>
                        </td>
                        <td>{doctor?.name}</td>
                        <td>
                          <span className="badge active">Active</span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
