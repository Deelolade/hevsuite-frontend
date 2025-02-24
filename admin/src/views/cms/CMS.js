import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";

import Profile from "../../components/Profile";

import Landing from "./Landing";
import Menus from "./Menus";
import Footer from "./Footer";
import SiteLogos from "./SiteLogos";

const CMS = () => {
  const [activeTab, setActiveTab] = useState("landing");

  const renderTabContent = () => {
    switch (activeTab) {
      case "landing":
        return <Landing />;
      case "menus":
        return <Menus />;
      case "footer":
        return <Footer />;
      case "logos":
        return <SiteLogos />;
      default:
        return <Landing />;
    }
  };

  return (
    <div className="p-6 space-y-6">
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
      <div className="flex gap-8 border-b">
        <button
          className={`pb-4 px-2 ${
            activeTab === "landing"
              ? "border-b-2 border-[#540A26] text-[#540A26] font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("landing")}
        >
          Landing Pages
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "menus"
              ? "border-b-2 border-[#540A26] text-[#540A26] font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("menus")}
        >
          Menus
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "footer"
              ? "border-b-2 border-[#540A26] text-[#540A26] font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("footer")}
        >
          Footer
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "logos"
              ? "border-b-2 border-[#540A26] text-[#540A26] font-medium"
              : "text-gray-500"
          }`}
          onClick={() => setActiveTab("logos")}
        >
          Site Logos
        </button>
      </div>
      {renderTabContent()}
    </div>
  );
};

export default CMS;
