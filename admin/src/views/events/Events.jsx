import { useState } from "react";
import Event from "./Event";
// Placeholder imports for new tab components
import YourEvents from "./YourEvents";
import PendingApproval from "./PendingApproval";
import OutstandingPayments from "./OutstandingPayments";
import AffiliatePartners from "./AffiliatePartners";
import Profile from "../../components/Profile"
import { BiSearch } from "react-icons/bi"

const tabList = [
  { label: "All Events", key: "all" },
  { label: "Your Events", key: "your" },
  { label: "Pending Approval", key: "pending" },
  { label: "Outstanding Payments", key: "outstanding" },
  { label: "Affiliate Partners", key: "affiliate" },
];

export default function Events() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="p-4 md:p-8">
        <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-8">
          <div className="relative">
            <BiSearch className="absolute hidden md:flex right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full px-8 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
            />
          </div>
        </div>
        <Profile />
      </div>
      <div className="flex gap-2 md:gap-4 mb-6 border-b">
        {tabList.map((tab) => (
          <button
            key={tab.key}
            className={`px-4 py-2 md:px-6 md:py-3 font-medium border-b-2 transition-colors ${
              activeTab === tab.key
                ? "border-primary text-primary"
                : "border-transparent text-gray-500 hover:text-primary"
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div>
        {activeTab === "all" && <Event />}
        {activeTab === "your" && <YourEvents />}
        {activeTab === "pending" && <PendingApproval />}
        {activeTab === "outstanding" && <OutstandingPayments />}
        {activeTab === "affiliate" && <AffiliatePartners />}
      </div>
    </div>
  );
} 