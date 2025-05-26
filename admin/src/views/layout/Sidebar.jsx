import React, { useState, useEffect } from "react";
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
import { BiChevronLeft, BiMenu, BiSupport } from "react-icons/bi";
import { CgClose, CgWebsite } from "react-icons/cg";
import logo_red from "../../assets/logo_red.png";
import "./forced.css";
import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';

const menuItems = [
  { path: "dashboard", icon: <BsGrid1X2Fill size={20} />, label: "Dashboard" },
  {
    path: "pending",
    icon: <MdOutlinePendingActions size={20} />,
    label: "Pending Registration",
    showCount: true
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

const Sidebar = ({ collapsed, setCollapsed, minimize, setMinimize }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const response = await axios.get(`${base_url}/api/statistics/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        setPendingCount(response.data.pendingRegistrations);
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      }
    };

    fetchDashboardStats();
    // Refresh stats every 30 seconds
    const interval = setInterval(fetchDashboardStats, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div
      className={` md:h-fit ${
        minimize ? "w-20" : ""
      } h-screen fixed z-50 bg-[#1A1A1A] text-white  flex-col transition-width duration-300 `}
      style={{
        zIndex: 200,
      }}
    >
      {/* <BiMenu size={30} className='absolute text-black z-50 right-0'/> */}
      {/* Logo */}
      <div className="p-6 relative">
        <CgClose
          size={20}
          className="absolute top-2 right-2 md:hidden"
          onClick={() => setCollapsed(!collapsed)}
        />
        <BiChevronLeft
          size={30}
          className={`absolute md:flex hidden cursor-pointer ${
            minimize && "rotate-180 !top-12 !right-0"
          } transition-all delay-100  top-20 right-2`}
          onClick={() => setMinimize(!minimize)}
        />
        {!minimize ? (
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
        ) : (
          <div className="flex items-center">
            <img
              src={logo_red}
              alt="logo"
              className={`w-[75px]  transition-opacity duration-300 ${
                collapsed ? "opacity-0" : "opacity-100"
              }`}
            />
          </div>
        )}
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
                  <div className="flex items-center justify-center w-10 relative">
                    {item.icon}
                    {item.showCount && pendingCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {pendingCount}
                      </span>
                    )}
                  </div>
                  {!minimize && (
                    <span
                      className={`text-sm transition-opacity duration-300 ${
                        collapsed ? "opacity-0" : "opacity-100"
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
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
        {minimize ? (
          <button
            className="flex items-center flex-col w-full text-red-500 hover:text-red-400 transition-colors"
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
        ) : (
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
        )}
      </div>
    </div>
  );
};

export default Sidebar;
