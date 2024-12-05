import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Modal, Form } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { firestore } from "../authentication/firebase";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Booking = () => {
  const savedState = JSON.parse(localStorage.getItem("bookingData"));
  const _fname = savedState?.fname;
  const _lname = savedState?.lname;
  const _id = savedState?.id;
  const _price = savedState?.price;


  console.log(_fname, _lname, _id, _price);
  

  const customerData = JSON.parse(localStorage.getItem("user"));


  const [id, setId] = useState(_id);
  const [price, setPrice] = useState(_price);
  const [fname, setFname] = useState(_fname);
  const [lname, setLname] = useState(_lname);
  const [service, setService] = useState('')
  const [services, setServices] = useState([]);

  const [showCalendar, setShowCalendar] = useState(false); // Controls calendar modal visibility
  const [selectedDate, setSelectedDate] = useState(null); // Stores selected date and time
  const [isEmergency, setIsEmergency] = useState(false); // Emergency toggle
  const [address, setAddress] = useState(""); // Stores address input

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
    };
    fetchProfessionalData();
  }, [id]);

  // Handlers for calendar modal
  const handleCalendarOpen = () => setShowCalendar(true);
  const handleCalendarClose = () => setShowCalendar(false);

  const handleDateChange = (date) => {
    setSelectedDate(date); // Update selected date
  };

  const handleSkillSelect = (e) => {
    setService(e.target.value);
  };

  const handleConfirm = async () => {
    if (!selectedDate || !address) {
      alert("Please select a date and enter an address.");
      return;
    }


  
    const jobData = {
      date: selectedDate.toISOString(), // Convert date to a string for Firestore
      isEmergency: isEmergency,
      customer: customerData.firstName + " " + customerData.lastName,
      professional: fname + " " + lname,
      service: service,
      address: address,
    };
  
    try {
        // Reference to the document in the Jobs collection
        const jobRef = doc(firestore, "Jobs", id);
    
        // Check if the document already exists
        const docSnapshot = await getDoc(jobRef);
        if (docSnapshot.exists()) {
            // If the document exists, add a new job to the array
            await updateDoc(jobRef, {
                jobs: arrayUnion(jobData), // Add jobData to the "jobs" array
            });
            console.log("New job added to existing document:", jobData);
            alert("Appointment confirmed and added to the existing record!");
        } else {
            // If the document does not exist, create it with an array
            await setDoc(jobRef, {
                jobs: [jobData], // Initialize the "jobs" array with jobData
            });
            console.log("New document created with job:", jobData);
            alert("Appointment confirmed and new record created!");
        }


       

        handleAddDataToReview();
    
        setShowCalendar(false); // Close the modal
    } catch (error) {
        console.error("Error adding/updating document:", error);
        alert("Failed to confirm the appointment. Please try again.");
    }
    
  };

  const handleAddDataToReview = async () => {
    const jobRef = doc(firestore, "UserReviews", customerData.email);

    const jobData = {
        professionalId: id,
        professional: fname + " " + lname,
        service: service,
        address: address,
        date: selectedDate.toISOString(), // Convert date to a string for Firestore
        status: "in progress"
    }
    
    const docSnapshot = await getDoc(jobRef);
        if (docSnapshot.exists()) {
            // If the document exists, add a new job to the array
            await updateDoc(jobRef, {
                jobs: arrayUnion(jobData), // Add jobData to the "jobs" array
            });
            console.log("New job added to existing document:", jobData);
            alert("Appointment confirmed and added to the existing record!");
        } else {
            // If the document does not exist, create it with an array
            await setDoc(jobRef, {
                jobs: [jobData], // Initialize the "jobs" array with jobData
            });
            console.log("New document created with job:", jobData);
            alert("Appointment confirmed and new record created!");
        }

  };

  return (
    <Container fluid className="p-4">
      {/* Header Section */}
      <Row
        className="align-items-center mb-4"
        style={{ backgroundColor: "#f8f9fa", padding: "20px", borderRadius: "8px" }}
      >
        <Col xs={12} md={8}>
          <h1 className="fw-bold">{fname}</h1>
          <Button variant="dark" className="mt-3" onClick={handleCalendarOpen}>
            Book an Appointment
          </Button>
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

      {/* Calendar Modal */}
      <Modal show={showCalendar} onHide={handleCalendarClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Book an Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {/* Date Picker */}
            <Form.Group className="mb-3">
              <Form.Label>Select Date and Time</Form.Label>
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={30}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                inline
              />
            </Form.Group>

            {/* Emergency Toggle */}
            <Form.Group className="mb-3">
              <Form.Check
                type="checkbox"
                label="Is this an emergency?"
                checked={isEmergency}
                onChange={(e) => setIsEmergency(e.target.checked)}
              />
            </Form.Group>

            {/* Address Input */}
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter your address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Form.Group>


            <Form.Group className="mb-3">
              <Form.Label>Select a Skill</Form.Label>
              <Form.Control
                as="select"
                value={service}
                onChange={handleSkillSelect}
              >
                <option value="">-- Select a Skill --</option>
                {services.map((skill, index) => (
                  <option key={index} value={skill}>
                    {skill}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            {/* Confirm Button */}
            <Button variant="dark" onClick={handleConfirm}>
              Confirm Appointment
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Display Selected Date */}
      {selectedDate && (
        <Row className="mt-4">
          <Col>
            <h5 className="fw-bold">Selected Appointment</h5>
            <p>Date and Time: {selectedDate.toLocaleString()}</p>
            <p>Is Emergency: {isEmergency ? "Yes" : "No"}</p>
            <p>Address: {address}</p>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Booking;
