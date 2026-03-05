import React, { useState, useEffect, useMemo } from 'react';
import { employeeService, attendanceService } from '../api';
import { Search, Calendar as CalendarIcon, Trash2, TrendingUp, CheckCircle, XCircle } from 'lucide-react';
import { AttendanceSkeleton } from '../components/LoadingSkeleton';
import '../styles/Attendance.css';
import { toast } from 'react-hot-toast';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [dailyRecords, setDailyRecords] = useState({});
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

  useEffect(() => {
    fetchDailyRecords();
  }, [date]);

  const fetchEmployees = async () => {
    try {
      setInitialLoading(true);
      const res = await employeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setInitialLoading(false);
    }
  };

  const fetchDailyRecords = async () => {
    try {
      const res = await attendanceService.getByDate(date);
      const recordsMap = {};
      res.data.forEach(rec => {
        recordsMap[rec.employee_id] = rec.status;
      });
      setDailyRecords(recordsMap);
    } catch (err) {
      console.error('Failed to fetch daily records:', err);
    }
  };

  const handleMark = async (empId, status) => {
    setMessage('');
    setError('');
    try {
      await attendanceService.mark({ employee_id: empId, date, status });
      toast.success(`Marked as ${status}`);
      fetchDailyRecords();
      if (selectedEmp?.employee_id === empId) fetchHistory(selectedEmp);
    } catch (err) {
      const errorMsg = err.response?.data?.non_field_errors?.[0] || 
                       err.response?.data?.detail || 
                       err.response?.data?.error ||
                       'Failed to mark attendance.';
      toast.error(errorMsg);
    }
  };

  const fetchHistory = async (emp) => {
    setLoading(true);
    setSelectedEmp(emp);
    try {
      const res = await attendanceService.getByEmployee(emp.employee_id);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRecord = async (recDate) => {
    if (!selectedEmp) return;
    if (!window.confirm(`Remove attendance for ${recDate}?`)) return;

    try {
      await attendanceService.deleteRecord(selectedEmp.employee_id, recDate);
      toast.success('Record removed');
      fetchHistory(selectedEmp);
      if (recDate === date) fetchDailyRecords();
    } catch (err) {
      toast.error('Failed to delete record');
    }
  };

  const stats = useMemo(() => {
    if (!history.length) return null;
    const present = history.filter(h => h.status === 'Present').length;
    const absent = history.filter(h => h.status === 'Absent').length;
    const percentage = ((present / history.length) * 100).toFixed(1);
    return { present, absent, total: history.length, percentage };
  }, [history]);

  if (initialLoading) return <AttendanceSkeleton />;

  return (
    <div className="animate-up attendance-container">
      <header className="page-header attendance-header">
        <h2 className="page-title">Attendance Tracker</h2>
        <p className="attendance-subheader">Track team presence and historical engagement</p>
      </header>

      <div className="attendance-grid attendance-grid-layout">
        <div className="card-premium main-registration-card">
          <div className="attendance-controls">
             <div className="date-input-wrapper-full">
               <CalendarIcon size={20} className="date-icon" />
               <input type="date" className="input-premium date-input" value={date} onChange={e => setDate(e.target.value)} />
             </div>
          </div>

          <div className="employee-list-wrapper">
            {employees.length === 0 ? (
              <div className="empty-search">No team members found.</div>
            ) : employees.map(emp => (
              <div key={emp.employee_id} className={`attendance-item hover:shadow-md ${selectedEmp?.employee_id === emp.employee_id ? 'selected-emp' : ''}`}>
                <div className="employee-info-clickable" onClick={() => fetchHistory(emp)}>
                  <p className="employee-name">{emp.full_name}</p>
                  <p className="employee-meta">{emp.employee_id} • {emp.department}</p>
                </div>
                <div className="attendance-actions attendance-actions-wrapper">
                  <button 
                    className={`btn ${dailyRecords[emp.employee_id] === 'Present' ? 'btn-primary' : 'btn-present'}`} 
                    onClick={() => handleMark(emp.employee_id, 'Present')}
                  >
                    Present
                  </button>
                  <button 
                    className={`btn ${dailyRecords[emp.employee_id] === 'Absent' ? 'btn-danger' : 'btn-absent'}`} 
                    onClick={() => handleMark(emp.employee_id, 'Absent')}
                  >
                    Absent
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium attendance-sidebar attendance-sidebar-card">
          <div className="sidebar-header">
            <CalendarIcon size={24} className="sidebar-icon" />
            <h3 className="sidebar-title">History {selectedEmp && <span className="employee-id-cell">({selectedEmp.employee_id})</span>}</h3>
          </div>
          
          {!selectedEmp ? (
            <div className="sidebar-empty-state">
              <Search size={48} className="empty-icon" />
              <p className="empty-text">Select a team member to view their attendance history.</p>
            </div>
          ) : loading ? (
            <div className="history-loading">Loading records...</div>
          ) : (
            <>
              {stats && (
                <div className="attendance-stats-grid">
                  <div className="stat-pill">
                    <CheckCircle size={16} className="text-success" />
                    <div className="stat-content">
                      <span className="stat-value">{stats.present}</span>
                      <span className="stat-label">Present</span>
                    </div>
                  </div>
                  <div className="stat-pill">
                    <XCircle size={16} className="text-danger" />
                    <div className="stat-content">
                      <span className="stat-value">{stats.absent}</span>
                      <span className="stat-label">Absent</span>
                    </div>
                  </div>
                  <div className="stat-pill">
                    <TrendingUp size={16} className="text-primary" />
                    <div className="stat-content">
                      <span className="stat-value">{stats.percentage}%</span>
                      <span className="stat-label">Ratio</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="history-list">
                {history.length === 0 ? (
                  <p className="history-empty">No records found for this member.</p>
                ) : history.map((rec, i) => (
                  <div key={i} className="history-item">
                     <div className="history-info">
                       <span className="history-date">{new Date(rec.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                       <span className={`badge badge-${rec.status.toLowerCase()}`}>{rec.status}</span>
                     </div>
                     <button className="btn-icon-delete" onClick={() => handleDeleteRecord(rec.date)}>
                       <Trash2 size={16} />
                     </button>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
