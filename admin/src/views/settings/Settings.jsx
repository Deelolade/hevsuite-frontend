import React, { useState } from "react";
// import { Switch } from "@headlessui/react";

import General from "./General";
import SocailLinks from "./SocailLinks";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";

const Settings = () => {
  const [activeTab, setActiveTab] = useState("general");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "general":
        return <General />;
      case "social":
        return <SocailLinks />;

      default:
        return <General />;
    }
  };

  return (
    <div className="space-y-8 md:p-6">
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
      <div className="border-b font-semibold font-primary">
        <div className="flex gap-8">
          <button
            className={`py-4 px-1 ${
              activeTab === "general"
                ? "border-b-4 border-primary"
                : "text-[#737374]"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General Setting
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === "social"
                ? "border-b-4 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("social")}
          >
            Social Links
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Settings;
