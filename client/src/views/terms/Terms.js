import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
import TermsOfPolicy from "./TermsOfPolicy";
import TermsOfUse from "./TermsOfUse";
import CookiePolicy from "./CookiePolicy";
import bg_image from "../../assets/header-bg.jpg";
import Header from "../../components/Header";

const Terms = () => {
  const [activeTab, setActiveTab] = useState("Terms of Policy");
  const [searchQuery, setSearchQuery] = useState("");

  const tabs = ["Terms of Policy", "Terms of Use", "Cookies Policy"];

  return (
    <div className="min-h-screen bg-white">
      <Header className="absolute top-0 left-0 w-full z-50" />
      <div className="flex">
        {/* Left Side - Dark Background with Content */}
        <div className="w-1/2 fixed top-0 left-0 h-screen">
          <div className="absolute inset-0 z-0">
            <img
              src={bg_image}
              alt="background"
              className="w-full h-full object-cover brightness-50"
            />
            <div className="absolute inset-0 bg-black/50" />
          </div>
          <div className="relative  z-10  min-h-screen p-32 font-secondary text-white">
            <h2 className="text-5xl font-semibold mb-8 ">{activeTab}</h2>
            <div className="space-y-4 text-2xl">
              {activeTab === "Terms of Policy" && (
                <>
                  <p className="text-secondary">
                    1. What is this privacy Policy For?
                  </p>
                  <p>2. Personal Data we collect?</p>
                  <p>3. Your Use of This Website</p>
                  <p>4. Invalidity of waiver</p>
                </>
              )}
              {activeTab === "Terms of Use" && (
                <>
                  <p className="text-red-500">1. Content on this SITE</p>
                  <p>2. Links to Other Websites</p>
                  <p>3. Your Use of This Website</p>
                  <p>4. Invalidity of waiver</p>
                </>
              )}
              {activeTab === "Cookies Policy" && (
                <>
                  <p className="text-red-500">
                    1. Cookies: what they are and How to remove them?
                  </p>
                  <p>2. What are in a cookie?</p>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Side - White Background with Content */}
        <div className="w-1/2 ml-[50%] min-h-screen p-20">
          <h1 className="text-5xl font-semibold mb-6">Policies</h1>

          {/* Search Bar */}
          <div className="relative mb-6">
            <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search article here"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 border rounded-lg shadow-sm"
            />
          </div>

          {/* Navigation Tabs */}
          <div className="flex gap-4 mb-8">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-2 rounded-3xl transition-colors ${
                  activeTab === tab
                    ? "bg-[#540A26] text-white"
                    : "border border-[#540A26] text-[#540A26]"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="pr-8">
            {activeTab === "Terms of Policy" && <TermsOfPolicy />}
            {activeTab === "Terms of Use" && <TermsOfUse />}
            {activeTab === "Cookies Policy" && <CookiePolicy />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Terms;
