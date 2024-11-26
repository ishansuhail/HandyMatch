import React, { useEffect } from "react";
import { Container, Row, Col, Button, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import {firestore } from "../authentication/firebase";

const Booking = () => {
    const location = useLocation();

    const _name = location.state.name;
    const _id = location.state.id;
    const _price = location.state.price;
   
    const [email, setEmail] = useState('');
    const [id, setId] = useState(_id);
    const [price, setPrice] = useState(_price);
    const [name, setFname] = useState(_name);
    const [services, setServices] = useState([]);
   

  

  useEffect(() => {
    const fetchProfessionalData = async () => {
        try {
            // Create a reference to the document
            const docRef = doc(firestore, "Users", id);
        
            
            const docSnap = await getDoc(docRef);
        
            if (docSnap.exists()) {
              // Document data
              console.log("Document data:", docSnap.data().skills);
              setServices(docSnap.data().skills);
            } else {
              console.log("No such document!");
              
            }
        } catch (error) {
        console.error("Error fetching document:", error);
        throw error;
        }
    }
    fetchProfessionalData();

  }, []);



  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <Row className="align-items-center mb-4" style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}>
        <Col xs={12} md={8}>
          <h1 className="fw-bold">{name}</h1>
          <Button variant="dark" className="mt-3">Book an Appointment</Button>
        </Col>
        <Col xs={12} md={4} className="text-end">
          <div
            style={{
              width: "80px",
              height: "80px",
              border: "3px solid black",
              borderRadius: "50%",
              display: "inline-block",
            }}
          ></div>
        </Col>
      </Row>

      {/* Services Section */}
      <Row className="mb-4">
        <Col>
          <h3 className="fw-bold">Available Services</h3>
        </Col>
      </Row>
        <Row className="g-4">
        {services.map((service, index) => (
            <Col xs={12} md={6} lg={4} key={index}>
            <Card className="shadow-sm border-0">
                <Card.Body>
                <div className="d-flex align-items-center mb-3">
                    <span
                    style={{
                        fontSize: "24px",
                        color: "#333",
                        fontWeight: "bold",
                        marginRight: "10px",
                    }}
                    >
                    {index + 1}.
                    </span>
                    <h5 className="mb-0">{service}</h5>
                </div>
                </Card.Body>
            </Card>
            </Col>
        ))}
        </Row>
    </Container>
  );
};

export default Booking;
