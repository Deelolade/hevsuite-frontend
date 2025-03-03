import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGrid1X2Fill } from "react-icons/bs";
import {
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
  FaNewspaper,
  FaSignOutAlt,
} from "react-icons/fa";
import { RiUserSettingsLine, RiQuestionAnswerLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlinePendingActions, MdOutlineSettings } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { BiSupport } from "react-icons/bi";
import { CgWebsite } from "react-icons/cg";
import logo_red from "../../assets/logo_red.png";

const menuItems = [
  { path: "dashboard", icon: <BsGrid1X2Fill size={20} />, label: "Dashboard" },
  {
    path: "pending",
    icon: <MdOutlinePendingActions size={20} />,
    label: "Pending Registration",
  },
  { path: "users", icon: <FaUsers size={20} />, label: "User Management" },
  { path: "cards", icon: <FaIdCard size={20} />, label: "Club Cards" },
  { path: "cms", icon: <CgWebsite size={20} />, label: "CMS" },
  {
    path: "events",
    icon: <FaCalendarAlt size={20} />,
    label: "Event Management",
  },
  { path: "news", icon: <FaNewspaper size={20} />, label: "News Room" },
  { path: "asks", icon: <RiQuestionAnswerLine size={20} />, label: "Asks" },
  {
    path: "help",
    icon: <AiOutlineQuestionCircle size={20} />,
    label: "Help Center",
  },
  { path: "support", icon: <BiSupport size={20} />, label: "Support Request" },
  {
    path: "finance",
    icon: <TbBuildingBank size={20} />,
    label: "Finance Management",
  },
  {
    path: "admins",
    icon: <RiUserSettingsLine size={20} />,
    label: "Admin Users",
  },
  {
    path: "settings",
    icon: <MdOutlineSettings size={20} />,
    label: "Site Settings",
  },
];

const Sidebar = ({ collapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={`h-screen bg-[#1A1A1A] text-white flex flex-col transition-width duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    >
      {/* Logo */}
      <div className="p-6">
        <div className="flex items-center gap-3 pl-4">
          <img
            src={logo_red}
            alt="logo"
            className={`w-[75px] h-[60px] transition-opacity duration-300 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          />
          <h1
            className={`text-3xl font-montserrat font-bold transition-opacity duration-300 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            Hevsuite Club
          </h1>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const paths = location.pathname.split("/")[2];
            const isActive = paths === item.path;

            return (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-primary to-[#1F4F46] text-white"
                      : "text-gray-400 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-center w-10">
                    {item.icon}
                  </div>
                  <span
                    className={`text-sm transition-opacity duration-300 ${
                      collapsed ? "opacity-0" : "opacity-100"
                    }`}
                  >
                    {item.label}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div
        className={`p-3 mt-auto border-t border-gray-800 transition-opacity duration-300 ${
          collapsed ? "opacity-0" : "opacity-100"
        }`}
      >
        <button
          className="flex items-center gap-3 px-4 pl-12 py-2.5 w-full text-red-500 hover:text-red-400 transition-colors"
          onClick={handleLogout}
        >
          <FaSignOutAlt size={20} />
          <span
            className={`text-sm transition-opacity duration-300 ${
              collapsed ? "opacity-0" : "opacity-100"
            }`}
          >
            Log-out
          </span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
