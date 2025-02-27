import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import AdminUsers from "./AdminUsers";
import Permissions from "./Permissions";
import Activities from "./Activities";
import Profile from "../../components/Profile";

const Admins = () => {
  const [activeTab, setActiveTab] = useState("users");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "users":
        return <AdminUsers />;
      case "permissions":
        return <Permissions />;
      case "activities":
        return <Activities />;
      default:
        return <AdminUsers />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-8 py-2.5 rounded-full  border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>
      <div className="border-b">
        <div className="flex gap-8">
          <button
            className={`py-4 px-1 flex items-center gap-2 ${
              activeTab === "users"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("users")}
          >
            <span className="text-xl">👥</span> Admin Users
          </button>
          <button
            className={`py-4 px-1 flex items-center gap-2 ${
              activeTab === "permissions"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("permissions")}
          >
            <span className="text-xl">🔑</span> Permissions
          </button>
          <button
            className={`py-4 px-1 flex items-center gap-2 ${
              activeTab === "activities"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("activities")}
          >
            <span className="text-xl">ℹ️</span> Activities
          </button>
        </div>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default Admins;
