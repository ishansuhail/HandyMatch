// src/components/ProfessionalProfile/ServiceCard.jsx
import React from 'react';
import { FaInfoCircle } from 'react-icons/fa'; // Using FontAwesome info icon

const ServiceCard = ({ title, description }) => (
  <div style={styles.serviceCard}>
    <div style={styles.serviceIcon}>
      <FaInfoCircle />
    </div>
    <div style={styles.serviceContent}>
      <h5 style={styles.serviceTitle}>{title}</h5>
      <p style={styles.serviceDescription}>{description}</p>
    </div>
  </div>
);

const styles = {
  serviceCard: {
    display: 'flex',
    alignItems: 'flex-start',
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    transition: 'box-shadow 0.2s',
    cursor: 'pointer',
  },
  serviceIcon: {
    fontSize: '1em',
    color: '#333',
    marginRight: '15px',
  },
  serviceContent: {
    display: 'flex',
    flexDirection: 'column',
  },
  serviceTitle: {
    fontSize: '1.25em',
    fontWeight: 'bold',
    margin: 0,
    color: '#333',
  },
  serviceDescription: {
    fontSize: '0.9em',
    color: '#666',
    marginTop: '5px',
  },
};

export default ServiceCard;
