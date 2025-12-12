import React, { useContext, useState } from "react";
import { assets } from "../assets/images/assets";
import "../assets/scss/NavigationBar.scss";
import { useClerk, UserButton, useUser } from "@clerk/clerk-react";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const appContext = useContext(AppContext);
  if (!appContext) throw new Error("NavigationBar must be used inside AppProvider");

  const {
    companyData,
    setCompanyData,
    setCompanyToken,
    setShowRecruiterLogin,
  } = appContext;

  const handleRecruiterLogin = () => {
    setShowRecruiterLogin(true);
    setOpen(false);
  };

  const handleUserLogin = () => {
    openSignIn();
    setOpen(false);
  };

  const logoutCompany = () => {
    setCompanyToken(null);
    setCompanyData(null);
    localStorage.removeItem("companyToken");
     navigate("/");
  };

  return (
    <nav className="glass-navbar">
      <div className="glass-navbar_left">
        <div className="glass-navbar_logo-container">
          <img src={assets.logo} alt="Logo" className="glass-navbar_logo" />
          <h2>Health Work Force</h2>
        </div>
      </div>

      <div className={`glass-navbar_menu ${open ? "open" : ""}`}>

        {/* ---------- IF USER (Clerk) LOGGED IN ---------- */}
        {user && !companyData && (
          <>
            <Link to="/applications" className="glass-navbar_menu-link">
              Applied Jobs
            </Link>

            <p className="glass-navbar_menu-user">
              Hi, {user.firstName} {user.lastName}
            </p>

            <UserButton />
          </>
        )}

        {/* ---------- IF RECRUITER (companyData) LOGGED IN ---------- */}
        {!user && companyData && (
          <>
            <Link to="/dashboard/add-job" className="glass-navbar_menu-link">
              Post Job
            </Link>
            <Link to="/dashboard/manage-jobs" className="glass-navbar_menu-link">
              My Jobs
            </Link>
            <Link to="/dashboard/view-applications" className="glass-navbar_menu-link">
              Applications
            </Link>

            <p className="glass-navbar_menu-user">Hi, {companyData.name}</p>
            

            <button className="glass-navbar_menu-btn" onClick={logoutCompany}>
              Logout
            </button>
          </>
        )}

        {/* ---------- IF NO ONE LOGGED IN ---------- */}
        {!user && !companyData && (
          <>
            <button
              className="glass-navbar_menu-btn"
              onClick={handleRecruiterLogin}
            >
              Recruiter Login
            </button>

            <button
              className="glass-navbar_menu-btn"
              onClick={handleUserLogin}
            >
              User Login
            </button>
          </>
        )}
      </div>

      <button
        className={`glass-navbar_burger ${open ? "active" : ""}`}
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