import React, { useState } from "react";
import { assets } from "../assets/images/assets";
import "../assets/scss/NavigationBar.scss";

const NavigationBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  return (
    <nav className="glass-navbar">
      <div className="glass-navbar__left">
        <div className="glass-navbar__logo-container">
          <img src={assets.logo} alt="Logo" className="glass-navbar__logo" />
          <h2 >Health Work Force</h2>
        </div>
      </div>

      <button
        className={`glass-navbar__burger ${open ? "active" : ""}`}
        onClick={() => setOpen(!open)}
      >
        <span />
        <span />
        <span />
      </button>

      <div className={`glass-navbar__links ${open ? "open" : ""}`}>
        <button className="glass-navbar__btn">Recruiter Login</button>
        <button className="glass-navbar__btn">User Login</button>
      </div>
    </nav>
  );
};

export default NavigationBar;
