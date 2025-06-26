import React, { useState } from 'react';
import ProfileSettingsTab from './ProfileSettingsTab';
import OutstandingPaymentTab from './OutstandingPaymentTab';
import CurrentEventTab from './CurrentEventTab';
import PastEventsTab from './PastEventsTab';
import Profile from "../../components/Profile"
import { BiSearch } from "react-icons/bi"

const TAB_LIST = [
  { label: 'Profile & Settings', key: 'profile' },
  { label: 'Outstanding Payment', key: 'outstanding' },
  { label: 'Current Event', key: 'current' },
  { label: 'Past Events', key: 'past' },
];

const AffiliatePartners = () => {
  const [activeTab, setActiveTab] = useState('profile');

  return (
    // <div className="p-6">
    <div className="space-y-6 md:p-6 p-2">
      {/* Header */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex-1 w-full max-w-2xl mx-auto px-0 md:px-4">
          <form className="relative w-full">
            <BiSearch className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              // value={searchTerm}
              className="w-full px-10 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
            />
          </form>
        </div>
        <div className="w-full md:w-auto flex justify-end">
          <Profile />
        </div>
      </div>
      <h1 className="text-2xl font-bold mb-4 px-2 md:px-0">Affiliate Partners</h1>
      <div className="mb-6 border-b border-gray-200 px-2 md:px-0">
        <nav className="flex flex-wrap md:flex-nowrap space-x-0 md:space-x-8 overflow-x-auto" aria-label="Tabs">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200 whitespace-nowrap ${activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div className="px-0 md:px-0">
        {activeTab === 'profile' && <ProfileSettingsTab />}
        {activeTab === 'outstanding' && <OutstandingPaymentTab />}
        {activeTab === 'current' && <CurrentEventTab />}
        {activeTab === 'past' && <PastEventsTab />}
      </div>
    </div>
  );
};

export default AffiliatePartners; 