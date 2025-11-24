
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import ApplyJob from "./pages/ApplyJob";
import Applications from "./pages/Applications";
import NavigationBar from "./components/NavigationBar";


import backgroundImg from "./assets/images/background1.jpg";

import "./assets/scss/App.scss";

const App: React.FC = () => {
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

