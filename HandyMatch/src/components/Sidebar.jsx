// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaBriefcase, FaStar, FaCog, FaBars } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(true);
  const location = useLocation(); // Get the current route

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Helper function to determine active tab
  const isActive = (path) => {
    return location.pathname === path ? 'active-tab' : '';
  };

  return (
    <div
      className={`d-flex flex-column ${collapsed ? 'p-3' : 'p-4'} vh-100`}
      style={{
        width: collapsed ? '80px' : '200px',
        backgroundColor: '#d3d3d3', // Slightly darker grey background
        transition: 'width 0.3s',
      }}
    >
      <button className="btn btn-light mb-4" onClick={toggleSidebar} aria-label="Toggle Sidebar">
        <FaBars />
      </button>
      <nav className="nav flex-column">
        <a
          href="/professional-dashboard"
          className={`nav-link text-dark d-flex align-items-center ${isActive('/professional-dashboard')}`}
        >
          <FaHome className="me-2" />
          {!collapsed && <span>Home</span>}
        </a>
        <a
          href="/past-jobs"
          className={`nav-link text-dark d-flex align-items-center ${isActive('/past-jobs')}`}
        >
          <FaBriefcase className="me-2" />
          {!collapsed && <span>Past Jobs</span>}
        </a>
        <a
          href="/reviews"
          className={`nav-link text-dark d-flex align-items-center ${isActive('/reviews')}`}
        >
          <FaStar className="me-2" />
          {!collapsed && <span>Reviews</span>}
        </a>
        <a
          href="/settings"
          className={`nav-link text-dark d-flex align-items-center ${isActive('/settings')}`}
        >
          <FaCog className="me-2" />
          {!collapsed && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
