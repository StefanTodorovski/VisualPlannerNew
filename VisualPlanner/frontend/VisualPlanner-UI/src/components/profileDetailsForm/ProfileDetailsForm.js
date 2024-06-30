import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./ProfileDetailsForm.css";
import axiosInstance from "../../services/axiosInstance";
import { useNavigate } from "react-router-dom";
import getUserPosterRequests from "../../services/userService/getUserTaskRequests";
import getUserRequesterRequests from "../../services/userService/getUserRequesterRequests";
import acceptRequest from "../../services/requestService/acceptRequest";
import declineRequest from "../../services/requestService/declineRequest";
import { toast } from "react-toastify";
import EditProfileForm from "../editProfileForm/EditProfileForm";

const ProfileDetailsForm = ({ user, userPosts, refreshUserPosts }) => {
  const navigate = useNavigate();
  const [postRequestsPoster, setPostRequestsPosters] = useState([]);
  const [postRequestsRequester, setPostRequestsRequester] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const fetchPostRequestsPoster = async (userId) => {
    try {
      const response = await getUserPosterRequests(userId);
      setPostRequestsPosters(response);
    } catch (error) {
      console.error("Error fetching post requests:", error);
    }
  };

  const fetchPostRequestsRequester = async (userId) => {
    try {
      const response = await getUserRequesterRequests(userId);
      setPostRequestsRequester(response);
    } catch (error) {
      console.error("Error fetching post requests:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);
    }
  }, [user]);

  const handleAccept = async (requestId, availabilityId) => {
    try {
      const response = await acceptRequest(requestId, availabilityId);
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);
      toast.success("You successfully accepted the request.");
    } catch (error) {
      console.error("Error accepting request:", error.message);
    }
  };

  const handleDecline = async (requestId) => {
    try {
      const response = await declineRequest(requestId);
      console.log("Decline response:", response);
      fetchPostRequestsPoster(user.id);
      fetchPostRequestsRequester(user.id);

      toast.success("You successfully declined the request.");
    } catch (error) {
      console.error("Error declining request:", error.message);
    }
  };

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    try {
      await axiosInstance.post("/users/logout");
      console.log("Logout successful");
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handlePostDelete = async (postId) => {
    try {
      await axiosInstance.delete(`/posts/${postId}`);
      refreshUserPosts(user.id);
      toast.success("Post deleted successfully");
    } catch (error) {
      console.error("Delete error:", error.message);
    }
  };

  const handleEdit = (post) => {
    navigate("/addService", { state: { post } });
  };

  if (!user) {
    return (
      <div className="profile-details-container">
        <div className="profile-header">
          Want to view your profile?
          <Link to="/login" className="button">
            Login first.
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="profile-details-container">
      <div className="details-flex">
        {editMode ? (
          <div>
            <EditProfileForm user={user} onCancel={toggleEditMode} />
            <button
              className="button edit-information"
              onClick={toggleEditMode}
            >
              &larr; Back to your profile page
            </button>
          </div>
        ) : (
          <div className="profile-info">
            <h2>Информации за профилот</h2>
            <div className="profile-header">
              {user && user.picture ? (
                <img
                  src={`data:image/png;base64,${user.picture}`}
                  alt={user.serviceName}
                />
              ) : (
                <p>Немате прикачено слика</p>
              )}
            </div>

            {user && (
              <>
                <p>
                  <strong>Име и презиме</strong> {`${user.name} ${user.surname}`}
                </p>
                <p>
                  <strong>Телефонски број:</strong> {user.phone}
                </p>
                <p>
                  <strong>Е-пошта:</strong> {user.email}
                </p>
                <p>
                  <strong>Адреса на живеење:</strong> {user.location}
                </p>
              </>
            )}
            <br />
            <br />
            <button
              className="button edit-information"
              onClick={toggleEditMode}
            >
              Изменете ги податоците
            </button>
            <button className="button logout" onClick={handleLogout}>
              Одлогирај се
            </button>
            <br />
          </div>
        )}

        <div className="services-details">
          <h2>Моментално креирани задачи</h2>
          <div className="services-list">
            {userPosts.length === 0 ? (
              <p>Сеуште немате креирано задача. Креирајте ја тука !</p>
            ) : (
              userPosts.map((service) => (
                <div key={service.id} className="service-item">
                  <Link to={`/details/${service.id}`}>
                    {service.picture ? (
                      <img
                        src={`data:image/png;base64,${service.picture}`}
                        alt={service.serviceName}
                        className="service-image"
                      />
                    ) : (
                      <p>Се вчитува...</p>
                    )}
                  </Link>
                  <h4>{service.activityTypeName}</h4>
                  <p>{service.description}</p>
                  <button
                    className="button edit"
                    onClick={() => handleEdit(service)}
                  >
                    Измени
                  </button>
                  <button
                    className="button delete"
                    onClick={() => handlePostDelete(service.id)}
                  >
                    Избриши
                  </button>
                </div>
              ))
            )}
          </div>
          <Link to="/addService" className="button add-service">
            Додади нова задача +
          </Link>
        </div>
        <div className="requests-section">
          <h2>Непрегледани задачи</h2>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Креирано барање од</th>
                <th>Задача</th>
                <th>Време</th>
                <th>Акции</th>
              </tr>
            </thead>
            <tbody>
              {postRequestsPoster.length === 0 ? (
                <tr>
                  <td colSpan="4">Моментално нема непрегледани задачи</td>
                </tr>
              ) : (
                postRequestsPoster.map((request) => (
                  <tr key={request.id}>
                    <td>{request.userRequesterName}</td>
                    <td>
                      <Link to={`/details/${request.postId}`}>
                        {request.postName}
                      </Link>
                    </td>
                    <td> {request.availabilityTime}</td>
                    <td>
                      <button
                        className="button accept"
                        onClick={() =>
                          handleAccept(
                            request.requestId,
                            request.availabilityId
                          )
                        }
                      >
                        Одобри
                      </button>
                      <button
                        className="button decline"
                        onClick={() => handleDecline(request.requestId)}
                      >
                        Одбиј
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="requests-section">
          <h2>Прегледани задачи</h2>
          <table className="requests-table">
            <thead>
              <tr>
                <th>Креирано од</th>
                <th>Задача</th>
                <th>Време</th>
                <th>Статус</th>
              </tr>
            </thead>
            <tbody>
              {postRequestsRequester.length === 0 ? (
                <tr>
                  <td colSpan="4">No requests on other posts found.</td>
                </tr>
              ) : (
                postRequestsRequester.map((request) => (
                  <tr key={request.id}>
                    <td>{request.userPosterName}</td>
                    <td>
                      <Link to={`/details/${request.postId}`}>
                        {request.postName}
                      </Link>
                    </td>
                    <td>{request.availabilityTime} </td>
                    <td className={`status-${request.status.toLowerCase()}`}>
                      {request.status}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfileDetailsForm;
