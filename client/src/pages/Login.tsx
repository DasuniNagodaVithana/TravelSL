import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null); // State to store error message
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/login', { email, password });
            console.log(res);
            
            // Assuming the response data contains Status, role, and userId
            const { Status, role, userId } = res.data;
    
            if (Status === "Success") {
                // Store the user ID in session storage
                if (userId) {
                    sessionStorage.setItem('userId', userId);
    
                    // Print the user ID to the console
                    console.log('User ID stored in session:', userId);
                }
    
                // Navigate based on user role
                if (role === "admin") {
                    navigate('/home'); // Navigate to home page for admin
                } else {
                    navigate('/');     // Navigate to home page for users
                }
            } else {
                setError("Login failed: " + Status); // Show error message
            }
        } catch (err) {
            console.error(err);
            setError("An error occurred. Please try again."); // Generic error message
        }
    };
    

    const navigateToRegister = () => {
        navigate('/register');
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative', background: '#2E2E2D', overflow: 'hidden', border: '1px black solid'}}>
            <div className="bg-white p-3 rounded w-25">
                <h2>Login</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email">
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter Password"
                            name="password"
                            className="form-control rounded-0"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                {error && <p className="text-danger mt-3">{error}</p>} {/* Display error message if present */}
                <p className="mt-3 text-center text-decoration-underline" onClick={navigateToRegister}>
                    Don't Have an Account?
                    <br />
                    <Link to="/forgot-password">Forgot Password</Link>
                </p>
                <Link to="/register" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none d-none">
                    Sign Up
                </Link>
            </div>
        </div>
    );
};

export default Login;
