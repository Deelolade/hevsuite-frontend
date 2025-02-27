import React, { useState } from "react";

import { Link } from "react-router-dom";
import Profile from "../../components/Profile";
import { BiSearch } from "react-icons/bi";
import Payment from "./Payment";
import History from "./History";
import Pricing from "./Pricing";

const Finance = () => {
  const [activeTab, setActiveTab] = useState("processors");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "processors":
        return <Payment />;
      case "history":
        return <History />;
      case "pricing":
        return <Pricing />;
      default:
        return <Payment />;
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
            className={`py-4 px-1 ${
              activeTab === "processors"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("processors")}
          >
            Payment Processors
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === "history"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("history")}
          >
            Transaction History
          </button>
          <button
            className={`py-4 px-1 ${
              activeTab === "pricing"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500"
            }`}
            onClick={() => setActiveTab("pricing")}
          >
            Pricing
          </button>
        </div>
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Finance;
