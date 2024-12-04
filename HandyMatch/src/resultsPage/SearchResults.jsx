import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
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
  const [professionals, setProfessionals] = useState([]); // Original fetched list
  const [sortedProfessionals, setSortedProfessionals] = useState([]); // Sorted list
  const [userCoordinates, setUserCoordinates] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

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

  // Fetch professionals from Firestore and calculate distances
  useEffect(() => {
    const fetchProfessionals = async () => {
      setLoading(true);
      try {
        const colRef = collection(firestore, "Users");
        const q = query(colRef, where("isProfessional", "==", true));
        const querySnapshot = await getDocs(q);

        const professionalsList = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();

            // Only add valid professionals with valid data
            if (
              data.firstName &&
              data.rate &&
              data.zipcode &&
              Array.isArray(data.skills) &&
              data.skills.map(skill => skill.toLowerCase()).includes(task.toLowerCase())
            ) {
              try {
                // Calculate distance using haversine formula
                const professionalCoordinates = await fetchCoordinates(
                  data.zipcode
                );
                const distanceKm = haversineDistance(
                  userCoordinates,
                  professionalCoordinates
                );
                const distanceMiles = (distanceKm * 0.621371).toFixed(1); // Convert to miles
                return {
                  id: doc.id,
                  name: data.firstName,
                  price: parseFloat(data.rate), // Ensure price is numeric
                  zipCode: data.zipcode,
                  distance: distanceMiles,
                  avgReview: data.avgReview || 0, // Fetch avgReview, default to 0
                  numReviews: data.numReviews || 0, // Fetch numReviews, default to 0
                };
              } catch (error) {
                console.warn(
                  `Skipping professional with invalid zipCode: ${data.zipcode}`,
                  error
                );
                return null; // Skip invalid professionals
              }
            }
            return null;
          })
        );

        // Filter out null values (invalid professionals)
        const validProfessionals = professionalsList.filter(Boolean);

        console.log("Fetched professionals:", validProfessionals);
        setProfessionals(validProfessionals);
        setSortedProfessionals(validProfessionals); // Initialize sorted list
      } catch (error) {
        console.error("Error fetching professionals:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userCoordinates) {
      fetchProfessionals();
    }
  }, [task, userCoordinates]);

  // Sort professionals by selected criteria
  useEffect(() => {
    if (!sort) {
      setSortedProfessionals(professionals); // Reset to original order if no sort is selected
      return;
    }

    const sortProfessionals = () => {
      if (sort === "Distance") {
        const sortedByDistance = [...professionals].sort(
          (a, b) => parseFloat(a.distance) - parseFloat(b.distance)
        );
        setSortedProfessionals(sortedByDistance);
      } else if (sort === "Price") {
        const sortedByPrice = [...professionals].sort(
          (a, b) => a.price - b.price
        );
        setSortedProfessionals(sortedByPrice);
      } else if (sort === "Reviews") {
        const sortedByReviews = [...professionals].sort(
          (a, b) => b.avgReview - a.avgReview
        ); // Sort by reviews, greatest to least
        setSortedProfessionals(sortedByReviews);
      }
    };

    sortProfessionals();
  }, [sort, professionals]);

  const handleAccountClick = () => {
    navigate("/homeowner-profile");
  };

  return (
    <Container fluid className="mt-4">
      <h2>HandyMatches for {task} near {zipCode}</h2>
      <Button
        variant="dark"
        onClick={handleAccountClick}
        className="my-account-button"
      >
        My Account
      </Button>

      <Row className="mb-4">
        <Col className="d-flex flex-row gap-2">
          <Button onClick={() => setSort("Distance")}>Sort by Distance</Button>
          <Button onClick={() => setSort("Price")}>Sort by Price</Button>
          <Button onClick={() => setSort("Reviews")}>Sort by Reviews</Button>
          <Button onClick={() => setSort("")}>Reset</Button>
        </Col>
      </Row>

      {loading ? (
        <p>Loading...</p>
      ) : sortedProfessionals.length === 0 ? (
        <p>No professionals found.</p>
      ) : (
        <Row>
          {sortedProfessionals.map((professional) => (
            <Col className = "mb-4" key={professional.id} xs={12} md={6} lg={3}>
              <ProfessionalCard
                name={professional.name}
                price={professional.price}
                stars={professional.avgReview} // Use avgReview for stars
                numReviews={professional.numReviews} // Pass numReviews
                distance={professional.distance ? `${professional.distance} miles` : "N/A"}
              />
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default SearchResults;
