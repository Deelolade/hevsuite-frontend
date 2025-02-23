// import React from "react";
// import { Link } from "react-router-dom";
// import logo from "../../assets/logo_white.png";

// const Sidebar = () => {
//   const menuItems = [
//     { icon: "⬛", label: "Dashboard", active: true },
//     { icon: "👥", label: "Pending Registration" },
//     { icon: "👤", label: "User Management" },
//     { icon: "💳", label: "Club Cards" },
//     { icon: "📝", label: "CMS" },
//     { icon: "📅", label: "Event Management" },
//     { icon: "📰", label: "News Room" },
//     { icon: "❓", label: "Asks" },
//     { icon: "❔", label: "Help Center" },
//     { icon: "🎧", label: "Support Request" },
//     { icon: "🏛️", label: "Finance Management" },
//     { icon: "👥", label: "Admin Users" },
//     { icon: "⚙️", label: "Site Settings" },
//   ];

//   return (
//     <div className="flex flex-col h-full bg-gradient-to-b from-[#540A26] to-[#0A5438] text-white">
//       <div className="p-4 border-b border-white/10">
//         <div className="flex items-center gap-3">
//           <img src={logo} alt="logo" className="w-10 h-10" />
//           <h1 className="text-xl font-semibold">Hevsuite Club</h1>
//         </div>
//       </div>
//       <nav className="flex-1 overflow-y-auto">
//         {menuItems.map((item, index) => (
//           <Link
//             key={index}
//             to="#"
//             className={`flex items-center gap-3 px-4 py-3 hover:bg-white/10 ${
//               item.active ? "bg-white/10" : ""
//             }`}
//           >
//             <span>{item.icon}</span>
//             <span>{item.label}</span>
//           </Link>
//         ))}
//       </nav>
//       <div className="p-4 border-t border-white/10">
//         <button className="flex items-center gap-2 text-red-500">
//           <span>🚪</span>
//           <span>Log-out</span>
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Sidebar;

import React from "react";
import { Link, useLocation } from "react-router-dom";
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
  const location = useLocation();

  const menuItems = [
    {
      icon: <BsGrid1X2Fill size={18} />,
      label: "Dashboard",
      path: "dashboard",
    },
    {
      icon: <BsPeople size={18} />,
      label: "Pending Registration",
      path: "pending",
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
          const isActive = location.pathname === item.path;
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
        <button className="flex items-center gap-3 text-[#FF0000] hover:text-red-400 transition-colors">
          <IoLogOutOutline size={18} />
          <span className="text-[14px]">Log-out</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
