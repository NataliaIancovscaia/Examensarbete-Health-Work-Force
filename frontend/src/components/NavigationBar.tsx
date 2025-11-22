import React, { useState } from "react";
import { assets } from "../assets/images/assets";
import "../assets/scss/NavigationBar.scss";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";

const NavigationBar: React.FC = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass-navbar">
      {/* LEFT — LOGO */}
      <div className="glass-navbar__left">
        <div className="glass-navbar__logo-container">
          <img src={assets.logo} alt="Logo" className="glass-navbar__logo" />
          <h2>Health Work Force</h2>
        </div>
      </div>

      {/* RIGHT — MENU (universal for both states) */}
      <div className={`glass-navbar__menu ${open ? "open" : ""}`}>

        {/* If logged in */}
        {user ? (
          <>
            <Link to="/applications" className="glass-navbar__menu-link">
              Applied Jobs
            </Link>

            <p className="glass-navbar__menu-user">
              Hi, {user.firstName} {user.lastName}
            </p>

            <UserButton />
          </>
        ) : (
          <>
            <button className="glass-navbar__menu-btn">Recruiter Login</button>
            <button
              onClick={() => openSignIn()}
              className="glass-navbar__menu-btn"
            >
              User Login
            </button>
          </>
        )}
      </div>

      {/* BURGER */}
      <button
        className={`glass-navbar__burger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>
    </nav>
  );
};

export default NavigationBar;

