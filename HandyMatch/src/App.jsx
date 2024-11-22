import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./authentication/Login";
import SignUp from "./authentication/SignUp";
import ProfessionalDash from "./professionalDashboard/ProfessionalDash";
import HomePage from './homePage/HomePage.jsx';
import ProfessionalProfile from './professionalProfile/ProfessionalProfile';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { auth } from "./authentication/firebase.js";
import SearchResults from './resultsPage/SearchResults.jsx';
import HomeownerProfile from './HomeownerProfile/HomeownerProfile';
import OrderHistory from './OrderHistory/OrderHistory';
import MyReviews from './MyReviews/MyReviews';

function App() {
  const [user, setUser] = useState();
  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setUser(user);
    });
  });
  return (
    <Router>
      <div className="App">
        <div className="auth-wrapper">
          <div className="auth-inner">
            <Routes>
              <Route path="/"element={<Login />}/>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<SignUp />} />
              <Route path="/professional-dashboard" element={<ProfessionalDash />} />
              <Route path = "/home" element={<HomePage />} />
              <Route path="/professional-profile" element={<ProfessionalProfile />} />
              <Route path="/homeowner-profile" element={<HomeownerProfile />} />
              <Route path="/order-history" element={<OrderHistory />} />
              <Route path="/my-reviews" element={<MyReviews />} /> 
              <Route path = "/search" element={<SearchResults />} />
            </Routes>
            <ToastContainer />
          </div>
        </div>
      </div>
    </Router>
  );
}

export default App
