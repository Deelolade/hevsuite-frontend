import React, { useState } from "react";
import { BsBell, BsChevronDown } from "react-icons/bs";

const Profile = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <button className="relative">
        <BsBell className="text-2xl text-gray-600" />
        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-blue-600 rounded-full"></span>
      </button>
      <div className="relative">
        <button
          className="flex items-center gap-3"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <div className="text-right">
            <h3 className="font-medium">Raed</h3>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <img
            src="https://via.placeholder.com/40"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <BsChevronDown className="text-gray-400" />
        </button>

        {showDropdown && (
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border border-gray-100">
            <a href="#" className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-50">
              Your Profile
            </a>
            <a href="#" className="block px-4 py-2 text-lg text-red-600 hover:bg-gray-50">
              Logout
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;