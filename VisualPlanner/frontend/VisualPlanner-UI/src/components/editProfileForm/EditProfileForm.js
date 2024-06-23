import React, { useState } from "react";
import "./EditProfileForm.css";
import DateTimePicker from "react-datetime-picker";
import { Navigate, useLocation } from "react-router-dom";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const EditProfileForm = ({ user }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    location: "",
    password: "",
    repeatPassword: "",
    picture: [],
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
    try {
      const formDataEdit = {
        name: formData.name,
        surname: formData.surname,
        email: formData.email,
        phone: formData.phone,
        location: formData.location,
        picture: formData.picture,
      };
      const result = await axiosInstance.put(`/users/${user.id}`, formDataEdit);
      setFormData({
        name: "",
        surname: "",
        email: "",
        phone: "",
        location: "",
        picture: [],
      });
      window.location.reload();
      toast.success("Information updated successfully.");
    } catch (error) {
      console.error("Update information error:", error.message);
    }
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const arrayBuffer = reader.result;
        const uint8Array = new Uint8Array(arrayBuffer);
        setFormData({
          ...formData,
          picture: Array.from(uint8Array),
        });
      };

      reader.readAsArrayBuffer(file);
    } else {
      console.error("No file select or object is undefined");
    }
  };

  return (
    <div className="edit-profile-form">
      <h2>Edit Information</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            name="name"
            placeholder={user.name}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="surname"
            placeholder={user.surname}
            value={formData.surname}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="email"
            name="email"
            placeholder={user.email}
            value={formData.email}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="tel"
            name="phone"
            placeholder={user.phone}
            value={formData.phone}
            onChange={handleInputChange}
            required
          />
        </div>
        <div>
          <input
            type="text"
            name="location"
            placeholder={user.location}
            value={formData.location}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="file-input-container">
          <label htmlFor="picture" className="upload-image-label">
            Upload Image
          </label>
          <input
            id="picture"
            type="file"
            accept="image/*"
            name="picture"
            onChange={handleFileChange}
            className="form-input"
            required
          />
        </div>
        <button type="submit" className="save-button">
          Save
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;
