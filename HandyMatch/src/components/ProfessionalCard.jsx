import React from "react";
import { Card } from "react-bootstrap";

const ProfessionalCard = ({ name, price, stars, distance, numReviews }) => {
  const renderStars = (stars) => {
    const starElements = [];
    for (let i = 0; i < Math.round(stars); i++) {
      starElements.push(<span key={i}>&#9733;</span>); // Unicode star character
    }
    return starElements;
  };

  return (
    <Card style={{ width: '18rem' }} className="shadow-sm">
      <Card.Body>
        <Card.Text className="text-center">{name}</Card.Text>
        <Card.Text className="text-center fw-bold">${price}</Card.Text>
        <Card.Text className="text-center">
          {renderStars(stars)} {numReviews ? `(${numReviews} reviews)` : "(No reviews)"}
        </Card.Text>
        <Card.Text className="text-center">
          Distance: {distance || "N/A"}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfessionalCard;
