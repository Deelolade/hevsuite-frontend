import React from "react";
import { Link } from "react-router-dom";
import instagram from "../assets/icons/insta.png";
import twitter from "../assets/icons/twitter.png";
import facebook from "../assets/icons/facebook.png";
import linkedIn from "../assets/icons/linkedn.png";

const Footer = () => {
  return (
    <footer className="py-8 border-t">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center gap-4 px-12">
          <span>Follow us</span>
          <div className="flex gap-4">
            <Link to="#" className="text-gray-600 hover:text-black">
              <img src={facebook} alt="facebook" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-black">
              <img src={twitter} alt="twitter" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-black">
              <img src={instagram} alt="instagram" />
            </Link>
            <Link to="#" className="text-gray-600 hover:text-black">
              <img src={linkedIn} alt="linkedin" />
            </Link>
          </div>
          <div className="flex gap-8 pl-12 justify-between">
            <Link to="/terms" className="text-gray-600 hover:text-black">
              Policies
            </Link>
            <Link to="/about" className="text-gray-600 hover:text-black">
              HH Club & Founder
            </Link>
          </div>
        </div>

        <div className="text-gray-600 pr-24">
          2024 Hazor Group (Trading as HH Club)
        </div>
      </div>
    </footer>
  );
};

export default Footer;
