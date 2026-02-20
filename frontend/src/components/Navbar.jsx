import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, LayoutDashboard, UserPlus } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="glass" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      padding: '1rem 2rem',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2rem'
    }}>
      <h1 style={{ fontWeight: 800, fontSize: '1.5rem', color: 'var(--primary)' }}>HRMS <span style={{ color: 'var(--text-main)' }}>Lite</span></h1>
      
      <div style={{ display: 'flex', gap: '2rem' }}>
        <NavLink to="/" style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          color: isActive ? 'var(--primary)' : 'var(--text-muted)'
        })}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/employees" style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          color: isActive ? 'var(--primary)' : 'var(--text-muted)'
        })}>
          <Users size={20} /> Employees
        </NavLink>
        <NavLink to="/attendance" style={({ isActive }) => ({
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontWeight: 600,
          color: isActive ? 'var(--primary)' : 'var(--text-muted)'
        })}>
          <Calendar size={20} /> Attendance
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
