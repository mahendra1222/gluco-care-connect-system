
import React, { useState } from 'react';
import Header from '../components/Layout/Header.jsx';
import Sidebar from '../components/Layout/Sidebar.jsx';
import Dashboard from './Dashboard.jsx';
import Patients from './Patients.jsx';
import Referrals from './Referrals.jsx';
import { useLocation } from 'react-router-dom';
import '../styles/main.scss';

const Index = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const renderContent = () => {
    switch (location.pathname) {
      case '/':
        return <Dashboard />;
      case '/patients':
      case '/patients/register-online':
      case '/patients/register-offline':
        return <Patients />;
      case '/referrals':
        return <Referrals />;
      case '/branches':
        return <div className="dashboard__main"><h1>Branches Management</h1><p>Coming Soon...</p></div>;
      case '/doctors':
        return <div className="dashboard__main"><h1>Doctors Management</h1><p>Coming Soon...</p></div>;
      case '/appointments':
        return <div className="dashboard__main"><h1>Appointments</h1><p>Coming Soon...</p></div>;
      case '/settings':
        return <div className="dashboard__main"><h1>Settings</h1><p>Coming Soon...</p></div>;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="App">
      <Header />
      <div className="dashboard">
        <Sidebar />
        <div className="dashboard__content">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default Index;
