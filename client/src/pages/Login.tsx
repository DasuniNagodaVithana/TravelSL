import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login: React.FC = () => {
    // Define state with proper types
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    // Define handleSubmit with the event type
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3001/login', { email, password })
        .then(res => {
          console.log(res);
          if(res.data.Status === "Success") {
            if(res.data.role === "admin"){
              navigate('/home')
            } else {
              navigate('/');
          }
 
          } 
            })
            .catch(err => console.log(err));
    };

    // Define a function to navigate to the register page
    const navigateToRegister = () => {
        navigate('/forgot-password');
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
                <p className="mt-3 text-center text-decoration-underline" onClick={navigateToRegister}>
                    Don't Have an Account?
                    <br></br>
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
