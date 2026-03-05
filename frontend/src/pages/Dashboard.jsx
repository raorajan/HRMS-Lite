import React, { useEffect, useState } from 'react';
import { attendanceService } from '../api';
import { Users, CheckCircle, TrendingUp } from 'lucide-react';
import { DashboardSkeleton } from '../components/LoadingSkeleton';
import '../styles/Dashboard.css';

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
    <div className="animate-up dashboard-container">
      <header className="page-header dashboard-header">
        <h2 className="page-title">Pulse Dashboard</h2>
        <p className="dashboard-subheader">Welcome back, Admin. Here's what's happening today.</p>
      </header>

      <div className="dashboard-grid dashboard-stats-grid">
        <div className="card-premium stat-card stat-card-total-employees">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper icon-employees">
              <Users size={28} />
            </div>
            <span className="stat-trend">+4% from last month</span>
          </div>
          <p className="stat-label">Total Employees</p>
          <h3 className="stat-value">{stats.total_employees}</h3>
        </div>

        <div className="card-premium stat-card stat-card-attendance-records">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper icon-attendance">
              <CheckCircle size={28} />
            </div>
            <span className="stat-meta">Live Tracker</span>
          </div>
          <p className="stat-label">Attendance Records</p>
          <h3 className="stat-value">{stats.total_attendance_records}</h3>
        </div>

        <div className="card-premium stat-card stat-card-engagement-rate">
          <div className="stat-card-header">
            <div className="stat-icon-wrapper icon-engagement">
              <TrendingUp size={28} />
            </div>
            <span className="stat-meta-muted">Calculated weekly</span>
          </div>
          <p className="stat-label">Engagement Rate</p>
          <h3 className="stat-value">94.2%</h3>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
