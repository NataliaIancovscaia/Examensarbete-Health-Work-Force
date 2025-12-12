import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { assets } from "../assets/images/assets";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";


const Dashboard = () => {
  const navigate = useNavigate();
  const context = useContext(AppContext);
if (!context) throw new Error("Dashboard must be used inside AppProvider");

const { companyData,setCompanyData,setCompanyToken } = context;

const logout=()=>{
    setCompanyToken(null);
    localStorage.removeItem('companyToken');
    setCompanyData(null);
    navigate('/');
}



  return (
    <div className="dashboard-container">

   
      <header className="dashboard-header">
        <img onClick={() => navigate("/")}
             src={assets.logo} 
             alt="logo" 
             className="dashboard-logo"/>

         {companyData&&(

          <div className="dashboard-welcome">
        
          <p>Welcome,{companyData.name}</p>

          <div className="dashboard-profile">
            <img src={companyData.image} alt="Company icon"/>
            <div>
              <ul>
                <li onClick={logout}>Logout</li>
              </ul>
            </div>
          </div>
           
        
        </div>
          )} 
      </header>

     
      <main className="dashboard-main">
        <aside className="dashboard-sidebar">
          <NavLink to="/dashboard/add-job" className="dashboard-link">
            <img src={assets.add_icon} alt="add icon"/>
            <span> Add Job </span>
          </NavLink>

          <NavLink to="/dashboard/manage-jobs" className="dashboard-link">
            <img src={assets.home_icon} alt="home icon"/>
            <span> Manage Jobs </span>
          </NavLink>

          <NavLink to="/dashboard/view-applications" className="dashboard-link">
            <img src={assets.person_tick_icon} alt="person tick icon"/>
            <span> View Applications </span>
          </NavLink>
        </aside>

        <section className="dashboard-content">
          <Outlet/>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;


