import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_white.png";
import avatar from "../assets/user.avif";
import { BsBell } from "react-icons/bs";
import { BsTwitterX, BsInstagram } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import Modal from "react-modal";

const HeaderOne = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [userEmail, setUserEmail] = useState("machoodsylter@gmail.com");
  const [userName, setUserName] = useState({
    first: "First Name",
    last: "Surname",
  });

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token");
    if (token) {
      setIsLoggedIn(true);
      // TODO: Fetch user data here and update email and name
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="absolute bg-gradient-to-b from-black to-transparent top-0 left-0 right-0 z-40 ">
      <nav className="container mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
        <Link to="/" className="text-white text-3xl font-bold">
          <img src={logo} alt="Logo" className="h-10 sm:h-12" />
        </Link>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden fixed bg-black bg-opacity-40  backdrop-blur-md right-10 md:flex sm:gap-2 md:gap-4 items-center  p-1 sm:p-2 md:p-2 px-6 sm:px-1 md:px-6 rounded-l-3xl rounded-r-3xl pr-2 sm:pr-3 font-primary text-white text-sm sm:text-base">
          <Link to="/register">Become a member</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/topics">Help centre</Link>
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-6">
                <div className="relative">
                  <BsBell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    10+
                  </span>
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => setShowProfileModal(true)}
                >
                  <img
                    src={avatar}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-red-500"
                  />
                  <span className="text-white">Goodluck</span>
                </div>
              </div>
            </>
          ) : (
            <Link
              to="/login"
              className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl"
            >
              Login for members
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:hidden fixed inset-0  bg-black bg-opacity-40  backdrop-blur-md z-100`}
        >
          <div className="p-6 h-full flex flex-col overflow-auto">
            <div className="flex justify-between items-center mb-8">
              <div className="flex items-center gap-2">
                <img src={logo} alt="Logo" className="h-8" />
                <span className="text-white text-xl">evsuite Club</span>
              </div>
              <button
                onClick={() => setIsMenuOpen(false)}
                className="text-2xl text-white"
              >
                ×
              </button>
            </div>

            {/* Menu Items */}
            <div className="flex-grow">
              <div className="space-y-2">
                <Link
                  to="/"
                  className="block bg-black text-sm text-white py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  Home
                </Link>
                <Link
                  to="/how-it-works"
                  className="block text-white bg-black text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  How it Works
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/ask"
                    className="block text-white bg-black text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                  >
                    Ask
                  </Link>
                )}
                <Link
                  to="/topics"
                  className="block text-white bg-black text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  Help Centre
                </Link>
                {isLoggedIn && (
                  <>
                    <div
                      className="block bg-black text-sm text-white  py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                      onClick={() => {
                        setShowProfileModal(true);
                      }}
                    >
                      My Account
                    </div>
                    <div className="relative bg-black text-sm rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]">
                      <Link
                        to="/notifications"
                        className="block text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      >
                        Notification
                        <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          10+
                        </span>
                      </Link>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-auto">
              {isLoggedIn ? (
                <>
                  <div className="mb-6  text-center">
                    <img
                      src={avatar}
                      alt="Profile"
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                    />
                    <div className="text-white mb-1">
                      {userName.first} {userName.last}
                    </div>
                    <div className="text-gray-400 text-sm mb-4">
                      {userEmail}
                    </div>
                    <button
                      onClick={handleLogout}
                      className="w-full text-sm bg-pink-100 text-black py-2 rounded-lg"
                    >
                      Logout
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 mb-6">
                    <Link
                      to="/login"
                      className="block w-full text-sm bg-gradient-to-r from-gradient_r to-gradient_g text-white text-center py-3 rounded-lg"
                    >
                      Members Login
                    </Link>
                    <div className="text-center text-white my-2">Or</div>
                    <Link
                      to="/register"
                      className="block w-full text-sm bg-gradient-to-r from-gradient_r to-gradient_g text-white text-center py-3 rounded-lg"
                    >
                      Become a Member
                    </Link>
                  </div>
                </>
              )}

              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-start gap-6 mb-4">
                  <a href="#" className="text-white text-xl">
                    <BsTwitterX />
                  </a>
                  <a href="#" className="text-white text-xl">
                    <BsInstagram />
                  </a>
                  <p className="text-white text-lg">Follow us</p>
                </div>
                <div className="flex justify-start text-sm text-white ">
                  <Link to="/terms" className="mr-8">
                    Policies
                  </Link>
                  <Link to="/club">HH Club & Founder</Link>
                </div>
                <div className=" text-xs text-white mt-2">
                  2024 Hazer Group (Trading as HH Club)
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
      {showProfileModal && (
        <Modal
          isOpen={true}
          onRequestClose={() => setShowProfileModal(false)}
          contentLabel="Profile Modal"
          style={{
            overlay: {
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1000,
            },
            content: {
              backgroundColor: "transparent",
              border: "none",
              padding: "0",
            },
          }}
        >
          <style jsx global>{`
            /* Hide scrollbar for Chrome, Safari and Opera */
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }

            /* Hide scrollbar for IE, Edge and Firefox */
            .no-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          `}</style>

          <ProfileModal onClose={() => setShowProfileModal(false)} />
        </Modal>
      )}
    </header>
  );
};

export default HeaderOne;
