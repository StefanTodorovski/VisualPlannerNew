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
    return <div>Loading...</div>;
  }

  const handleApply = async () => {
    if (selectedAvailability) {
      try {
        const requestData = {
          status: "PENDING",
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

        toast.success("Request successfully created!");
      } catch (error) {
        console.error("Error creating request:", error.message);
        alert("Error creating request. Please try again later.");
      }
    } else {
      toast.error("Please select an availability");
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
    description: "Task description",
    petSize: "Importance level",
    price: "Points",
    activityType: "Task type",
    user: "This task is created by:",
    petType: "Kid age",
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
              <p>Loading...</p>
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
              <h4>Check this if you have done this task in the provided time period:</h4>
              <table className="availabilities-table">
                <thead>
                  <tr>
                    <th colSpan={2}>From</th>
                    <th>To</th>
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
              Done
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
