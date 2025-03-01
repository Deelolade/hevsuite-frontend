import React, { useState } from "react";
import { BsBell } from "react-icons/bs";
import { Link } from "react-router-dom";
import ProfileModal from "./ProfileModal";
import logo from "../assets/logo_white.png";
import avatar from "../assets/user.avif";

const HeaderOne = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);

  return (
    <>
      <header className="py-4  flex items-center justify-between">
        <Link to="/" className="text-3xl font-bold pl-16">
          <img src={logo} alt="logo" />
        </Link>
        <div className="flex items-center space-x-6 bg-black p-2 px-12 rounded-l-3xl pr-24 font-primary text-white">
          <Link to="/how-it-works">How it works</Link>
          <Link to="/help-centre">Help centre</Link>
          <Link to="/ask">Ask</Link>
          <div className="relative">
            <BsBell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
              2
            </span>
          </div>
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          >
            <img
              src={avatar}
              alt="User"
              className="w-12 h-12 rounded-full border-2 border-red-500"
            />
            <span className="text-red-500">Goodluck</span>
          </div>
        </div>
      </header>
      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </>
  );
};

export default HeaderOne;
