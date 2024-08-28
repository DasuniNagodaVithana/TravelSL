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
            const res = await axios.post('http://43.205.195.152:3001/login', { email, password });
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
                    navigate('/tours'); // Navigate to home page for admin
                } else {
                    navigate('/tours');     // Navigate to home page for users
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
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative', background: 'white', overflow: 'hidden', border: '1px black solid' }}>
            <div className="p-3 rounded w-25" style={{
                position: 'relative',
                background: '#d8a45b', // Add your gradient colors here
                overflow: 'hidden',
            }}>
                <h2 className="text-center" style={{ color: '#ffffff', fontWeight: 800 }}>Login</h2>
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
                            className="form-control rounded-10"
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
                            className="form-control rounded-10"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    {error && <p className="text-danger text-center">{error}</p>} {/* Display error message */}
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success w-50 rounded-10"
                        >
                            Login
                        </button>
                    </div>
                </form>
                <p className="mt-3 text-center text-decoration-underline" style={{ color: '#ffffff', fontWeight: 600,cursor: 'pointer' }} onClick={navigateToRegister}>
                    Don't Have an Account?
                </p>
                <p className="text-center">
                    <Link to="/forgot-password" className="text-decoration-none" style={{ color: '#ffffff', fontWeight: 300 }}>Forgot Password?</Link>
                </p>
            </div>
        </div>
    );
};

export default Login;
