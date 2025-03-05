import React, { useState } from "react";
import MemberRequests from "./MemberRequests";
import CardsIssued from "./CardsIssued";
import Profile from "../../components/Profile";

const ClubCards = () => {
  const [activeTab, setActiveTab] = useState("new");

  return (
    <div className="space-y-6">
      {/* Tab Buttons */}
      <div className="flex flex-row mt-14 md:gap-4 mb-6 justify-between md:p-6 pt-6 ">
        <button
          className={`px-4 ml-4 mr-4 flex-1 rounded-lg text-xs py-2 ${
            activeTab === "new"
              ? "bg-primary text-white"
              : "border border-primary text-[#050002"
          }`}
          onClick={() => setActiveTab("new")}
        >
          New & Existing Members Requests
        </button>
        <button
          className={`px-6 ml-4 mr-8 flex-1 rounded-lg text-xs py-2 ${
            activeTab === "cards"
              ? "bg-primary text-white"
              : "border border-primary text-[#050002"
          }`}
          onClick={() => setActiveTab("cards")}
        >
          Cards Issued
        </button>
      </div>
        <div className="absolute right-10 top-0  items-center justify-between">
          <Profile />
        </div>

      {/* Render appropriate component based on active tab */}
      {activeTab === "new" ? <MemberRequests /> : <CardsIssued />}
    </div>
  );
};

export default ClubCards;
