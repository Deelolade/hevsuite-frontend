import React, { useState } from "react";
import { BsCalendar } from "react-icons/bs";
import { FiEdit2 } from "react-icons/fi";
import AccountProfile from "../views/account/profile/AccountProfile";
import YourEvents from "../views/account/events/YourEvents";
// import Referrals from "../views/account/referral/Referrals";
import SupportRequest from "../views/account/support/SupportRequest";
import YourAsks from "../views/account/asks/YourAsks";
import Activities from "../views/account/activity/Activities";
import Settings from "../views/account/settings/Settings";
import Notification from "../views/account/notifications/Notification";
import Referrals from "../views/account/referral/Referrals";

const ProfileModal = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState("Account Profile"); // Initialize with the first tab
  const [cardRequest, setCardRequest] = useState({
    fullName: "Good Luck",
    cardType: "Standard",
    disableCurrent: "No",
  });

  const tabs = [
    "Account Profile",
    "Your Events",
    "Referrals",
    "Support Join Request",
    "Your Asks",
    "Notifications",
    "Activity Log",
    "Settings",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white rounded-3xl w-full max-w-6xl mx-4">
        <div className="max-h-[90vh] overflow-y-auto">
          <div className="p-6">
            {/* Header */}
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {tabs.map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)} // Set active tab on click
                    className={`px-6 py-2 rounded-lg transition-colors ${
                      activeTab === tab // Conditionally apply active styles
                        ? "bg-[#540A26] text-white"
                        : "hover:bg-gray-100 text-gray-700"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <button onClick={onClose} className="text-3xl font-light">
                ×
              </button>
            </div>

            {/* Render Content Based on Active Tab */}
            <div className="mt-8">
              {activeTab === "Account Profile" && <AccountProfile />}
              {activeTab === "Your Events" && <YourEvents />}
              {activeTab === "Referrals" && <Referrals />}
              {activeTab === "Support Join Request" && <SupportRequest />}
              {activeTab === "Your Asks" && <YourAsks />}
              {activeTab === "Notifications" && <Notification />}
              {activeTab === "Activity Log" && <Activities />}
              {activeTab === "Settings" && <Settings />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
