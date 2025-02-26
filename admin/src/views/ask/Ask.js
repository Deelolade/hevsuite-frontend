import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "../../components/Profile";
import AllAsks from "./AllAsks";
import Reports from "./Reports";
import TopAsks from "./TopAsks";

const Ask = () => {
  const [currentPage, setCurrentPage] = useState(2);
  const [selectedTab, setSelectedTab] = useState("all");

  const asks = [
    {
      id: 1,
      title: "Request for Event Volunteers",
      user: {
        name: "Andrew Bojangles",
        avatar: "/avatars/user1.jpg",
      },
    },
    // ... repeat similar objects for other rows
  ];

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
      <div className="flex justify-between items-center">
        <div className="relative flex-1 max-w-xl">
          <BiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xl" />
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-2 border rounded-lg"
          />
        </div>
        <div className="flex items-center gap-4">
          <Profile />
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b">
        <div className="flex gap-8">
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "all"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("all")}
          >
            All Asks
          </button>
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "reports"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setSelectedTab("reports")}
          >
            Reports
          </button>
          <button
            className={`py-2 px-1 -mb-px ${
              selectedTab === "top"
                ? "border-b-2 border-primary text-primary"
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
