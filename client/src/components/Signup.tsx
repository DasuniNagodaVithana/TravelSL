import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post<string>("http://localhost:8000/signup", {
        email,
        password,
      });

      if (res.data === "exist") {
        alert("User already exists");
      } else if (res.data === "notexist") {
        navigate("/home", { state: { id: email } });
      }
    } catch (error) {
      alert("Wrong details");
      console.error(error);
    }
  };

  return (
    <div className="signup">
      <h1>Signup</h1>
      <form onSubmit={submit}>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <input type="submit" value="Signup" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/">Login Page</Link>
    </div>
  );
};

export default Signup;
