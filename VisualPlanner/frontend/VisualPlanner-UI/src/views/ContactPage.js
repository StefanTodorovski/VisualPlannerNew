import React from "react";
import NavBar from "../components/navigation/NavBar";
import { Col, Row } from "react-bootstrap";
import {
  FaPhone,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import "./ContactPage.css";

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const ContactPage = ({ user, refreshUser }) => {
  return (
    <div>
      <NavBar user={user} refreshUser={refreshUser} backgroundColor="#A8E1A0" />
      <div className="contact-container">
        <h1 className="contact-title">Контактирајте не!</h1>
        <h4 className="contact-message">
          Имате прашања? Напишете ни порака преку е-маил!
        </h4>
      </div>
      <div className="contact-form-section">
        <div className="contact-form-container">
          <Row className="form-row">
            <Col className="first-col">
              <Row className="icon-row">
                <h2>Информации за контакт</h2>
              </Row>
              <Row className="icon-row">
                <Col xs="auto" className="icon-column">
                  <FaPhone size={20} />
                </Col>
                <Col className="text-column">+389 78 400 388</Col>
              </Row>
              <Row className="icon-row">
                <Col xs="auto" className="icon-column">
                  <FaEnvelope size={20} />
                </Col>
                <Col>visual_planner_customersupport@gmail.com</Col>
              </Row>
              <Row className="icon-row">
                <Col xs="auto" className="icon-column">
                  <FaMapMarkerAlt size={20} />
                </Col>
                <Col>ul. Dame Gruev, 32, Skopje, North Macedonia</Col>
              </Row>
              <Row className="icon-row">
                <Col xs="auto">
                  <a
                    href="https://www.facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="white-icon"
                  >
                    <FaFacebook size={30} />
                  </a>
                  <a
                    href="https://www.twitter.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="white-icon"
                  >
                    <FaTwitter size={30} />
                  </a>
                  <a
                    href="https://www.instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="white-icon"
                  >
                    <FaInstagram size={30} className="white-icon" />
                  </a>
                  <a
                    href="https://www.youtube.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="white-icon"
                  >
                    <FaYoutube size={30} className="white-icon" />
                  </a>
                </Col>
              </Row>
            </Col>
            <Col className="second-col">
              <MapContainer
                center={[41.9981, 21.4254]}
                zoom={13}
                style={{ height: "100%", width: "100%", borderRadius: "15px" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                />
                <Marker position={[41.9981, 21.4254]}>
                  <Popup>ul. Dame Gruev, 32, Skopje, North Macedonia</Popup>
                </Marker>
              </MapContainer>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
