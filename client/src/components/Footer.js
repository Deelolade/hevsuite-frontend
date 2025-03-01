import React from "react";
import { Link } from "react-router-dom";
import instagram from "../assets/icons/insta.png";
import twitter from "../assets/icons/twitter.png";
import facebook from "../assets/icons/facebook.png";
import linkedIn from "../assets/icons/linkedn.png";

const Footer = () => {
  return (
    <footer className="py-8 border-t bg-gray-50 text-gray-600">
      {/* Container */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        {/* Flex Layout for Content */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-8 sm:gap-0">
          {/* Left Section: Follow Us & Links */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-8">
            {/* Follow Us */}
            <div className="flex items-center gap-4">
              <span className="font-medium">Follow us</span>
              <div className="flex gap-4">
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={facebook} alt="facebook" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={twitter} alt="twitter" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={instagram} alt="instagram" className="w-6 h-6" />
                </Link>
                <Link to="#" className="hover:text-black transition-colors">
                  <img src={linkedIn} alt="linkedin" className="w-6 h-6" />
                </Link>
              </div>
            </div>

            {/* Links */}
            <div className="flex gap-8 sm:gap-4">
              <Link to="/terms" className="hover:text-black transition-colors">
                Policies
              </Link>
              <Link to="/about" className="hover:text-black transition-colors">
                HH Club & Founder
              </Link>
            </div>
          </div>

          {/* Right Section: Copyright Text */}
          <div className="text-sm sm:text-base text-right">
            © 2024 Hazor Group (Trading as HH Club)
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
