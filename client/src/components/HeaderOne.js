import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_white.png";
import avatar from "../assets/user.avif";
import { BsTwitterX, BsInstagram, BsChatFill } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { fetchProfile, logout } from "../features/auth/authSlice";
import { persistor } from '../store/store';
import {
  BsFillHouseDoorFill,
  BsQuestionCircle,
  BsPerson,
  BsBell
} from 'react-icons/bs';
import { PiCirclesThreeDuotone } from "react-icons/pi";
const HeaderOne = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { user, isLoading } = useSelector(
    (state) => state.auth
  );
  const unreadCount = useSelector((state) => state.notifications.unreadCount);
  const isLoggedIn = !!user;
  const notRef = React.useRef(false);
  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);



  const handleLogout = async () => {
    dispatch(logout()).then(() => {
      persistor.purge(); // safely purge after logout completes
    });
    navigate("/");
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
        <div className="hidden max-w-[600px] w-full fixed  bg-black bg-opacity-40  backdrop-blur-md right-0 md:flex sm:gap-2 md:gap-4 items-center  p-1 sm:p-2 md:p-2 px-6 sm:px-1 md:px-6 rounded-l-3xl  pr-2 sm:pr-3 font-primary text-white text-sm sm:text-base">
          <Link to="/register">Become a member</Link>
          <Link to="/how-it-works">How it works</Link>
          <Link to="/topics">Help centre</Link>
          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-6">
                {/* <div className="relative">
                  <BsBell className="w-6 h-6" />
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                    10+
                  </span>
                </div> */}
                <div
                  className='relative cursor-pointer'
                  onClick={() => {
                    notRef.current = true;
                    setShowProfileModal(true);
                  }}
                >
                  <BsBell className='w-6 h-6' />
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 min-w-[16px] h-4 bg-red-500 rounded-full text-xs flex items-center justify-center px-1">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </div>
                <div
                  className="flex items-center space-x-2 cursor-pointer"
                  onClick={() => {
                    notRef.current = false;
                    setShowProfileModal(true);
                  }}
                >
                  <img
                    src={user.profilePhoto || avatar}
                    alt={user.profilePhoto || 'profile'}
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
          className={`${isMenuOpen ? "block" : "hidden"
            } md:hidden fixed inset-0   z-100`}
             style={{
    backdropFilter: 'blur(124px)',
    boxShadow: '0px 4px 54px 0px #00003033',
    background: 'linear-gradient(163.72deg, rgba(255, 255, 255, 0.21) 3.23%, rgba(255, 255, 255, 0.18) 106.2%)'
  }}
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
                  className="flex text-sm text-white py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  <BsFillHouseDoorFill className="text-xl mr-2" />
                  <span>Home</span>
                </Link>
                <Link
                  to="/how-it-works"
                  className="flex text-white  text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  <PiCirclesThreeDuotone className="text-xl mr-2" />
                  <span>How it Works</span>
                </Link>
                {isLoggedIn && (
                  <Link
                    to="/ask"
                    className="flex text-white text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                  >
                    <BsChatFill className="text-xl mr-2" />
                    <span>Ask</span>
                  </Link>
                )}
                <Link
                  to="/topics"
                  className="flex text-white  text-sm py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                >
                  <BsQuestionCircle className="text-xl mr-2" />
                  <span>Help Centre</span>
                </Link>
                {isLoggedIn && (
                  <>
                    <div
                      className="flex text-sm text-white  py-2 px-4 rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]"
                      onClick={() => {
                        notRef.current = false;
                        setShowProfileModal(true);
                      }}
                    >
                      <BsPerson className="text-xl mr-2" />
                      <span>My Account</span>
                    </div>
                    <div className="relative  text-sm rounded-3xl hover:bg-gray-700 border-2 border-[#8E8EA0]">
                      <div
                        onClick={() => {
                          notRef.current = true;
                          setShowProfileModal(true);
                        }}
                        className="flex text-white py-2 px-4 rounded-lg hover:bg-gray-700"
                      >
                        <BsBell className="text-xl mr-2" />
                        <span>Notification</span>
                        {unreadCount > 0 && (
                          <span className="ml-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            10+
                            {unreadCount > 9 ? '9+' : unreadCount}
                          </span>
                        )}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-auto">
              {isLoggedIn ? (
                <>
                  <div className="mb-6 mt-4  text-center">
                    <img
                      src={user?.profilePhoto || avatar}
                      alt={user?.name || 'profile'}
                      className="w-16 h-16 rounded-full mx-auto mb-3"
                    />
                    <div className="text-white mb-1">
                      {user.forename} {user.surname}
                    </div>
                    <div className="text-gray-400 text-sm mb-4">
                      {user.primaryEmail}
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
          <ProfileModal
            forNotification={notRef.current ? notRef : null}
            onClose={() => setShowProfileModal(false)}
          />
        </Modal>
      )}
    </header>
  );
};

export default HeaderOne;
