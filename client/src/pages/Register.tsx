import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
    // Define state with proper types
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const navigate = useNavigate();

    // Define handleSubmit with the event type
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        axios.post('http://localhost:3001/register', { name, email, password })
            .then(result => {
                console.log(result);
                navigate('/login');
            })
            .catch(err => console.log(err));
    };

    // Define a function to navigate to the login page
    const navigateToLogin = () => {
        navigate('/login');
    };

    return (
        <div
            className="d-flex justify-content-center align-items-center vh-100">
            <div className="p-3 rounded w-25" style={{
                position: 'relative',
                background: '#d8a45b', // Add your gradient colors here
                overflow: 'hidden',
            }}>
                <h2 className="text-center" style={{ color: '#ffffff', fontWeight: 800 }}>Register</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name">
                            <strong>Name</strong>
                        </label>
                        <input
                            type="text"
                            placeholder="Enter Name"
                            autoComplete="off"
                            name="name"
                            className="form-control rounded-10"
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
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
                    <div className="d-flex justify-content-center">
                        <button
                            type="submit"
                            className="btn btn-success w-50 rounded-10"
                        >
                            Register
                        </button>
                    </div>
                </form>
                <p className="mt-3 text-center text-decoration-underline" style={{ color: '#ffffff', fontWeight: 600 }} onClick={navigateToLogin}>
                    Already Have an Account?
                </p>
                <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none d-none">
                    Login
                </Link>
            </div>
        </div>
    );
    
};

export default Register;
