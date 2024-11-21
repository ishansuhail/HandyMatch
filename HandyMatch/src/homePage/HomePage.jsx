import React, { useState } from 'react';
import { Container, Row, Col, Button, Card, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './HomePage.css'; // Import the CSS file

const HomePage = () => {
  const [task, setTask] = useState('');
  const [zipCode, setZipCode] = useState('');
  const navigate = useNavigate();

  const handleSearch = () => {
    if (task && zipCode) {
      // Navigate to another page with query parameters
      navigate(`/search?task=${encodeURIComponent(task)}&zipCode=${encodeURIComponent(zipCode)}`);
    } else {
      alert("Please fill in both fields.");
    }
  };

  const handleAccountClick = () => {
    navigate('/homeowner-profile'); // Navigate to homeowner profile
  };

  return (
    <Container fluid className="w-100 mt-1">
      {/* Header */}
      <div className="header-container">
        <h1 className="header-title">Handy Match</h1>
        <p className="header-subtitle">Book the Best, Fix the Rest</p>
        <Button 
          variant="dark" 
          onClick={handleAccountClick} 
          className="my-account-button"
        >
          My Account
        </Button>
      </div>

      {/* Search Section */}
      <div style={{ backgroundColor: '#d3d3d3' }} className="pb-5 pt-4">
        <Row className="justify-content-center">
          <Col xs={12} md={4} className="mb-2">
            <Form.Select
              value={task}
              onChange={(e) => setTask(e.target.value)}
              aria-label="Select a task"
            >
              <option value="">Select a Task</option>
              <option value="plumbing">Plumbing</option>
              <option value="hvac">HVAC</option>
              <option value="roofing">Roofing</option>
              <option value="gardening">Gardening</option>
            </Form.Select>
          </Col>
          <Col xs={12} md={4} className="mb-2">
            <Form.Control
              type="text"
              placeholder="My ZipCode"
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value)}
            />
          </Col>
          <Col xs="auto" className="d-flex align-items-center">
            <Button variant="dark" onClick={handleSearch}>
              Search
            </Button>
          </Col>
        </Row>
      </div>

      {/* Testimonials Section */}
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
    avatar: "https://static.vecteezy.com/system/resources/previews/014/194/216/non_2x/avatar-icon-human-a-person-s-badge-social-media-profile-symbol-the-symbol-of-a-person-vector.jpg",
  },
  {
    quote: "The chat feature helped me communicate with the electrician in a timely manner.",
    name: "Joe",
    date: "July 2024",
    avatar: "https://www.pngall.com/wp-content/uploads/12/Avatar-Profile-PNG-Photos.png",
  },
  {
    quote: "The easy to use website made booking an appointment in an emergency easy.",
    name: "Sasha",
    date: "May 2024",
    avatar: "https://cdn.vectorstock.com/i/1000v/71/87/male-avatar-profile-icon-round-man-face-vector-18307187.jpg",
  },
  {
    quote: "The calendar was so helpful to make sure my schedule aligned with the professional I booked.",
    name: "Tim",
    date: "Aug 2024",
    avatar: "https://cdn.vectorstock.com/i/1000v/71/98/male-avatar-profile-icon-round-man-face-vector-18307198.jpg",
  },
  {
    quote: "As an electrician, the profile setup was super easy and made it simple for clients to reach out to me about a job.",
    name: "Bob",
    date: "July 2024",
    avatar: "https://static.vecteezy.com/system/resources/previews/006/487/917/original/man-avatar-icon-free-vector.jpg",
  },
  {
    quote: "When I needed help for two different services, I was able to book them quickly and at a great rate.",
    name: "Kelly",
    date: "June 2024",
    avatar: "https://cdn1.iconfinder.com/data/icons/avatars-1-5/136/87-512.png",
  },
];

export default HomePage;
