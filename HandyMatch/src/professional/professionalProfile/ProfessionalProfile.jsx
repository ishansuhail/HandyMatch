// src/professionalProfile/ProfessionalProfile.jsx
import React from 'react';
import ImageCarousel from '../../components/ProfessionalProfile/ImageCarousel';
import ServiceCard from '../../components/ProfessionalProfile/ServiceCard';
import ReviewCard from '../../components/ProfessionalProfile/ReviewCard';
import FAQ from '../../components/ProfessionalProfile/FAQ';
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProfessionalProfile.css';

const services = [
  { title: "Landscaping", description: "Professional garden landscaping and maintenance services." },
  { title: "Patio Installation", description: "Custom patio design and installation around pools." },
  { title: "Roofing", description: "Reliable and affordable roof replacement services." },
  { title: "Painting", description: "Interior painting for all rooms, tailored to your preferences." }
];

const reviews = [
  { rating: 5, text: "Excellent work! Very professional.", reviewer: "John D.", date: "November 2024" },
  { rating: 4, text: "Great quality, but a bit late.", reviewer: "Amber T.", date: "October 2024" }
];

const ProfessionalProfile = () => {
  return (
    <div>
      {/* Profile Header Section */}
      <div className="profile-header">
        <div className="profile-info">
          <h1 className="profile-name">Bob the Builder</h1>
          <button className="book-button">Book an Appointment</button>
        </div>
        <div className="profile-picture">
          <svg
            width="100"
            height="100"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-user"
          >
            <circle cx="12" cy="7" r="4"></circle>
            <path d="M5.5 20h13a2.5 2.5 0 0 0-2.5-2.5h-8A2.5 2.5 0 0 0 5.5 20z"></path>
          </svg>
        </div>
      </div>

      {/* Other Sections */}
      <div className="p-4">
        <ImageCarousel />
      </div>

      <div className="p-4">
        <h4 className="services-header">Available Services</h4>
        <div className="row">
          {services.map((service, index) => (
            <div className="col-md-6 mb-4" key={index}>
              <ServiceCard {...service} />
            </div>
          ))}
        </div>
      </div>

      <div className="p-4">
        <FAQ />
      </div>

      <div className="p-4">
        <h4 className="services-header">Latest Reviews</h4>
        <div className="reviews-container">
          {reviews.map((review, index) => (
            <ReviewCard key={index} {...review} />
          ))}
        </div>
      </div>

    </div>
  );
};

export default ProfessionalProfile;
