import React, { useState } from "react";
import AccountProfile from "../views/account/profile/AccountProfile";
import YourEvents from "../views/account/events/YourEvents";
import SupportRequest from "../views/account/support/SupportRequest";
import YourAsks from "../views/account/asks/YourAsks";
import Activities from "../views/account/activity/Activities";
import Settings from "../views/account/settings/Settings";
import Notification from "../views/account/notifications/Notification";
import Referrals from "../views/account/referral/Referrals";

const ProfileModal = ({ onClose }) => {
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

  const [activeTab, setActiveTab] = useState(tabs[0]);

  const handleLogout = () => {
    console.log("Logout functionality goes here");
    if (onClose) onClose();
  };

  return (
    <div className="relative bg-transparent rounded-3xl overflow-hidden">
      <div className="p-4 md:p-6 border-b border-transparent relative">
        <div className="absolute top-4 right-4 flex items-center gap-2">
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 sm:px-4 sm:py-2 bg-primary text-white text-sm rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
          <button
            onClick={onClose}
            className="text-4xl sm:text-2xl font-light text-white hover:text-gray-500 transition-colors"
          >
            ×
          </button>
        </div>

        {/* Tabs - Scrollable on Mobile with hidden scrollbar */}
        <div className="w-full sm:w-auto overflow-x-auto pb-2 sm:pb-0 pt-12 no-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 sm:px-4 sm:py-2 text-sm rounded-lg whitespace-nowrap w-[165px] transition-colors border border-transparent ${
                  activeTab === tab
                    ? "bg-[#540A26] text-white"
                    : "hover:bg-gray-100 text-gray-700 bg-white"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="p-4 md:p-6 space-y-4 text-black bg-white rounded-t-3xl overflow-y-auto no-scrollbar h-[650px] md:h-[520px]">
        <style jsx global>{`
          /* Hide scrollbar for Chrome, Safari and Opera */
          .no-scrollbar::-webkit-scrollbar {
            display: none;
          }

          /* Hide scrollbar for IE, Edge and Firefox */
          .no-scrollbar {
            -ms-overflow-style: none; /* IE and Edge */
            scrollbar-width: none; /* Firefox */
          }

          /* Hide scrollbar on mobile devices */
          @media (max-width: 768px) {
            .no-scrollbar::-webkit-scrollbar {
              display: none;
            }
            .no-scrollbar {
              -ms-overflow-style: none; /* IE and Edge */
              scrollbar-width: none; /* Firefox */
            }
          }
        `}</style>

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
  );
};

export default ProfileModal;
