import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_white.png";
import avatar from "../assets/user.avif";
import { FaSignOutAlt } from "react-icons/fa";

const HeaderOne = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-50  backdrop-blur-sm">
      {/* Navbar */}
      <nav className="container mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-white text-3xl font-bold">
          <img src={logo} alt="Logo" className="h-10 sm:h-12" />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-black text-2xl focus:outline-none"
          >
            {isMenuOpen ? "×" : "☰"} {/* Hamburger icon or close icon */}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8 text-white">
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

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden fixed inset-0 bg-white z-50`}
        >
          <div className="p-6 bg-white min-h-screen">
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-8">
              <Link to="/">
                <img src={logo} alt="Logo" className="h-10" />
              </Link>
              <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
                ×
              </button>
            </div>

            {/* Menu Items */}
            <div className="space-y-6">
              <Link to="/" className="block text-black font-medium">
                Home
              </Link>

              {/* My Account Dropdown */}
              <div className="space-y-4">
                <div
                  className="flex justify-between items-center cursor-pointer"
                  onClick={() =>
                    setIsAccountDropdownOpen(!isAccountDropdownOpen)
                  }
                >
                  <span className="text-black font-medium">My Account</span>
                  <span className="text-xl">
                    {isAccountDropdownOpen ? "∧" : "∨"}
                  </span>
                </div>
                <div
                  className={`${
                    isAccountDropdownOpen ? "block" : "hidden"
                  } pl-4 space-y-4`}
                >
                  <Link to="/account/profile" className="block text-black">
                    Account Profile
                  </Link>
                  <Link to="/account/events" className="block text-black">
                    Your Events
                  </Link>
                  <Link to="/account/support" className="block text-black">
                    Support Join Request
                  </Link>
                  <Link
                    to="/account/notifications"
                    className="block text-black"
                  >
                    Notifications
                  </Link>
                  <Link to="/account/referrals" className="block text-black">
                    Referrals
                  </Link>
                  <Link to="/account/settings" className="block text-black">
                    Settings
                  </Link>
                  <Link to="/account/activity" className="block text-black">
                    Activity Log
                  </Link>
                </div>
              </div>

              <Link to="/how-it-works" className="block text-black font-medium">
                How it works
              </Link>
              <Link to="/ask" className="block text-black font-medium">
                Ask
              </Link>
              <Link to="/help" className="block text-black font-medium">
                Help centre
              </Link>

              {/* User Section */}
              <div className="pt-6 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full"
                  />
                  <span className="text-black">Goodluck</span>
                </div>
                <button className="text-xl" onClick={handleLogout}>
                  <FaSignOutAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default HeaderOne;
