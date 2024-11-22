import React, { useState } from 'react';
import HomeownerSidebar from '../components/HomeownerSidebar';
import ReviewCard from '../components/ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyReviews.css';

const mockReviews = [
  {
    id: 1,
    stars: 5,
    feedback: 'Excellent work! Very professional.',
    service: 'Plumbing',
    professional: 'John Doe',
    date: '2024-11-01',
  },
  {
    id: 2,
    stars: 4,
    feedback: 'Good work, but took longer than expected.',
    service: 'Roofing',
    professional: 'Emily Clark',
    date: '2024-10-20',
  },
  {
    id: 3,
    stars: 3,
    feedback: 'Satisfactory work, but communication could improve.',
    service: 'Gardening',
    professional: 'Tom Hanks',
    date: '2024-09-15',
  },
];

const MyReviews = () => {
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <HomeownerSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="order-history-header">
          <h1 className="profile-name">Jane Doe</h1>
          <p className="profile-email">jane.doe@example.com</p>
        </div>

        {/* My Reviews List */}
        <div className="reviews-content">
          <h2 className="reviews-title">My Reviews</h2>
          <div className="reviews-list">
            {mockReviews.map((review) => (
              <ReviewCard key={review.id} {...review} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
