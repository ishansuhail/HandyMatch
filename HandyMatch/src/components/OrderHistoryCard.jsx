import React, { useState } from 'react';
import { doc, updateDoc, arrayUnion, setDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { firestore } from '../authentication/firebase';

const OrderHistoryCard = ({ service, professional, date, status }) => {
  const [isReviewing, setIsReviewing] = useState(false);
  const [stars, setStars] = useState(0);
  const [reviewText, setReviewText] = useState('');
  const [photo, setPhoto] = useState(null);


  const userData = JSON.parse(localStorage.getItem('user'));

  const email = userData.email // Retrieve the value of 'email'



  const handleReviewSubmit = async () => {
    alert("Review submitted successfully!");
  
    const newReview = {
      name: professional,
      rating: stars,
      review: reviewText,
    };
  
    try {
      // Reference to the "UserReviews" document
      const docRef = doc(firestore, "UserReviews", email);
  
      // Add the new review to the "reviews" array
      await updateDoc(docRef, {
        reviews: arrayUnion(newReview),
      });
  
      console.log("Review added successfully!");
  
      // Step 1: Find the professional in the "Users" collection
      const usersRef = collection(firestore, "Users");
      const q = query(
        usersRef,
        where("firstName", "==", professional.split(" ")[0]), // First name condition
        where("lastName", "==", professional.split(" ")[1])   // Last name condition
      );
      
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        // Step 2: Update the professional's document
        querySnapshot.forEach(async (doc) => {
          const professionalRef = doc.ref;
          const professionalData = doc.data();
  
          const currentNumReviews = professionalData.numReviews || 0; // Default to 0
          const currentAvgReview = professionalData.avgReview || 0; // Default to 0
  
          // Calculate new average
          const newNumReviews = currentNumReviews + 1;
          const newAvgReview =
            (currentAvgReview * currentNumReviews + stars) / newNumReviews;
  
          // Update the professional's document
          await updateDoc(professionalRef, {
            avgReview: newAvgReview,
            numReviews: newNumReviews,
          });
  
          console.log(`Updated professional ${professional}'s avgReview and numReviews.`);
        });
      } else {
        console.warn("No professional found with the specified name.");
      }
    } catch (error) {
      if (error.code === "not-found") {
        // If the document doesn't exist, create it with the new review
        const docRef = doc(firestore, "UserReviews", email);
        await setDoc(docRef, { reviews: [newReview] });
  
        console.log("Document created and review added!");
      } else {
        console.error("Error adding review:", error);
      }
    }
  
    setIsReviewing(false);
    setStars(0);
    setReviewText("");
    setPhoto(null);
  };
  

  return (
    <div
      style={{
        border: '1px solid #e0e0e0',
        padding: '15px',
        borderRadius: '5px',
        backgroundColor: '#fff',
        boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
        marginBottom: '15px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <div>
        <h3 style={{ fontSize: '1.2em', fontWeight: 'bold', color: '#333' }}>{service}</h3>
        <p style={{ fontSize: '1em', color: '#666' }}>
          <strong>Professional:</strong> {professional}
        </p>
        <p style={{ fontSize: '1em', color: '#666' }}>
          <strong>Date:</strong> {date}
        </p>
        <p
          style={{
            fontSize: '1em',
            fontWeight: 'bold',
            color: status === 'Completed' ? 'green' : 'orange',
          }}
        >
          <strong>Status:</strong> {status}
        </p>
      </div>

      <div
        style={{
          marginRight: '10px', // Move the button slightly to the left
        }}
      >
        <button
          style={{
            padding: '10px 30px',
            backgroundColor: '#333',
            color: '#fff',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
          onClick={() => setIsReviewing(true)}
        >
          Leave Review
        </button>
      </div>

      {isReviewing && (
        <div
          style={{
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
          }}
        >
          <h3>Leave a Review</h3>
          <div style={{ marginBottom: '15px' }}>
            <label>
              <strong>Rating:</strong>
            </label>
            <div style={{ display: 'flex', gap: '5px', marginTop: '5px' }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <span
                  key={star}
                  style={{
                    cursor: 'pointer',
                    fontSize: '1.5em',
                    color: stars >= star ? '#f39c12' : '#ccc',
                  }}
                  onClick={() => setStars(star)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              <strong>Photo Upload:</strong>
            </label>
            <input
              type="file"
              onChange={(e) => setPhoto(e.target.files[0])}
              style={{ marginTop: '5px', display: 'block' }}
            />
          </div>

          <div style={{ marginBottom: '15px' }}>
            <label>
              <strong>Review:</strong>
            </label>
            <textarea
              rows="4"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              style={{
                width: '100%',
                padding: '10px',
                border: '1px solid #e0e0e0',
                borderRadius: '5px',
                marginTop: '5px',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#333',
                color: '#fff',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={handleReviewSubmit}
            >
              Submit
            </button>
            <button
              style={{
                padding: '10px 20px',
                backgroundColor: '#ccc',
                color: '#333',
                border: 'none',
                borderRadius: '5px',
                cursor: 'pointer',
              }}
              onClick={() => setIsReviewing(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderHistoryCard;
