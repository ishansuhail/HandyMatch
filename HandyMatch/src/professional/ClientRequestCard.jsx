// src/components/ClientRequestCard.js
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { FaExclamationCircle } from 'react-icons/fa';

function ClientRequestCard({ name, role, image, dateRequested, description, isEmergency, onAcceptJob }) {
  const initials = name.split(' ').map(n => n[0]).join('');

  const acceptJob = () => {
    onAcceptJob(name); // Pass the job name to the handler
  };

  return (
    <div className="card w-100 h-100 border rounded shadow-sm">
      <div className="card-body">
        <div className="d-flex align-items-center mb-3">
          <div className="bg-secondary text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '50px', height: '50px', fontSize: '1.2em' }}>
            {initials}
          </div>
          <div className="ms-3">
            <h5 className="card-title mb-0">
              {name}
              {isEmergency && (
                <span className="badge bg-danger text-white ms-2" style={{ fontSize: '0.9em' }}>
                  <FaExclamationCircle /> Emergency
                </span>
              )}
            </h5>
            <p className="card-subtitle text-muted">{role}</p>
          </div>
        </div>
        <p className="card-text text-muted">Date Requested: {dateRequested}</p>
        <p className="card-text">{description}</p>
        <div className="d-flex">
          <button className="btn btn-outline-secondary btn-sm">Deny Request</button>
          <button onClick = {acceptJob} className="btn btn-dark btn-sm ms-2">Accept</button>
        </div>
      </div>
    </div>
  );
}

export default ClientRequestCard;
