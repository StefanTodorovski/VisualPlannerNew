import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Header.css";
import Navbar from "../navigation/NavBar";
import RectangleBottom from "../../assets/rectangle-bottom.png";
import RectangleMiddle from "../../assets/rectangle-middle.png";
import kid_photo from "../../assets/image.png";
import RectangleNav from "../../assets/rectangle-nav.png";
import { Link } from "react-router-dom";

const Header = ({ user, refreshUser }) => {
  return (
    <div>
      <div className="rectangle-nav">
        <img src={RectangleNav} alt="rectangle-nav" />
      </div>

      <Navbar user={user} refreshUser={refreshUser}></Navbar>
      <div></div>
      <div className="header-page">
        <Container>
          <Row className="banner-elements">
            <Col md={6}>
              <div className="rectangle-middle">
                <img src={RectangleMiddle} alt="rectangle-middle" />
              </div>
              <h1 className="title">Организирајте го вашиот ден!</h1>
              <p className="description">
              Ако имате план и го следите, значи дека имате повеќе визија, јасен пат и ќе останете среќна и остварена личност која секогаш ќе биде на време и ќе се забавува
              </p>
              <Link to="/services">
                {" "}
                <button className="explore-button">Истражи повеќе</button>
              </Link>
              <div className="rectangle-bottom">
                <img src={RectangleBottom} alt="rectangle-bottom" />
              </div>
            </Col>
            <Col md={6}>
            <div className="woman-with-kid">
                <img src={kid_photo} alt="woman" />
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};

export default Header;
