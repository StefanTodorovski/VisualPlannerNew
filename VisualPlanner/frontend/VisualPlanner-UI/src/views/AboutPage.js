import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import HeaderSmall from "../components/headerSmall/HeaderSmall";
import "./AboutPage.css";
import Rectangle3 from "../assets/Rectangle3.png";
import Rectangle4 from "../assets/Rectangle4.png";

const AboutPage = ({ user }) => {
  return (
    <div>
      {/*<Navbar />*/}
      <div className="rectangle-4">
        <img src={Rectangle4} alt="Decorative Shape" />
      </div>
      <HeaderSmall user={user} />
      <div className="about-page">
        <Container>
          <Row className="about-elements d-flex justify-content-center align-items-center">
            <Col md={6}>
              <h1 className="title">Welcome To Visual Planner for Kids!</h1>
              <p className="description">
                We're your one-stop destination for visualizing your kids' daily tasks.
                We offer displaying activities as well as their time slots for the kid to have an easier perspective
                of when the activities should be done. All of it done with simple yet keen-to-eye design with 
                interesting colorsets.
              </p>
              <div className="rectangle-3">
                <img src={Rectangle3} alt="Decorative Shape" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default AboutPage;
