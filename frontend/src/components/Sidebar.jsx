import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  Users, 
  Calendar, 
  LayoutDashboard, 
  UserPlus, 
  Settings,
  HelpCircle,
  LogOut
} from 'lucide-react';

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <LayoutDashboard size={32} />
        <div>HRMS<span>Lite</span></div>
      </div>
      
      <div style={{ flex: 1 }}>
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <LayoutDashboard size={20} /> Dashboard
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Users size={20} /> Employees
        </NavLink>
        <NavLink to="/attendance" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <Calendar size={20} /> Attendance
        </NavLink>
      </div>

      <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem' }}>
        <div className="nav-item" style={{ cursor: 'pointer' }}>
          <Settings size={20} /> Settings
        </div>
        <div className="nav-item" style={{ cursor: 'pointer', color: '#fca5a5' }}>
          <LogOut size={20} /> Logout
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
