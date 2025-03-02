// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo_white.png";
// import avatar from "../assets/user.avif";
// import { FaSignOutAlt } from "react-icons/fa";
// import { BsBell } from "react-icons/bs";
// import ProfileModal from "./ProfileModal";

// const Header = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//   }, [isMenuOpen]);

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token"); // Assuming token is stored in local storage
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <header className="absolute top-0 left-0 right-0 z-50  backdrop-blur-sm">
//       {/* Navbar */}
//       <nav className="container mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-white text-3xl font-bold">
//           <img src={logo} alt="Logo" className="h-10 sm:h-12" />
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-black text-2xl focus:outline-none"
//           >
//             {isMenuOpen ? "×" : "☰"} {/* Hamburger icon or close icon */}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center bg-black/60 gap-8 p-2 px-12 rounded-l-3xl rounded-r-3xl pr-3 font-primary text-white">
//           <Link to="/register">Become a member</Link>
//           <Link to="/how-it-works">How it works</Link>
//           <Link to="/topics">Help centre</Link>
//           {isLoggedIn ? (
//             <>
//               <div className="flex items-center space-x-6">
//                 <div className="relative">
//                   <BsBell className="w-6 h-6" />
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
//                     2
//                   </span>
//                 </div>
//                 <div
//                   className="flex items-center space-x-2 cursor-pointer"
//                   onClick={() => setShowProfileModal(true)}
//                 >
//                   <img
//                     src={avatar}
//                     alt="Avatar"
//                     className="w-12 h-12 rounded-full border-2 border-red-500"
//                   />
//                   <span className="text-white">Goodluck</span>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl"
//             >
//               Login for members
//             </Link>
//           )}
//         </div>

//         {/* Mobile Menu */}
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } md:hidden fixed inset-0 bg-white z-50`}
//         >
//           <div className="p-6 bg-white min-h-screen">
//             {/* Menu Header */}
//             <div className="flex justify-between items-center mb-8">
//               <Link to="/">
//                 <img src={logo} alt="Logo" className="h-10" />
//               </Link>
//               <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
//                 ×
//               </button>
//             </div>

//             {/* Menu Items */}
//             <div className="space-y-6">
//               <Link to="/" className="block text-black font-medium">
//                 Home
//               </Link>
//               <Link to="/terms" className="block text-black font-medium">
//                 Policies
//               </Link>

//               {isLoggedIn ? (
//                 <div className="space-y-4">
//                   <div
//                     className="flex justify-between items-center cursor-pointer"
//                     onClick={() =>
//                       setIsAccountDropdownOpen(!isAccountDropdownOpen)
//                     }
//                   >
//                     <span className="text-black font-medium">My Account</span>
//                     <span className="text-xl">
//                       {isAccountDropdownOpen ? "∧" : "∨"}
//                     </span>
//                   </div>
//                   <div
//                     className={`${
//                       isAccountDropdownOpen ? "block" : "hidden"
//                     } pl-4 space-y-4`}
//                   >
//                     <Link to="/account/profile" className="block text-black">
//                       Account Profile
//                     </Link>
//                     <Link to="/account/events" className="block text-black">
//                       Your Events
//                     </Link>
//                     <Link to="/account/support" className="block text-black">
//                       Support Join Request
//                     </Link>
//                     <Link
//                       to="/account/notifications"
//                       className="block text-black"
//                     >
//                       Notifications
//                     </Link>
//                     <Link to="/account/referrals" className="block text-black">
//                       Referrals
//                     </Link>
//                     <Link to="/account/settings" className="block text-black">
//                       Settings
//                     </Link>
//                     <Link to="/account/activity" className="block text-black">
//                       Activity Log
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 <Link to="/login" className="block text-black font-medium">
//                   Login for members
//                 </Link>
//               )}

//               <Link to="/how-it-works" className="block text-black font-medium">
//                 How it works
//               </Link>
//               <Link to="/ask" className="block text-black font-medium">
//                 Ask
//               </Link>
//               <Link to="/topics" className="block text-black font-medium">
//                 Help centre
//               </Link>

//               {isLoggedIn && (
//                 <div className="pt-6 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={avatar}
//                       alt="Avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <span className="text-black">Goodluck</span>
//                   </div>
//                   <button className="text-xl" onClick={handleLogout}>
//                     <FaSignOutAlt />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>
//       {showProfileModal && (
//         <ProfileModal onClose={() => setShowProfileModal(false)} />
//       )}
//     </header>
//   );
// };

// export default Header;

// import React, { useEffect, useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import logo from "../assets/logo_white.png";
// import avatar from "../assets/user.avif";
// import { FaSignOutAlt } from "react-icons/fa";
// import { BsBell } from "react-icons/bs";
// import ProfileModal from "./ProfileModal";
// import Modal from "react-modal";

// const Header = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(true);
//   const [showProfileModal, setShowProfileModal] = useState(false);

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.body.classList.add("overflow-hidden");
//     } else {
//       document.body.classList.remove("overflow-hidden");
//     }
//   }, [isMenuOpen]);

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem("token"); // Assuming token is stored in local storage
//     if (token) {
//       setIsLoggedIn(true);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//     window.location.reload();
//   };

//   return (
//     <header className="absolute top-0 left-0 right-0 z-40 backdrop-blur-sm">
//       {/* Navbar */}
//       <nav className="container mx-auto px-4 sm:px-8 py-6 flex justify-between items-center">
//         {/* Logo */}
//         <Link to="/" className="text-white text-3xl font-bold">
//           <img src={logo} alt="Logo" className="h-10 sm:h-12" />
//         </Link>

//         {/* Mobile Menu Toggle */}
//         <div className="md:hidden">
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="text-white text-2xl focus:outline-none"
//           >
//             {isMenuOpen ? "×" : "☰"}
//           </button>
//         </div>

//         {/* Desktop Menu */}
//         <div className="hidden md:flex items-center bg-black/60 gap-8 p-2 px-12 rounded-l-3xl rounded-r-3xl pr-3 font-primary text-white">
//           <Link to="/register">Become a member</Link>
//           <Link to="/how-it-works">How it works</Link>
//           <Link to="/topics">Help centre</Link>
//           {isLoggedIn ? (
//             <>
//               <div className="flex items-center space-x-6">
//                 <div className="relative">
//                   <BsBell className="w-6 h-6" />
//                   <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
//                     2
//                   </span>
//                 </div>
//                 <div
//                   className="flex items-center space-x-2 cursor-pointer"
//                   onClick={() => setShowProfileModal(true)}
//                 >
//                   <img
//                     src={avatar}
//                     alt="Avatar"
//                     className="w-12 h-12 rounded-full border-2 border-red-500"
//                   />
//                   <span className="text-white">Goodluck</span>
//                 </div>
//               </div>
//             </>
//           ) : (
//             <Link
//               to="/login"
//               className="px-6 py-2 bg-gradient-to-r from-gradient_r to-gradient_g rounded-3xl"
//             >
//               Login for members
//             </Link>
//           )}
//         </div>
//         {/* Mobile Menu */}
//         <div
//           className={`${
//             isMenuOpen ? "block" : "hidden"
//           } md:hidden fixed inset-0 bg-white z-50`}
//         >
//           <div className="p-6 bg-white min-h-screen">
//             {/* Menu Header */}
//             <div className="flex justify-between items-center mb-8">
//               <Link to="/">
//                 <img src={logo} alt="Logo" className="h-10" />
//               </Link>
//               <button onClick={() => setIsMenuOpen(false)} className="text-2xl">
//                 ×
//               </button>
//             </div>

//             {/* Menu Items */}
//             <div className="space-y-6">
//               <Link to="/" className="block text-black font-medium">
//                 Home
//               </Link>
//               <Link to="/terms" className="block text-black font-medium">
//                 Policies
//               </Link>

//               {isLoggedIn ? (
//                 <div className="space-y-4">
//                   <div
//                     className="flex justify-between items-center cursor-pointer"
//                     onClick={() =>
//                       setIsAccountDropdownOpen(!isAccountDropdownOpen)
//                     }
//                   >
//                     <span className="text-black font-medium">My Account</span>
//                     <span className="text-xl">
//                       {isAccountDropdownOpen ? "∧" : "∨"}
//                     </span>
//                   </div>
//                   <div
//                     className={`${
//                       isAccountDropdownOpen ? "block" : "hidden"
//                     } pl-4 space-y-4`}
//                   >
//                     <Link to="/account/profile" className="block text-black">
//                       Account Profile
//                     </Link>
//                     <Link to="/account/events" className="block text-black">
//                       Your Events
//                     </Link>
//                     <Link to="/account/support" className="block text-black">
//                       Support Join Request
//                     </Link>
//                     <Link
//                       to="/account/notifications"
//                       className="block text-black"
//                     >
//                       Notifications
//                     </Link>
//                     <Link to="/account/referrals" className="block text-black">
//                       Referrals
//                     </Link>
//                     <Link to="/account/settings" className="block text-black">
//                       Settings
//                     </Link>
//                     <Link to="/account/activity" className="block text-black">
//                       Activity Log
//                     </Link>
//                   </div>
//                 </div>
//               ) : (
//                 <Link to="/login" className="block text-black font-medium">
//                   Login for members
//                 </Link>
//               )}

//               <Link to="/how-it-works" className="block text-black font-medium">
//                 How it works
//               </Link>
//               <Link to="/ask" className="block text-black font-medium">
//                 Ask
//               </Link>
//               <Link to="/topics" className="block text-black font-medium">
//                 Help centre
//               </Link>

//               {isLoggedIn && (
//                 <div className="pt-6 flex items-center justify-between">
//                   <div className="flex items-center gap-3">
//                     <img
//                       src={avatar}
//                       alt="Avatar"
//                       className="w-8 h-8 rounded-full"
//                     />
//                     <span className="text-black">Goodluck</span>
//                   </div>
//                   <button className="text-xl" onClick={handleLogout}>
//                     <FaSignOutAlt />
//                   </button>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </nav>

//       {showProfileModal && (
//         <Modal
//           isOpen={true}
//           onRequestClose={false}
//           // style={customStyles}
//           contentLabel="Profile Modal"
//           // ariaHideApp={false}
//           style={{
//             overlay: {
//               position: "fixed",
//               top: 0,
//               left: 0,
//               right: 0,
//               bottom: 0,
//               backgroundColor: "rgba(0, 0, 0, 0.5)",
//               zIndex: 1000,
//             },

//             content: {
//               backgroundColor: "transparent", // Adjust modal content background
//               border: "none",
//               padding: "0",
//             },
//           }}
//         >
//           {/* <ProfileModal onClose={() => setShowProfileModal(false)} /> */}
//           <ProfileModal />
//         </Modal>
//       )}
//     </header>
//   );
// };

// export default Header;

import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_white.png";
import avatar from "../assets/user.avif";
import { FaSignOutAlt } from "react-icons/fa";
import { BsBell } from "react-icons/bs";
import ProfileModal from "./ProfileModal";
import Modal from "react-modal";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [showProfileModal, setShowProfileModal] = useState(false);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isMenuOpen]);

  useEffect(() => {
    // Check if user is logged in
    const token = localStorage.getItem("token"); // Assuming token is stored in local storage
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <header className="absolute top-0 left-0 right-0 z-40 ">
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
            className="text-white text-2xl focus:outline-none"
          >
            {isMenuOpen ? "×" : "☰"}
          </button>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center bg-black/60 gap-8 p-2 px-12 rounded-l-3xl rounded-r-3xl pr-3 font-primary text-white">
          {!isLoggedIn && <Link to="/register">Become a member</Link>}

          <Link to="/how-it-works">How it works</Link>
          <Link to="/topics">Help centre</Link>
          {isLoggedIn && <Link to="/ask">Ask</Link>}

          {isLoggedIn ? (
            <>
              <div className="flex items-center space-x-6">
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
              <Link to="/terms" className="block text-black font-medium">
                Policies
              </Link>

              {isLoggedIn ? (
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
              ) : (
                <Link to="/login" className="block text-black font-medium">
                  Login for members
                </Link>
              )}

              <Link to="/how-it-works" className="block text-black font-medium">
                How it works
              </Link>
              <Link to="/ask" className="block text-black font-medium">
                Ask
              </Link>
              <Link to="/topics" className="block text-black font-medium">
                Help centre
              </Link>

              {isLoggedIn && (
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
              )}
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
          {/* Add global styles for hiding scrollbars */}
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

export default Header;
