import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { assets } from '../assets/images/assets';
import { useContext, useEffect, useRef } from 'react';
import { AppContext } from '../context/AppContext';
import '../assets/scss/Dashboard.scss';

const Dashboard = () => {
  const navigate = useNavigate();

  const context = useContext(AppContext);
  if (!context) throw new Error('Dashboard must be used inside AppProvider');

  const { companyData } = context;

  const hasRedirected = useRef(false);
  useEffect(() => {
    if (companyData && !hasRedirected.current) {
      hasRedirected.current = true;
      navigate('/dashboard/manage-jobs', { replace: true });
    }
  }, [companyData, navigate]);

  return (
    <div className="recruiter-dashboard">
      <main className="dashboard-main">
        <aside className="dashboard-sidebar">
          <NavLink to="/dashboard/add-job" className="dashboard-link">
            <img src={assets.add_icon} alt="add icon" />
            <span>Post Job</span>
          </NavLink>

          <NavLink to="/dashboard/manage-jobs" className="dashboard-link">
            <img src={assets.home_icon} alt="home icon" />
            <span>Manage Jobs</span>
          </NavLink>

          <NavLink to="/dashboard/view-applications" className="dashboard-link">
            <img src={assets.person_tick_icon} alt="applications icon" />
            <span>Applications</span>
          </NavLink>
        </aside>

        <section className="dashboard-content">
          <Outlet />
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
