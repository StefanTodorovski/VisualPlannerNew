import React from "react";
import "./CardCategory.css";

const CardCategory = ({ category, imageUrl, onClick, value }) => {
  const handleClick = () => {
    onClick(value);
  };

  return (
    //<Link to={`/services?activityTypeId=${value}`}>
    <div className="card" onClick={handleClick}>
      <img
        src={imageUrl}
        alt={category}
        className={
          category === "Pet Training" ? "training-image" : "card-image"
        }
      />
      <div className="card-content">
        <p className="category-name">{category}</p>
      </div>
    </div>
    //</Link>
  );
};

export default CardCategory;
