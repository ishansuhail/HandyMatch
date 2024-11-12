// src/components/ProfessionalProfile/FAQ.jsx
import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';

const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    { question: "What is the furthest you will come out to do work?", answer: "I will not go more than 50 miles for one single job." },
    { question: "Are any of the prices negotiable?", answer: "Pricing is generally fixed, but discounts may be offered for large projects." },
    { question: "Do you offer refunds for poor service?", answer: "Yes, refunds are available under certain conditions." },
    { question: "What is your most common repair?", answer: "Our most frequent jobs include plumbing and electrical repairs." },
    { question: "How long have you been a home repair professional?", answer: "I have been in the business for over 10 years." },
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div style={styles.faqContainer}>
      <h2 style={styles.faqHeader}>FAQ</h2>
      <div style={styles.faqInnerContainer}>
        {faqs.map((faq, index) => (
          <div key={index} style={styles.faqItem}>
            <div
              style={styles.faqQuestion}
              onClick={() => toggleFAQ(index)}
            >
              <span style={styles.questionText}>{faq.question}</span>
              {activeIndex === index ? (
                <FaChevronUp style={styles.icon} />
              ) : (
                <FaChevronDown style={styles.icon} />
              )}
            </div>
            {activeIndex === index && (
              <div style={styles.faqAnswer}>
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  faqContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center', // Center the container on the page
    marginTop: '20px',
  },
  faqHeader: {
    fontSize: '1.5em',
    fontWeight: 'bold',
    marginBottom: '20px',
    color: '#333',
  },
  faqInnerContainer: {
    width: '80%', // Set a smaller width for the container
    maxWidth: '600px', // Maximum width for larger screens
  },
  faqItem: {
    border: '1px solid #e0e0e0',
    borderRadius: '8px',
    overflow: 'hidden',
    boxShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
    marginBottom: '10px',
  },
  faqQuestion: {
    padding: '12px 15px', // Smaller padding to reduce overall size
    backgroundColor: '#f9f9f9',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    cursor: 'pointer',
  },
  questionText: {
    fontWeight: 'bold',
    color: '#333',
  },
  icon: {
    color: '#666',
  },
  faqAnswer: {
    padding: '12px 15px', // Smaller padding for answer text as well
    backgroundColor: '#ffffff',
    color: '#555',
    borderTop: '1px solid #e0e0e0',
  },
};

export default FAQ;
