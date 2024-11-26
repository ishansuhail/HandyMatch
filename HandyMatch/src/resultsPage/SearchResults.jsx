import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import ProfessionalCard from "../components/ProfessionalCard";
import { firestore } from "../authentication/firebase";
import { query, collection, where, getDocs } from "firebase/firestore";
import { fetchCoordinates, haversineDistance } from "../utils/geoUtils";

const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryParams = new URLSearchParams(location.search);
  const _task = queryParams.get("task");
  const _zipCode = queryParams.get("zipCode");

  const [task] = useState(_task);
  const [zipCode] = useState(_zipCode);
  const [sort, setSort] = useState(""); // Sorting option
  const [professionals, setProfessionals] = useState([]); // Original professionals
  const [sortedProfessionals, setSortedProfessionals] = useState([]); // For displaying sorted professionals
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [loading, setLoading] = useState(true); // For loading professionals
  const [sorting, setSorting] = useState(false); // For sorting state

  // Fetch user coordinates based on their zip code
  useEffect(() => {
    const getUserCoordinates = async () => {
      try {
        const coordinates = await fetchCoordinates(zipCode);
        setUserCoordinates(coordinates);
      } catch (error) {
        console.error("Failed to fetch user coordinates:", error);
      }
    };
    getUserCoordinates();
  }, [zipCode]);

  // Fetch professionals from Firestore
  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const colRef = collection(firestore, "Users");
        const q = query(colRef, where("isProfessional", "==", true));
        const querySnapshot = await getDocs(q);

        const professionalsList = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (
            data.firstName &&
            data.rate &&
            data.zipcode &&
            Array.isArray(data.skills) &&
            data.skills.map(skill => skill.toLowerCase()).includes(task.toLowerCase())
          ) {
            professionalsList.push({
              id: doc.id,
              name: data.firstName,
              price: parseFloat(data.rate), // Ensure price is a number
              zipCode: data.zipcode,
              rating: data.rating || 0, // Default to 0 if no rating
            });
          }
        });

        setProfessionals(professionalsList);
        setSortedProfessionals(professionalsList); // Initialize sorted professionals
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfessionals();
  }, [task]);

  // Sort professionals by selected criteria
  useEffect(() => {
    const sortProfessionals = async () => {
      if (sort === "Distance" && userCoordinates) {
        setSorting(true);
        try {
          const sortedByDistance = [];
          for (const professional of professionals) {
            try {
              const professionalCoordinates = await fetchCoordinates(
                professional.zipCode
              );
              sortedByDistance.push({
                ...professional,
                distance: haversineDistance(
                  userCoordinates,
                  professionalCoordinates
                ),
              });
            } catch (error) {
              console.warn(
                `Skipping professional with invalid zipCode: ${professional.zipCode}`,
                error
              );
            }
          }
          sortedByDistance.sort((a, b) => a.distance - b.distance);
          setSortedProfessionals(sortedByDistance); // Update sorted professionals
        } catch (error) {
          console.error("Error sorting by distance:", error);
        } finally {
          setSorting(false);
        }
      } else if (sort === "Price") {
        const sortedByPrice = [...professionals].sort(
          (a, b) => a.price - b.price
        );
        setSortedProfessionals(sortedByPrice);
      } else if (sort === "Rating") {
        const sortedByRating = [...professionals].sort(
          (a, b) => b.rating - a.rating
        );
        setSortedProfessionals(sortedByRating);
      }
    };

    if (sort) {
      sortProfessionals();
    }
  }, [sort, userCoordinates]); // Removed professionals from dependencies

  const handleAccountClick = () => {
    navigate("/homeowner-profile"); // Navigate to the user account page
  };

  const handleCardClick = (professional) => {
    console.log(professional.id)
    navigate("/booking", {
      state: { fname: professional.fname, lname: professional.lname, price: professional.price, id: professional.id },
    });
  };

  // const handleCardClick = (professional) => {
  //   console.log(professional.id)
  //   navigate("/booking", {
  //     state: { fname: professional.fname, lname: professional.lname, price: professional.price, id: professional.id },
  //   });
  // };

  return (
    <Container fluid className="mt-4">
      <h2>HandyMatches for {task} near {zipCode}</h2>

      <Row className="mb-4">
        <Col>
          <Button onClick={() => setSort("Distance")}>Distance</Button>
          <Button onClick={() => setSort("Price")}>Price</Button>
          <Button onClick={() => setSort("Rating")}>Rating</Button>
        </Col>
      </Row>

      {loading ? (
        <Spinner animation="border" />
      ) : sortedProfessionals.length === 0 ? (
        <p>No professionals found.</p>
      ) : (
        <Row>
          {sortedProfessionals.map((p) => (
            <Col key={p.id}>
              <ProfessionalCard
                name={p.name}
                price={p.price}
                distance={p.distance ? `${p.distance.toFixed(1)} km` : "N/A"}
                rating={p.rating ? `${p.rating} stars` : "N/A"}
                onClick={() => handleCardClick(p)}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
