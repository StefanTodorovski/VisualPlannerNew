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
      setError("Погрешна лозинка.");
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
      toast.success("Успешна регистрација. Најави се.");
    } catch (error) {
      setError("Неуспешна регистрација. Пробај повторно.");
      console.error("Registration error:", error.message);
    }
  };

  return (
    <div>
      <h2>Регистрирај се</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder="Име"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="surname"
            placeholder="Презиме"
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder="Е-маил"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder="Телефонски број"
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder="Локација"
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="password"
            placeholder="Лозинка"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            name="repeatPassword"
            placeholder="Повтори лозинка"
            value={formData.repeatPassword}
            onChange={handleInputChange}
            required
          />
        </div>
        {error && <div className="error-message">{error}</div>}

        <button type="submit" className="register-button">
          Регистрирај се
        </button>
        <div className="login-actions">
          <Link to={"/login"} className="forgot-password-link">
            Веќе регистрирани? Најавете се тука.
          </Link>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
