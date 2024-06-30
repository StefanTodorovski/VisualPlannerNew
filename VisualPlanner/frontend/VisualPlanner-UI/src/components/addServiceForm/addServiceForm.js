import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./addServiceForm.css";
import axiosInstance from "../../services/axiosInstance";
import { MobileDateTimePicker } from "@mui/x-date-pickers";
import { format, isPast } from "date-fns";
import { toast } from "react-toastify";
import PhotoSelectionModal from "../photoSelectionModal/PhotoSelectionModal"; // Import the modal

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

  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState("");

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

  const handlePhotoSelect = (photo) => {
    const convertImageToByteArray = (imageUrl) => {
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open("GET", imageUrl, true);
        xhr.responseType = "arraybuffer";
        xhr.onload = function () {
          if (this.status === 200) {
            const byteArray = new Uint8Array(this.response);
            resolve(Array.from(byteArray));
          } else {
            reject(new Error("Грешка при вчитување на слика."));
          }
        };
        xhr.send();
      });
    };

    convertImageToByteArray(photo)
      .then((byteArray) => {
        setSelectedPhoto(photo);
        setFormData({
          ...formData,
          picture: byteArray,
        });
      })
      .catch((error) => {
        console.error("Error converting image to byte array:", error);
      });

    setModalOpen(false);
  };

  const handleDateTimeChange = (index, field, value) => {
    const dateObject = value.$d;
    const isInPast = isPast(dateObject);
    if (isInPast) {
      setError("Датумот што го избравте е во минатото!");
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
    event.preventDefault();
    try {
      if (postToEdit) {
        await axiosInstance.put(`/posts/${postToEdit.id}`, formData);
        toast.success("Успешно променета задача.");
      } else {
        await axiosInstance.post("/posts/add", formData);
        toast.success("Успешно додадена задача.");
      }
      navigate("/profile");
      refreshUserPosts(userId);
    } catch (error) {
      setError("Грешка при додавање на задача. Обидете се повторно.");
      console.error("Error occurred:", error);
    }
  };

  const handleBackToProfileButton = () => {
    navigate("/profile");
  };

  const handleOpenModal = () => {
    setModalOpen(true);
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
                  <label className="choose-picture-label">Датум од:</label>
                  <MobileDateTimePicker
                    onChange={(value) =>
                      handleDateTimeChange(index, "dateTimeFrom", value)
                    }
                  />
                </div>
                <div className="date-time-picker">
                  <label className="choose-picture-label">Датум до:</label>
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
            Избери анимација за дополнителен опис на задачата
          </label>
          <button type="button" onClick={handleOpenModal}>
            Избери анимација
          </button>
          {selectedPhoto && (
            <div>
              <p>Избрана анимација за задачата:</p>
              <img src={selectedPhoto} alt="Selected" style={{ width: "200px", height: "200px" }} />
            </div>
          )}
          {error && <p className="error-message">{error}</p>}

          <div style={{ marginTop: "50px" }}>
            <button type="submit">
              {postToEdit ? "Измени задача" : "Додади"}
            </button>
          </div>
        </form>
      </div>

      <PhotoSelectionModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onSelectPhoto={handlePhotoSelect}
      />

      <br />
    </div>
  );
};

export default AddServiceForm;
