
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Layout/Header.jsx';
import Sidebar from './components/Layout/Sidebar';
import Dashboard from './pages/Dashboard.jsx';
import Patients from './pages/Patients';
import Referrals from './pages/Referrals';
import './styles/main.scss';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="dashboard">
          <Sidebar />
          <div className="dashboard__content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/patients" element={<Patients />} />
              <Route path="/patients/register-online" element={<Patients />} />
              <Route path="/patients/register-offline" element={<Patients />} />
              <Route path="/referrals" element={<Referrals />} />
              <Route path="/branches" element={<div className="dashboard__main"><h1>Branches Management</h1><p>Coming Soon...</p></div>} />
              <Route path="/doctors" element={<div className="dashboard__main"><h1>Doctors Management</h1><p>Coming Soon...</p></div>} />
              <Route path="/appointments" element={<div className="dashboard__main"><h1>Appointments</h1><p>Coming Soon...</p></div>} />
              <Route path="/settings" element={<div className="dashboard__main"><h1>Settings</h1><p>Coming Soon...</p></div>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App;
