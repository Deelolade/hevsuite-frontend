import React, { useState } from "react";
import Profile from "../../components/Profile";
import Topics from "./Topics";
import FAQs from "./FAQs";
import { BiSearch } from "react-icons/bi";

const Help = () => {
  const [activeTab, setActiveTab] = useState("topic");

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
      <div className="flex gap-4 mb-6 font-secondary font-semibold justify-between p-6">
        <button
          className={`px-6 flex-1 rounded-lg ${
            activeTab === "topic"
              ? "px-6 py-3 bg-primary text-white rounded-lg"
              : "border-2 border-gray-300 text-gray-600"
          }`}
          onClick={() => setActiveTab("topic")}
        >
          Help Center QA Topics
        </button>
        <button
          className={`px-6 flex-1 rounded-lg ${
            activeTab === "faq"
              ? "px-6 py-3 bg-primary text-white rounded-lg"
              : "border-2 border-gray-300 text-gray-600"
          }`}
          onClick={() => setActiveTab("faq")}
        >
          Help Center FAQs
        </button>
      </div>

      {/* Render appropriate component based on active tab */}
      {activeTab === "topic" ? <Topics /> : <FAQs />}
    </div>
  );
};

export default Help;
