import React from "react";
import { Card } from "react-bootstrap";

const ProfessionalCard = () => {
    return (
        <Card style={{ width: '18rem' }} className="shadow-sm">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/150" //added placeholder image 
            alt="Placeholder"
            className="p-3"
            style={{ opacity: 0.5 }}
          />
          <Card.Body>
            <Card.Text className="text-center mb-1">Text</Card.Text>
            <Card.Text className="text-center fw-bold">$0</Card.Text>
          </Card.Body>
        </Card>
      );
}
 
export default ProfessionalCard;