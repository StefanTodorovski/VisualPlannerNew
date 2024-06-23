import React, { useState, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import './homePageKid.css';
import avatar1 from "../../../assets/avatar1.png";
import avatar2 from "../../../assets/avatar2.png";
import avatar3 from "../../../assets/avatar3.png";
import avatar4 from "../../../assets/avatar4.png";
import avatar5 from "../../../assets/avatar5.png";
import games from "../../../assets/gamesgif.gif";
import tasks from "../../../assets/tasks.gif";
import points from "../../../assets/points.gif";
import robotGif from "../../../assets/robot.gif";  // Assuming you have this gif in the assets folder
import axios from 'axios';
import robotAudio from "../../../assets/robot.mp3";  // Assuming you have this audio file in the assets folder
import axiosInstance from '../../../services/axiosInstance';

const HomePageKid = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showAvatarDialog, setShowAvatarDialog] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(avatar1);
  const [showRobotDialog, setShowRobotDialog] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
      const parsedUserData = JSON.parse(userData);
      setUserId(parsedUserData.id);
    } else {
      console.log("No user data found in localStorage");
    }
  }, []);  // Empty dependency array ensures this runs only once after the initial render

  const handleColorChange = (color) => {
    setSelectedColor(color);
  };

  const toggleColorPicker = () => {
    setShowColorPicker(!showColorPicker);
  };

  const toggleAvatarDialog = () => {
    setShowAvatarDialog(!showAvatarDialog);
  };

  const handleAvatarSelection = (avatarUrl) => {
    setSelectedAvatar(avatarUrl);
    toggleAvatarDialog();
  };

  const handleGamesClick = async () => {
    if (userId) {
      try {
        const response = await axiosInstance.get(`/users/${userId}/points`);
        const points = response.data;
        if (points === 0) {
          setShowRobotDialog(true);
          const audio = new Audio(robotAudio);
          audio.play();
          setTimeout(() => {
            setShowRobotDialog(false);
          }, 6500); 
        } else {
          window.location.href = "/games";
        }
      } catch (error) {
        console.error("Error fetching user points:", error);
      }
    } else {
      console.error("User ID not set");
    }
  };

  return (
    <div className="homepage-container" style={{ backgroundColor: selectedColor }}>
      <div className="avatar-container" onClick={toggleAvatarDialog}>
        <img src={selectedAvatar} alt="Avatar" className="avatar-image" />
        <div className="avatar-overlay"></div>
      </div>

      {showAvatarDialog && (
        <div className="avatar-dialog">
          <h2>Choose Your Avatar</h2>
          <div className="avatar-options">
            <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarSelection(avatar1)} />
            <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarSelection(avatar2)} />
            <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarSelection(avatar3)} />
            <img src={avatar4} alt="Avatar 4" onClick={() => handleAvatarSelection(avatar4)} />
            <img src={avatar5} alt="Avatar 5" onClick={() => handleAvatarSelection(avatar5)} />
          </div>
        </div>
      )}

      <div className="color-circle" style={{ backgroundColor: selectedColor }} onClick={toggleColorPicker}></div>

      {showColorPicker && (
        <div className="color-picker-container">
          <HexColorPicker
            color={selectedColor}
            onChange={handleColorChange}
            className="hex-color-picker"
          />
        </div>
      )}

      <div className="middle-columns">
        <div className="side-column" onClick={handleGamesClick}>
          <img src={games} alt="Games" className="side-gif" />
        </div>
        <div className="side-column">
          <img src={tasks} alt="Tasks" className="side-gif" />
        </div>
        <div className="side-column">
          <img src={points} alt="Points" className="side-gif" />
        </div>
      </div>

      {showRobotDialog && (
        <div className="robot-dialog">
          <img src={robotGif} alt="Robot" />
        </div>
      )}
    </div>
  );
};

export default HomePageKid;
