import React, { useState, useEffect } from "react";
import { BiSearch } from "react-icons/bi";

import Profile from "../../components/Profile";

import Landing from "./Landing";
import Menus from "./Menus";
import Footer from "./Footer";
import SiteLogos from "./SiteLogos";

const CMS = () => {
  const [activeTab, setActiveTab] = useState("landing");
  useEffect(() => {
    const params = new URLSearchParams(window.location.search).get("tab");
    if (params === "footer") {
      setActiveTab("footer");
    }
    if (params === "menu") {
      setActiveTab("menus");
    }
  }, []);

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
    <div className="md:p-6 px-4 space-y-6 ">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <div className="relative">
            <BiSearch className="absolute right-8 opacity-0 md:opacity-100 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
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
      <div className="flex md:ml-0 -ml-8 gap-8 font-primary font-semibold border-b">
        <button
          className={`pb-4 px-2 ${
            activeTab === "landing"
              ? "border-b-4 border-primary text-black "
              : "text-[#737374]"
          }`}
          onClick={() => {
            setActiveTab("landing");
          }}
        >
          Landing Pages
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "menus"
              ? "border-b-4 border-primary text-black"
              : "text-[#737374]"
          }`}
          onClick={() => {
            setActiveTab("menus");
            window.history.pushState(null, "", `?tab=menu`);
          }}
        >
          Menus
        </button>
        <button
          className={`pb-4 px-2 ${
            activeTab === "footer"
              ? "border-b-4 border-primary text-black "
              : "text-[#737374]"
          }`}
          onClick={() => {
            setActiveTab("footer");
            window.history.pushState(null, "", `?tab=footer`);
          }}
        >
          Footer
        </button>
        {/* <button
          className={`pb-4 px-2 ${
            activeTab === "logos"
              ? "border-b-4 border-primary "
              : "text-[#737374]"
          }`}
          onClick={() => setActiveTab("logos")}
        >
          Site Logos
        </button> */}
      </div>
      {renderTabContent()}
    </div>
  );
};

export default CMS;
