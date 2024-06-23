import React, { useEffect } from "react";
import petData from "../components/cardCategories/PetData";
import Navbar from "../components/navigation/NavBar";
import "./PostPage.css";

const PostPage = ({ user }) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div>
      <Navbar user={user} />
      <div className="post-page-container">
        {petData.map((post) => (
          <div key={post.id} className="post-page-card">
            {post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.serviceName}
                className="post-image"
              />
            ) : (
              <p>Loading...</p>
            )}
            <div className="post-text-section">
              <h3 className="post-page-title">{post.title}</h3>
              <p className="post-page-description">
                {renderContent(post.content)}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const renderContent = (content) => {
  return content
    .split("\n")
    .map((paragraph, index) => <p key={index}>{paragraph}</p>);
};

export default PostPage;
