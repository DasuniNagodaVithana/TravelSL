// src/pages/ResetPassword.tsx
import React, { useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword: React.FC = () => {
    const { token } = useParams<{ token: string }>();
    const [password, setPassword] = useState<string>("");
    const [message, setMessage] = useState<string>("");
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:3001/reset-password/${token}`, { password });
            setMessage(response.data.message);
            if (response.data.message === "Password updated successfully") {
                navigate("/login");
            }
        } catch (error) {
            setMessage("An error occurred. Please try again.");
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100" style={{ position: 'relative', background: 'white', overflow: 'hidden', border: '1px black solid' }}>
            <div className="p-3 rounded w-25" style={{
                position: 'relative',
                background: '#d8a45b', // Add your gradient colors here
                overflow: 'hidden',
            }}>
                <h2 className="text-center" style={{ color: '#ffffff', fontWeight: 800 }}>Reset Password</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="password">
                            <strong>New Password</strong>
                        </label>
                        <input
                            type="password"
                            placeholder="Enter new password"
                            name="password"
                            className="form-control rounded-10"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-80 rounded-10">
                        Reset Password
                    </button>
                </form>
                {message && <p className="mt-3 text-center">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
