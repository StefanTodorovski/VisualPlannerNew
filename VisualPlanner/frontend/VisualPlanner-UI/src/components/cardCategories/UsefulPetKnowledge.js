import { Link } from "react-router-dom";
import { useState } from "react";

const UsefulPetKnowledge = ({ petData }) => {
  const [showAll, setShowAll] = useState(false);

  return (
    <div className="post-container">
      <h2 className="section-title">Useful Knowledge</h2>

      <div className="post-card-container">
        {petData.map((post, index) => (
          <div
            key={post.id}
            className="post-card"
            style={{ display: showAll || index < 3 ? "block" : "none" }}
          >
            <img src={post.imageUrl} alt={post.title} className="card-image" />
            <div className="text-section">
              <h3 className="post-title">{post.title}</h3>
              <p className="post-description">{post.content}</p>
            </div>
          </div>
        ))}
      </div>

      <Link to="/posts" className="button-view-more">
        View More
      </Link>
    </div>
  );
};

export default UsefulPetKnowledge;
