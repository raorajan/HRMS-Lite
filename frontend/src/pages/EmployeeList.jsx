import React, { useState, useEffect } from 'react';
import { employeeService } from '../api';
import { Trash2, UserPlus, X } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { TableSkeleton } from '../components/LoadingSkeleton';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ employee_id: '', full_name: '', email: '', department: '' });
  const [loading, setLoading] = useState(true);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate department is selected
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
    <div className="animate-up" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexShrink: 0 }}>
        <h2 className="page-title" style={{ marginBottom: 0 }}>Team Directory</h2>
        <button className="btn btn-primary" style={{ padding: '0.875rem 1.5rem', borderRadius: 'var(--radius-md)' }} onClick={() => setShowModal(true)}>
          <UserPlus size={20} /> Add Member
        </button>
      </div>

      {loading ? (
        <TableSkeleton rows={3} />
      ) : (
      <div className="card-premium" style={{ padding: '0', flex: 1, overflow: 'auto' }}>
        <table className="table-premium" style={{ width: '100%', margin: 0 }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Department</th>
              <th style={{ textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {employees.length === 0 ? (
              <tr><td colSpan="5" style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>No members found in the directory.</td></tr>
            ) : (
              employees.map(emp => (
                <tr key={emp.employee_id}>
                  <td style={{ fontWeight: 700, color: 'var(--primary)' }}># {emp.employee_id}</td>
                  <td style={{ fontWeight: 600 }}>{emp.full_name}</td>
                  <td style={{ color: 'var(--text-secondary)' }}>{emp.email}</td>
                  <td>
                    <span className="badge" style={{ background: 'var(--bg-app)', color: 'var(--text-primary)', border: '1px solid var(--border-subtle)' }}>
                      {emp.department}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right' }}>
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
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(15, 23, 42, 0.6)', backdropFilter: 'blur(8px)',
          display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000
        }}>
          <div className="card-premium animate-up" style={{ width: '100%', maxWidth: '500px', padding: '2.5rem',marginTop:'2rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.5rem' }}>New Team Member</h3>
              <button onClick={() => setShowModal(false)} style={{ color: 'var(--text-muted)' }}><X size={24} /></button>
            </div>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gap: '1.25rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Employee ID</label>
                  <input required className="input-premium" placeholder="e.g. EMP-101" value={formData.employee_id} onChange={e => setFormData({...formData, employee_id: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Full Name</label>
                  <input required className="input-premium" placeholder="John Doe" value={formData.full_name} onChange={e => setFormData({...formData, full_name: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Official Email</label>
                  <input required type="email" className="input-premium" placeholder="john@company.com" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: 600, marginBottom: '0.5rem', color: 'var(--text-secondary)' }}>Department</label>
                  <select className="input-premium" value={formData.department} onChange={e => setFormData({...formData, department: e.target.value})}>
                    <option value="">Choose department...</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Product">Product</option>
                    <option value="HR">HR</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Sales">Sales</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary" style={{ justifyContent: 'center', padding: '1rem', marginTop: '1rem' }}>Assign Member</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmployeeList;
