import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, Calendar, LayoutDashboard, UserPlus } from 'lucide-react';
import '../styles/Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar-glass">
      <h1 className="navbar-logo-text">HRMS <span className="navbar-logo-span">Lite</span></h1>
      
      <div className="navbar-nav-links">
        <NavLink to="/" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
          <Users size={20} /> Employees
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `navbar-link ${isActive ? 'active' : ''}`}>
          <Calendar size={20} /> Attendance
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;
