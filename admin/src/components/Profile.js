import React, { useState, useRef, useEffect } from "react";
import { BsBell, BsChevronDown } from "react-icons/bs";
import { useNavigate, Link } from "react-router-dom";
import avatar from "../assets/user.avif";

const Profile = () => {
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const notificationRef = useRef(null);
  const profileRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const notifications = [
    {
      id: 1,
      title: "New Event Added",
      time: "2 hours ago",
      isRead: false,
    },
    {
      id: 2,
      title: "Profile Updated",
      time: "5 hours ago",
      isRead: true,
    },
    {
      id: 3,
      title: "New Message Received",
      time: "1 day ago",
      isRead: true,
    },
  ];

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-6">
      <div className="relative" ref={notificationRef}>
        <button
          className="relative"
          onClick={() => {
            setShowNotifications(!showNotifications);
            setShowDropdown(false);
          }}
        >
          <BsBell className="text-2xl text-gray-600" />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"></span>
        </button>

        {showNotifications && (
          <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-100">

            <div className="px-4 py-2 border-b border-gray-100">
              <h3 className="font-semibold">Notifications</h3>
            </div>
            <div className="max-h-[400px] overflow-y-auto">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`px-4 py-3 hover:bg-gray-50 cursor-pointer ${
                    !notification.isRead ? "bg-blue-50" : ""
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <p
                      className={`${
                        !notification.isRead ? "font-semibold" : ""
                      }`}
                    >
                      {notification.title}
                    </p>
                    <span className="text-xs text-gray-500">
                      {notification.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="px-4 py-2 border-t border-gray-100">
              <button className="text-sm text-primary hover:underline w-full text-center">
                View All Notifications
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="relative" ref={profileRef}>
        <button
          className="flex items-center gap-3"
          onClick={() => {
            setShowDropdown(!showDropdown);
            setShowNotifications(false);
          }}
        >
          <div className="text-right">
            <h3 className="font-medium">Raed</h3>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <img src={avatar} alt="profile" className="w-10 h-10 rounded-full" />
          <BsChevronDown className="text-gray-400" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <Link
              to="/admin/profile"
              className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-50"
            >
              Your Profile
            </Link>
            <button
              className="block px-4 py-2 text-lg text-red-600 hover:bg-gray-50"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
