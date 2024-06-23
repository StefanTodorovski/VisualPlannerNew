import React, { useState } from "react";
import "./LoginForm.css";
import { json, useNavigate } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const LoginForm = ({ refreshUser }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axiosInstance.post("/users/login", formData);

      const { userId } = response.data;
    
      localStorage.setItem(
        "userData",
        JSON.stringify({ ...response.data, userId })
      );

      setFormData({
        email: "",
        password: "",
      });
      setError("");

      refreshUser();

      const viewModel = {
        name: response.data.name,
        email: response.data.email,
        phone: response.data.phone,
        location: response.data.location,
        roleId: response.data.roleId
      };

      // Use viewModel in your application as needed
      console.log("ViewModel:", viewModel);

      if(viewModel.roleId === 0 ){
        navigate("/home-page-kid")
        toast.success("Login successful.");

      } else {

      navigate("/");
      window.location.reload();
      toast.success("Login successful.");

      }
      
    } catch (error) {
      setError("Login failed. Invalid credentials.");
      console.error("Login error:", error.message);
    }
  };

  return (
    <div className="login-form-container">
      <div className="login-form-card">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input
              type="email"
              name="email"
              value={formData.email}
              placeholder="Username"
              required
              onChange={handleInputChange}
            />
          </div>
          <div className="input-group">
            <input
              type="password"
              name="password"
              value={formData.password}
              placeholder="Password"
              required
              onChange={handleInputChange}
            />
          </div>
          {error && <div className="error-message">{error}</div>}
          <div className="login-actions">
            <button type="submit" className="login-button">
              LOGIN
            </button>
            <Link to={"/register"} className="forgot-password-link">
              New to Visual Planner? Register here.
            </Link>
          </div>
          <div className="divider-container">
            <div className="line"></div>
            <div className="or-text">OR</div>
            <div className="line"></div>
          </div>
          <div className="social-login">
            <button type="button" className="social-button google" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
