import React from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import ProfessionalCard from '../components/ProfessionalCard';

const SearchResults = () => {

  const location = useLocation();

  // Parse query parameters
  const queryParams = new URLSearchParams(location.search);
  const task = queryParams.get('task'); // Retrieve the value of 'task'
  const zipCode = queryParams.get('zipCode'); // Retrieve the value of 'zipCode'

  console.log(location.search)
  console.log(task, zipCode)


  return (
    <Container className="mt-4">
      {/* Title Section */}
      <h2 className="mb-3">HandyMatches for {task} near {zipCode}</h2>

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
          <Button variant="outline-dark" className="me-2">Price ascending</Button>
          <Button variant="outline-dark" className="me-2">Price descending</Button>
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
