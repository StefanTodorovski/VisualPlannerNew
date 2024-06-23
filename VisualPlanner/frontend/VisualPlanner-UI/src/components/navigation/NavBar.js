import React, { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { Link } from "react-router-dom";
import "./NavBar.css";
import Logo from "../../assets/visualplanner.png";
import SignUpIcon from "../../assets/signup.png";
import LogInIcon from "../../assets/login.png";
import SearchBar from "../SearchBar";
import axiosInstance from "../../services/axiosInstance";

const Navbar = ({ user, refreshUser, backgroundColor }) => {
  const [open, setOpen] = useState(false);
  //const [user, setUser] = useState("");

  const handleLogout = async () => {
    localStorage.removeItem("userData");
    refreshUser();
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
    //   const User = JSON.parse(localStorage.getItem("userData"));

    //   if (User && User.name) {
    //     setUser(User);
    //   }
    let handleResize = () => {
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
    <nav className="navbar" style={{ backgroundColor: backgroundColor }}>
      <Link to="/" className="nav-logo">
        <img src={Logo} alt="Logo" />
      </Link>
      <div onClick={handleClick} className="nav-icon">
        {open ? <FiX /> : <FiMenu />}
      </div>
      <ul className={open ? "nav-links active" : "nav-links"}>
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/services" className="nav-link" onClick={closeMenu}>
            My tasks
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className="nav-link" onClick={closeMenu}>
            Contact
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
            <li className="logouAt-btn">
              <button onClick={handleLogout}>Logout</button>
            </li>
          </React.Fragment>
        )}
        {!user && (
          <React.Fragment>
            <li className="nav-buttons">
              <Link to="/login">
                <img src={LogInIcon} alt="LogIn" onClick={closeMenu} />
              </Link>
            </li>
          </React.Fragment>
        )}
        {/* {!open && (
          <li className="nav-search">
            <SearchBar></SearchBar>
          </li>
        )} */}
      </ul>
    </nav>
  );
};

export default Navbar;
