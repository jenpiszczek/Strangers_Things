import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const handleLogout = () => {
    // Remove the token from sessionStorage and log the user out
    sessionStorage.removeItem("token");
    navigate("/");
  };

  // Check if there is a token in sessionStorage
  const token = sessionStorage.getItem("token");
  const isLoggedIn = !!token;

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="registerForm">
          <ul className="navbar-nav mr-auto">
            {!isLoggedIn && (
              <>
                <li className="nav-item active">
                  <Link to="/">
                    <button className="btn navButton">Login</button>
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup">
                    <button className="btn navButton">Sign Up</button>
                  </Link>
                </li>
              </>
            )}

            {/* Add a conditional logout button when the user is logged in */}
            {isLoggedIn && (
              <li className="nav-item">
                <button className="btn navButton" onClick={handleLogout}>
                  Logout
                </button>
                {/* Add your extra button here */}
                <Link to="/user">
                  <button className="btn navButton">Me</button>
                </Link>
                <Link to="/home">
                  <button className="btn navButton">Home</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default Header;