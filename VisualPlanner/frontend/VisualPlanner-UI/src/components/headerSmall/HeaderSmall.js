import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./HeaderSmall.css";
import Logo from "../../assets/visualplanner.png";
import LogInIcon from "../../assets/login.png";
import SearchBar from "../SearchBar";
import axiosInstance from "../../services/axiosInstance";

const HeaderSmall = ({ user }) => {
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    //refreshUser();
    window.location.reload();
    try {
      const response = await axiosInstance.post("/users/logout");

      if (!response.data) {
        throw new Error("Logout failed");
      }

      console.log("Logout successful");

      window.location.reload();
    } catch (error) {
      console.error("Logout error:", error.message);
    }
  };

  const handleClick = () => {
    setOpen(!open);
  };

  const closeMenu = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 950) {
        setOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <nav className="navbar-small">
      <Link to="/" className="nav-logo-small">
        <img src={Logo} alt="Logo" />
      </Link>
      <div onClick={handleClick} className="nav-icon-small">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links-small active" : "nav-links-small"}>
        <li className="nav-item-small">
          <Link to="/" className="nav-link-small" onClick={closeMenu}>
            Главна страна
          </Link>
        </li>
        <li className="nav-item-small">
          <Link to="/services" className="nav-link-small" onClick={closeMenu}>
            Задачи
          </Link>
        </li>
        <li className="nav-item-small">
          <Link to="/contact" className="nav-link-small" onClick={closeMenu}>
            Контакт
          </Link>
        </li>
        {user && (
          <React.Fragment>
            <li className="nav-item">
              <div className="userName">
                <h1> {user && <span>{user.name}</span>}</h1>
              </div>
            </li>
            <li className="nav-buttons">
              <Link to="/profile">
                <img src={LogInIcon} alt="LogIn" />
              </Link>
            </li>
            <li className="logout-btn">
              <button onClick={handleLogout}>Одлогирај се</button>
            </li>
          </React.Fragment>
        )}
        {/* <li className="nav-buttons-small">
          {user && (
            <Link to="/profile">
              <img src={LogInIcon} alt="LogIn" />
            </Link>
          )}
        </li> */}
        <li className="nav-buttons-small">
          {!user && (
            <div className="nav-buttons">
              <Link to="/login">
                <img src={LogInIcon} alt="LogIn" onClick={closeMenu} />
              </Link>
            </div>
          )}
        </li>
        {/* {!open ? (
          <li className="nav-search-small">
            <SearchBar></SearchBar>
          </li>
        ) : (
          ""
        )} */}
      </ul>
    </nav>
  );
};

export default HeaderSmall;
