import React, { useEffect, useState } from 'react';
import { attendanceService } from '../api';
import { Users, CheckCircle, TrendingUp } from 'lucide-react';
import { DashboardSkeleton } from '../components/LoadingSkeleton';

const Dashboard = () => {
  const [stats, setStats] = useState({ total_employees: 0, total_attendance_records: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    attendanceService.getSummary()
      .then(res => setStats(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="animate-up" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="page-header" style={{ flexShrink: 0, marginBottom: '1.5rem' }}>
        <h2 className="page-title">Pulse Dashboard</h2>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>Welcome back, Admin. Here's what's happening today.</p>
      </header>

      <div className="dashboard-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', flexShrink: 0 }}>
        <div className="card-premium" style={{ borderLeft: '6px solid var(--primary)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: 'var(--primary-glow)', borderRadius: '12px', color: 'var(--primary)' }}>
              <Users size={28} />
            </div>
            <span style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>+4% from last month</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Total Employees</p>
          <h3 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{stats.total_employees}</h3>
        </div>

        <div className="card-premium" style={{ borderLeft: '6px solid var(--success)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#dcfce7', borderRadius: '12px', color: 'var(--success)' }}>
              <CheckCircle size={28} />
            </div>
            <span style={{ color: 'var(--success)', fontSize: '0.875rem', fontWeight: 600 }}>Live Tracker</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Attendance Records</p>
          <h3 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>{stats.total_attendance_records}</h3>
        </div>

        <div className="card-premium" style={{ borderLeft: '6px solid var(--warning)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <div style={{ padding: '0.75rem', background: '#fef3c7', borderRadius: '12px', color: 'var(--warning)' }}>
              <TrendingUp size={28} />
            </div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.875rem' }}>Calculated weekly</span>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontWeight: 500 }}>Engagement Rate</p>
          <h3 style={{ fontSize: '2.5rem', marginTop: '0.5rem' }}>94.2%</h3>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
