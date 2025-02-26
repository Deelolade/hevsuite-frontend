import React, { useState } from "react";
import MemberRequests from "./MemberRequests";
import CardsIssued from "./CardsIssued";
import Profile from "../../components/Profile";

const ClubCards = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex gap-4 mb-6 justify-between p-6 ">
        <button
          className={`px-4 ml-4 mr-4 flex-1 rounded-lg ${
            activeTab === "new"
              ? "bg-primary text-white"
              : "border border-primary text-[#050002"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New & Existing Members Requests
        </button>
        <button
          className={`px-6 ml-4 mr-8 flex-1 rounded-lg ${
            activeTab === "cards"
              ? "bg-primary text-white"
              : "border border-primary text-[#050002"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Cards Issued
        </button>
        <div className="flex items-center justify-between">
          <Profile />
        </div>
      </div>

      {/* Render appropriate component based on active tab */}
      {activeTab === "new" ? <MemberRequests /> : <CardsIssued />}
    </div>
  );
};

export default ClubCards;
