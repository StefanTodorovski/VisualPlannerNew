import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./views/HomePage";
import AboutPage from "./views/AboutPage";
import ContactPage from "./views/ContactPage";
import Footer from "./components/footer/Footer";
import RegistrationPage from "./views/RegistrationPage";
import ScrollToTop from "./components/ScrollToTop/ScrollToTop";
import LoginPage from "./views/LoginPage";
import AddServicePage from "./views/AddServicePage";
import ServicesPage from "./views/ServicesPage";
import ServiceDetailsPage from "./views/ServiceDetailsPage";
import PostPage from "./views/PostPage";
import ProfileDetailsPage from "./views/ProfileDetailsPage";
import getAllActivityTypes from "../src/services/activityType/getAllActivityTypes.js";
import getAllPosts from "./services/postsService/getAllTasks.js";
import EditProfilePage from "./views/EditProfilePage";
import getUserProfile from "./services/userService/getUserProfile.js";
import getUserPosts from "./services/userService/getUserPosts.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getAllKidAgeGroups from "./services/KidAgeGroup/getAllAgeGroups.js";
import HomePageKid from "./components/kidPage/homePageKid/homePageKid.js";
import PointsPageKid from "./components/kidPage/pointsPageKid/pointsPageKid.js";

function App() {
  const [activityTypes, setActivityTypes] = useState([]);
  const [petTypes, setPetTypes] = useState([]);
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [activityTypeId, setActivityTypeId] = useState(null);
  const [user, setUser] = useState(null);
  const [userPosts, setUserPosts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [userPostRequests, setUserPostRequests] = useState([]);
  useEffect(() => {
    const fetchActivityTypes = async () => {
      try {
        const response = await getAllActivityTypes();
        setActivityTypes(response);
      } catch (error) {
        console.error("Error fetching activity types:", error);
      }
    };

    fetchActivityTypes();
  }, []);

  useEffect(() => {
    const fetchPetTypes = async () => {
      try {
        const response = await getAllKidAgeGroups();
        setPetTypes(response);
      } catch (error) {
        console.error("Error fetching pet types:", error);
      }
    };
    fetchPetTypes();
  }, []);
  const refreshUserPostRequests = async (userId) => {
    try {
    } catch (error) {}
  };
  const refreshPosts = async (page, activityTypeId) => {
    try {
      const response = await getAllPosts(page - 1, activityTypeId);
      setPosts(response.content);
      setTotalPages(response.totalPages);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const refreshUser = async (id) => {
    try {
      const response = await getUserProfile(id);
      setUser(response);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  const refreshUserPosts = async (id) => {
    try {
      const response = await getUserPosts(id);
      setUserPosts(response);
    } catch (error) {
      console.error("Error fetching user posts:", error);
    }
  };

  useEffect(() => {
    const userDataString = localStorage.getItem("userData");
    if (userDataString) {
      const userDataObject = JSON.parse(userDataString);
      const userId = userDataObject.id;
      setUserId(userId);
      refreshUser(userId);
      refreshUserPosts(userId);
    }
  }, []);

  const handleActivityTypeClick = (id) => {
    setCurrentPage(1);
    setActivityTypeId(id === activityTypeId ? null : id);
  };

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route
          path="/"
          element={
            <HomePage
              onClick={handleActivityTypeClick}
              user={user}
              refreshUser={refreshUser}
            />
          }
          exact
        />
        <Route path="/about" element={<AboutPage user={user} />} exact />
        <Route path="/home-page-kid" element={<HomePageKid user={user} />} exact />
        <Route path="/points-page-kid" element={<PointsPageKid user={user} />} exact />
        <Route
          path="/contact"
          element={<ContactPage user={user} refreshUser={refreshUser} />}
          exact
        />
        <Route path="/register" element={<RegistrationPage />} exact />
        <Route
          path="/login"
          element={<LoginPage refreshUser={refreshUser} />}
          exact
        />
        <Route
          path="/addService"
          element={
            <AddServicePage
              activityTypes={activityTypes}
              petTypes={petTypes}
              userId={userId}
              user={user}
              refreshUserPosts={refreshUserPosts}
            />
          }
          exact
        />
        <Route
          path="/services"
          element={
            <ServicesPage
              activityTypes={activityTypes}
              posts={posts}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
              activityTypeId={activityTypeId}
              refreshPosts={refreshPosts}
              handleActivityTypeClick={handleActivityTypeClick}
              user={user}
            />
          }
          exact
        />
        <Route
          path="/details/:id"
          element={<ServiceDetailsPage user={user} />}
        />
        <Route path="/posts" element={<PostPage user={user} />} exact />
        <Route
          path="/profile"
          element={
            <ProfileDetailsPage
              user={user}
              userPosts={userPosts}
              refreshUserPosts={refreshUserPosts}
              userId={userId}
            />
          }
          exact
        />
        <Route path="/edit" element={<EditProfilePage user={user} />} exact />
      </Routes>
      <ToastContainer />
    </Router>
  );
}

export default App;
