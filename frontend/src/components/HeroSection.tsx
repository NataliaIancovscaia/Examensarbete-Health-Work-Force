import React, { useContext, useRef } from "react";
import { assets } from "../assets/images/assets";
import { AppContext } from "../context/AppContext";
import type { AppContextType } from "../context/AppContext";

const HeroSection: React.FC = () => {
  
  const appContext = useContext<AppContextType | null>(AppContext);
  if (!appContext) {
    throw new Error("HeroSection must be used inside AppProvider");
  }

  const { setSearchFilter, setIsSearched } = appContext;


  const titleRef = useRef<HTMLInputElement>(null);
  const locationRef = useRef<HTMLInputElement>(null);

  const onSearch = () => {
    
    if (!titleRef.current || !locationRef.current) return;

    setSearchFilter({
      title: titleRef.current.value,
      location: locationRef.current.value,
    });

    setIsSearched(true);
  };

  return (
    <section className="hero">
      <h1>
        Your medical skills can change lives — start where you're truly valued.
      </h1>
      <p>
        Search thousands of opportunities across hospitals, clinics, and care
        organizations.
      </p>

      <div className="hero_search">
        <div className="hero_input-box">
          <img src={assets.search_icon} alt="Search" />
          <input
            type="text"
            placeholder="Search for jobs"
            className="hero_input"
            ref={titleRef}
          />
        </div>

        <div className="hero_input-box">
          <img src={assets.location_icon} alt="Location" />
          <input
            type="text"
            placeholder="Location"
            className="hero_input"
            ref={locationRef}
          />
        </div>

        <button onClick={onSearch} className="hero_btn">
          Search
        </button>
      </div>
    </section>
  );
};

export default HeroSection;


