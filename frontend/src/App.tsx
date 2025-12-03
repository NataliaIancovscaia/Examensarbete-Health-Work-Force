import React, { useContext } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import NavigationBar from "./components/NavigationBar";
import backgroundImg from "./assets/images/background1.jpg";
import "./assets/scss/App.scss";
import RecruterLogin from "./components/RecruterLogin";
import { AppContext } from "./context/AppContext";

const App: React.FC = () => {
   
const appContext = useContext(AppContext);
if (!appContext) throw new Error("App must be used inside AppProvider");

const{showRecruiterLogin}=appContext;
  return (
    <div className="app-container">
     
      <div className="glass-background">
        <img
          src={backgroundImg}
          alt="Background"
          className="background-img"
        />
      </div>

      <NavigationBar />
    
      <div className="app-content">
         {showRecruiterLogin&&<RecruterLogin/> }
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/apply-job/:id" element={<ApplyJob />} />
          <Route path="/applications" element={<Applications />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;

