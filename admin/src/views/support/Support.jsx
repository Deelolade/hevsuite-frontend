import React, { useState } from "react";
import { BiSearch } from "react-icons/bi";
import Profile from "../../components/Profile";

import Evidence from "./Evidence";
import OtherRequest from "./OtherRequest";
import AssignedRequest from "./AssignedRequest";

const Support = () => {
  const [activeTab, setActiveTab] = useState("evidence");
  const [searchQuery, setSearchQuery] = useState("");

  const renderTabContent = () => {
    switch (activeTab) {
      case "evidence":
        return <Evidence />;
      case "other":
        return <OtherRequest />;
      case "assigned":
        return <AssignedRequest />;
      default:
        return <Evidence />;
    }
  };

  return (
    <div className="space-y-6 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          
        </div>
        <Profile />
      </div>

      {renderTabContent()}
    </div>
  );
};

export default Support;
