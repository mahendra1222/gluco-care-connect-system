
import React from 'react';
import { User, Bell, Settings } from 'lucide-react';

const Header = () => {
  return (
    <header className="header">
      <div className="header__container">
        <div className="header__logo">
          <div className="icon">🏥</div>
          <span>NDC Healthcare</span>
        </div>
        
        <nav className="header__nav">
          <a href="/" className="active">Dashboard</a>
          <a href="/patients">Patients</a>
          <a href="/referrals">Referrals</a>
          <a href="/branches">Branches</a>
          <a href="/doctors">Doctors</a>
        </nav>

        <div className="header__user">
          <button className="notification-btn">
            <Bell size={20} />
          </button>
          <button className="settings-btn">
            <Settings size={20} />
          </button>
          <div className="avatar">
            <User size={20} />
          </div>
          <span className="user-name">Dr. Admin</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
