import React, { useState } from "react";
import { BsCalendar, BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { HiOutlineArrowRight } from "react-icons/hi";

const EventCard = ({ event, activeTab }) => {
  const getActionButtons = () => {
    switch (activeTab) {
      case "Invited Events":
        return (
          <>
            <button className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2">
              Accept
            </button>
            <button className="w-full bg-[#540A26] text-white py-2 rounded-lg mb-2">
              Decline
            </button>
          </>
        );
      case "Saved Events":
        return (
          <button className="w-full bg-[#540A26] text-white py-2 rounded-lg mb-2">
            Remove
          </button>
        );
      case "Attending Events":
        return (
          <button className="w-full bg-[#540A26] text-white py-2 rounded-lg mb-2">
            Cancel Attendance
          </button>
        );
      case "Past Events":
        return (
          <button className="w-full bg-[#0E5B31] text-white py-2 rounded-lg mb-2">
            Attended
          </button>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-100">
      <img
        src={event.image}
        alt={event.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-medium mb-2">{event.title}</h3>
        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
          <BsCalendar />
          <span>{event.date}</span>
          <span>{event.time}</span>
        </div>
        {getActionButtons()}
        <button className="w-full flex items-center justify-between px-2 text-gray-600 hover:text-gray-800">
          <span>View Details</span>
          <HiOutlineArrowRight />
        </button>
      </div>
    </div>
  );
};

const NavigationTabs = ({ activeTab, setActiveTab, eventTabs }) => {
  return (
    <div className="flex gap-2 mb-6">
      {eventTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-6 py-2 rounded-lg transition-colors ${
            tab === activeTab
              ? "bg-[#540A26] text-white"
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
    <div className="flex justify-center items-center gap-4 mt-8">
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronLeft size={20} />
      </button>
      <div className="flex gap-2">
        {[1, 2, 3, 4, 5].map((dot, index) => (
          <button
            key={dot}
            className={`w-2 h-2 rounded-full ${
              index === 0 ? "bg-[#540A26]" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
      <button className="text-gray-400 hover:text-gray-600">
        <BsChevronRight size={20} />
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

  const events = Array(8).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: "/event-image.jpg",
  });

  return (
    <div className="p-4">
      <NavigationTabs
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        eventTabs={eventTabs}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} activeTab={activeTab} />
        ))}
      </div>

      <Pagination />
    </div>
  );
};

export default YourEvents;
