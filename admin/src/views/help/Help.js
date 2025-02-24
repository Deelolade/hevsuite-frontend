import React, { useState } from "react";
import Profile from "../../components/Profile";
import Topics from "./Topics";
import FAQs from "./FAQs";
import { BiSearch } from "react-icons/bi";

const Help = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="space-y-6">
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
      <div className="flex gap-4 mb-6 justify-between p-6">
        <button
          className={`px-6 flex-1 rounded-lg ${
            activeTab === "topic"
              ? "px-6 py-3 bg-[#540A26] text-white rounded-lg"
              : "border border-gray-200 text-gray-600"
          }`}
          onClick={() => setActiveTab("topic")}
        >
          Help Center QA Topics
        </button>
        <button
          className={`px-6 flex-1 rounded-lg ${
            activeTab === "faq"
              ? "px-6 py-3 bg-[#540A26] text-white rounded-lg"
              : "border border-gray-200 text-gray-600"
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
