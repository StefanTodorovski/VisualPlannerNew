import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./ServiceDetails.css";
import CommentsSection from "./CommentsSection";
import getPostById from "../../services/postsService/getTaskById";
import axiosInstance from "../../services/axiosInstance";
import { toast } from "react-toastify";

function ServiceDetailsPage({ user }) {
  const { id: postId } = useParams();
  const [service, setService] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState(null);

  const refreshService = async (id) => {
    try {
      const response = await getPostById(id);
      console.log(response);
      setService(response);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPostById(postId);
        setService(response);
      } catch (error) {
        console.error("Error fetching service:", error);
      }
    };

    if (postId) {
      fetchData();
    }
  }, [postId]);

  useEffect(() => {
    refreshService(postId);
  }, [postId]);

  if (!service) {
    return <div>Се вчитува...</div>;
  }

  const handleApply = async () => {
    if (selectedAvailability) {
      try {
        const requestData = {
          status: "ИСЧЕКУВАЊЕ",
        };

        const response = await axiosInstance.post(
          "/requests/create",
          requestData,
          {
            params: {
              availabilityId: selectedAvailability.id,
              userRequesterId: user.id,
            },
          }
        );

        toast.success("Успешно креирано барање!");
      } catch (error) {
        console.error("Error creating request:", error.message);
        alert("Грешка при креирање на барање. Обидете се повторно.");
      }
    } else {
      toast.error("Изберете време.");
    }
  };
  const excludedProperties = [
    "id",
    "reviews",
    "price",
    "petTypeId",
    "userId",
    "activityTypeId",
    "availabilities",
    "picture",
  ];
  const propertyChanges = {
    description: "Опис на задача",
    petSize: "Степен на важност",
    price: "Поени",
    activityType: "Тип на задача",
    user: "Оваа задача е креирана од :",
    petType: "Години на дете",
  };

  return (
    <div>
      <div className="service-card">
        <div className="service-details-container">
          <div className="service-details-image">
            {service.picture ? (
              <img
                src={`data:image/png;base64,${service.picture}`}
                alt={service.serviceName}
                width="150"
                height="150"
              />
            ) : (
              <p>Се вчитува...</p>
            )}
          </div>
          <div className="service-details-info">
            <div className="service-name">{service.serviceName}</div>
            <h1 className="service-description">
              {service.activityType} - {service.price}
            </h1>

            <div className="service-properties">
              {Object.entries(service).map(([key, value]) => {
                if (excludedProperties.includes(key)) {
                  return null;
                }
                const propertyName = propertyChanges[key] || key;
                return (
                  <div className="service-property" key={key}>
                    <div className="service-key">{propertyName}</div>
                    <div className="service-value">
                      {Array.isArray(value) ? value.join(", ") : value}
                    </div>
                  </div>
                );
              })}
            </div>
            <br />
            <div className="availabilities-section">
              <h4>Избери временски период во кој сакате да ја извршите задачата:</h4>
              <table className="availabilities-table">
                <thead>
                  <tr>
                    <th colSpan={2}>Од</th>
                    <th>До</th>
                  </tr>
                </thead>
                <tbody>
                  {service.availabilities.map((availability, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="radio"
                          id={`availability${index}`}
                          name="availability"
                          value={availability.availabilityId}
                          checked={selectedAvailability?.id === availability.id}
                          onChange={() => setSelectedAvailability(availability)}
                        />
                      </td>
                      <td>{availability.dateTimeFrom}</td>
                      <td>{availability.dateTimeTo}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <br />
            <button className="apply-button" onClick={handleApply}>
              Завршено
            </button>
          </div>
        </div>
      </div>
      <CommentsSection
        reviews={service.reviews}
        user={user}
        postId={postId}
        refreshService={refreshService}
      />{" "}
    </div>
  );
}

export default ServiceDetailsPage;
