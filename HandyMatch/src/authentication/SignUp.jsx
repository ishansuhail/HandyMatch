import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { auth, firestore } from "./firebase";
import { createUserWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import GoogleButton from "react-google-button";

const SignUp = ({ onToggle }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [userType, setUserType] = useState("Customer");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [skills, setSkills] = useState("");
  const [businessDescription, setBusinessDescription] = useState("");
  const [profilePhoto, setProfilePhoto] = useState(null);
  const navigate = useNavigate();

  async function signUp(email, password) {
    const isProfessional = (userType) => userType === "Professional";
    
    try {
      await setDoc(doc(db, "users", email), {
        isProfessional: isProfessional(userType),
        createdAt: new Date(),
      });
      console.log("Document written with ID: ");
    }catch (err) {
      console.error("Error adding document: ", err);
    }

    return createUserWithEmailAndPassword(auth, email, password);
  }

  const handleGoogleSignUp = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      // Create a document ID by concatenating first name, last name, and UID with underscores
      const docId = `${firstName.toLowerCase()}_${lastName.toLowerCase()}_${user.uid}`;

      // Create a Firestore document with firstName + "_" + lastName + "_" + UID as the document ID
      const userDoc = doc(firestore, "Users", docId);
      await setDoc(userDoc, {
        email: user.email,
        firstName,
        lastName,
        password: password,
        isProfessional: userType === "Professional",
        phoneNumber: userType === "Professional" ? phoneNumber : null,
        skills: userType === "Professional" ? skills.split(',').map(skill => skill.trim()) : [],
        businessDescription: userType === "Professional" ? businessDescription : null,
        profilePhoto: profilePhoto ? await uploadProfilePhoto(profilePhoto) : null,
      });

      navigate(userType === "Customer" ? '/home' : '/professional-dashboard');
    } catch (error) {
      console.error("Google Sign Up error:", error.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const userCredential = await signUp(email, password);
      const user = userCredential.user;

      // Create a document ID by concatenating first name, last name, and UID with underscores
      const docId = `${firstName}_${lastName}_${user.uid}`;

      // Create a Firestore document with firstName + "_" + lastName + "_" + UID as the document ID
      const userDoc = doc(firestore, "Users", docId);
      await setDoc(userDoc, {
        email,
        firstName,
        lastName,
        password: password,
        isProfessional: userType === "Professional",
        phoneNumber: userType === "Professional" ? phoneNumber : null,
        skills: userType === "Professional" ? skills.split(',').map(skill => skill.trim()) : [],
        businessDescription: userType === "Professional" ? businessDescription : null,
        profilePhoto: profilePhoto ? await uploadProfilePhoto(profilePhoto) : null,
      });

      navigate(userType === "Customer" ? '/home' : '/professional-dashboard');
    } catch (error) {
      console.error("Signup error:", error.message);
      if (error.code === "auth/email-already-in-use") {
        console.error("This email is already registered.");
      } else if (error.code === "auth/invalid-email") {
        console.error("Invalid email format.");
      } else {
        console.error("An unknown error occurred.");
      }
    }
  };

  // Helper function to upload profile photo and get its URL
  const uploadProfilePhoto = async (file) => {
    try {
      // Define Firebase Storage path
      const storageRef = auth.app.storage().ref();
      const fileRef = storageRef.child(`profilePhotos/${firstName}_${lastName}`);
      
      // Upload the file
      await fileRef.put(file);
      
      // Get the download URL
      return await fileRef.getDownloadURL();
    } catch (error) {
      console.error("Error uploading profile photo:", error.message);
      return null;
    }
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-center">
        <div className="col-12 col-md-8 col-lg-6">
          <div className="card p-4 shadow-lg">
            <h3 className="card-title text-center mb-4">Sign Up</h3>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastName"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </div>
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
                <label className="form-label">Are you a...?</label>
                <select
                  className="form-select"
                  onChange={(e) => setUserType(e.target.value)}
                >
                  <option value="Customer">Customer</option>
                  <option value="Professional">Professional</option>
                </select>
              </div>
              {userType === "Professional" && (
                <>
                  <div className="mb-3">
                    <label htmlFor="phoneNumber" className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      className="form-control"
                      id="phoneNumber"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="skills" className="form-label">Skills</label>
                    <input
                      type="text"
                      className="form-control"
                      id="skills"
                      value={skills}
                      onChange={(e) => setSkills(e.target.value)}
                      placeholder="Separate skills with commas"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="businessDescription" className="form-label">Business Description</label>
                    <textarea
                      className="form-control"
                      id="businessDescription"
                      value={businessDescription}
                      onChange={(e) => setBusinessDescription(e.target.value)}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="profilePhoto" className="form-label">Profile Photo</label>
                    <input
                      type="file"
                      className="form-control"
                      id="profilePhoto"
                      onChange={(e) => setProfilePhoto(e.target.files[0])}
                    />
                  </div>
                </>
              )}
              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>
            <div className="mt-3 text-center">
              <a href="/login" className="text-secondary" onClick={onToggle}>Already have an account?</a>
            </div>
            <div className="d-flex justify-content-center mt-3">
              <GoogleButton
                className="g-btn"
                onClick={handleGoogleSignUp}
                label="Sign up with Google"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
