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
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-4">
          <Profile />
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
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
