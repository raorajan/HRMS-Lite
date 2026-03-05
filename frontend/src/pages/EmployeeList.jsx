import React, { useState, useEffect } from 'react';
import { employeeService, attendanceService } from '../api';
import { Trash2, UserPlus, X, Calendar } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TableSkeleton } from '../components/LoadingSkeleton';
import '../styles/EmployeeList.css';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showHistoryModal, setShowHistoryModal] = useState(false);
  const [selectedEmp, setSelectedEmp] = useState(null);
  const [attendanceHistory, setAttendanceHistory] = useState([]);
  const [formData, setFormData] = useState({ employee_id: '', full_name: '', email: '', department: '' });
  const [loading, setLoading] = useState(true);
  const [historyLoading, setHistoryLoading] = useState(false);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const res = await employeeService.getAll();
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await employeeService.delete(id);
        toast.success('Employee deleted successfully');
        fetchEmployees();
      } catch (err) {
        toast.error('Failed to delete employee');
        console.error(err);
      }
    }
  };

  const handleShowHistory = async (emp) => {
    setSelectedEmp(emp);
    setShowHistoryModal(true);
    setHistoryLoading(true);
    try {
      const res = await attendanceService.getByEmployee(emp.employee_id);
      setAttendanceHistory(res.data);
    } catch (err) {
      toast.error('Failed to fetch attendance history');
      console.error(err);
    } finally {
      setHistoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.department) {
      toast.error('Please select a department.');
      return;
    }
    
    try {
      await employeeService.create(formData);
      toast.success('Employee added successfully');
      setShowModal(false);
      setFormData({ employee_id: '', full_name: '', email: '', department: '' });
      fetchEmployees();
    } catch (err) {
      if (err.response && err.response.data) {
        toast.error(Object.values(err.response.data).join(' '));
      } else {
        toast.error('Failed to add employee.');
      }
    }
  };

  return (
    <div className="animate-up employee-list-container">
      <div className="employee-list-header">
        <h2 className="page-title employee-list-title">Team Directory</h2>
        <button className="btn btn-primary btn-add-member" onClick={() => setShowModal(true)}>
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      {loading ? (
        <TableSkeleton rows={3} />
      ) : (
      <div className="card-premium employee-table-container">
        <table className="table-premium employee-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="5" className="empty-state">No members found in the directory.</td></tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.employee_id}>
                  <td className="employee-id-cell"># {emp.employee_id}</td>
                  <td className="employee-name-cell">{emp.full_name}</td>
                  <td className="employee-email-cell">{emp.email}</td>
                  <td>
                    <span className="badge employee-dept-badge">
                      {emp.department}
                    </span>
                  </td>
                  <td className="text-right">
                    <button className="btn btn-primary btn-history" title="View Attendance History" onClick={() => handleShowHistory(emp)}>
                      <Calendar size={18} />
                    </button>
                    <button className="btn btn-danger" title="Delete record" onClick={() => handleDelete(emp.employee_id)}>
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      )}

      {showModal && (
        <div className="modal-overlay-custom">
          <div className="card-premium animate-up modal-card-custom">
            <div className="modal-header-custom">
              <h3 className="modal-title-custom">New Team Member</h3>
              <button onClick={() => setShowModal(false)} className="modal-close-btn"><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="form-grid-custom">
                <div>
                  <label className="form-label-custom">Employee ID</label>
                  <input required className="input-premium" placeholder="e.g. EMP-101" value={formData.employee_id} onChange={e => setFormData({...formData, employee_id: e.target.value})} />
                </div>
                <div>
                  <label className="form-label-custom">Full Name</label>
                  <input required className="input-premium" placeholder="John Doe" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                </div>
                <div>
                  <label className="form-label-custom">Official Email</label>
                  <input required type="email" className="input-premium" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label className="form-label-custom">Department</label>
                  <select className="input-premium" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option value="">Choose department...</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-submit-member">Assign Member</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showHistoryModal && selectedEmp && (
        <div className="modal-overlay-custom">
          <div className="card-premium animate-up modal-card-custom">
            <div className="modal-header-custom">
              <h3 className="modal-title-custom">Attendance History: {selectedEmp.full_name}</h3>
              <button onClick={() => setShowHistoryModal(false)} className="modal-close-btn"><X size={24} /></button>
            </div>
            
            {historyLoading ? (
              <div className="history-modal-loading">Loading records...</div>
            ) : (
              <div className="history-modal-list">
                {attendanceHistory.length === 0 ? (
                  <p className="history-empty">No records found for this member.</p>
                ) : attendanceHistory.map((rec, i) => (
                  <div key={i} className="history-item">
                    <span className="history-date">{rec.date}</span>
                    <span className={`badge badge-${rec.status.toLowerCase()}`}>{rec.status}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
