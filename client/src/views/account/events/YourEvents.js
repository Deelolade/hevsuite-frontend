import React, { useState, useEffect } from "react";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import { useDispatch, useSelector } from 'react-redux';
import AttendingEvents from "./AttendingEvents";
import InvitedEvents from "./InvitedEvents";
import PastEvents from "./PastEvents";
import SavedEvents from "./SavedEvents";
import { fetchAllEventTypes, fetchAttendingMembers } from "../../../features/eventSlice";

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
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState("Attending Events");
  const eventTabs = [
    "Attending Events",
    "Invited Events",
    "Past Events",
    "Saved Events",
  ];

  // Get events from Redux store
  const {
    attendingEvents,
    invitedEvents,
    pastEvents,
    attendingMembers,
    savedEvents,
    loading,
    membersLoading,
    error
  } = useSelector((state) => state.events);
 console.log("attendingEvents", attendingEvents);
  console.log("invitedEvents", invitedEvents);
  console.log("pastEvents", pastEvents);
  console.log("saved",savedEvents)
  // Fetch all events on component mount
  useEffect(() => {
    dispatch(fetchAllEventTypes());
  }, [dispatch]);

  // Handler for fetching attending members
  const handleFetchMembers = (eventId) => {
    dispatch(fetchAttendingMembers(eventId));
  };

  const renderActiveTab = () => {
    if (loading) {
      return <div className="text-center py-8">Loading events...</div>;
    }

    if (error) {
      return <div className="text-center text-red-500 py-8">Error: {error}</div>;
    }

    switch (activeTab) {
      case "Attending Events":
        return (
          <AttendingEvents 
            events={attendingEvents} 
            onFetchMembers={handleFetchMembers}
            membersData={attendingMembers}
            membersLoading={membersLoading}
          />
        );
      case "Invited Events":
        return <InvitedEvents events={invitedEvents} />;
      case "Past Events":
        return <PastEvents events={pastEvents} />;
      case "Saved Events":
        return <SavedEvents events={savedEvents} />; // You can implement saved events later
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