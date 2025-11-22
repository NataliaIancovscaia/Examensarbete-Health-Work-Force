import { assets } from "../assets/images/assets";

const HeroSection = () => {
  return (
    <section className="hero">
      <h1>Your medical skills can change lives — start where you’re truly valued.</h1>
      <p>Search thousands of opportunities across hospitals, clinics, and care organizations.</p>

      <div className="hero__search">
        <div className="hero__input-box">
          <img src={assets.search_icon} alt="Search" />
          <input type="text" placeholder="Search for jobs" className="hero__input" />
        </div>

        <div className="hero__input-box">
          <img src={assets.location_icon} alt="Location" />
          <input type="text" placeholder="Location" className="hero__input" />
        </div>

        <button className="hero__btn">Search</button>
      </div>
    </section>
  );
};

export default HeroSection;


