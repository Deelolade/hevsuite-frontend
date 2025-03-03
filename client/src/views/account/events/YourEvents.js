import React, { useState } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import avatar from "../../../assets/party2.jpg";
import AttendingEvents from "./AttendingEvents";
import InvitedEvents from "./InvitedEvents";
import PastEvents from "./PastEvents";
import SavedEvents from "./SavedEvents";

const NavigationTabs = ({ activeTab, setActiveTab, eventTabs }) => {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {eventTabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 sm:px-6 py-2 rounded-lg border-2 transition-colors ${
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

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex justify-center items-center gap-2 sm:gap-4 mt-4 sm:mt-8">
      <button 
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === 1}
      >
        <BsChevronLeft size={16} className="sm:w-5 sm:h-5" />
      </button>
      <div className="flex gap-1.5 sm:gap-2">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-colors ${
              page === currentPage ? "bg-[#540A26]" : "bg-gray-300 hover:bg-gray-400"
            }`}
          />
        ))}
      </div>
      <button 
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        className={`text-gray-400 hover:text-gray-600 p-1 sm:p-2 ${
          currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={currentPage === totalPages}
      >
        <BsChevronRight size={16} className="sm:w-5 sm:h-5" />
      </button>
    </div>
  );
};

const YourEvents = () => {
  const [activeTab, setActiveTab] = useState("Attending Events");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const eventTabs = [
    "Attending Events",
    "Invited Events",
    "Past Events",
    "Saved Events",
  ];

  const events = Array(20).fill({
    title: "Board Members Meeting",
    date: "2nd January, 2025",
    time: "10:00am",
    image: avatar,
  });

  const getCurrentEvents = () => {
    switch (activeTab) {
      case "Attending Events":
        return events.slice(0, 15);
      case "Invited Events":
        return events.slice(0, 12);
      case "Past Events":
        return events.slice(0, 18);
      case "Saved Events":
        return events.slice(0, 10);
      default:
        return [];
    }
  };

  const currentEvents = getCurrentEvents();
  const totalPages = Math.ceil(currentEvents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedEvents = currentEvents.slice(startIndex, endIndex);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({
      top: document.querySelector('.events-container').offsetTop - 100,
      behavior: 'smooth'
    });
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  return (
    <div className="p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <NavigationTabs 
          activeTab={activeTab} 
          setActiveTab={handleTabChange}
          eventTabs={eventTabs} 
        />
      </div>

      <div className="events-container">
        {activeTab === "Attending Events" && (
          <AttendingEvents events={paginatedEvents} />
        )}
        {activeTab === "Invited Events" && (
          <InvitedEvents events={paginatedEvents} />
        )}
        {activeTab === "Past Events" && (
          <PastEvents events={paginatedEvents} />
        )}
        {activeTab === "Saved Events" && (
          <SavedEvents events={paginatedEvents} />
        )}
      </div>

      {currentEvents.length > itemsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default YourEvents;