import React from "react";
import EventCard from "./EventCard";

const InvitedEvents = ({ events }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4">
      {events.map((event, index) => (
        <EventCard key={index} event={event} activeTab="Invited Events" />
      ))}
    </div>
  );
};

export default InvitedEvents;
