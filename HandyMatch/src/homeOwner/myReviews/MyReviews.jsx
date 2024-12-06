import React, { useEffect, useState } from 'react';
import HomeownerSidebar from '../HomeownerSidebar';
import ReviewCard from '../../professional/ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './MyReviews.css';
import { doc, getDoc } from 'firebase/firestore';
import { firestore } from '../../authentication/firebase';

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

  const [reviews, setReviews] = useState([])

  const userData = JSON.parse(localStorage.getItem('user'));

  const email = userData.email // Retrieve the value of 'email'
  const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
  const lastName = userData.lastName;

  useEffect(() => {

    const fetchReviews = async () => {
      const reviewsRef = doc(firestore, "UserReviews", email)
      const docSnap = await getDoc(reviewsRef)

      if (docSnap.exists()) {
        console.log(docSnap.data().reviews)
        setReviews(docSnap.data().reviews)
      }

    }
    fetchReviews();
  }, [])

  return (
    <div className="d-flex">
      {/* Sidebar */}
      <HomeownerSidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="order-history-header">
          <h1 className="profile-name">{firstName} {lastName}</h1>
          <p className="profile-email">{email}</p>
        </div>

        {/* My Reviews List */}
        <div className="reviews-content">
          <h2 className="reviews-title">My Reviews</h2>
          <div className="reviews-list">
            {reviews.length > 0 ? (
              reviews.map((review, index) => (
                <ReviewCard key={review.id || index} review = {review.review} stars = {review.rating} name = {review.name} />
              ))
            ) : (
              <p className="text-muted">No reviews found.</p>
            )
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyReviews;
