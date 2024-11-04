import React from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';

const HomePage = () => {
  return (
    <Container fluid className="w-100 mt-1">
      <div className='bg-secondary'></div>
      <div style = {{backgroundColor: '#d3d3d3'}}className='pb-5 pt-4'>
        {/* Header */}
        <div className="text-center mb-4">
            <h1 className="display-4">Handy Match</h1>
            <p className="lead">Book the Best, Fix the Rest</p>
        </div>

        
        <Row className="justify-content-center">
            <Col xs={12} md={4} className="mb-2">
            <Form.Control type="text" placeholder="Request a Task" />
            </Col>
            <Col xs={12} md={4} className="mb-2">
            <Form.Control type="text" placeholder="My ZipCode" />
            </Col>
            <Col xs="auto" className="d-flex align-items-center">
            <Button variant="dark">Search</Button>
            </Col>
        </Row>
      </div>

      
      <h3 className="text-center mt-3 mb-4">Client Testimonials</h3>
      <Row className="gy-4">
        {testimonials.map((testimonial, index) => (
          <Col key={index} xs={12} md={6} lg={4}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Text className="fst-italic">"{testimonial.quote}"</Card.Text>
                <div className="d-flex align-items-center mt-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="rounded-circle me-2"
                    style={{ width: '40px', height: '40px' }}
                  />
                  <div>
                    <strong>{testimonial.name}</strong>
                    <div className="text-muted">{testimonial.date}</div>
                  </div>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

// Testimonial Data
const testimonials = [
  {
    quote: "I was able to book an appointment to fix my sink the next day thanks to HomePage!",
    name: "Clara",
    date: "Sept 2024",
    avatar: "https://via.placeholder.com/40", // Replace with actual image source
  },
  {
    quote: "The chat feature helped me communicate with the electrician in a timely manner.",
    name: "Joe",
    date: "July 2024",
    avatar: "https://via.placeholder.com/40",
  },
  {
    quote: "The easy to use website made booking an appointment in an emergency easy.",
    name: "Sasha",
    date: "May 2024",
    avatar: "https://via.placeholder.com/40",
  },
  {
    quote: "The calendar was so helpful to make sure my schedule aligned with the professional I booked.",
    name: "Tim",
    date: "Aug 2024",
    avatar: "https://via.placeholder.com/40",
  },
  {
    quote: "As an electrician, the profile setup was super easy and made it simple for clients to reach out to me about a job.",
    name: "Bob",
    date: "July 2024",
    avatar: "https://via.placeholder.com/40",
  },
  {
    quote: "When I needed help for two different services, I was able to book them quickly and at a great rate.",
    name: "Kelly",
    date: "June 2024",
    avatar: "https://via.placeholder.com/40",
  },
];

export default HomePage;
