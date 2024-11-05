import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const SignUp = ({ onToggle }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Customer");
  const navigate = useNavigate()


  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const status = await signUp(email, password);
      console.log("Signup successful:", status);
    } catch (error) {
      console.error("Signup error:", error);
      if (error.code === "auth/email-already-in-use") {
        console.error("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        console.error("Invalid email format.");
      } else {
        console.error("An unknown error occurred.");
      }
    }

    if (userType === "Customer"){
      navigate('/home')
    }
    else{
      navigate('/professional-dashboard')
    }
  };

  

  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg d-flex justify-content-center align-items-center" style={{ width: "22rem" }}>
        <h3 className="card-title text-center mb-4">Sign Up</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
           
          <div className = "mb-3 d-flex flex-column align-items-center">
            <label className="form-label">Are you a...?</label>
            <select className = "form-select" style={{ backgroundColor: "transparent" }} onChange={(e) => setUserType(e.target.value)}>
              <option value="Customer">Customer</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          </div>
          <button type="submit" className="btn btn-primary w-100">
            Sign Up
          </button>
        </form>
        <div className="mt-3 text-center">
          <a href="/login" className="text-secondary" onClick={onToggle}>Already have an account?</a>
        </div>
        
      </div>
    </div>
  );
};

export default SignUp;
