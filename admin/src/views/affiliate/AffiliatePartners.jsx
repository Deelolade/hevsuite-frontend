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
    <div className="space-y-6 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-2xl mx-auto px-4">
          <form  className="relative">
            <BiSearch className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-400 text-lg" />
            <input
              type="text"
              placeholder="Search..."
              // value={searchTerm}
              
              className="w-full px-8 py-2.5 rounded-full border border-gray-400 focus:outline-none text-sm"
            />
          </form>
        </div>
        <Profile />
      </div>
      <h1 className="text-2xl font-bold mb-4">Affiliate Partners</h1>
      <div className="mb-6 border-b border-gray-200">
        <nav className="flex space-x-8" aria-label="Tabs">
          {TAB_LIST.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`px-4 py-2 -mb-px border-b-2 font-medium text-sm focus:outline-none transition-colors duration-200 ${activeTab === tab.key
                  ? 'border-primary text-primary'
                  : 'border-transparent text-gray-500 hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>
      <div>
        {activeTab === 'profile' && <ProfileSettingsTab />}
        {activeTab === 'outstanding' && <OutstandingPaymentTab />}
        {activeTab === 'current' && <CurrentEventTab />}
        {activeTab === 'past' && <PastEventsTab />}
      </div>
    </div>
  );
};

export default AffiliatePartners; 