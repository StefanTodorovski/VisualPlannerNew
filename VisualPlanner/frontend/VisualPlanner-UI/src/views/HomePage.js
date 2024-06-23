import React from "react";
import Header from "../components/header/Header";
import CardCategory from "../components/cardCategories/CardCategory";
import "../components/cardCategories/CardCategory.css";
import "../components/cardCategories/UsefulPetKnowledge.css";
import UsefulPetKnowledge from "../components/cardCategories/UsefulPetKnowledge";
import PetData from "../components/cardCategories/PetData";
import { Link } from "react-router-dom";

const HomePage = ({ onClick, user, refreshUser }) => {
  return (
    <div>
      <Header user={user} refreshUser={refreshUser} />
      <br />
      <br />
      <div className="custom-container">
        {/* First Row */}
        <div className="custom-row">
          <div className="custom-col">
            <CardCategory
              category="Plan tasks"
              imageUrl={require("../assets/Plantasks.png")}
              onClick={onClick}
              value="1"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Time management"
              imageUrl={require("../assets/time.png")}
              onClick={onClick}
              value="2"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Ideas for the day"
              imageUrl={require("../assets/Lightbulb.png")}
              onClick={onClick}
              value="3"
            />
          </div>
        </div>

        {/* Second Row */}
        <div className="custom-row">
          <div className="custom-col">
            <CardCategory
              category="Schedule Tasks"
              imageUrl={require("../assets/plan.png")}
              onClick={onClick}
              value="4"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Step by step"
              imageUrl={require("../assets/stepbystep.png")}
              onClick={onClick}
              value="5"
            />
          </div>
          <div className="custom-col">
            <CardCategory
              category="Feeling of accomplishment"
              imageUrl={require("../assets/accomplishment.png")}
              style={{ marginLeft: "3%" }}
              onClick={onClick}
              value="6"
            />
          </div>
        </div>
      </div>
      <div className="view-all-button-container">
        <Link to="/services" className="view-all-button">
          View All
        </Link>
      </div>{" "}
      <div className="post-container">
        <UsefulPetKnowledge petData={PetData} />
      </div>
    </div>
  );
};

export default HomePage;
