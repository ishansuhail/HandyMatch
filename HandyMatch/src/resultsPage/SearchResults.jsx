import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ProfessionalCard from "../components/ProfessionalCard";
import "./SearchResults.css"; // Ensure this is properly imported
import { firestore } from "../authentication/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const _task = queryParams.get("task"); // Retrieve the value of 'task'
  const _zipCode = queryParams.get("zipCode"); // Retrieve the value of 'zipCode'

  const [task] = useState(_task);
  const [zipCode] = useState(_zipCode);
  const [sort, setSort] = useState("Price"); // Can be also Price or Reviews
  const [professionals, setProfessionals] = useState([]); // Store professionals data

  // Fetch data from Firestore
  useEffect(() => {
    const fetchProfessionals = async () => {
      const collectionToSearch = "Users";
      const colRef = collection(firestore, collectionToSearch);
      const q = query(colRef, where("isProfessional", "==", true));
      const querySnapshot = await getDocs(q);

      const professionalsList = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        
        if (data.firstName && data.rate && data.zipcode && Array.isArray(data.skills) && data.skills.includes(task.charAt(0).toUpperCase() + task.slice(1).toLowerCase())) {
            // Add only if all fields are valid
            professionalsList.push({
              id: doc.id,
              name: data.firstName,
              price: data.rate,
              zipCode: data.zipcode,
            });
          } else {
            console.warn(`Skipping document ${doc.id} due to missing fields`);
          }
      });

      if (sort === "Price"){
        professionalsList.sort((a, b) => a.price - b.price);
        console.log(professionalsList)
      }
      setProfessionals(professionalsList);
    };

    fetchProfessionals();
  }, []);

  const handleAccountClick = () => {
    navigate("/homeowner-profile"); // Navigate to the user account page
  };

  const handleCardClick = (professional) => {
    console.log(professional.id)
    navigate("/booking", {
      state: { name: professional.name, price: professional.price, id: professional.id },
    });
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
          <Button variant="outline-dark" className="me-2" onClick={() => setSort("Distance")}>Distance</Button>
          <Button variant="outline-dark" onClick={() => setSort("Rating")}>Rating</Button>
        </Col>
      </Row>

      {/* Professional Cards Grid */}
      <Row className="g-3">
        {professionals.map((professional) => (
          <Col key={professional.id} xs={12} md={6} lg={3}>
            <ProfessionalCard name={professional.name} price={professional.price} id = {professional.id}  handleClick={() => handleCardClick(professional)} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default SearchResults;
