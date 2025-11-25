import { assets } from "../assets/images/assets";

const Footer = () => {
  return (
    <footer className="glass-footer">
      <div className="glass-footer__container">

  
        <div className="footer-col">
          <h3>About us</h3>
          <p>
            Health Work Force connects healthcare professionals with hospitals and
            medical organizations. A trusted platform for jobs, vacancies and 
            healthcare recruitment.
          </p>

          <div className="socials">
            <img src={assets.facebook_icon} alt="" />
            <img src={assets.twitter_icon} alt="" />
            <img src={assets.instagram_icon} alt="" />
           
          </div>
        </div>

       
        <div className="footer-col">
          <h3>Useful Links</h3>
          <ul>
            <li><a href="#">Find Jobs</a></li>
            <li><a href="#">For Employers</a></li>
            <li><a href="#">About Company</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>

       
        <div className="footer-col">
          <h3>Contact Info</h3>

          <p className="contact-row">
             24318 Disponentgatan 34 <br /> Malmo Sweden
          </p>

          <p className="contact-row">
           Tel. +46 521 122 22
          </p>

          <p className="contact-row">
            ✉ info@healthwork.com
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;


