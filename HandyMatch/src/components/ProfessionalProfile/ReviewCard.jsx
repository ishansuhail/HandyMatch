// src/components/ProfessionalProfile/ReviewCard.jsx
import React from 'react';
import { FaStar } from 'react-icons/fa';

const ReviewCard = ({ title, text, reviewer, date, rating, profilePicture }) => {
  // Generate stars based on the rating
  const stars = Array.from({ length: 5 }, (_, i) => (
    <FaStar key={i} color={i < rating ? '#FFC107' : '#e0e0e0'} />
  ));

  return (
    <div style={styles.reviewCard}>
      <div style={styles.stars}>{stars}</div>
      <h5 style={styles.title}>{title}</h5>
      <p style={styles.text}>"{text}"</p>
      <div style={styles.reviewerInfo}>
        <img src={profilePicture} alt={`${reviewer}'s profile`} style={styles.profilePicture} />
        <div>
          <span style={styles.reviewerName}>{reviewer}</span>
          <span style={styles.reviewDate}>{date}</span>
        </div>
      </div>
    </div>
  );
};

const styles = {
  reviewCard: {
    backgroundColor: '#fff',
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    maxWidth: '250px',
    margin: '10px',
    transition: 'box-shadow 0.2s',
  },
  stars: {
    display: 'flex',
    marginBottom: '10px',
  },
  title: {
    fontSize: '1.1em',
    fontWeight: 'bold',
    color: '#333',
    margin: '0 0 5px',
  },
  text: {
    fontSize: '0.9em',
    color: '#666',
    margin: '0 0 15px',
  },
  reviewerInfo: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '10px',
  },
  profilePicture: {
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    marginRight: '10px',
  },
  reviewerName: {
    display: 'block',
    fontSize: '0.9em',
    fontWeight: 'bold',
    color: '#000', // Black color for reviewer name
  },
  reviewDate: {
    display: 'block',
    fontSize: '0.8em',
    color: '#999', // Light gray for the date
    marginTop: '2px',
  },
};

export default ReviewCard;
