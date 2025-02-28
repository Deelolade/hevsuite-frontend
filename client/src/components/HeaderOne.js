import React from "react";
import { Link } from "react-router-dom";
import dose from "../assets/dose.mp4";
import logo from "../assets/logo_white.png";

const HeaderOne = () => {
  return (
    <header className="absolute top-0 left-0 right-0 z-50 p-6">
      <nav className="container mx-auto px-8 py-6 flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          <img src={logo} alt="Logo" className="h-10" />
        </Link>
        <div className="flex items-center gap-8 text-white">
          <Link to="/register">Become a member</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/help">Help centre</Link>
          <Link
            to="/login"
            className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl"
          >
            Login for members
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default HeaderOne;
