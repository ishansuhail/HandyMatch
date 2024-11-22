import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaSearch, FaListAlt, FaStar, FaUser, FaBars } from 'react-icons/fa';

function HomeownerSidebar() {
  const [collapsed, setCollapsed] = useState(false); // Start with expanded sidebar for wider look
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
        width: collapsed ? '90px' : '300px', // Wider sidebar
        backgroundColor: '#f4f4f4', // Lighter grey background
        transition: 'width 0.25s',
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
        {/* Updated "Search for Jobs" tab to route to /home */}
        <a
          href="/home"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/home'])}`}
        >
          <FaSearch className="me-2" />
          {!collapsed && <span>Search for Jobs</span>}
        </a>
        <a
          href="/order-history"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/order-history'])}`}
        >
          <FaListAlt className="me-2" />
          {!collapsed && <span>My Order History</span>}
        </a>
        <a
          href="/my-reviews"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/my-reviews'])}`}
        >
          <FaStar className="me-2" />
          {!collapsed && <span>My Reviews</span>}
        </a>
        <a
          href="/homeowner-profile"
          className={`nav-link text-dark d-flex align-items-center mb-3 ${isActive(['/homeowner-profile', '/my-account'])}`}
        >
          <FaUser className="me-2" />
          {!collapsed && <span>My Account</span>}
        </a>
      </nav>
    </div>
  );
}

export default HomeownerSidebar;
