import React, { useState } from 'react';
import Feedback from 'react-bootstrap/esm/Feedback';
import { FaEdit } from 'react-icons/fa';

const ProfessionalReviewCard = ({ stars, feedback}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editFeedback, setEditFeedback] = useState(feedback);
  const [editStars, setEditStars] = useState(stars);


  const handleReviewSubmit = () => {
    alert('Review updated successfully!');
    setIsEditing(false);
  };

  const styles = {
    card: {
      border: '1px solid #e0e0e0',
      padding: '15px',
      borderRadius: '5px',
      backgroundColor: '#fff',
      boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
      marginBottom: '15px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    stars: {
      display: 'flex',
      alignItems: 'center',
      gap: '5px',
    },
    star: (isFilled) => ({
      fontSize: '1.5em',
      color: isFilled ? '#f39c12' : '#ccc',
    }),
    text: {
      fontSize: '1em',
      color: '#666',
      marginBottom: '5px',
    },
    editButton: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    modal: {
      position: 'fixed',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      backgroundColor: '#fff',
      border: '1px solid #e0e0e0',
      borderRadius: '10px',
      padding: '20px',
      boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
      zIndex: 1000,
    },
    modalSection: {
      marginBottom: '15px',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #e0e0e0',
      borderRadius: '5px',
      marginTop: '5px',
    },
    modalButtons: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    submitButton: {
      padding: '10px 20px',
      backgroundColor: '#333',
      color: '#fff',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    cancelButton: {
      padding: '10px 20px',
      backgroundColor: '#ccc',
      color: '#333',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
  };

  return (
    <div style={styles.card}>
      <div>
        <div style={styles.stars}>
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              style={styles.star(star <= stars)}
            >
              ★
            </span>
          ))}
        </div>
        <p style={styles.text}>
          <strong>Feedback:</strong> {feedback}
        </p>
        
      </div>

      

      {isEditing && (
        <div style={styles.modal}>
          <h3>Edit Your Review</h3>
          <div style={styles.modalSection}>
            <label>
              <strong>Stars:</strong>
            </label>
            <div style={styles.stars}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={styles.star(star <= editStars)}
                  onClick={() => setEditStars(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div style={styles.modalSection}>
            <label>
              <strong>Feedback:</strong>
            </label>
            <textarea
              rows="4"
              value={editFeedback}
              onChange={(e) => setEditFeedback(e.target.value)}
              style={styles.textarea}
            />
          </div>

          <div style={styles.modalButtons}>
            <button
              style={styles.submitButton}
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
            <button
              style={styles.cancelButton}
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfessionalReviewCard;
