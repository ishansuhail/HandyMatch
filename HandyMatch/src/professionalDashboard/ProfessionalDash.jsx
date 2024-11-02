import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Card, Container, Row, Col } from 'react-bootstrap';

const professionalName = "John Doe";

const requests = [
    { id: 1, service: 'Landscaping', date: '2024-11-05', details: 'Looking to redesign my backyard with flower beds and a patio area.' },
    { id: 2, service: 'HVAC', date: '2024-11-10', details: 'Need annual maintenance check before winter starts.' },
    { id: 3, service: 'Plumbing', date: '2024-11-15', details: 'Fixing a leaky faucet in the kitchen.' },
];

function HandyMatchDashboard() {
    const handleAccept = (id) => {
        console.log(`Accepted request ID: ${id}`);
        // Add functionality to accept the request
    };

    const handleDeny = (id) => {
        console.log(`Denied request ID: ${id}`);
        // Add functionality to deny the request
    };

    return (
        <Container fluid className="vh-100 d-flex p-0">
            {/* Sidebar */}
            <div className="bg-dark text-white p-3" style={{ width: '250px' }}>
                <h4 className="mb-4">HandyMatch</h4>
                <Nav className="flex-column">
                    <Nav.Link href="/" className="text-white">Home</Nav.Link>
                    <Nav.Link href="/past-jobs" className="text-white">Past Jobs</Nav.Link>
                    <Nav.Link href="/reviews" className="text-white">Reviews</Nav.Link>
                    <Nav.Link href="/settings" className="text-white">Settings</Nav.Link>
                </Nav>
            </div>

            {/* Main Content */}
            <div className="flex-grow-1">
                {/* Header */}
                <Navbar bg="light" className="px-4 shadow-sm">
                    <Navbar.Brand>Welcome, {professionalName}</Navbar.Brand>
                </Navbar>

                {/* Client Requests Section */}
                <Container className="mt-4">
                    <h2 className="mb-4">Client Requests</h2>
                    <Row>
                        {requests.map((request) => (
                            <Col key={request.id} md={6} lg={4} className="mb-4">
                                <Card className="shadow-sm">
                                    <Card.Body>
                                        <Card.Title>{request.service}</Card.Title>
                                        <Card.Subtitle className="mb-2 text-muted">{request.date}</Card.Subtitle>
                                        <Card.Text>{request.details}</Card.Text>
                                        <div className="d-flex justify-content-between">
                                            <Button variant="success" onClick={() => handleAccept(request.id)}>
                                                Accept
                                            </Button>
                                            <Button variant="danger" onClick={() => handleDeny(request.id)}>
                                                Deny
                                            </Button>
                                        </div>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>
            </div>
        </Container>
    );
}

export default HandyMatchDashboard;