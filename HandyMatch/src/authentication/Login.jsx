import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';
import GoogleButton from "react-google-button";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Link } from 'react-router-dom';
import { auth } from './firebase'; // Adjust the path as necessary

function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLoginClick = async () => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            navigate('/'); // success
        } catch (error) {
            setError(error.message);
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            const response = await fetch('http://localhost:3001/googleSignIn', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            if (data.status === 'success') {
                navigate('/');
            } else {
                setError(data.message);
            }
        } catch (error) {
            setError(error.message);
        }
    }

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
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
