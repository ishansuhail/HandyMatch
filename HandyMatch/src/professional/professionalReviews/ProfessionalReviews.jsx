// src/ProfessionalReviews/ProfessionalReviews.jsx
import React from 'react';
import Sidebar from '../Sidebar';
import ReviewCard from '../ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfessionalReviews.css';

const mockProfessionalReviews = [
  {
    id: 1,
    stars: 5,
    feedback: 'Amazing work, highly recommended!',
    service: 'Electrical Work',
    client: 'John Smith',
    date: '2024-11-01',
  },
  {
    id: 2,
    stars: 4,
    feedback: 'Good work but a bit expensive.',
    service: 'Roof Installation',
    client: 'Mary Johnson',
    date: '2024-10-15',
  },
  {
    id: 3,
    stars: 3,
    feedback: 'Satisfactory experience.',
    service: 'HVAC Repair',
    client: 'Michael Brown',
    date: '2024-09-20',
  },
];

const ProfessionalReviews = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="reviews-header">
          <h1 className="profile-name">Bob The Builder</h1>
          <p className="profile-email">bob.builder@example.com</p>
        </div>

        {/* Professional Reviews Section */}
        <div className="reviews-content">
          <h2 className="reviews-title">Client Reviews</h2>
          <div className="reviews-list">
            {mockProfessionalReviews.map((review) => (
              <ReviewCard
                key={review.id}
                stars={review.stars}
                feedback={review.feedback}
                service={review.service}
                professional={review.client}
                date={review.date}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalReviews;
