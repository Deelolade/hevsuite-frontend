import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import ProfileModal from "../components/ProfileModal";

const AuthLayout = () => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  return (
    <div>
      {/* Header */}
      <header className="bg-black py-4 px-6">
        <div className="flex items-center justify-between">
          {/* ... existing header content ... */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => setShowProfileModal(true)}
          >
            <img
              src="/avatar.jpg"
              alt="User"
              className="w-8 h-8 rounded-full"
            />
            <span className="text-red-500">Goodluck</span>
          </div>
        </div>
      </header>

      <Outlet />

      {showProfileModal && (
        <ProfileModal onClose={() => setShowProfileModal(false)} />
      )}
    </div>
  );
};

export default AuthLayout;
