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
    <div className="space-y-8">
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
      <div className="border-b">
        <div className="flex gap-8">
          <button
            className={`py-4 px-1 ${
              activeTab === "general"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("general")}
          >
            General Setting
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === "social"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("social")}
          >
            Socila Links
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Settings;
