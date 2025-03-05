import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "../../components/Profile";

import Evidence from "./Evidence";
import OtherRequest from "./OtherRequest";
import AssignedRequest from "./AssignedRequest";

const Support = () => {
  const [activeTab, setActiveTab] = useState("evidence");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "evidence":
        return <Evidence />;
      case "other":
        return <OtherRequest />;
      case "assigned":
        return <AssignedRequest />;
      default:
        return <Evidence />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Tabs */}
      <div className="flex flex-row md:ml-0 -ml-2 gap-4">
        <button
          className={`px-6 py-3 rounded-lg flex-1 ${
            activeTab === "evidence"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
          }`}
          onClick={() => setActiveTab("evidence")}
        >
          Evidence Review
        </button>
        <button
          className={`px-6 py-3 rounded-lg flex-1 ${
            activeTab === "other"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
          }`}
          onClick={() => setActiveTab("other")}
        >
          Other Requests
        </button>
        <button
          className={`px-6 py-3 rounded-lg flex-1 ${
            activeTab === "assigned"
              ? "bg-primary text-white"
              : "bg-white border text-gray-700"
          }`}
          onClick={() => setActiveTab("assigned")}
        >
          Your Assigned Requests
        </button>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Support;
