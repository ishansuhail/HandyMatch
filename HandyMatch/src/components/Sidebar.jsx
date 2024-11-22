// src/components/Sidebar.jsx
import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaHome, FaBriefcase, FaStar, FaCog, FaBars } from 'react-icons/fa';

function Sidebar() {
  const [collapsed, setCollapsed] = useState(false); // Start with expanded sidebar
  const location = useLocation(); // Get the current location

  const toggleSidebar = () => setCollapsed(!collapsed);

  // Helper function to determine if a tab is active
  const isActive = (paths) => {
    // Check if the current location matches any of the paths provided
    return paths.includes(location.pathname) ? 'active-tab' : '';
  };

  return (
    <div
      className={`d-flex flex-column p-4 vh-100`}
      style={{
        width: collapsed ? '120px' : '300px', // Wider sidebar when expanded
        backgroundColor: '#f4f4f4', // Lighter grey background
        transition: 'width 0.3s',
      }}
    >
      <button
        className="btn btn-light mb-4"
        onClick={toggleSidebar}
        aria-label="Toggle Sidebar"
      >
        <FaBars />
      </button>
      <nav className="nav flex-column">
        <a
          href="/professional-dashboard"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/professional-dashboard'])}`}
        >
          <FaHome className="me-2" />
          {!collapsed && <span>Home</span>}
        </a>
        <a
          href="/past-jobs"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/past-jobs'])}`}
        >
          <FaBriefcase className="me-2" />
          {!collapsed && <span>Past Jobs</span>}
        </a>
        <a
          href="/professional-reviews"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/professional-reviews'])}`}
        >
          <FaStar className="me-2" />
          {!collapsed && <span>Reviews</span>}
        </a>
        <a
          href="/settings"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/settings'])}`}
        >
          <FaCog className="me-2" />
          {!collapsed && <span>Settings</span>}
        </a>
      </nav>
    </div>
  );
}

export default Sidebar;
