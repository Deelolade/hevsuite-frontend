// import React from "react";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import logo from "../../assets/logo_red.png";
// import {
//   BsGrid1X2Fill,
//   BsPeople,
//   BsPerson,
//   BsCardText,
//   BsCalendarEvent,
//   BsQuestionCircle,
//   BsHeadset,
//   BsGear,
// } from "react-icons/bs";
// import { BiNews } from "react-icons/bi";
// import { RiQuestionnaireLine } from "react-icons/ri";
// import { FaRegBuilding } from "react-icons/fa";
// import { CgWebsite } from "react-icons/cg";
// import { IoLogOutOutline } from "react-icons/io5";

// const Sidebar = () => {
//   const navigate = useNavigate();
//   const location = useLocation();

//   const handleLogout = () => {
//     localStorage.clear();
//     navigate("/");
//     window.location.reload();
//   };

//   const menuItems = [
//     {
//       icon: <BsGrid1X2Fill size={18} />,
//       label: "Dashboard",
//       path: "dashboard",
//     },
//     {
//       icon: <BsPeople size={18} />,
//       label: "Pending Registration",
//       path: "pending",
//     },
//     { icon: <BsPerson size={18} />, label: "User Management", path: "users" },
//     { icon: <BsCardText size={18} />, label: "Club Cards", path: "cards" },
//     { icon: <CgWebsite size={18} />, label: "CMS", path: "cms" },
//     {
//       icon: <BsCalendarEvent size={18} />,
//       label: "Event Management",
//       path: "events",
//     },
//     { icon: <BiNews size={18} />, label: "News Room", path: "news" },
//     { icon: <RiQuestionnaireLine size={18} />, label: "Asks", path: "asks" },
//     {
//       icon: <BsQuestionCircle size={18} />,
//       label: "Help Center",
//       path: "help",
//     },
//     {
//       icon: <BsHeadset size={18} />,
//       label: "Support Request",
//       path: "support",
//     },
//     {
//       icon: <FaRegBuilding size={18} />,
//       label: "Finance Management",
//       path: "finance",
//     },
//     { icon: <BsPeople size={18} />, label: "Admin Users", path: "admins" },
//     { icon: <BsGear size={18} />, label: "Site Settings", path: "settings" },
//   ];

//   return (
//     <div className="fixed left-0 top-0 h-screen w-[240px] bg-black flex flex-col">
//       {/* Logo */}
//       <div className="px-4 py-6">
//         <div className="flex items-center gap-2">
//           <img src={logo} alt="logo" className="w-10 h-10" />
//           <h1 className="text-white text-xl">Hevsuite Club</h1>
//         </div>
//       </div>

//       {/* Navigation */}
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.map((item, index) => {
//           const isActive = location.pathname === item.path;
//           return (
//             <Link
//               key={index}
//               to={item.path}
//               className={`flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white transition-colors ${
//                 isActive
//                   ? "text-white bg-gradient-to-r from-[#540A26] to-[#0A5438] border-l-4 border-white shadow-lg"
//                   : ""
//               }`}
//             >
//               <span className="w-5">{item.icon}</span>
//               <span className="text-[14px]">{item.label}</span>
//             </Link>
//           );
//         })}
//       </nav>

//       {/* Logout */}
//       <div className="p-4 mt-auto">
//         <button className="flex items-center gap-3 text-[#FF0000] hover:text-red-400 transition-colors">
//           <IoLogOutOutline size={18} />
//           <span className="text-[14px]" onClick={handleLogout}>
//             Log-out
//           </span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../assets/logo_red.png";
import {
  BsGrid1X2Fill,
  BsPeople,
  BsPerson,
  BsCardText,
  BsCalendarEvent,
  BsQuestionCircle,
  BsHeadset,
  BsGear,
} from "react-icons/bs";
import { BiNews } from "react-icons/bi";
import { RiQuestionnaireLine } from "react-icons/ri";
import { FaRegBuilding } from "react-icons/fa";
import { CgWebsite } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  // Function to handle logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  // Menu items with paths
  const menuItems = [
    {
      icon: <BsGrid1X2Fill size={18} />,
      label: "Dashboard",
      path: "dashboard", // Add leading slash
    },
    {
      icon: <BsPeople size={18} />,
      label: "Pending Registration",
      path: "pending", // Add leading slash
    },
    { icon: <BsPerson size={18} />, label: "User Management", path: "users" },
    { icon: <BsCardText size={18} />, label: "Club Cards", path: "cards" },
    { icon: <CgWebsite size={18} />, label: "CMS", path: "cms" },
    {
      icon: <BsCalendarEvent size={18} />,
      label: "Event Management",
      path: "events",
    },
    { icon: <BiNews size={18} />, label: "News Room", path: "news" },
    { icon: <RiQuestionnaireLine size={18} />, label: "Asks", path: "asks" },
    {
      icon: <BsQuestionCircle size={18} />,
      label: "Help Center",
      path: "help",
    },
    {
      icon: <BsHeadset size={18} />,
      label: "Support Request",
      path: "support",
    },
    {
      icon: <FaRegBuilding size={18} />,
      label: "Finance Management",
      path: "finance",
    },
    { icon: <BsPeople size={18} />, label: "Admin Users", path: "admins" },
    { icon: <BsGear size={18} />, label: "Site Settings", path: "settings" },
  ];

  return (
    <div className="fixed left-0 top-0 h-screen w-[240px] bg-black flex flex-col">
      {/* Logo */}
      <div className="px-4 py-6">
        <div className="flex items-center gap-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-white text-xl">Hevsuite Club</h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto">
        {menuItems.map((item, index) => {
          // Check if the current path matches the menu item's path
          const path_name = location.pathname.split("/");
          const isActive = path_name[2] === item.path;

          return (
            <Link
              key={index}
              to={item.path}
              className={`flex items-center gap-3 px-4 py-2.5 text-gray-400 hover:text-white transition-colors ${
                isActive
                  ? "text-white bg-gradient-to-r from-[#540A26] to-[#0A5438] border-l-4 border-white shadow-lg"
                  : ""
              }`}
            >
              <span className="w-5">{item.icon}</span>
              <span className="text-[14px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-4 mt-auto">
        <button
          className="flex items-center gap-3 text-[#FF0000] hover:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          <IoLogOutOutline size={18} />
          <span className="text-[14px]">Log-out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
