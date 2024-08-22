import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ForgotPassword: React.FC = () => {
    // Define state with proper types
    const [email, setEmail] = useState<string>("");
    const navigate = useNavigate();

    // Define handleSubmit with the event type
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3001/forgot-password', { email })
        .then(res => {
            console.log(res);
            if(res.data.Status === "Success") {
           
                navigate('/login');
   
            } 
              })
              .catch(err => console.log(err));
      };

    // Define a function to navigate to the register page
    

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative', background: '#2E2E2D', overflow: 'hidden', border: '1px black solid'}}>
            <div className="bg-white p-3 rounded w-25">
                <h2>Forgot Password</h2>
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
                    
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Login
                    </button>
                </form>
                
            </div>
        </div>
    );
};

export default ForgotPassword;
