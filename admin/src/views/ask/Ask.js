import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "../../components/Profile";
import AllAsks from "./AllAsks";
import Reports from "./Reports";
import TopAsks from "./TopAsks";

const Ask = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedTab, setSelectedTab] = useState("all");

  const renderTabContent = () => {
    switch (selectedTab) {
      case "all":
        return <AllAsks />;
      case "reports":
        return <Reports />;
      case "top":
        return <TopAsks />;

      default:
        return <AllAsks />;
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
      <div className="border-b">
        <div className="flex font-primary font-semibold gap-8">
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "all"
                ? "border-b-4 border-primary text-black"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("all")}
          >
            All Asks
          </button>
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "reports"
                ? "border-b-4 border-primary text-black"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("reports")}
          >
            Reports
          </button>
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "top"
                ? "border-b-4 border-primary text-black"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("top")}
          >
            Top Accepted Askers
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Ask;
