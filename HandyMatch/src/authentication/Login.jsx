import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import GoogleButton from "react-google-button";
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth, firestore } from './firebase'; // Adjust the path as necessary
import { collection, getDocs, query, where } from 'firebase/firestore';

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {

            let isProfessional = null ;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            // Finding if the user is a professional or not
            const collectionToSearch = "Users";
            const colRef = collection(firestore, collectionToSearch);
            const q = query(colRef, where("email", "==", email)); // Query where email matches
            const querySnapshot = await getDocs(q)

            if (!querySnapshot.empty) {
                
                querySnapshot.forEach((doc) => {
                    console.log("Document ID:", doc.id); // Document ID
                    console.log("Document Data:", doc.data()); // Document Data
                    isProfessional = doc.data().isProfessional;
                    
                  }); 

            }

            navigate(isProfessional === false ? '/home' : '/professional-dashboard'); // success
        } catch (error) {
            setError(error.message);
        }
    }

    const handleGoogleSignIn = async () => {
        const provider = new GoogleAuthProvider();
        try { 
            const result = await signInWithPopup(auth, provider);
            navigate('/professional-dashboard'); // Navigate to home or dashboard on success
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-white">
            <div className="p-4 bg-white rounded shadow-sm" style={{ width: '350px' }}>
                {/* Log In Heading */}
                <h4 className="mb-2 text-left">Log In</h4>

                {/* Sign Up Link */}
                <p className="mb-4 text-left">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-primary">
                        Sign up
                    </Link>
                </p>

                {/* Email Input */}
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        placeholder="Value"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                {/* Password Input */}
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        placeholder="Value"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>

                {/* Login Button */}
                <button
                    className="btn btn-dark w-100 mb-3"
                    onClick={handleLoginClick}
                >
                    Sign In
                </button>

                {/* Forgot Password Link with Border */}
                <div className="text-center">
                    <Link
                        to="/forgot-password"
                        className="text-muted"
                        style={{
                            display: 'inline-block',
                            padding: '8px 12px',
                            border: '1px solid black',
                            borderRadius: '4px',
                            textDecoration: 'none'
                        }}
                    >
                        Forgot password?
                    </Link>
                </div>

                {/* Error Message */}
                {error && <Alert variant="danger" className="mt-3">{error}</Alert>}

                {/* Google Sign-In */}
                <div className="d-flex justify-content-center mt-3">
                    <GoogleButton
                        className="g-btn"
                        onClick={handleGoogleSignIn}
                    />
                </div>
            </div>
        </div>
    );
}

export default Login;
