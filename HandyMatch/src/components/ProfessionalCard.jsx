import React from "react";
import { Card } from "react-bootstrap";

const ProfessionalCard = ({ name, price, handleClick }) => {
    return (
        <Card style={{ width: '18rem' }} onClick = {handleClick} className="shadow-sm">
          <Card.Img
            variant="top"
            src="https://via.placeholder.com/150" //added placeholder image 
            alt="Placeholder"
            className="p-3"
            style={{ opacity: 0.5 }}
          />
          <Card.Body>
            <Card.Text className="text-center mb-1">{name}</Card.Text>
            <Card.Text className="text-center fw-bold">${price}</Card.Text>
          </Card.Body>
        </Card>
      );
}
 
export default ProfessionalCard;