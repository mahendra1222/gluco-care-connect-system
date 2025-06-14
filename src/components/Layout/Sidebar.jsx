
import React, { useState } from 'react';
import { 
  Home, 
  Users, 
  UserPlus, 
  Building2, 
  Stethoscope, 
  FileText,
  ChevronLeft,
  Activity,
  Calendar,
  Settings
} from 'lucide-react';

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeItem, setActiveItem] = useState('dashboard');

  const menuItems = [
    {
      section: 'Main',
      items: [
        { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
        { id: 'activity', label: 'Activity', icon: Activity, href: '/activity' },
      ]
    },
    {
      section: 'Patients',
      items: [
        { id: 'patients', label: 'All Patients', icon: Users, href: '/patients' },
        { id: 'register-online', label: 'Online Registration', icon: UserPlus, href: '/patients/register-online' },
        { id: 'register-offline', label: 'Offline Registration', icon: UserPlus, href: '/patients/register-offline' },
      ]
    },
    {
      section: 'Management',
      items: [
        { id: 'referrals', label: 'Referrals', icon: FileText, href: '/referrals' },
        { id: 'branches', label: 'Branches', icon: Building2, href: '/branches' },
        { id: 'doctors', label: 'Doctors', icon: Stethoscope, href: '/doctors' },
      ]
    },
    {
      section: 'System',
      items: [
        { id: 'appointments', label: 'Appointments', icon: Calendar, href: '/appointments' },
        { id: 'settings', label: 'Settings', icon: Settings, href: '/settings' },
      ]
    }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="sidebar__header">
        <h2>Menu</h2>
        <button 
          className="toggle-btn"
          onClick={() => setCollapsed(!collapsed)}
        >
          <ChevronLeft size={20} />
        </button>
      </div>

      <nav className="sidebar__menu">
        {menuItems.map((section) => (
          <div key={section.section} className="sidebar__menu-section">
            <div className="sidebar__menu-section-title">
              {section.section}
            </div>
            <ul className="sidebar__menu-section-items">
              {section.items.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id} className="sidebar__menu-item">
                    <a
                      href={item.href}
                      className={activeItem === item.id ? 'active' : ''}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveItem(item.id);
                      }}
                    >
                      <Icon className="icon" size={20} />
                      <span className="text">{item.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;
