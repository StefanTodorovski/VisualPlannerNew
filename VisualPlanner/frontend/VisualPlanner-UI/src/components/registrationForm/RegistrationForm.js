import React, { useState } from "react";
import "./RegisterForm.css";
import axiosInstance from "../../services/axiosInstance";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegistrationForm = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    repeatPassword: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.repeatPassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      const response = await axiosInstance.post("/users/add", formData);

      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        location: "",
        password: "",
        repeatPassword: "",
      });
      navigate("/login");
      toast.success("Registration successful. Please login.");
    } catch (error) {
      setError("Registration failed. Please try again.");
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="surname"
            placeholder="Surname"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Phone number"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="repeatPassword"
            placeholder="Repeat password"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="register-button">
          REGISTER
        </button>
        <div className="login-actions">
          <Link to={"/login"} className="forgot-password-link">
            Already registered? Login here.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
