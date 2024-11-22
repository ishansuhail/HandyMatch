import React, { useState } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';
import './SearchResults.css'; // Ensure this is properly imported
import { firestore } from '../authentication/firebase';
import { query, collection, where, getDocs } from 'firebase/firestore';

const SearchResults = async () => {

  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const _task = queryParams.get('task'); // Retrieve the value of 'task'
  const _zipCode = queryParams.get('zipCode'); // Retrieve the value of 'zipCode'

  const [task, setTask] = useState(_task);
  const [zipCode, setZipCode] = useState(_zipCode);
  const [sort, setSort] = useState("Distance"); //can be also Price or Reviews 
  

  const collectionToSearch = "Users";
  const colRef = collection(firestore, collectionToSearch);
  const q = query(colRef, where("isProfessional", "==", true)); // Query where email matches
  const querySnapshot = await getDocs(q)

  if (!querySnapshot.empty) {
        
    querySnapshot.forEach((doc) => {
    console.log("Document ID:", doc.id); // Document ID
    console.log("Document Data:", doc.data()); // Document Data
   
    }); 

  }

  // Parse query parameters
  

  const handleAccountClick = () => {
    navigate('/homeowner-profile'); // Navigate to the user account page
  };

  return (
    <Container fluid className="mt-4">
      {/* Header Section */}
      <div className="header-container">
        <h2 className="header-title">HandyMatches for {task} near {zipCode}</h2>
        <Button 
          variant="dark" 
          onClick={handleAccountClick} 
          className="my-account-button"
        >
          My Account
        </Button>
      </div>

      {/* Search Bar */}
      <Row className="mb-4">
        <Col xs={12} md={6} lg={4}>
          <Form className="d-flex">
            <Form.Control 
              type="text" 
              placeholder="Patio Repair" 
              className="me-2" 
            />
            <Button variant="outline-secondary">🔍</Button>
          </Form>
        </Col>
      </Row>

      {/* Sorting Options */}
      <Row className="mb-4">
        <Col xs={12} className="d-flex align-items-center">
          <span className="me-3">Sort by:</span>
          <Button variant="outline-dark" className="me-2">Price</Button>
          <Button variant="outline-dark">Rating</Button>
        </Col>
      </Row>

      {/* Placeholder for Card Grid */}
      <Row className="g-3">
        {[...Array(8)].map((_, index) => (
          <Col key={index} xs={12} md={6} lg={3}>
            <ProfessionalCard />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
