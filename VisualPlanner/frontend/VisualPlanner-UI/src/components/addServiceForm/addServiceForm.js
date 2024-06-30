import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./addServiceForm.css";
import axiosInstance from "../../services/axiosInstance";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { format, isPast } from "date-fns";
import { toast } from "react-toastify";

const AddServiceForm = ({
  activityTypes,
  petTypes,
  userId,
  refreshUserPosts,
}) => {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const location = useLocation();
  const postToEdit = location.state?.post;
  const temp_user_data = localStorage.getItem("userData");
  const userData = JSON.parse(temp_user_data);
  userId = userData.id;
  const [formData, setFormData] = useState({
    description: "",
    petSize: "",
    price: "",
    petTypeId: "",
    activityTypeId: "",
    availabilities: [],
    picture: [],
    userId: userId,
  });

  useEffect(() => {
    if (postToEdit) {
      setFormData({
        ...postToEdit,
        availabilities: postToEdit.availabilities
          ? postToEdit.availabilities.map((availability) => ({
              ...availability,
              dateTimeFrom: new Date(availability.dateTimeFrom),
              dateTimeTo: new Date(availability.dateTimeTo),
            }))
          : [],
        picture: postToEdit.picture || [],
        userId: userId,
      });
    }
  }, [postToEdit, userId]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    console.log("File object: ", file);

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

  const handleDateTimeChange = (index, field, value) => {
    const dateObject = value.$d;
    const isInPast = isPast(dateObject);
    if (isInPast) {
      setError("Selected date is in the past!");
    }

    const formattedDate = format(dateObject, "dd-MM-yyyy HH:mm:ss");
    const updatedAvailabilities = [...formData.availabilities];
    updatedAvailabilities[index][field] = formattedDate;
    setFormData({
      ...formData,
      availabilities: updatedAvailabilities,
    });
  };

  const handleAddTime = () => {
    setFormData({
      ...formData,
      availabilities: [
        ...formData.availabilities,
        { dateTimeFrom: new Date(), dateTimeTo: new Date() },
      ],
    });
  };

  const handleSubmit = async (event) => {
    console.log(formData);
    event.preventDefault();
    try {
      console.log(formData);
      if (postToEdit) {
        await axiosInstance.put(`/posts/${postToEdit.id}`, formData);
        console.log("Post updated successfully");
        toast.success("Post updated successfully.");
      } else {
        await axiosInstance.post("/posts/add", formData);
        toast.success("Post added successfully.");
        console.log("Post added successfully");
      }
      navigate("/profile");
      refreshUserPosts(userId);
    } catch (error) {
      setError("Failed to add service. Please try again.");
      console.error("Error occurred:", error);
    }
  };

  const handleBackToProfileButton = () => {
    navigate("/profile");
  };

  return (
    <div className="add-service-container">
      <button
        className="button edit-information"
        onClick={handleBackToProfileButton}
      >
        &larr; Назад кон профилот
      </button>
      <div className="add-service-form">
        <h2>{postToEdit ? "Измени ја задачата" : "Додади нова задача"}</h2>
        <form onSubmit={handleSubmit}>
          <select
            name="activityTypeId"
            value={formData.activityTypeId}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Избери тип на задача
            </option>
            {activityTypes.map((activityType) => (
              <option key={activityType.id} value={activityType.id}>
                {activityType.type}
              </option>
            ))}
          </select>

          <input
            type="number"
            name="price"
            placeholder="Task points"
            value={formData.price}
            onChange={handleInputChange}
            required
            className="form-input number-input"
          />

          <select
            name="petTypeId"
            value={formData.petTypeId}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Избери група на возраст
            </option>
            {petTypes.map((petType) => (
              <option key={petType.id} value={petType.id}>
                {petType.type}
              </option>
            ))}
          </select>

          <select
            name="petSize"
            value={formData.petSize}
            onChange={handleInputChange}
            required
            className="form-input"
          >
            <option value="" disabled>
              Избери ниво на значајност на задачата
            </option>
            <option value="Low_priority">Низок приоритет</option>
            <option value="Important">Среден приоритет</option>
            <option value="Critical">Висок приоритет</option>
          </select>

          <textarea
            name="description"
            placeholder="Додадете опис на задачата"
            value={formData.description}
            onChange={handleInputChange}
            required
            style={{
              width: "100%",
              padding: "15px",
              border: "2px solid #6F4E90",
              borderRadius: "12px",
            }}
          />
          <div>
            {formData.availabilities.map((availability, index) => (
              <div key={index} className="date-time-container">
                <div className="date-time-picker">
                  <label className="choose-picture-label">
                    Датум од:
                  </label>
                  <MobileDateTimePicker
                    onChange={(value) =>
                      handleDateTimeChange(index, "dateTimeFrom", value)
                    }
                  />
                </div>
                <div className="date-time-picker">
                  <label className="choose-picture-label">
                    Датум до:
                  </label>
                  <MobileDateTimePicker
                    onChange={(value) =>
                      handleDateTimeChange(index, "dateTimeTo", value)
                    }
                  />
                </div>
              </div>
            ))}
          </div>

          <button type="button" onClick={handleAddTime}>
            Додади време за извршување на задачата
          </button>

          <label htmlFor="picture" className="choose-picture-label">
            Избери слика за дополнителен опис на задачата
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
          {error && <p className="error-message">{error}</p>}

          <div style={{ marginTop: "50px" }}>
            <button type="submit">
              {postToEdit ? "Измени задача" : "Додади"}
            </button>
          </div>
        </form>
      </div>

      <br />
    </div>
  );
};

export default AddServiceForm;
