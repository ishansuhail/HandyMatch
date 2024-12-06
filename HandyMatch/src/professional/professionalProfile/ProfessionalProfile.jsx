import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import Sidebar from '../Sidebar';
import { useLocation } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfessionalProfile.css';

const HomeownerProfile = () => {

  
  const userData = JSON.parse(localStorage.getItem('user'));
  
  const _email = userData.email // Retrieve the value of 'email'
  const _fname = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
  const _lname = userData.lastName;


  const [firstName, setFirstName] = useState(_fname);
  const [lastName, setLastName] = useState(_lname);
  const [email, setEmail] = useState(decodeURIComponent(_email));



  const handleChange = (setter) => (event) => {
    setter(event.target.value);
  };

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="profile-header">
          <h1 className="profile-name">{firstName} {lastName}</h1>
          <p className="profile-email">{email}</p>
        </div>

        {/* Account Information Section */}
        <div className="profile-form">
          <div className="form-group">
            <div className="label">First Name</div>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                value={firstName}
                onChange={handleChange(setFirstName)} // Allow editing
              />
              <FaEdit className="edit-icon" />
            </div>
          </div>
          <div className="form-group">
            <div className="label">Last Name</div>
            <div className="input-group">
              <input
                type="text"
                className="input-field"
                value={lastName}
                onChange={handleChange(setLastName)} // Allow editing
              />
              <FaEdit className="edit-icon" />
            </div>
          </div>
          <div className="form-group">
            <div className="label">Email</div>
            <div className="input-group">
              <input
                type="email"
                className="input-field"
                value={email}
                onChange={handleChange(setEmail)} // Allow editing
              />
              <FaEdit className="edit-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeownerProfile;
