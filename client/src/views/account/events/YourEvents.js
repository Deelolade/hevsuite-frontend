import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import avatar from "../../../assets/party2.jpg";
import AttendingEvents from "./AttendingEvents";
import InvitedEvents from "./InvitedEvents";
import PastEvents from "./PastEvents";
import SavedEvents from "./SavedEvents";

const NavigationTabs = ({ activeTab, setActiveTab, eventTabs }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
      {eventTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-3 sm:px-6 py-1.5 sm:py-2 rounded-lg border-2 transition-colors text-sm sm:text-base ${
            tab === activeTab
              ? "bg-gradient_r text-white"
              : "bg-white text-black hover:bg-gray-100"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
};

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-4 mt-6 sm:mt-8">
      <button className="text-gray-400 hover:text-gray-600 p-2">
        <BsChevronLeft size={18} />
      </button>
      <div className="flex gap-2 sm:gap-3">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={dot}
            className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full ${
              index === 0 ? "bg-[#540A26]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button className="text-gray-400 hover:text-gray-600 p-2">
        <BsChevronRight size={18} />
      </button>
    </div>
  );
};

const YourEvents = () => {
  const [activeTab, setActiveTab] = useState("Attending Events");
  const eventTabs = [
    "Attending Events",
    "Invited Events",
    "Past Events",
    "Saved Events",
  ];

  const attendingEvents = Array(8).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: avatar,
  });

  const invitedEvents = Array(8).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: avatar,
  });

  const pastEvents = Array(8).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: avatar,
  });

  const savedEvents = Array(8).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: avatar,
  });

  const renderActiveTab = () => {
    switch (activeTab) {
      case "Attending Events":
        return <AttendingEvents events={attendingEvents} />;
      case "Invited Events":
        return <InvitedEvents events={invitedEvents} />;
      case "Past Events":
        return <PastEvents events={pastEvents} />;
      case "Saved Events":
        return <SavedEvents events={savedEvents} />;
      default:
        return null;
    }
  };

  return (
    <div className="p-2 sm:p-4 md:p-6 max-w-full">
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        eventTabs={eventTabs}
      />
      {renderActiveTab()}
      <Pagination />
    </div>
  );
};

export default YourEvents;
