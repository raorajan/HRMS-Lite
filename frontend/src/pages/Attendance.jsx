import React, { useState, useEffect } from 'react';
import { employeeService, attendanceService } from '../api';
import { Search, Calendar as CalendarIcon } from 'lucide-react';
import { AttendanceSkeleton } from '../components/LoadingSkeleton';

const Attendance = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [history, setHistory] = useState([]);
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchEmployees();
  }, []);

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

  const handleMark = async (empId, status) => {
    setMessage('');
    setError('');
    try {
      await attendanceService.mark({ employee_id: empId, date, status });
      setMessage(`Marked ${empId} as ${status}`);
      if (selectedEmp === empId) fetchHistory(empId);
    } catch (err) {
      const errorMsg = err.response?.data?.non_field_errors?.[0] || 
                       err.response?.data?.detail || 
                       'Failed to mark attendance. Please try again.';
      setError(errorMsg);
    }
  };

  const fetchHistory = async (empId) => {
    setLoading(true);
    setSelectedEmp(empId);
    try {
      const res = await attendanceService.getByEmployee(empId);
      setHistory(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) return <AttendanceSkeleton />;

  return (
    <div className="animate-up" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <header className="page-header" style={{ flexShrink: 0, marginBottom: '1.5rem' }}>
        <h2 className="page-title">Attendance Tracker</h2>
        <p style={{ color: 'var(--text-secondary)' }}>Track team presence and historical engagement</p>
      </header>

      <div className="attendance-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '1.5rem', flex: 1, overflow: 'hidden' }}>
        <div className="card-premium">
          <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'center' }}>
             <div style={{ background: 'var(--bg-app)', padding: '0.75rem', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '0.5rem', flex: 1 }}>
               <CalendarIcon size={20} style={{ color: 'var(--primary)' }} />
               <input type="date" className="input-premium" style={{ background: 'transparent', padding: 0, border: 'none' }} value={date} onChange={e => setDate(e.target.value)} />
             </div>
          </div>
          
          {message && <p style={{ color: '#166534', marginBottom: '1rem', fontWeight: 600, padding: '0.75rem', background: '#dcfce7', borderRadius: '8px', border: '1px solid #86efac' }}>{message}</p>}
                    {error && <p style={{ color: '#991b1b', marginBottom: '1rem', fontWeight: 600, padding: '0.75rem', background: '#fee2e2', borderRadius: '8px', border: '1px solid #fca5a5' }}>{error}</p>}

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {employees.map(emp => (
              <div key={emp.employee_id} style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                padding: '1.25rem', border: '1px solid var(--border-light)', borderRadius: 'var(--radius-md)',
                transition: 'var(--transition)'
              }} className="hover:shadow-md">
                <div style={{ cursor: 'pointer' }} onClick={() => fetchHistory(emp.employee_id)}>
                  <p style={{ fontWeight: 700, fontSize: '1.1rem' }}>{emp.full_name}</p>
                  <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>{emp.employee_id} • {emp.department}</p>
                </div>
                <div className="attendance-actions" style={{ display: 'flex', gap: '0.75rem' }}>
                  <button className="btn" style={{ background: '#dcfce7', color: '#166534', minWidth: '100px', justifyContent: 'center' }} onClick={() => handleMark(emp.employee_id, 'Present')}>Present</button>
                  <button className="btn" style={{ background: '#fee2e2', color: '#991b1b', minWidth: '100px', justifyContent: 'center' }} onClick={() => handleMark(emp.employee_id, 'Absent')}>Absent</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card-premium attendance-sidebar" style={{ height: 'fit-content', position: 'sticky', top: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid var(--border-light)' }}>
            <CalendarIcon size={24} style={{ color: 'var(--secondary)' }} />
            <h3 style={{ fontSize: '1.25rem' }}>History {selectedEmp && <span style={{ color: 'var(--primary)' }}>({selectedEmp})</span>}</h3>
          </div>
          
          {!selectedEmp ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <Search size={48} style={{ color: 'var(--border-subtle)', marginBottom: '1rem' }} />
              <p style={{ color: 'var(--text-secondary)' }}>Select a team member to view their attendance history.</p>
            </div>
          ) : loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Loading records...</div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {history.length === 0 ? (
                <p style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '2rem' }}>No records found for this member.</p>
              ) : history.map((rec, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', background: '#f8fafc', borderRadius: '8px' }}>
                   <span style={{ fontWeight: 500 }}>{rec.date}</span>
                   <span className={`badge badge-${rec.status.toLowerCase()}`}>{rec.status}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Attendance;
