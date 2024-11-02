// src/components/Sidebar.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaBriefcase, FaStar, FaCog, FaBars } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => setCollapsed(!collapsed);

  return (
    <div 
      className={`d-flex flex-column ${collapsed ? 'p-3' : 'p-4'} vh-100`} 
      style={{
        width: collapsed ? '80px' : '200px',
        backgroundColor: '#d3d3d3', // Slightly darker grey background
        transition: 'width 0.3s'
      }}
    >
      <button className="btn btn-light mb-4" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <FaBars />
      </button>
      <nav className="nav flex-column">
        <a href="#home" className="nav-link text-dark d-flex align-items-center">
          <FaHome className="me-2" />
          {!collapsed && <span>Home</span>}
        </a>
        <a href="#past-jobs" className="nav-link text-dark d-flex align-items-center">
          <FaBriefcase className="me-2" />
          {!collapsed && <span>Past Jobs</span>}
        </a>
        <a href="#reviews" className="nav-link text-dark d-flex align-items-center">
          <FaStar className="me-2" />
          {!collapsed && <span>Reviews</span>}
        </a>
        <a href="#settings" className="nav-link text-dark d-flex align-items-center">
          <FaCog className="me-2" />
          {!collapsed && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
