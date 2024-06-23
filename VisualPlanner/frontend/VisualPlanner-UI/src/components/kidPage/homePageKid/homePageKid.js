import React, { useState } from 'react';
import { HexColorPicker } from 'react-colorful'; // Import HexColorPicker from react-colorful
import './homePageKid.css'; // Example CSS file for styling
import avatar1 from "../../../assets/avatar1.png";
import avatar2 from "../../../assets/avatar2.png";
import avatar3 from "../../../assets/avatar3.png";
import avatar4 from "../../../assets/avatar4.png";
import avatar5 from "../../../assets/avatar5.png";
import games from "../../../assets/gamesgif.gif";
import tasks from "../../../assets/tasks.gif";

const HomePageKid = () => {
  const [selectedColor, setSelectedColor] = useState('#ffffff'); // Initial color, white
  const [showColorPicker, setShowColorPicker] = useState(false); // State to toggle color picker visibility
  const [showAvatarDialog, setShowAvatarDialog] = useState(false); // State to toggle avatar selection dialog
  const [selectedAvatar, setSelectedAvatar] = useState(avatar1); // Initial avatar

  const handleColorChange = (color) => {
    setSelectedColor(color);
    // You can add additional logic here, such as closing the color picker
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

  return (
    <div className="homepage-container" style={{ backgroundColor: selectedColor }}>
      <div className="avatar-container" onClick={toggleAvatarDialog}>
        {/* Display the selected avatar image */}
        <img src={selectedAvatar} alt="Avatar" className="avatar-image" />
        <div className="avatar-overlay"></div>
      </div>

      {/* Avatar selection dialog */}
      {showAvatarDialog && (
        <div className="avatar-dialog">
          <h2>Choose Your Avatar</h2>
          <div className="avatar-options">
            {/* Avatar options */}
            <img src={avatar1} alt="Avatar 1" onClick={() => handleAvatarSelection(avatar1)} />
            <img src={avatar2} alt="Avatar 2" onClick={() => handleAvatarSelection(avatar2)} />
            <img src={avatar3} alt="Avatar 3" onClick={() => handleAvatarSelection(avatar3)} />
            <img src={avatar4} alt="Avatar 4" onClick={() => handleAvatarSelection(avatar4)} />
            <img src={avatar5} alt="Avatar 5" onClick={() => handleAvatarSelection(avatar5)} />
          </div>
        </div>
      )}

      {/* Color circle to trigger color picker */}
      <div className="color-circle" style={{ backgroundColor: selectedColor }} onClick={toggleColorPicker}></div>

      {/* Conditionally render color picker */}
      {showColorPicker && (
        <div className="color-picker-container">
          <HexColorPicker
            color={selectedColor}
            onChange={handleColorChange}
            className="hex-color-picker"
          />
        </div>
      )}


    </div>
  );
}

export default HomePageKid;
