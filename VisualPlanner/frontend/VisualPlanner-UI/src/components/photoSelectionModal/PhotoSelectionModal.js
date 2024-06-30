import React from 'react';
import './PhotoSelectionModal.css';
import tsphoto1 from "../../assets/tsphoto1.gif";
import tsphoto2 from "../../assets/tsphoto2.gif";  // add more later 


const photos = [
  tsphoto1, tsphoto2
];

const PhotoSelectionModal = ({ isOpen, onClose, onSelectPhoto }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Избери слика</h2>
        <div className="photo-grid">
          {photos.map((photo, index) => (
            <div key={index} className="photo-item" onClick={() => onSelectPhoto(photo)}>
              <img src={photo} alt={`tsphoto${index + 1}`} />
            </div>
          ))}
        </div>
        <button onClick={onClose} className="close-button">Затвори</button>
      </div>
    </div>
  );
};

export default PhotoSelectionModal;
