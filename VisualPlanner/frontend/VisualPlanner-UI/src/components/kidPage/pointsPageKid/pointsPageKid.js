import React, { useState, useEffect } from 'react';
import './pointsPageKid.css';
import rocketImage from '../../../assets/Rocket.png';
import arrowImage from '../../../assets/arrowicon.png';
import cloud1 from '../../../assets/cloud1.png';
import cloud2 from '../../../assets/cloud2.png';
import axiosInstance from '../../../services/axiosInstance';
import { useNavigate } from "react-router-dom";
import { MdArrowBack } from 'react-icons/md';
import { Link } from 'react-router-dom';


const PointsPageKid = () => {
  const [points, setPoints] = useState(0);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);

  useEffect(() => {
    const fetchPoints = async () => {
      if (userId) {
        try {
          const response = await axiosInstance.get(`/users/${userId}/points`);
          setPoints(response.data);
        } catch (error) {
          console.error("Error fetching user points:", error);
        }
      }
    };

    fetchPoints();
  }, [userId]);
  

  const rocketStyle = {
    bottom: `${(points / 500) * 100}%`,
    transition: 'bottom 1s ease-out'
  };

  const handleBackClick = () => {
    navigate("/points-page-kid");
  };

  return (
    <div className="points-page-container">
        <Link to="/home-page-kid" className="back-link">
          <MdArrowBack className="back-icon" />
        </Link>
        <div className="back-button" onClick={handleBackClick}>
        <img src={arrowImage} alt="Back" className="arrow-image" />
        </div>
      <div className="rocket-container">
        <img src={rocketImage} alt="Rocket" className="rocket" style={rocketStyle} />
        <div className="points-line">
          {[0, 100, 200, 300, 400, 500].map(value => (
            <div key={value} className="point-marker" style={{ bottom: `${(value / 500) * 100}%` }}>
              <span className="point-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
      <img src={cloud1} alt="Cloud" className="cloud cloud1" />
      <img src={cloud2} alt="Cloud" className="cloud cloud2" />
    </div>
  );
};

export default PointsPageKid;
