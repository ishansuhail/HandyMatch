// src/pages/ProfessionalDash.jsx
import React from 'react';
import Sidebar from '../components/Sidebar';
import ClientRequestCard from '../components/ClientRequestCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaUserCircle, FaBell, FaCog } from 'react-icons/fa';

const requests = [
  { name: "John D.", role: "Homeowner", dateRequested: "11/1/24", description: "I'd like someone to landscape my garden" },
  { name: "Amber T.", role: "Homeowner", dateRequested: "10/29/24", description: "I'd like a patio to be installed around my new pool" },
  { name: "Michael B.", role: "Homeowner", dateRequested: "10/25/24", description: "Need a new roof for my house" },
  { name: "Sarah W.", role: "Homeowner", dateRequested: "10/20/24", description: "Looking for someone to paint my living room" },
  { name: "David K.", role: "Homeowner", dateRequested: "10/18/24", description: "Need plumbing work in the kitchen" },
  { name: "Emma R.", role: "Homeowner", dateRequested: "10/15/24", description: "Want to install new windows in my house" },
  { name: "Olivia P.", role: "Homeowner", dateRequested: "10/10/24", description: "Looking for someone to build a deck in my backyard" },
  { name: "Liam N.", role: "Homeowner", dateRequested: "10/05/24", description: "Need electrical work done in the basement" },
  { name: "Sophia M.", role: "Homeowner", dateRequested: "10/01/24", description: "Want to remodel my bathroom" },
  { name: "James L.", role: "Homeowner", dateRequested: "09/28/24", description: "Need someone to install a new fence" }
];

const ProfessionalDash = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Top Header with Icons */}
        <div className="d-flex justify-content-between align-items-center px-4 py-2 bg-light border-bottom">
          <div className="d-flex align-items-center">
            <FaUserCircle size={24} className="me-2" />
          </div>
          <div className="d-flex align-items-center">
            <FaBell size={20} className="me-3" />
            <FaCog size={20} />
          </div>
        </div>

        {/* Title Bar */}
        <div className="bg-dark text-white py-3 px-4">
          <h1 className="mb-0">Bob The Builder</h1>
        </div>

        {/* Client Requests Section */}
        <div className="p-4" style={{ paddingRight: '2rem' }}>
          <h4 className="mb-4">Client Requests ({requests.length})</h4>
          <div className="row">
            {requests.map((request, index) => (
              <div className="col-xl-3 col-lg-4 col-md-6 col-sm-12 mb-4" key={index}>
                <ClientRequestCard {...request} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalDash;
