import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { BsGrid1X2Fill } from "react-icons/bs";
import {
  FaUsers,
  FaIdCard,
  FaCalendarAlt,
  FaNewspaper,
  FaSignOutAlt,  
  FaHandshake,
} from "react-icons/fa";
import { RiQuestionAnswerLine, RiUserSettingsLine } from "react-icons/ri";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { MdOutlinePendingActions, MdOutlineSettings } from "react-icons/md";
import { TbBuildingBank } from "react-icons/tb";
import { BiChevronLeft, BiMenu, BiSupport } from "react-icons/bi";
import { CgClose, CgWebsite } from "react-icons/cg";
import logo_red from "../../assets/logo_red.png";
import "./forced.css";
import axios from 'axios';
import { base_url } from '../../constants/axiosConfig';
import authService from '../../store/auth/authService';

// Define menu items with their corresponding permissions
const menuItems = [
  { 
    path: "dashboard", 
    icon: <BsGrid1X2Fill size={20} />, 
    label: "Dashboard",
    permission: "Dashboard"
  },
  {
    path: "pending",
    icon: <MdOutlinePendingActions size={20} />,
    label: "Pending Registration",
    showCount: true,
    permission: "Pending Registration"
  },
  { 
    path: "users", 
    icon: <FaUsers size={20} />, 
    label: "User Management",
    permission: "User Management"
  },
  { 
    path: "cards", 
    icon: <FaIdCard size={20} />, 
    label: "Club Cards",
    permission: "Club Cards"
  },
  { 
    path: "cms", 
    icon: <CgWebsite size={20} />, 
    label: "CMS",
    permission: "CMS"
  },
  {
    path: "affiliate-partners",
    icon: <FaHandshake size={20} />,
    label: "Affiliate Partners",
    permission: "Affiliate Partners"
  },
  {
    path: "events",
    icon: <FaCalendarAlt size={20} />,
    label: "Event Management",
    permission: "Events Management"
  },
  { 
    path: "news", 
    icon: <FaNewspaper size={20} />, 
    label: "News Room",
    permission: "Newsrooms"
  },
  { 
    path: "asks", 
    icon: <RiQuestionAnswerLine size={20} />, 
    label: "Asks",
    permission: "Ask"
  },
  {
    path: "help",
    icon: <AiOutlineQuestionCircle size={20} />,
    label: "Help Center",
    permission: "Help Center"
  },
  { 
    path: "support", 
    icon: <BiSupport size={20} />, 
    label: "Support Request",
    permission: "Support Request"
  },
  {
    path: "finance",
    icon: <TbBuildingBank size={20} />,
    label: "Finance Management",
    permission: "Finance Management"
  },
  {
    path: "admins",
    icon: <RiUserSettingsLine size={20} />,
    label: "Admin Users",
    permission: "Admin Users"
  },
  {
    path: "settings",
    icon: <MdOutlineSettings size={20} />,
    label: "Site Settings",
    permission: "Site Settings"
  },
];

const Sidebar = ({ collapsed, setCollapsed, minimize, setMinimize }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [pendingCount, setPendingCount] = useState(0);
  const [userPermissions, setUserPermissions] = useState([]);
  const [loading, setLoading] = useState(true);

  // Get user role from localStorage
  const userRole = JSON.parse(localStorage.getItem('admin'))?.role;
  
  useEffect(() => {
    const fetchRolesAndPermissions = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${base_url}/api/permissions`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
                
        // Find the user's role and get its permissions
        const userRoleData = response.data.find(role => role.role === userRole);

        if (userRoleData) {
          setUserPermissions(userRoleData.permissions);
        } else {
          // If no specific role found, set default permissions for superadmin
          if (userRole === 'superadmin') {
            const allPermissions = menuItems.map(item => item.permission);
            setUserPermissions(allPermissions);
          } else {
            // If user role is not superadmin and no specific role found, set empty permissions
            setUserPermissions([]);
          }
        }
      } catch (error) {
        console.error('Error fetching roles:', error);
        // On error, set permissions to empty to hide menu items
        setUserPermissions([]);
      } finally {
        setLoading(false);
      }
    };

    if (userRole) {
      fetchRolesAndPermissions();
    } else {
      // If no user role in localStorage, set permissions to empty and stop loading
      setUserPermissions([]);
      setLoading(false);
    }
  }, [userRole]);

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

    const interval = setInterval(fetchDashboardStats, 60000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
        await authService.logout();  // This will clear the cookies on the server
        localStorage.clear();
        navigate("/");
    } catch (error) {
        console.error('Logout failed:', error);
        // Even if the API call fails, we should still clear local storage and redirect
        localStorage.clear();
        navigate("/");
    }
  };

  // Filter menu items based on user permissions
  const filteredMenuItems = menuItems.filter(item => {
    if (item.permission === 'Events Management') {
      // Show 'Event Management' tab if user has any of the related permissions
      return userPermissions.includes('Events Management') ||
             userPermissions.includes('Event Management (Payment and Partners)') ||
             userPermissions.includes('Event Management (Your events)');
    }
    if (item.permission === 'Support Request') {
      // Show 'Support Request' if user has either permission
      return userPermissions.includes('Support Request') || userPermissions.includes('Your Support Request');
    }
    return userPermissions.includes(item.permission);
  });

  // Determine if we should add extra margin to the logout button
  const logoutExtraMargin = filteredMenuItems.length < 5 ? 'mt-32' : '';

  // If loading or no permissions, show loading state
  if (loading) {
    return (
      <div className="md:h-fit h-screen fixed z-50 bg-[#1A1A1A] text-white flex-col transition-width duration-300">
        <div className="p-6">
          <div className="flex items-center gap-3 pl-4">
            <img src={logo_red} alt="logo" className="w-[75px] h-[60px]" />
            <h1 className="text-3xl font-montserrat font-bold">Hevsuite Club</h1>
          </div>
        </div>
        <div className="flex items-center justify-center h-full">
          <p className="text-gray-400">Loading menu...</p>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col md:h-fit ${ minimize ? "w-20" : "" } h-screen fixed z-50 bg-[#1A1A1A] text-white transition-width duration-300 min-h-[70vh] `}
      style={{
        zIndex: 200,
      }}
    >
      {/* Logo */}
      <div className="p-6 relative ">
        <CgClose
          size={20}
          className="absolute top-2 right-2 md:hidden"
          onClick={() => setCollapsed(!collapsed)}
        />
        <BiChevronLeft
          size={30}
          className={`absolute md:flex hidden cursor-pointer ${ minimize && "rotate-180 !top-12 !right-0" } transition-all delay-100 top-20 right-2`}
          onClick={() => setMinimize(!minimize)}
        />
        {!minimize ? (
          <div className="flex items-center gap-3 pl-4">
            <img
              src={logo_red}
              alt="logo"
              className={`w-[75px] h-[60px] transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
            />
            <h1
              className={`text-3xl font-montserrat font-bold transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
            >
              Hevsuite Club
            </h1>
          </div>
        ) : (
          <div className="flex items-center">
            <img
              src={logo_red}
              alt="logo"
              className={`w-[75px] transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
            />
          </div>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-grow overflow-y-auto min-h-[70vh]">
        <ul className="flex flex-col space-y-1">
          {filteredMenuItems.map((item) => {
            const paths = location.pathname.split("/")[2];
            const isActive = paths === item.path;

            return (
              <li key={item.path} className="flex-grow">
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-2.5 rounded-lg font-montserrat transition-colors ${ isActive ? "bg-gradient-to-r from-primary to-[#1F4F46] text-white" : "text-gray-400 hover:text-white" }`}
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
                      className={`text-sm transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
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
        className={`p-3 mt-auto border-t border-gray-800 transition-opacity duration-300 ${logoutExtraMargin} ${collapsed ? "opacity-0" : "opacity-100"}`}
      >
        {minimize ? (
          <button
            className="flex items-center flex-col w-full text-red-500 hover:text-red-400 transition-colors"
            onClick={handleLogout}
          >
            <FaSignOutAlt size={20} />
            <span
              className={`text-sm transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
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
              className={`text-sm transition-opacity duration-300 ${ collapsed ? "opacity-0" : "opacity-100" }`}
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
