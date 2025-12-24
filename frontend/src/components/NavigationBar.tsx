import React, { useContext, useState } from 'react';
import { assets } from '../assets/images/assets';
import '../assets/scss/NavigationBar.scss';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const NavigationBar: React.FC = () => {
  const navigate = useNavigate();
  const { openSignIn } = useClerk();
  const { user } = useUser();
  const [open, setOpen] = useState(false);

  const appContext = useContext(AppContext);
  if (!appContext)
    throw new Error('NavigationBar must be used inside AppProvider');

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
    localStorage.removeItem('companyToken');
    navigate('/');
  };

  return (
    <nav className="glass-navbar">
      <div className="glass-navbar_left">
        <div
          className="glass-navbar_logo-container"
          onClick={() =>
            companyData ? navigate('/dashboard/manage-jobs') : navigate('/')
          }
        >
          <img src={assets.logo} alt="Logo" className="glass-navbar_logo" />
          <h2>Health Work Force</h2>
        </div>
      </div>

      <div className={`glass-navbar_menu ${open ? 'open' : ''}`}>
        {user && !companyData && (
          <>
            <Link
              to="/applications"
              className="glass-navbar_btn"
              onClick={() => setOpen(false)}
            >
              Applied Jobs
            </Link>

            <div className="glass-navbar_btn glass-navbar_btn-static">
              Hi, {user.firstName} {user.lastName}
            </div>

            <div className="glass-navbar_user-button">
              <UserButton />
            </div>
          </>
        )}

        {!user && companyData && (
          <>
            <div className="glass-navbar_btn glass-navbar_btn-static">
              Hi, {companyData.name}
            </div>

            <img
              src={companyData.image}
              alt="Recruiter Logo"
              className="recruiter-avatar"
            />

            <button className="glass-navbar_btn" onClick={logoutCompany}>
              Logout
            </button>
          </>
        )}

        {!user && !companyData && (
          <>
            <button className="glass-navbar_btn" onClick={handleRecruiterLogin}>
              Recruiter Login
            </button>

            <button className="glass-navbar_btn" onClick={handleUserLogin}>
              User Login
            </button>
          </>
        )}
      </div>

      <button
        className={`glass-navbar_burger ${open ? 'active' : ''}`}
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
