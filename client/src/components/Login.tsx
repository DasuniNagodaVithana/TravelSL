import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/", {
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
    <div className="login">
      <h1>Login</h1>
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
        <input type="submit" value="Login" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/signup">Signup Page</Link>
    </div>
  );
};

export default Login;
