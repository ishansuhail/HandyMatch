// src/HomeownerProfile/HomeownerProfile.jsx
import React from 'react';
import HomeownerSidebar from '../components/HomeownerSidebar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HomeownerProfile.css';

const HomeownerProfile = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <HomeownerSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-name">Jane Doe</h1>
          <p className="profile-email">jane.doe@example.com</p>
        </div>

        {/* Links Section */}
        <div className="profile-links">
          <h3>My Account</h3>
          <ul>
            <li><a href="/order-history">Order History</a></li>
            <li><a href="/my-reviews">My Reviews</a></li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HomeownerProfile;