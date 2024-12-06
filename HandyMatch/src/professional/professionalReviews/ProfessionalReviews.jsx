// src/ProfessionalReviews/ProfessionalReviews.jsx
import React, { useEffect, useState } from 'react';
import Sidebar from '../Sidebar';
import ReviewCard from '../../homeOwner/ReviewCard';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfessionalReviews.css';
import { auth, firestore } from '../../authentication/firebase';
import { doc, getDoc  } from 'firebase/firestore';
import ProfessionalReviewCard from '../ProfessionalReviewCard';

const ProfessionalReviews = () => {

  const [reviews, setReviews] = useState([]);

  

  const userData = JSON.parse(localStorage.getItem('user'));

  const email =  userData.email;
  const firstName = userData.firstName; // Retrieve the value of 'firstname' and 'lastname'
  const lastName = userData.lastName;


  useEffect(() => {

    

    const queryName = firstName + ' ' + lastName;

    const fetchReviews = async (queryName) => {

    try {
      // Create a reference to the document
      const docRef = doc(firestore, "ProfessionalReviews", queryName);
  
      // Fetch the document
      const docSnapshot = await getDoc(docRef);
  
      if (docSnapshot.exists()) {
        // Return the document's data
        console.log("Document data:", docSnapshot.data().reviews);
        setReviews(docSnapshot.data().reviews);
        console.log(docSnapshot.data());
      } 
    } catch (error) {
      console.error("Error retrieving document:", error);
      
    }
  }
  fetchReviews(queryName);

  }, [])
  return (
    <div className="d-flex">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-grow-1">
        {/* Header */}
        <div className="reviews-header">
          <h1 className="profile-name">{firstName} {lastName}</h1>
          <p className="profile-email">{email}</p>
        </div>

        {/* Professional Reviews Section */}
        <div className="reviews-content">
          <h2 className="reviews-title">Client Reviews</h2>
          <div className="reviews-list">
            
          {reviews.length === 0 ? (
              <p>No reviews yet.</p>
            ) : (
              reviews.map((review, index) => (
                <ProfessionalReviewCard
                  key={index}
                  stars={review.rating}
                  feedback={review.review}
                />
                
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfessionalReviews;
