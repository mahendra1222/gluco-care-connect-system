
import React from 'react';
import { Users, Building2, Stethoscope, FileText, TrendingUp, TrendingDown } from 'lucide-react';

const DashboardStats = ({ patients, branches, doctors, referrals }) => {
  const stats = [
    {
      title: 'Total Patients',
      value: patients?.length || 0,
      change: '+12%',
      changeType: 'positive',
      icon: 'patients'
    },
    {
      title: 'Active Branches',
      value: branches?.length || 0,
      change: '+5%',
      changeType: 'positive',
      icon: 'branches'
    },
    {
      title: 'External Doctors',
      value: doctors?.length || 0,
      change: '+8%',
      changeType: 'positive',
      icon: 'doctors'
    },
    {
      title: 'Active Referrals',
      value: referrals?.filter(r => r.status === 'active').length || 0,
      change: '-3%',
      changeType: 'negative',
      icon: 'referrals'
    }
  ];

  const getIcon = (iconType) => {
    const icons = {
      patients: Users,
      branches: Building2,
      doctors: Stethoscope,
      referrals: FileText
    };
    const Icon = icons[iconType];
    return <Icon size={24} />;
  };

  return (
    <div className="dashboard__stats">
      {stats.map((stat, index) => (
        <div key={index} className="dashboard__stat-card">
          <div className="dashboard__stat-card-header">
            <div className={`icon ${stat.icon}`}>
              {getIcon(stat.icon)}
            </div>
          </div>
          <h3 className="dashboard__stat-card-title">{stat.title}</h3>
          <div className="dashboard__stat-card-value">{stat.value}</div>
          <div className={`dashboard__stat-card-change ${stat.changeType}`}>
            {stat.changeType === 'positive' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {stat.change} from last month
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardStats;
