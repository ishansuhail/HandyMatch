import React from "react";
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignOutButton = () => {
  const navigate = useNavigate()
  const auth = getAuth();

  const handleSignOut = async () => {
    try {
      navigate('/login');
      await signOut(auth);
      console.log("User signed out successfully");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <button
      onClick={handleSignOut}
      className="btn btn-dark px-3 py-2 fs-5 mb-3"
      style={{ width: "50%", margin: "0 auto", display: "block" }}
    >
      Sign Out
    </button>
  );
};

export default SignOutButton;
