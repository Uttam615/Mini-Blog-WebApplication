import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import Api from "../../Api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await Api.post("/login/", formData);
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("username",formData.username);
        navigate("/post"); // Redirect to post list or dashboard
      }
    } catch (err) {
      setError("Invalid Credentials. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <h2>Login Page</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
        {error && <p className="login-error">{error}</p>}
      </form>
    </div>
  );
};

export default Login;
