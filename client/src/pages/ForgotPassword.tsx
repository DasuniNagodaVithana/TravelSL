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
        axios.post('http://43.205.195.152:3001/forgot-password', { email })
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
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative', background: 'white', overflow: 'hidden', border: '1px black solid' }}>
            <div className="p-3 rounded w-25" style={{
                position: 'relative',
                background: '#d8a45b', // Add your gradient colors here
                overflow: 'hidden',
            }}>
                <h2 className="text-center" style={{ color: '#ffffff', fontWeight: 800 }}>Forgot Password</h2>
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
                    
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success w-50 rounded-10"
                        >
                            Login
                        </button>
                    </div>
                </form>
                
            </div>
        </div>
    );
};

export default ForgotPassword;
